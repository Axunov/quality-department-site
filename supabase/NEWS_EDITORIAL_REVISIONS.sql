-- Keep earlier saved editorial versions, including drafts, behind admin MFA.
-- Deliberately no foreign key: deleting a draft/article does not erase history.
create table if not exists public.news_editorial_revisions (
  id bigint generated always as identity primary key,
  news_id uuid not null,
  snapshot jsonb not null,
  archived_at timestamptz not null default now()
);
create index if not exists news_editorial_revisions_article_idx on public.news_editorial_revisions(news_id,id desc);
alter table public.news_editorial_revisions enable row level security;
revoke all on public.news_editorial_revisions from public,anon,authenticated;
grant select,insert on public.news_editorial_revisions to service_role;
grant usage,select on sequence public.news_editorial_revisions_id_seq to service_role;

create or replace function public.archive_news_editorial_revision()
returns trigger language plpgsql security invoker set search_path='' as $$
begin
  if tg_op='UPDATE' then
    if new is not distinct from old then return new; end if;
  end if;
  insert into public.news_editorial_revisions(news_id,snapshot) values(old.id,to_jsonb(old));
  if tg_op='DELETE' then return old; end if;
  return new;
end $$;
revoke all on function public.archive_news_editorial_revision() from public,anon,authenticated;
grant execute on function public.archive_news_editorial_revision() to service_role;
drop trigger if exists news_editorial_revision_archive on public.news;
create trigger news_editorial_revision_archive
before update or delete on public.news for each row
execute function public.archive_news_editorial_revision();
