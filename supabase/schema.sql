-- جدول المقالات — نفّذي هذا في Supabase SQL Editor

create table if not exists articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text not null,
  content text not null,
  meta_description text not null,
  keywords text not null default '',
  cover_image text not null default '',
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists articles_slug_idx on articles (slug);
create index if not exists articles_published_idx on articles (published, created_at desc);

alter table articles enable row level security;

create policy "المقالات المنشورة للجميع"
  on articles for select
  using (published = true);

create policy "المسجّلون يديرون المقالات"
  on articles for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Storage: أنشئي bucket باسم article-images (public)
-- ثم نفّذي السياسات التالية بعد إنشاء الـ bucket

-- insert into storage.buckets (id, name, public) values ('article-images', 'article-images', true);

-- create policy "قراءة صور المقالات"
--   on storage.objects for select using (bucket_id = 'article-images');

-- create policy "رفع صور للمسجّلين"
--   on storage.objects for insert
--   with check (bucket_id = 'article-images' and auth.role() = 'authenticated');

-- create policy "حذف صور للمسجّلين"
--   on storage.objects for delete
--   using (bucket_id = 'article-images' and auth.role() = 'authenticated');
