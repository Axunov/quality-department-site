-- V7.5: written employee responses and searchable action journal support.
-- Existing RLS policies remain unchanged; no anonymous access is granted.

alter table public.accreditation_v3_indicators
  add column if not exists response_text text not null default '';

create index if not exists accreditation_v3_history_indicator_created_idx
  on public.accreditation_v3_history(indicator_id, created_at desc);

comment on column public.accreditation_v3_indicators.response_text is
  'Employee written response accompanying uploaded evidence files';
