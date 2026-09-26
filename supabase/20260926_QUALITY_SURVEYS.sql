create table if not exists public.quality_survey_responses (
  id uuid primary key default gen_random_uuid(),
  survey_type text not null check (survey_type in ('graduates','doctoral')),
  locale text not null default 'ru' check (locale in ('ru','uz','en')),
  profile jsonb not null default '{}'::jsonb check (jsonb_typeof(profile) = 'object'),
  ratings smallint[] not null,
  choices text[] not null default '{}',
  answers jsonb not null default '{}'::jsonb check (jsonb_typeof(answers) = 'object'),
  created_at timestamptz not null default now(),
  constraint quality_survey_ratings_range check (ratings <@ array[1,2,3,4,5]::smallint[]),
  constraint quality_survey_ratings_count check ((survey_type='graduates' and cardinality(ratings)=9) or (survey_type='doctoral' and cardinality(ratings)=19))
);

alter table public.quality_survey_responses enable row level security;
revoke all on public.quality_survey_responses from public, anon, authenticated;
grant select, insert on public.quality_survey_responses to service_role;
create index if not exists quality_survey_type_date_idx on public.quality_survey_responses(survey_type, created_at desc);
create index if not exists quality_survey_profile_idx on public.quality_survey_responses using gin(profile);
comment on table public.quality_survey_responses is 'Anonymous graduate and doctoral quality survey responses; server-side access only.';

alter table public.site_security_events drop constraint if exists site_security_events_endpoint_check;
alter table public.site_security_events add constraint site_security_events_endpoint_check check (endpoint in ('employer_survey','graduates_survey','doctoral_survey'));
