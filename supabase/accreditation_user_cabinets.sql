-- Кабинеты пользователей аккредитации
-- Выполнить после accreditation_workspace.sql и импорта индикаторов.

create table if not exists public.accreditation_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  job_title text,
  department_id uuid references public.accreditation_departments(id) on delete set null,
  role public.accreditation_role not null default 'department_head',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.accreditation_profiles enable row level security;

create policy "users read own accreditation profile"
  on public.accreditation_profiles for select
  to authenticated
  using (user_id = auth.uid() or public.is_accreditation_reviewer());

create policy "administrators manage accreditation profiles"
  on public.accreditation_profiles for all
  to authenticated
  using (exists (
    select 1 from public.accreditation_memberships m
    where m.user_id = auth.uid() and m.role in ('administrator','director')
  ))
  with check (exists (
    select 1 from public.accreditation_memberships m
    where m.user_id = auth.uid() and m.role in ('administrator','director')
  ));

create or replace view public.accreditation_department_dashboard as
select
  d.id as department_id,
  d.name as department_name,
  d.head_name,
  count(i.id)::int as total_indicators,
  count(i.id) filter (where i.status = 'draft')::int as not_started,
  count(i.id) filter (where i.status = 'in_progress')::int as in_progress,
  count(i.id) filter (where i.status = 'review')::int as under_review,
  count(i.id) filter (where i.status = 'revision')::int as revision_required,
  count(i.id) filter (where i.status = 'approved')::int as approved,
  coalesce(round(avg(i.completion_percent)),0)::int as completion_percent,
  count(i.id) filter (where i.deadline < current_date and i.status <> 'approved')::int as overdue
from public.accreditation_departments d
left join public.accreditation_indicators i on i.department_id = d.id
 group by d.id, d.name, d.head_name;

grant select on public.accreditation_department_dashboard to anon, authenticated;

create or replace view public.accreditation_director_dashboard as
select
  count(*)::int as total_indicators,
  count(*) filter (where status='draft')::int as not_started,
  count(*) filter (where status='in_progress')::int as in_progress,
  count(*) filter (where status='review')::int as under_review,
  count(*) filter (where status='revision')::int as revision_required,
  count(*) filter (where status='approved')::int as approved,
  count(*) filter (where deadline < current_date and status <> 'approved')::int as overdue,
  coalesce(round(avg(completion_percent)),0)::int as completion_percent
from public.accreditation_indicators;

grant select on public.accreditation_director_dashboard to authenticated;

-- Руководитель видит и изменяет только индикаторы своего подразделения.
drop policy if exists "owners and reviewers update indicators" on public.accreditation_indicators;
create policy "department heads and reviewers update indicators"
  on public.accreditation_indicators for update
  to authenticated
  using (
    public.is_accreditation_reviewer()
    or exists (
      select 1 from public.accreditation_profiles p
      where p.user_id = auth.uid()
        and p.is_active
        and p.role = 'department_head'
        and p.department_id = accreditation_indicators.department_id
    )
  )
  with check (
    public.is_accreditation_reviewer()
    or exists (
      select 1 from public.accreditation_profiles p
      where p.user_id = auth.uid()
        and p.is_active
        and p.role = 'department_head'
        and p.department_id = accreditation_indicators.department_id
    )
  );

-- Директор имеет только чтение; решения принимают quality_office и administrator.
create or replace function public.is_accreditation_approver()
returns boolean
language sql stable security definer set search_path=public
as $$
  select exists (
    select 1 from public.accreditation_profiles p
    where p.user_id = auth.uid()
      and p.is_active
      and p.role in ('quality_office','administrator')
  );
$$;

drop policy if exists "reviewers create reviews" on public.accreditation_reviews;
create policy "quality office and administrators create reviews"
  on public.accreditation_reviews for insert
  to authenticated
  with check (public.is_accreditation_approver() and reviewer_id = auth.uid());
