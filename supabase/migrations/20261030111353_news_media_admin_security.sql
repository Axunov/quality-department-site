-- Public visitors may read published news. All mutations use MFA-checked server routes.
drop policy if exists "Allow public insert news" on public.news;
drop policy if exists "Allow public update news" on public.news;
drop policy if exists "Allow public delete news" on public.news;
create policy "news admin insert" on public.news for insert to authenticated
  with check ((select auth.jwt()->'app_metadata'->>'role') = 'admin' and (select auth.jwt()->>'aal') = 'aal2');
create policy "news admin update" on public.news for update to authenticated
  using ((select auth.jwt()->'app_metadata'->>'role') = 'admin' and (select auth.jwt()->>'aal') = 'aal2')
  with check ((select auth.jwt()->'app_metadata'->>'role') = 'admin' and (select auth.jwt()->>'aal') = 'aal2');
create policy "news admin delete" on public.news for delete to authenticated
  using ((select auth.jwt()->'app_metadata'->>'role') = 'admin' and (select auth.jwt()->>'aal') = 'aal2');

-- Uploads use short-lived signed paths minted only after the administrator MFA check.
drop policy if exists "news 20edv_1" on storage.objects;
drop policy if exists "news 20edv_2" on storage.objects;
drop policy if exists "news 20edv_3" on storage.objects;
