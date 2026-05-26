# Design Engine — API Readiness

Architectural notes for writing patterns now in a way that makes future commercial APIs trivially easy to spin up later.

This document is for **future-you** the day you decide: _"OK time to turn split-flap into a hosted API endpoint that customers can call to get animated text widgets on their own sites."_

---

## 🎯 The principle

Every pattern in this engine should be writable as if it were already an API:

**Input** (clear parameters) → **Pure transformation** (no hidden state) → **Output** (predictable result)

If you write your patterns this way from day one, **turning them into a real API later is mostly about adding HTTP routing, auth, and billing — not rewriting the actual logic.**

---

## 📐 5 architectural habits to start now

### Habit 1: Parameterize everything; hardcode nothing

❌ Bad:
```js
function splitFlap(el){
  const STEP = 55;
  const PER_LETTER = 9;
  // hardcoded constants buried in function
}
```

✅ Good:
```js
function splitFlap(el, opts = {}){
  const {
    step = 55,
    perLetter = 9,
    stagger = 70,
    pool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@%&*+=°/',
    finalColor = 'currentColor',
    spinningColor = '#b6ff5b',
  } = opts;
  // every behavior is configurable via the opts object
}
```

**Why this matters for API:** the API request body becomes literally `{ step, perLetter, stagger, pool, ... }`. Zero translation work.

### Habit 2: One pattern = one self-contained module

❌ Bad: split-flap's JS references global variables defined in another file (`window.swampPalette`, `window.swampFonts`).

✅ Good: split-flap takes everything as parameters. It doesn't know or care what else is on the page.

**Why this matters for API:** each pattern can be deployed as an independent service / endpoint. Composability stays high.

### Habit 3: Document inputs + outputs explicitly

Every pattern's mini-README should already have a **Parameters** section (see `patterns/split-flap-text.md` template). Treat it as:

- The HTML/CSS/JS version = today's "library usage"
- The Parameters table = tomorrow's API request schema
- The "what it produces" section = tomorrow's API response schema

This means you're writing API docs without realizing it.

### Habit 4: No side effects you can't see

❌ Bad: pattern writes to localStorage / cookies / global window object without saying so in the docs.

✅ Good: pattern declares its side effects explicitly. If it uses localStorage, the README says so + provides a flag to disable.

**Why this matters for API:** an API call should be predictable. "Returns animation HTML, also touches localStorage" is a leaky abstraction.

### Habit 5: Version your patterns

Even within a pattern file, support versioning:

```js
// design-engine/patterns/split-flap-text.md
// Current: v1.2 — added emoji support to POOL
// v1.1 — added pause-on-hover
// v1.0 — initial release
```

When you turn it into an API later, you can route `/v1/split-flap` and `/v2/split-flap` separately. Customers on v1 don't break when you ship v2.

---

## 🌐 When you actually build the API (private repo only)

The actual API server code lives in `sophies-swamp-private/premium-engine/api-service/`. Here's what to think about:

### Tech stack recommendation

For a personal-scale commercial API, simplest stack:

| Component | Recommendation | Why |
|---|---|---|
| **Runtime** | Cloudflare Workers OR Vercel Edge Functions | No servers to manage, free tier, instant global |
| **Language** | TypeScript | Type safety = fewer 500 errors at customer sites |
| **Auth** | API keys + Stripe customer mapping | Simplest possible billing-aware auth |
| **Billing** | Lemon Squeezy OR Stripe Billing | Lemon Squeezy is friendlier for indie SaaS |
| **Rate limiting** | Cloudflare Rate Limiting OR Upstash Redis | Free tier covers small scale |
| **Logs** | Axiom OR Logtail | Pretty + free tier |
| **API docs** | Mintlify OR readme.com OR self-hosted via OpenAPI | Mintlify is gorgeous |
| **Status page** | Vercel Status OR Statuspage.io | Customers expect one |

Don't pick all of these on day one. Pick **runtime + auth + billing** and ship a single endpoint.

### API URL structure (plan now)

```
https://api.sophierenusing.com/  (custom subdomain via Cloudflare)
  ├── /v1/
  │   ├── /patterns/split-flap          POST → returns animation HTML
  │   ├── /patterns/firefly-cursor      POST → returns JS snippet + SVG
  │   ├── /patterns/swamp-name          GET  → returns a random swamp name
  │   ├── /characters/cat               GET  → returns SVG with optional color params
  │   └── /tokens/colors                GET  → returns the swamp palette as JSON
  ├── /v2/                              (future, when v1 breaking changes)
  ├── /auth/                            (key mgmt)
  └── /usage/                           (customers' usage metering)
```

Each `/patterns/*` endpoint maps directly to one file in `design-engine/patterns/`. The pattern file IS the spec.

### Authentication pattern

```
POST /v1/patterns/split-flap
Headers:
  Authorization: Bearer ss_live_xxxxxxxxxx
  Content-Type: application/json

Body:
{
  "text": "SOPHIE'S SWAMP",
  "step": 55,
  "perLetter": 9,
  "stagger": 70,
  "pool": null,  // null = use default
  "finalColor": "#f3eedd",
  "spinningColor": "#b6ff5b"
}

Response (200):
{
  "html": "<h1 class=\"flip\" data-final=\"...\">...</h1>",
  "css": "...",
  "js": "...",
  "usage": { "remaining": 4823, "resetAt": "2026-06-01T00:00:00Z" }
}
```

The pattern's existing parameter table = the request schema. You already wrote the API spec, you just didn't call it that.

### Pricing tier scaffold (think about it now)

| Tier | Price | Limits | Target customer |
|---|---|---|---|
| **Free** | $0/mo | 100 calls/mo, attribution required | Hobby / personal sites |
| **Indie** | $9/mo | 10k calls/mo, no attribution | Indie devs / small SaaS |
| **Studio** | $49/mo | 100k calls/mo + new patterns first | Agencies, design studios |
| **Custom** | Talk | Volume / on-prem | Enterprise |

Even if you don't sell yet, **knowing the eventual tiers shapes your code** (e.g., usage tracking from day one, not bolted on).

---

## 🚫 Common API pitfalls to avoid

1. **No versioning from day one** → you ship `/patterns/split-flap`, then need to change behavior → customers break. Use `/v1/` from request #1.

2. **No rate limiting** → one customer's bug DDoSes you → bill from your hosting provider arrives. Rate limit per API key, even on free tier.

3. **Sync everything** → API is slow because it generates HTML on every request. **Cache by parameter hash** — same params = same response = serve from cache.

4. **No idempotency keys** → customer retries a paid call due to network blip, gets billed twice. Accept `Idempotency-Key` header.

5. **Auth in URL** → `?api_key=xxx` shows up in logs / referrer headers. Always use `Authorization` header.

6. **No webhook for usage** → customers want to know when they hit limits. Provide webhooks (`usage.limit_warning`, `usage.limit_exceeded`).

7. **Ignoring CORS** → customers can't call your API from the browser. Configure CORS properly per-customer-domain.

---

## 🗓 Recommended sequencing (when you decide to do this)

| Month | Milestone |
|---|---|
| 1 | Pick 1 pattern. Build a Cloudflare Worker that serves it. Hard-code API key. Deploy to api.sophierenusing.com/v1/patterns/test |
| 2 | Add real auth (API keys in a DB). Lemon Squeezy account setup. Manual key issuance. |
| 3 | Add billing webhook → auto-create API key on payment. Add usage tracking. |
| 4 | Add a 2nd pattern. Public landing page. Documentation site. |
| 5 | Free tier with rate limiting. First public launch. |
| 6 | Onboard first 10 paying customers. Iterate based on what they actually use. |

**Total time to first dollar:** ~3 months part-time. Don't try to do it all at once.

---

## ✅ Day-one habits to start RIGHT NOW

Every time you add a pattern to `design-engine/patterns/`, before committing:

1. ☐ All behaviors are configurable through clear parameters (no magic numbers)
2. ☐ The pattern is self-contained (doesn't depend on other patterns or globals)
3. ☐ The pattern README's "Parameters" section reads like an API request schema
4. ☐ The pattern README has a "what it produces" section that reads like an API response schema
5. ☐ Any side effects (localStorage, cookies, audio context) are explicitly noted + can be disabled
6. ☐ The pattern has an internal version number (`v1.0`)

If those 6 are checked, you can ship this pattern as a paid API endpoint with one weekend's work later.

🐸✦
