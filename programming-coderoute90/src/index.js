const API_BASE  = 'https://coderoute90-api.coderoute90.workers.dev';
const SITE_URL  = 'https://programming.coderoute90.workers.dev';
const SITE_NAME = 'CodeRoute 90';

const DEFAULT_META = {
  title:       '記事詳細 - CodeRoute 90',
  description: 'CodeRoute 90 - 40歳・文系から90日でエンジニア転職した運営者が、最短ルートを事実ベースで公開するメディア。',
  image:       SITE_URL + '/assets/images/ogp.png',
};

function stripHtml(html) {
  return (html ?? '').replace(/<[^>]*>/g, ' ').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim();
}

function escapeHtml(str) {
  return String(str ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

async function fetchArticle(id) {
  const res = await fetch(API_BASE + '/' + encodeURIComponent(id));
  if (!res.ok) {
    return null;
  }
  const data = await res.json();

  if (data && data.id) {
    return data;
  }

  if (data && Array.isArray(data.contents)) {
    return data.contents.find(function(item) {
      return item && item.id === id;
    }) || null;
  }

  return null;
}

class TitleRewriter {
  constructor(title) { this.title = title; }
  element(el) { el.setInnerContent(this.title); }
}

class ExistingMetaRemover {
  element(el) {
    const prop = el.getAttribute('property') ?? '';
    const name = el.getAttribute('name') ?? '';
    if (prop.startsWith('og:') || name.startsWith('twitter:') || name === 'description') el.remove();
  }
}

class CanonicalRewriter {
  constructor(url) { this.url = url; }
  element(el) { if (el.getAttribute('rel') === 'canonical') el.setAttribute('href', this.url); }
}

class OgpInjector {
  constructor(meta, url) { this.meta = meta; this.url = url; this._done = false; }
  element(el) {
    if (this._done) return;
    this._done = true;
    const m = this.meta;
    const u = this.url;
    el.append(
      '\n<meta name="description" content="' + escapeHtml(m.description) + '">' +
      '\n<meta property="og:title" content="' + escapeHtml(m.title) + '">' +
      '\n<meta property="og:description" content="' + escapeHtml(m.description) + '">' +
      '\n<meta property="og:image" content="' + escapeHtml(m.image) + '">' +
      '\n<meta property="og:url" content="' + escapeHtml(u) + '">' +
      '\n<meta property="og:type" content="article">' +
      '\n<meta property="og:site_name" content="' + escapeHtml(SITE_NAME) + '">' +
      '\n<meta property="og:locale" content="ja_JP">' +
      '\n<meta name="twitter:card" content="summary_large_image">' +
      '\n<meta name="twitter:title" content="' + escapeHtml(m.title) + '">' +
      '\n<meta name="twitter:description" content="' + escapeHtml(m.description) + '">' +
      '\n<meta name="twitter:image" content="' + escapeHtml(m.image) + '">',
      { html: true }
    );
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/post') {
      const id = url.searchParams.get('id');
      if (!id) return env.ASSETS.fetch(request);

      const assetResponse = await env.ASSETS.fetch(
        new Request(SITE_URL + '/post.html')
      );
      if (!assetResponse.ok) return assetResponse;

      const article = await fetchArticle(id);
      const meta = article
        ? {
            title: article.title + ' - ' + SITE_NAME,
            description: stripHtml(article.content).slice(0, 120),
            image: (article.eyecatch && article.eyecatch.url) ? article.eyecatch.url : DEFAULT_META.image,
          }
        : DEFAULT_META;

      const canonicalUrl = SITE_URL + '/post?id=' + encodeURIComponent(id);

      return new HTMLRewriter()
        .on('title', new TitleRewriter(meta.title))
        .on('meta', new ExistingMetaRemover())
        .on('link[rel="canonical"]', new CanonicalRewriter(canonicalUrl))
        .on('head', new OgpInjector(meta, canonicalUrl))
        .transform(assetResponse);
    }

    return env.ASSETS.fetch(request);
  },
};
