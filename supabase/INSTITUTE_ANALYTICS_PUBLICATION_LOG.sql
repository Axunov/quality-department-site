-- Records which aggregate is visible. Existing snapshots are the fallback until
-- the first publish/restore on each kind. No raw XLSX data is retained.
create table if not exists public.institute_analytics_publications (
  id bigint generated always as identity primary key,
  kind text not null check (kind in ('students','staff')),
  snapshot_id bigint not null references public.institute_analytics_snapshots(id),
  action text not null check (action in ('publish','restore')),
  actor uuid not null,
  created_at timestamptz not null default now()
);
create index if not exists institute_analytics_publications_kind_idx
  on public.institute_analytics_publications(kind,id desc);
alter table public.institute_analytics_publications enable row level security;
revoke all on public.institute_analytics_publications from public,anon,authenticated;
grant select,insert on public.institute_analytics_publications to service_role;
grant usage,select on sequence public.institute_analytics_publications_id_seq to service_role;

create or replace function public.institute_analytics_publish(
  p_kind text,p_actor uuid,p_expected bigint,p_payload jsonb,p_restore bigint
) returns text language plpgsql security invoker set search_path = '' as $$
declare
  current_id bigint;
  target_id bigint;
  latest_date date;
  incoming_date date;
begin
  if p_kind is null or p_kind not in ('students','staff') or p_actor is null or
      ((p_payload is null) = (p_restore is null)) then return 'invalid'; end if;
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended('institute_analytics:'||p_kind,0));
  select snapshot_id into current_id from public.institute_analytics_publications
    where kind=p_kind order by id desc limit 1;
  if current_id is null then
    select id into current_id from public.institute_analytics_snapshots
      where kind=p_kind order by as_of desc,id desc limit 1;
  end if;
  if current_id is distinct from p_expected then return 'stale'; end if;
  if p_restore is not null then
    select id into target_id from public.institute_analytics_snapshots where kind=p_kind and id=p_restore;
    if target_id is null then return 'invalid'; end if;
    if current_id=target_id then return 'unchanged'; end if;
  else
    incoming_date := (p_payload->>'asOf')::date;
    select max(as_of) into latest_date from public.institute_analytics_snapshots where kind=p_kind;
    if incoming_date < latest_date then return 'old'; end if;
    select id into target_id from public.institute_analytics_snapshots
      where kind=p_kind and as_of=incoming_date and payload=p_payload order by id desc limit 1;
    if target_id=current_id then return 'unchanged'; end if;
    if target_id is null then
      insert into public.institute_analytics_snapshots(kind,as_of,payload,published_by)
        values(p_kind,incoming_date,p_payload,p_actor) returning id into target_id;
    end if;
  end if;
  insert into public.institute_analytics_publications(kind,snapshot_id,action,actor)
    values(p_kind,target_id,case when p_restore is null then 'publish' else 'restore' end,p_actor);
  return 'ok';
end $$;
revoke all on function public.institute_analytics_publish(text,uuid,bigint,jsonb,bigint) from public,anon,authenticated;
grant execute on function public.institute_analytics_publish(text,uuid,bigint,jsonb,bigint) to service_role;
