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

window.ARTICLE_CATEGORIES = ARTICLE_CATEGORIES;
window.getCategoryTitle = getCategoryTitle;
