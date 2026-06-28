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
2. نفّذي `supabase/schema.sql` ثم `supabase/seed.sql`
3. أنشئي bucket `article-images` (Public) ثم نفّذي `supabase/storage.sql`
4. من **Authentication → Providers** تأكدي أن **Email** مفعّل
5. من **Authentication → URL Configuration** أضيفي:
   - **Site URL:** `https://noor-elhabib-academy.vercel.app`
   - **Redirect URLs:** `https://noor-elhabib-academy.vercel.app/admin/reset-password.html`
6. أنشئي مستخدم من **Authentication → Users** مع ✅ **Auto Confirm User**
7. ضعي المفاتيح في `js/config.js` واعملي push

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
