/**
 * أحدث المعلومات الدينية — الصفحة الرئيسية
 */
async function loadHomeArticles() {
  const grid = document.getElementById('homeArticlesGrid');
  if (!grid) return;

  const articles = await SupabaseClient.getLatestArticles(3);

  grid.innerHTML = articles.map((article) => `
    <article class="home-article-card">
      <a href="/articles/${article.slug}" class="home-article-image">
        <img src="${article.cover_image || '/assets/services/hifz.webp'}" alt="${article.title}" loading="lazy" width="360" height="200">
      </a>
      <div class="home-article-body">
        <span class="home-article-cat">${getCategoryTitle(article.category)}</span>
        <h3><a href="/articles/${article.slug}">${article.title}</a></h3>
        <a href="/articles/${article.slug}" class="home-article-link">اقرأ المزيد ←</a>
      </div>
    </article>
  `).join('');
}

document.addEventListener('DOMContentLoaded', loadHomeArticles);
