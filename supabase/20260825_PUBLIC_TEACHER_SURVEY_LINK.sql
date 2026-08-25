-- Public access to "Teacher through the eyes of a student" without an account.
create table if not exists public.teacher_survey_public_participation (
  id uuid primary key default gen_random_uuid(),
  period_id uuid not null references public.survey_periods(id) on delete cascade,
  group_id uuid not null references public.survey_groups(id) on delete cascade,
  participant_hash bytea not null,
  completed_on date not null default current_date,
  unique(period_id, group_id, participant_hash)
);
create index if not exists teacher_survey_public_participation_period_idx on public.teacher_survey_public_participation(period_id,group_id,completed_on);
alter table public.teacher_survey_public_participation enable row level security;
revoke all on public.teacher_survey_public_participation from public,anon,authenticated;
grant select,insert,delete on public.teacher_survey_public_participation to service_role;

create or replace function public.submit_public_teacher_survey(p_group_id uuid,p_participant_hash text,p_locale text,p_answers jsonb,p_final_satisfaction smallint,p_final_suggestions text default null)
returns boolean language plpgsql security definer set search_path=public,extensions as $$
declare v_period uuid;v_submission uuid;v_answer jsonb;v_ratings smallint[];v_expected int;
begin
 if p_participant_hash!~'^[0-9a-f]{64}$' or p_locale not in('ru','uz','en') or p_final_satisfaction not between 1 and 5 or jsonb_typeof(p_answers)<>'array' then raise exception 'invalid survey data';end if;
 select id into v_period from public.survey_periods where active and starts_at<=now() and(ends_at is null or ends_at>now()) order by created_at desc limit 1;
 if not found or not exists(select 1 from public.survey_groups where id=p_group_id and active) then raise exception 'survey unavailable';end if;
 select count(*) into v_expected from public.survey_group_teachers where group_id=p_group_id and active;
 if v_expected=0 or jsonb_array_length(p_answers)<>v_expected then raise exception 'answers required';end if;
 insert into public.teacher_survey_public_participation(period_id,group_id,participant_hash) values(v_period,p_group_id,decode(p_participant_hash,'hex'));
 insert into public.survey_submissions(period_id,group_id,locale,final_satisfaction,final_suggestions) values(v_period,p_group_id,p_locale,p_final_satisfaction,nullif(left(trim(coalesce(p_final_suggestions,'')),3000),'')) returning id into v_submission;
 for v_answer in select * from jsonb_array_elements(p_answers) loop
  select array_agg(value::smallint order by ordinality) into v_ratings from jsonb_array_elements_text(v_answer->'ratings') with ordinality;
  if cardinality(v_ratings)<>8 or exists(select 1 from unnest(v_ratings) x where x<0 or x>5) or not exists(select 1 from public.survey_group_teachers gt where gt.group_id=p_group_id and gt.teacher_id=(v_answer->>'teacherId')::uuid and gt.active) then raise exception 'invalid teacher answer';end if;
  insert into public.survey_teacher_answers(submission_id,teacher_id,ratings,violation,comment) values(v_submission,(v_answer->>'teacherId')::uuid,v_ratings,left(v_answer->>'violation',200),nullif(left(trim(coalesce(v_answer->>'comment','')),2000),''));
 end loop;
 return true;
exception when unique_violation then raise exception 'survey already completed';
end $$;
revoke all on function public.submit_public_teacher_survey(uuid,text,text,jsonb,smallint,text) from public,anon,authenticated;
grant execute on function public.submit_public_teacher_survey(uuid,text,text,jsonb,smallint,text) to service_role;
