-- V6.1.1: trigger helpers are never callable through the Data API.
revoke execute on function public.accreditation_v3_handle_signup() from authenticated;
revoke execute on function public.accreditation_v3_log_status() from authenticated;
revoke execute on function public.accreditation_v5_assign_user(uuid,text) from authenticated;
revoke execute on function public.accreditation_v5_profile_assignment_trigger() from authenticated;
revoke execute on function public.accreditation_v6_document_event() from authenticated;
revoke execute on function public.accreditation_v6_indicator_events() from authenticated;
revoke execute on function public.accreditation_v6_review_event() from authenticated;

create or replace function public.accreditation_v6_health()
returns jsonb language sql security invoker set search_path=public,pg_temp as $$
select jsonb_build_object(
  'ok',true,
  'checked_at',now(),
  'projects',(select count(*) from accreditation_v3_projects),
  'indicators',(select count(*) from accreditation_v3_indicators),
  'documents',(select count(*) from accreditation_v3_documents),
  'latest_snapshot',(select max(created_at) from accreditation_v6_snapshots)
);
$$;
revoke execute on function public.accreditation_v6_health() from public,anon;
grant execute on function public.accreditation_v6_health() to authenticated;
