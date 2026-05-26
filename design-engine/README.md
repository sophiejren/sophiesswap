# Sophie's Design Engine

A growing library of **reusable visual + interactive patterns** extracted from sophieren.com (the swamp site) and ready to drop into future projects.

Started: 2026-05-25

---

## What lives here

```
design-engine/
├── README.md              ← this file
├── tokens/                ← colors, typography, spacing, motion timings
├── characters/            ← SVG assets you can drop into any page
├── components/            ← copy-pasteable HTML/CSS blocks
├── patterns/              ← interaction & animation recipes (with code)
└── case-studies/          ← projects built using the engine
```

---

## How to use it

When you start a new project (a landing page, a microsite, a conference page):

1. Open the right folder (`patterns/` for animations, `characters/` for SVG, etc.)
2. Find the module you need (each has its own README with code + how to customize)
3. Copy-paste the code into your new project
4. Tweak the parameters (color, timing, text)

**You're not building a framework.** You're building a personal toolbox of swamp-flavored patterns you can grab from any time without re-thinking the design from scratch.

---

## How to grow it

Every time you build something noteworthy in a real project, ask: _"Will I want this again?"_ If yes, extract it here following this template:

```
design-engine/patterns/your-pattern-name.md
```

Each module has 4 sections:
1. **What it is** (one-line description)
2. **What it solves** (when to reach for it)
3. **The code** (HTML + CSS + JS, ready to paste)
4. **Parameters** (what you can tweak)

See `patterns/split-flap-text.md` for a template example.

---

## Current inventory

### Patterns
- ✅ `patterns/split-flap-text.md` — letters spin through random glyphs and settle (Solari board effect)

### Tokens
- _(none yet — start with `tokens/colors.md` extracting the swamp palette)_

### Characters
- _(none yet — start with `characters/firefly-cursor.svg` extracting from the cursor effect)_

### Components
- _(none yet)_

### Case Studies
- _(none yet — sophies-swamp will be the first case study)_

---

## Roadmap (suggested next modules)

Pick whichever feels most exciting next:

| Module | Where it lives in the swamp | Estimated extraction time |
|---|---|---|
| **Swamp color palette** (tokens) | All over | 15 min |
| **Mechanical firefly cursor** (characters + pattern) | Site-wide cursor | 30 min |
| **Pentatonic xylophone** (pattern) | Camp string lights | 40 min |
| **Keyboard easter eggs** (pattern) | meow / rain / sophie / knife | 30 min |
| **Cat sprite walking system** (pattern + characters) | 3 cats on cognitive-recipes | 1 hour |
| **Netlify Forms AJAX wrapper** (pattern) | Mailbox + newsletter | 30 min |
| **First-visit firefly tour** (pattern) | Main page tour | 45 min |
| **swamp-name generator** (pattern) | First visit toast | 20 min |
| **Treehouse + scene** (component) | The whole treehouse SVG | 1 hour |

---

🐸✦
