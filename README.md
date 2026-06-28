# أكاديمية نور الحبيب

صفحة هبوط + مقالات SEO + لوحة تحكم للمحتوى.

## المميزات

- تصميم عربي أصيل مع حركات GSAP
- 8 برامج تعليمية بصور و بوب أب تفصيلي
- صفحة مقالات محسّنة SEO
- لوحة تحكم لإضافة المقالات (العميل لا يرى Supabase)
- بانر حصة تجريبية مجانية تفاعلي
- واتساب + فيسبوك

## إعداد Supabase (مرة واحدة)

1. أنشئي مشروع على [supabase.com](https://supabase.com)
2. من **SQL Editor** نفّذي:
   - `supabase/schema.sql`
   - `supabase/seed.sql` (مقالات مرجعية)
3. من **Storage** أنشئي bucket باسم `article-images` (Public)
4. من **Authentication** أنشئي مستخدم (Email) للوحة التحكم
5. من **Settings → API** انسخي:
   - Project URL
   - anon public key
6. ضعيهم في `js/config.js`:

```js
supabaseUrl: 'https://xxxxx.supabase.co',
supabaseAnonKey: 'eyJhbG...',
```

## لوحة التحكم

- الرابط: `/admin/`
- تسجيل دخول بالإيميل وكلمة المرور من Supabase
- إرشادات SEO تظهر تلقائياً عند إضافة مقال

## معايير SEO للمقالات (مرجع)

| العنصر | المعيار |
|--------|---------|
| العنوان | 5–10 كلمات |
| المحتوى | 300+ كلمة |
| Meta Description | 120–160 حرف |
| صورة الغلاف | 1200×630 بكسل |
| Keywords | 5–8 كلمات مفصولة بفاصلة |

## التواصل

- واتساب: 01038556800
- فيسبوك: [صفحة الأكاديمية](https://www.facebook.com/profile.php?id=61576558975644)

## النشر على Vercel

ارفعي المشروع على GitHub واربطيه بـ Vercel — لا حاجة لإعدادات إضافية.
