-- Public website appeals: server-only submission and private admin processing.
alter table public.student_appeals alter column access_code_id drop not null;
alter table public.student_appeals add column if not exists source text not null default 'portal' check(source in ('portal','public_web'));
alter table public.student_appeals add column if not exists submitter_name text check(submitter_name is null or length(submitter_name)<=200);
alter table public.student_appeals add column if not exists group_name text check(group_name is null or length(group_name)<=150);
alter table public.student_appeals add column if not exists contact_type text check(contact_type is null or contact_type in ('phone','telegram','email'));
alter table public.student_appeals add column if not exists contact_value text check(contact_value is null or length(contact_value)<=250);
alter table public.student_appeals add column if not exists anonymous boolean not null default false;
alter table public.student_appeals add column if not exists tracking_hash text unique check(tracking_hash is null or length(tracking_hash)=64);
alter table public.student_appeals add column if not exists admin_seen_at timestamptz;

create index if not exists student_appeals_unseen_idx on public.student_appeals(created_at desc) where admin_seen_at is null;
create index if not exists student_appeals_tracking_idx on public.student_appeals(appeal_number,tracking_hash) where tracking_hash is not null;

revoke all on public.student_appeals,public.student_appeal_messages,public.student_appeal_files,public.student_appeal_history from anon;

create or replace function public.student_appeal_status_audit() returns trigger language plpgsql security definer set search_path=public as $$
begin
 new.updated_at=now();
 if new.status is distinct from old.status then
  insert into public.student_appeal_history(appeal_id,actor_type,actor_user_id,action,old_status,new_status) values(new.id,case when auth.uid() is null then 'system' else 'admin' end,auth.uid(),'status_changed',old.status,new.status);
  if new.access_code_id is not null then
   insert into public.student_notifications(access_code_id,kind,title_ru,title_uz,title_en,body_ru,body_uz,body_en,action_url,priority)
   values(new.access_code_id,'appeal','Статус обращения изменён','Murojaat holati o‘zgardi','Appeal status changed','Обращение '||new.appeal_number||': '||new.status,new.appeal_number||' murojaati: '||new.status,'Appeal '||new.appeal_number||': '||new.status,'/student/appeals/'||new.id,case when new.status='clarification' then 'important' else 'normal' end);
  end if;
 end if; return new;
end $$;

create or replace function public.student_appeal_message_notify() returns trigger language plpgsql security definer set search_path=public as $$
declare a public.student_appeals%rowtype;
begin
 if new.author_type='admin' and not new.internal then
  select * into a from public.student_appeals where id=new.appeal_id;
  if a.access_code_id is not null then
   insert into public.student_notifications(access_code_id,kind,title_ru,title_uz,title_en,body_ru,body_uz,body_en,action_url,priority)
   values(a.access_code_id,'appeal','Получен ответ по обращению','Murojaat bo‘yicha javob olindi','New reply to your appeal',a.appeal_number,a.appeal_number,a.appeal_number,'/student/appeals/'||a.id,'important');
  end if;
 end if; return new;
end $$;
revoke all on function public.student_appeal_status_audit() from public,anon,authenticated;
revoke all on function public.student_appeal_message_notify() from public,anon,authenticated;

alter table public.site_security_events drop constraint if exists site_security_events_endpoint_check;
alter table public.site_security_events add constraint site_security_events_endpoint_check check(endpoint in ('employer_survey','graduates_survey','doctoral_survey','public_appeal'));
