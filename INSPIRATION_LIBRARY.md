# Inspiration Library — Sophie's Swamp

A living reference of design / motion / typography work to learn from, organized by what we can realistically borrow vs. what's aspirational.

---

## ✦ Active Theory — activetheory.net

**Who:** LA-based creative studio (since 2012). Builds award-winning WebGL experiences for Beyoncé, Nike, Google, Riot Games, etc. Known for cinematic Three.js sites that blur the line between game engine and website.

**What's special:**
- Full-screen, cinematic, often WebGL-driven
- Custom typography that reacts to cursor / scroll
- Smooth page transitions where elements morph between pages
- Strong sense of "space" — depth, perspective, parallax
- Soundtracks per page

**What we can borrow cheaply (no WebGL needed):**
1. **Cursor as a character** — a custom cursor that scales/morphs when hovering different elements (we have firefly cursor already; extend it: bigger when hovering links, becomes a spoon over the cauldron, etc.)
2. **Hover-scramble text** — letters glitch/shuffle on hover then settle. Pure JS, ~30 lines.
3. **Reveal-on-scroll** — sections that fade up & translate when entering viewport, with a clear hierarchy (title first, body second, image third).
4. **Marquee headlines** — giant horizontally-scrolling text strips, often as section dividers. (We just added one to cognitive-recipes — could go bigger / more.)
5. **Page-transition curtain** — a colored panel slides in on link click, then slides back out revealing the new page. Done in vanilla JS.

**What's aspirational (would need real WebGL effort):**
- 3D scenes with depth / camera animation
- Particle systems beyond fireflies
- Shader effects (chromatic aberration, glitch, displacement)

**Verdict:** worth studying their *patterns*, not their *tech stack*. We can capture ~70% of the feeling with vanilla CSS + JS.

---

## ✦ David Rudnick — davidrudnick.org

**Who:** British graphic designer / typographer. Famous for music industry work (Evian Christ, Koreless, JG Wilkes, Jon Rafman, Nike, etc.) and a long list of custom typefaces (HyperZoa, Tranz Mono, Caszius, Erhard Grotesk, etc.). Trained at Yale.

**What's special:**
- His own site is *deliberately raw* — looks like a brutalist wall of text links. No images, no chrome, just navigation.
- The project pages themselves explode with custom typography, layered text, mysterious symbols, occult/sci-fi aesthetics.
- Treats text as material — letterforms warp, stack, get pressed into shapes.
- "Designs that look like they're from a parallel-universe magazine."

**What we can borrow cheaply:**
1. **Type as the main event** — pages where typography *is* the design, not a label on top of design. (Our hero title "COGNITIVE RECIPE N°01" gestures at this; we could push much harder.)
2. **Symbol layer** — custom glyphs / icons that recur as a visual language across pages (✦, N°, signs of the recipe).
3. **Information density done well** — the wall-of-text homepage works because the typography is impeccable. We could do a "deep index" page that's *just text* but feels intentional.
4. **Brutalist nav** — barely-styled link lists that paradoxically feel premium because the type is good.

**What's aspirational:**
- Custom variable fonts (he literally designs his own typefaces)
- The layered, screen-printed look in his project case studies

**Verdict:** save for later — most useful if/when we do a "deep archive" page or want to push the typography on a single section to feel high-art.

---

## Cheap patterns we could try right now in V2.0

Ordered by effort, low → high:

1. **Hover scramble on the hero title** — when you hover "COGNITIVE RECIPE N°01" the letters scramble through random characters and settle. ~20 lines of JS.
2. **Section reveal on scroll** — IntersectionObserver fades each section in cleanly. ~30 lines.
3. **Cursor morphs context-aware** — firefly becomes a glowing spoon over the cauldron, a chef hat over jars. CSS class swap on hover.
4. **Page-transition curtain** — clicking "← back to swamp" slides a teal panel across, then loads the next page. ~50 lines.
5. **A "swamp archive" sub-page** — Rudnick-style brutalist wall of every section / recipe / blue specimen as raw links. Almost zero design, all about the type. ~1 hour.

## Patterns parked for later (bigger investments)

- Real WebGL scene (3D swamp environment with depth)
- Custom variable typeface
- Sound design — ambient swamp loop + UI clicks
- Smooth between-page transitions where elements physically morph (e.g., the cauldron from the recipes page becomes the firefly cursor's halo on the homepage)

---

## How to use this file

- Add new references at the top of "More to study" below as they come up.
- When we decide to actually borrow a pattern, move that line to a `BORROWED ✓` line with a one-sentence note on what we used and where.
- This file lives in `Sophie's Playground/` (project root), not in `Swamp Club Site/` — it's a working note, not part of the deployable site.

## More to study (queue)

_(empty — add new links here)_

## Borrowed ✓

_(empty — log patterns as we adopt them)_
