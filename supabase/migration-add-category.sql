-- إضافة عمود القسم للقاعدة الموجودة — نفّذي في Supabase SQL Editor

alter table articles add column if not exists category text not null default 'general';
create index if not exists articles_category_idx on articles (category);

-- تحديث المقالات القديمة
update articles set category = 'quran' where slug = 'فوائد-تحفيظ-القرآن-للأطفال';
update articles set category = 'tajweed' where slug = 'أهمية-علم-التجويد-للمبتدئين';
update articles set category = 'general' where slug = 'القاعدة-النورانية-لتعليم-القراءة';
update articles set category = 'general' where slug = 'كيف-تختار-أكاديمية-تحفيظ-قرآن';
