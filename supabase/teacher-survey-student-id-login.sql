-- ПЕРЕХОД ОПРОСА НА ВХОД ПО STUDENT ID
-- Запустите файл целиком в Supabase -> SQL Editor после основных файлов опроса.
--
-- Архитектура:
-- 1. student ID проверяется только при создании анонимной сессии;
-- 2. ответы получают только session token, группу и период;
-- 3. после отправки связь сессии со студентом удаляется;
-- 4. в реестре остаются Ф.И.О., ID, группа, дата участия и хеш квитанции;
-- 5. в ответах нет Ф.И.О., student ID, session token или квитанции.

create extension if not exists pgcrypto;

alter table public.survey_access_codes
  add column if not exists pending_receipt_hash bytea,
  add column if not exists completion_receipt_hash bytea;

create unique index if not exists survey_access_codes_period_student_identifier_uidx
  on public.survey_access_codes(period_id, upper(trim(student_identifier)))
  where student_identifier is not null;

create table if not exists public.survey_anonymous_sessions (
  id uuid primary key default gen_random_uuid(),
  period_id uuid not null references public.survey_periods(id) on delete cascade,
  group_id uuid not null references public.survey_groups(id) on delete cascade,
  session_hash bytea not null unique,
  receipt_hash bytea not null unique,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

alter table public.survey_anonymous_sessions enable row level security;

-- У таблицы сессий намеренно нет публичных политик чтения.
-- Доступ осуществляется только через SECURITY DEFINER функции.

create or replace function public.begin_teacher_survey_by_student_id(
  p_student_identifier text
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
  if nullif(trim(p_student_identifier), '') is null
     or length(trim(p_student_identifier)) > 50 then
    raise exception 'invalid student id';
  end if;

  -- Очищаем только просроченные незавершённые сессии.
  update public.survey_access_codes c
  set pending_receipt_hash = null
  where c.used_at is null
    and c.pending_receipt_hash is not null
    and exists (
      select 1
      from public.survey_anonymous_sessions s
      where s.receipt_hash = c.pending_receipt_hash
        and s.expires_at <= now()
    );

  delete from public.survey_anonymous_sessions
  where expires_at <= now();

  select c.* into v_code
  from public.survey_access_codes c
  join public.survey_periods p on p.id = c.period_id
  where upper(trim(c.student_identifier)) = upper(trim(p_student_identifier))
    and c.student_identifier is not null
    and c.group_id is not null
    and c.used_at is null
    and p.active = true
    and p.starts_at <= now()
    and (p.ends_at is null or p.ends_at > now())
  order by p.created_at desc
  limit 1
  for update of c;

  if not found then
    raise exception 'student id not found or survey already completed';
  end if;

  -- Повторный вход отменяет только предыдущую незавершённую сессию.
  if v_code.pending_receipt_hash is not null then
    delete from public.survey_anonymous_sessions
    where receipt_hash = v_code.pending_receipt_hash;
  end if;

  v_session_token := encode(gen_random_bytes(32), 'hex');
  v_receipt_token :=
    'QDS-' ||
    upper(substr(encode(gen_random_bytes(16), 'hex'), 1, 8)) || '-' ||
    upper(substr(encode(gen_random_bytes(16), 'hex'), 1, 8));

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

create or replace function public.submit_teacher_survey_anonymous(
  p_session_token text,
  p_completion_receipt text,
  p_locale text,
  p_answers jsonb,
  p_final_satisfaction smallint,
  p_final_suggestions text default null
) returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_session public.survey_anonymous_sessions%rowtype;
  v_submission_id uuid;
  v_answer jsonb;
  v_ratings smallint[];
  v_updated integer;
begin
  if p_locale not in ('ru', 'uz', 'en')
     or p_final_satisfaction not between 1 and 5 then
    raise exception 'invalid survey data';
  end if;

  if jsonb_typeof(p_answers) <> 'array'
     or jsonb_array_length(p_answers) = 0 then
    raise exception 'answers required';
  end if;

  select s.* into v_session
  from public.survey_anonymous_sessions s
  join public.survey_periods p on p.id = s.period_id
  where s.session_hash = digest(trim(p_session_token), 'sha256')
    and s.receipt_hash = digest(upper(trim(p_completion_receipt)), 'sha256')
    and s.expires_at > now()
    and p.active = true
    and p.starts_at <= now()
    and (p.ends_at is null or p.ends_at > now())
  for update of s;

  if not found then
    raise exception 'anonymous session is invalid or expired';
  end if;

  insert into public.survey_submissions(
    period_id, group_id, locale, final_satisfaction, final_suggestions
  ) values (
    v_session.period_id,
    v_session.group_id,
    p_locale,
    p_final_satisfaction,
    nullif(left(trim(coalesce(p_final_suggestions, '')), 3000), '')
  ) returning id into v_submission_id;

  for v_answer in select * from jsonb_array_elements(p_answers)
  loop
    select array_agg(value::smallint order by ordinality)
      into v_ratings
    from jsonb_array_elements_text(v_answer -> 'ratings') with ordinality;

    if cardinality(v_ratings) <> 8
       or exists (
         select 1
         from unnest(v_ratings) rating
         where rating < 0 or rating > 5
       )
       or not exists (
         select 1
         from public.survey_group_teachers gt
         where gt.group_id = v_session.group_id
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

  -- Отметка участия хранится отдельно и только с точностью до даты.
  update public.survey_access_codes
  set used_at = date_trunc('day', now()),
      completion_receipt_hash = v_session.receipt_hash,
      pending_receipt_hash = null
  where period_id = v_session.period_id
    and group_id = v_session.group_id
    and pending_receipt_hash = v_session.receipt_hash
    and used_at is null;

  get diagnostics v_updated = row_count;
  if v_updated <> 1 then
    raise exception 'participation receipt could not be confirmed';
  end if;

  -- Удаление сессии окончательно разрывает техническую связь между
  -- студентом и сохранённой анкетой.
  delete from public.survey_anonymous_sessions
  where id = v_session.id;

  return jsonb_build_object(
    'receipt', upper(trim(p_completion_receipt)),
    'completed_on', current_date
  );
end;
$$;

revoke all on function public.begin_teacher_survey_by_student_id(text) from public;
grant execute on function public.begin_teacher_survey_by_student_id(text)
  to anon, authenticated;

revoke all on function public.submit_teacher_survey_anonymous(
  text, text, text, jsonb, smallint, text
) from public;
grant execute on function public.submit_teacher_survey_anonymous(
  text, text, text, jsonb, smallint, text
) to anon, authenticated;

-- Контроль установки.
select
  to_regprocedure('public.begin_teacher_survey_by_student_id(text)') is not null
    as student_id_login_ready,
  to_regprocedure(
    'public.submit_teacher_survey_anonymous(text,text,text,jsonb,smallint,text)'
  ) is not null as anonymous_submit_ready;
