-- Preserve public downloads while requiring the same admin + MFA claims used
-- by the existing admin panel for any metadata or Storage mutation.
alter table public.documents enable row level security;
revoke all on public.documents from public,anon,authenticated;
grant select on public.documents to anon,authenticated;
grant insert,update,delete on public.documents to authenticated;

drop policy if exists "Allow public read documents table" on public.documents;
drop policy if exists "Allow public insert documents table" on public.documents;
drop policy if exists "Allow public update documents table" on public.documents;
drop policy if exists "Allow public delete documents table" on public.documents;
create policy "read published documents" on public.documents for select to anon,authenticated using (published is true);
create policy "manage documents with MFA" on public.documents for all to authenticated
using ((select auth.jwt()->'app_metadata'->>'role')='admin' and (select auth.jwt()->>'aal')='aal2')
with check ((select auth.jwt()->'app_metadata'->>'role')='admin' and (select auth.jwt()->>'aal')='aal2');

drop policy if exists "Allow public read document previews" on storage.objects;
drop policy if exists "Allow public upload document previews" on storage.objects;
drop policy if exists "document-previews mkj6zh_0" on storage.objects;
drop policy if exists "document-previews mkj6zh_1" on storage.objects;
drop policy if exists "document-previews mkj6zh_2" on storage.objects;
drop policy if exists "document-previews mkj6zh_3" on storage.objects;
drop policy if exists "documents flreew_0" on storage.objects;
drop policy if exists "documents flreew_1" on storage.objects;
drop policy if exists "documents flreew_2" on storage.objects;
drop policy if exists "documents flreew_3" on storage.objects;
create policy "manage document storage with MFA" on storage.objects for all to authenticated
using (bucket_id in ('documents','document-previews') and (select auth.jwt()->'app_metadata'->>'role')='admin' and (select auth.jwt()->>'aal')='aal2')
with check (bucket_id in ('documents','document-previews') and (select auth.jwt()->'app_metadata'->>'role')='admin' and (select auth.jwt()->>'aal')='aal2');

create table public.document_public_revisions (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.documents(id) on delete cascade,
  archived_at timestamptz not null default now(),
  snapshot jsonb not null check (snapshot->>'published'='true')
);
create index document_public_revisions_document_idx on public.document_public_revisions(document_id,archived_at desc);
alter table public.document_public_revisions enable row level security;
revoke all on public.document_public_revisions from public,anon,authenticated;
grant select on public.document_public_revisions to anon,authenticated,service_role;
create policy "read revisions of published documents" on public.document_public_revisions
for select to anon,authenticated
using (exists(select 1 from public.documents d where d.id=document_id and d.published is true));

-- Private, trigger-only function; ordinary clients never receive insert privileges
-- on revision storage. The UPDATE on the parent has already passed MFA RLS.
create schema if not exists site_document_internal;
revoke all on schema site_document_internal from public,anon,authenticated;
create function site_document_internal.archive_revision()
returns trigger language plpgsql security definer set search_path='' as $$
begin
  if old.published is true and new is distinct from old then
    insert into public.document_public_revisions(document_id,snapshot) values(old.id,to_jsonb(old));
  end if;
  return new;
end $$;
revoke all on function site_document_internal.archive_revision() from public,anon,authenticated;
create trigger document_public_revision_archive
before update on public.documents for each row
execute function site_document_internal.archive_revision();
