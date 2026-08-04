-- ============================================================
-- СИСТЕМА АККРЕДИТАЦИИ — БЕЗОПАСНАЯ МИГРАЦИЯ V2
-- Файл можно выполнять повторно.
-- Существующие индикаторы, документы, пользователи и история НЕ удаляются.
-- ============================================================

begin;

create extension if not exists pgcrypto;

-- ------------------------------------------------------------
-- 1. ПРОФИЛИ ПОЛЬЗОВАТЕЛЕЙ
-- ------------------------------------------------------------
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

alter table public.accreditation_profiles
  add column if not exists full_name text,
  add column if not exists job_title text,
  add column if not exists department_id uuid references public.accreditation_departments(id) on delete set null,
  add column if not exists role public.accreditation_role default 'department_head',
  add column if not exists is_active boolean default true,
  add column if not exists created_at timestamptz default now(),
  add column if not exists updated_at timestamptz default now();

alter table public.accreditation_profiles enable row level security;

-- ------------------------------------------------------------
-- 2. СЛУЖЕБНЫЕ ФУНКЦИИ РОЛЕЙ
-- SECURITY DEFINER предотвращает рекурсию RLS.
-- ------------------------------------------------------------
create or replace function public.current_accreditation_role()
returns public.accreditation_role
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (
      select p.role
      from public.accreditation_profiles p
      where p.user_id = auth.uid() and p.is_active
      limit 1
    ),
    (
      select m.role
      from public.accreditation_memberships m
      where m.user_id = auth.uid()
      order by case m.role
        when 'administrator' then 1
        when 'director' then 2
        when 'quality_office' then 3
        else 4
      end
      limit 1
    )
  );
$$;

create or replace function public.current_accreditation_department_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (
      select p.department_id
      from public.accreditation_profiles p
      where p.user_id = auth.uid() and p.is_active
      limit 1
    ),
    (
      select m.department_id
      from public.accreditation_memberships m
      where m.user_id = auth.uid()
        and m.role = 'department_head'
      limit 1
    )
  );
$$;

create or replace function public.is_accreditation_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.current_accreditation_role() in ('administrator','director'), false);
$$;

create or replace function public.is_accreditation_approver()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.current_accreditation_role() in ('quality_office','administrator'), false);
$$;

create or replace function public.is_accreditation_observer()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.current_accreditation_role() in ('quality_office','administrator','director'), false);
$$;

create or replace function public.can_manage_accreditation_indicator(target_department uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select
    public.is_accreditation_approver()
    or (
      public.current_accreditation_role() = 'department_head'
      and public.current_accreditation_department_id() = target_department
    );
$$;

-- ------------------------------------------------------------
-- 3. УДАЛЕНИЕ ВСЕХ КОНФЛИКТУЮЩИХ ПОЛИТИК
-- ------------------------------------------------------------
drop policy if exists "users read own accreditation profile" on public.accreditation_profiles;
drop policy if exists "administrators read all accreditation profiles" on public.accreditation_profiles;
drop policy if exists "administrators insert accreditation profiles" on public.accreditation_profiles;
drop policy if exists "administrators update accreditation profiles" on public.accreditation_profiles;
drop policy if exists "administrators manage accreditation profiles" on public.accreditation_profiles;
drop policy if exists "directors read accreditation dashboard" on public.accreditation_profiles;

drop policy if exists "owners and reviewers update indicators" on public.accreditation_indicators;
drop policy if exists "department heads and reviewers update indicators" on public.accreditation_indicators;
drop policy if exists "authenticated users read indicators" on public.accreditation_indicators;
drop policy if exists "public read accreditation indicators" on public.accreditation_indicators;

drop policy if exists "owners and reviewers insert documents" on public.accreditation_documents;
drop policy if exists "department heads upload accreditation documents" on public.accreditation_documents;
drop policy if exists "reviewers read all accreditation documents" on public.accreditation_documents;
drop policy if exists "department heads read own accreditation documents" on public.accreditation_documents;
drop policy if exists "authenticated users read documents" on public.accreditation_documents;

drop policy if exists "reviewers create reviews" on public.accreditation_reviews;
drop policy if exists "quality office and administrators create reviews" on public.accreditation_reviews;
drop policy if exists "authenticated users read reviews" on public.accreditation_reviews;
drop policy if exists "authenticated users read accreditation reviews" on public.accreditation_reviews;

drop policy if exists "authenticated users create comments" on public.accreditation_comments;
drop policy if exists "authenticated users read comments" on public.accreditation_comments;
drop policy if exists "authenticated users read history" on public.accreditation_history;
drop policy if exists "authenticated users read accreditation history" on public.accreditation_history;

-- Storage policies
-- Названия могут существовать после предыдущих миграций.
drop policy if exists "authenticated users read accreditation evidence" on storage.objects;
drop policy if exists "authenticated users upload accreditation evidence" on storage.objects;
drop policy if exists "department heads upload accreditation evidence" on storage.objects;
drop policy if exists "accreditation users read evidence" on storage.objects;

-- ------------------------------------------------------------
-- 4. НОВЫЕ ПОЛИТИКИ ПРОФИЛЕЙ
-- ------------------------------------------------------------
create policy "users read own accreditation profile"
on public.accreditation_profiles
for select
to authenticated
using (
  user_id = auth.uid()
  or public.is_accreditation_observer()
);

create policy "administrators manage accreditation profiles"
on public.accreditation_profiles
for all
to authenticated
using (public.is_accreditation_admin())
with check (public.is_accreditation_admin());

-- ------------------------------------------------------------
-- 5. ИНДИКАТОРЫ
-- Публичное чтение нужно для общей страницы мониторинга.
-- Изменять может руководитель своего отдела либо проверяющий.
-- ------------------------------------------------------------
create policy "public read accreditation indicators"
on public.accreditation_indicators
for select
to anon, authenticated
using (true);

create policy "department heads and reviewers update indicators"
on public.accreditation_indicators
for update
to authenticated
using (public.can_manage_accreditation_indicator(department_id))
with check (public.can_manage_accreditation_indicator(department_id));

-- ------------------------------------------------------------
-- 6. ДОКУМЕНТЫ
-- ------------------------------------------------------------
create policy "accreditation users read documents"
on public.accreditation_documents
for select
to authenticated
using (
  public.is_accreditation_observer()
  or uploaded_by = auth.uid()
  or exists (
    select 1
    from public.accreditation_indicators i
    where i.id = accreditation_documents.indicator_id
      and i.department_id = public.current_accreditation_department_id()
  )
);

create policy "department heads upload accreditation documents"
on public.accreditation_documents
for insert
to authenticated
with check (
  uploaded_by = auth.uid()
  and (
    public.is_accreditation_approver()
    or exists (
      select 1
      from public.accreditation_indicators i
      where i.id = accreditation_documents.indicator_id
        and i.department_id = public.current_accreditation_department_id()
    )
  )
);

-- ------------------------------------------------------------
-- 7. ПРОВЕРКИ, КОММЕНТАРИИ, ИСТОРИЯ
-- ------------------------------------------------------------
create policy "quality office and administrators create reviews"
on public.accreditation_reviews
for insert
to authenticated
with check (
  public.is_accreditation_approver()
  and reviewer_id = auth.uid()
);

create policy "accreditation users read reviews"
on public.accreditation_reviews
for select
to authenticated
using (
  public.is_accreditation_observer()
  or exists (
    select 1
    from public.accreditation_indicators i
    where i.id = accreditation_reviews.indicator_id
      and i.department_id = public.current_accreditation_department_id()
  )
);

create policy "accreditation users create comments"
on public.accreditation_comments
for insert
to authenticated
with check (
  author_id = auth.uid()
  and (
    public.is_accreditation_observer()
    or exists (
      select 1
      from public.accreditation_indicators i
      where i.id = accreditation_comments.indicator_id
        and i.department_id = public.current_accreditation_department_id()
    )
  )
);

create policy "accreditation users read comments"
on public.accreditation_comments
for select
to authenticated
using (
  public.is_accreditation_observer()
  or exists (
    select 1
    from public.accreditation_indicators i
    where i.id = accreditation_comments.indicator_id
      and i.department_id = public.current_accreditation_department_id()
  )
);

create policy "accreditation users read history"
on public.accreditation_history
for select
to authenticated
using (
  public.is_accreditation_observer()
  or exists (
    select 1
    from public.accreditation_indicators i
    where i.id = accreditation_history.indicator_id
      and i.department_id = public.current_accreditation_department_id()
  )
);

-- ------------------------------------------------------------
-- 8. ХРАНИЛИЩЕ ДОКАЗАТЕЛЬСТВ
-- ------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit)
values ('accreditation-evidence', 'accreditation-evidence', false, 52428800)
on conflict (id) do update
set public = false,
    file_size_limit = excluded.file_size_limit;

create policy "accreditation users read evidence"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'accreditation-evidence'
  and public.current_accreditation_role() is not null
);

create policy "department heads upload accreditation evidence"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'accreditation-evidence'
  and public.current_accreditation_role() in ('department_head','quality_office','administrator')
);

-- ------------------------------------------------------------
-- 9. СВОДНЫЕ ПРЕДСТАВЛЕНИЯ
-- ------------------------------------------------------------
create or replace view public.accreditation_department_dashboard
with (security_invoker = true)
as
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
  coalesce(round(avg(i.completion_percent)), 0)::int as completion_percent,
  count(i.id) filter (
    where i.deadline < current_date and i.status <> 'approved'
  )::int as overdue
from public.accreditation_departments d
left join public.accreditation_indicators i on i.department_id = d.id
group by d.id, d.name, d.head_name;

create or replace view public.accreditation_director_dashboard
with (security_invoker = true)
as
select
  count(*)::int as total_indicators,
  count(*) filter (where status = 'draft')::int as not_started,
  count(*) filter (where status = 'in_progress')::int as in_progress,
  count(*) filter (where status = 'review')::int as under_review,
  count(*) filter (where status = 'revision')::int as revision_required,
  count(*) filter (where status = 'approved')::int as approved,
  count(*) filter (
    where deadline < current_date and status <> 'approved'
  )::int as overdue,
  coalesce(round(avg(completion_percent)), 0)::int as completion_percent
from public.accreditation_indicators;

create or replace view public.accreditation_overall_progress
with (security_invoker = true)
as
select
  p.id as project_id,
  count(i.id)::int as total_indicators,
  count(i.id) filter (where i.status = 'approved')::int as approved_indicators,
  count(i.id) filter (where i.status = 'review')::int as review_indicators,
  count(i.id) filter (where i.status = 'revision')::int as revision_indicators,
  coalesce(round(avg(i.completion_percent)), 0)::int as completion_percent
from public.accreditation_projects p
left join public.accreditation_indicators i on i.project_id = p.id
group by p.id;

grant select on public.accreditation_department_dashboard to anon, authenticated;
grant select on public.accreditation_director_dashboard to authenticated;
grant select on public.accreditation_overall_progress to anon, authenticated;

-- ------------------------------------------------------------
-- 10. АВТОМАТИЧЕСКОЕ ОБНОВЛЕНИЕ updated_at
-- ------------------------------------------------------------
create or replace function public.set_accreditation_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists accreditation_profiles_set_updated_at
on public.accreditation_profiles;

create trigger accreditation_profiles_set_updated_at
before update on public.accreditation_profiles
for each row execute function public.set_accreditation_updated_at();

-- ------------------------------------------------------------
-- 11. ПРАВА НА ФУНКЦИИ
-- ------------------------------------------------------------
revoke all on function public.current_accreditation_role() from public;
revoke all on function public.current_accreditation_department_id() from public;
revoke all on function public.is_accreditation_admin() from public;
revoke all on function public.is_accreditation_approver() from public;
revoke all on function public.is_accreditation_observer() from public;
revoke all on function public.can_manage_accreditation_indicator(uuid) from public;

grant execute on function public.current_accreditation_role() to authenticated;
grant execute on function public.current_accreditation_department_id() to authenticated;
grant execute on function public.is_accreditation_admin() to authenticated;
grant execute on function public.is_accreditation_approver() to authenticated;
grant execute on function public.is_accreditation_observer() to authenticated;
grant execute on function public.can_manage_accreditation_indicator(uuid) to authenticated;

commit;

-- ============================================================
-- ПРОВЕРКА ПОСЛЕ УСТАНОВКИ
-- ============================================================
select
  'V2 migration completed' as result,
  (select count(*) from public.accreditation_indicators) as indicators,
  (select count(*) from public.accreditation_profiles) as profiles,
  (select count(*) from public.accreditation_departments) as departments;
