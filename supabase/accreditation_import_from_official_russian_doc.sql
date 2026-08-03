-- Подготовка структуры для импорта официальных индикаторов
alter table public.accreditation_indicators
  add column if not exists chapter text,
  add column if not exists criterion text;

-- Общая готовность рассчитывается как средний фактический процент индикаторов.
-- Не начато = 0, файл загружен = 25, отправлено на проверку = 75,
-- возвращено на доработку = 50, принято = 100.
create or replace view public.accreditation_overall_progress as
select
  p.id as project_id,
  count(i.id)::int as total_indicators,
  count(i.id) filter (where i.status='approved')::int as approved_indicators,
  count(i.id) filter (where i.status='review')::int as review_indicators,
  count(i.id) filter (where i.status='revision')::int as revision_indicators,
  coalesce(round(avg(i.completion_percent)), 0)::int as completion_percent
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
  coalesce(round(avg(completion_percent)), 0)::int as completion_percent
from public.accreditation_indicators
group by project_id, chapter;

-- Все импортированные строки должны начинаться с нуля.
update public.accreditation_indicators
set completion_percent=0,
    status='draft',
    submitted_at=null,
    approved_at=null;
