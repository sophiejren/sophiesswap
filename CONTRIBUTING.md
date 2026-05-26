# Contributing to Sophie's Swamp

Thanks for reading 🐸 This repo is **mostly a personal site + design engine** — but contributions are welcome in specific areas.

---

## ✅ Welcome contributions

| Area | What's helpful |
|---|---|
| **Bug fixes** in `Swamp Club Site/` | Browser-specific issues, mobile layout fixes, accessibility improvements |
| **Performance improvements** | Better image compression, code splitting, lazy loading |
| **New patterns** in `design-engine/patterns/` | Reusable interactions following the existing template (see `patterns/split-flap-text.md`) |
| **New character SVGs** in `design-engine/characters/` | New swamp creatures (NOT replacements of existing Sophie's Swamp characters) |
| **Documentation improvements** | Typos, clarifications, missing examples |
| **Translations** of design-engine docs | Especially Chinese, French — Sophie's communities |

## ❌ Not accepting contributions

| Area | Why |
|---|---|
| **Site copy / Sophie's bio text** in any HTML file | This is Sophie's voice — must be hers |
| **Cognitive Recipe content** (the essays, ingredients, methods) | These are her personal writing |
| **Replacements** of Mr. Knife / Ms. Ling / Littlehotpot characters | These are her real cats — IP belongs to her |
| **Branding / visual identity changes** | The swamp aesthetic is intentional and held by Sophie |
| **Pull requests with major structural changes** without prior discussion | Open an Issue first so we can talk about it |

---

## 🛂 Process

1. **Open an Issue first** for anything non-trivial (more than a typo fix). Describe what you want to change and why.
2. Wait for a 👍 from Sophie before opening a PR.
3. Fork the repo, work on a feature branch, open a PR against `main`.
4. PR title format: `[area] short description` — e.g., `[design-engine] add hover-card pattern`.
5. Keep PRs small and focused. One concept per PR.

---

## 📝 Style notes

- **HTML/CSS/JS** in this repo is intentionally **single-file, no build step, no framework**. Please don't introduce React, npm dependencies, or a build pipeline unless explicitly invited.
- **Comments are encouraged** — especially explaining "why," not "what."
- **No external CDN dependencies** without discussion. Currently only Google Fonts is allowed.
- **Mobile-first not strictly required**, but if you change layout, please test ≤ 760px and ≤ 420px breakpoints.

---

## 📜 Contributor License Agreement

By submitting a PR you agree that your contribution is licensed under the same license as the repo (currently **MIT** — see `LICENSE`).

If at any point this project starts a commercial component, you may be asked to sign a more formal **CLA (Contributor License Agreement)** for any future contributions. Existing MIT-licensed contributions are unaffected.

---

## ✨ A note on the spirit of contributions

This is a personal site. The design engine is offered to the community as a starting point, not as a "framework you should bend to your will." If you find yourself wanting to restructure huge sections, you probably want to **fork it and make it your own** rather than push to the original.

The best contributions are: bug fixes that make it more robust, patterns that extend without invading, and translations that help non-English speakers learn from it.

🐸✦
