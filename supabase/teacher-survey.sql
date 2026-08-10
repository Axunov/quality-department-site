-- Опрос «Преподаватель глазами студента».
-- Выполните весь файл один раз в Supabase → SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.survey_periods (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  starts_at timestamptz not null default now(),
  ends_at timestamptz,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.survey_groups (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.survey_teachers (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.survey_group_teachers (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.survey_groups(id) on delete cascade,
  teacher_id uuid not null references public.survey_teachers(id) on delete cascade,
  subject text,
  sort_order integer not null default 0,
  active boolean not null default true,
  unique (group_id, teacher_id)
);

create table if not exists public.survey_access_codes (
  id uuid primary key default gen_random_uuid(),
  period_id uuid not null references public.survey_periods(id) on delete cascade,
  group_id uuid references public.survey_groups(id) on delete cascade,
  code_hash bytea not null unique,
  code_prefix text not null,
  participant_name text,
  student_identifier text,
  used_at timestamptz,
  created_at timestamptz not null default now()
);

-- Безопасно обновляет таблицу, если первая версия опроса уже была установлена.
alter table public.survey_access_codes
  add column if not exists participant_name text,
  add column if not exists student_identifier text;

create table if not exists public.survey_submissions (
  id uuid primary key default gen_random_uuid(),
  period_id uuid not null references public.survey_periods(id),
  group_id uuid not null references public.survey_groups(id),
  locale text not null check (locale in ('ru', 'uz', 'en')),
  final_satisfaction smallint not null check (final_satisfaction between 1 and 5),
  final_suggestions text,
  created_at timestamptz not null default now()
);

create table if not exists public.survey_teacher_answers (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.survey_submissions(id) on delete cascade,
  teacher_id uuid not null references public.survey_teachers(id),
  ratings smallint[] not null,
  violation text not null,
  comment text,
  created_at timestamptz not null default now(),
  unique (submission_id, teacher_id),
  check (cardinality(ratings) = 8)
);

alter table public.survey_periods enable row level security;
alter table public.survey_groups enable row level security;
alter table public.survey_teachers enable row level security;
alter table public.survey_group_teachers enable row level security;
alter table public.survey_access_codes enable row level security;
alter table public.survey_submissions enable row level security;
alter table public.survey_teacher_answers enable row level security;

drop policy if exists "public reads active survey periods" on public.survey_periods;
create policy "public reads active survey periods" on public.survey_periods
for select using (active = true and starts_at <= now() and (ends_at is null or ends_at > now()));

drop policy if exists "public reads active survey groups" on public.survey_groups;
create policy "public reads active survey groups" on public.survey_groups
for select using (active = true);

drop policy if exists "public reads active survey teachers" on public.survey_teachers;
create policy "public reads active survey teachers" on public.survey_teachers
for select using (active = true);

drop policy if exists "public reads active group teachers" on public.survey_group_teachers;
create policy "public reads active group teachers" on public.survey_group_teachers
for select using (active = true);

do $$
declare table_name text;
begin
  foreach table_name in array array[
    'survey_periods', 'survey_groups', 'survey_teachers',
    'survey_group_teachers', 'survey_access_codes',
    'survey_submissions', 'survey_teacher_answers'
  ]
  loop
    execute format('drop policy if exists "admins manage %1$s" on public.%1$I', table_name);
    execute format(
      'create policy "admins manage %1$s" on public.%1$I for all
       using ((auth.jwt() -> ''app_metadata'' ->> ''role'') = ''admin'')
       with check ((auth.jwt() -> ''app_metadata'' ->> ''role'') = ''admin'')',
      table_name
    );
  end loop;
end $$;

create or replace function public.submit_teacher_survey(
  p_access_code text,
  p_group_id uuid,
  p_locale text,
  p_answers jsonb,
  p_final_satisfaction smallint,
  p_final_suggestions text default null
) returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_code public.survey_access_codes%rowtype;
  v_submission_id uuid;
  v_answer jsonb;
  v_ratings smallint[];
begin
  if p_locale not in ('ru', 'uz', 'en') or p_final_satisfaction not between 1 and 5 then
    raise exception 'invalid survey data';
  end if;
  if jsonb_typeof(p_answers) <> 'array' or jsonb_array_length(p_answers) = 0 then
    raise exception 'answers required';
  end if;

  select c.* into v_code
  from public.survey_access_codes c
  join public.survey_periods p on p.id = c.period_id
  where c.code_hash = digest(upper(trim(p_access_code)), 'sha256')
    and c.used_at is null
    and (c.group_id is null or c.group_id = p_group_id)
    and p.active = true
    and p.starts_at <= now()
    and (p.ends_at is null or p.ends_at > now())
  for update of c;

  if not found then raise exception 'invalid or used access code'; end if;

  insert into public.survey_submissions(
    period_id, group_id, locale, final_satisfaction, final_suggestions
  ) values (
    v_code.period_id, p_group_id, p_locale, p_final_satisfaction,
    nullif(left(trim(coalesce(p_final_suggestions, '')), 3000), '')
  ) returning id into v_submission_id;

  for v_answer in select * from jsonb_array_elements(p_answers)
  loop
    select array_agg(value::smallint order by ordinality)
      into v_ratings
    from jsonb_array_elements_text(v_answer -> 'ratings') with ordinality;

    if cardinality(v_ratings) <> 8
       or exists (select 1 from unnest(v_ratings) rating where rating < 0 or rating > 5)
       or not exists (
         select 1 from public.survey_group_teachers gt
         where gt.group_id = p_group_id
           and gt.teacher_id = (v_answer ->> 'teacherId')::uuid
           and gt.active = true
       )
    then
      raise exception 'invalid teacher answer';
    end if;

    insert into public.survey_teacher_answers(
      submission_id, teacher_id, ratings, violation, comment
    ) values (
      v_submission_id,
      (v_answer ->> 'teacherId')::uuid,
      v_ratings,
      left(v_answer ->> 'violation', 200),
      nullif(left(trim(coalesce(v_answer ->> 'comment', '')), 2000), '')
    );
  end loop;

  -- Сохраняется только дата, без точного времени. Это не позволяет сопоставить
  -- Ф.И.О. с конкретной анкетой по секунде отправки.
  update public.survey_access_codes
  set used_at = date_trunc('day', now())
  where id = v_code.id;
  return v_submission_id;
end;
$$;

revoke all on function public.submit_teacher_survey(text, uuid, text, jsonb, smallint, text) from public;
grant execute on function public.submit_teacher_survey(text, uuid, text, jsonb, smallint, text) to anon, authenticated;

insert into public.survey_periods(title, active)
select 'Опрос «Преподаватель глазами студента» — текущий семестр', true
where not exists (select 1 from public.survey_periods);
