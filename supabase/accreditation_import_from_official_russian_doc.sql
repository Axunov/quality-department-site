-- File content is generated from the uploaded official Russian indicator table.
-- The full import is intentionally applied through the companion CSV import workflow.
-- This migration prepares the schema and dynamic progress calculation.

alter table public.accreditation_indicators
  add column if not exists chapter text,
  add column if not exists criterion text;

create or replace view public.accreditation_overall_progress as
select
  p.id as project_id,
  count(i.id)::int as total_indicators,
  count(i.id) filter (where i.status='approved')::int as approved_indicators,
  count(i.id) filter (where i.status='review')::int as review_indicators,
  count(i.id) filter (where i.status='revision')::int as revision_indicators,
  case when count(i.id)=0 then 0
       else round(100.0 * count(i.id) filter (where i.status='approved') / count(i.id))::int
  end as completion_percent
from public.accreditation_projects p
left join public.accreditation_indicators i on i.project_id=p.id
group by p.id;

create or replace view public.accreditation_chapter_progress as
select
  project_id,
  chapter,
  count(*)::int as total_indicators,
  count(*) filter (where status='approved')::int as approved_indicators,
  count(*) filter (where status='review')::int as review_indicators,
  count(*) filter (where status='revision')::int as revision_indicators,
  case when count(*)=0 then 0
       else round(100.0 * count(*) filter (where status='approved') / count(*))::int
  end as completion_percent
from public.accreditation_indicators
group by project_id, chapter;

-- Progress rule:
-- draft / in_progress / review / revision = 0 accepted progress;
-- approved = one completed indicator.
-- Therefore every page starts at 0% and rises only after approval.
