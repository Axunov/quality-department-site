-- V5.8: private director statistics, stricter evidence access and six department-head roles.

create or replace function public.accreditation_v3_is_director()
returns boolean language sql stable security definer set search_path=public as $$
 select exists(
   select 1 from public.accreditation_v3_profiles p
   where p.user_id=auth.uid() and p.is_active and p.approval_status='approved' and p.role='director'
 );
$$;

drop policy if exists "v3 public indicator progress" on public.accreditation_v3_indicators;
drop policy if exists "v58 private indicator state" on public.accreditation_v3_indicators;
create policy "v58 private indicator state" on public.accreditation_v3_indicators for select to authenticated
using(
  responsible_user_id=auth.uid()
  or public.accreditation_v3_is_reviewer()
  or public.accreditation_v3_is_director()
);

revoke select on public.accreditation_v3_project_progress from anon;
revoke select on public.accreditation_v3_responsible_progress from anon;
grant select on public.accreditation_v3_project_progress to authenticated;
grant select on public.accreditation_v3_responsible_progress to authenticated;

alter view public.accreditation_v3_project_progress set (security_invoker=true);
alter view public.accreditation_v3_responsible_progress set (security_invoker=true);

drop policy if exists "v3 evidence upload" on storage.objects;
drop policy if exists "v3 evidence read" on storage.objects;
create policy "v58 evidence upload own" on storage.objects for insert to authenticated
with check(
  bucket_id='accreditation-v3-evidence'
  and (storage.foldername(name))[1]=auth.uid()::text
  and exists(select 1 from public.accreditation_v3_profiles p where p.user_id=auth.uid() and p.is_active and p.approval_status='approved')
);
create policy "v58 evidence read permitted" on storage.objects for select to authenticated
using(
  bucket_id='accreditation-v3-evidence'
  and ((storage.foldername(name))[1]=auth.uid()::text or public.accreditation_v3_is_reviewer() or public.accreditation_v3_is_director())
);

-- Preserve the distinct department in the employee profile while allowing
-- the existing generic department-head indicator mapping to recognize it.
create or replace function public.accreditation_v5_assign_user(target_user uuid, target_key text)
returns void language plpgsql security definer set search_path=public as $$
declare match_key text:=target_key;
begin
  if target_key like 'department_head_%' then match_key:='department_head'; end if;
  if match_key is null or match_key='' or match_key='director' then return; end if;
  update public.accreditation_v3_indicators set responsible_user_id=null
   where responsible_user_id=target_user and not (match_key=any(position_keys));
  update public.accreditation_v3_indicators set responsible_user_id=target_user
   where match_key=any(position_keys) and responsible_user_id is null;
end $$;

select 'ACCREDITATION V5.8 READY' result;
