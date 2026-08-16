-- V6.1: security hardening, deadline reminders and query indexes.

-- Legacy views remain available only with the caller's permissions/RLS.
alter view if exists public.accreditation_overall_progress set (security_invoker=true);
alter view if exists public.accreditation_chapter_progress set (security_invoker=true);
alter view if exists public.accreditation_director_dashboard set (security_invoker=true);
alter view if exists public.accreditation_department_dashboard set (security_invoker=true);
alter view if exists public.accreditation_department_progress set (security_invoker=true);

-- Import staging is server-only. Enabling RLS with no client policy intentionally
-- blocks access through the Data API while retaining owner/service access.
alter table if exists public.accreditation_indicator_import_stage enable row level security;

alter function public.accreditation_v5_position_keys(text) set search_path=public,pg_temp;

-- PostgreSQL grants EXECUTE to PUBLIC on new functions. Remove it from every
-- accreditation helper and grant back only the entry points used by clients.
do $$
declare f record;
begin
  for f in
    select p.oid::regprocedure signature
    from pg_proc p join pg_namespace n on n.oid=p.pronamespace
    where n.nspname='public' and p.proname like 'accreditation_v%'
  loop
    execute format('revoke execute on function %s from public, anon',f.signature);
  end loop;
end $$;

grant execute on function public.accreditation_v3_is_reviewer() to authenticated;
grant execute on function public.accreditation_v3_is_director() to authenticated;
grant execute on function public.accreditation_v57_delete_employee(uuid) to authenticated;
grant execute on function public.accreditation_v5_reset_employee_access(uuid) to authenticated;
grant execute on function public.accreditation_v6_bulk_assign(uuid,uuid[],date,text) to authenticated;
grant execute on function public.accreditation_v6_set_deadlines(uuid[],date,text) to authenticated;
grant execute on function public.accreditation_v6_mark_notifications_read(uuid[]) to authenticated;
grant execute on function public.accreditation_v6_health() to anon,authenticated;

create or replace function public.accreditation_v6_create_snapshot(snapshot_reason text default 'manual')
returns bigint language plpgsql security definer set search_path=public,pg_temp as $$
declare snapshot_id bigint;
begin
  if auth.uid() is null or not (public.accreditation_v3_is_reviewer() or public.accreditation_v3_is_director()) then
    raise exception 'Not allowed';
  end if;
  insert into public.accreditation_v6_snapshots(created_by,reason,indicator_count,document_count,payload)
  select auth.uid(),left(coalesce(snapshot_reason,'manual'),80),
    (select count(*) from accreditation_v3_indicators),
    (select count(*) from accreditation_v3_documents),
    jsonb_build_object(
      'created_at',now(),
      'projects',(select jsonb_agg(to_jsonb(x)) from accreditation_v3_project_progress x),
      'indicators',(select jsonb_agg(to_jsonb(i)) from accreditation_v3_indicators i),
      'documents',(select jsonb_agg(to_jsonb(d)) from accreditation_v3_documents d),
      'reviews',(select jsonb_agg(to_jsonb(r)) from accreditation_v3_reviews r),
      'profiles',(select jsonb_agg(to_jsonb(p)) from accreditation_v3_profiles p)
    )
  returning id into snapshot_id;
  return snapshot_id;
end $$;
revoke execute on function public.accreditation_v6_create_snapshot(text) from public,anon;
grant execute on function public.accreditation_v6_create_snapshot(text) to authenticated;

create or replace function public.accreditation_v61_scheduled_snapshot()
returns bigint language plpgsql security definer set search_path=public,pg_temp as $$
declare snapshot_id bigint;
begin
  insert into public.accreditation_v6_snapshots(created_by,reason,indicator_count,document_count,payload)
  select null,'scheduled',
    (select count(*) from accreditation_v3_indicators),
    (select count(*) from accreditation_v3_documents),
    jsonb_build_object(
      'created_at',now(),
      'projects',(select jsonb_agg(to_jsonb(x)) from accreditation_v3_project_progress x),
      'indicators',(select jsonb_agg(to_jsonb(i)) from accreditation_v3_indicators i),
      'documents',(select jsonb_agg(to_jsonb(d)) from accreditation_v3_documents d),
      'reviews',(select jsonb_agg(to_jsonb(r)) from accreditation_v3_reviews r),
      'profiles',(select jsonb_agg(to_jsonb(p)) from accreditation_v3_profiles p)
    ) returning id into snapshot_id;
  return snapshot_id;
end $$;
revoke execute on function public.accreditation_v61_scheduled_snapshot() from public,anon,authenticated;

alter table public.accreditation_v6_notifications add column if not exists dedupe_key text;
create unique index if not exists accreditation_v6_notifications_dedupe_idx
  on public.accreditation_v6_notifications(dedupe_key) where dedupe_key is not null;

create or replace function public.accreditation_v61_deadline_reminders()
returns integer language plpgsql security definer set search_path=public,pg_temp as $$
declare affected integer;
begin
  insert into public.accreditation_v6_notifications(
    user_id,indicator_id,kind,title_ru,title_uz,title_en,
    body_ru,body_uz,body_en,dedupe_key
  )
  select i.responsible_user_id,i.id,
    case when i.due_date<current_date then 'overdue' else 'deadline' end,
    case when i.due_date<current_date then 'Индикатор просрочен' else 'Приближается срок индикатора' end,
    case when i.due_date<current_date then 'Indikator muddati o‘tdi' else 'Indikator muddati yaqinlashmoqda' end,
    case when i.due_date<current_date then 'Indicator overdue' else 'Indicator deadline approaching' end,
    i.code||' · '||case when i.due_date<current_date then 'Просрочено на '||(current_date-i.due_date)||' дн.' else 'Осталось '||(i.due_date-current_date)||' дн.' end,
    i.code||' · '||case when i.due_date<current_date then (current_date-i.due_date)||' kun kechikdi' else (i.due_date-current_date)||' kun qoldi' end,
    i.code||' · '||case when i.due_date<current_date then (current_date-i.due_date)||' days overdue' else (i.due_date-current_date)||' days left' end,
    'deadline:'||i.id||':'||current_date
  from public.accreditation_v3_indicators i
  where i.responsible_user_id is not null and i.status<>'approved' and i.due_date is not null
    and (i.due_date-current_date in (7,3,1,0) or i.due_date<current_date)
  on conflict(dedupe_key) where dedupe_key is not null do nothing;
  get diagnostics affected=row_count;
  return affected;
end $$;
revoke execute on function public.accreditation_v61_deadline_reminders() from public,anon,authenticated;

create index if not exists accreditation_v3_indicators_owner_status_idx
  on public.accreditation_v3_indicators(responsible_user_id,status);
create index if not exists accreditation_v3_indicators_due_open_idx
  on public.accreditation_v3_indicators(due_date) where status<>'approved';
create index if not exists accreditation_v3_history_created_idx
  on public.accreditation_v3_history(created_at desc);
create index if not exists accreditation_v6_notifications_user_unread_idx
  on public.accreditation_v6_notifications(user_id,created_at desc) where read_at is null;

-- Remove the duplicate V3 document insert policy left by earlier migrations.
drop policy if exists "v3 documents upload own" on public.accreditation_v3_documents;

do $$ begin
  perform cron.unschedule('accreditation-v6-daily-snapshot');
exception when others then null; end $$;
select cron.schedule('accreditation-v6-daily-snapshot','30 2 * * *',
  $$select public.accreditation_v61_scheduled_snapshot()$$);

do $$ begin
  perform cron.unschedule('accreditation-v61-deadline-reminders');
exception when others then null; end $$;
select cron.schedule('accreditation-v61-deadline-reminders','0 3 * * *',
  $$select public.accreditation_v61_deadline_reminders()$$);
