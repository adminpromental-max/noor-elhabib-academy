function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

async function loadArticles() {
  const grid = document.getElementById('articlesGrid');
  const articles = await SupabaseClient.getPublishedArticles();

  if (!articles.length) {
    grid.innerHTML = '<div class="loading-state">لا توجد مقالات حالياً.</div>';
    return;
  }

  grid.innerHTML = articles.map((article) => `
    <article class="article-card" itemscope itemtype="https://schema.org/Article">
      <div class="article-card-image">
        <a href="/articles/${article.slug}">
          <img src="${article.cover_image || '/assets/services/hifz.jpg'}" alt="${article.title}" loading="lazy" width="400" height="200">
        </a>
      </div>
      <div class="article-card-body">
        <time class="article-card-meta" datetime="${article.created_at}" itemprop="datePublished">${formatDate(article.created_at)}</time>
        <h2 itemprop="headline">
          <a href="/articles/${article.slug}">${article.title}</a>
        </h2>
        <p itemprop="description">${article.excerpt}</p>
        <a href="/articles/${article.slug}" class="article-card-link">اقرأ المزيد ←</a>
      </div>
    </article>
  `).join('');

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'مدونة أكاديمية نور الحبيب',
    url: `${Site.config.siteUrl}/articles/`,
    blogPost: articles.map((a) => ({
      '@type': 'BlogPosting',
      headline: a.title,
      description: a.excerpt,
      url: `${Site.config.siteUrl}/articles/${a.slug}`,
      datePublished: a.created_at,
      image: a.cover_image,
    })),
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

document.addEventListener('DOMContentLoaded', () => {
  loadArticles();
  Site.injectSocialFloat();
});
