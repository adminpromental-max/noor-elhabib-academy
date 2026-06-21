/* ============================================
   أكاديمية نور الحبيب — Main JavaScript
   ============================================ */

const WHATSAPP_NUMBER = '201024465792';

const services = [
  {
    icon: '📖',
    title: 'برنامج التلاوة والتجويد',
    description: 'تعليم تلاوة القرآن الكريم بطريقة صحيحة مع إتقان أحكام التجويد.',
  },
  {
    icon: '📘',
    title: 'برنامج تحفيظ القرآن الكريم',
    description: 'مساعدة الطلاب على حفظ القرآن مع مراجعة مستمرة لتثبيت الحفظ.',
  },
  {
    icon: '🕌',
    title: 'برنامج الدراسات الإسلامية',
    description: 'يشمل العقيدة، الفقه، السيرة النبوية، والتفسير.',
  },
  {
    icon: '🌱',
    title: 'برنامج تعليم الأخلاق الإسلامية',
    description: 'غرس القيم الإسلامية مثل الصدق، الأمانة، الاحترام والتسامح من خلال التطبيق العملي.',
  },
  {
    icon: '🔤',
    title: 'برنامج القاعدة النورانية',
    description: 'تأسيس الطلاب في قراءة القرآن بشكل صحيح من خلال تعلم الحروف ومخارجها وأحكامها بأسلوب تدريجي مبسط.',
  },
  {
    icon: '📚',
    title: 'برنامج تعليم اللغة العربية',
    description: 'تنمية مهارات القراءة والكتابة والقواعد اللغوية بأساليب حديثة تناسب جميع المستويات.',
  },
  {
    icon: '🧒',
    title: 'برنامج تأسيس الأطفال',
    description: 'تعليم الأطفال الأساسيات الدينية واللغوية بأسلوب تفاعلي ممتع.',
  },
  {
    icon: '🏅',
    title: 'برنامج الإجازة في القرآن الكريم',
    description: 'الحصول على إجازة بالسند المتصل إلى النبي ﷺ بإشراف متخصصين.',
  },
];

function buildWhatsAppLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function renderServices() {
  const grid = document.getElementById('servicesGrid');
  if (!grid) return;

  grid.innerHTML = services.map((service) => {
    const bookMsg = `السلام عليكم، أرغب في الاشتراك في ${service.title} بأكاديمية نور الحبيب`;
    const moreMsg = `السلام عليكم، أرغب في معرفة المزيد عن ${service.title}`;

    return `
      <article class="service-card">
        <span class="service-icon">${service.icon}</span>
        <h3>${service.title}</h3>
        <p>${service.description}</p>
        <div class="service-actions">
          <a href="${buildWhatsAppLink(bookMsg)}" class="btn btn-sm btn-whatsapp" target="_blank" rel="noopener">
            احجز الآن
          </a>
          <a href="${buildWhatsAppLink(moreMsg)}" class="btn btn-sm btn-more" target="_blank" rel="noopener">
            اعرف المزيد
          </a>
        </div>
      </article>
    `;
  }).join('');
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

  // Hero animations
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  heroTl
    .from('.hero-badge', { opacity: 0, y: 20, duration: 0.6 })
    .from('.title-line', { opacity: 0, x: 40, duration: 0.7 }, '-=0.3')
    .from('.title-highlight', { opacity: 0, x: -40, duration: 0.7 }, '-=0.5')
    .from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.6 }, '-=0.3')
    .from('.hero-actions', { opacity: 0, y: 20, duration: 0.6 }, '-=0.2')
    .from('.hero-logo-frame', { opacity: 0, scale: 0.8, duration: 1 }, '-=0.8');

  // Section headers
  gsap.utils.toArray('.section-header').forEach((header) => {
    gsap.from(header.children, {
      scrollTrigger: {
        trigger: header,
        start: 'top 85%',
      },
      opacity: 0,
      y: 30,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power2.out',
    });
  });

  // About cards
  gsap.from('.about-card', {
    scrollTrigger: {
      trigger: '.about-grid',
      start: 'top 80%',
    },
    opacity: 0,
    y: 50,
    duration: 0.7,
    stagger: 0.15,
    ease: 'power2.out',
  });

  // Verse cards
  gsap.from('.verse-card', {
    scrollTrigger: {
      trigger: '.verse-grid',
      start: 'top 80%',
    },
    opacity: 0,
    y: 40,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power2.out',
  });

  // Service cards
  gsap.from('.service-card', {
    scrollTrigger: {
      trigger: '.services-grid',
      start: 'top 85%',
    },
    opacity: 0,
    y: 40,
    scale: 0.95,
    duration: 0.6,
    stagger: 0.1,
    ease: 'back.out(1.2)',
  });

  // Teachers section
  gsap.from('.teachers-text > *', {
    scrollTrigger: {
      trigger: '.teachers-content',
      start: 'top 75%',
    },
    opacity: 0,
    x: 40,
    duration: 0.7,
    stagger: 0.12,
    ease: 'power2.out',
  });

  gsap.from('.teachers-visual > *', {
    scrollTrigger: {
      trigger: '.teachers-content',
      start: 'top 75%',
    },
    opacity: 0,
    x: -40,
    duration: 0.7,
    stagger: 0.15,
    ease: 'power2.out',
  });

  // Contact box
  gsap.from('.contact-box', {
    scrollTrigger: {
      trigger: '.contact-box',
      start: 'top 85%',
    },
    opacity: 0,
    scale: 0.9,
    duration: 0.8,
    ease: 'back.out(1.4)',
  });

  // Counter animation
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
  initNavigation();
  initGSAP();
});
