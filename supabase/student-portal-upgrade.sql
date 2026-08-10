-- ЛИЧНЫЙ КАБИНЕТ СТУДЕНТА И АНОНИМНЫЙ ЗАПУСК ОПРОСА
-- Выполните файл один раз в Supabase -> SQL Editor -> New query.
-- Повторный импорт студентов, групп и расписания не требуется.

create extension if not exists pgcrypto with schema extensions;

create table if not exists public.student_portal_sessions (
  id uuid primary key default gen_random_uuid(),
  access_code_id uuid not null
    references public.survey_access_codes(id) on delete cascade,
  session_hash bytea not null unique,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

create index if not exists student_portal_sessions_access_code_idx
  on public.student_portal_sessions(access_code_id);

alter table public.student_portal_sessions enable row level security;

-- У таблицы намеренно нет публичных политик чтения.
-- Браузер работает только через SECURITY DEFINER-функции.

create or replace function public.student_portal_login(
  p_student_identifier text
) returns table (
  portal_token text,
  participant_name text,
  resolved_group_name text,
  teacher_survey_completed boolean
)
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_code public.survey_access_codes%rowtype;
  v_token text;
begin
  if nullif(trim(p_student_identifier), '') is null
     or length(trim(p_student_identifier)) > 50 then
    raise exception 'invalid student id';
  end if;

  delete from public.student_portal_sessions
  where expires_at <= now();

  select c.* into v_code
  from public.survey_access_codes c
  join public.survey_periods p on p.id = c.period_id
  where upper(trim(c.student_identifier)) = upper(trim(p_student_identifier))
    and c.student_identifier is not null
    and c.group_id is not null
    and p.active = true
    and p.starts_at <= now()
    and (p.ends_at is null or p.ends_at > now())
  order by p.created_at desc
  limit 1;

  if not found then
    raise exception 'student id not found';
  end if;

  delete from public.student_portal_sessions
  where access_code_id = v_code.id;

  v_token := encode(gen_random_bytes(32), 'hex');

  insert into public.student_portal_sessions(
    access_code_id, session_hash, expires_at
  ) values (
    v_code.id,
    digest(v_token, 'sha256'),
    now() + interval '12 hours'
  );

  return query
  select
    v_token,
    coalesce(v_code.participant_name, 'Студент'),
    g.name,
    v_code.used_at is not null
  from public.survey_groups g
  where g.id = v_code.group_id;
end;
$$;

create or replace function public.student_portal_profile(
  p_portal_token text
) returns table (
  participant_name text,
  resolved_group_name text,
  teacher_survey_title text,
  teacher_survey_available boolean,
  teacher_survey_completed boolean
)
language sql
security definer
set search_path = public, extensions
as $$
  select
    coalesce(c.participant_name, 'Студент'),
    g.name,
    p.title,
    (
      c.used_at is null
      and p.active = true
      and p.starts_at <= now()
      and (p.ends_at is null or p.ends_at > now())
    ),
    c.used_at is not null
  from public.student_portal_sessions s
  join public.survey_access_codes c on c.id = s.access_code_id
  join public.survey_groups g on g.id = c.group_id
  join public.survey_periods p on p.id = c.period_id
  where s.session_hash = digest(trim(p_portal_token), 'sha256')
    and s.expires_at > now()
  limit 1;
$$;

create or replace function public.begin_teacher_survey_from_portal(
  p_portal_token text
) returns table (
  session_token text,
  completion_receipt text,
  resolved_group_id uuid,
  resolved_group_name text
)
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_code public.survey_access_codes%rowtype;
  v_session_token text;
  v_receipt_token text;
begin
  delete from public.student_portal_sessions
  where expires_at <= now();

  update public.survey_access_codes c
  set pending_receipt_hash = null
  where c.used_at is null
    and c.pending_receipt_hash is not null
    and exists (
      select 1
      from public.survey_anonymous_sessions a
      where a.receipt_hash = c.pending_receipt_hash
        and a.expires_at <= now()
    );

  delete from public.survey_anonymous_sessions
  where expires_at <= now();

  select c.* into v_code
  from public.student_portal_sessions s
  join public.survey_access_codes c on c.id = s.access_code_id
  join public.survey_periods p on p.id = c.period_id
  where s.session_hash = digest(trim(p_portal_token), 'sha256')
    and s.expires_at > now()
    and c.used_at is null
    and c.group_id is not null
    and p.active = true
    and p.starts_at <= now()
    and (p.ends_at is null or p.ends_at > now())
  limit 1
  for update of c;

  if not found then
    raise exception 'survey is unavailable or already completed';
  end if;

  if v_code.pending_receipt_hash is not null then
    delete from public.survey_anonymous_sessions
    where receipt_hash = v_code.pending_receipt_hash;
  end if;

  v_session_token := encode(gen_random_bytes(32), 'hex');
  v_receipt_token := encode(gen_random_bytes(32), 'hex');

  insert into public.survey_anonymous_sessions(
    period_id, group_id, session_hash, receipt_hash, expires_at
  ) values (
    v_code.period_id,
    v_code.group_id,
    digest(v_session_token, 'sha256'),
    digest(v_receipt_token, 'sha256'),
    now() + interval '2 hours'
  );

  update public.survey_access_codes
  set pending_receipt_hash = digest(v_receipt_token, 'sha256')
  where id = v_code.id;

  return query
  select
    v_session_token,
    v_receipt_token,
    g.id,
    g.name
  from public.survey_groups g
  where g.id = v_code.group_id;
end;
$$;

create or replace function public.student_portal_logout(
  p_portal_token text
) returns boolean
language plpgsql
security definer
set search_path = public, extensions
as $$
begin
  delete from public.student_portal_sessions
  where session_hash = digest(trim(p_portal_token), 'sha256');
  return true;
end;
$$;

revoke all on function public.student_portal_login(text) from public;
grant execute on function public.student_portal_login(text)
  to anon, authenticated;

revoke all on function public.student_portal_profile(text) from public;
grant execute on function public.student_portal_profile(text)
  to anon, authenticated;

revoke all on function public.begin_teacher_survey_from_portal(text) from public;
grant execute on function public.begin_teacher_survey_from_portal(text)
  to anon, authenticated;

revoke all on function public.student_portal_logout(text) from public;
grant execute on function public.student_portal_logout(text)
  to anon, authenticated;

select
  to_regprocedure('public.student_portal_login(text)') is not null
    as portal_login_ready,
  to_regprocedure('public.student_portal_profile(text)') is not null
    as portal_profile_ready,
  to_regprocedure('public.begin_teacher_survey_from_portal(text)') is not null
    as portal_survey_ready;
