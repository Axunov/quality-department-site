-- Accreditation V7.2: self-registration audit and explicit project access.
-- Existing accreditation data and policies are preserved. No anon access is granted.

alter table public.accreditation_v3_profiles add column if not exists approved_by uuid references auth.users(id) on delete set null;
alter table public.accreditation_v3_profiles add column if not exists rejection_reason text;

create table if not exists public.accreditation_v72_registration_attempts(
 id bigint generated always as identity primary key,
 ip_address text not null,
 username text not null,
 successful boolean not null default false,
 created_at timestamptz not null default now()
);
alter table public.accreditation_v72_registration_attempts enable row level security;
revoke all on public.accreditation_v72_registration_attempts from public,anon,authenticated;
create index if not exists accreditation_v72_attempts_ip_created_idx on public.accreditation_v72_registration_attempts(ip_address,created_at desc);
create index if not exists accreditation_v72_attempts_cleanup_idx on public.accreditation_v72_registration_attempts(created_at);

create table if not exists public.accreditation_v72_user_project_access(
 user_id uuid not null references auth.users(id) on delete cascade,
 project_id uuid not null references public.accreditation_v3_projects(id) on delete cascade,
 access_role text not null default 'employee' check(access_role in ('employee','manager','viewer')),
 granted_by uuid references auth.users(id) on delete set null,
 granted_at timestamptz not null default now(),
 primary key(user_id,project_id)
);
alter table public.accreditation_v72_user_project_access enable row level security;
revoke all on public.accreditation_v72_user_project_access from public,anon;
grant select,insert,update,delete on public.accreditation_v72_user_project_access to authenticated;

drop policy if exists "v72 own project access read" on public.accreditation_v72_user_project_access;
create policy "v72 own project access read" on public.accreditation_v72_user_project_access for select to authenticated
using(user_id=(select auth.uid()) or public.accreditation_v3_is_reviewer() or public.accreditation_v3_is_director());
drop policy if exists "v72 reviewer manages project access" on public.accreditation_v72_user_project_access;
create policy "v72 reviewer manages project access" on public.accreditation_v72_user_project_access for all to authenticated
using(public.accreditation_v3_is_reviewer())
with check(public.accreditation_v3_is_reviewer());

create index if not exists accreditation_v72_access_project_user_idx on public.accreditation_v72_user_project_access(project_id,user_id);

-- Preserve only access proven by an existing indicator assignment. This avoids
-- granting every employee access to unrelated accreditation projects.
insert into public.accreditation_v72_user_project_access(user_id,project_id,access_role)
select distinct p.user_id,i.project_id,'employee'
from public.accreditation_v3_profiles p
join public.accreditation_v3_indicators i on i.responsible_user_id=p.user_id
where p.approval_status='approved' and p.is_active and p.role='department_head'
on conflict(user_id,project_id) do nothing;
