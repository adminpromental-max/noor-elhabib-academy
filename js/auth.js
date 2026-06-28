/**
 * مصادقة Supabase — دخول واستعادة كلمة المرور
 */
const Auth = {
  _client: null,

  getClient() {
    if (!SITE_CONFIG?.supabaseUrl || !SITE_CONFIG?.supabaseAnonKey) {
      return null;
    }
    if (!this._client) {
      if (!window.supabase?.createClient) {
        console.error('مكتبة Supabase غير محمّلة');
        return null;
      }
      this._client = window.supabase.createClient(
        SITE_CONFIG.supabaseUrl,
        SITE_CONFIG.supabaseAnonKey,
        {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true,
          },
        }
      );
    }
    return this._client;
  },

  translateError(message) {
    const map = {
      'Invalid login credentials': 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
      'Email not confirmed': 'يرجى تأكيد البريد الإلكتروني أولاً من صندوق الوارد',
      'User not found': 'لا يوجد حساب بهذا البريد الإلكتروني',
      'For security purposes, you can only request this once every 60 seconds':
        'يرجى الانتظار دقيقة قبل إعادة إرسال الرابط',
    };
    return map[message] || message;
  },

  getRedirectUrl(path) {
    const base = SITE_CONFIG.siteUrl || window.location.origin;
    return `${base.replace(/\/$/, '')}${path}`;
  },

  async signIn(email, password) {
    const client = this.getClient();
    if (!client) {
      return { error: { message: 'إعدادات Supabase غير مكتملة في config.js' } };
    }
    return client.auth.signInWithPassword({ email: email.trim(), password });
  },

  async sendPasswordReset(email) {
    const client = this.getClient();
    if (!client) {
      return { error: { message: 'إعدادات Supabase غير مكتملة' } };
    }
    return client.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: this.getRedirectUrl('/admin/reset-password.html'),
    });
  },

  async updatePassword(newPassword) {
    const client = this.getClient();
    if (!client) {
      return { error: { message: 'إعدادات Supabase غير مكتملة' } };
    }
    return client.auth.updateUser({ password: newPassword });
  },

  async getSession() {
    const client = this.getClient();
    if (!client) return { data: { session: null } };
    return client.auth.getSession();
  },

  async signOut() {
    const client = this.getClient();
    if (client) await client.auth.signOut();
  },
};

window.Auth = Auth;
