-- ACCREDITATION V5: canonical positions + automatic assignment across ALL accreditations
-- Safe to run after V3 and V4. Preserves indicators, documents and progress.

alter table public.accreditation_v3_profiles add column if not exists position_key text;
alter table public.accreditation_v3_indicators add column if not exists position_keys text[] not null default '{}';

create or replace function public.accreditation_v5_position_keys(label text)
returns text[]
language plpgsql
immutable
as $$
declare
  s text := lower(coalesce(label,''));
  r text[] := '{}';
begin
  if s='' then return r; end if;
  if s ~ 'юрисконсульт|yuriskonsult' then r:=array_append(r,'legal_counsel'); end if;
  if s ~ 'секретар.*совет|kengash kotibi|канцеляр' then r:=array_append(r,'council_secretary'); end if;
  if s ~ 'заместител.*учебн|o‘quv ishlari.*o‘rinbosari|o''quv ishlari.*o''rinbosari' then r:=array_append(r,'deputy_academic'); end if;
  if s ~ 'главн.*бухгалтер|bosh hisobchi' then r:=array_append(r,'chief_accountant'); end if;
  if s ~ 'контрол.*качеств|ta’lim sifatini nazorat|ta''lim sifatini nazorat' then r:=array_append(r,'head_quality'); end if;
  if s ~ 'управлен.*дел|ishlar boshqarmasi' then r:=array_append(r,'head_affairs'); end if;
  if s ~ 'отдел.*кадр|xodimlar bo‘limi|xodimlar bo''limi' then r:=array_append(r,'head_hr'); end if;
  if s ~ 'международн.*сотруднич|xalqaro hamkorlik' then r:=array_append(r,'head_international'); end if;
  if s ~ 'учебно-метод|o‘quv-uslubiy|o''quv-uslubiy' then r:=array_append(r,'head_methodological'); end if;
  if s ~ 'офис.*регистратор|registrator ofisi' then r:=array_append(r,'head_registrar'); end if;
  if s ~ 'научн.*исследован.*инновац|ilmiy tadqiqotlar.*innovats' then r:=array_append(r,'head_science'); end if;
  if s ~ 'заместител.*научн|ilmiy ishlar.*o‘rinbosari|ilmiy ishlar.*o''rinbosari' then r:=array_append(r,'deputy_science'); end if;
  if s ~ 'молодеж|yoshlar bilan ishlash.*o‘rinbosari|yoshlar bilan ishlash.*o''rinbosari' then r:=array_append(r,'deputy_youth'); end if;
  if s ~ 'финансово-эконом|reja-moliya' then r:=array_append(r,'head_finance'); end if;
  if s ~ 'маркетинг.*практик|marketing va talabalar amaliyoti' then r:=array_append(r,'head_marketing'); end if;
  if s ~ 'цифров.*образователь|цифров.*технолог|raqamli va axborot texnologiyalari' then r:=array_append(r,'head_digital'); end if;
  if s ~ 'заведующ.*кафедр|кафедр.*завед|tegishli kafedra mudiri' then r:=array_append(r,'department_head'); end if;
  if s ~ 'декан|dekanat' then r:=array_append(r,'dean'); end if;
  if s ~ 'приемн.*комисс|qabul komissiyasi' then r:=array_append(r,'admissions_secretary'); end if;
  if s ~ 'апелляц|apellyatsiya' then r:=array_append(r,'appeal_secretary'); end if;
  if s ~ 'комплаенс|komplayens' then r:=array_append(r,'compliance'); end if;
  if s ~ 'информационно-ресурс|axborot-resurs markazi' then r:=array_append(r,'library'); end if;
  if s ~ 'пресс-секретар|matbuot kotibi' then r:=array_append(r,'press_secretary'); end if;
  if s ~ 'гражданск.*защит|охран.*труд|mehnatni muhofaza' then r:=array_append(r,'civil_protection'); end if;
  if s ~ 'психолог|psixolog' then r:=array_append(r,'psychologist'); end if;
  if s ~ 'kpi' then r:=array_append(r,'kpi_chair'); end if;
  return (select coalesce(array_agg(distinct x),'{}') from unnest(r) x);
end $$;

update public.accreditation_v3_indicators
set position_keys=public.accreditation_v5_position_keys(responsible_label);

-- Backfill profiles from existing labels where possible.
-- Use a CTE instead of LATERAL reference to the UPDATE target alias.
with profile_position as (
  select
    p.user_id,
    (
      select key
      from unnest(
        public.accreditation_v5_position_keys(
          coalesce(p.responsible_label, p.job_title)
        )
      ) as key
      limit 1
    ) as position_key
  from public.accreditation_v3_profiles p
  where p.position_key is null
)
update public.accreditation_v3_profiles p
set position_key = pp.position_key
from profile_position pp
where p.user_id = pp.user_id
  and pp.position_key is not null;

create or replace function public.accreditation_v5_assign_user(target_user uuid, target_key text)
returns void
language plpgsql
security definer
set search_path=public
as $$
begin
  if target_key is null or target_key='' or target_key='director' then return; end if;
  -- Remove stale assignments for this user, then assign all matching indicators
  -- in comprehensive AND both special accreditation projects.
  update public.accreditation_v3_indicators
     set responsible_user_id=null
   where responsible_user_id=target_user
     and not (target_key = any(position_keys));

  update public.accreditation_v3_indicators
     set responsible_user_id=target_user
   where target_key = any(position_keys);
end $$;

create or replace function public.accreditation_v5_profile_assignment_trigger()
returns trigger
language plpgsql
security definer
set search_path=public
as $$
begin
  if new.approval_status='rejected' or not new.is_active then
    update public.accreditation_v3_indicators set responsible_user_id=null where responsible_user_id=new.user_id;
    return new;
  end if;

  if new.position_key is distinct from old.position_key
     or new.approval_status is distinct from old.approval_status
     or new.is_active is distinct from old.is_active then
    perform public.accreditation_v5_assign_user(new.user_id,new.position_key);
  end if;
  return new;
end $$;

drop trigger if exists accreditation_v5_profile_assignment on public.accreditation_v3_profiles;
create trigger accreditation_v5_profile_assignment
after update on public.accreditation_v3_profiles
for each row execute function public.accreditation_v5_profile_assignment_trigger();

-- On signup: create pending profile and immediately calculate the user's indicators.
-- Upload rights remain blocked until admin approval.
create or replace function public.accreditation_v3_handle_signup()
returns trigger
language plpgsql
security definer
set search_path=public
as $$
declare k text;
begin
  if coalesce(new.raw_user_meta_data->>'accreditation_signup','')='true' then
    k:=nullif(new.raw_user_meta_data->>'position_key','');
    insert into public.accreditation_v3_profiles
      (user_id,full_name,job_title,role,is_active,responsible_label,requested_role,approval_status,position_key)
    values(
      new.id,
      coalesce(nullif(new.raw_user_meta_data->>'full_name',''),'New user'),
      nullif(new.raw_user_meta_data->>'job_title',''),
      'department_head',
      false,
      null,
      case when new.raw_user_meta_data->>'requested_role'='director' then 'director' else 'department_head' end,
      'pending',
      k
    )
    on conflict(user_id) do update set
      full_name=excluded.full_name,
      job_title=excluded.job_title,
      position_key=excluded.position_key,
      requested_role=excluded.requested_role,
      approval_status='pending',
      is_active=false,
      updated_at=now();

    if k is not null and k<>'director' then
      perform public.accreditation_v5_assign_user(new.id,k);
    end if;
  end if;
  return new;
end $$;

create or replace function public.accreditation_v5_reset_employee_access(target_user uuid)
returns void
language plpgsql
security definer
set search_path=public
as $$
begin
  if not public.accreditation_v3_is_reviewer() then
    raise exception 'Not allowed';
  end if;
  update public.accreditation_v3_indicators set responsible_user_id=null where responsible_user_id=target_user;
  update public.accreditation_v3_profiles
     set is_active=false, approval_status='rejected', approved_at=null, updated_at=now()
   where user_id=target_user;
end $$;

grant execute on function public.accreditation_v5_reset_employee_access(uuid) to authenticated;
grant execute on function public.accreditation_v5_assign_user(uuid,text) to authenticated;

select 'ACCREDITATION V5 READY' as result,
       count(*) as indicators,
       count(*) filter (where cardinality(position_keys)>0) as mapped_indicators
from public.accreditation_v3_indicators;
