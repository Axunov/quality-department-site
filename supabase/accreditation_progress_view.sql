-- Summary view for dashboards.

create or replace view public.accreditation_department_progress as
select
  d.id as department_id,
  d.name as department_name,
  d.head_name,
  count(i.id) as indicator_count,
  count(i.id) filter (where i.status = 'approved') as approved_count,
  count(i.id) filter (where i.status = 'revision') as revision_count,
  count(i.id) filter (where i.deadline < current_date and i.status <> 'approved') as overdue_count,
  coalesce(round(avg(i.completion_percent)), 0) as progress_percent
from public.accreditation_departments d
left join public.accreditation_indicators i on i.department_id = d.id
group by d.id, d.name, d.head_name;

grant select on public.accreditation_department_progress to authenticated;
