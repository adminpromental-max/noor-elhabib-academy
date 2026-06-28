function getSlugFromUrl() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('slug')) return params.get('slug');
  const parts = window.location.pathname.split('/').filter(Boolean);
  const idx = parts.indexOf('articles');
  if (idx !== -1 && parts[idx + 1]) return decodeURIComponent(parts[idx + 1]);
  return null;
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function updateMeta(article) {
  const siteUrl = Site.config.siteUrl || window.location.origin;
  const url = `${siteUrl}/articles/${article.slug}`;

  document.title = `${article.title} | أكاديمية نور الحبيب`;
  document.querySelector('meta[name="description"]').content = article.meta_description;
  document.querySelector('meta[name="keywords"]').content = article.keywords;
  document.querySelector('link[rel="canonical"]').href = url;
  document.querySelector('meta[property="og:title"]').content = article.title;
  document.querySelector('meta[property="og:description"]').content = article.meta_description;
  document.querySelector('meta[property="og:image"]').content = article.cover_image;
  document.querySelector('link[rel="canonical"]').href = url;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.meta_description,
    image: article.cover_image,
    datePublished: article.created_at,
    author: { '@type': 'Organization', name: 'أكاديمية نور الحبيب' },
    publisher: {
      '@type': 'Organization',
      name: 'أكاديمية نور الحبيب',
      logo: { '@type': 'ImageObject', url: `${siteUrl}/assets/logo.jpg` },
    },
    keywords: article.keywords,
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

async function loadArticle() {
  const slug = getSlugFromUrl();
  const page = document.getElementById('articlePage');

  if (!slug) {
    page.innerHTML = '<div class="container loading-state">المقال غير موجود.</div>';
    return;
  }

  const article = await SupabaseClient.getArticleBySlug(slug);

  if (!article) {
    page.innerHTML = '<div class="container loading-state">المقال غير موجود.</div>';
    return;
  }

  updateMeta(article);

  const keywords = article.keywords.split(',').map((k) => k.trim()).filter(Boolean);

  page.innerHTML = `
    <div class="container">
      <nav class="breadcrumb" aria-label="مسار التنقل">
        <a href="/">الرئيسية</a> / <a href="/articles/">المقالات</a> / <span>${article.title}</span>
      </nav>
      <header class="article-single-header">
        <h1>${article.title}</h1>
        <p class="article-single-meta">
          <time datetime="${article.created_at}">${formatDate(article.created_at)}</time>
          · أكاديمية نور الحبيب
        </p>
      </header>
      ${article.cover_image ? `
        <figure class="article-cover">
          <img src="${article.cover_image}" alt="${article.title}" width="900" height="450">
        </figure>
      ` : ''}
      <article class="article-content">${article.content}</article>
      ${keywords.length ? `
        <div class="article-keywords">
          ${keywords.map((k) => `<span>${k}</span>`).join('')}
        </div>
      ` : ''}
      <div class="article-cta">
        <a href="${Site.trialLink(article.title)}" class="btn btn-primary btn-lg btn-trial-glow" target="_blank" rel="noopener">
          احجز حصة تجريبية مجانية
        </a>
      </div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  loadArticle();
  Site.injectSocialFloat();
});
