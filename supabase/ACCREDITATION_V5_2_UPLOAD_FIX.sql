-- V5.2: accreditation document upload repair
insert into storage.buckets(id,name,public,file_size_limit)
values('accreditation-v3-evidence','accreditation-v3-evidence',false,52428800)
on conflict(id) do update set public=false,file_size_limit=52428800;

drop policy if exists "v3 evidence upload" on storage.objects;
drop policy if exists "v3 evidence read" on storage.objects;
drop policy if exists "v3 evidence delete own" on storage.objects;

create policy "v3 evidence upload"
on storage.objects for insert to authenticated
with check (
 bucket_id='accreditation-v3-evidence'
 and (storage.foldername(name))[1]=auth.uid()::text
 and exists(
   select 1 from public.accreditation_v3_profiles p
   where p.user_id=auth.uid()
     and p.approval_status='approved'
     and p.is_active=true
 )
);

create policy "v3 evidence read"
on storage.objects for select to authenticated
using(bucket_id='accreditation-v3-evidence');

create policy "v3 evidence delete own"
on storage.objects for delete to authenticated
using(
 bucket_id='accreditation-v3-evidence'
 and (storage.foldername(name))[1]=auth.uid()::text
);

drop policy if exists "v3 documents insert own" on public.accreditation_v3_documents;
create policy "v3 documents insert own"
on public.accreditation_v3_documents for insert to authenticated
with check(
 uploaded_by=auth.uid()
 and exists(
  select 1 from public.accreditation_v3_indicators i
  join public.accreditation_v3_profiles p on p.user_id=auth.uid()
  where i.id=indicator_id
    and i.responsible_user_id=auth.uid()
    and p.approval_status='approved'
    and p.is_active=true
 )
);

select 'V5.2 upload policies ready' as result;
