-- V7.4: normalize progress percentages to explicit workflow stages.
-- No policies or privileges are changed by this migration.

update public.accreditation_v3_indicators
set completion_percent = case status
  when 'draft' then 0
  when 'in_progress' then 30
  when 'review' then 60
  when 'revision' then 40
  when 'approved' then 100
  else completion_percent
end
where completion_percent is distinct from case status
  when 'draft' then 0
  when 'in_progress' then 30
  when 'review' then 60
  when 'revision' then 40
  when 'approved' then 100
  else completion_percent
end;
