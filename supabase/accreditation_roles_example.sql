-- Example role assignments. Replace UUID values before running.
-- Find user UUIDs in Supabase Authentication → Users.

-- insert into public.accreditation_memberships (user_id, department_id, role)
-- select
--   '00000000-0000-0000-0000-000000000000'::uuid,
--   d.id,
--   'department_head'::public.accreditation_role
-- from public.accreditation_departments d
-- where d.name = 'Учебный отдел';

-- insert into public.accreditation_memberships (user_id, role)
-- values (
--   '00000000-0000-0000-0000-000000000000'::uuid,
--   'quality_office'::public.accreditation_role
-- );

-- insert into public.accreditation_memberships (user_id, role)
-- values (
--   '00000000-0000-0000-0000-000000000000'::uuid,
--   'director'::public.accreditation_role
-- );
