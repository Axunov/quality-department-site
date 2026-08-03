-- Public read access for the accreditation monitoring pages.
-- Upload, submission, review and approval remain restricted to authenticated users.

-- The official indicator list and progress may be viewed on the public site.
drop policy if exists "public users read indicators" on public.accreditation_indicators;
create policy "public users read indicators"
  on public.accreditation_indicators
  for select
  to anon, authenticated
  using (true);

drop policy if exists "public users read accreditation projects" on public.accreditation_projects;
create policy "public users read accreditation projects"
  on public.accreditation_projects
  for select
  to anon, authenticated
  using (true);

grant select on public.accreditation_indicators to anon, authenticated;
grant select on public.accreditation_projects to anon, authenticated;
grant select on public.accreditation_overall_progress to anon, authenticated;
grant select on public.accreditation_chapter_progress to anon, authenticated;

-- Documents, comments, reviews, memberships and history remain non-public.
