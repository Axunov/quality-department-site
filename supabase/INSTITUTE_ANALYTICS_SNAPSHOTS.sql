create table if not exists public.institute_analytics_snapshots (
  id bigint generated always as identity primary key,
  kind text not null check (kind in ('students', 'staff')),
  as_of date not null,
  published_at timestamptz not null default now(),
  published_by uuid,
  payload jsonb not null check (
    jsonb_typeof(payload) = 'object'
    and payload ? 'kind' and payload->>'kind' = kind
    and payload ? 'asOf' and (payload->>'asOf')::date = as_of
  )
);
create index if not exists institute_analytics_latest_idx
  on public.institute_analytics_snapshots (kind, as_of desc, id desc);
alter table public.institute_analytics_snapshots enable row level security;
revoke all on table public.institute_analytics_snapshots from public, anon, authenticated;
grant select, insert on table public.institute_analytics_snapshots to service_role;
grant usage, select on sequence public.institute_analytics_snapshots_id_seq to service_role;
