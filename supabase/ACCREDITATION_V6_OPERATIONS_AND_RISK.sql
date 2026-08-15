-- Accreditation V6: deadlines, notifications, audit, bulk assignment,
-- director risk monitoring and daily logical snapshots. Safe to rerun.

alter table public.accreditation_v3_indicators add column if not exists due_date date;
alter table public.accreditation_v3_indicators add column if not exists priority text not null default 'normal';
alter table public.accreditation_v3_indicators add column if not exists assigned_at timestamptz;
alter table public.accreditation_v3_history add column if not exists action text not null default 'status_changed';

do $$ begin
  alter table public.accreditation_v3_indicators add constraint accreditation_v3_priority_check
  check(priority in ('low','normal','high','critical'));
exception when duplicate_object then null; end $$;

create table if not exists public.accreditation_v6_notifications(
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  indicator_id uuid references public.accreditation_v3_indicators(id) on delete cascade,
  kind text not null check(kind in ('assigned','approved','revision','deadline','system')),
  title_ru text not null, title_uz text not null, title_en text not null,
  body_ru text, body_uz text, body_en text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists accreditation_v6_notifications_user_idx on public.accreditation_v6_notifications(user_id,created_at desc);

create table if not exists public.accreditation_v6_snapshots(
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users(id),
  reason text not null default 'scheduled',
  indicator_count integer not null,
  document_count integer not null,
  payload jsonb not null
);

alter table public.accreditation_v6_notifications enable row level security;
alter table public.accreditation_v6_snapshots enable row level security;
drop policy if exists "v6 notifications own read" on public.accreditation_v6_notifications;
create policy "v6 notifications own read" on public.accreditation_v6_notifications for select to authenticated using(user_id=auth.uid() or public.accreditation_v3_is_reviewer() or public.accreditation_v3_is_director());
drop policy if exists "v6 notifications own update" on public.accreditation_v6_notifications;
create policy "v6 notifications own update" on public.accreditation_v6_notifications for update to authenticated using(user_id=auth.uid()) with check(user_id=auth.uid());
drop policy if exists "v6 snapshots privileged read" on public.accreditation_v6_snapshots;
create policy "v6 snapshots privileged read" on public.accreditation_v6_snapshots for select to authenticated using(public.accreditation_v3_is_reviewer() or public.accreditation_v3_is_director());

create or replace function public.accreditation_v6_indicator_events()
returns trigger language plpgsql security definer set search_path=public as $$
declare actor uuid:=auth.uid(); project_name text; message_ru text; message_uz text; message_en text;
begin
  select coalesce(name_ru,code) into project_name from public.accreditation_v3_projects where id=new.project_id;
  if tg_op='UPDATE' then
    if new.responsible_user_id is distinct from old.responsible_user_id and new.responsible_user_id is not null then
      new.assigned_at:=now();
      insert into public.accreditation_v6_notifications(user_id,indicator_id,kind,title_ru,title_uz,title_en,body_ru,body_uz,body_en)
      values(new.responsible_user_id,new.id,'assigned','Назначен новый индикатор','Yangi indikator biriktirildi','New indicator assigned',project_name||' · '||new.code,project_name||' · '||new.code,project_name||' · '||new.code);
      insert into public.accreditation_v3_history(indicator_id,actor_id,old_status,new_status,action,details)
      values(new.id,actor,old.status,new.status,'assigned',jsonb_build_object('old_user_id',old.responsible_user_id,'new_user_id',new.responsible_user_id));
    end if;
    if new.status is distinct from old.status then
      insert into public.accreditation_v3_history(indicator_id,actor_id,old_status,new_status,action,details)
      values(new.id,actor,old.status,new.status,'status_changed',jsonb_build_object('code',new.code));
      if new.responsible_user_id is not null and new.status in ('approved','revision') then
        if new.status='approved' then
          message_ru:='Ответ по индикатору принят'; message_uz:='Indikator bo‘yicha javob qabul qilindi'; message_en:='The indicator response was approved';
        else
          message_ru:='Ответ по индикатору возвращён на доработку'; message_uz:='Indikator bo‘yicha javob qayta ishlashga qaytarildi'; message_en:='The indicator response was returned for revision';
        end if;
        insert into public.accreditation_v6_notifications(user_id,indicator_id,kind,title_ru,title_uz,title_en,body_ru,body_uz,body_en)
        values(new.responsible_user_id,new.id,new.status,message_ru,message_uz,message_en,project_name||' · '||new.code,project_name||' · '||new.code,project_name||' · '||new.code);
      end if;
    end if;
    if new.due_date is distinct from old.due_date or new.priority is distinct from old.priority then
      insert into public.accreditation_v3_history(indicator_id,actor_id,old_status,new_status,action,details)
      values(new.id,actor,old.status,new.status,'deadline_changed',jsonb_build_object('old_due_date',old.due_date,'new_due_date',new.due_date,'priority',new.priority));
    end if;
  end if;
  new.updated_at:=now(); return new;
end $$;

drop trigger if exists accreditation_v6_indicator_events on public.accreditation_v3_indicators;
create trigger accreditation_v6_indicator_events before update on public.accreditation_v3_indicators for each row execute function public.accreditation_v6_indicator_events();

create or replace function public.accreditation_v6_document_event()
returns trigger language plpgsql security definer set search_path=public as $$
begin
  insert into public.accreditation_v3_history(indicator_id,actor_id,old_status,new_status,action,details)
  select new.indicator_id,coalesce(new.uploaded_by,auth.uid()),i.status,i.status,'document_uploaded',jsonb_build_object('document_id',new.id,'file_name',new.file_name,'version',new.version)
  from public.accreditation_v3_indicators i where i.id=new.indicator_id;
  return new;
end $$;
drop trigger if exists accreditation_v6_document_event on public.accreditation_v3_documents;
create trigger accreditation_v6_document_event after insert on public.accreditation_v3_documents for each row execute function public.accreditation_v6_document_event();

create or replace function public.accreditation_v6_review_event()
returns trigger language plpgsql security definer set search_path=public as $$
begin
  insert into public.accreditation_v3_history(indicator_id,actor_id,action,details)
  values(new.indicator_id,coalesce(new.reviewer_id,auth.uid()),case when new.decision='approved' then 'review_approved' else 'review_revision' end,jsonb_build_object('review_id',new.id,'comment',new.comment));
  return new;
end $$;
drop trigger if exists accreditation_v6_review_event on public.accreditation_v3_reviews;
create trigger accreditation_v6_review_event after insert on public.accreditation_v3_reviews for each row execute function public.accreditation_v6_review_event();

create or replace function public.accreditation_v6_bulk_assign(target_user uuid, indicator_ids uuid[], target_due_date date default null, target_priority text default 'normal')
returns integer language plpgsql security definer set search_path=public as $$
declare affected integer;
begin
  if not public.accreditation_v3_is_reviewer() then raise exception 'Not allowed'; end if;
  if target_priority not in ('low','normal','high','critical') then raise exception 'Invalid priority'; end if;
  update public.accreditation_v3_indicators set responsible_user_id=target_user,due_date=coalesce(target_due_date,due_date),priority=target_priority where id=any(indicator_ids);
  get diagnostics affected=row_count; return affected;
end $$;

create or replace function public.accreditation_v6_set_deadlines(indicator_ids uuid[], target_due_date date, target_priority text default 'normal')
returns integer language plpgsql security definer set search_path=public as $$
declare affected integer;
begin
  if not public.accreditation_v3_is_reviewer() then raise exception 'Not allowed'; end if;
  update public.accreditation_v3_indicators set due_date=target_due_date,priority=target_priority where id=any(indicator_ids);
  get diagnostics affected=row_count; return affected;
end $$;

create or replace function public.accreditation_v6_mark_notifications_read(notification_ids uuid[] default null)
returns integer language plpgsql security definer set search_path=public as $$
declare affected integer;
begin
  update public.accreditation_v6_notifications set read_at=now() where user_id=auth.uid() and read_at is null and (notification_ids is null or id=any(notification_ids));
  get diagnostics affected=row_count; return affected;
end $$;

create or replace view public.accreditation_v6_risk as
select i.id,i.code,i.status,i.completion_percent,i.due_date,i.priority,i.responsible_label,i.responsible_user_id,
       p.code project_code,p.name_ru,p.name_uz,p.name_en,pr.full_name,pr.job_title,
       case when i.status<>'approved' and i.due_date<current_date then true else false end overdue,
       case when i.due_date is null then null else i.due_date-current_date end days_left
from public.accreditation_v3_indicators i join public.accreditation_v3_projects p on p.id=i.project_id
left join public.accreditation_v3_profiles pr on pr.user_id=i.responsible_user_id;
alter view public.accreditation_v6_risk set (security_invoker=true);

create or replace view public.accreditation_v6_audit_log as
select h.id,h.indicator_id,h.actor_id,h.action,h.old_status,h.new_status,h.details,h.created_at,
       i.code,p.code project_code,coalesce(pr.full_name,'System') actor_name,pr.job_title actor_job_title
from public.accreditation_v3_history h
join public.accreditation_v3_indicators i on i.id=h.indicator_id
join public.accreditation_v3_projects p on p.id=i.project_id
left join public.accreditation_v3_profiles pr on pr.user_id=h.actor_id;
alter view public.accreditation_v6_audit_log set (security_invoker=true);

create or replace function public.accreditation_v6_create_snapshot(snapshot_reason text default 'manual')
returns bigint language plpgsql security definer set search_path=public as $$
declare snapshot_id bigint;
begin
  if auth.uid() is not null and not (public.accreditation_v3_is_reviewer() or public.accreditation_v3_is_director()) then raise exception 'Not allowed'; end if;
  insert into public.accreditation_v6_snapshots(created_by,reason,indicator_count,document_count,payload)
  select auth.uid(),snapshot_reason,(select count(*) from accreditation_v3_indicators),(select count(*) from accreditation_v3_documents),
    jsonb_build_object('created_at',now(),'projects',(select jsonb_agg(to_jsonb(x)) from accreditation_v3_project_progress x),'indicators',(select jsonb_agg(to_jsonb(i)) from accreditation_v3_indicators i),'documents',(select jsonb_agg(to_jsonb(d)) from accreditation_v3_documents d),'reviews',(select jsonb_agg(to_jsonb(r)) from accreditation_v3_reviews r),'profiles',(select jsonb_agg(to_jsonb(p)) from accreditation_v3_profiles p))
  returning id into snapshot_id; return snapshot_id;
end $$;

create or replace function public.accreditation_v6_health()
returns jsonb language sql security definer set search_path=public as $$
select jsonb_build_object('ok',true,'checked_at',now(),'projects',(select count(*) from accreditation_v3_projects),'indicators',(select count(*) from accreditation_v3_indicators),'documents',(select count(*) from accreditation_v3_documents),'latest_snapshot',(select max(created_at) from accreditation_v6_snapshots));
$$;

grant select on public.accreditation_v6_notifications to authenticated;
grant select on public.accreditation_v6_risk,public.accreditation_v6_audit_log,public.accreditation_v6_snapshots to authenticated;
grant execute on function public.accreditation_v6_bulk_assign(uuid,uuid[],date,text) to authenticated;
grant execute on function public.accreditation_v6_set_deadlines(uuid[],date,text) to authenticated;
grant execute on function public.accreditation_v6_mark_notifications_read(uuid[]) to authenticated;
grant execute on function public.accreditation_v6_create_snapshot(text) to authenticated;
grant execute on function public.accreditation_v6_health() to anon,authenticated;

-- Daily logical accreditation snapshot at 02:30 UTC (07:30 Tashkent).
create extension if not exists pg_cron with schema pg_catalog;
do $$ begin
  perform cron.unschedule('accreditation-v6-daily-snapshot');
exception when others then null; end $$;
select cron.schedule('accreditation-v6-daily-snapshot','30 2 * * *',$$select public.accreditation_v6_create_snapshot('scheduled')$$);

select public.accreditation_v6_create_snapshot('v6-install');
