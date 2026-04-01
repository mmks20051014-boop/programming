/**
 * CodeRoute 90 - Ranking Page Animations (Benesse Digital Inspired)
 * Using GSAP & ScrollTrigger
 */

document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    // Initial States
    gsap.set('.sr', { opacity: 0, y: 30 });
    
    initPreloader();
    initCustomCursor();
    initScrollAnimations();
    initTabGlitch();
    initButtonEffects();
    initParallaxBackground();
});

/**
 * 1. Terminal-style Preloader
 */
function initPreloader() {
    const loader = document.getElementById('tech-loader');
    const progressBar = document.querySelector('.loader-progress');
    const percentText = document.querySelector('.loader-perc');
    const loaderContent = document.querySelector('.loader-content');

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        progressBar.style.width = `${progress}%`;
        percentText.innerText = `${Math.floor(progress)}%`;

        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                const tl = gsap.timeline();
                tl.to(loaderContent, { opacity: 0, y: -20, duration: 0.5 })
                  .to(loader, { 
                      clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)', 
                      duration: 0.8, 
                      ease: 'power4.inOut' 
                  })
                  .set(loader, { display: 'none' })
                  .from('.ranking-hero h1', { y: 50, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.3')
                  .from('.ranking-hero .hero-desc', { y: 20, opacity: 0, duration: 0.8 }, '-=0.6');
            }, 500);
        }
    }, 150);
}

/**
 * 2. Custom Cyber Cursor
 */
function initCustomCursor() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = document.getElementById('cyber-cursor');
    const dot = cursor.querySelector('.cursor-dot');
    const ring = cursor.querySelector('.cursor-ring');

    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth follow logic
    gsap.ticker.add(() => {
        dotX += (mouseX - dotX) * 0.2;
        dotY += (mouseY - dotY) * 0.2;
        ringX += (mouseX - ringX) * 0.1;
        ringY += (mouseY - ringY) * 0.1;

        gsap.set(dot, { x: dotX, y: dotY });
        gsap.set(ring, { x: ringX, y: ringY });
    });

    // Hover states
    const interactables = document.querySelectorAll('a, button, .cat-tab, .compare-table tr');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            gsap.to(ring, { scale: 1.5, borderColor: 'rgba(0, 212, 255, 1)', duration: 0.3 });
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            gsap.to(ring, { scale: 1, borderColor: 'rgba(0, 212, 255, 0.4)', duration: 0.3 });
        });
    });
}

/**
 * 3. GSAP ScrollTrigger Reveal (Clip-path style)
 */
function initScrollAnimations() {
    const reveals = document.querySelectorAll('.sr');
    
    reveals.forEach((el) => {
        gsap.fromTo(el, 
            { 
                opacity: 0, 
                y: 50,
                clipPath: 'inset(0% 100% 0% 0%)' 
            },
            {
                opacity: 1,
                y: 0,
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
}

/**
 * 4. Tab Transition Glitch
 */
function initTabGlitch() {
    const tabs = document.querySelectorAll('.cat-tab');
    const main = document.querySelector('.ranking-main');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            main.classList.add('is-glitching');
            
            // Random RGB shift animation
            gsap.to(main, {
                skewX: () => (Math.random() - 0.5) * 2,
                x: () => (Math.random() - 0.5) * 10,
                duration: 0.1,
                repeat: 3,
                yoyo: true,
                onComplete: () => {
                    gsap.set(main, { skewX: 0, x: 0 });
                    main.classList.remove('is-glitching');
                    ScrollTrigger.refresh();
                }
            });
        });
    });
}

/**
 * 5. Button Micro-interactions (Magnetic & Scanline)
 */
function initButtonEffects() {
    const buttons = document.querySelectorAll('.main-cta-btn, .table-cta');
    
    buttons.forEach(btn => {
        btn.classList.add('scanline-btn');
        
        // Magnetic Effect
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });
}

/**
 * 6. Parallax Background & Grid
 */
function initParallaxBackground() {
    // Parallax on Hero
    gsap.to('.ranking-hero', {
        backgroundPositionY: '30%',
        ease: 'none',
        scrollTrigger: {
            trigger: '.ranking-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    // Floating particles or subtle elements could be added here
}
