-- ACCREDITATION V5: RESET TEST REGISTRATIONS
-- Run ONCE before production if you want a clean registration journal.
-- This deletes accreditation self-registration auth accounts and profiles,
-- but DOES NOT delete accreditation indicators, projects, documents or progress.
-- Existing non-accreditation site accounts are not touched.

update public.accreditation_v3_indicators set responsible_user_id=null;

delete from auth.users
where coalesce(raw_user_meta_data->>'accreditation_signup','')='true';

-- Any legacy accreditation profiles not linked to an accreditation-signup account:
delete from public.accreditation_v3_profiles
where approval_status in ('pending','rejected');

select 'REGISTRATION JOURNAL RESET' as result,
       (select count(*) from public.accreditation_v3_profiles) as remaining_profiles;
