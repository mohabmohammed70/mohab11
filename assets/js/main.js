/* ============================================================
   MOHAB MOHAMED — PORTFOLIO
   main.js | Interactions, Animations, Preloader
   ============================================================ */

'use strict';

/* ────────────────────────────────────────────
   1. PRELOADER
   ──────────────────────────────────────────── */
(function initPreloader() {
  const preloader  = document.getElementById('preloader');
  const counterEl  = document.getElementById('counter');
  const bar        = document.querySelector('.preloader__bar');

  let count = 0;
  const target = 100;
  const duration = 2800;
  const startTime = performance.now();

  function animate(now) {
    const elapsed  = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);  // ease-out cubic
    count = Math.floor(eased * target);
    counterEl.textContent = count;
    bar.style.width = count + '%';

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      counterEl.textContent = 100;
      // Slight delay then hide
      setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.classList.remove('is-loading');
        // Trigger initial reveals
        triggerReveal();
      }, 400);
    }
  }

  requestAnimationFrame(animate);
})();


/* ────────────────────────────────────────────
   2. CUSTOM CURSOR
   ──────────────────────────────────────────── */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const dot    = cursor.querySelector('.cursor__dot');
  const ring   = cursor.querySelector('.cursor__ring');

  let dotX = 0, dotY = 0;
  let ringX = 0, ringY = 0;
  let mouseX = 0, mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    // Dot follows immediately
    dotX += (mouseX - dotX) * 0.9;
    dotY += (mouseY - dotY) * 0.9;
    dot.style.left = dotX + 'px';
    dot.style.top  = dotY + 'px';

    // Ring follows with lag
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effects
  const hoverTargets = 'a, button, .project-card, .course-item, .skill-category, .process-step, .contact-link, .social-btn';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverTargets)) {
      document.body.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverTargets)) {
      document.body.classList.remove('cursor-hover');
    }
  });
})();


/* ────────────────────────────────────────────
   3. NAVBAR SCROLL EFFECT
   ──────────────────────────────────────────── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');

  function onScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();


/* ────────────────────────────────────────────
   4. MOBILE MENU
   ──────────────────────────────────────────── */
(function initMobileMenu() {
  const burger     = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  const links      = mobileMenu.querySelectorAll('.mobile-menu__link');

  burger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    burger.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      burger.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
})();


/* ────────────────────────────────────────────
   5. SCROLL REVEAL
   ──────────────────────────────────────────── */
function triggerReveal() {
  const els = document.querySelectorAll('.reveal-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  els.forEach(el => observer.observe(el));
}


/* ────────────────────────────────────────────
   6. HERO PARALLAX TEXT
   ──────────────────────────────────────────── */
(function initParallax() {
  const bgText = document.querySelector('.hero__bg-text');
  if (!bgText) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    bgText.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.15}px))`;
  }, { passive: true });
})();


/* ────────────────────────────────────────────
   7. SMOOTH ACTIVE NAV HIGHLIGHT
   ──────────────────────────────────────────── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === '#' + id
            ? 'var(--white)'
            : '';
        });
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(section => observer.observe(section));
})();


/* ────────────────────────────────────────────
   8. PROJECT CARD TILT
   ──────────────────────────────────────────── */
(function initCardTilt() {
  const cards = document.querySelectorAll('.project-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const cx     = rect.width / 2;
      const cy     = rect.height / 2;
      const rotX   = ((y - cy) / cy) * -4;
      const rotY   = ((x - cx) / cx) *  4;

      card.style.transform = `translateY(-4px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      card.style.transition = 'transform 0.1s ease';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.6s var(--ease-out)';
    });
  });
})();


/* ────────────────────────────────────────────
   9. CONTACT FORM
   ──────────────────────────────────────────── */
(function initForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    btn.innerHTML = 'Sending… ⏳';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = 'Message Sent! ✓';
      btn.style.background = '#27ae60';
      form.reset();

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.disabled = false;
      }, 3500);
    }, 1200);
  });
})();


/* ────────────────────────────────────────────
   10. MARQUEE PAUSE ON HOVER
   ──────────────────────────────────────────── */
(function initMarquee() {
  const track = document.querySelector('.marquee-content');
  if (!track) return;

  const marqueeSection = document.querySelector('.marquee-section');

  marqueeSection.addEventListener('mouseenter', () => {
    track.style.animationPlayState = 'paused';
  });

  marqueeSection.addEventListener('mouseleave', () => {
    track.style.animationPlayState = 'running';
  });
})();


/* ────────────────────────────────────────────
   11. SMOOTH SCROLL FOR ANCHOR LINKS
   ──────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/* ────────────────────────────────────────────
   12. STATS COUNT-UP ANIMATION
   ──────────────────────────────────────────── */
(function initCountUp() {
  const stats = document.querySelectorAll('.stat-num');
  if (!stats.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el  = entry.target;
      const raw = el.textContent.trim();
      const num = parseFloat(raw.replace(/[^0-9.]/g, ''));
      const suffix = raw.replace(/[0-9.]/g, '');

      if (isNaN(num)) return;

      let start = 0;
      const duration = 1500;
      const startTime = performance.now();

      function animate(now) {
        const elapsed  = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased    = 1 - Math.pow(1 - progress, 3);
        const current  = Math.floor(eased * num);

        el.textContent = current + suffix;

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          el.textContent = raw;
        }
      }

      requestAnimationFrame(animate);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => observer.observe(stat));
})();


/* ────────────────────────────────────────────
   13. PAGE LOAD OPTIMIZATION
   ──────────────────────────────────────────── */
window.addEventListener('load', () => {
  // Ensure body is scrollable after everything loads
  document.body.style.overflow = '';
});

/* ── SKILL BAR ANIMATION ── */
(function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');
  if (!bars.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });
  bars.forEach(bar => io.observe(bar));
})();
