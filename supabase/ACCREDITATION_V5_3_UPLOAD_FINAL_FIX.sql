-- V5.3 final upload compatibility fix
alter table public.accreditation_v3_documents add column if not exists mime_type text;
alter table public.accreditation_v3_documents add column if not exists file_size bigint;

-- Ensure bucket exists
insert into storage.buckets(id,name,public,file_size_limit)
values('accreditation-v3-evidence','accreditation-v3-evidence',false,52428800)
on conflict(id) do update set public=false,file_size_limit=52428800;

select 'V5.3 READY' as result;
