/* ===== Blog Dynamic Animations (Benesse-inspired) ===== */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* ---------- 1. Hero entrance ---------- */
    var hero = document.querySelector('.blog-hero-dynamic');
    if (hero) {
      requestAnimationFrame(function () {
        hero.classList.add('loaded');
      });
    }

    /* ---------- 2. Intersection Observer – scroll reveal ---------- */
    var revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length && 'IntersectionObserver' in window) {
      var revealObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach(function (el) { revealObs.observe(el); });
    }

    /* ---------- 3. Staggered card reveal ---------- */
    function staggerCards(gridEl) {
      if (!gridEl) return;
      var cards = gridEl.querySelectorAll('.article-card');
      if (!cards.length || !('IntersectionObserver' in window)) return;
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var idx = Array.prototype.indexOf.call(cards, entry.target);
            setTimeout(function () {
              entry.target.classList.add('card-visible');
            }, idx * 120);
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08 });
      cards.forEach(function (c) { obs.observe(c); });
    }

    /* Observe main + popular grids (may be populated later by fetch) */
    var mainGrid = document.getElementById('articlesGrid');
    var popGrid  = document.getElementById('popularGrid');

    /* MutationObserver to re-stagger after fetch populates grids */
    function watchGrid(gridEl) {
      if (!gridEl) return;
      var mo = new MutationObserver(function () { staggerCards(gridEl); });
      mo.observe(gridEl, { childList: true });
    }
    watchGrid(mainGrid);
    watchGrid(popGrid);

    /* ---------- 4. Counter animation ---------- */
    var counters = document.querySelectorAll('.count-up');
    if (counters.length && 'IntersectionObserver' in window) {
      var cObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var target = parseInt(el.getAttribute('data-target'), 10) || 0;
          var suffix = el.getAttribute('data-suffix') || '';
          var duration = 1600;
          var start = performance.now();
          function tick(now) {
            var progress = Math.min((now - start) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * target) + suffix;
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
          cObs.unobserve(el);
        });
      }, { threshold: 0.5 });
      counters.forEach(function (c) { cObs.observe(c); });
    }

    /* ---------- 5. Parallax on scroll ---------- */
    var parallaxEls = document.querySelectorAll('[data-parallax]');
    if (parallaxEls.length) {
      var ticking = false;
      window.addEventListener('scroll', function () {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(function () {
            var scrollY = window.pageYOffset;
            parallaxEls.forEach(function (el) {
              var speed = parseFloat(el.getAttribute('data-parallax')) || 0.3;
              var rect = el.getBoundingClientRect();
              var offset = (rect.top + scrollY - window.innerHeight / 2) * speed;
              el.style.transform = 'translateY(' + (-offset * 0.15) + 'px)';
            });
            ticking = false;
          });
        }
      }, { passive: true });
    }

  });
})();
