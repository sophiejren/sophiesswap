# Conventions — Naming, Versioning, Git Hygiene

The set of rules I follow for naming things, versioning releases, organizing files, and writing commits across all Sophie's Swamp projects. Designed so that 6 months from now I (or anyone reading) can navigate the project without confusion.

Last updated: 2026-05-25

---

## 0. The 3 organizing principles

1. **Names should be readable by both humans AND computers.**
   → No spaces in folder names, no Chinese characters in file paths, no special characters except `-` and `_`.

2. **Version numbers should mean something.**
   → `v2.2.1` isn't a random label — it tells you what kind of change happened.

3. **History should be inspectable, not duplicated.**
   → Git already remembers every version. Copying folders is for special "frozen reference" moments only.

---

## 1. Repository naming

| Rule | Example ✅ | Anti-example ❌ |
|---|---|---|
| All lowercase | `sophies-swamp` | `Sophies-Swamp` |
| Hyphen separator (kebab-case) | `sophies-swamp-private` | `sophies_swamp_private` or `sophiesswampprivate` |
| Short but descriptive | `swamp-design-engine` | `the-sophies-swamp-personal-website-design-engine` |
| Suffix for variants | `sophies-swamp` (public) + `sophies-swamp-private` (private) | mixing them in one repo |

**Current state:** `sophiesswap` was created without hyphens — works but slightly off-convention. Don't rename now (it would break the live deploy link). Apply the rule going forward.

---

## 2. Version numbering — use **Semantic Versioning (SemVer)**

Format: `vMAJOR.MINOR.PATCH` (e.g. `v2.2.1`)

| Number | When to bump | Example |
|---|---|---|
| **MAJOR** | Breaking change — visitors see something fundamentally different / old behavior gone | `v1.0` → `v2.0` (added entire cognitive-recipes page) |
| **MINOR** | New feature added, no breaking | `v2.0` → `v2.1` (added easter eggs, newsletter, 404) |
| **PATCH** | Bug fix, polish, no new feature | `v2.1` → `v2.1.1` (removed prev/next nav after Sophie called it cluttered) |

**Pre-release suffixes** (for when you're testing):
- `v3.0.0-alpha.1` — early experimental version
- `v3.0.0-beta.1` — feature-complete but testing
- `v3.0.0-rc.1` — release candidate, last sanity check

**Use git tags for versions, not folder copies.** See section 4 below.

---

## 3. Folder naming

| Rule | Example ✅ | Anti-example ❌ |
|---|---|---|
| kebab-case | `design-engine`, `swamp-club-site` | `Swamp Club Site` (has spaces!) |
| No spaces, no Chinese, no special chars | `my-arts` | `My Arts`, `我的艺术` |
| Lowercase preferred | `images`, `patterns` | `Images`, `Patterns` |
| Short (≤25 chars) | `recipes` | `cognitive-recipes-and-essays` |

**Reason "no spaces" is critical:** every Terminal command needs quotes around the folder name. `cd "Swamp Club Site"` works but is annoying; `cd swamp-club-site` is cleaner.

**Current state migration plan (optional, do later):**
- `Swamp Club Site/` → `swamp-club-site/`
- `My Arts/` → `my-arts/`
- `My Blues/` → `my-blues/`
- `My Inspirations/` → `my-inspirations/`

⚠️ Renaming the deployed site folder requires re-uploading to Netlify (URL stays the same, but you'd `cd swamp-club-site` instead of `cd "Swamp Club Site"`). Save for a quiet evening, not urgent.

---

## 4. Version snapshots — git tags > folder copies

### Current state (slightly messy)

```
Swamp Club Site/           ← working copy
Swamp Club Site V1.0/      ← snapshot
Swamp Club Site V2.0/      ← snapshot
Swamp Club Site V2.1/      ← snapshot
Swamp Club Site V2.1.1/    ← snapshot
Swamp Club Site V2.2/      ← snapshot
```

Each snapshot duplicates ~12 MB. That's ~60 MB of duplicate data, all of which git already tracks via commit history.

### The professional way — git tags

```bash
# Tag the current state as v2.2
git tag -a v2.2 -m "Garden + glass treehouse + bookshelf + wine bar + pond"
git push origin v2.2

# To "go back to" v2.2 anytime later
git checkout v2.2

# To list all versions
git tag

# To see what changed between two versions
git diff v2.1.1 v2.2
```

**One folder, infinite versions, zero disk waste.** Each tag is just a label pointing at a specific commit.

### When to keep folder copies anyway

| Situation | Use git tag | Use folder snapshot |
|---|---|---|
| Track "what shipped on date X" | ✅ tag | ❌ overkill |
| Browse old version's files in Finder | ❌ harder | ✅ easier |
| Make sure a stable backup never gets deleted | ✅ tag (in git history forever) | ✅ also fine |
| Hand someone the V1.0 site without git knowledge | ❌ requires checkout | ✅ just zip the folder |

### Recommended migration

**Phase 1 (do now, 10 min):** Tag every existing snapshot in git
```bash
# In the working copy folder
git tag v1.0 5204c29       # (replace hash with actual V1.0 commit)
git tag v2.0 a1b2c3d
git tag v2.1 b2c3d4e
git tag v2.1.1 c3d4e5f
git tag v2.2 d4e5f6a
git push origin --tags
```

**Phase 2 (optional, only when comfortable):** Delete the folder copies, rely on tags
```bash
rm -rf "Swamp Club Site V1.0" "Swamp Club Site V2.0" ...
```
You lose nothing — git remembers every file from every version.

---

## 5. File naming

| Type | Convention | Example |
|---|---|---|
| **Top-level docs** | ALL_CAPS with `.md` | `README.md`, `LICENSE`, `CHANGELOG.md`, `CONTRIBUTING.md`, `CONVENTIONS.md` |
| **Dated docs (snapshots in time)** | ALL-CAPS + ISO date | `MAKING-OF-2026-05-25.md`, `RETRO-2026-Q3.md` |
| **Code files** | kebab-case for HTML/CSS, camelCase for JS/JSON keys | `cognitive-recipes.html`, `index.html`, `userProfile.js` |
| **Markdown notes inside subfolders** | lowercase-kebab | `design-engine/patterns/split-flap-text.md` |
| **Images / media** | lowercase-kebab + descriptor | `mr-knife.jpg`, `blue-ohrid-poster.jpg` |
| **SVG character assets** | lowercase-kebab + role | `firefly-cursor.svg`, `cat-exotic.svg`, `frog-postmaster.svg` |
| **Temp / scratch files** | prefix with `_` or `tmp-` | `_draft-pricing.md`, `tmp-experiment.html` |

**Hard rules:**
- ❌ Never use spaces
- ❌ Never use Chinese characters (or any non-ASCII) in filenames
- ❌ Never start with capital letters in code files
- ✅ ALL_CAPS only for top-level governance docs (README/LICENSE/etc) — visually says "this is structural, read me"

---

## 6. Commit messages — use **Conventional Commits**

Format: `<type>: <imperative description>`

| Type | When to use | Example |
|---|---|---|
| `feat:` | New feature visible to user | `feat: add wine bar cantilever to treehouse` |
| `fix:` | Bug fix | `fix: cat ears positioned too low on chubby exotic shorthair` |
| `style:` | Visual/CSS, no behavior change | `style: change pond color from teal to deeper blue` |
| `refactor:` | Code restructure, same behavior | `refactor: extract split-flap into design-engine pattern` |
| `docs:` | Documentation only | `docs: write CONVENTIONS.md` |
| `chore:` | Maintenance / housekeeping | `chore: gitignore raw media files` |
| `perf:` | Performance | `perf: compress images via ImageMagick` |
| `test:` | Tests only | `test: add JS parse check for all HTML files` |
| `revert:` | Undo previous commit | `revert: remove prev/next nav (overcluttered)` |

**Good commit examples:**
```
feat: add Mr. Knife 3.2× drama animation on knife easter egg
fix: cat ears moved up + out per real exotic shorthair anatomy
docs: add MAKING-OF-2026-05-25 case study
chore: move strategic docs from public to private repo
style: increase ingredient jar quantity labels to 18px
```

**Anti-examples:**
```
fixed stuff             ← too vague
WIP                     ← what?
ok                      ← what did you do
final final FINAL       ← we've all done this. don't.
update                  ← of what?
```

**Imperative mood, present tense:** "add X" not "added X" or "adds X". You're telling git what to do: "if applied, this commit will [add X]."

---

## 7. Branch strategy

For a solo creator, simple is best:

| Branch | What it's for | Lifetime |
|---|---|---|
| **`main`** | Always deployable, always stable | Forever |
| **`feature/<name>`** | New feature in progress | Until merged into main |
| **`experiment/<name>`** | Try a wild idea, may never merge | Until you delete it |

**Examples:**
```bash
git checkout -b feature/recipe-no-03
# ... work, commit ...
git checkout main
git merge feature/recipe-no-03
git branch -d feature/recipe-no-03   # delete the now-merged branch
```

**For now (solo, fast iteration):** committing directly to `main` is fine. Branches matter more when collaborating or when you want to try something risky without breaking the live site.

---

## 8. Document dating

Two kinds of documents:

| Kind | How to date | Example |
|---|---|---|
| **Living docs** (always current) | No date in filename, but update "Last updated" inline | `README.md`, `CHANGELOG.md`, `CONVENTIONS.md` |
| **Time-snapshot docs** (frozen at a moment) | ISO date in filename | `MAKING-OF-2026-05-25.md`, `RETRO-2026-Q3.md`, `PRESS-RELEASE-2026-06-01.md` |

ISO date format = `YYYY-MM-DD` (year-month-day). Sortable, unambiguous globally, plays nice with `ls`.

---

## 9. Media asset naming

For images / videos / SVGs in `images/` or `My Arts/` etc.

| Pattern | Use for | Example |
|---|---|---|
| `<theme>-<descriptor>.<ext>` | General media | `blue-ohrid.mp4`, `cat-knife.jpg` |
| `<theme>-<descriptor>-poster.<ext>` | Video poster frames | `blue-ohrid-poster.jpg` |
| `<character>-<state>.<ext>` | Character variants | `frog-postmaster-blink.svg`, `frog-postmaster-jump.svg` |
| `<page>-<role>.<ext>` | Page-specific assets | `home-hero-bg.jpg`, `recipes-cook-pot.svg` |

**Stable file names = safe to link to externally.** Don't rename `og-image.png` if other sites/apps link to it.

---

## 10. Future-proofing for the commercial API

When you eventually add the API service (per the private docs in `private/API-READINESS.md`):

### API endpoint naming

```
GET    /v1/patterns                 → list available patterns
GET    /v1/patterns/:slug           → fetch one pattern's metadata
POST   /v1/patterns/:slug/render    → render an instance with custom params
GET    /v1/characters               → list available characters
GET    /v1/characters/:slug         → fetch one character SVG
GET    /v1/tokens/colors            → swamp color palette
```

### Rules

| Rule | Why |
|---|---|
| Always include `/v1/` in path | Lets you ship `/v2/` later without breaking customers on v1 |
| Use kebab-case in URLs | Standard for REST APIs (`/api/v1/recipe-styles`, not `/api/v1/recipeStyles`) |
| Plurals for collections, singular for items | `/patterns` (list), `/patterns/split-flap` (one) |
| Verbs go in HTTP method, not URL | ✅ `POST /v1/patterns/X/render`<br>❌ `GET /v1/render-pattern?name=X` |
| Snake_case for query params | `?max_results=50&start_date=2026-01-01` |
| Lowercase, no trailing slash | `/v1/patterns` not `/V1/Patterns/` |

### Versioning

- API versions follow SemVer too: `v1.4.2` internally, but URL path stays `/v1/` (only path changes for MAJOR)
- Document deprecations at least 6 months ahead
- Provide a `Deprecation` HTTP header on endpoints being phased out

---

## 11. Public vs Private — recap

Already detailed in `private/PUBLIC-VS-PRIVATE.md`. Quick reminder of which content lives where:

| Content type | Public repo | Private repo |
|---|---|---|
| Deployed site code | ✅ | ❌ |
| Design engine patterns | ✅ | ❌ |
| Process / methodology docs | ✅ | ❌ |
| Open conventions (this file) | ✅ | ❌ |
| Commercial strategy | ❌ | ✅ |
| Pricing / business model | ❌ | ✅ |
| Customer data | ❌ | ✅ |
| Personal journal / drafts | ❌ | ✅ |
| API keys / secrets | ❌ ❌ NEVER ANY REPO | use `.env` + secrets manager |

---

## 12. Quick reference — "Am I doing this right?"

Before committing anything:

- [ ] Did I write the commit message as `<type>: <imperative>` ?
- [ ] Am I about to commit anything from `private/`? (No, that's gitignored.)
- [ ] Did I check that no API keys or `.env` files snuck in? (`git status` to see.)
- [ ] If I added a new feature, did I update `CHANGELOG.md` ?
- [ ] If I bumped a version, did I `git tag` and `git push --tags` ?

Before naming anything new:

- [ ] Lowercase? Kebab-case? No spaces? No Chinese? No special chars?
- [ ] Is the name short and descriptive?
- [ ] Will it still make sense in 6 months?

---

## 13. Migration checklist for current project (optional, do over time)

Things in current state that don't fully follow the conventions yet, ordered by effort:

| Task | Effort | Priority |
|---|---|---|
| Tag existing snapshots in git (`git tag v1.0 ...`) | 10 min | High — lets you delete folder copies later |
| Add date to README.md "last updated" line | 1 min | Low |
| Rename `Swamp Club Site/` → `swamp-club-site/` | 30 min + redeploy | Low — works fine as-is |
| Rename `My Arts/` → `my-arts/` etc. | 5 min | Low — they're .gitignored anyway |
| Move `MAKING-OF-2026-05-25.md` notation to inline date instead of filename date (or keep as snapshot) | 0 min — keep | N/A |
| Switch deployed folder reference in Netlify (if renamed above) | 5 min | Low |
| Convert future commits to Conventional Commits format | 0 min — start now | Medium |
| Delete `Swamp Club Site V1.0/` ~ `V2.2/` folders (once git tagged) | 1 min | Low — they're harmless, just disk space |

---

## 14. The TL;DR for tomorrow-you

If you only remember 5 things:

1. **kebab-case** for everything except top-level `ALL_CAPS.md` docs.
2. **No spaces** in any folder name (Terminal cries).
3. **SemVer** + **git tags** for version snapshots — not folder copies.
4. **Conventional Commits** — `feat:` / `fix:` / `docs:` / etc.
5. **Strategy / pricing / customer data → `private/`** (already gitignored, never push to public).

That's 90% of professional git hygiene.

---

🐸✦
