-- Accreditation management workspace
-- Run in Supabase SQL Editor.

create extension if not exists pgcrypto;

create type public.accreditation_status as enum (
  'draft',
  'in_progress',
  'review',
  'revision',
  'approved'
);

create type public.accreditation_role as enum (
  'department_head',
  'quality_office',
  'administrator',
  'director'
);

create table if not exists public.accreditation_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  accreditation_type text not null default 'institutional',
  start_date date,
  deadline date,
  status public.accreditation_status not null default 'in_progress',
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.accreditation_departments (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  head_name text,
  head_user_id uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create table if not exists public.accreditation_memberships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  department_id uuid references public.accreditation_departments(id) on delete cascade,
  role public.accreditation_role not null,
  created_at timestamptz not null default now(),
  unique(user_id, department_id, role)
);

create table if not exists public.accreditation_working_groups (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.accreditation_projects(id) on delete cascade,
  name text not null,
  lead_name text,
  lead_user_id uuid references auth.users(id),
  description text,
  deadline date,
  status public.accreditation_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.accreditation_indicators (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.accreditation_projects(id) on delete cascade,
  working_group_id uuid references public.accreditation_working_groups(id) on delete set null,
  department_id uuid references public.accreditation_departments(id) on delete set null,
  code text not null,
  title text not null,
  description text,
  evidence_requirements text,
  responsible_name text,
  responsible_user_id uuid references auth.users(id),
  deadline date,
  weight numeric(8,2) not null default 1,
  completion_percent integer not null default 0 check (completion_percent between 0 and 100),
  status public.accreditation_status not null default 'draft',
  submitted_at timestamptz,
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(project_id, code)
);

create table if not exists public.accreditation_documents (
  id uuid primary key default gen_random_uuid(),
  indicator_id uuid references public.accreditation_indicators(id) on delete cascade,
  working_group_id uuid references public.accreditation_working_groups(id) on delete cascade,
  uploaded_by uuid not null references auth.users(id),
  file_name text not null,
  storage_path text not null,
  mime_type text,
  file_size bigint,
  version integer not null default 1,
  status public.accreditation_status not null default 'review',
  created_at timestamptz not null default now(),
  check (indicator_id is not null or working_group_id is not null)
);

create table if not exists public.accreditation_reviews (
  id uuid primary key default gen_random_uuid(),
  indicator_id uuid not null references public.accreditation_indicators(id) on delete cascade,
  reviewer_id uuid not null references auth.users(id),
  decision public.accreditation_status not null check (decision in ('revision','approved')),
  comment text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.accreditation_comments (
  id uuid primary key default gen_random_uuid(),
  indicator_id uuid not null references public.accreditation_indicators(id) on delete cascade,
  author_id uuid not null references auth.users(id),
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.accreditation_history (
  id bigint generated always as identity primary key,
  project_id uuid references public.accreditation_projects(id) on delete cascade,
  indicator_id uuid references public.accreditation_indicators(id) on delete cascade,
  actor_id uuid references auth.users(id),
  action text not null,
  old_status public.accreditation_status,
  new_status public.accreditation_status,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists accreditation_indicators_project_idx
  on public.accreditation_indicators(project_id);
create index if not exists accreditation_indicators_department_idx
  on public.accreditation_indicators(department_id);
create index if not exists accreditation_indicators_status_idx
  on public.accreditation_indicators(status);
create index if not exists accreditation_documents_indicator_idx
  on public.accreditation_documents(indicator_id);
create index if not exists accreditation_reviews_indicator_idx
  on public.accreditation_reviews(indicator_id);

create or replace function public.is_accreditation_reviewer()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.accreditation_memberships m
    where m.user_id = auth.uid()
      and m.role in ('quality_office','administrator','director')
  );
$$;

create or replace function public.can_manage_accreditation_indicator(target_department uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.is_accreditation_reviewer()
  or exists (
    select 1
    from public.accreditation_memberships m
    where m.user_id = auth.uid()
      and m.role = 'department_head'
      and m.department_id = target_department
  );
$$;

alter table public.accreditation_projects enable row level security;
alter table public.accreditation_departments enable row level security;
alter table public.accreditation_memberships enable row level security;
alter table public.accreditation_working_groups enable row level security;
alter table public.accreditation_indicators enable row level security;
alter table public.accreditation_documents enable row level security;
alter table public.accreditation_reviews enable row level security;
alter table public.accreditation_comments enable row level security;
alter table public.accreditation_history enable row level security;

create policy "authenticated users read accreditation projects"
  on public.accreditation_projects for select
  to authenticated using (true);
create policy "authenticated users read departments"
  on public.accreditation_departments for select
  to authenticated using (true);
create policy "users read own memberships and reviewers read all"
  on public.accreditation_memberships for select
  to authenticated using (user_id = auth.uid() or public.is_accreditation_reviewer());
create policy "authenticated users read working groups"
  on public.accreditation_working_groups for select
  to authenticated using (true);
create policy "authenticated users read indicators"
  on public.accreditation_indicators for select
  to authenticated using (true);
create policy "owners and reviewers update indicators"
  on public.accreditation_indicators for update
  to authenticated using (public.can_manage_accreditation_indicator(department_id))
  with check (public.can_manage_accreditation_indicator(department_id));
create policy "owners and reviewers insert documents"
  on public.accreditation_documents for insert
  to authenticated with check (uploaded_by = auth.uid());
create policy "authenticated users read documents"
  on public.accreditation_documents for select
  to authenticated using (true);
create policy "reviewers create reviews"
  on public.accreditation_reviews for insert
  to authenticated with check (public.is_accreditation_reviewer() and reviewer_id = auth.uid());
create policy "authenticated users read reviews"
  on public.accreditation_reviews for select
  to authenticated using (true);
create policy "authenticated users create comments"
  on public.accreditation_comments for insert
  to authenticated with check (author_id = auth.uid());
create policy "authenticated users read comments"
  on public.accreditation_comments for select
  to authenticated using (true);
create policy "authenticated users read history"
  on public.accreditation_history for select
  to authenticated using (true);

insert into storage.buckets (id, name, public, file_size_limit)
values ('accreditation-evidence', 'accreditation-evidence', false, 52428800)
on conflict (id) do nothing;

create policy "authenticated users read accreditation evidence"
  on storage.objects for select
  to authenticated using (bucket_id = 'accreditation-evidence');
create policy "authenticated users upload accreditation evidence"
  on storage.objects for insert
  to authenticated with check (bucket_id = 'accreditation-evidence');

-- Initial project and departments. Safe to run repeatedly.
insert into public.accreditation_projects (title, accreditation_type, start_date, deadline)
select 'Комплексная государственная аккредитация института', 'institutional', current_date, current_date + interval '180 days'
where not exists (select 1 from public.accreditation_projects where accreditation_type = 'institutional');

insert into public.accreditation_departments (name, head_name) values
  ('Учебный отдел', 'С. Хошимов'),
  ('Отдел кадров', 'А. Усмонов'),
  ('Библиотека', 'Д. Сайфуллаева'),
  ('Международный отдел', 'А. Баходиров'),
  ('Отдел контроля качества образования', 'Ф. Рустамов')
on conflict (name) do update set head_name = excluded.head_name;
