create table public.news_view_counts (
 news_id uuid primary key references public.news(id) on delete cascade,
 count bigint not null default 0 check (count >= 0)
);
alter table public.news_view_counts enable row level security;
revoke all on public.news_view_counts from public, anon, authenticated;
grant select on public.news_view_counts to anon, authenticated;
grant all on public.news_view_counts to service_role;
create policy "Published news counts" on public.news_view_counts for select to anon, authenticated
 using (exists (select 1 from public.news where id = news_id and published = true));

create table public.news_view_receipts (
 news_id uuid not null references public.news(id) on delete cascade,
 fingerprint text not null check (fingerprint ~ '^[0-9a-f]{64}$'),
 viewed_on date not null default (now() at time zone 'UTC')::date,
 primary key(news_id, fingerprint, viewed_on)
);
create index news_view_receipts_expiry on public.news_view_receipts(viewed_on);
alter table public.news_view_receipts enable row level security;
revoke all on public.news_view_receipts from public, anon, authenticated;
grant all on public.news_view_receipts to service_role;

create function public.record_news_view(p_news_id uuid, p_fingerprint text)
returns bigint language plpgsql security invoker set search_path = '' as $$
declare inserted integer; total bigint;
begin
 if p_fingerprint is null or p_fingerprint !~ '^[0-9a-f]{64}$' then raise exception 'Invalid fingerprint'; end if;
 perform 1 from public.news where id = p_news_id and published = true for key share;
 if not found then return null; end if;
 delete from public.news_view_receipts where viewed_on < (now() at time zone 'UTC')::date - 1;
 insert into public.news_view_receipts(news_id,fingerprint) values(p_news_id,p_fingerprint) on conflict do nothing;
 get diagnostics inserted = row_count;
 if inserted = 1 then
  insert into public.news_view_counts(news_id,count) values(p_news_id,1)
  on conflict(news_id) do update set count = public.news_view_counts.count + 1
  returning count into total;
 else
  select count into total from public.news_view_counts where news_id = p_news_id;
 end if;
 return coalesce(total,0);
end;
$$;
revoke all on function public.record_news_view(uuid,text) from public, anon, authenticated;
grant execute on function public.record_news_view(uuid,text) to service_role;
