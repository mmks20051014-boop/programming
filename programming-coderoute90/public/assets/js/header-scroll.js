// Header scroll effect - stacking context safe version
(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        var header = document.querySelector('header');
        if (!header) return;

        var nav = document.getElementById('navLinks');
        var lastScrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
        var scrollTimeout;
        var ticking = false;
        var headerHeight = Math.max(header.offsetHeight || 0, 80);
        var computedPosition = window.getComputedStyle(header).position;
        var canHideWithTop = computedPosition === 'fixed' || computedPosition === 'sticky';
        var heroSection = document.querySelector('.hero');

        if (!header.dataset.scrollHeaderInit) {
            var existingTransition = window.getComputedStyle(header).transition;
            if (!existingTransition || existingTransition === 'all 0s ease 0s') {
                header.style.transition = 'top 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease';
            } else if (existingTransition.indexOf('top') === -1) {
                header.style.transition = existingTransition + ', top 0.3s ease';
            }
            header.style.willChange = 'top';
            header.dataset.scrollHeaderInit = 'true';
        }

        function isMenuOpen() {
            return !!(nav && nav.classList.contains('open'));
        }

        function showHeader() {
            if (canHideWithTop) {
                header.style.top = '0';
            }
            header.style.transform = '';
        }

        function hideHeader() {
            if (!canHideWithTop || isMenuOpen()) return;
            headerHeight = Math.max(header.offsetHeight || 0, headerHeight, 80);
            header.style.top = '-' + headerHeight + 'px';
        }

        function applyScrolledState(scrollTop) {
            if (scrollTop > 80) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        function handleScroll() {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;

            applyScrolledState(scrollTop);

            if (isMenuOpen()) {
                showHeader();
                lastScrollTop = scrollTop;
                return;
            }

            if (scrollTop > lastScrollTop && scrollTop > 200) {
                hideHeader();
            } else {
                showHeader();
            }

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(function () {
                showHeader();
            }, 300);
        }

        function requestTick() {
            if (ticking) return;
            window.requestAnimationFrame(function () {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }

        window.addEventListener('scroll', requestTick, { passive: true });
        window.addEventListener('resize', function () {
            headerHeight = Math.max(header.offsetHeight || 0, 80);
            showHeader();
        });

        if (heroSection) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        header.style.background = 'transparent';
                        header.style.backdropFilter = 'none';
                        header.style.boxShadow = 'none';
                    } else {
                        header.style.background = '';
                        header.style.backdropFilter = '';
                        header.style.boxShadow = '';
                        if ((window.pageYOffset || 0) > 80) {
                            header.classList.add('scrolled');
                        }
                    }
                });
            }, {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            });
            observer.observe(heroSection);
        }

        handleScroll();
        console.log('スクロール連動ヘッダー機能初期化完了（transform未使用版）');
    });
})();
