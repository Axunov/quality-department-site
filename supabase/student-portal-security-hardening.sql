-- УСИЛЕНИЕ БЕЗОПАСНОСТИ ЛИЧНОГО КАБИНЕТА СТУДЕНТА
-- Выполните после student-portal-upgrade.sql.
-- Повторный импорт студентов и расписания не требуется.

create extension if not exists pgcrypto with schema extensions;

create table if not exists public.student_login_attempts (
  id bigint generated always as identity primary key,
  ip_hash text not null,
  identifier_hash bytea,
  success boolean not null default false,
  reason text not null check (
    reason in ('success', 'invalid', 'blocked', 'captcha_failed')
  ),
  created_at timestamptz not null default now()
);

create index if not exists student_login_attempts_ip_created_idx
  on public.student_login_attempts(ip_hash, created_at desc);

create index if not exists student_login_attempts_identifier_created_idx
  on public.student_login_attempts(identifier_hash, created_at desc);

alter table public.student_login_attempts enable row level security;

-- Таблица журнала не имеет публичных политик. Её читает только service_role.

create or replace function public.student_login_security_status(
  p_ip_hash text
) returns table (
  captcha_required boolean,
  blocked boolean,
  retry_after_seconds integer
)
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_failures_10m integer;
  v_failures_15m integer;
  v_attempts_10m integer;
  v_attempts_15m integer;
  v_last_failure timestamptz;
begin
  delete from public.student_login_attempts
  where created_at < now() - interval '90 days';

  select
    count(*) filter (
      where success = false
        and created_at >= now() - interval '10 minutes'
    ),
    count(*) filter (
      where success = false
        and created_at >= now() - interval '15 minutes'
    ),
    count(*) filter (
      where created_at >= now() - interval '10 minutes'
    ),
    count(*) filter (
      where created_at >= now() - interval '15 minutes'
    ),
    max(created_at) filter (where success = false)
  into
    v_failures_10m,
    v_failures_15m,
    v_attempts_10m,
    v_attempts_15m,
    v_last_failure
  from public.student_login_attempts
  where ip_hash = p_ip_hash;

  return query
  select
    (coalesce(v_failures_10m, 0) >= 3
      or coalesce(v_attempts_10m, 0) >= 20),
    (coalesce(v_failures_15m, 0) >= 10
      or coalesce(v_attempts_15m, 0) >= 200),
    case
      when coalesce(v_failures_15m, 0) >= 10 and v_last_failure is not null
      then greatest(
        1,
        ceil(extract(epoch from (
          v_last_failure + interval '15 minutes' - now()
        )))::integer
      )
      else 0
    end;
end;
$$;

create or replace function public.record_student_login_event(
  p_ip_hash text,
  p_student_identifier text,
  p_reason text
) returns boolean
language plpgsql
security definer
set search_path = public, extensions
as $$
begin
  if p_reason not in ('blocked', 'captcha_failed') then
    raise exception 'invalid login event';
  end if;

  insert into public.student_login_attempts(
    ip_hash, identifier_hash, success, reason
  ) values (
    p_ip_hash,
    digest(upper(trim(coalesce(p_student_identifier, ''))), 'sha256'),
    false,
    p_reason
  );

  return true;
end;
$$;

create or replace function public.student_portal_login_secure(
  p_student_identifier text,
  p_ip_hash text
) returns table (
  portal_token text,
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
  v_identifier_hash bytea;
begin
  if nullif(trim(p_student_identifier), '') is null
     or length(trim(p_student_identifier)) > 50
     or nullif(trim(p_ip_hash), '') is null then
    return;
  end if;

  v_identifier_hash :=
    digest(upper(trim(p_student_identifier)), 'sha256');

  delete from public.student_portal_sessions
  where expires_at <= now();

  select c.* into v_code
  from public.survey_access_codes c
  join public.survey_periods p on p.id = c.period_id
  where upper(trim(c.student_identifier)) =
        upper(trim(p_student_identifier))
    and c.student_identifier is not null
    and c.group_id is not null
    and p.active = true
    and p.starts_at <= now()
    and (p.ends_at is null or p.ends_at > now())
  order by p.created_at desc
  limit 1;

  if not found then
    insert into public.student_login_attempts(
      ip_hash, identifier_hash, success, reason
    ) values (
      p_ip_hash, v_identifier_hash, false, 'invalid'
    );
    return;
  end if;

  delete from public.student_portal_sessions
  where access_code_id = v_code.id;

  v_token := encode(gen_random_bytes(32), 'hex');

  insert into public.student_portal_sessions(
    access_code_id, session_hash, expires_at
  ) values (
    v_code.id,
    digest(v_token, 'sha256'),
    now() + interval '2 hours'
  );

  insert into public.student_login_attempts(
    ip_hash, identifier_hash, success, reason
  ) values (
    p_ip_hash, v_identifier_hash, true, 'success'
  );

  return query
  select
    v_token,
    g.name,
    v_code.used_at is not null
  from public.survey_groups g
  where g.id = v_code.group_id;
end;
$$;

drop function if exists public.student_portal_profile(text);

create function public.student_portal_profile(
  p_portal_token text
) returns table (
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

-- Закрываем старые браузерные RPC. Доступ к ним получает только сервер.
revoke all on function public.student_portal_login(text)
  from anon, authenticated;
revoke all on function public.student_portal_profile(text)
  from anon, authenticated;
revoke all on function public.begin_teacher_survey_from_portal(text)
  from anon, authenticated;
revoke all on function public.student_portal_logout(text)
  from anon, authenticated;
revoke all on function public.submit_teacher_survey_anonymous(
  text, text, text, jsonb, smallint, text
) from anon, authenticated;

revoke all on function public.student_login_security_status(text)
  from public, anon, authenticated;
revoke all on function public.record_student_login_event(text, text, text)
  from public, anon, authenticated;
revoke all on function public.student_portal_login_secure(text, text)
  from public, anon, authenticated;

grant execute on function public.student_login_security_status(text)
  to service_role;
grant execute on function public.record_student_login_event(text, text, text)
  to service_role;
grant execute on function public.student_portal_login_secure(text, text)
  to service_role;
grant execute on function public.student_portal_profile(text)
  to service_role;
grant execute on function public.begin_teacher_survey_from_portal(text)
  to service_role;
grant execute on function public.student_portal_logout(text)
  to service_role;
grant execute on function public.submit_teacher_survey_anonymous(
  text, text, text, jsonb, smallint, text
) to service_role;

-- Закрываем чувствительные таблицы от публичного API.
revoke all on table public.survey_access_codes from anon;
revoke all on table public.student_portal_sessions from anon;
revoke all on table public.survey_anonymous_sessions from anon;
revoke all on table public.survey_submissions from anon;
revoke all on table public.survey_teacher_answers from anon;
revoke all on table public.student_login_attempts from anon, authenticated;

-- Данные опроса теперь выдаёт серверный API, а не прямой браузерный запрос.
drop policy if exists "public reads active survey periods"
  on public.survey_periods;
drop policy if exists "public reads active survey groups"
  on public.survey_groups;
drop policy if exists "public reads active survey teachers"
  on public.survey_teachers;
drop policy if exists "public reads active group teachers"
  on public.survey_group_teachers;

revoke select on table public.survey_periods from anon;
revoke select on table public.survey_groups from anon;
revoke select on table public.survey_teachers from anon;
revoke select on table public.survey_group_teachers from anon;

select
  to_regprocedure(
    'public.student_portal_login_secure(text,text)'
  ) is not null as secure_login_ready,
  to_regprocedure(
    'public.student_login_security_status(text)'
  ) is not null as rate_limit_ready,
  to_regclass(
    'public.student_login_attempts'
  ) is not null as audit_log_ready;
