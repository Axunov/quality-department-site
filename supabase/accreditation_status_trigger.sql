-- Automatically record indicator status changes.

create or replace function public.log_accreditation_indicator_status_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.status is distinct from old.status then
    insert into public.accreditation_history (
      project_id,
      indicator_id,
      actor_id,
      action,
      old_status,
      new_status,
      details
    ) values (
      new.project_id,
      new.id,
      auth.uid(),
      'indicator_status_changed',
      old.status,
      new.status,
      jsonb_build_object(
        'code', new.code,
        'title', new.title,
        'completion_percent', new.completion_percent
      )
    );
  end if;
  return new;
end;
$$;

drop trigger if exists accreditation_indicator_status_history
  on public.accreditation_indicators;

create trigger accreditation_indicator_status_history
after update of status on public.accreditation_indicators
for each row
execute function public.log_accreditation_indicator_status_change();
