/* =====================================================
   PESANTREN DARUL MUKHLISIHIN — MAIN JAVASCRIPT
   ===================================================== */

// ─── NAVBAR SCROLL EFFECT ────────────────────────────
(function () {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  // Deteksi halaman beranda dari class .hero
  const isHome = document.querySelector('.hero') !== null;

  // Sub-pages: langsung paksa solid, tidak perlu tunggu scroll
  if (!isHome) {
    navbar.classList.add('scrolled');
  }

  function updateNav() {
    if (!isHome) return; // sub-pages selalu solid, skip
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  if (isHome) {
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }
})();

// ─── MOBILE MENU ─────────────────────────────────────
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  const hamburger = document.getElementById('hamburger');
  if (!menu || !hamburger) return;

  const isOpen = menu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

// Close mobile menu on outside click
document.addEventListener('click', function (e) {
  const menu = document.getElementById('mobileMenu');
  const hamburger = document.getElementById('hamburger');
  if (!menu || !menu.classList.contains('open')) return;
  if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
    menu.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ─── SCROLL REVEAL ───────────────────────────────────
(function () {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
})();

// ─── HERO STATS COUNTER ──────────────────────────────
(function () {
  const statNums = document.querySelectorAll('.stat-num');
  if (!statNums.length) return;

  function parseValue(str) {
    const match = str.match(/^(\d+)(\+?)(.*)/);
    if (!match) return { num: 0, suffix: '', prefix: '' };
    return { num: parseInt(match[1]), suffix: match[2] + match[3], prefix: '' };
  }

  function countUp(el, target, suffix, duration) {
    const start = performance.now();
    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.floor(eased * target);
      el.textContent = current.toLocaleString('id-ID') + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const raw = el.textContent;
          const { num, suffix } = parseValue(raw);
          countUp(el, num, suffix, 1800);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNums.forEach((el) => observer.observe(el));
})();

// ─── SMOOTH ANCHOR SCROLL ────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─── NAVBAR ACTIVE LINK ──────────────────────────────
(function () {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === path) {
      link.classList.add('active');
    } else if (path === '' && href === 'index.html') {
      link.classList.add('active');
    }
  });
})();

// ─── FORM FIELD LIVE VALIDATION ──────────────────────
(function () {
  const fields = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
  fields.forEach((field) => {
    field.addEventListener('blur', function () {
      const grp = this.closest('.form-group');
      if (grp && grp.classList.contains('error') && this.value.trim()) {
        grp.classList.remove('error');
      }
    });
    field.addEventListener('input', function () {
      const grp = this.closest('.form-group');
      if (grp && grp.classList.contains('error') && this.value.trim().length >= 2) {
        grp.classList.remove('error');
      }
    });
  });
})();

// ─── PROGRAM CARDS — navigate with keyboard ──────────
document.querySelectorAll('.program-card').forEach((card) => {
  card.setAttribute('tabindex', '0');
  card.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      this.click();
    }
  });
});

// ─── PAGE LOAD FADE ──────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 50);
});

// ─── KONTAK CARDS — hover animation ──────────────────
document.querySelectorAll('.kontak-card').forEach((card) => {
  card.addEventListener('mouseenter', function () {
    this.style.borderColor = 'rgba(59,130,246,0.25)';
  });
  card.addEventListener('mouseleave', function () {
    this.style.borderColor = 'rgba(59,130,246,0.08)';
  });
});

console.log(
  '%c🕌 Pesantren Darul Mukhlisihin',
  'font-size:16px;font-weight:bold;color:#3b82f6;',
  '\nWebsite siap melayani Anda!'
);
