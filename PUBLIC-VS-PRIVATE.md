# What goes in PUBLIC repo vs PRIVATE repo

A decision framework for "should this commit go into `sophies-swamp` or `sophies-swamp-private`?"

Use this whenever you're about to add a new file or write new content.

---

## 🚦 The 30-second decision

Ask yourself **one question**:

> _"If a competitor / journalist / random person on the internet read this, would I be okay?"_

| Answer | Goes in |
|---|---|
| ✅ Yes, totally fine — I'd be proud they saw it | **PUBLIC** (`sophies-swamp`) |
| 😐 I'd be a bit shy / uncomfortable / vulnerable | **PRIVATE** (`sophies-swamp-private`) — start there, can always move public later |
| ❌ This is a competitive advantage / personal data / unfinished thinking | **PRIVATE** — definitely |

**When in doubt, default to private.** It's much easier to move from private → public later than the other way around (because once public, anyone could've copied it).

---

## 📋 Detailed checklist

### ✅ Public is right when content is:

- ✅ Already visible on sophieren.com (the deployed site)
- ✅ A reusable design pattern, code recipe, or generic technique
- ✅ A public essay you'd post on LinkedIn or Twitter
- ✅ Open-source educational content
- ✅ Generic SVG / character that doesn't reveal a competitive advantage
- ✅ Project documentation that helps others understand HOW you build (process)
- ✅ Polished examples / case studies (Sophie's Swamp itself as a case study)

### 🔒 Private is right when content is:

- 🔒 **Personally identifying info from users** (form submissions, emails captured, IP addresses, behavior logs)
- 🔒 **API keys, secrets, tokens** (always use `.env` + `.gitignore` even in private)
- 🔒 **Business strategy** (pricing experiments, target customer profiles, GTM plans, competitive teardowns)
- 🔒 **Financial data** (revenue, costs, runway, customer LTV)
- 🔒 **Unfinished essays** you may publish later (you want the "first publication" timestamp)
- 🔒 **Premium / commercial features** that are the differentiator vs free version
- 🔒 **A/B test code** that reveals what you're testing
- 🔒 **Internal analytics + dashboards** (what's actually working)
- 🔒 **Customer feedback / interviews** (always — privacy + competitive)
- 🔒 **Hiring docs, partnership negotiations**
- 🔒 **Anything you'd consider a "trade secret"**

### 🚨 Hard rules — NEVER commit to either repo

- 🚨 Real customer personally identifiable information (PII) → use a separate **data store** (Supabase, Airtable, etc.)
- 🚨 Production API keys → use `.env` + `.gitignore` + a secrets manager (1Password, Vercel env vars, AWS Secrets Manager)
- 🚨 Anything covered by GDPR / CCPA without proper handling
- 🚨 Anything you signed an NDA about

---

## 📁 Concrete mapping for Sophie's case

### sophies-swamp (PUBLIC, MIT)

```
sophies-swamp/
├── Swamp Club Site/                 ✅ Already on the public web
├── Swamp Club Site V1.0..V2.2/      ✅ History of the public site
├── My Arts/                         ✅ Sophie's published art
├── My Blues/                        ✅ Published photos
├── My Inspirations/                 ✅ Public design references
├── design-engine/                   ✅ Open patterns + characters
│   ├── README.md
│   ├── tokens/
│   ├── characters/
│   ├── components/
│   ├── patterns/
│   ├── case-studies/
│   └── LICENSE-STRATEGY.md
├── CHANGELOG.md                     ✅ Public log of public-site changes
├── MAKING-OF-2026-05-25.md          ✅ Case study of public site build
├── INSPIRATION_LIBRARY.md           ✅ Public design references
├── PUBLIC-VS-PRIVATE.md             ✅ (this file — meta but useful for community to see your discipline)
├── CONTRIBUTING.md                  ✅ Welcome contributors
├── LICENSE (MIT)                    ✅
└── README.md                        ✅ Sophie's bio + project showcase
```

### sophies-swamp-private (PRIVATE)

```
sophies-swamp-private/
├── business-experiments/            🔒 New feature prototypes, pricing tests
│   ├── pricing-page-mockups/
│   └── pro-features-spike/
│
├── premium-engine/                  🔒 Future commercial design-engine modules
│   ├── audio-augmented-patterns/
│   ├── ab-testing-instrumentation/
│   ├── premium-character-pack/
│   └── api-service/                 🔒 The eventual hosted API (this is the commercial bet)
│       ├── server/
│       ├── billing/                 🔒 Stripe / Lemon Squeezy integration
│       ├── auth/                    🔒 API key management
│       └── rate-limiting/           🔒
│
├── customer-feedback/               🔒 mailbox submissions (PII)
│   ├── archive/
│   └── analysis.md
│
├── analytics-deepdive/              🔒 GoatCounter exports + custom analysis
│   └── monthly-recaps/
│
├── drafts/                          🔒 Unpublished essays, half-baked ideas
│
├── strategy-notes/                  🔒 Business strategy, competitive teardowns
│   ├── competitors.md
│   ├── pricing-thinking.md
│   ├── go-to-market.md
│   └── partnerships/
│
├── personal-notes/                  🔒 Whatever's private — journal-y thoughts
│
└── README.md                        🔒 (private — describes this repo)
```

---

## 🔄 Migration rules

### Moving content from private → public ("we decided to open this up")

Easy. Just `git mv path/from/private/file public/path/`. Add to public repo, commit, push.

### Moving content from public → private ("we shouldn't have published this")

**Hard.** Once it's in a public repo's history, anyone who cloned at any point still has it. You can rewrite history with `git filter-branch` or `git filter-repo` but copies on people's machines persist forever.

**Lesson:** when in doubt, start private.

---

## ⚠️ Common mistakes to avoid

1. **Committing `.env` to public repo** — even once is forever. Use `.gitignore`. Rotate any leaked keys immediately.
2. **Customer email addresses in markdown files** — PII. Always anonymize before any commit (even private repo).
3. **Strategy doc in public repo** — competitors will read it. They will read your repos.
4. **API code with hardcoded keys** — use environment variables. Always.
5. **Putting all your patterns in MIT public when some are your edge** — give away the common ones, save the differentiators.

---

## 🧰 Tools that help enforce the rule

- **`git-secrets`** (https://github.com/awslabs/git-secrets) — pre-commit hook that scans for secrets / API keys
- **`detect-secrets`** (Yelp) — Python tool to scan repos for leaked secrets
- **GitHub Secret Scanning** — automatic, free, on by default for public repos. Will alert you if you commit AWS/Stripe/etc keys.

Enable these once you're commit-ing more frequently.

🐸✦
