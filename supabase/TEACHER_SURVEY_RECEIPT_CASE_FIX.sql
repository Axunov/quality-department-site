-- Исправляет проверку одноразовой квитанции анонимного опроса.
-- Квитанция создаётся в нижнем регистре; изменение регистра перед
-- хешированием делало действующую анонимную сессию недействительной.

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
    and s.receipt_hash = digest(trim(p_completion_receipt), 'sha256')
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

  delete from public.survey_anonymous_sessions
  where id = v_session.id;

  return jsonb_build_object(
    'receipt', trim(p_completion_receipt),
    'completed_on', current_date
  );
end;
$$;

-- CREATE OR REPLACE сохраняет существующие разрешения функции.
-- Анонимность и действующие RLS-политики не изменяются.
