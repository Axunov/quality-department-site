-- Accreditation V7.1: username access and first-login password change.
alter table public.accreditation_v3_profiles add column if not exists username text;
alter table public.accreditation_v3_profiles add column if not exists recovery_email text;
alter table public.accreditation_v3_profiles add column if not exists phone text;
alter table public.accreditation_v3_profiles add column if not exists must_change_password boolean not null default false;
alter table public.accreditation_v3_profiles add column if not exists last_login_at timestamptz;
create unique index if not exists accreditation_v71_profiles_username_idx on public.accreditation_v3_profiles(lower(username)) where username is not null;

create or replace function public.accreditation_v71_mark_login()
returns boolean language plpgsql security definer set search_path=public as $$
begin update public.accreditation_v3_profiles set last_login_at=now() where user_id=(select auth.uid());return found;end $$;
create or replace function public.accreditation_v71_mark_password_changed()
returns boolean language plpgsql security definer set search_path=public as $$
begin update public.accreditation_v3_profiles set must_change_password=false where user_id=(select auth.uid());return found;end $$;
revoke all on function public.accreditation_v71_mark_login() from public,anon;
revoke all on function public.accreditation_v71_mark_password_changed() from public,anon;
grant execute on function public.accreditation_v71_mark_login() to authenticated;
grant execute on function public.accreditation_v71_mark_password_changed() to authenticated;
