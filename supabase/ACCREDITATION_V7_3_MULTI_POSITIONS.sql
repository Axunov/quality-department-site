-- Accreditation V7.3: multiple organizational positions per employee.
-- Only a Supabase Auth administrator may change additional positions.
-- Existing assignments, evidence, statuses and project separation are preserved.

alter table public.accreditation_v3_indicators
  add column if not exists assignment_source text not null default 'legacy',
  add column if not exists assignment_role_key text;

do $$ begin
  alter table public.accreditation_v3_indicators add constraint accreditation_v73_assignment_source_check
    check(assignment_source in ('legacy','manual','role'));
exception when duplicate_object then null; end $$;

create table if not exists public.accreditation_v73_employee_positions(
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  project_id uuid not null references public.accreditation_v3_projects(id) on delete cascade,
  position_key text not null check(length(position_key) between 2 and 100),
  assigned_by uuid not null references auth.users(id) on delete restrict,
  assigned_at timestamptz not null default now(),
  is_active boolean not null default true,
  unique(user_id,project_id,position_key)
);

create table if not exists public.accreditation_v73_role_audit(
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  project_id uuid not null references public.accreditation_v3_projects(id) on delete cascade,
  position_key text not null,
  action text not null check(action in ('added','removed')),
  actor_id uuid not null references auth.users(id) on delete restrict,
  affected_indicators integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists accreditation_v73_positions_user_idx
  on public.accreditation_v73_employee_positions(user_id,is_active,project_id);
create index if not exists accreditation_v73_positions_project_role_idx
  on public.accreditation_v73_employee_positions(project_id,position_key) where is_active;
create index if not exists accreditation_v73_audit_created_idx
  on public.accreditation_v73_role_audit(created_at desc);
create index if not exists accreditation_v73_audit_user_project_idx
  on public.accreditation_v73_role_audit(user_id,project_id,created_at desc);
create index if not exists accreditation_v73_positions_assigned_by_idx
  on public.accreditation_v73_employee_positions(assigned_by);
create index if not exists accreditation_v73_audit_actor_idx
  on public.accreditation_v73_role_audit(actor_id);
create index if not exists accreditation_v73_indicators_role_assignment_idx
  on public.accreditation_v3_indicators(responsible_user_id,project_id,assignment_role_key)
  where assignment_source='role';

alter table public.accreditation_v73_employee_positions enable row level security;
alter table public.accreditation_v73_role_audit enable row level security;

revoke all on public.accreditation_v73_employee_positions from public,anon,authenticated;
revoke all on public.accreditation_v73_role_audit from public,anon,authenticated;
grant select,insert,update,delete on public.accreditation_v73_employee_positions to authenticated;
grant select on public.accreditation_v73_role_audit to authenticated;

create or replace function public.accreditation_v73_is_admin()
returns boolean language sql stable security invoker set search_path=public,pg_temp as $$
  select coalesce((auth.jwt()->'app_metadata'->>'role')='admin',false)
$$;

drop policy if exists "v73 positions own or management read" on public.accreditation_v73_employee_positions;
create policy "v73 positions own or management read"
on public.accreditation_v73_employee_positions for select to authenticated
using(user_id=(select auth.uid()) or (select public.accreditation_v73_is_admin()) or (select public.accreditation_v3_is_director()));

drop policy if exists "v73 admin inserts positions" on public.accreditation_v73_employee_positions;
create policy "v73 admin inserts positions"
on public.accreditation_v73_employee_positions for insert to authenticated
with check((select public.accreditation_v73_is_admin()) and assigned_by=(select auth.uid()));

drop policy if exists "v73 admin updates positions" on public.accreditation_v73_employee_positions;
create policy "v73 admin updates positions"
on public.accreditation_v73_employee_positions for update to authenticated
using((select public.accreditation_v73_is_admin())) with check((select public.accreditation_v73_is_admin()));

drop policy if exists "v73 admin deletes positions" on public.accreditation_v73_employee_positions;
create policy "v73 admin deletes positions"
on public.accreditation_v73_employee_positions for delete to authenticated
using((select public.accreditation_v73_is_admin()));

drop policy if exists "v73 role audit management read" on public.accreditation_v73_role_audit;
create policy "v73 role audit management read"
on public.accreditation_v73_role_audit for select to authenticated
using((select public.accreditation_v73_is_admin()) or (select public.accreditation_v3_is_director()));

create or replace function public.accreditation_v73_match_key(value text)
returns text language sql immutable security invoker set search_path=public,pg_temp as $$
  select case when value like 'department_head_%' then 'department_head' else value end
$$;

-- Preserve manual and additional-role assignments when the primary position changes.
create or replace function public.accreditation_v5_assign_user(target_user uuid,target_key text)
returns void language plpgsql security definer set search_path=public,pg_temp as $$
declare match_key text:=public.accreditation_v73_match_key(target_key);
begin
  if match_key is null or match_key='' or match_key='director' then return; end if;
  update public.accreditation_v3_indicators set responsible_user_id=null
  where responsible_user_id=target_user and assignment_source='legacy' and not (match_key=any(position_keys));
  update public.accreditation_v3_indicators
  set responsible_user_id=target_user,assignment_source='legacy',assignment_role_key=null
  where match_key=any(position_keys) and responsible_user_id is null;
end $$;

create or replace function public.accreditation_v73_add_position(
  target_user uuid,target_project uuid,target_position text
) returns jsonb language plpgsql security definer set search_path=public,pg_temp as $$
declare actor uuid:=(select auth.uid()); match_key text; affected integer:=0; conflicts integer:=0; project_code text;
begin
  if actor is null or not public.accreditation_v73_is_admin() then raise exception 'Not allowed'; end if;
  if target_position is null or target_position='' or target_position='director' then raise exception 'Invalid position'; end if;
  if not exists(select 1 from public.accreditation_v3_profiles p where p.user_id=target_user and p.is_active and p.approval_status='approved') then raise exception 'Employee is not active'; end if;
  if exists(select 1 from public.accreditation_v3_profiles p where p.user_id=target_user and p.position_key=target_position) then raise exception 'Position is already primary'; end if;
  select code into project_code from public.accreditation_v3_projects where id=target_project;
  if project_code is null then raise exception 'Unknown project'; end if;
  match_key:=public.accreditation_v73_match_key(target_position);
  perform pg_advisory_xact_lock(hashtext(target_user::text||target_project::text));

  insert into public.accreditation_v73_employee_positions(user_id,project_id,position_key,assigned_by,is_active)
  values(target_user,target_project,target_position,actor,true)
  on conflict(user_id,project_id,position_key) do update set is_active=true,assigned_by=excluded.assigned_by,assigned_at=now();

  select count(*) into conflicts from public.accreditation_v3_indicators i
  where i.project_id=target_project and match_key=any(i.position_keys) and i.responsible_user_id is not null and i.responsible_user_id<>target_user;

  update public.accreditation_v3_indicators i
  set responsible_user_id=target_user,assignment_source='role',assignment_role_key=target_position
  where i.project_id=target_project and match_key=any(i.position_keys) and i.responsible_user_id is null;
  get diagnostics affected=row_count;

  insert into public.accreditation_v72_user_project_access(user_id,project_id,access_role,granted_by)
  values(target_user,target_project,'employee',actor)
  on conflict(user_id,project_id) do update set access_role='employee',granted_by=excluded.granted_by,granted_at=now();

  insert into public.accreditation_v73_role_audit(user_id,project_id,position_key,action,actor_id,affected_indicators)
  values(target_user,target_project,target_position,'added',actor,affected);
  insert into public.accreditation_v6_notifications(user_id,kind,title_ru,title_uz,title_en,body_ru,body_uz,body_en)
  values(target_user,'system','Назначена дополнительная роль','Qo‘shimcha rol biriktirildi','Additional role assigned',project_code||' · '||target_position,project_code||' · '||target_position,project_code||' · '||target_position);
  return jsonb_build_object('assigned',affected,'conflicts',conflicts);
end $$;

create or replace function public.accreditation_v73_profile_deactivation()
returns trigger language plpgsql security definer set search_path=public,pg_temp as $$
begin
  if new.approval_status='rejected' or not new.is_active then
    update public.accreditation_v73_employee_positions set is_active=false where user_id=new.user_id and is_active;
  end if;
  return new;
end $$;
drop trigger if exists accreditation_v73_profile_deactivation on public.accreditation_v3_profiles;
create trigger accreditation_v73_profile_deactivation after update of approval_status,is_active
on public.accreditation_v3_profiles for each row execute function public.accreditation_v73_profile_deactivation();

create or replace function public.accreditation_v73_remove_position(target_position_id uuid)
returns jsonb language plpgsql security definer set search_path=public,pg_temp as $$
declare actor uuid:=(select auth.uid()); row_data public.accreditation_v73_employee_positions%rowtype; affected integer:=0; project_code text;
begin
  if actor is null or not public.accreditation_v73_is_admin() then raise exception 'Not allowed'; end if;
  select * into row_data from public.accreditation_v73_employee_positions where id=target_position_id for update;
  if row_data.id is null then raise exception 'Position not found'; end if;
  update public.accreditation_v3_indicators
  set responsible_user_id=null,assignment_source='legacy',assignment_role_key=null
  where responsible_user_id=row_data.user_id and project_id=row_data.project_id
    and assignment_source='role' and assignment_role_key=row_data.position_key;
  get diagnostics affected=row_count;
  delete from public.accreditation_v73_employee_positions where id=target_position_id;
  select code into project_code from public.accreditation_v3_projects where id=row_data.project_id;
  insert into public.accreditation_v73_role_audit(user_id,project_id,position_key,action,actor_id,affected_indicators)
  values(row_data.user_id,row_data.project_id,row_data.position_key,'removed',actor,affected);
  insert into public.accreditation_v6_notifications(user_id,kind,title_ru,title_uz,title_en,body_ru,body_uz,body_en)
  values(row_data.user_id,'system','Дополнительная роль снята','Qo‘shimcha rol olib tashlandi','Additional role removed',project_code||' · '||row_data.position_key,project_code||' · '||row_data.position_key,project_code||' · '||row_data.position_key);
  return jsonb_build_object('released',affected);
end $$;

-- Manual bulk assignment must remain independent from automatic role cleanup.
create or replace function public.accreditation_v6_bulk_assign(target_user uuid, indicator_ids uuid[], target_due_date date default null, target_priority text default 'normal')
returns integer language plpgsql security definer set search_path=public,pg_temp as $$
declare affected integer;
begin
  if not public.accreditation_v3_is_reviewer() then raise exception 'Not allowed'; end if;
  if target_priority not in ('low','normal','high','critical') then raise exception 'Invalid priority'; end if;
  update public.accreditation_v3_indicators
  set responsible_user_id=target_user,due_date=coalesce(target_due_date,due_date),priority=target_priority,
      assignment_source='manual',assignment_role_key=null
  where id=any(indicator_ids);
  get diagnostics affected=row_count; return affected;
end $$;

revoke all on function public.accreditation_v73_is_admin() from public,anon;
revoke all on function public.accreditation_v73_profile_deactivation() from public,anon,authenticated;
revoke all on function public.accreditation_v5_assign_user(uuid,text) from public,anon,authenticated;
revoke all on function public.accreditation_v73_add_position(uuid,uuid,text) from public,anon,authenticated;
revoke all on function public.accreditation_v73_remove_position(uuid) from public,anon,authenticated;
grant execute on function public.accreditation_v73_is_admin() to authenticated;
grant execute on function public.accreditation_v73_add_position(uuid,uuid,text) to authenticated;
grant execute on function public.accreditation_v73_remove_position(uuid) to authenticated;

select 'ACCREDITATION V7.3 READY' result;
