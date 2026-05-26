# Pattern: Split-Flap Text

> 翻牌字效 — letters spin through random glyphs and settle one by one, like a Solari board at an old train station.

---

## 1. What it is

A heading or short string of text where every character cycles through random letters/numbers/symbols for a moment, then "locks" into its final character. Letters lock left-to-right with a small stagger between each, producing a satisfying mechanical reveal.

**Live example:** the "Cognitive Recipe N°01" hero title on sophieren.com/cognitive-recipes.html

---

## 2. What it solves

- Makes a static heading feel **like it just arrived** instead of being there all along
- Adds **personality + craft** to text that would otherwise be flat
- Works as a **subtle "I'm alive"** signal when a page loads, OR
- Works as **rewarded interaction** when clicked (replays on click)

**Reach for it when:**
- You have a hero / title that wants more presence
- The page is otherwise calm and you want one moment of mechanical drama
- You want a click target that gives delight without a full animation

**Skip it when:**
- The text is long (more than ~30 chars feels noisy)
- The page is already animation-heavy (it adds to the chaos)
- The reader needs to read fast (the animation delays comprehension by ~1 second)

---

## 3. The code

### HTML

```html
<h1 class="flip" data-final="Sophie's Swamp">Sophie's Swamp</h1>
<div class="flip-soft" data-final="A Slow-Cooked Mind">A Slow-Cooked Mind</div>
```

Two classes:
- `.flip` — main hero treatment (lime → cream color shift)
- `.flip-soft` — subtitle treatment (cyan)

The `data-final` attribute holds the final text. The element's text content is replaced by the JS during the animation.

### CSS

```css
.flip { cursor: pointer; }
.flip .ch {
  display: inline-block;
  min-width: .55em;
  text-align: center;
  transition: color .15s;
}
.flip.flipping .ch {
  color: var(--neon-lime, #b6ff5b);
  text-shadow: 0 0 14px rgba(182, 255, 91, .55);
}
.flip.flipping .ch.locked {
  color: var(--cream, #f3eedd);
  text-shadow: 0 0 20px rgba(82, 255, 224, .25);
}

.flip-soft .ch { display: inline-block; }
.flip-soft.flipping .ch { color: var(--neon-cyan, #52ffe0); }
.flip-soft.flipping .ch.locked { color: var(--neon-cyan, #52ffe0); }
```

### JavaScript

```js
(function () {
  // Pool of glyphs the letters cycle through
  const POOL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@%&*+=°/';
  function rand() { return POOL[Math.floor(Math.random() * POOL.length)]; }

  // Split a string into <span class="ch"> for each character
  function splitInto(el, finalText) {
    el.innerHTML = '';
    const chars = [...finalText];
    const spans = chars.map(ch => {
      const s = document.createElement('span');
      s.className = 'ch';
      s.dataset.final = ch;
      s.textContent = (ch === ' ' || ch === ' ') ? ' ' : rand();
      el.appendChild(s);
      return s;
    });
    return spans;
  }

  function play(el) {
    const finalText = el.dataset.final || el.textContent.trim();
    const spans = splitInto(el, finalText);
    el.classList.add('flipping');

    const STEP = 55;        // ms between random swaps
    const PER_LETTER = 9;   // # of random swaps before locking
    const STAGGER = 70;     // ms offset per letter

    spans.forEach((s, i) => {
      const target = s.dataset.final;
      if (target === ' ') {
        s.classList.add('locked'); s.textContent = ' '; return;
      }
      let swaps = 0;
      const start = i * STAGGER;
      setTimeout(function spin() {
        if (swaps >= PER_LETTER) {
          s.textContent = target;
          s.classList.add('locked');
          if (spans.every(x => x.classList.contains('locked'))) {
            setTimeout(() => {
              el.classList.remove('flipping');
              // optional: restore HTML version (with styled spans)
              if (el.dataset.html) el.innerHTML = el.dataset.html;
            }, 400);
          }
          return;
        }
        s.textContent = (target === '°') ? (Math.random() < .4 ? '°' : rand()) : rand();
        swaps++;
        setTimeout(spin, STEP);
      }, start);
    });
  }

  // Run on font-load (so glyph widths are right)
  function runAll() {
    document.querySelectorAll('.flip, .flip-soft').forEach(el => play(el));
  }
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => setTimeout(runAll, 250));
  } else {
    setTimeout(runAll, 600);
  }

  // Click any .flip / .flip-soft to replay
  document.addEventListener('click', e => {
    const el = e.target.closest('.flip, .flip-soft');
    if (el && !el.classList.contains('flipping')) play(el);
  });
})();
```

---

## 4. Parameters you can tweak

| Parameter | Default | Effect |
|---|---|---|
| `POOL` | `A-Z 0-9 # @ % & * + = ° /` | Which random glyphs flash before locking. Add emoji for chaos. |
| `STEP` | `55` ms | How fast each letter cycles. Lower = faster spin. |
| `PER_LETTER` | `9` | How many random glyphs each letter shows before locking. Higher = longer animation. |
| `STAGGER` | `70` ms | Delay between letters starting. Higher = wavier reveal. |
| `.flipping .ch` color | `--neon-lime` | The color of letters while still spinning. |
| `.flipping .ch.locked` color | `--cream` | The color letters settle into. |

**Total animation duration** ≈ `(N_chars × STAGGER) + (PER_LETTER × STEP) + 400ms cleanup`
For "Sophie's Swamp" (14 chars): ~14 × 70 + 9 × 55 + 400 = **~1900 ms**.

---

## 5. Reusing in a new project

1. Copy the **CSS** block into your stylesheet (replace `var(--neon-lime, #b6ff5b)` defaults with whatever your palette is)
2. Copy the **JS** block into a `<script>` tag at the bottom of the page
3. Add `class="flip"` to any heading you want flipped
4. Add `data-final="..."` ONLY if the heading contains rich HTML you want preserved after the flip (otherwise the JS uses the element's plain text)

Done. No build step, no library.

---

## 6. Variants worth exploring later

- **Number ticker** version (instead of letters, cycle through digits — useful for counters)
- **Replay on scroll-into-view** instead of on-load (using IntersectionObserver)
- **Per-letter color hue-shift** during the spin
- **Sound effect** per locked letter (a soft click via Web Audio)

---

🐸✦
