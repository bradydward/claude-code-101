# War Room Review — Claude Code for Business blueprint

**Verdict: PROCEED_WITH_CHANGES** — the cash-this-week path is real, but only by decoupling the sale from the Academy and deferring 4 of 6 "critical path" phases to post-sale.

## Reviewer: adversarial architect + skeptical co-founder (read the real CRM code)

### BLOCKERS (folded into PLAN.md)

1. **Academy has no buyer-facing front door — it's internal team-training, not a storefront.**
   Confirmed in code: `/academy`, `/academy/admin`, `/community` sit behind `RequireFeature("communities")` AND the operator login (`AuthContext.login(email,password)`), gated to `OPERATOR_ROLES = {admin, manager}`. `index.tsx` reads "Training built for your team." There is no public/contact portal route, no self-enrollment, no checkout. A $997 student is a CRM *contact*, not an operator — today they literally cannot log in and watch a lesson.
   → **P3 is a multi-day build of a contact-auth/enrollment/student-portal subsystem that does not exist — NOT a flag flip.** Remove it from the wk1 critical path.
   Key files: `brightly-crm/app/src/pages/academy/index.tsx`, `app/src/App.tsx` (academy/community routes behind operator auth), `app/src/contexts/AuthContext.tsx` (operator-only login).

2. **The plan's own §5 says the sale doesn't need Academy, but the roadmap contradicts it by marking P3+P4 🚀.**
   → True minimum to take a warm high-ticket sale this week: **P5 (sales page) + a Stripe Payment Link (a thin slice of P4) + P6 (workshop, run live).** Deliver cohort #1 **live (Zoom/Meet) + the existing terminal lab repo directly.** Academy becomes wk2 delivery polish, after cash is in.

3. **Video recording for 7 modules is the hidden launch-killer, on the wrong side of the sale.**
   → **v1 launches live-only, zero pre-recorded video. Record AS the live cohort runs** (the sessions become the recordings). Deletes the production bottleneck from the critical week.

### CONCERNS
- P2 Idea Validator as critical path is gold-plating. Wk1 needs only a rough `/validate-idea` prompt Brady runs live in the workshop demo. Defer the polished GitHub skill + shareable score card to post-sale.
- P4 over-scoped for wk1: a bare Stripe Payment Link closes the sale; CRM-form-first checkout + intake form + SMS/email onboarding sequence are post-first-dollar fulfillment.
- Solo founder can't truly parallelize P1+P2 in one week. Sequence by cash value, not parallel tracks.

### SUGGESTIONS
- Critical path → **P1 (light: verify install.sh + readable 7 modules, NOT full rebuild) → P5 → Stripe link → P6 → run workshop → close.**
- Tag each deferred phase "post-first-sale" to stop mid-week scope creep.
- Verify the Stripe org + create the Payment Link on day 1 — the only true payments dependency that can't be faked live.

### Codex track
Skipped (no code diff in a plan-only J phase). Single-agent adversarial review with live codebase read substituted.
