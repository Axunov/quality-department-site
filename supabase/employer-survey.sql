create table if not exists public.employer_survey_responses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  locale text not null default 'ru' check (locale in ('ru','uz','en')),
  organization_name text not null,
  activity_area text not null,
  respondent_position text not null,
  programmes jsonb not null default '[]'::jsonb,
  other_programme text,
  graduates_count text,
  curriculum_participation text not null,
  commission_participation text not null,
  practice_participation jsonb not null default '[]'::jsonb,
  graduate_qualities jsonb not null default '[]'::jsonb,
  ratings jsonb not null,
  practice_rating smallint check (practice_rating between 1 and 10),
  programme_relevance text not null,
  cooperation_directions jsonb not null default '[]'::jsonb,
  improvement_areas jsonb not null default '[]'::jsonb,
  demanded_competencies text,
  proposals text,
  hiring_readiness text not null,
  recommendation_score smallint not null check (recommendation_score between 0 and 10),
  cooperation_readiness text not null,
  contact_name text,
  contact_phone text,
  contact_email text,
  user_agent text
);

alter table public.employer_survey_responses enable row level security;
revoke all on public.employer_survey_responses from anon, authenticated;
create index if not exists employer_survey_created_at_idx on public.employer_survey_responses (created_at desc);
comment on table public.employer_survey_responses is 'Ответы работодателей. Запись выполняется только серверным API через service role.';
