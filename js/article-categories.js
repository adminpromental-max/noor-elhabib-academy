/**
 * أقسام المعلومات الدينية
 */
const ARTICLE_CATEGORIES = [
  { id: 'quran', title: 'القرآن الكريم', icon: '📖' },
  { id: 'sunnah', title: 'السنة النبوية', icon: '☪️' },
  { id: 'tajweed', title: 'أحكام التجويد', icon: '🎵' },
  { id: 'general', title: 'معلومات عامة', icon: '📚' },
];

function getCategoryTitle(id) {
  return ARTICLE_CATEGORIES.find((c) => c.id === id)?.title || 'معلومات عامة';
}

const CATEGORY_DEFAULT_IMAGES = {
  quran: '/assets/services/hifz.webp',
  sunnah: '/assets/services/islamic.webp',
  tajweed: '/assets/services/tajweed.webp',
  general: '/assets/services/akhlaq.webp',
};

function getArticleCover(article) {
  if (article?.cover_image?.trim()) return article.cover_image.trim();
  return CATEGORY_DEFAULT_IMAGES[article?.category || 'general'] || '/assets/services/hifz.webp';
}

window.ARTICLE_CATEGORIES = ARTICLE_CATEGORIES;
window.getCategoryTitle = getCategoryTitle;
window.getArticleCover = getArticleCover;
