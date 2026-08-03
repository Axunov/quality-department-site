-- Выполните только если таблица employer_survey_responses уже была создана
-- по предыдущей версии опросника. Удаляет поле старого вопроса №18.
alter table if exists public.employer_survey_responses
  drop column if exists suggested_subjects;
