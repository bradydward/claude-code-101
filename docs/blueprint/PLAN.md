---
phase: claude-code-for-business-course-offer-full-develop
bucket: J
ambition_tier: 10x
war_room_verdict: PROCEED_WITH_CHANGES
total_tasks: 9
date: 2026-06-06
milestone: claude-code-for-business
---

# Plan — Claude Code for Business (course/offer master blueprint)

**Bucket:** J (Planning) | **Milestone:** claude-code-for-business | **Build phases:** 9 | **Date:** 2026-06-06

> This is the master blueprint. It is **plan-only** — no code ships from this phase. Each "Phase" below
> becomes its own `/run` build phase off the `claude-code-for-business` milestone, inheriting the locked
> decisions in CONTEXT.md. The critical path for a **next-week warm high-ticket launch** is marked 🚀.
>
> **⚠️ War-room revision (applied):** The Academy is currently **operator-only internal team-training** —
> no buyer-facing student portal, login, or self-enrollment exists (verified in CRM code). So the
> wk1 sale is **decoupled from the Academy**: deliver cohort #1 **live (Zoom/Meet) + the existing
> terminal lab repo**, record AS you teach (zero pre-recorded video for v1). Cash path =
> **P1 (FULL CC101 rebuild — Brady chose full up front) → P5 sales page → Stripe Payment Link → P6 workshop → close.**
> P3 (Academy student portal) and full P4 are **post-first-sale**. See PLAN-REVIEW.md.

---

## 1. The Product, in one sentence

> **"In one week, ship a real automation for YOUR business using Claude Code — guided, with a community and 1:1 support."**

Two layers, one product:
- **Brightly Academy** (hosted web, what you sell): short recorded video framing per module + payment + progress + completion points + community feed + 1:1 booking. Students are CRM contacts.
- **Claude Code 101 lab** (their terminal, where they do the work): `install.sh` + Claude-guided hands-on lessons. The RPG layer stays here (private, optional, A/B-validated), never on the sales surface.

The video is the *frame*; the terminal is where learning happens. This fixes the two failure modes: recorded courses are passive (Academy adds accountability + community + gamification), and raw repos have no payment/structure (Academy wraps them).

---

## 2. Curriculum flow — curated for non-dev business owners

CC101 has 16 modules. For a one-week "ship one automation" outcome we **curate, not dump.** Each module = a short Academy video (you record once) + a Claude-guided CC101 terminal lesson.

| # | Module (from CC101) | Depth | Why it's in (or out) |
|---|---------------------|-------|----------------------|
| 0 | **Validate your idea** (NEW) | Core | Run the Idea Validator → pick the ONE automation you'll ship. Becomes your capstone target. The spine. |
| 1 | M1 Terminal basics | Light | `install.sh` removes most of the pain; just enough to not be scared of the terminal. |
| 2 | M2 Install Claude Code | Core | `install.sh` one-command. The #1 non-dev wall — kill it on day 1. |
| 3 | M3 First conversations | Core | Talking to Claude, creating files by conversation. |
| 4 | M5 Prompting like a pro | Core | Context, multi-step, iterating. The highest-leverage skill. |
| 5 | M6 Plan mode | Core | Safe exploration before executing — confidence for non-devs. |
| 6 | M11 Connect your tools (MCP) | Core | THE business unlock — connect their real tools (Sheets, CRM, calendar, Gmail). |
| 7 | M13 Ship YOUR automation | **Capstone** | Guided build of the thing they validated in Module 0. The transformation moment. |
| — | M4 models / M7 JSON+paths / M8 git / M9 website / M10 agents | Bonus/drip | Available as drip support modules, not the spine. Light touch in-line where needed. |
| — | M14 Ralph autonomous loops / M15-16 | Advanced drip | Post-capstone "what's next" — keeps the offer feeling deep without bloating week 1. |

**The spine:** Module 0 (validate → pick) → Modules 1-6 (skills) → Module 7 (ship the validated automation) → **first-win moment** → referral prompt + shareable score card. Everyone leaves with one working automation, not a tour of features.

---

## 3. Slide / HTML flow

**A. Live launch workshop deck** (the wk1 sales + delivery event — HTML slides via the project's `design-html` / reveal-style):
1. Hook — "Everyone's talking about Claude Code. You're not a dev. Here's how you actually use it for your business."
2. The gap — free courses are async + dev-leaning; nobody shows a business owner how to ship.
3. Live demo — run the **Idea Validator** on a volunteer's real business idea → score + build plan on screen.
4. The path — the 7-step spine (Module 0→7), framed as "you'll leave with one automation live."
5. Ship-something-live — walk the room through installing + one tiny automation in real time (proof it's doable).
6. The offer — $997-1497, recorded course + community + 1:1, price visible. (anti-slop, no kill-words)
7. Referral close — "bring someone who'd build with you" two-sided incentive.

**B. Academy lesson page template** (per module, repeated): video embed (Cloudflare Stream) → "▶ Now do this in your terminal" callout with the exact `start lesson` command → in-lesson checklist → **Mark complete** (fires completion points + progress %) → "post your win" community nudge.

**C. Sales/offer page** (`bradyward.ai/claude-code-for-business`): hero promise → before/after → the 7-step path → what's included (course + community + 1:1 + validator) → price (visible) → workshop registration / checkout → FAQ → referral note.

---

## 4. Build-phase roadmap (the deliverable — each becomes its own /run phase)

🚀 = on the critical path for the **next-week warm high-ticket launch**.

### Phase 1 🚀: Curriculum rebuild — the CC101 business lab repo (FULL rebuild, up front)
*(Brady decision: **full rebuild before launch**, not light-touch — accepts the added build days for a polished product day one. This is the dedicated CC101 redo/optimization phase. Front of the critical path: it's the delivery surface for cohort #1.)*
**New repo/dir:** `claude-code-for-business` lab (rebuilt from `~/Developer/archive/old-projects/claude-code-101`)
**Depends on:** none | **Risk:** moderate | **Bucket (when run):** C
**Hypothesis:** A non-dev can go from zero → installed → first Claude conversation in their first session using `install.sh` + the curated Module 1-3 lessons, with fewer than one support ticket per student on setup.
**What to do:**
- Rebuild on `curriculum.md` backbone; curate to the 7 spine modules (§2) + bonus/drip modules.
- Keep `install.sh` (the non-dev wall-killer). Verify it on a clean machine.
- Author the **NEW capstone (Module 7)** lesson: "ship the automation you validated."
- Gate the RPG layer (XP/classes/aura/music) behind a flag, **default off** for the pro launch; keep code intact for the A/B test.
- Lesson driver: `start lesson` flow that lets Claude teach interactively (port from CC101 `.claude/` + progress.json).
**done_when:**
- [ ] `install.sh` on a clean macOS account installs Claude Code + opens to `start lesson` with zero manual steps (screenshot/recording).
- [ ] All 7 spine modules present in `curriculum.md` with the capstone authored.
- [ ] RPG flag defaults off; `progress.json` light-mode (progress %, points, completion) works without RPG assets.
- [ ] **RPG A/B validation plan** documented in the phase (cohort-with-RPG vs without → completion delta) per the deferred decision.

### Phase 2: Idea Validator — the differentiator
*(wk1 needs only a ROUGH `/validate-idea` prompt Brady runs live in the workshop demo. The polished GitHub-downloadable skill + shareable score card = post-first-sale.)*
**Files:** new GitHub repo `claude-code-idea-validator` (downloadable skill) + a `/run`-ecosystem skill in dotfiles
**Depends on:** none | **Risk:** moderate | **Bucket (when run):** C
**Hypothesis:** ≥60% of workshop attendees who run the validator share or screenshot their score card, and validated-idea students complete the capstone at a higher rate than non-validated.
**What to do:**
- Define the scoring rubric: **Claude-Code fit** (can CC realistically build this?), **complexity** (one-week-shippable?), **business ROI** (time/$ saved), **clarity** of the idea. Output 0-100 + sub-scores.
- Output a **shareable score card** (clean HTML/image): score, one-line verdict, the recommended build plan, "validated by Claude Code for Business" badge. Doubles as referral artifact.
- Ship two forms: (a) a Claude Code **skill** anyone downloads from GitHub and runs locally (`/validate-idea`), (b) wired into the course `/run` flow as Module 0.
- (Later/Phase 9) a hosted web version as the cold-ads lead magnet — NOT this phase.
**done_when:**
- [ ] `git clone` + install the skill → run on a sample business idea → returns 0-100 + sub-scores + build plan + score card. (terminal recording)
- [ ] Score card renders as a shareable image/HTML with the badge.
- [ ] Rubric documented so scores are consistent across runs (same idea → same band).

### Phase 3: Academy setup + content authoring — **POST-FIRST-SALE**
> 🛑 **BLOCKER surfaced by war-room (code-verified):** The Academy today is **operator-only internal team-training** — `/academy` + `/community` sit behind the operator login (admin/manager roles), framed "Training built for your team." There is **no buyer-facing student portal, no contact login, no self-enrollment, no checkout.** A $997 student is a CRM *contact*, not an operator, and **cannot log in to watch lessons today.** So this phase is **a multi-day build of a contact-auth + enrollment + student-portal subsystem**, NOT a flag flip. It is delivery infrastructure — do it AFTER the first sale. Wk1 delivery = live + the terminal lab repo.
**Files:** brightly-crm (`communities` flag + NEW contact-facing student portal/auth/enrollment) + Academy authoring + Cloudflare Stream uploads
**Depends on:** Phase 1 (content) | **Risk:** hot (new auth surface) | **Bucket (when run):** C/E
**Hypothesis:** A purchased student can log in, see the course, watch Module 0, and land in the community within their first session, with progress tracked.
**What to do:**
- Enable `communities` flag for Brady's org (currently dark for all orgs).
- Author the course: 7 spine modules as Academy modules; record + upload the short video framing per module (Cloudflare Stream).
- Wire completion points + progress per the existing ledger; set up the cohort community feed.
- Verify students-as-CRM-contacts: a test purchase appears as a CRM contact.
**done_when:**
- [ ] Brady's org has `communities` on; `/academy` route renders the course with 7 modules.
- [ ] Each module has a published video + the "now do this in your terminal" lesson page.
- [ ] Completing a module awards points + advances progress % (verified in prod DB).
- [ ] A test enrollment shows up as a CRM contact with the course tagged.

### Phase 4: Checkout + post-pay onboarding (the leak)
*(wk1 🚀 = **Stripe Payment Link ONLY** — that closes the warm sale. The CRM-form-first checkout + intake form + 1:1 scheduler + onboarding sequence are **post-first-sale** fulfillment. Verify the Stripe org + create the link on day 1 — the only true payments dependency that can't be faked live.)*
**Files:** Stripe Payment Link (wk1) → CRM-form-first checkout + intake form + 1:1 scheduler (post-sale)
**Depends on:** none for the wk1 link slice; full checkout depends on Phase 3 | **Risk:** hot (payments) | **Bucket (when run):** E
**Hypothesis:** ≥90% of buyers complete the post-pay intake form and book their 1:1 within 24h (vs stalling), preserving the ~98% SMS-confirmation rate.
**What to do:**
- Create Stripe Payment Link for the high-ticket tier ($997-1497) in the correct org.
- CRM-form-first checkout (capture lead → payment) so buyers enter the CRM + automation flow.
- Post-pay: intake form (their business + chosen automation idea) + first-session / 1:1 scheduler (CRM appointments).
- Trigger the onboarding SMS/email sequence on payment.
**done_when:**
- [ ] Live test purchase end-to-end → buyer becomes CRM contact → intake form delivered → 1:1 booking link works (real browser E2E, not just curl).
- [ ] Stripe Payment Link live + verified in the correct Stripe org (`198c8188-...`).
- [ ] Onboarding sequence fires on payment (confirmed in CRM).
- [ ] Brady follow-up items: none.

### Phase 5 🚀: Offer / sales page on bradyward.ai
**Files:** `site/claude-code-for-business.html` (+ nav)
**Depends on:** Phase 4 (checkout link) | **Risk:** moderate | **Bucket (when run):** C
**Hypothesis:** The sales page converts ≥10% of warm-traffic visitors to workshop registration or checkout in the first week.
**What to do:**
- Build the offer page (§3C). Invoke `frontend-design`. Light theme, mobile-first, **price visible**, anti-slop copy (pass kill-word audit).
- Workshop registration + checkout CTA wired to Phase 4.
- OG image + SEO meta, reader-benefit framing (lead with their outcome, not Brady's story).
**done_when:**
- [ ] Page live at `bradyward.ai/claude-code-for-business`, price visible, mobile + desktop screenshots.
- [ ] CTA → Phase 4 checkout/registration works E2E in a real browser.
- [ ] Copy passes the anti-slop audit (no kill-words).
- [ ] PostHog pageview + CTA-click events firing.

### Phase 6 🚀: Launch workshop deck + run
**Files:** `site/claude-code-for-business-workshop.html` (HTML slide deck)
**Depends on:** Phase 2 (validator demo), Phase 5 (offer/CTA) | **Risk:** safe | **Bucket (when run):** C
**Hypothesis:** The live workshop closes ≥1 high-ticket sale during or within 48h of the event.
**What to do:**
- Build the 7-slide deck (§3A) via `design-html`. Live validator demo built into the flow.
- Dry-run the "ship something live in the room" segment.
- Date-accurate scheduling copy (check the shell for the real weekday).
**done_when:**
- [ ] Deck renders as HTML slides, mobile + desktop, opens in browser for Brady review.
- [ ] Validator demo + offer CTA embedded and working.
- [ ] Workshop scheduled with correct date/day language.

### Phase 7: Referral loop — two-sided at first-win
**Files:** brightly-crm referral trigger + Academy first-win hook
**Depends on:** Phase 3 (completion event) | **Risk:** moderate | **Bucket (when run):** E
**Hypothesis:** ≥20% of students who hit first-win send ≥1 referral within 7 days; ≥1 referral converts in the first cohort.
**What to do:**
- Trigger the referral prompt at the **first shipped automation** (capstone complete), not at signup.
- Two-sided incentive: friend gets $X off, referrer gets reward. Tracked in CRM.
- Tie the validator score card as the share artifact.
**done_when:**
- [ ] Completing the capstone fires the referral prompt (verified in prod).
- [ ] Referral link attributes both sides in the CRM; reward applies on conversion.

### Phase 8 (wk2-4): Self-serve tier + recurring community
**Depends on:** Phases 1-7 (validated content + testimonials) | **Risk:** moderate | **Bucket (when run):** C
**Hypothesis:** The $297-497 self-serve tier + $39/mo community produces recurring revenue without Brady's live time.
**What to do:** Productize the recorded course as a self-serve tier; stand up the $39/mo community membership; decouple from live delivery.

### Phase 9 (later): Scale layer — lead magnet + tripwire + ads + free Skool funnel
**Depends on:** Phase 8 | **Risk:** moderate | **Bucket (when run):** G
**What to do:** Hosted web Idea Validator as the free lead magnet → $27 tripwire → cold Meta/YouTube ads pointed at the **owned** sales page (own pixel/attribution). Free Skool community as front-of-funnel (light content only; paid stays on Academy). Ascend buyers into core + high-ticket.

---

## 5. Launch sequence — next week (cash-first)

**War-room-revised, cash-first.** Sequenced by cash value (solo founder can't truly parallelize):

| Stage | Critical-path work | Goal |
|-------|--------------------|------|
| **Day 1** | Verify Stripe org + create the **Stripe Payment Link** ($997-1497) | The one payments dependency, locked early |
| **Stage 1** | **P1 — FULL CC101 rebuild/optimization** (curate to 7 spine modules + capstone, verify install.sh, RPG flag + A/B plan) | Polished lab/delivery surface, day one (Brady chose full up front) |
| **Stage 2** | P5 sales page (price visible, CTA → Payment Link) | The thing you sell |
| **Stage 3** | P6 workshop deck + rough live `/validate-idea` demo | The room you sell in |
| **Stage 4** | **Run the live workshop → warm high-ticket close** | First $997-1497 sales + testimonials |
| **Delivery** | Run cohort #1 **live (Zoom/Meet) + the terminal lab repo**; record sessions AS you teach | Fulfill — zero pre-recorded video needed |
| Post-first-sale | P3 Academy student portal, full P4, polished P2 validator, P7 referral | Productize delivery + word-of-mouth |
| Scale | P8 self-serve tier, P9 ads/tripwire/Skool | Scale past live time |

**The sale happens at the workshop + warm outreach — NOT inside the Academy.** Deliver cohort #1 live + the lab repo; the Academy student-portal build comes after the first dollar. That ordering is what makes a one-week cash launch actually realistic.

---

## 6. Analytics events (wire across phases)

| Event | Where | Why |
|-------|-------|-----|
| `validator_run` / `validator_card_shared` | Validator (P2) | Top-of-funnel + referral signal |
| `sales_page_view` / `sales_cta_click` | Offer page (P5) | Conversion funnel |
| `workshop_registered` / `workshop_attended` | P6 | Live-event funnel |
| `checkout_started` / `purchase_completed` | P4 | Revenue |
| `intake_completed` / `onenoone_booked` | P4 | Onboarding leak metric |
| `module_completed` / `capstone_shipped` (first-win) | Academy (P3) | Completion + referral trigger |
| `referral_sent` / `referral_converted` | P7 | Word-of-mouth loop |

30-day success: ≥1 paying customer + testimonial, validator live, capstone-completion tracked, referral loop firing.

## 7. Marketing / distribution

- Sales page (P5) + workshop deck (P6) are the core assets.
- Warm outreach list/sequence (Brady's network) — the wk1 channel. Draft in the sell phase of P5/P6.
- Validator score card = organic share engine (built P2).
- Reader-benefit framing throughout (their outcome, not Brady's story — nobody knows Brady yet).
- Anti-slop audit on all copy (brady-candidates.yaml kill words).

## Scope Fence Reminder (from CONTEXT.md)
- NOT building the paid product on Skool (free funnel only, wk2-4 / P9).
- NOT building the tripwire/ads funnel for launch week (P9, after cash).
- NOT putting RPG/avatars/music on the public Academy/sales surface (terminal lab only).
- No code in THIS J phase — plan only.
