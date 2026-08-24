-- Student cabinet: appeals, conversations, private files and notifications.
create sequence if not exists public.student_appeal_number_seq;

create table if not exists public.student_appeals(
 id uuid primary key default gen_random_uuid(),
 appeal_number text not null unique default ('STD-'||to_char(current_date,'YYYY')||'-'||lpad(nextval('public.student_appeal_number_seq')::text,6,'0')),
 access_code_id uuid not null references public.survey_access_codes(id) on delete restrict,
 category text not null check(category in ('education','schedule','assessment','teacher','practice','facilities','integrity','technical','suggestion','other')),
 subject text not null check(length(subject) between 3 and 200),
 body text not null check(length(body) between 10 and 5000),
 recipient text not null default 'quality_department', preferred_locale text not null default 'ru' check(preferred_locale in ('ru','uz','en')),
 confidential boolean not null default false,
 status text not null default 'submitted' check(status in ('draft','submitted','registered','assigned','in_review','clarification','answered','completed','rejected','cancelled')),
 priority text not null default 'normal' check(priority in ('low','normal','high','urgent')),
 assigned_to uuid references auth.users(id), due_at timestamptz, closed_at timestamptz,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.student_appeal_messages(
 id uuid primary key default gen_random_uuid(), appeal_id uuid not null references public.student_appeals(id) on delete cascade,
 author_type text not null check(author_type in ('student','admin','system')),
 author_user_id uuid references auth.users(id), body text not null check(length(body) between 1 and 5000),
 internal boolean not null default false, created_at timestamptz not null default now()
);
create table if not exists public.student_appeal_files(
 id uuid primary key default gen_random_uuid(), appeal_id uuid not null references public.student_appeals(id) on delete cascade,
 message_id uuid references public.student_appeal_messages(id) on delete cascade,
 storage_path text not null unique, original_name text not null, mime_type text not null, size_bytes bigint not null check(size_bytes between 1 and 10485760),
 uploaded_by_type text not null check(uploaded_by_type in ('student','admin')), created_at timestamptz not null default now()
);
create table if not exists public.student_appeal_history(
 id bigint generated always as identity primary key, appeal_id uuid not null references public.student_appeals(id) on delete cascade,
 actor_type text not null check(actor_type in ('student','admin','system')), actor_user_id uuid references auth.users(id),
 action text not null, old_status text, new_status text, details jsonb not null default '{}'::jsonb, created_at timestamptz not null default now()
);
create table if not exists public.student_notifications(
 id uuid primary key default gen_random_uuid(), access_code_id uuid not null references public.survey_access_codes(id) on delete cascade,
 kind text not null check(kind in ('appeal','survey','announcement','system')),
 title_ru text not null,title_uz text not null,title_en text not null,body_ru text,body_uz text,body_en text,
 action_url text, priority text not null default 'normal' check(priority in ('normal','important','urgent')),
 read_at timestamptz, expires_at timestamptz, created_at timestamptz not null default now()
);
create table if not exists public.student_announcements(
 id uuid primary key default gen_random_uuid(),title_ru text not null,title_uz text not null,title_en text not null,
 body_ru text not null,body_uz text not null,body_en text not null,target_type text not null default 'all' check(target_type in ('all','group','student')),
 target_group_id uuid references public.survey_groups(id),target_access_code_id uuid references public.survey_access_codes(id),
 priority text not null default 'normal' check(priority in ('normal','important','urgent')),published_at timestamptz not null default now(),expires_at timestamptz,
 created_by uuid references auth.users(id),created_at timestamptz not null default now(),
 check((target_type='all') or (target_type='group' and target_group_id is not null) or (target_type='student' and target_access_code_id is not null))
);

create index if not exists student_appeals_access_idx on public.student_appeals(access_code_id,created_at desc);
create index if not exists student_appeals_queue_idx on public.student_appeals(status,priority,due_at);
create index if not exists student_appeals_assignee_idx on public.student_appeals(assigned_to,status);
create index if not exists student_appeal_messages_idx on public.student_appeal_messages(appeal_id,created_at);
create index if not exists student_appeal_messages_author_idx on public.student_appeal_messages(author_user_id);
create index if not exists student_appeal_files_appeal_idx on public.student_appeal_files(appeal_id);
create index if not exists student_appeal_files_message_idx on public.student_appeal_files(message_id);
create index if not exists student_appeal_history_idx on public.student_appeal_history(appeal_id,created_at);
create index if not exists student_appeal_history_actor_idx on public.student_appeal_history(actor_user_id);
create index if not exists student_notifications_unread_idx on public.student_notifications(access_code_id,created_at desc) where read_at is null;
create index if not exists student_announcements_group_idx on public.student_announcements(target_group_id,published_at desc);
create index if not exists student_announcements_student_idx on public.student_announcements(target_access_code_id,published_at desc);
create index if not exists student_announcements_creator_idx on public.student_announcements(created_by);

alter table public.student_appeals enable row level security; alter table public.student_appeal_messages enable row level security;
alter table public.student_appeal_files enable row level security; alter table public.student_appeal_history enable row level security;
alter table public.student_notifications enable row level security; alter table public.student_announcements enable row level security;

do $$ declare tab text; begin foreach tab in array array['student_appeals','student_appeal_messages','student_appeal_files','student_appeal_history','student_notifications','student_announcements'] loop
 execute format('drop policy if exists %I on public.%I','student appeals admin',tab);
 execute format('create policy %I on public.%I for all to authenticated using ((select auth.jwt()->''app_metadata''->>''role'')=''admin'') with check ((select auth.jwt()->''app_metadata''->>''role'')=''admin'')','student appeals admin',tab);
 end loop; end $$;
grant select,insert,update,delete on public.student_appeals,public.student_appeal_messages,public.student_appeal_files,public.student_appeal_history,public.student_notifications,public.student_announcements to authenticated;
revoke all on public.student_appeals,public.student_appeal_messages,public.student_appeal_files,public.student_appeal_history,public.student_notifications,public.student_announcements from anon;
grant usage,select on sequence public.student_appeal_number_seq to authenticated;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values('student-appeals','student-appeals',false,10485760,array['application/pdf','image/jpeg','image/png','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document'])
on conflict(id) do update set public=false,file_size_limit=excluded.file_size_limit,allowed_mime_types=excluded.allowed_mime_types;
drop policy if exists "student appeals admin storage" on storage.objects;
create policy "student appeals admin storage" on storage.objects for all to authenticated
using(bucket_id='student-appeals' and (select auth.jwt()->'app_metadata'->>'role')='admin')
with check(bucket_id='student-appeals' and (select auth.jwt()->'app_metadata'->>'role')='admin');

create or replace function public.student_appeal_context(p_portal_token text)
returns table(access_code_id uuid,participant_name text,student_identifier text,group_id uuid,group_name text)
language sql security definer set search_path=public,extensions as $$
 select c.id,coalesce(c.participant_name,'Студент'),coalesce(c.student_identifier,''),c.group_id,g.name
 from public.student_portal_sessions s join public.survey_access_codes c on c.id=s.access_code_id join public.survey_groups g on g.id=c.group_id
 where s.session_hash=digest(trim(p_portal_token),'sha256') and s.expires_at>now() limit 1;
$$;
revoke all on function public.student_appeal_context(text) from public,anon,authenticated;
grant execute on function public.student_appeal_context(text) to service_role;

create or replace function public.student_appeal_status_audit() returns trigger language plpgsql security definer set search_path=public as $$
begin
 new.updated_at=now();
 if new.status is distinct from old.status then
  insert into public.student_appeal_history(appeal_id,actor_type,actor_user_id,action,old_status,new_status) values(new.id,case when auth.uid() is null then 'system' else 'admin' end,auth.uid(),'status_changed',old.status,new.status);
  insert into public.student_notifications(access_code_id,kind,title_ru,title_uz,title_en,body_ru,body_uz,body_en,action_url,priority)
  values(new.access_code_id,'appeal','Статус обращения изменён','Murojaat holati o‘zgardi','Appeal status changed','Обращение '||new.appeal_number||': '||new.status,new.appeal_number||' murojaati: '||new.status,'Appeal '||new.appeal_number||': '||new.status,'/student/appeals/'||new.id,case when new.status='clarification' then 'important' else 'normal' end);
 end if; return new;
end $$;
drop trigger if exists student_appeal_status_audit_trigger on public.student_appeals;
create trigger student_appeal_status_audit_trigger before update on public.student_appeals for each row execute function public.student_appeal_status_audit();

create or replace function public.student_appeal_message_notify() returns trigger language plpgsql security definer set search_path=public as $$
declare a public.student_appeals%rowtype;
begin
 if new.author_type='admin' and not new.internal then select * into a from public.student_appeals where id=new.appeal_id;
  insert into public.student_notifications(access_code_id,kind,title_ru,title_uz,title_en,body_ru,body_uz,body_en,action_url,priority)
  values(a.access_code_id,'appeal','Получен ответ по обращению','Murojaat bo‘yicha javob olindi','New reply to your appeal',a.appeal_number,a.appeal_number,a.appeal_number,'/student/appeals/'||a.id,'important');
 end if; return new;
end $$;
drop trigger if exists student_appeal_message_notify_trigger on public.student_appeal_messages;
create trigger student_appeal_message_notify_trigger after insert on public.student_appeal_messages for each row execute function public.student_appeal_message_notify();
revoke all on function public.student_appeal_status_audit() from public,anon,authenticated;
revoke all on function public.student_appeal_message_notify() from public,anon,authenticated;

create or replace function public.student_survey_assignment_notify() returns trigger language plpgsql security definer set search_path=public as $$
declare s public.student_surveys%rowtype;
begin
 select * into s from public.student_surveys where id=new.survey_id;
 if tg_op='INSERT' then
  insert into public.student_notifications(access_code_id,kind,title_ru,title_uz,title_en,body_ru,body_uz,body_en,action_url,priority)
  values(new.access_code_id,'survey','Назначен новый опрос','Yangi so‘rov tayinlandi','New survey assigned',s.title_ru,s.title_uz,s.title_en,'/student','important');
 elsif new.status='completed' and old.status is distinct from new.status then
  insert into public.student_notifications(access_code_id,kind,title_ru,title_uz,title_en,body_ru,body_uz,body_en,action_url)
  values(new.access_code_id,'survey','Опрос завершён','So‘rov yakunlandi','Survey completed',s.title_ru,s.title_uz,s.title_en,'/student');
 end if; return new;
end $$;
drop trigger if exists student_survey_assignment_notify_trigger on public.student_survey_assignments;
create trigger student_survey_assignment_notify_trigger after insert or update of status on public.student_survey_assignments for each row execute function public.student_survey_assignment_notify();
revoke all on function public.student_survey_assignment_notify() from public,anon,authenticated;
