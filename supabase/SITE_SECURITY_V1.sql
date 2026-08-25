-- Защита публичных форм: минимальный журнал событий с хешированным IP.
create table if not exists public.site_security_events (
  id bigint generated always as identity primary key,
  endpoint text not null check (endpoint in ('employer_survey')),
  ip_hash text not null check (char_length(ip_hash) = 64),
  outcome text not null check (outcome in ('accepted','captcha_failed','database_failed')),
  created_at timestamptz not null default now()
);

alter table public.site_security_events enable row level security;
revoke all on public.site_security_events from public, anon, authenticated;
grant select, insert, delete on public.site_security_events to service_role;

create index if not exists site_security_events_rate_idx
  on public.site_security_events(endpoint, ip_hash, created_at desc);
create index if not exists site_security_events_cleanup_idx
  on public.site_security_events(created_at);

comment on table public.site_security_events is
  'Краткосрочный технический журнал защиты публичных форм. IP хранится только как HMAC-SHA256.';
