function renderArticleCard(article, showCategory = false) {
  const cat = showCategory
    ? `<span class="article-card-category">${getCategoryTitle(article.category)}</span>`
    : '';
  return `
    <article class="article-card" itemscope itemtype="https://schema.org/Article">
      <div class="article-card-image">
        <a href="/articles/${article.slug}">
          <img src="${getArticleCover(article)}" alt="${article.title}" loading="lazy" width="400" height="200">
        </a>
      </div>
      <div class="article-card-body">
        ${cat}
        <time class="article-card-meta" datetime="${article.created_at}" itemprop="datePublished">${formatDate(article.created_at)}</time>
        <h2 itemprop="headline">
          <a href="/articles/${article.slug}">${article.title}</a>
        </h2>
        <p itemprop="description">${article.excerpt}</p>
        <a href="/articles/${article.slug}" class="article-card-link">اقرأ المزيد ←</a>
      </div>
    </article>
  `;
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

async function loadArticles() {
  const container = document.getElementById('articlesContainer');
  const articles = await SupabaseClient.getPublishedArticles();

  if (!articles.length) {
    container.innerHTML = '<div class="loading-state">لا توجد معلومات دينية حالياً.</div>';
    return;
  }

  const grouped = SupabaseClient.groupByCategory(articles);

  container.innerHTML = grouped.map((section) => {
    if (!section.articles.length) return '';
    return `
      <section class="article-category-section" id="cat-${section.id}">
        <div class="category-header">
          <span class="category-icon">${section.icon}</span>
          <h2 class="category-title">${section.title}</h2>
          <span class="category-count">${section.articles.length} مقالات</span>
        </div>
        <div class="articles-grid">
          ${section.articles.map((a) => renderArticleCard(a)).join('')}
        </div>
      </section>
    `;
  }).join('');

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'معلومات دينية — أكاديمية نور الحبيب',
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
