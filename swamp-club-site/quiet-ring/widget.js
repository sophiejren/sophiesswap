/*
  Quiet Web Ring — widget v1.0.0
  ────────────────────────────────
  Embed on your site:

    <script src="https://sophieren.com/quiet-ring/widget.js"
            data-site="https://your-site.com"></script>

  The widget will fetch the ring's member list, locate your site,
  and render ← prev · ⚝ random · next → wherever the script tag lives.

  Override style via CSS variables on .quiet-ring :
    --qr-bg, --qr-fg, --qr-accent, --qr-muted, --qr-border, --qr-radius

  Source:  https://sophieren.com/quiet-ring/
  License: MIT  ·  Author: Sophie
*/
(function () {
  'use strict';

  // The script tag that loaded this file
  const SCRIPTS = document.getElementsByTagName('script');
  const SELF = SCRIPTS[SCRIPTS.length - 1];

  // Where to fetch the ring data
  const RING_URL = (SELF && SELF.dataset && SELF.dataset.ring)
    || 'https://sophieren.com/quiet-ring/ring.json';
  const MY_URL = SELF && SELF.dataset && SELF.dataset.site;

  // ────── style ──────
  const STYLE_ID = 'quiet-ring-style';
  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const s = document.createElement('style');
    s.id = STYLE_ID;
    s.textContent = `
      .quiet-ring {
        --qr-bg: rgba(15,46,34,.4);
        --qr-fg: #f3eedd;
        --qr-accent: #52ffe0;
        --qr-muted: #86a596;
        --qr-border: rgba(243,238,221,.15);
        --qr-radius: 12px;
        font-family: 'Space Grotesk', system-ui, -apple-system, sans-serif;
        background: var(--qr-bg);
        color: var(--qr-fg);
        border: 1px solid var(--qr-border);
        border-radius: var(--qr-radius);
        padding: 14px 18px;
        max-width: 640px;
        margin: 24px auto;
        font-size: 14px;
        line-height: 1.5;
      }
      .quiet-ring__head {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 11px;
        letter-spacing: 1.5px;
        color: var(--qr-muted);
        text-transform: uppercase;
        margin-bottom: 8px;
        font-family: 'Bungee', sans-serif;
      }
      .quiet-ring__head a { color: var(--qr-accent); text-decoration: none; }
      .quiet-ring__head a:hover { text-decoration: underline; }
      .quiet-ring__row {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        gap: 10px;
        align-items: center;
      }
      .quiet-ring__btn {
        display: block;
        padding: 8px 10px;
        border: 1px solid var(--qr-border);
        border-radius: 8px;
        color: var(--qr-fg);
        text-decoration: none;
        font-size: 13px;
        transition: background .15s, border-color .15s;
        background: transparent;
        cursor: pointer;
        font-family: inherit;
      }
      .quiet-ring__btn:hover { background: rgba(82,255,224,.06); border-color: var(--qr-accent); color: var(--qr-fg); }
      .quiet-ring__btn .qr-label { display: block; font-size: 10px; color: var(--qr-muted); letter-spacing: 1px; font-family: 'Bungee', sans-serif; margin-bottom: 2px; }
      .quiet-ring__btn--prev { text-align: left; }
      .quiet-ring__btn--next { text-align: right; }
      .quiet-ring__rand {
        display: inline-flex; align-items: center; justify-content: center;
        width: 42px; height: 42px; border-radius: 50%;
        border: 1px solid var(--qr-border); color: var(--qr-accent);
        font-size: 18px; cursor: pointer; background: transparent;
      }
      .quiet-ring__rand:hover { background: rgba(82,255,224,.08); border-color: var(--qr-accent); }
      .quiet-ring__err {
        color: var(--qr-muted); font-size: 12px; text-align: center;
      }
      @media (max-width: 480px) {
        .quiet-ring__row { grid-template-columns: 1fr; }
        .quiet-ring__btn--next { text-align: left; }
        .quiet-ring__rand { width: auto; height: auto; border-radius: 8px; padding: 8px; }
      }
    `;
    (document.head || document.documentElement).appendChild(s);
  }

  // ────── helpers ──────
  function normalize(url) {
    if (!url) return '';
    return String(url).trim().replace(/\/+$/, '').toLowerCase();
  }

  function findIndex(sites, target) {
    const t = normalize(target);
    for (let i = 0; i < sites.length; i++) {
      if (normalize(sites[i].url) === t) return i;
    }
    // also try matching by host only (for sites with paths)
    try {
      const tHost = new URL(target).hostname.toLowerCase();
      for (let i = 0; i < sites.length; i++) {
        try {
          if (new URL(sites[i].url).hostname.toLowerCase() === tHost) return i;
        } catch (e) {}
      }
    } catch (e) {}
    return -1;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  function btn(extraClass, label, site) {
    return `
      <a class="quiet-ring__btn quiet-ring__btn--${extraClass}" href="${escapeHtml(site.url)}">
        <span class="qr-label">${extraClass === 'prev' ? '← TOOK ME HERE' : 'TAKE ME ON →'}</span>
        ${escapeHtml(site.name)}
      </a>
    `;
  }

  // ────── render ──────
  function render(container, sites, idx) {
    const len = sites.length;
    const prev = sites[(idx - 1 + len) % len];
    const next = sites[(idx + 1) % len];

    container.innerHTML = `
      <div class="quiet-ring__head">
        <span>◊ Quiet Web Ring</span>
        <span style="margin-left:auto;color:var(--qr-muted);">
          <a href="${escapeHtml(RING_URL.replace(/ring\.json$/, ''))}" target="_blank" rel="noopener">${len} members</a>
        </span>
      </div>
      <div class="quiet-ring__row">
        ${btn('prev', 'prev', prev)}
        <button class="quiet-ring__rand" type="button" title="Random member">⚝</button>
        ${btn('next', 'next', next)}
      </div>
    `;
    container.querySelector('.quiet-ring__rand').addEventListener('click', () => {
      let r;
      do { r = Math.floor(Math.random() * len); } while (len > 1 && r === idx);
      window.location.href = sites[r].url;
    });
  }

  function renderError(container, msg) {
    container.innerHTML = `
      <div class="quiet-ring__head">◊ Quiet Web Ring</div>
      <p class="quiet-ring__err">${escapeHtml(msg)} <a href="${escapeHtml(RING_URL.replace(/ring\.json$/, ''))}" style="color:var(--qr-accent);">Visit the ring →</a></p>
    `;
  }

  // ────── boot ──────
  function boot() {
    injectStyle();
    const container = document.createElement('div');
    container.className = 'quiet-ring';
    SELF.parentNode.insertBefore(container, SELF.nextSibling);

    if (!MY_URL) {
      renderError(container, 'No data-site attribute on the script tag.');
      return;
    }

    fetch(RING_URL, { cache: 'no-cache' })
      .then(r => r.json())
      .then(ring => {
        const sites = (ring && ring.sites) || [];
        if (sites.length === 0) {
          renderError(container, 'Ring is empty.');
          return;
        }
        const idx = findIndex(sites, MY_URL);
        if (idx < 0) {
          renderError(container, "This site isn't a member yet.");
          return;
        }
        render(container, sites, idx);
      })
      .catch(() => {
        renderError(container, 'Could not load the ring.');
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
