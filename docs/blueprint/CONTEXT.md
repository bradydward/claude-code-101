# Context — Claude Code for Business (course/offer)

**Bucket:** J (Planning) | **Profile:** Plan-only | **Milestone:** claude-code-for-business | **Date:** 2026-06-06

## Task
Develop the full blueprint for a paid "Claude Code for Business" course/offer launching next week — content, structure, delivery model, differentiators, supporting tools — that this plan turns into follow-on build phases off the milestone.

## Distribution
- **Who:** Non-technical local-business owners/operators who want to actually *use* Claude Code to build/automate their business (not devs). Warm list/network first.
- **Demand:** $997 validated in prior repo research (20% under Every.to's $1,250 Claude Code 101, same audience, demand 8/10). Open lane: no live, non-dev, business-workflow CC course exists.
- **Where they talk:** Brady's existing audience/outreach, X/LinkedIn, local biz networks; later Skool community + ads.
- **How they find it:** Phase 1 = warm direct outreach + one live workshop. Later = free validator lead-magnet + tripwire + Meta/YouTube ads.
- **Before/after:** Before — "I keep hearing about Claude Code but I'm not a dev and don't know where to start." After — "I shipped a real automation for MY business."
- **30-day success:** First warm cohort sold + ≥1 paying customer testimonial; validator lead-magnet live; referral loop firing at first-win.

## Scope — What We're Planning Into Build Phases
**Scope option:** recommended (milestone with sequenced build phases)
The PLAN.md from this phase defines these follow-on phases (each its own /run phase off the milestone):
1. **Curriculum rebuild** — rebuild CC101 on its `curriculum.md` backbone (16 modules) as the hands-on local lab; keep `install.sh`; decide/validate RPG layer (A/B plan) here.
2. **Idea Validator tool** — scores an attendee's automation idea + outputs build plan + shareable score card. Built into `/run` AND a standalone GitHub-downloadable skill. Differentiator + referral share-artifact + lead magnet.
3. **Academy setup** — enable `communities` flag for Brady's org, author course (recorded video framing per module via Cloudflare Stream), wire progress/completion points, community feed.
4. **Checkout + onboarding** — Stripe Payment Link + CRM-form-first checkout, post-pay intake form + first-session/1:1 scheduler (closes the onboarding leak).
5. **Offer/sales page** — on bradyward.ai, $997-1497 warm high-ticket framing, price visible.
6. **Referral loop** — two-sided incentive, triggered at first-win (first shipped automation).
7. **(Wk2-4, later)** — productize self-serve $297-497 tier + $39/mo community; free Skool community front-of-funnel; tripwire + ads scale layer.

## Scope Fence — What We're NOT Building (this phase / v1)
- NOT building the paid product on Skool (Skool = free front-of-funnel only, added wk2-4).
- NOT building the tripwire/ads funnel for launch week (scale layer, comes after cash).
- NOT putting the RPG/avatars/music on the public Academy/sales surface (lives in the terminal lab only).
- NOT writing any code in THIS phase — J is plan-only.

## Key Decisions
- **Two-layer product:** Brightly Academy (hosted web classroom: video framing, payment, progress, community, 1:1) WRAPS Claude Code 101 (local terminal lab: install.sh + Claude-guided hands-on lessons). One product, two layers — Academy is what you sell, CC101 is where they do the work. Resolves the recorded-vs-live + passive-completion problem.
- **Platform = owned Academy, not Skool:** Keeps the CRM/SMS/email automation moat (students = CRM contacts), own Stripe, own data/margin; Skool Discovery won't deliver cold-start students anyway. Free Skool community added wk2-4 as front-of-funnel only.
- **Gamification = both, separated by surface:** Academy completion-points/badges/community on the public/professional surface (credible, CRM-tied, drives completion + referrals); CC101 RPG (XP/classes/aura/music) kept in the private terminal lab (zero credibility risk, already built). RPG completion-effect A/B validated in the curriculum-rebuild phase.
- **Pricing = warm high-ticket first, scale later:** Week 1 — $997-1497 (recorded + community + 1:1) to warm list, manual close, one live workshop, collect testimonials. Wk2-4 — productize $297-497 self-serve + $39/mo community. Later — free validator + $27 tripwire → cold ads → ascend. Cash-first; ads are the scale layer after cash is in.
- **Idea Validator = the differentiator:** Scores "how well will Claude Code solve YOUR business problem + here's the build plan." No competitor does this. Built into `/run` + standalone GitHub-downloadable skill. Doubles as lead magnet + referral share-artifact.
- **Referral = two-sided at first-win:** Refer a friend at the moment they ship their first automation; they get $X off, referrer gets reward. Research-backed (74% won't refer without a reward).
- **Curriculum backbone = CC101 curriculum.md:** Rebuild on the existing 16-module operator curriculum (its own phase), not from scratch.

## Research Used
- `.run/research/2026-06-06-cc-for-business-course-blueprint/` (RESEARCH.md, internal-assets.md, external-market.md)
- Live source read: `~/Developer/archive/old-projects/claude-code-101/` (curriculum.md, install.sh, progress.json, skill_trees.json) and `~/Developer/projects/brightly-crm/app/src/pages/academy/*` + archived phases `communities-academy-skool-platform` (#749) & `skool-pr2-academy-classroom-authoring` (#750)
- Discuss-round research (3 parallel agents): pricing/offer-architecture, Skool vs owned + mirror strategy, gamification completion/referral evidence

## Constraints
- **Cash crunch / 1-week launch** (project memory: financial crisis gameplan) — fastest-to-cash wins; warm high-ticket before any funnel build.
- **Advisor-first / Build-Buy-Teach posture** (feedback memory) — this is a Teach offer; build only what's simple + high-leverage (validator skill, course setup).
- **bradyward.ai non-negotiables:** light theme, price always visible, anti-slop copy.
- **Brightly Academy ships dark** — `communities` flag off for all orgs; must enable for Brady's org + author content.
- **Distribution-first** (global north star) — every phase ties to enrollments/referral.
