/* ===== Index Dynamic Entrance (pntwhere-inspired) ===== */
(function () {
  'use strict';

  /* ---------- 1. Loading Screen Counter ---------- */
  function runLoader(onComplete) {
    var overlay  = document.getElementById('loadingOverlay');
    var counter  = document.getElementById('loaderCounter');
    var bar      = document.getElementById('loaderBarFill');
    if (!overlay || !counter) { onComplete(); return; }

    var current = 0;
    var target  = 90;
    var duration = 1800; // ms
    var start = performance.now();

    function tick(now) {
      var progress = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      current = Math.round(eased * target);
      counter.textContent = current;
      if (bar) bar.style.width = current + '%';

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        counter.textContent = '90';
        if (bar) bar.style.width = '100%';
        setTimeout(function () {
          overlay.classList.add('done');
          document.body.style.overflow = '';
          onComplete();
        }, 300);
      }
    }
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(tick);
  }

  /* ---------- 2. Hero clip-reveal ---------- */
  function revealHero() {
    var hero = document.querySelector('.hero-entrance');
    if (hero) {
      requestAnimationFrame(function () {
        hero.classList.add('revealed');
      });
    }
  }

  /* ---------- 3. Scroll Reveal (IntersectionObserver) ---------- */
  function initScrollReveal() {
    var els = document.querySelectorAll('.sr');
    if (!els.length || !('IntersectionObserver' in window)) return;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    els.forEach(function (el) { obs.observe(el); });
  }

  /* ---------- 4. Staggered Card Reveal ---------- */
  function initCardStagger() {
    var grids = document.querySelectorAll('.cards-stagger');
    if (!grids.length || !('IntersectionObserver' in window)) return;
    grids.forEach(function (grid) {
      var cards = grid.querySelectorAll('.article-card');
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var idx = Array.prototype.indexOf.call(cards, entry.target);
            setTimeout(function () {
              entry.target.classList.add('visible');
            }, idx * 120);
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08 });
      cards.forEach(function (c) { obs.observe(c); });
    });
  }

  /* ---------- 5. Floating parallax blobs ---------- */
  function initParallax() {
    var floats = document.querySelectorAll('.float-el');
    if (!floats.length) return;
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(function () {
          var y = window.pageYOffset;
          floats.forEach(function (el, i) {
            var speed = 0.03 + i * 0.015;
            el.style.transform = 'translateY(' + (y * speed) + 'px)';
          });
          ticking = false;
        });
      }
    }, { passive: true });
  }

  /* ---------- 6. MutationObserver for dynamic cards ---------- */
  function watchGrid(id) {
    var grid = document.getElementById(id);
    if (!grid) return;
    var mo = new MutationObserver(function () {
      initCardStagger();
    });
    mo.observe(grid, { childList: true });
  }

  /* ---------- Boot ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    runLoader(function () {
      revealHero();
      initScrollReveal();
      initCardStagger();
      initParallax();
    });
    watchGrid('homeArticlesGrid');
  });
})();
