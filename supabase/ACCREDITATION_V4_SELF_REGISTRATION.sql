-- ACCREDITATION V4: self-registration + approval workflow
-- Safe to run after ACCREDITATION_V3_INSTALL.sql. Does not reset accreditation progress or delete documents.

alter table public.accreditation_v3_profiles add column if not exists responsible_label text;
alter table public.accreditation_v3_profiles add column if not exists requested_role text default 'department_head';
alter table public.accreditation_v3_profiles add column if not exists approval_status text default 'approved';
alter table public.accreditation_v3_profiles add column if not exists approved_at timestamptz;

update public.accreditation_v3_profiles set approval_status='approved' where approval_status is null;
update public.accreditation_v3_profiles set requested_role=role where requested_role is null;

alter table public.accreditation_v3_profiles drop constraint if exists accreditation_v3_profiles_requested_role_check;
alter table public.accreditation_v3_profiles add constraint accreditation_v3_profiles_requested_role_check check (requested_role in ('department_head','director'));
alter table public.accreditation_v3_profiles drop constraint if exists accreditation_v3_profiles_approval_status_check;
alter table public.accreditation_v3_profiles add constraint accreditation_v3_profiles_approval_status_check check (approval_status in ('pending','approved','rejected'));

create or replace function public.accreditation_v3_handle_signup()
returns trigger
language plpgsql
security definer
set search_path=public
as $$
begin
  if coalesce(new.raw_user_meta_data->>'accreditation_signup','')='true' then
    insert into public.accreditation_v3_profiles(user_id,full_name,job_title,role,is_active,responsible_label,requested_role,approval_status)
    values(
      new.id,
      coalesce(nullif(new.raw_user_meta_data->>'full_name',''),'New user'),
      nullif(new.raw_user_meta_data->>'job_title',''),
      'department_head',
      false,
      nullif(new.raw_user_meta_data->>'responsible_label',''),
      case when new.raw_user_meta_data->>'requested_role'='director' then 'director' else 'department_head' end,
      'pending'
    )
    on conflict(user_id) do update set
      full_name=excluded.full_name,
      job_title=excluded.job_title,
      responsible_label=excluded.responsible_label,
      requested_role=excluded.requested_role,
      approval_status='pending',
      is_active=false,
      updated_at=now();
  end if;
  return new;
end $$;

drop trigger if exists accreditation_v3_auth_signup on auth.users;
create trigger accreditation_v3_auth_signup
after insert on auth.users
for each row execute function public.accreditation_v3_handle_signup();

-- Existing admins/quality-office users can read and manage registration requests.
drop policy if exists "v3 own profile" on public.accreditation_v3_profiles;
drop policy if exists "v4 reviewer manages profiles" on public.accreditation_v3_profiles;
create policy "v3 own profile" on public.accreditation_v3_profiles for select to authenticated
using(user_id=auth.uid() or public.accreditation_v3_is_reviewer() or public.accreditation_v3_is_director());
create policy "v4 reviewer manages profiles" on public.accreditation_v3_profiles for update to authenticated
using(public.accreditation_v3_is_reviewer())
with check(public.accreditation_v3_is_reviewer());

-- Only approved/active responsible users can modify their assigned indicators and upload evidence.
drop policy if exists "v3 department update own indicators" on public.accreditation_v3_indicators;
create policy "v3 department update own indicators" on public.accreditation_v3_indicators for update to authenticated
using(
 public.accreditation_v3_is_reviewer()
 or (
   responsible_user_id=auth.uid()
   and exists(select 1 from public.accreditation_v3_profiles p where p.user_id=auth.uid() and p.is_active and p.approval_status='approved')
 )
)
with check(
 public.accreditation_v3_is_reviewer()
 or (
   responsible_user_id=auth.uid()
   and exists(select 1 from public.accreditation_v3_profiles p where p.user_id=auth.uid() and p.is_active and p.approval_status='approved')
 )
);

drop policy if exists "v3 documents upload own" on public.accreditation_v3_documents;
create policy "v3 documents upload own" on public.accreditation_v3_documents for insert to authenticated
with check(
 uploaded_by=auth.uid()
 and exists(
   select 1 from public.accreditation_v3_indicators i
   join public.accreditation_v3_profiles p on p.user_id=auth.uid()
   where i.id=indicator_id and i.responsible_user_id=auth.uid() and p.is_active and p.approval_status='approved'
 )
);

select 'ACCREDITATION V4 READY' as result,
       (select count(*) from public.accreditation_v3_profiles where approval_status='pending') as pending_profiles,
       (select count(*) from public.accreditation_v3_indicators) as indicators;
