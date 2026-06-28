-- نفّذي هذا بعد إنشاء bucket باسم article-images من واجهة Storage
-- Storage → New bucket → Name: article-images → Public: ON

create policy "قراءة صور المقالات"
  on storage.objects for select
  using (bucket_id = 'article-images');

create policy "رفع صور للمسجّلين"
  on storage.objects for insert
  with check (bucket_id = 'article-images' and auth.role() = 'authenticated');

create policy "حذف صور للمسجّلين"
  on storage.objects for delete
  using (bucket_id = 'article-images' and auth.role() = 'authenticated');
