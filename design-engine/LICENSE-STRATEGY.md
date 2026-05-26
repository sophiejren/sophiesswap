# Design Engine — Licensing Strategy

How the patterns in this folder are licensed, and how the strategy adapts as the engine grows toward commercial use.

---

## Current state (2026-05-25)

All patterns in `design-engine/` are licensed under **MIT** (see `../LICENSE`). This means:

- ✅ Anyone — including for-profit companies — can use, modify, fork, and redistribute
- ✅ They only need to keep the copyright notice
- ✅ This is good because it **builds the engine's reputation** and gets it adopted

---

## Why MIT (and not GPL / proprietary)?

| Option | Tradeoff | Why we picked / didn't |
|---|---|---|
| **MIT** | Maximum freedom, including commercial | ✓ Chosen — focus on adoption, not revenue from the engine itself |
| **Apache 2.0** | Like MIT + patent grant | Similar, slightly more business-friendly. Switch later if patent claims become a concern. |
| **GPL v3** | Copyleft — anyone using it must also open-source their work | ✗ Rejected — too hostile for commercial adoption, blocks Sophie from later building commercial wrappers |
| **Proprietary (all rights reserved)** | Nobody can use without your written permission | ✗ Rejected — kills the open-source brand-building value |

---

## How the strategy evolves (open core model)

This engine is designed to grow into a **public core + private premium** structure (à la GitLab CE/EE, Sentry, Tailwind UI).

### Stays MIT (public, free, forever)

- All `patterns/*.md` already in this folder
- Generic character SVGs (firefly, frog, basic cat)
- Color / typography tokens
- Stock components (forms, buttons, layout primitives)

**Rule of thumb:** anything that's a *technique* or *building block* stays open.

### Goes to private repo as premium (not licensed under MIT)

When Sophie builds commercial features, they live in **`sophies-swamp-private/premium-engine/`** under a different license — likely **proprietary "All Rights Reserved"** with a separate **commercial license** sold per-customer.

Examples of what may go premium in the future:

- **Audio-augmented patterns** (e.g., split-flap-text + procedural sound generation)
- **A/B testing instrumentation** for patterns
- **Visual no-code configurator** for the patterns (drag-drop to customize)
- **Premium character pack** (50+ swamp creatures, commercial-use license bundled)
- **Hosted API endpoints** that serve the patterns as a service (this is where the API future comes in)
- **Enterprise support / training / consulting** (zero code — just access)

---

## Trademark / brand-mark separation

Even though the code is MIT, **the "Sophie's Swamp" brand + the specific characters (Mr. Knife, Ms. Ling, Littlehotpot) are reserved**.

- ✅ You can fork the code and ship your own site
- ❌ You can't call it "Sophie's Swamp" or use her characters as your brand
- ❌ You can't impersonate her or claim association

This is similar to how the Linux kernel is GPL but "Linux" is a registered trademark of Linus Torvalds.

To clarify this when ready, add a `TRADEMARKS.md` to the public repo.

---

## Switching a pattern from MIT to commercial later

If a pattern starts as MIT in this folder and Sophie later wants to commercialize it:

1. **Earlier versions stay MIT** — anyone who already adopted MIT version v1.2 can keep using it forever under MIT terms (this is irrevocable)
2. **New versions can be relicensed** — v2.0 can ship under a different license going forward
3. **Best practice:** rename the new commercial version (e.g., `split-flap-text-pro/`) so MIT users don't get confused, and make it crystal clear in CHANGELOG

This is how MongoDB / Elastic / Redis handled their commercial pivots — note that they did face community backlash. The cleanest path is **plan the open/closed split early** (which is exactly what we're doing).

---

## Contributor License Agreement (CLA) — for the future

If/when external contributors start submitting PRs to the public design engine, Sophie may want to require a **CLA** (Contributor License Agreement). This is so:

- All contributed code IP can be re-licensed later (e.g., if pieces move to commercial)
- Sophie maintains a clean chain of ownership
- It's standard practice for any project that may go commercial

Tools:
- **EasyCLA** (https://easycla.lfx.linuxfoundation.org/) — free, Linux Foundation
- **CLA Assistant** (https://cla-assistant.io/) — free, GitHub-integrated
- **Salesforce DCO/CLA bot** — alternative

Not needed Day 1. Add when first external PR shows up.

---

## TL;DR for the future-you

| Question | Answer |
|---|---|
| Can a startup use a pattern from this engine in their commercial product? | Yes — MIT permits it. |
| Can someone fork the whole engine and brand it as "Cool Swamp"? | Yes for the code, but they can't use "Sophie's Swamp" name / characters. |
| Can Sophie still build commercial premium on top of these patterns? | Yes — premium features live in private repo + sell under a separate commercial license. |
| What if Sophie wants to relicense to GPL one day? | She can — for new versions. Old MIT versions remain MIT. |
| Should every pattern be MIT? | For now yes. As soon as a pattern feels "this is my edge, not my generosity" → move it to private repo before committing to public. |

🐸✦
