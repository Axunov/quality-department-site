-- NULL preserves legacy image_url/gallery_urls; [] explicitly means no media.
alter table public.news add column if not exists media_items jsonb;
alter table public.news add constraint news_media_items_array check (
  media_items is null or (jsonb_typeof(media_items) = 'array' and jsonb_array_length(media_items) <= 20)
);
alter table public.news enable row level security;

update storage.buckets set file_size_limit = 52428800,
  allowed_mime_types = array['image/jpeg','image/png','image/webp','image/gif','image/avif','video/mp4','video/webm']
where id = 'news';
