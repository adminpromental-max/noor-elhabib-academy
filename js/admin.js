/**
 * لوحة تحكم المقالات
 */
const Admin = {
  client: null,

  init() {
    if (!SITE_CONFIG.supabaseUrl || !SITE_CONFIG.supabaseAnonKey) {
      this.showAlert('يرجى إعداد Supabase في js/config.js', 'error');
      return;
    }

    this.client = Auth.getClient();
    if (!this.client) {
      this.showAlert('تعذر الاتصال بـ Supabase', 'error');
      return;
    }

    this.client.auth.getSession().then(({ data }) => {
      if (!data.session) window.location.href = '/admin/';
      else {
        this.loadArticles();
        this.bindEvents();
      }
    });
  },

  showAlert(msg, type = 'success') {
    document.getElementById('alertBox').innerHTML =
      `<div class="admin-alert ${type}">${msg}</div>`;
    setTimeout(() => { document.getElementById('alertBox').innerHTML = ''; }, 4000);
  },

  bindEvents() {
    document.getElementById('logoutBtn').addEventListener('click', async () => {
      await Auth.signOut();
      window.location.href = '/admin/';
    });

    document.querySelectorAll('.admin-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.admin-tab').forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        const isForm = tab.dataset.tab === 'form';
        document.getElementById('tabList').hidden = isForm;
        document.getElementById('tabForm').hidden = !isForm;
      });
    });

    const titleEl = document.getElementById('title');
    const slugEl = document.getElementById('slug');

    titleEl.addEventListener('input', () => {
      this.updateCounters();
      if (!document.getElementById('articleId').value) {
        slugEl.value = Site.slugify(titleEl.value);
      }
    });

    ['meta_description', 'content'].forEach((id) => {
      document.getElementById(id).addEventListener('input', () => this.updateCounters());
    });

    document.getElementById('coverFile').addEventListener('change', (e) => {
      this.uploadCover(e.target.files[0]);
    });

    document.getElementById('articleForm').addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveArticle();
    });

    document.getElementById('cancelEdit').addEventListener('click', () => {
      this.resetForm();
      document.querySelector('[data-tab="list"]').click();
    });
  },

  updateCounters() {
    const titleWords = Site.countWords(document.getElementById('title').value);
    const contentWords = Site.countWords(
      document.getElementById('content').value.replace(/<[^>]*>/g, ' ')
    );
    const metaLen = document.getElementById('meta_description').value.length;

    document.getElementById('titleCounter').textContent = `${titleWords} كلمة`;
    document.getElementById('contentCounter').textContent = `${contentWords} كلمة`;
    document.getElementById('metaCounter').textContent = `${metaLen} / 160 حرف`;

    const titleHint = document.getElementById('titleHint');
    titleHint.className = 'admin-hint ' + (titleWords >= 5 && titleWords <= 10 ? 'valid' : 'invalid');

    const contentHint = document.getElementById('contentHint');
    contentHint.className = 'admin-hint ' + (contentWords >= 300 ? 'valid' : 'invalid');

    const metaHint = document.getElementById('metaHint');
    metaHint.className = 'admin-hint ' + (metaLen >= 120 && metaLen <= 160 ? 'valid' : 'invalid');
  },

  async uploadCover(file) {
    if (!file) return;
    const ext = file.name.split('.').pop();
    const path = `${Date.now()}.${ext}`;

    const { data, error } = await this.client.storage
      .from('article-images')
      .upload(path, file, { upsert: true });

    if (error) {
      this.showAlert('فشل رفع الصورة: ' + error.message, 'error');
      return;
    }

    const { data: urlData } = this.client.storage
      .from('article-images')
      .getPublicUrl(data.path);

    document.getElementById('cover_image').value = urlData.publicUrl;
    this.showAlert('تم رفع الصورة بنجاح');
  },

  async loadArticles() {
    const { data, error } = await this.client
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    const list = document.getElementById('articlesList');

    if (error) {
      list.innerHTML = `<div class="admin-alert error">${error.message}</div>`;
      return;
    }

    if (!data.length) {
      list.innerHTML = '<p class="admin-hint">لا توجد مقالات بعد — أضيفي أول مقال من تبويب "إضافة مقال"</p>';
      return;
    }

    list.innerHTML = data.map((a) => `
      <div class="admin-article-item">
        <div>
          <h3>${a.title}</h3>
          <p class="meta">${a.slug} · ${new Date(a.created_at).toLocaleDateString('ar-EG')}</p>
        </div>
        <span class="admin-badge ${a.published ? 'published' : 'draft'}">${a.published ? 'منشور' : 'مسودة'}</span>
        <div class="admin-actions">
          <button class="btn-admin-sm btn-edit" data-edit="${a.id}">تعديل</button>
          <button class="btn-admin-sm btn-delete" data-delete="${a.id}">حذف</button>
        </div>
      </div>
    `).join('');

    list.querySelectorAll('[data-edit]').forEach((btn) => {
      btn.addEventListener('click', () => this.editArticle(btn.dataset.edit, data));
    });

    list.querySelectorAll('[data-delete]').forEach((btn) => {
      btn.addEventListener('click', () => this.deleteArticle(btn.dataset.delete));
    });
  },

  editArticle(id, articles) {
    const article = articles.find((a) => a.id === id);
    if (!article) return;

    document.getElementById('articleId').value = article.id;
    document.getElementById('title').value = article.title;
    document.getElementById('slug').value = article.slug;
    document.getElementById('excerpt').value = article.excerpt;
    document.getElementById('meta_description').value = article.meta_description;
    document.getElementById('keywords').value = article.keywords;
    document.getElementById('cover_image').value = article.cover_image;
    document.getElementById('content').value = article.content;
    document.getElementById('published').checked = article.published;
    document.getElementById('submitBtn').textContent = 'تحديث المقال';
    document.getElementById('cancelEdit').hidden = false;

    this.updateCounters();
    document.querySelector('[data-tab="form"]').click();
  },

  resetForm() {
    document.getElementById('articleForm').reset();
    document.getElementById('articleId').value = '';
    document.getElementById('submitBtn').textContent = 'حفظ المقال';
    document.getElementById('cancelEdit').hidden = true;
    this.updateCounters();
  },

  async saveArticle() {
    const id = document.getElementById('articleId').value;
    const payload = {
      title: document.getElementById('title').value.trim(),
      slug: document.getElementById('slug').value.trim(),
      excerpt: document.getElementById('excerpt').value.trim(),
      meta_description: document.getElementById('meta_description').value.trim(),
      keywords: document.getElementById('keywords').value.trim(),
      cover_image: document.getElementById('cover_image').value.trim(),
      content: document.getElementById('content').value.trim(),
      published: document.getElementById('published').checked,
      updated_at: new Date().toISOString(),
    };

    const titleWords = Site.countWords(payload.title);
    if (titleWords < 3) {
      this.showAlert('العنوان قصير جداً', 'error');
      return;
    }

    let result;
    if (id) {
      result = await this.client.from('articles').update(payload).eq('id', id);
    } else {
      result = await this.client.from('articles').insert(payload);
    }

    if (result.error) {
      this.showAlert(result.error.message, 'error');
      return;
    }

    this.showAlert(id ? 'تم تحديث المقال' : 'تم إضافة المقال بنجاح');
    this.resetForm();
    this.loadArticles();
    document.querySelector('[data-tab="list"]').click();
  },

  async deleteArticle(id) {
    if (!confirm('هل أنتِ متأكدة من حذف هذا المقال؟')) return;
    const { error } = await this.client.from('articles').delete().eq('id', id);
    if (error) this.showAlert(error.message, 'error');
    else {
      this.showAlert('تم الحذف');
      this.loadArticles();
    }
  },
};

document.addEventListener('DOMContentLoaded', () => Admin.init());
