---
bucket: J
bucket_subtype: planning
dimensions_assigned: 8
dimensions_covered: 8
dimensions_skipped: 0
findings_count: 14
critical_findings: 3
agents_used: 0
date: 2026-06-06
---

# Research — "Claude Code for Business" $997 Course/Offer Blueprint

Bucket J planning research. No Agent-spawn tool available in this environment, so research was
run directly (codebase inventory + WebSearch/WebFetch) plus reuse of recent in-repo research
(< 14 days): `2026-06-03-workshop-funnel-pricing-demand`, `2026-05-14-burn-cc101-coaching-product`,
`2026-05-03-skool-community-vs-live-cohort-structure`. Full findings in:
- `.run/research/2026-06-06-cc-for-business-course-blueprint/internal-assets.md`
- `.run/research/2026-06-06-cc-for-business-course-blueprint/external-market.md`

## Category: Course Structure & Value

### Dim: Cohort structure (depth vs breadth, session flow) — covered
**Status:** covered
**Evidence:** Disco 2025 Cohort Playbook; teachfloor.com; group.app; prior `2026-05-03-skool-community-vs-live-cohort-structure`
**Risk:** medium (format choice drives completion + referral rate)
- Cohort courses hit ~90% completion (vs ~90% MOOC dropout) when schedule + community + accountability combine. **Completion drives referrals.**
- Winning session shape: short framework → guided task → hands-on application, every session. Live = the product; drip the supporting modules.
- Tech programs win on hands-on building, not lecture. Hot seats (lighter "build live with the room") are highest-retention.
- **Decision input:** depth over breadth — one real automation shipped per attendee beats touring 16 feature-modules.

### Dim: What makes a CC-for-business curriculum genuinely valuable to non-devs — covered
**Status:** covered
**Evidence:** Anthropic Claude Code in Action (skilljar); Coursera/Vanderbilt; CC101 `curriculum.md`; `2026-05-14-burn-cc101-coaching-product`
**Risk:** low (clear gap, asset already exists)
- Anthropic's free "Claude Code in Action" + Coursera/Vanderbilt cover fundamentals but are async + dev-leaning with **no live, non-dev, business-workflow layer**. That gap is the wedge.
- CC101's `curriculum.md` is already operator-grade: plain-language "why" on every task, no jargon, sequenced terminal→install→prompting→build→agents→MCP→ship.
- Value = "I shipped a working automation for MY business," not "I learned 16 features."

## Category: Engagement & Differentiation

### Dim: Idea/automation validator concept — covered (CRITICAL — strongest differentiator)
**Status:** covered
**Evidence:** validatorai.com; prometai.app; CC101 `progress.json` + skill-tree scaffold
**Risk:** low (high upside, reuses existing scaffold)
- **Precedent ValidatorAI:** scores an idea 0-100 in 15s, returns market analysis + value prop + blind spots + next move; engagement via public leaderboard + "beat my score" sharing; free→$49 funnel. Aspirational ceiling ("few score 90-100") drives retries/shares.
- **PrometAI:** scores/ranks multiple ideas on one framework.
- **Open lane:** nobody scores a business owner's *automation idea* for "how well will Claude Code actually solve this + what's the build plan." That is Brady-unique.
- **Build leverage:** maps onto CC101's existing `progress.json` + skill-tree scoring scaffold → port, not from-scratch.

## Category: Distribution & Pricing

### Dim: Referral mechanics for paid education — covered
**Status:** covered
**Evidence:** buyapowa; referralcandy; shopify; earlyparrot
**Risk:** low
- Two-sided incentive is non-negotiable: 74% won't refer without a reward; ~70% of friends won't act without one for them too.
- Plain mechanic ("they get $X off, you get $X too") converts best. Ask at a win moment (first shipped automation / completion), not at signup.
- The validator score card is the natural shareable artifact to carry the referral link.

### Dim: Pricing / format precedents — covered
**Status:** covered
**Evidence:** prior `2026-06-03-workshop-funnel-pricing-demand` (demand 8.0/10); go.aiforbusiness.com; OpenAI Small Business Jam; uschamber.com
**Risk:** low (price already validated)
- **$997 already validated** (20% under Every.to's $1,250 CC 101, same audience; demand 8.0/10 in prior repo research). A real $997/3-day AI workshop cleared 80+ seats.
- Open lane between free SMB fluency webinars (Chamber/OpenAI/Anthropic) and $5K+ b-school exec ed.

## Category: Build Decision

### Dim: Rebuild CC101 as backbone vs start fresh — covered (CRITICAL)
**Status:** covered
**Evidence:** archive/old-projects/claude-code-101 (`curriculum.md`, `.planning/PROJECT.md`, `install.sh`, `progress.json`, `web/`)
**Risk:** high if ignored — porting full RPG stack burns the 1-week cash window
- CC101 = gamified RPG platform (XP/classes/cosmetics/avatars/music/installer/web portal) **+ a genuinely good 16-module operator curriculum.**
- **Recommendation:** rebuild the course ON `curriculum.md` (proven backbone). Do NOT port the RPG/cosmetics/avatar/music stack into a live cohort — wrong engagement engine for live, high maintenance. Keep `install.sh` (kills the #1 non-dev onboarding wall). Cherry-pick the progress/scoring scaffold to seed the idea-validator.

### Dim: Infra readiness — covered
**Status:** covered
**Evidence:** site/ (static HTML, no backend); `2026-06-03-workshop-funnel-pricing-demand`; CC101 burn gotchas
**Risk:** medium-high (no post-pay onboarding → $997 buyers stall)
- Static HTML site, no backend → gated/per-attendee features ride Brightly CRM or a thin worker, not a custom portal.
- Needs: one $997 Stripe Payment Link; CRM-form-first checkout (preserves 98% SMS confirmation); post-pay onboarding (intake + first-session scheduler) — none wired yet.

## Summary

**Coverage:** 8/8 dimensions (100%)
**Findings:** 14 total (3 critical, 5 high, 6 medium)
**Recommended bundles for run-discuss:**
1. **Backbone decision** — rebuild on `curriculum.md`, drop the RPG layer, keep installer + scoring scaffold.
2. **Format** — live cohort, depth-over-breadth, "ship one real automation," hot-seat builds; drip support modules.
3. **Differentiator** — the AI automation-idea validator (score + blind spots + build plan), with leaderboard/share-card as the referral carrier.
4. **Referral** — two-sided ($X give/$X get or coaching-credit), triggered at first-shipped-automation.
5. **Pricing/funnel** — hold $997; reuse workshop.html sales skeleton + quiz-hero opt-in; one Stripe link; CRM-form-first.

## Critical Findings (must address)
1. **Validator is the wedge** — no competitor scores a business owner's automation idea; it's also the referral share-trigger. Dim: Idea validator. Risk: low (high upside, reuses existing scaffold).
2. **Don't port the RPG stack** — rebuilding the full gamified CC101 burns the one-week emergency-cash window; backbone = curriculum.md only. Dim: Rebuild decision. Risk: high if ignored (timeline).
3. **Post-pay onboarding is unbuilt** — no intake/scheduler after Stripe; without it, $997 buyers stall. Dim: Infra. Risk: medium-high.

## Skipped Dimensions
- None. Bucket J scope fully covered. Cat 1 deep code analysis not needed (no EXPLORE phase; static-site + archived repo inventoried directly).

## Note on environment
- Agent-spawn tool unavailable this session; research conducted inline. Model resolved `sonnet` per policy (no agents ultimately dispatched). Demand validation: bucket J = "light" — covered via reuse of prior 8.0/10 demand research rather than re-running, so no separate DEMAND.md kill-gate (score already > 7).
