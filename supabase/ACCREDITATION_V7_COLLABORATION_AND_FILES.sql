-- Accreditation V7: comments, assignments and safe draft-file deletion.
-- Idempotent. No anon grants. Existing V3/V6 objects are preserved.

create table if not exists public.accreditation_v7_comments(
  id uuid primary key default gen_random_uuid(),
  indicator_id uuid not null references public.accreditation_v3_indicators(id) on delete cascade,
  author_id uuid not null references auth.users(id) on delete cascade,
  parent_id uuid references public.accreditation_v7_comments(id) on delete cascade,
  body text not null check(length(trim(body)) between 1 and 4000),
  created_at timestamptz not null default now()
);

create table if not exists public.accreditation_v7_tasks(
  id uuid primary key default gen_random_uuid(),
  indicator_id uuid not null references public.accreditation_v3_indicators(id) on delete cascade,
  created_by uuid not null references auth.users(id),
  assigned_to uuid not null references auth.users(id),
  title text not null check(length(trim(title)) between 1 and 500),
  due_date date,
  status text not null default 'open' check(status in ('open','completed')),
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists accreditation_v7_comments_indicator_idx on public.accreditation_v7_comments(indicator_id,created_at);
create index if not exists accreditation_v7_tasks_assignee_idx on public.accreditation_v7_tasks(assigned_to,status,due_date);
create index if not exists accreditation_v7_tasks_indicator_idx on public.accreditation_v7_tasks(indicator_id,created_at desc);

alter table public.accreditation_v7_comments enable row level security;
alter table public.accreditation_v7_tasks enable row level security;

drop policy if exists "v7 comments participant read" on public.accreditation_v7_comments;
create policy "v7 comments participant read" on public.accreditation_v7_comments for select to authenticated using(
  public.accreditation_v3_is_reviewer() or public.accreditation_v3_is_director() or
  exists(select 1 from public.accreditation_v3_indicators i where i.id=indicator_id and i.responsible_user_id=(select auth.uid()))
);
drop policy if exists "v7 comments participant insert" on public.accreditation_v7_comments;
create policy "v7 comments participant insert" on public.accreditation_v7_comments for insert to authenticated with check(
  author_id=(select auth.uid()) and (
    public.accreditation_v3_is_reviewer() or public.accreditation_v3_is_director() or
    exists(select 1 from public.accreditation_v3_indicators i where i.id=indicator_id and i.responsible_user_id=(select auth.uid()))
  )
);

drop policy if exists "v7 tasks participant read" on public.accreditation_v7_tasks;
create policy "v7 tasks participant read" on public.accreditation_v7_tasks for select to authenticated using(
  assigned_to=(select auth.uid()) or public.accreditation_v3_is_reviewer() or public.accreditation_v3_is_director()
);
drop policy if exists "v7 tasks privileged insert" on public.accreditation_v7_tasks;
create policy "v7 tasks privileged insert" on public.accreditation_v7_tasks for insert to authenticated with check(
  created_by=(select auth.uid()) and (public.accreditation_v3_is_reviewer() or public.accreditation_v3_is_director()) and
  exists(select 1 from public.accreditation_v3_indicators i where i.id=indicator_id and i.responsible_user_id=assigned_to)
);

create or replace function public.accreditation_v7_complete_task(target_task uuid)
returns boolean language plpgsql security definer set search_path=public as $$
declare affected integer;
begin
  update public.accreditation_v7_tasks set status='completed',completed_at=now()
  where id=target_task and assigned_to=(select auth.uid()) and status='open';
  get diagnostics affected=row_count; return affected=1;
end $$;
revoke all on function public.accreditation_v7_complete_task(uuid) from public,anon;
grant execute on function public.accreditation_v7_complete_task(uuid) to authenticated;

drop policy if exists "v7 delete own draft document" on public.accreditation_v3_documents;
create policy "v7 delete own draft document" on public.accreditation_v3_documents for delete to authenticated using(
  uploaded_by=(select auth.uid()) and exists(
    select 1 from public.accreditation_v3_indicators i where i.id=indicator_id
    and i.responsible_user_id=(select auth.uid()) and i.status in ('draft','in_progress','revision')
  )
);
drop policy if exists "v7 evidence delete own draft" on storage.objects;
create policy "v7 evidence delete own draft" on storage.objects for delete to authenticated using(
  bucket_id='accreditation-v3-evidence' and (storage.foldername(name))[1]=(select auth.uid())::text and
  exists(select 1 from public.accreditation_v3_documents d join public.accreditation_v3_indicators i on i.id=d.indicator_id
    where d.storage_path=name and d.uploaded_by=(select auth.uid()) and i.responsible_user_id=(select auth.uid())
    and i.status in ('draft','in_progress','revision'))
);

grant select,insert on public.accreditation_v7_comments to authenticated;
grant select,insert on public.accreditation_v7_tasks to authenticated;
revoke all on public.accreditation_v7_comments,public.accreditation_v7_tasks from anon;
