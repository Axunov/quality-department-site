-- Модуль обязательного тестирования преподавателей по функциям HEMIS.
-- Выполните файл один раз в Supabase → SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.hemis_teacher_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null check (char_length(full_name) between 5 and 180),
  department text not null check (char_length(department) between 1 and 180),
  position text not null check (char_length(position) between 1 and 180),
  phone text,
  email text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.hemis_quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.hemis_teacher_profiles(user_id) on delete cascade,
  score smallint not null check (score between 0 and 15),
  total_questions smallint not null default 15 check (total_questions = 15),
  passed boolean not null,
  answers jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists hemis_quiz_attempts_user_created_idx
  on public.hemis_quiz_attempts(user_id, created_at desc);

alter table public.hemis_teacher_profiles enable row level security;
alter table public.hemis_quiz_attempts enable row level security;

drop policy if exists "teachers read own hemis profile" on public.hemis_teacher_profiles;
create policy "teachers read own hemis profile" on public.hemis_teacher_profiles
for select using (auth.uid() = user_id);

drop policy if exists "teachers read own hemis attempts" on public.hemis_quiz_attempts;
create policy "teachers read own hemis attempts" on public.hemis_quiz_attempts
for select using (auth.uid() = user_id);

drop policy if exists "teachers add own hemis attempts" on public.hemis_quiz_attempts;
create policy "teachers add own hemis attempts" on public.hemis_quiz_attempts
for insert with check (auth.uid() = user_id);

drop policy if exists "admins manage hemis profiles" on public.hemis_teacher_profiles;
create policy "admins manage hemis profiles" on public.hemis_teacher_profiles
for all using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "admins manage hemis attempts" on public.hemis_quiz_attempts;
create policy "admins manage hemis attempts" on public.hemis_quiz_attempts
for all using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
