// Hero Particle Animation using tsParticles
(function () {
    'use strict';

    var particlesInstance = null;
    var resizeTimeout = null;
    var simpleParticlesAnimationId = null;
    var simpleParticles = null;
    var simpleCtx = null;
    var simpleCanvas = null;

    function getCanvas() {
        return document.getElementById('hero-canvas');
    }

    function stopSimpleParticles() {
        if (simpleParticlesAnimationId) {
            cancelAnimationFrame(simpleParticlesAnimationId);
            simpleParticlesAnimationId = null;
        }
        simpleParticles = null;
        simpleCtx = null;
        simpleCanvas = null;
    }

    function destroyParticles() {
        if (particlesInstance && typeof particlesInstance.destroy === 'function') {
            particlesInstance.destroy();
        }
        particlesInstance = null;
        stopSimpleParticles();
    }

    function initSimpleParticles() {
        var canvas = getCanvas();
        if (!canvas) return;

        stopSimpleParticles();
        canvas.style.pointerEvents = 'none';

        simpleCanvas = canvas;
        simpleCtx = canvas.getContext('2d');
        if (!simpleCtx) return;

        var dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
        simpleCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

        var particleCount = window.innerWidth < 768 ? 30 : 60;
        simpleParticles = [];

        function Particle() {
            this.x = Math.random() * window.innerWidth;
            this.y = Math.random() * window.innerHeight;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.3;
        }

        Particle.prototype.update = function () {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > window.innerWidth) this.vx = -this.vx;
            if (this.y < 0 || this.y > window.innerHeight) this.vy = -this.vy;
        };

        Particle.prototype.draw = function () {
            simpleCtx.beginPath();
            simpleCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            simpleCtx.fillStyle = 'rgba(100, 180, 255, ' + this.opacity + ')';
            simpleCtx.fill();
        };

        for (var i = 0; i < particleCount; i += 1) {
            simpleParticles.push(new Particle());
        }

        function animate() {
            if (!simpleCtx || !simpleCanvas || !simpleParticles) return;
            simpleCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            simpleParticles.forEach(function (particle) {
                particle.update();
                particle.draw();
            });
            simpleParticlesAnimationId = requestAnimationFrame(animate);
        }

        animate();
        console.log('シンプルパーティクルアニメーション開始');
    }

    function initHeroParticles() {
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            console.log('パーティクルアニメーション：簡略化モード');
            return;
        }

        var canvas = getCanvas();
        if (!canvas) return;
        canvas.style.pointerEvents = 'none';

        var dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';

        var particlesConfig = {
            particles: {
                number: {
                    value: window.innerWidth < 768 ? 60 : 120,
                    density: { enable: true, area: 800 }
                },
                color: { value: ['#64b4ff', '#8ab4d4', '#ffffff'] },
                shape: { type: 'circle' },
                opacity: {
                    value: 0.6,
                    random: true,
                    anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: { enable: true, speed: 2, size_min: 0.1, sync: false }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#64b4ff',
                    opacity: 0.3,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 0.3,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: { enable: false, rotateX: 600, rotateY: 1200 }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: false, mode: 'grab' },
                    onclick: { enable: false, mode: 'push' },
                    resize: true
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 0.5 } },
                    push: { particles_nb: 4 }
                }
            },
            retina_detect: true,
            fps_limit: 60,
            background: { color: 'transparent' }
        };

        stopSimpleParticles();

        if (typeof tsParticles !== 'undefined' && tsParticles && typeof tsParticles.load === 'function') {
            tsParticles.load('hero-canvas', particlesConfig).then(function (container) {
                particlesInstance = container;
                console.log('ヒーローパーティクルアニメーション開始');
            }).catch(function (error) {
                console.error('パーティクル初期化エラー:', error);
                initSimpleParticles();
            });
        } else {
            console.warn('tsParticlesライブラリが読み込まれていません。フォールバックへ切り替えます');
            initSimpleParticles();
        }
    }

    function handleResize() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function () {
            destroyParticles();
            initHeroParticles();
        }, 250);
    }

    document.addEventListener('DOMContentLoaded', function () {
        setTimeout(function () {
            initHeroParticles();
        }, 100);
        window.addEventListener('resize', handleResize);
    });

    document.addEventListener('visibilitychange', function () {
        if (!document.hidden && getCanvas()) {
            handleResize();
        }
    });

    window.addEventListener('beforeunload', function () {
        destroyParticles();
    });
})();
