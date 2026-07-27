-- ОБНОВЛЕНИЕ УЖЕ УСТАНОВЛЕННОГО ОПРОСА
-- Добавляет закрытый реестр участников без связи Ф.И.О. с ответами.
-- Выполните этот файл один раз в Supabase → SQL Editor.

alter table public.survey_access_codes
  add column if not exists participant_name text,
  add column if not exists student_identifier text;

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

  update public.survey_access_codes
  set used_at = date_trunc('day', now())
  where id = v_code.id;

  return v_submission_id;
end;
$$;

revoke all on function public.submit_teacher_survey(text, uuid, text, jsonb, smallint, text) from public;
grant execute on function public.submit_teacher_survey(text, uuid, text, jsonb, smallint, text) to anon, authenticated;
