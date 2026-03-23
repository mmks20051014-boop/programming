// Site core helpers
(function () {
    'use strict';

    var navState = {
        nav: null,
        placeholder: null,
        originalParent: null,
        originalNextSibling: null
    };

    function getNavElements() {
        if (!navState.nav) {
            navState.nav = document.getElementById('navLinks');
        }
        var nav = navState.nav;
        var btn = document.getElementById('hamburgerBtn');
        var overlay = document.getElementById('navOverlay');
        return { nav: nav, btn: btn, overlay: overlay };
    }

    function ensurePlaceholder(nav) {
        if (!nav || navState.placeholder) return;
        navState.originalParent = nav.parentNode;
        navState.originalNextSibling = nav.nextSibling;
        navState.placeholder = document.createComment('navLinks-placeholder');
        nav.parentNode.insertBefore(navState.placeholder, nav);
    }

    function moveNavToBody() {
        var elements = getNavElements();
        var nav = elements.nav;
        if (!nav) return;

        ensurePlaceholder(nav);

        if (nav.parentNode !== document.body) {
            document.body.appendChild(nav);
        }

        nav.dataset.navPortal = 'body';
        nav.style.zIndex = '10000';
    }

    function restoreNavToHeader() {
        var elements = getNavElements();
        var nav = elements.nav;
        if (!nav || nav.parentNode !== document.body) return;

        if (navState.placeholder && navState.placeholder.parentNode) {
            navState.placeholder.parentNode.insertBefore(nav, navState.placeholder);
            navState.placeholder.parentNode.removeChild(navState.placeholder);
        } else if (navState.originalParent) {
            if (navState.originalNextSibling && navState.originalNextSibling.parentNode === navState.originalParent) {
                navState.originalParent.insertBefore(nav, navState.originalNextSibling);
            } else {
                navState.originalParent.appendChild(nav);
            }
        }

        navState.placeholder = null;
        nav.dataset.navPortal = 'header';
        nav.style.zIndex = '';
    }

    function relocateMobileNav() {
        var elements = getNavElements();
        if (!elements.nav) return;

        if (window.innerWidth <= 768) {
            moveNavToBody();
        } else {
            restoreNavToHeader();
            if (elements.overlay) {
                elements.overlay.classList.remove('active');
                elements.overlay.style.display = 'none';
            }
            document.body.style.overflow = '';
        }
    }

    window.__relocateMobileNav = relocateMobileNav;

    document.addEventListener('DOMContentLoaded', function () {
        relocateMobileNav();
    });

    window.addEventListener('resize', function () {
        relocateMobileNav();
    });
})();

/**
 * microCMSのカスタム要素（ブログカード）をリッチなUIに変換する関数
 */
async function applyBlogCards() {
    // 1. カスタム要素（IDが表示されている場所）を探す
    // microCMSのリッチエディタ出力では通常 [data-custom-id="blog-card"] のような属性がつきます
    const customElements = document.querySelectorAll('[data-custom-id="blog-card"]');

    for (const el of customElements) {
        // フィールドID「contentId」に保存された記事IDを取得
        const contentId = el.getAttribute('data-contentid');
        
        if (!contentId) continue;

        try {
            // 2. Cloudflare Workers経由で該当記事のデータを取得
            // ※URLはご自身のWorkerのURLに書き換えてください
            const response = await fetch(`https://programming.coderoute90.workers.dev/posts/${contentId}`);
            const post = await response.json();

            // 3. カードのHTMLを組み立てる
            const cardHtml = `
                <a href="post.html?id=${post.id}" class="custom-blog-card">
                    <div class="card-thumb">
                        <img src="${post.thumbnail?.url}" alt="${post.title}">
                    </div>
                    <div class="card-content">
                        <div class="card-title">${post.title}</div>
                        <div class="card-excerpt">${post.excerpt || '関連記事を読む'}</div>
                    </div>
                </a>
            `;

            // 4. 元の素っ気ないID表示を、カードに置き換える
            el.outerHTML = cardHtml;

        } catch (error) {
            console.error("ブログカードの取得に失敗しました:", error);
        }
    }
}

// 記事の読み込みが終わったタイミングで実行する
// 既存のDOMContentLoaded内に追記するか、単独で呼び出します
document.addEventListener('DOMContentLoaded', function() {
    // 記事データを描画した後に呼び出す必要があります
    // もし別の関数で記事を表示しているなら、その直後で applyBlogCards() を実行してください
    applyBlogCards(); 
});