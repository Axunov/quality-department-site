-- ACCREDITATION V5.7
-- Safe employee deletion without losing accreditation documents/history.

alter table if exists public.accreditation_v3_documents
  alter column uploaded_by drop not null;
alter table if exists public.accreditation_v3_reviews
  alter column reviewer_id drop not null;

alter table if exists public.accreditation_v3_documents
  drop constraint if exists accreditation_v3_documents_uploaded_by_fkey;
alter table if exists public.accreditation_v3_documents
  add constraint accreditation_v3_documents_uploaded_by_fkey
  foreign key (uploaded_by) references auth.users(id) on delete set null;

alter table if exists public.accreditation_v3_reviews
  drop constraint if exists accreditation_v3_reviews_reviewer_id_fkey;
alter table if exists public.accreditation_v3_reviews
  add constraint accreditation_v3_reviews_reviewer_id_fkey
  foreign key (reviewer_id) references auth.users(id) on delete set null;

alter table if exists public.accreditation_v3_history
  drop constraint if exists accreditation_v3_history_actor_id_fkey;
alter table if exists public.accreditation_v3_history
  add constraint accreditation_v3_history_actor_id_fkey
  foreign key (actor_id) references auth.users(id) on delete set null;

alter table if exists public.accreditation_v3_indicators
  drop constraint if exists accreditation_v3_indicators_responsible_user_id_fkey;
alter table if exists public.accreditation_v3_indicators
  add constraint accreditation_v3_indicators_responsible_user_id_fkey
  foreign key (responsible_user_id) references auth.users(id) on delete set null;

do $$
declare r record;
declare rule text;
begin
  for r in
    select
      n.nspname as schema_name,
      c.relname as table_name,
      con.conname as constraint_name,
      a.attname as column_name
    from pg_constraint con
    join pg_class c on c.oid=con.conrelid
    join pg_namespace n on n.oid=c.relnamespace
    join pg_class rc on rc.oid=con.confrelid
    join pg_namespace rn on rn.oid=rc.relnamespace
    join unnest(con.conkey) with ordinality ck(attnum,ord) on true
    join pg_attribute a on a.attrelid=c.oid and a.attnum=ck.attnum
    where con.contype='f'
      and rn.nspname='auth'
      and rc.relname='users'
      and n.nspname='public'
      and c.relname like 'accreditation%'
  loop
    if r.column_name='user_id' then
      rule := 'cascade';
    else
      execute format('alter table %I.%I alter column %I drop not null',
                     r.schema_name,r.table_name,r.column_name);
      rule := 'set null';
    end if;

    execute format('alter table %I.%I drop constraint if exists %I',
                   r.schema_name,r.table_name,r.constraint_name);

    execute format(
      'alter table %I.%I add constraint %I foreign key (%I) references auth.users(id) on delete %s',
      r.schema_name,r.table_name,r.constraint_name,r.column_name,rule
    );
  end loop;
end $$;

create or replace function public.accreditation_v57_delete_employee(target_user uuid)
returns void
language plpgsql
security definer
set search_path=public,auth,storage
as $$
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  if not public.accreditation_v3_is_reviewer() then
    raise exception 'Not allowed';
  end if;

  if target_user=auth.uid() then
    raise exception 'You cannot delete your own administrator account';
  end if;

  update public.accreditation_v3_indicators
     set responsible_user_id=null
   where responsible_user_id=target_user;

  update storage.objects
     set owner_id=null
   where owner_id::text=target_user::text;

  delete from public.accreditation_v3_profiles where user_id=target_user;
  delete from auth.users where id=target_user;

  if not found then
    raise exception 'Auth user not found';
  end if;
end $$;

revoke all on function public.accreditation_v57_delete_employee(uuid) from public;
grant execute on function public.accreditation_v57_delete_employee(uuid) to authenticated;

select
  'ACCREDITATION V5.7 READY' as result,
  (select count(*) from public.accreditation_v3_profiles) as registered_profiles;
