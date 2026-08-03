-- Helper table and import procedure for the 272 indicators.
-- Import CSV into accreditation_indicator_import_stage using Supabase Table Editor,
-- then execute the INSERT statement below.

create table if not exists public.accreditation_indicator_import_stage (
  code text,
  title text,
  description text,
  evidence_requirements text,
  department_name text,
  working_group_name text,
  responsible_name text,
  deadline date,
  weight numeric(8,2)
);

-- Run after loading the CSV into the staging table.
--
-- with project as (
--   select id from public.accreditation_projects
--   where accreditation_type = 'institutional'
--   order by created_at limit 1
-- )
-- insert into public.accreditation_indicators (
--   project_id, working_group_id, department_id, code, title,
--   description, evidence_requirements, responsible_name, deadline, weight
-- )
-- select
--   project.id,
--   wg.id,
--   d.id,
--   s.code,
--   s.title,
--   s.description,
--   s.evidence_requirements,
--   s.responsible_name,
--   s.deadline,
--   coalesce(s.weight, 1)
-- from public.accreditation_indicator_import_stage s
-- cross join project
-- left join public.accreditation_departments d on d.name = s.department_name
-- left join public.accreditation_working_groups wg
--   on wg.project_id = project.id and wg.name = s.working_group_name
-- on conflict (project_id, code) do update set
--   title = excluded.title,
--   description = excluded.description,
--   evidence_requirements = excluded.evidence_requirements,
--   working_group_id = excluded.working_group_id,
--   department_id = excluded.department_id,
--   responsible_name = excluded.responsible_name,
--   deadline = excluded.deadline,
--   weight = excluded.weight;
