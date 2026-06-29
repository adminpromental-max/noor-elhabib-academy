/**
 * عميل Supabase للموقع
 */
const SupabaseClient = {
  _client: null,

  get isConfigured() {
    const { supabaseUrl, supabaseAnonKey } = window.SITE_CONFIG || {};
    return Boolean(supabaseUrl && supabaseAnonKey);
  },

  getClient() {
    if (!this.isConfigured) return null;
    if (!this._client && window.supabase) {
      this._client = window.supabase.createClient(
        window.SITE_CONFIG.supabaseUrl,
        window.SITE_CONFIG.supabaseAnonKey
      );
    }
    return this._client;
  },

  normalizeArticles(data) {
    const fallbackBySlug = Object.fromEntries(
      (typeof FALLBACK_ARTICLES !== 'undefined' ? FALLBACK_ARTICLES : []).map((a) => [a.slug, a])
    );

    return (data || []).map((a) => {
      const fallback = fallbackBySlug[a.slug];
      const cover = getArticleCover({ ...a, category: a.category || fallback?.category });

      return {
        ...a,
        category: a.category || fallback?.category || 'general',
        cover_image: cover,
      };
    });
  },

  async getPublishedArticles() {
    const client = this.getClient();
    if (!client) return FALLBACK_ARTICLES;

    const { data, error } = await client
      .from('articles')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error || !data?.length) return FALLBACK_ARTICLES;

    const normalized = this.normalizeArticles(data);
    const slugs = new Set(normalized.map((a) => a.slug));
    const extras = FALLBACK_ARTICLES.filter((a) => !slugs.has(a.slug));
    return [...normalized, ...extras].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
  },

  async getLatestArticles(limit = 3) {
    const articles = await this.getPublishedArticles();
    return articles.slice(0, limit);
  },

  async getArticleBySlug(slug) {
    const client = this.getClient();
    if (!client) return FALLBACK_ARTICLES.find((a) => a.slug === slug) || null;

    const { data, error } = await client
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error) return FALLBACK_ARTICLES.find((a) => a.slug === slug) || null;
    return data
      ? { ...data, category: data.category || 'general', cover_image: getArticleCover(data) }
      : null;
  },

  groupByCategory(articles) {
    return ARTICLE_CATEGORIES.map((cat) => ({
      ...cat,
      articles: articles.filter((a) => (a.category || 'general') === cat.id),
    }));
  },
};

window.SupabaseClient = SupabaseClient;
