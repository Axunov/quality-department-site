-- STUDENT SURVEYS V2: multilingual builder + unlinkable anonymous answers
create extension if not exists pgcrypto with schema extensions;

create table if not exists public.student_surveys (
  id uuid primary key default gen_random_uuid(),
  title_ru text not null, title_uz text not null, title_en text not null,
  description_ru text, description_uz text, description_en text,
  starts_at timestamptz not null default now(), ends_at timestamptz,
  status text not null default 'draft' check (status in ('draft','published','closed')),
  minimum_result_count integer not null default 5 check (minimum_result_count between 5 and 100),
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  check (ends_at is null or ends_at > starts_at)
);

create table if not exists public.student_survey_questions (
  id uuid primary key default gen_random_uuid(), survey_id uuid not null references public.student_surveys(id) on delete cascade,
  question_type text not null check (question_type in ('single','multiple','scale','text')),
  prompt_ru text not null, prompt_uz text not null, prompt_en text not null,
  options jsonb not null default '[]'::jsonb, required boolean not null default true,
  sort_order integer not null default 0, created_at timestamptz not null default now()
);

-- Identity-side ledger. It deliberately contains no response id.
create table if not exists public.student_survey_assignments (
  id uuid primary key default gen_random_uuid(), survey_id uuid not null references public.student_surveys(id) on delete cascade,
  access_code_id uuid not null references public.survey_access_codes(id) on delete cascade,
  status text not null default 'assigned' check (status in ('assigned','in_progress','completed')),
  pending_receipt_hash bytea, completed_on date,
  created_at timestamptz not null default now(), unique(survey_id, access_code_id)
);

-- Anonymous-side tables contain group only, never identity or assignment keys.
create table if not exists public.student_survey_sessions (
  id uuid primary key default gen_random_uuid(), survey_id uuid not null references public.student_surveys(id) on delete cascade,
  group_id uuid not null references public.survey_groups(id), session_hash bytea not null unique,
  receipt_hash bytea not null unique, expires_at timestamptz not null, created_at timestamptz not null default now()
);
create table if not exists public.student_survey_responses (
  id uuid primary key default gen_random_uuid(), survey_id uuid not null references public.student_surveys(id) on delete cascade,
  group_id uuid not null references public.survey_groups(id), locale text not null check(locale in ('ru','uz','en')),
  answers jsonb not null, submitted_on date not null default current_date
);

create index if not exists student_survey_questions_order_idx on public.student_survey_questions(survey_id,sort_order);
create index if not exists student_surveys_created_by_idx on public.student_surveys(created_by);
create index if not exists student_survey_assignments_access_idx on public.student_survey_assignments(access_code_id,status);
create index if not exists student_survey_assignments_survey_idx on public.student_survey_assignments(survey_id,status);
create index if not exists student_survey_sessions_expiry_idx on public.student_survey_sessions(expires_at);
create index if not exists student_survey_sessions_survey_idx on public.student_survey_sessions(survey_id);
create index if not exists student_survey_sessions_group_idx on public.student_survey_sessions(group_id);
create index if not exists student_survey_responses_stats_idx on public.student_survey_responses(survey_id,group_id,submitted_on);
create index if not exists student_survey_responses_group_idx on public.student_survey_responses(group_id);

alter table public.student_surveys enable row level security;
alter table public.student_survey_questions enable row level security;
alter table public.student_survey_assignments enable row level security;
alter table public.student_survey_sessions enable row level security;
alter table public.student_survey_responses enable row level security;

drop policy if exists "student surveys admin" on public.student_surveys;
create policy "student surveys admin" on public.student_surveys for all to authenticated
using ((select auth.jwt()->'app_metadata'->>'role')='admin') with check ((select auth.jwt()->'app_metadata'->>'role')='admin');
drop policy if exists "student questions admin" on public.student_survey_questions;
create policy "student questions admin" on public.student_survey_questions for all to authenticated
using ((select auth.jwt()->'app_metadata'->>'role')='admin') with check ((select auth.jwt()->'app_metadata'->>'role')='admin');
drop policy if exists "student assignments admin" on public.student_survey_assignments;
create policy "student assignments admin" on public.student_survey_assignments for all to authenticated
using ((select auth.jwt()->'app_metadata'->>'role')='admin') with check ((select auth.jwt()->'app_metadata'->>'role')='admin');
drop policy if exists "student responses admin aggregate" on public.student_survey_responses;
create policy "student responses admin aggregate" on public.student_survey_responses for select to authenticated
using ((select auth.jwt()->'app_metadata'->>'role')='admin');

grant select,insert,update,delete on public.student_surveys,public.student_survey_questions,public.student_survey_assignments to authenticated;
grant select on public.student_survey_responses to authenticated;
revoke all on public.student_survey_sessions from anon,authenticated;

create or replace function public.student_generic_surveys(p_portal_token text)
returns table(id uuid,title_ru text,title_uz text,title_en text,description_ru text,description_uz text,description_en text,starts_at timestamptz,ends_at timestamptz,status text)
language sql security definer set search_path=public,extensions as $$
 select s.id,s.title_ru,s.title_uz,s.title_en,s.description_ru,s.description_uz,s.description_en,s.starts_at,s.ends_at,a.status
 from public.student_portal_sessions ps join public.student_survey_assignments a on a.access_code_id=ps.access_code_id
 join public.student_surveys s on s.id=a.survey_id
 where ps.session_hash=digest(trim(p_portal_token),'sha256') and ps.expires_at>now()
   and s.status='published' and s.starts_at<=now() and (s.ends_at is null or s.ends_at>now())
 order by s.ends_at nulls last,s.created_at desc;
$$;

create or replace function public.begin_generic_student_survey(p_portal_token text,p_survey_id uuid)
returns table(session_token text,completion_receipt text,resolved_group_id uuid)
language plpgsql security definer set search_path=public,extensions as $$
declare v_assignment_id uuid; v_pending_receipt_hash bytea; v_group uuid; v_session text; v_receipt text;
begin
 delete from public.student_survey_sessions where expires_at<=now();
 select a.id,a.pending_receipt_hash,c.group_id into v_assignment_id,v_pending_receipt_hash,v_group from public.student_portal_sessions ps
 join public.student_survey_assignments a on a.access_code_id=ps.access_code_id
 join public.survey_access_codes c on c.id=a.access_code_id join public.student_surveys s on s.id=a.survey_id
 where ps.session_hash=digest(trim(p_portal_token),'sha256') and ps.expires_at>now() and a.survey_id=p_survey_id
 and a.status<>'completed' and s.status='published' and s.starts_at<=now() and (s.ends_at is null or s.ends_at>now())
 limit 1 for update of a;
 if not found then raise exception 'survey unavailable'; end if;
 if v_pending_receipt_hash is not null then delete from public.student_survey_sessions where receipt_hash=v_pending_receipt_hash; end if;
 v_session:=encode(gen_random_bytes(32),'hex'); v_receipt:=encode(gen_random_bytes(32),'hex');
 insert into public.student_survey_sessions(survey_id,group_id,session_hash,receipt_hash,expires_at)
 values(p_survey_id,v_group,digest(v_session,'sha256'),digest(v_receipt,'sha256'),now()+interval '2 hours');
 update public.student_survey_assignments set status='in_progress',pending_receipt_hash=digest(v_receipt,'sha256') where id=v_assignment_id;
 return query select v_session,v_receipt,v_group;
end $$;

create or replace function public.submit_generic_student_survey(p_session_token text,p_completion_receipt text,p_locale text,p_answers jsonb)
returns boolean language plpgsql security definer set search_path=public,extensions as $$
declare v_session public.student_survey_sessions%rowtype; v_required int; v_given int;
begin
 select * into v_session from public.student_survey_sessions where session_hash=digest(trim(p_session_token),'sha256')
 and receipt_hash=digest(trim(p_completion_receipt),'sha256') and expires_at>now() for update;
 if not found or jsonb_typeof(p_answers)<>'object' or pg_column_size(p_answers)>65536 then raise exception 'invalid submission'; end if;
 select count(*) into v_required from public.student_survey_questions where survey_id=v_session.survey_id and required;
 select count(*) into v_given from public.student_survey_questions q where q.survey_id=v_session.survey_id and q.required and p_answers ? q.id::text;
 if v_given<>v_required then raise exception 'required answers missing'; end if;
 insert into public.student_survey_responses(survey_id,group_id,locale,answers) values(v_session.survey_id,v_session.group_id,case when p_locale in ('ru','uz','en') then p_locale else 'ru' end,p_answers);
 update public.student_survey_assignments set status='completed',completed_on=current_date,pending_receipt_hash=null
 where survey_id=v_session.survey_id and pending_receipt_hash=v_session.receipt_hash and status='in_progress';
 if not found then raise exception 'participation receipt missing'; end if;
 delete from public.student_survey_sessions where id=v_session.id;
 return true;
end $$;

revoke all on function public.student_generic_surveys(text) from public,anon,authenticated;
revoke all on function public.begin_generic_student_survey(text,uuid) from public,anon,authenticated;
revoke all on function public.submit_generic_student_survey(text,text,text,jsonb) from public,anon,authenticated;
grant execute on function public.student_generic_surveys(text),public.begin_generic_student_survey(text,uuid),public.submit_generic_student_survey(text,text,text,jsonb) to service_role;
