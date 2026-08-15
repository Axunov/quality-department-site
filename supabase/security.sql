-- Run in Supabase SQL Editor after replacing administrator@example.com.
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
where email = 'administrator@example.com';

alter table public.news enable row level security;
alter table public.documents enable row level security;
alter table public.employees enable row level security;

drop policy if exists "public reads published news" on public.news;
create policy "public reads published news" on public.news for select using (published = true);
drop policy if exists "public reads documents" on public.documents;
create policy "public reads documents" on public.documents for select using (true);
drop policy if exists "public reads employees" on public.employees;
create policy "public reads employees" on public.employees for select using (true);

drop policy if exists "admins manage news" on public.news;
create policy "admins manage news" on public.news for all
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
drop policy if exists "admins manage documents" on public.documents;
create policy "admins manage documents" on public.documents for all
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
drop policy if exists "admins manage employees" on public.employees;
create policy "admins manage employees" on public.employees for all
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
