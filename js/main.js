/* ============================================
   أكاديمية نور الحبيب — Main JavaScript
   ============================================ */

const WHATSAPP_NUMBER = () => (window.Site?.whatsappNumber || '201038556800');

const services = [
  {
    id: 'tajweed',
    theme: 'modal-theme-tajweed',
    icon: '📖',
    image: '/assets/services/tajweed.webp',
    title: 'برنامج التلاوة والتجويد',
    description: 'تعليم تلاوة القرآن الكريم بطريقة صحيحة مع إتقان أحكام التجويد.',
    intro: 'برنامج متخصص يأخذك من الأساسيات إلى إتقان التلاوة بضبط المخارج والصفات، مع معلم مجاز يصحح لك مباشرة في حصص أونلاين حية.',
    skills: [
      'مخارج الحروف وصفاتها',
      'أحكام النون الساكنة والتنوين',
      'أحكام الميم الساكنة',
      'المدود وأنواعها',
      'الوقف والابتداء الصحيح',
      'تطبيق عملي على السور القصيرة',
    ],
    features: [
      { icon: '💻', text: 'حصص أونلاين مباشرة' },
      { icon: '📊', text: 'تقارير أداء دورية' },
      { icon: '🎯', text: 'متابعة فردية مستمرة' },
      { icon: '📜', text: 'شهادة إتمام البرنامج' },
    ],
  },
  {
    id: 'hifz',
    theme: 'modal-theme-hifz',
    icon: '📘',
    image: '/assets/services/hifz.webp',
    title: 'برنامج تحفيظ القرآن الكريم',
    description: 'مساعدة الطلاب على حفظ القرآن مع مراجعة مستمرة لتثبيت الحفظ.',
    intro: 'خطة حفظ شخصية تناسب مستواك وعمرك، مع جدول مراجعة يومي وأسبوعي يضمن تثبيت ما حفظته وعدم نسيانه.',
    skills: [
      'وضع خطة حفظ مناسبة لمستواك',
      'تقنيات الحفظ والمراجعة',
      'ضبط التلاوة أثناء الحفظ',
      'مراجعة السور المحفوظة',
      'ربط الآيات بالمعاني',
      'الاستعداد لاختبارات الحفظ',
    ],
    features: [
      { icon: '💻', text: 'حصص أونلاين فردية' },
      { icon: '📊', text: 'تقرير تقدم أسبوعي' },
      { icon: '🔄', text: 'مراجعة منهجية مستمرة' },
      { icon: '🏆', text: 'شهادات إنجاز المراحل' },
    ],
  },
  {
    id: 'islamic',
    theme: 'modal-theme-islamic',
    icon: '🕌',
    image: '/assets/services/islamic.webp',
    title: 'برنامج الدراسات الإسلامية',
    description: 'يشمل العقيدة، الفقه، السيرة النبوية، والتفسير.',
    intro: 'منهج شرعي متوازن يبني عقيدة الطالب ويفقهه في دينه، من خلال دراسة منظمة للعلوم الإسلامية بأسلوب مبسط وواضح.',
    skills: [
      'أصول العقيدة الإسلامية',
      'فقه العبادات والمعاملات',
      'السيرة النبوية ودروسها',
      'تفسير الآيات بأسلوب ميسّر',
      'الآداب الإسلامية اليومية',
      'ربط العلم بالتطبيق العملي',
    ],
    features: [
      { icon: '💻', text: 'دروس أونلاين تفاعلية' },
      { icon: '📚', text: 'مناهج معتمدة' },
      { icon: '✍️', text: 'واجبات وتقييم مستمر' },
      { icon: '📜', text: 'شهادة إتمام المستوى' },
    ],
  },
  {
    id: 'akhlaq',
    theme: 'modal-theme-akhlaq',
    icon: '🌱',
    image: '/assets/services/akhlaq.webp',
    title: 'برنامج تعليم الأخلاق الإسلامية',
    description: 'غرس القيم الإسلامية مثل الصدق، الأمانة، الاحترام والتسامح من خلال التطبيق العملي.',
    intro: 'برنامج تربوي يركز على بناء الشخصية المسلمة، وغرس القيم الأخلاقية في السلوك اليومي من خلال قصص ومواقف عملية.',
    skills: [
      'الصدق والأمانة في القول والفعل',
      'احترام الكبير والرحمة بالصغير',
      'التسامح وحسن المعاملة',
      'آداب الإسلام في البيت والمدرسة',
      'التواضع والإيثار',
      'التطبيق العملي للقيم يومياً',
    ],
    features: [
      { icon: '💻', text: 'جلسات أونلاين تفاعلية' },
      { icon: '🌟', text: 'أنشطة تطبيقية' },
      { icon: '👨‍👩‍👧', text: 'تقارير للأهل' },
      { icon: '📜', text: 'شهادة مشاركة' },
    ],
  },
  {
    id: 'nooraniyah',
    theme: 'modal-theme-nooraniyah',
    icon: '🔤',
    image: '/assets/services/nooraniyah.webp',
    title: 'برنامج القاعدة النورانية',
    description: 'تأسيس الطلاب في قراءة القرآن بشكل صحيح من خلال تعلم الحروف ومخارجها وأحكامها بأسلوب تدريجي مبسط.',
    intro: 'البداية المثالية لمن يريد تعلم قراءة القرآن من الصفر، بمنهج القاعدة النورانية المعتمد عالمياً وبأسلوب ممتع ومتدرج.',
    skills: [
      'التعرف على الحروف وأشكالها',
      'مخارج الحروف الصحيحة',
      'الحركات القصيرة والطويلة',
      'التدريب على المقاطع والكلمات',
      'القراءة السليمة للكلمات القرآنية',
      'الانتقال التدريجي لقراءة الآيات',
    ],
    features: [
      { icon: '💻', text: 'حصص أونلاين للمبتدئين' },
      { icon: '🎨', text: 'أسلوب تعليمي مبسط' },
      { icon: '📈', text: 'متابعة خطوة بخطوة' },
      { icon: '📜', text: 'شهادة إتمام القاعدة' },
    ],
  },
  {
    id: 'arabic',
    theme: 'modal-theme-arabic',
    icon: '📚',
    image: '/assets/services/arabic.webp',
    title: 'برنامج تعليم اللغة العربية',
    description: 'تنمية مهارات القراءة والكتابة والقواعد اللغوية بأساليب حديثة تناسب جميع المستويات.',
    intro: 'نقوّي لغتك العربية بشكل منهجي — من القواعد إلى الإنشاء — بأساليب حديثة تناسب كل الأعمار والمستويات.',
    skills: [
      'قواعد النحو والصرف',
      'القراءة الفهمية والتحليلية',
      'الكتابة الإملائية السليمة',
      'الإنشاء والتعبير الكتابي',
      'توسيع المفردات والتراكيب',
      'التحدث بالعربية الفصحى',
    ],
    features: [
      { icon: '💻', text: 'دروس أونلاين متنوعة' },
      { icon: '📝', text: 'تمارين وتقييم مستمر' },
      { icon: '📊', text: 'تقارير مستوى دورية' },
      { icon: '📜', text: 'شهادة إتمام المستوى' },
    ],
  },
  {
    id: 'children',
    theme: 'modal-theme-children',
    icon: '🧒',
    image: '/assets/services/children.webp',
    title: 'برنامج تأسيس الأطفال',
    description: 'تعليم الأطفال الأساسيات الدينية واللغوية بأسلوب تفاعلي ممتع.',
    intro: 'برنامج مصمم خصيصاً للأطفال يجمع بين المتعة والتعلم، لبناء أساس ديني ولغوي قوي في مرحلة مبكرة.',
    skills: [
      'تعلم الحروف والأرقام العربية',
      'السور القصيرة والأذكار',
      'قصص الأنبياء والصحابة',
      'الآداب الإسلامية للأطفال',
      'المهارات اللغوية الأساسية',
      'أنشطة تفاعلية محفزة',
    ],
    features: [
      { icon: '💻', text: 'حصص أونلاين ممتعة' },
      { icon: '🎮', text: 'تعلم باللعب' },
      { icon: '👨‍👩‍👧', text: 'تقارير أسبوعية للأهل' },
      { icon: '⭐', text: 'شهادات تحفيزية' },
    ],
  },
  {
    id: 'ijaza',
    theme: 'modal-theme-ijaza',
    icon: '🏅',
    image: '/assets/services/ijaza.webp',
    title: 'برنامج الإجازة في القرآن الكريم',
    description: 'الحصول على إجازة بالسند المتصل إلى النبي ﷺ بإشراف متخصصين.',
    intro: 'برنامج متقدم للحاصلين على مقدمة في الحفظ والتلاوة، يسعى للحصول على إجازة بالسند المتصل بإشراف شيوخ مجازين.',
    skills: [
      'إتقان التلاوة بالقراءة المتاحة',
      'مراجعة شاملة للحفظ',
      'دراسة أحكام التجويد المتقدمة',
      'التلاوة على الشيخ والتصحيح',
      'فهم السند وسلسلة الإسناد',
      'الاستعداد لسماع الإجازة',
    ],
    features: [
      { icon: '💻', text: 'جلسات أونلاين مع الشيخ' },
      { icon: '🔗', text: 'سند متصل معتمد' },
      { icon: '📋', text: 'تقييم شامل للمستوى' },
      { icon: '🏅', text: 'إجازة رسمية بالسند' },
    ],
  },
];

function buildWhatsAppLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER()}?text=${encodeURIComponent(message)}`;
}

function renderChecklist(items) {
  return items.map((item) => `
    <li>
      <span class="check">✓</span>
      <span>${item}</span>
    </li>
  `).join('');
}

function renderFeatures(features) {
  return features.map((f) => `
    <div class="modal-feature">
      <span class="modal-feature-icon">${f.icon}</span>
      ${f.text}
    </div>
  `).join('');
}

function renderModalContent(service) {
  const trialMsg = `السلام عليكم، أرغب في حجز جلسة تجريبية مجانية في ${service.title} بأكاديمية نور الحبيب`;

  return `
  <div class="${service.theme}">
    <div class="modal-header">
      <button class="modal-close" id="modalClose" type="button" aria-label="إغلاق">×</button>
      <div class="modal-header-inner">
        <span class="modal-icon">${service.icon}</span>
        <h2 class="modal-title" id="modalTitle">${service.title}</h2>
        <p class="modal-intro">${service.intro}</p>
      </div>
    </div>
    <div class="modal-body">
      <div class="modal-online-badge">
        <span>💻</span>
        <span>جميع الدروس أونلاين — حصص مباشرة مع معلم مجاز</span>
      </div>

      <div class="modal-block">
        <h3 class="modal-block-title"><span>✨</span> مهارات ستتعلمها</h3>
        <ul class="modal-checklist">
          ${renderChecklist(service.skills)}
        </ul>
      </div>

      <div class="modal-block">
        <h3 class="modal-block-title"><span>🎯</span> مميزات البرنامج</h3>
        <div class="modal-features">
          ${renderFeatures(service.features)}
        </div>
      </div>

      <div class="modal-cta">
        <a href="${buildWhatsAppLink(trialMsg)}" class="btn btn-primary btn-lg" target="_blank" rel="noopener">
          ابدأ جلسة تجريبية الآن
        </a>
      </div>
    </div>
  </div>
  `;
}

function renderServices() {
  const grid = document.getElementById('servicesGrid');
  if (!grid) return;

  grid.innerHTML = services.map((service) => {
    const bookMsg = `السلام عليكم، أرغب في الاشتراك في ${service.title} بأكاديمية نور الحبيب`;

    return `
      <article class="service-card">
        <div class="service-card-image">
          <img src="${service.image}" alt="${service.title}" loading="lazy" width="400" height="220">
          <span class="service-icon-badge">${service.icon}</span>
        </div>
        <div class="service-card-body">
          <h3>${service.title}</h3>
          <p>${service.description}</p>
          <div class="service-actions">
            <a href="${buildWhatsAppLink(bookMsg)}" class="btn btn-sm btn-whatsapp" target="_blank" rel="noopener">
              احجز الآن
            </a>
            <button type="button" class="btn btn-sm btn-more" data-service-id="${service.id}">
              اعرف المزيد
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function initServiceModal() {
  const modal = document.getElementById('serviceModal');
  const overlay = document.getElementById('modalOverlay');
  const content = document.getElementById('modalContent');
  if (!modal || !content) return;

  let lastFocus = null;

  function openModal(serviceId) {
    const service = services.find((s) => s.id === serviceId);
    if (!service) return;

    lastFocus = document.activeElement;
    content.innerHTML = renderModalContent(service);
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    content.querySelector('#modalClose')?.addEventListener('click', closeModal);

    if (typeof gsap !== 'undefined') {
      gsap.from('.modal-header-inner > *', {
        opacity: 0,
        y: 16,
        duration: 0.4,
        stagger: 0.08,
        ease: 'power2.out',
      });
      gsap.from('.modal-body > *', {
        opacity: 0,
        y: 12,
        duration: 0.35,
        stagger: 0.06,
        delay: 0.15,
        ease: 'power2.out',
      });
    }
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lastFocus?.focus();
  }

  document.getElementById('servicesGrid')?.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-service-id]');
    if (btn) openModal(btn.dataset.serviceId);
  });

  overlay?.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
}

function initNavigation() {
  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  navToggle?.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.classList.toggle('active', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function initGSAP() {
  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  heroTl
    .from('.hero-badge', { opacity: 0, y: 20, duration: 0.6 })
    .from('.title-line', { opacity: 0, x: 40, duration: 0.7 }, '-=0.3')
    .from('.title-highlight', { opacity: 0, x: -40, duration: 0.7 }, '-=0.5')
    .from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.6 }, '-=0.3')
    .from('.hero-actions', { opacity: 0, y: 20, duration: 0.6 }, '-=0.2')
    .from('.hero-logo-frame', { opacity: 0, scale: 0.8, duration: 1 }, '-=0.8');

  gsap.utils.toArray('.section-header').forEach((header) => {
    gsap.from(header.children, {
      scrollTrigger: { trigger: header, start: 'top 85%' },
      opacity: 0,
      y: 30,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power2.out',
    });
  });

  gsap.from('.about-card', {
    scrollTrigger: { trigger: '.about-grid', start: 'top 80%' },
    opacity: 0,
    y: 50,
    duration: 0.7,
    stagger: 0.15,
    ease: 'power2.out',
  });

  gsap.from('.verse-card', {
    scrollTrigger: { trigger: '.verse-grid', start: 'top 80%' },
    opacity: 0,
    y: 40,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power2.out',
  });

  gsap.from('.service-card', {
    scrollTrigger: { trigger: '.services-grid', start: 'top 85%' },
    opacity: 0,
    y: 40,
    scale: 0.95,
    duration: 0.6,
    stagger: 0.1,
    ease: 'back.out(1.2)',
  });

  gsap.from('.teachers-text > *', {
    scrollTrigger: { trigger: '.teachers-content', start: 'top 75%' },
    opacity: 0,
    x: 40,
    duration: 0.7,
    stagger: 0.12,
    ease: 'power2.out',
  });

  gsap.from('.teachers-visual > *', {
    scrollTrigger: { trigger: '.teachers-content', start: 'top 75%' },
    opacity: 0,
    x: -40,
    duration: 0.7,
    stagger: 0.15,
    ease: 'power2.out',
  });

  gsap.from('.contact-box', {
    scrollTrigger: { trigger: '.contact-box', start: 'top 85%' },
    opacity: 0,
    scale: 0.9,
    duration: 0.8,
    ease: 'back.out(1.4)',
  });

  document.querySelectorAll('.stat-number').forEach((el) => {
    const target = parseInt(el.dataset.count, 10);
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(el, {
          innerText: target,
          duration: 2,
          snap: { innerText: 1 },
          ease: 'power1.out',
        });
      },
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderServices();
  initServiceModal();
  initNavigation();
  initGSAP();
  Site.updateWhatsAppLinks();
  Site.injectTrialBanners();
  Site.injectSocialFloat();
  initTrialSticky();
});

function initTrialSticky() {
  const bar = document.createElement('div');
  bar.className = 'trial-sticky';
  bar.innerHTML = `
    <div class="trial-sticky-inner container">
      <p>🎁 <strong>حصة تجريبية مجانية</strong> — جرّب مع معلم مجاز</p>
      <a href="${Site.trialLink()}" class="btn btn-trial btn-sm" data-trial target="_blank" rel="noopener">احجز الآن</a>
    </div>
  `;
  document.body.appendChild(bar);
  window.addEventListener('scroll', () => {
    bar.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
}
