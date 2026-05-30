/*
  Swamp Icons v1.0.0
  ───────────────────
  30 hand-drawn-feel SVG icons.
  24x24 viewBox · 1.6 stroke · currentColor · round caps.
  Self-contained inline SVGs — no font, no sprite required.

  Source:  https://sophieren.com/swamp-icons/
  Repo:    https://github.com/sophiejren/sophiesswap
  Author:  Sophie
  License: MIT

  Usage:
    <script src="https://sophieren.com/swamp-icons/swamp-icons.js"></script>
    <span data-swamp-icon="frog"></span>
    <span data-swamp-icon="heron" style="color: #b6ff5b; width: 32px;"></span>

  Or programmatically:
    document.getElementById('x').innerHTML = swampIcons.svg('frog');
    swampIcons.names();   // ['frog','heron','dragonfly',...]
    swampIcons.render();  // re-scan DOM for [data-swamp-icon]
*/
(function (root) {
  'use strict';

  // Default stroke wrapper — most icons share this opening tag
  function S(inner) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" '
      + 'stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'
      + inner + '</svg>';
  }

  const ICONS = {
    // ───── animals ─────
    frog: S(
      '<ellipse cx="12" cy="15" rx="7" ry="5" fill="currentColor" fill-opacity=".15"/>'
      + '<path d="M5 15 q0 5 7 5 q7 0 7 -5"/>'
      + '<circle cx="8.5" cy="10" r="2.5"/><circle cx="15.5" cy="10" r="2.5"/>'
      + '<circle cx="8.5" cy="10" r=".8" fill="currentColor" stroke="none"/>'
      + '<circle cx="15.5" cy="10" r=".8" fill="currentColor" stroke="none"/>'
      + '<path d="M9 17 q3 2 6 0"/>'
    ),
    heron: S(
      '<path d="M12 21 L12 13"/>'
      + '<path d="M12 13 Q9 9 12 5"/>'
      + '<circle cx="12" cy="4" r="1.3" fill="currentColor"/>'
      + '<path d="M13 3.5 L17 3"/>'
      + '<path d="M12 13 q3 -1 5 2"/>'
      + '<path d="M12 13 q-3 -1 -5 2"/>'
      + '<path d="M10 21 L14 21"/>'
      + '<path d="M11 21 L10 23"/><path d="M13 21 L14 23"/>'
    ),
    dragonfly: S(
      '<line x1="12" y1="4" x2="12" y2="20"/>'
      + '<ellipse cx="7" cy="9" rx="4" ry="1.8" transform="rotate(-18 7 9)"/>'
      + '<ellipse cx="17" cy="9" rx="4" ry="1.8" transform="rotate(18 17 9)"/>'
      + '<ellipse cx="7" cy="14" rx="3.5" ry="1.5" transform="rotate(15 7 14)"/>'
      + '<ellipse cx="17" cy="14" rx="3.5" ry="1.5" transform="rotate(-15 17 14)"/>'
      + '<circle cx="12" cy="4" r="1.2" fill="currentColor"/>'
    ),
    snake: S(
      '<path d="M4 19 q4 -3 3 -7 q-1 -4 4 -4 q5 0 5 4 q0 4 4 4"/>'
      + '<path d="M20 16 q2 0 2 -2"/>'
      + '<circle cx="20" cy="16" r=".6" fill="currentColor" stroke="none"/>'
    ),
    fish: S(
      '<path d="M3 12 q3 -4 9 -4 q5 0 8 4 q-3 4 -8 4 q-6 0 -9 -4 Z"/>'
      + '<path d="M20 12 L23 9 L23 15 Z"/>'
      + '<circle cx="14" cy="11" r=".7" fill="currentColor" stroke="none"/>'
      + '<path d="M7 12 q1 -1 2 0"/>'
    ),
    firefly: S(
      '<circle cx="12" cy="13" r="2.5" fill="currentColor" fill-opacity=".5"/>'
      + '<circle cx="12" cy="13" r="1.2" fill="currentColor" stroke="none"/>'
      + '<path d="M12 13 L8 7"/><path d="M12 13 L16 7"/>'
      + '<circle cx="8" cy="7" r=".8" fill="currentColor" fill-opacity=".5"/>'
      + '<circle cx="16" cy="7" r=".8" fill="currentColor" fill-opacity=".5"/>'
      + '<path d="M5 5 L7 4"/><path d="M19 5 L17 4"/>'
    ),
    cat: S(
      '<ellipse cx="12" cy="15" rx="6" ry="5"/>'
      + '<path d="M7 11 L6 7 L9 9 Z" fill="currentColor"/>'
      + '<path d="M17 11 L18 7 L15 9 Z" fill="currentColor"/>'
      + '<circle cx="10" cy="14" r=".8" fill="currentColor" stroke="none"/>'
      + '<circle cx="14" cy="14" r=".8" fill="currentColor" stroke="none"/>'
      + '<path d="M11 17 q1 1 2 0"/>'
      + '<path d="M9 17 L7 17"/><path d="M9 18 L7 18.5"/>'
      + '<path d="M15 17 L17 17"/><path d="M15 18 L17 18.5"/>'
    ),
    owl: S(
      '<ellipse cx="12" cy="13" rx="6" ry="6"/>'
      + '<circle cx="9.5" cy="11.5" r="2"/><circle cx="14.5" cy="11.5" r="2"/>'
      + '<circle cx="9.5" cy="11.5" r=".7" fill="currentColor" stroke="none"/>'
      + '<circle cx="14.5" cy="11.5" r=".7" fill="currentColor" stroke="none"/>'
      + '<path d="M11 14 L12 15.5 L13 14 Z" fill="currentColor"/>'
      + '<path d="M7 8 L9 6.5"/><path d="M17 8 L15 6.5"/>'
      + '<path d="M9 19 L9 21"/><path d="M15 19 L15 21"/>'
    ),
    mosquito: S(
      '<ellipse cx="12" cy="14" rx="3" ry="1.5"/>'
      + '<ellipse cx="8" cy="10" rx="3" ry="1.2" transform="rotate(-20 8 10)"/>'
      + '<ellipse cx="16" cy="10" rx="3" ry="1.2" transform="rotate(20 16 10)"/>'
      + '<circle cx="17" cy="14" r="1"/>'
      + '<path d="M18 14 L22 12"/>'
      + '<path d="M11 16 L11 19"/><path d="M9 16 L7 19"/><path d="M13 16 L15 19"/>'
    ),

    // ───── plants ─────
    lily: S(
      '<path d="M12 19 q-5 -3 -6 -8 q3 -1 5 3 q1 -5 1 -8 q0 3 1 8 q2 -4 5 -3 q-1 5 -6 8 Z"/>'
      + '<circle cx="12" cy="13" r="1" fill="currentColor"/>'
      + '<path d="M3 21 q9 -2 18 0"/>'
    ),
    reed: S(
      '<path d="M6 22 Q5 14 7 5"/>'
      + '<ellipse cx="7" cy="4" rx="1.2" ry="2.5"/>'
      + '<path d="M12 22 Q11 13 13 3"/>'
      + '<ellipse cx="13" cy="2" rx="1.2" ry="2.5"/>'
      + '<path d="M18 22 Q17 15 19 6"/>'
      + '<ellipse cx="19" cy="5" rx="1.2" ry="2.5"/>'
    ),
    moss: S(
      '<path d="M3 20 q1 -5 3 -6 q-2 -2 -1 -5 q2 1 3 -1 q1 2 3 0 q1 2 3 -1 q2 1 3 1 q-1 3 -2 5 q2 1 3 7 Z"'
      + ' fill="currentColor" fill-opacity=".15"/>'
      + '<circle cx="8" cy="14" r=".8" fill="currentColor" stroke="none"/>'
      + '<circle cx="12" cy="11" r=".8" fill="currentColor" stroke="none"/>'
      + '<circle cx="16" cy="14" r=".8" fill="currentColor" stroke="none"/>'
    ),
    mushroom: S(
      '<path d="M4 12 q0 -7 8 -7 q8 0 8 7 Z" fill="currentColor" fill-opacity=".15"/>'
      + '<circle cx="9" cy="9" r=".9" fill="currentColor" stroke="none"/>'
      + '<circle cx="14" cy="11" r=".9" fill="currentColor" stroke="none"/>'
      + '<path d="M9 12 L9 19 q0 2 3 2 q3 0 3 -2 L15 12"/>'
    ),
    stump: S(
      '<path d="M5 20 L6 12 q0 -3 6 -3 q6 0 6 3 L19 20 Z" fill="currentColor" fill-opacity=".15"/>'
      + '<ellipse cx="12" cy="9" rx="6" ry="1.5"/>'
      + '<ellipse cx="12" cy="9" rx="4" ry="1"/>'
      + '<ellipse cx="12" cy="9" rx="2" ry=".5"/>'
      + '<path d="M9 6 q-1 -2 -3 -2"/>'
    ),
    leaf: S(
      '<path d="M4 20 q0 -10 9 -15 q4 -2 7 -1 q1 3 -1 7 q-5 9 -15 9 Z"/>'
      + '<path d="M5 19 q5 -6 12 -10"/>'
    ),

    // ───── elements ─────
    drop: S(
      '<path d="M12 3 q-6 7 -6 12 q0 4 6 4 q6 0 6 -4 q0 -5 -6 -12 Z" fill="currentColor" fill-opacity=".12"/>'
      + '<path d="M9 16 q0 2 2 2.5"/>'
    ),
    ripple: S(
      '<circle cx="12" cy="13" r="2"/>'
      + '<ellipse cx="12" cy="13" rx="5" ry="3.5" opacity=".7"/>'
      + '<ellipse cx="12" cy="13" rx="9" ry="6" opacity=".4"/>'
      + '<path d="M3 20 q9 -1 18 0" opacity=".5"/>'
    ),
    fog: S(
      '<path d="M3 8 q3 -2 6 0 q3 -2 6 0 q3 -2 6 0"/>'
      + '<path d="M3 13 q3 -2 6 0 q3 -2 6 0 q3 -2 6 0"/>'
      + '<path d="M3 18 q3 -2 6 0 q3 -2 6 0 q3 -2 6 0"/>'
    ),
    lantern: S(
      '<circle cx="12" cy="13" r="6" fill="currentColor" fill-opacity=".15"/>'
      + '<circle cx="12" cy="13" r="3"/>'
      + '<circle cx="12" cy="13" r="1.3" fill="currentColor" stroke="none"/>'
      + '<path d="M5 6 L7 9"/><path d="M19 6 L17 9"/>'
      + '<path d="M5 20 L7 17"/><path d="M19 20 L17 17"/>'
    ),
    moon: S(
      '<path d="M16 4 q-9 0 -9 9 q0 9 9 9 q-6 -3 -6 -9 q0 -6 6 -9 Z" fill="currentColor" fill-opacity=".25"/>'
      + '<circle cx="5" cy="5" r=".8" fill="currentColor" stroke="none"/>'
      + '<circle cx="20" cy="18" r=".8" fill="currentColor" stroke="none"/>'
    ),
    star: S(
      '<path d="M12 3 L14 9 L21 9 L15.5 13 L17.5 20 L12 16 L6.5 20 L8.5 13 L3 9 L10 9 Z" fill="currentColor" fill-opacity=".15"/>'
    ),
    flame: S(
      '<path d="M12 21 q-6 0 -6 -6 q0 -4 3 -7 q1 3 3 3 q0 -5 4 -8 q-1 5 2 8 q2 2 2 5 q0 5 -8 5 Z"'
      + ' fill="currentColor" fill-opacity=".15"/>'
      + '<path d="M11 17 q-1 -2 1 -3"/>'
    ),

    // ───── objects ─────
    jar: S(
      '<ellipse cx="12" cy="6" rx="5" ry="1.5"/>'
      + '<path d="M7 6 L7 18 q0 2 5 2 q5 0 5 -2 L17 6"/>'
      + '<circle cx="11" cy="13" r=".7" fill="currentColor"/>'
      + '<circle cx="14" cy="15" r=".7" fill="currentColor"/>'
    ),
    bottle: S(
      '<path d="M10 3 L14 3 L14 6 L15 8 L15 19 q0 2 -3 2 q-3 0 -3 -2 L9 8 L10 6 Z"/>'
      + '<path d="M11 3 L11 6"/><path d="M13 3 L13 6"/>'
      + '<path d="M9.5 14 q3 -1 5 0"/>'
    ),
    key: S(
      '<circle cx="8" cy="11" r="4"/>'
      + '<path d="M12 11 L21 11"/>'
      + '<path d="M18 11 L18 14"/>'
      + '<path d="M21 11 L21 15"/>'
      + '<circle cx="8" cy="11" r="1" fill="currentColor" stroke="none"/>'
    ),
    coin: S(
      '<circle cx="12" cy="12" r="8"/>'
      + '<circle cx="12" cy="12" r="5" stroke-dasharray="1 2"/>'
      + '<path d="M10 9 L10 15"/>'
      + '<path d="M14 9 L14 15"/>'
      + '<path d="M10 12 L14 12"/>'
    ),
    book: S(
      '<path d="M4 5 q3 -1 8 0 q5 -1 8 0 L20 19 q-3 -1 -8 0 q-5 -1 -8 0 Z"/>'
      + '<path d="M12 5 L12 19"/>'
    ),
    lure: S(
      '<path d="M3 4 L12 13"/>'
      + '<circle cx="12" cy="13" r="3"/>'
      + '<circle cx="11" cy="12" r=".6" fill="currentColor" stroke="none"/>'
      + '<path d="M14 15 q3 0 4 3 q-3 1 -4 -1"/>'
      + '<path d="M13 16 L14 20"/>'
    ),

    // ───── UI ─────
    eye: S(
      '<path d="M2 12 q4 -7 10 -7 q6 0 10 7 q-4 7 -10 7 q-6 0 -10 -7 Z"/>'
      + '<circle cx="12" cy="12" r="3"/>'
      + '<circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/>'
    ),
    arrow: S(
      '<path d="M4 12 L20 12"/>'
      + '<path d="M14 6 L20 12 L14 18"/>'
    ),
    heart: S(
      '<path d="M12 20 Q3 13 3 8 Q3 4 7 4 Q10 4 12 7 Q14 4 17 4 Q21 4 21 8 Q21 13 12 20 Z" fill="currentColor" fill-opacity=".15"/>'
    )
  };

  // metadata — used by the landing page for search / categorization
  const META = {
    frog: { cat: 'animals', tags: ['frog','swamp','amphibian'] },
    heron: { cat: 'animals', tags: ['heron','bird','patience'] },
    dragonfly: { cat: 'animals', tags: ['dragonfly','insect','wings'] },
    snake: { cat: 'animals', tags: ['snake','serpent','reptile'] },
    fish: { cat: 'animals', tags: ['fish','water'] },
    firefly: { cat: 'animals', tags: ['firefly','light','insect'] },
    cat: { cat: 'animals', tags: ['cat','feline','pet'] },
    owl: { cat: 'animals', tags: ['owl','bird','night'] },
    mosquito: { cat: 'animals', tags: ['mosquito','bug','insect'] },
    lily: { cat: 'plants', tags: ['lily','pad','flower','water'] },
    reed: { cat: 'plants', tags: ['reed','grass','tall'] },
    moss: { cat: 'plants', tags: ['moss','growth','green'] },
    mushroom: { cat: 'plants', tags: ['mushroom','fungi'] },
    stump: { cat: 'plants', tags: ['stump','tree','rings'] },
    leaf: { cat: 'plants', tags: ['leaf','frond'] },
    drop: { cat: 'elements', tags: ['drop','water','rain'] },
    ripple: { cat: 'elements', tags: ['ripple','pond','water'] },
    fog: { cat: 'elements', tags: ['fog','mist','clouds'] },
    lantern: { cat: 'elements', tags: ['lantern','light','glow'] },
    moon: { cat: 'elements', tags: ['moon','night','crescent'] },
    star: { cat: 'elements', tags: ['star','sparkle'] },
    flame: { cat: 'elements', tags: ['flame','fire'] },
    jar: { cat: 'objects', tags: ['jar','firefly','container'] },
    bottle: { cat: 'objects', tags: ['bottle','message','glass'] },
    key: { cat: 'objects', tags: ['key','unlock'] },
    coin: { cat: 'objects', tags: ['coin','fortune','money'] },
    book: { cat: 'objects', tags: ['book','read','open'] },
    lure: { cat: 'objects', tags: ['lure','fishing','hook'] },
    eye: { cat: 'ui', tags: ['eye','see','view'] },
    arrow: { cat: 'ui', tags: ['arrow','right','next'] },
    heart: { cat: 'ui', tags: ['heart','love','favorite'] }
  };

  // ─────── public API ───────
  function svg(name) { return ICONS[name] || ''; }
  function has(name) { return !!ICONS[name]; }
  function names() { return Object.keys(ICONS); }
  function meta(name) { return META[name] || null; }
  function all() { return Object.assign({}, ICONS); }

  // Auto-render: replace any [data-swamp-icon="name"] element with the SVG.
  // Called once on DOMContentLoaded. Call again after dynamic content changes.
  function render(rootEl) {
    const r = rootEl || document;
    r.querySelectorAll('[data-swamp-icon]').forEach(el => {
      const name = el.getAttribute('data-swamp-icon');
      if (!has(name)) return;
      el.innerHTML = svg(name);
      const child = el.firstElementChild;
      if (child) {
        child.setAttribute('width', '100%');
        child.setAttribute('height', '100%');
        // inherit color from CSS
      }
    });
  }

  root.swampIcons = {
    version: '1.0.0',
    svg: svg,
    has: has,
    names: names,
    meta: meta,
    all: all,
    render: render
  };

  if (typeof document !== 'undefined') {
    if (document.readyState !== 'loading') render();
    else document.addEventListener('DOMContentLoaded', () => render());
  }
})(typeof window !== 'undefined' ? window : globalThis);
