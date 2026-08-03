-- Initial 12 accreditation working groups.
-- Run after supabase/accreditation_workspace.sql.

with project as (
  select id
  from public.accreditation_projects
  where accreditation_type = 'institutional'
  order by created_at
  limit 1
)
insert into public.accreditation_working_groups (
  project_id,
  name,
  lead_name,
  description,
  status
)
select project.id, group_data.name, group_data.lead_name, group_data.description, 'in_progress'::public.accreditation_status
from project
cross join (
  values
    ('Стратегическое развитие', 'К. Олимов', 'Стратегическое планирование и развитие института.'),
    ('Образовательная деятельность', 'С. Хошимов', 'Организация и сопровождение образовательного процесса.'),
    ('Учебно-методическая работа', 'С. Хошимов', 'Учебно-методическое обеспечение образовательных программ.'),
    ('Духовно-просветительская работа и молодёжь', 'С. Саиджалалова', 'Воспитательная работа и поддержка студентов.'),
    ('Кадровый потенциал', 'А. Усмонов', 'Кадровое обеспечение и развитие персонала.'),
    ('Научная и инновационная деятельность', 'Ш. Садуллаева', 'Научная, инновационная и исследовательская деятельность.'),
    ('Международное сотрудничество', 'А. Баходиров', 'Международные связи, мобильность и совместные проекты.'),
    ('Работодатели и практическая подготовка', 'Э. Менгнаров', 'Взаимодействие с работодателями и организация практики.'),
    ('Материально-техническая база и финансы', 'Б. Хаитов', 'Финансовое обеспечение, инфраструктура и материальная база.'),
    ('Библиотечно-информационное обеспечение', 'Д. Сайфуллаева', 'Библиотечные ресурсы и информационное обеспечение.'),
    ('Цифровая образовательная среда', 'З. Азизов', 'Цифровая инфраструктура, информационные системы и LMS.'),
    ('Внутренняя система обеспечения качества', 'Ф. Рустамов', 'Внутренняя оценка, мониторинг и совершенствование качества.')
) as group_data(name, lead_name, description)
where not exists (
  select 1
  from public.accreditation_working_groups existing
  where existing.project_id = project.id
    and existing.name = group_data.name
);
