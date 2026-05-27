# Archive

Frozen snapshots of past site versions, kept for reference and rollback.

Each subdirectory in `snapshots/` is an exact copy of `swamp-club-site/` at the moment a meaningful version shipped.

---

## `snapshots/`

| Version | What shipped |
|---|---|
| `v1.0/` | Original site launch (2026-05-24). 7-section homepage + welcome essay + CRT TV + memory sink + Connect. |
| `v2.0/` | Added cognitive-recipes.html (cook scene + 5 ingredient jars + treehouse + cats + mailbox). |
| `v2.1/` | Memorable additions: 6 easter eggs (cat meow, xylophone, keyboard triggers, swamp name, firefly tour) + OG meta + 404 + newsletter + Recipe N°02 + analytics placeholder. |
| `v2.1.1/` | Polish: removed prev/next recipe nav (mobile layout was overlapping with plating). |
| `v2.2/` | Major scene redesign: garden courtyard + glass-facade treehouse + pond with ripples + frog jump-in interaction + anchor trees + cantilever wine bar + bookshelf + denser vines. |
| `v3.0/` | **The Mirror version** (2026-05-26). Launched Swamp UI v1.0 (7 copy-paste components) + new /mirror/ channel (AI's notes on Sophie, office scene with bookshelf + walking cats) + homepage cat strip with 3 wandering cats + small standing mirror portal as the entry to /mirror/. Buy Me a Coffee tip jar integrated across all component pages and homepage. |

For exact feature lists per version, see `/CHANGELOG.md` in the repo root.

---

## Why folder snapshots and not just git tags?

Both exist. Git tags (`git tag` to list) are the "professional" way to mark versions, and they're zero-cost. But folder snapshots:

- Let anyone (including non-git users) browse old versions in Finder
- Make it trivial to drag any past version to Netlify Drop for emergency rollback
- Provide visual proof of evolution when showing the project to others

The cost is disk space (~12 MB per snapshot). Worth it for now.

Future versions: snapshot only at **major releases** (v3.0, v4.0). Minor/patch versions live in git tags only.

---

## How to use this archive

**Browse a past version:**
- Open `archive/snapshots/v2.0/index.html` in your browser — that's exactly what sophieren.com looked like at v2.0.

**Roll back the live site:**
- Drag `archive/snapshots/v2.0/` (or whichever version) to https://app.netlify.com/sites/sophies-swamp/deploys
- The live site reverts to that version in ~30 seconds.

**Compare two versions visually:**
- Open both `archive/snapshots/v1.0/index.html` and `archive/snapshots/v2.2/index.html` in side-by-side browser windows.

**Compare two versions in code (git way):**
```bash
git diff v1.0 v2.2 -- swamp-club-site/index.html
```

---

🐸✦
