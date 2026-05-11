(() => {
  'use strict';

  // ---------- Smooth scroll with header offset ----------
  const header = document.querySelector('.site-header');
  const getHeaderOffset = () => (header ? header.offsetHeight : 0);

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - getHeaderOffset() - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ---------- FAQ: single-open accordion ----------
  const faqDetails = document.querySelectorAll('.faq-list details');
  faqDetails.forEach((d) => {
    d.addEventListener('toggle', () => {
      if (d.open) {
        faqDetails.forEach((other) => {
          if (other !== d) other.open = false;
        });
      }
    });
  });

  // ---------- Fade-in on scroll ----------
  const fadeTargets = document.querySelectorAll('.problem-card, .compare-list li, .steps-list li, .reasons-list li, .service-list li, .hero-features, .problem-summary, .problem-second, .solution-banner, .message-profile');
  fadeTargets.forEach((el) => el.classList.add('fade-in'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -40px 0px', threshold: 0.1 }
    );
    fadeTargets.forEach((el) => io.observe(el));
  } else {
    fadeTargets.forEach((el) => el.classList.add('visible'));
  }

  // ---------- Form: lightweight client-side validation feedback ----------
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      if (!form.checkValidity()) {
        e.preventDefault();
        const firstInvalid = form.querySelector(':invalid');
        if (firstInvalid) {
          firstInvalid.focus();
          const top = firstInvalid.getBoundingClientRect().top + window.pageYOffset - getHeaderOffset() - 16;
          window.scrollTo({ top, behavior: 'smooth' });
        }
        return;
      }
      const action = form.getAttribute('action') || '';
      if (action.includes('YOUR_FORM_ID')) {
        e.preventDefault();
        alert('フォーム送信先(Formspree)が未設定です。\nindex.html の form action 属性を実際のエンドポイントに差し替えてください。');
      }
    });
  }
})();
