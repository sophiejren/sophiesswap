# Sophie's Swamp — Changelog & Feature Inventory

A complete record of what's been built on **sophieren.com**, version by version.
Each version is preserved as a frozen folder snapshot in this project — you can always go back.

---

## 🗂 Version snapshots (preserved on disk)

| Version | Folder | Date | State |
|---|---|---|---|
| V1.0 | `Swamp Club Site V1.0/` | 2026-05-24 | Original launch |
| V2.0 | `Swamp Club Site V2.0/` | 2026-05-25 | Big build: recipes page + treehouse + cats |
| V2.1 | `Swamp Club Site V2.1/` | 2026-05-25 | Polish: easter eggs, OG meta, 404, newsletter, N°02 |
| **V2.1.1** | `Swamp Club Site V2.1.1/` | 2026-05-25 | Current live · removed prev/next recipe nav |
| **(working)** | `Swamp Club Site/` | rolling | Working copy — edit this for next deploy |

The folder `Swamp Club Site/` (no version suffix) is the **working copy** you drag to Netlify when you want to ship.

---

## V2.1.1 — current live (2026-05-25 PM)

**The one polish:**
- Removed the prev/next recipe nav cards from the bottom of N°01 and N°02 (mobile layout was overlapping with Plating section; visual mess)
- Also removed the "mailbox is over in N°01" tease line from N°02

> N°02 is now structurally orphan — only reachable by direct URL (`sophieren.com/cognitive-recipes-02.html`). To be decided next: delete N°02, keep as hidden draft, or give it a proper entry point.

---

## V2.1 — "make it memorable" (2026-05-25 PM)

### Six small interactions that make the site stick

1. **Click any cat** → handwritten speech bubble with personality
   - Mr. Knife: "not now" → "I said not now" → *flops on side* + zzz
   - Ms. Ling: "I'm hungry" → "...still hungry" → ♥ feed me ♥
   - Littlehotpot: "*growls*" → "*growls louder*" → "*lunges!*"
   - 3rd click on the same cat = bonus easter egg
2. **Camp string lights = pentatonic xylophone**
   - The 6 festoon bulbs (red/pink/cyan/lime/orange/yellow) each play a note (C-D-E-G-A-C). Any combo sounds good because pentatonic. Web Audio (triangle + sine), bulb scales & flashes when struck.
3. **Camp object click micro-interactions**
   - Cybertruck: HONK speech bubble + LED flash 3x + WebAudio honk + cats turn heads
   - BBQ: flames + smoke double for 2s
   - Lantern: toggle bright/dim
   - Tent: person silhouette stretches inside
4. **Keyboard easter eggs** (anywhere on the page, except inside inputs)
   - `meow` → cats sprint for 5s + floating "meow!" pops across screen
   - `rain` → 140 raindrops fall through the swamp for 8s
   - `sophie` → modal with handwritten note ("if you typed my name to find this — we should probably be friends. swamp says hi · s ✦"). EDIT marker in code at `SOPHIE_NOTE` to change.
   - `knife` → Mr. Knife teleports to centre on recipes page; on main page, shows clickable link to the kitchen
5. **The swamp gives you a name** (first visit only)
   - 1 second after landing, a bottom-right toast pops: _"The swamp has named you · Iris of the Twilight Moss"_ (or one of 24 × 18 = 432 combinations)
   - Saved to `localStorage` as `swamp:name` → remembered forever
   - Pre-fills the mailbox form's handle field as placeholder
6. **First-visit firefly guided tour** (main page only)
   - A glowing firefly drifts from the corner to 6 sections in order: welcome → art → research → obsessions → thoughts → connect
   - At each stop, a small handwritten caption appears
   - Skippable via "skip tour →" pill bottom-left
   - Runs once per browser via `localStorage` (`swamp:tourSeen`)
   - To re-trigger for testing: `localStorage.removeItem('swamp:tourSeen')` in browser console, or open in a private window

### Site infrastructure improvements

- **Full sharing metadata** (OG / Twitter / LinkedIn) on every page — including og:image (1200×630), twitter:card summary_large_image, og:site_name. Every share to Slack/Twitter/iMessage now shows a proper preview.
- **Swamp-themed 404 page** (`404.html`) — lost firefly drifts around, "you've wandered too deep into the swamp", return + alt links. Netlify serves automatically on 404.
- **Image + video compression pass** — site shrunk 13MB → 12MB (JPGs ~10% smaller via ImageMagick, two videos re-encoded).
- **Newsletter signup form** — "The Swamp Writes Letters" dashed-border card after Connect section. Uses Netlify Forms (`name="swamp-letters"`), AJAX submit, honeypot. Same dashboard as treehouse mailbox.
- **GoatCounter analytics placeholder** — commented `<script>` in `<head>` of all 3 HTML files. Sign up at goatcounter.com, replace `MYCODE` placeholder in 3 spots, uncomment, re-deploy. Plausible alternative documented in the comment.
- **Cognitive Recipe N°02 — "How to Catch a Strange Idea"** — new lean recipe page (`cognitive-recipes-02.html`). Same cook + 5 jars + recipe card; no treehouse/cats/mailbox. New ingredients: 2 minutes of boredom, a wide-mouthed jar, a second opinion (not human), slow attention, a walking shoe. Currently orphan (no entry point).

---

## V2.0 — the big build (2026-05-25 AM)

### New page: `cognitive-recipes.html`

A full standalone immersive page accessed via "Recipes" in main nav AND via the hero "FROM THE KITCHEN" hook card.

**Recipe N°01 — "A Slow-Cooked Mind, in Five Ingredients"**

Sophie's cognitive formula: `Sicilian Art + Stanford Systems Thinking + Agent Workflows + Emotional Residue + Fusion Food`.

**The kitchen scene:**
- **Swamp Cook**: hooded character stirring a glowing cauldron. Idle: breathes, stirs, eyes flicker, bubbles pop, steam rises. Click = boil burst.
- **5 ingredient jars** floating around the cauldron — each with custom SVG (warm gold Sicilia bottle, cyan systems-diagram apothecary jar, pink swarm flask, dark purple-red residue jar with handwritten "do not discard" label, rainbow swirl fusion carafe). Hover shows description. Quantity caption under each label.
- **David-Rudnick-inspired split-flap title animation** — letters spin through random glyphs and land left-to-right. Click to replay.

**The treehouse scene (left → right):**
1. **Camp scene** (left): angular Cybertruck with stainless silver body + cyan LED bar + popped-up A-frame rooftop tent + ladder + Weber-style kettle BBQ with glowing coals & rising smoke + folded camp chair with coffee mug + LED lantern + 6-bulb festoon string lights connecting camp to treehouse
2. **Modern architectural treehouse** (centre): 4 wooden stilts with X cross-bracing, elevated wooden cabin, two glass panels glowing warm — left window has hanging vines + potted Monstera + flower pot with pink/coral/orange blooms; right window has hanging plant + Fiddle Leaf Fig + reading chair with small seated-person silhouette + windowsill of yellow/coral blooms. Vines reclaim the stilts. Spanish moss drapes from roof. Glowing mushrooms cluster at base.
3. **Modern mailbox + frog postmaster** (right): sleek dark post-mounted mailbox with cyan glowing letter slot + LED status pulse + engraved "DROP·HERE". Frog in postman cap holds wax-sealed envelope.
4. **3 wandering cats** roam the ground:
   - **Mr. Knife** & **Ms. Ling** (Sophie's real cats): silver-blue tabby exotic shorthairs with flat oval heads, blue eyes, chubby bodies, short stubby legs, small low-set ears, short curl tails, cream paws, prominent curved whiskers. Ms. Ling has a tiny pink head-bow to tell them apart.
   - **Littlehotpot**: bengal/leopard cat with golden tan coat, dramatic rosette spots, long sleek athletic body, multi-banded tail with black tip, pointed ears with black backs and tufts, mascara stripes from eyes, fierce green almond eyes. Occasionally (28% chance per pause) walks to one of the inner stilts and climbs to platform level, sits 4-8s, then climbs back down.
   - Hover any cat = name tooltip.

**The mailbox form** (right of treehouse): handle / email (both optional) / 7 type chips (idea, link, question, art, ingredient, secret, other) / message. AJAX-submitted to Netlify Forms. Success state replaces form with "✓ the swamp received it" card.

**Page also has:**
- Recipe card below scene with Method (6 numbered steps) + Plating Note (in Sophie's voice)
- Marquee strip: SLOW-COOKED THOUGHTS · SERVED WITH MUD · NO PORTION TOO PURE · COGNITIVE RECIPES SINCE 2026
- "← return to the swamp" link

### Main page (`index.html`) additions for V2.0

- **"FROM THE KITCHEN" hook card** in hero (right under "Surprise me →" button) — small animated cauldron + label + "Recipe N°01 →" pill, linking to recipes page. Sophie's preferred placement: maximum discoverability.
- New nav link **Recipes** between Blues and Connect (neon-lime highlighted)

### V2.0 ↔ V2.1 design iteration history (preserved for context)

Sophie's feedback drove many revisions:
- Treehouse went through 3 design iterations: wooden cabin (rejected: too generic) → surreal swamp-creature with face-mouth-mailbox (rejected: not the right vibe) → modern wooden architecture on stilts (kept)
- Cats went through 4 iterations: orange Garfields (wrong, they're blue tabby) → silver-blue tabby (right colour) → "even fatter + short tail + small ears + flat face" (better proportions) → "blue eyes + flat oval head" (correct breed features) → eyes/whiskers refined → ears repositioned + second eye added for 3/4 view

---

## V1.0 — original launch (2026-05-24)

The first ship at **sophieren.com**. Single-file `index.html` + images folder.

### Seven sections + welcome + memory sink

1. **Hero** — "SOPHIE'S SWAMP" big title, "If You Found This, You Belong Here" motto, Wander In / Surprise me CTAs
2. **Before You Wander In** — welcome essay framing memory as weather, brain as a fusion system. Interactive cloud icon cycles through rain/sun/cloud/storm.
3. **My Art** — 8 artworks in click-to-zoom lightbox (4 AI-generated, cat photo of Mr Knife, watercolour, etc.)
4. **My Research** — 6 "Open Question" cards covering Sophie's real learning-science agenda (play+learning, personalised learning, memory rules, curiosity/motivation, joy of learning, "is learning painful")
5. **My Thoughts** — 6 essay dispatches with hand-drawn SVG cartoons (evolution & curiosity, AI breaking education, agent civilization, tech layoffs, cognitive flexibility, denial). Dispatch 01 links to her published LinkedIn essay.
6. **My Inspiration** — 7 polaroids (Bosch's Garden of Earthly Delights, Piranesi's Imaginary Prisons, Dalí's Persistence of Memory, plated "spring" dish, blue fabric installation video, Rubens hunt painting + "after Rubens" engraving) with witty + factually-accurate captions
7. **My Obsessions** — 4 of Sophie's real AI obsessions with neon SVG icons. Also has the "AI Agent CCTV" live-activity panel (scripted agent statuses cycling every ~2.8s)
8. **My Blues** — 16 specimens of blue from 7 countries (Brazil, Sicily, France, USA, Albania, Montenegro, Lake Ohrid). Each specimen is a numbered card with auto-extracted colour swatch. Captions are one-line poems — 11 are verified-real lines by poets of that country (Dante, Éluard, Leopardi, Ungaretti, Langston Hughes, Cecília Meireles, Lasgush Poradeci, Aco Šopov), 5 are Claude field-notes.
9. **What the Swamp Keeps** (memory sink) — compact pool where 8 personal fragments auto-surface and sink on their own. Hover/tap holds one still.
10. **Connect** — Sophie's real bio, roles (ChatSlide / Aeobox / Velocity Capital / Stanford communities / GenAI conferences / Stanford Entrepreneurs magazine / DouXing background), contact links, low-key free immigration consult offer

### V1.0 site-wide features

- Mechanical firefly cursor (trails the pointer site-wide)
- Ambient fireflies + string lights along top
- CRT TV easter egg (bottom corner, click to change channel, 5 channels with swamp creatures)
- Favicon + tab title easter egg ("the swamp misses you" when tab hidden)
- Konami code (↑↑↓↓←→←→BA) → disco mode (hue rotation)
- OG share image, sitemap-ready metadata
- Smooth scroll, nav highlight by section
- prefers-reduced-motion respected

---

## 🔧 What's still on the table (for next session)

Pending tasks Sophie owns:
1. **Enable GoatCounter analytics** — sign up at goatcounter.com → tell me your subdomain → I uncomment 3 lines and redeploy. Without this, no visit data.
2. **Decide N°02 fate** — keep as orphan? delete? add proper entry point?
3. **N°02 content** — currently my draft for "How to Catch a Strange Idea"; Sophie may want to rewrite

Possible additions (not yet started):
- Recipes as a real index page (`/recipes/`) with prev/next per dish — only worth doing once there's a 2nd recipe Sophie's committed to
- Brand kit: logo, wallpapers, sticker pack (for conference giveaways)
- AI dialogue widget ("ask the swamp") using Claude/GPT
- A "share to socials" button cluster (with the IG limitations covered earlier)
- Mobile cat scene tuning (cats walk in a narrow strip on mobile; could be reshaped)

---

## 🚀 How to deploy (reminder)

1. Log into https://app.netlify.com → site `sophies-swamp` → **Deploys** tab
2. Drag the `Swamp Club Site/` folder onto the dotted "Drag and drop" box
3. Wait for green "Published" (~30 seconds)
4. Hard refresh sophieren.com (Cmd+Shift+R) to bust browser cache

After deploy, optionally check:
- **Forms** tab → confirm `treehouse-mailbox` and `swamp-letters` still listed
- **Deploys** tab → top deploy should show today's timestamp + green "Published"

---

## 📁 Project file map

```
Sophie's Playground/
├── Swamp Club Site/                  ← working copy (drag this to deploy)
│   ├── index.html
│   ├── cognitive-recipes.html
│   ├── cognitive-recipes-02.html
│   ├── 404.html
│   └── images/
├── Swamp Club Site V1.0/             ← original launch
├── Swamp Club Site V2.0/             ← treehouse + cats build
├── Swamp Club Site V2.1/             ← easter eggs + N°02 + infrastructure
├── Swamp Club Site V2.1.1/           ← current live (prev/next removed)
├── My Arts/                          ← source artwork (originals)
├── My Blues/                         ← blue specimens (videos + photos)
├── My Inspirations/                  ← inspiration materials
├── INSPIRATION_LIBRARY.md            ← design references (Active Theory, David Rudnick)
└── CHANGELOG.md                      ← this file
```

---

*Brewed by hand in the swamp 🐸✦*
