-- Public student survey links without a student account.
-- Identity-like participation markers stay separate from anonymous answers.

alter table public.student_survey_responses
  alter column group_id drop not null;

create table if not exists public.student_survey_public_participation (
  id uuid primary key default gen_random_uuid(),
  survey_id uuid not null references public.student_surveys(id) on delete cascade,
  participant_hash bytea not null,
  completed_on date not null default current_date,
  created_at timestamptz not null default now(),
  unique (survey_id, participant_hash)
);

create index if not exists student_survey_public_participation_survey_idx
  on public.student_survey_public_participation(survey_id, completed_on);

alter table public.student_survey_public_participation enable row level security;
revoke all on public.student_survey_public_participation from public, anon, authenticated;
grant select, insert, delete on public.student_survey_public_participation to service_role;

create or replace function public.submit_public_student_survey(
  p_survey_id uuid,
  p_participant_hash text,
  p_locale text,
  p_answers jsonb
) returns boolean
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_required integer;
  v_given integer;
  v_known integer;
begin
  if p_participant_hash !~ '^[0-9a-f]{64}$'
     or jsonb_typeof(p_answers) <> 'object'
     or pg_column_size(p_answers) > 65536 then
    raise exception 'invalid submission';
  end if;

  perform 1 from public.student_surveys
  where id = p_survey_id
    and status = 'published'
    and starts_at <= now()
    and (ends_at is null or ends_at > now())
  for update;
  if not found then raise exception 'survey unavailable'; end if;

  select count(*) into v_required
  from public.student_survey_questions
  where survey_id = p_survey_id and required;

  select count(*) into v_given
  from public.student_survey_questions q
  where q.survey_id = p_survey_id and q.required and p_answers ? q.id::text;

  select count(*) into v_known
  from jsonb_object_keys(p_answers) supplied(key)
  join public.student_survey_questions q
    on q.survey_id = p_survey_id and q.id::text = supplied.key;

  if v_given <> v_required or v_known <> (select count(*) from jsonb_object_keys(p_answers)) then
    raise exception 'invalid answers';
  end if;

  insert into public.student_survey_public_participation(survey_id, participant_hash)
  values (p_survey_id, decode(p_participant_hash, 'hex'));

  insert into public.student_survey_responses(survey_id, group_id, locale, answers)
  values (
    p_survey_id,
    null,
    case when p_locale in ('ru','uz','en') then p_locale else 'ru' end,
    p_answers
  );
  return true;
exception
  when unique_violation then raise exception 'survey already completed';
end;
$$;

revoke all on function public.submit_public_student_survey(uuid,text,text,jsonb)
  from public, anon, authenticated;
grant execute on function public.submit_public_student_survey(uuid,text,text,jsonb)
  to service_role;

