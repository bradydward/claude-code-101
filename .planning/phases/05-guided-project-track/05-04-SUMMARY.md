---
phase: 05-guided-project-track
plan: 04
type: summary
subsystem: guided-project
completed: 2026-01-25
duration: 1m 43s

tags:
  - scope-audit
  - feature-creep
  - version-contract
  - project-discipline

requires:
  - 05-01-discovery-wizard

provides:
  - weekly-scope-audit
  - creep-confession-handling
  - park-swap-options

affects:
  - student-teaching-flow
  - project-completion-rate

tech-stack:
  patterns:
    - gentle-but-firm-accountability
    - park-vs-swap-options
    - 3-feature-hard-limit

key-files:
  created: []
  modified:
    - CLAUDE.md

decisions:
  - id: weekly-audit-trigger
    choice: "7+ days automatic trigger"
    rationale: "Weekly cadence catches drift early without feeling micromanaged"
    alternatives: ["daily check", "on-demand only"]

  - id: park-over-swap-default
    choice: "Recommend park, allow swap with challenge"
    rationale: "Park preserves V1 scope (shipping priority). Swap requires friction (prevents impulse changes)"
    alternatives: ["always swap", "block all changes"]

  - id: hard-3-feature-limit
    choice: "No 4th feature, ever, period"
    rationale: "Soft limits don't work - students negotiate. Hard limit forces real prioritization"
    alternatives: ["flexible 3-5 range", "case-by-case judgment"]

---

# Phase 05 Plan 04: Weekly Scope Audit & Creep Handling Summary

**One-liner:** Weekly 5-minute scope check prevents feature creep through gentle-but-firm accountability with park/swap options

---

## What Was Built

Added weekly scope audit system to Section 16 (Guided Project Mode) of CLAUDE.md with two major components:

**1. Weekly Scope Audit Flow**
- Automatic trigger: Runs if 7+ days since last audit when student starts session
- Manual trigger: `/project audit` command
- Audit display: Shows V1 commitment, V2 parking lot, and 3 quick check questions
- Clean audit path: 30-second confirmation if no creep detected
- Dual file updates: Updates both project.json (last_audit) and progress.json (last_scope_audit)

**2. Scope Creep Handling**
- Creep confession flow: Validates student's honesty, presents options
- Park It option (recommended): Moves new idea to V2 parking lot, keeps V1 unchanged
- Swap It option (rare): Replaces existing V1 feature, requires justification challenge
- Gentle pushback: Firm but kind refusal of 4th feature requests
- scope_changes tracking: Records all swaps in project.json with date/reason

**Design Philosophy:**
Feature creep is the #1 reason beginner projects fail. This system surfaces drift early, handles confessions gracefully, and maintains the 3-feature discipline without feeling authoritarian.

---

## Key Decisions Made

### Decision 1: 7-Day Automatic Trigger
**Context:** How frequently should scope audits run?

**Options considered:**
- Daily check (too frequent, feels micromanaged)
- On-demand only (students forget, drift accumulates)
- 7+ days automatic (catches drift early, weekly feels natural)

**Choice:** 7+ days automatic trigger

**Rationale:** Weekly cadence is aggressive enough to catch creep early but not so frequent it feels like nagging. Students can still trigger manually via `/project audit` if they want to confess early.

**Implementation:** Check `days_since_audit = today - guided_project.last_scope_audit` at session start if `guided_project.active` is true.

---

### Decision 2: Recommend Park, Allow Swap with Challenge
**Context:** When student wants to add a feature not in V1, how should we respond?

**Options considered:**
- Always swap (no parking lot, forces replacement)
- Block all changes (too rigid, frustrates students)
- Recommend park, allow swap with challenge (balanced)

**Choice:** Recommend park, allow swap with justification friction

**Rationale:** Parking lot preserves V1 scope (shipping priority) while honoring student's idea ("it's not lost, just V2"). Swap option exists but requires answering 3 challenge questions to create friction and prevent impulsive changes.

**Implementation:** Creep confession flow presents both options, recommends parking, makes swap require explicit confirmation after challenge questions.

**Why it works:** Most students park. The friction prevents "new and shiny" syndrome. Swap exists for genuine priority shifts.

---

### Decision 3: Hard 3-Feature Limit (No Exceptions)
**Context:** Should we ever allow a 4th feature? What if student promises it's small?

**Options considered:**
- Flexible 3-5 range (student decides)
- Case-by-case judgment (Claude evaluates)
- Hard 3-feature limit, period (no flexibility)

**Choice:** Hard 3-feature limit, no exceptions, no negotiation

**Rationale:** Soft limits don't work. Students will negotiate, argue "it's small," and scope creeps to 5-6 features. Hard limit forces REAL prioritization ("which ONE matters most?"). This is the entire point of the Version Contract.

**Implementation:** Gentle pushback pattern explicitly states "V1 stays at exactly 3 features. That's the deal." Offers park or swap, never "okay let's add a 4th."

**Why it works:** Forcing function. Students learn prioritization by being forced to choose, not by being allowed to add everything.

---

## Technical Implementation

### File Updates
**CLAUDE.md Section 16:**
- Added "Weekly Scope Audit" subsection (lines 1772-1845)
- Added "Handling Scope Creep" subsection (lines 1847-1981)
- Total: 211 lines added

**Key Patterns:**
1. **Trigger Logic:** Check days_since_audit >= 7 at session start
2. **Clean Audit:** Update both files, display confirmation, continue lesson
3. **Park Option:** Append to v2_parking_lot array, update last_audit
4. **Swap Option:** Update v1_features array, move removed to v2_parking_lot, record in scope_changes
5. **Gentle Pushback:** Never allow 4+, always redirect to park or swap

### Data Structures
**project.json updates:**
```json
"version_contract": {
  "last_audit": "2026-01-25",
  "v2_parking_lot": ["Photo uploads", "Social sharing"],
  "scope_changes": [
    {
      "date": "2026-01-25",
      "type": "swap",
      "removed": "Organize by category",
      "added": "Photo uploads",
      "reason": "Student realized photos are more essential for recipe sharing"
    }
  ]
}
```

**progress.json updates:**
```json
"guided_project": {
  "last_scope_audit": "2026-01-25"
}
```

---

## Verification

**All success criteria met:**
1. ✅ Weekly scope audit runs automatically at 7+ days
2. ✅ Clean audit takes under 5 minutes (30 seconds if no creep)
3. ✅ Creep confession handled with park/swap options
4. ✅ Swap requires removing existing feature (3-feature constant)
5. ✅ "Just add it" requests are firmly but gently declined
6. ✅ All scope changes tracked in project.json

**Must-haves verified:**
- ✅ Weekly scope audit runs in 5 minutes (30s clean path documented)
- ✅ Scope creep is detected and addressed gently (confession flow)
- ✅ Student can swap V1 features only by removing another (swap option)
- ✅ New ideas go to V2 parking lot automatically (park option default)

**Key links verified:**
- ✅ CLAUDE.md /project audit → Section 16: Weekly Scope Audit (line 1649)
- ✅ Audit flow → project.json version_contract updates (last_audit, scope_changes)
- ✅ Session start → last_scope_audit check pattern

---

## What's Next

**Immediate:**
- 05-05: Implement portfolio defense presentation
- Integration: Wire scope audit into session flow (step after welcome, before lesson)

**Future:**
- Analytics: Track scope_changes patterns to identify common creep triggers
- Insights: "You've had 3 scope audits, 0 creep - you're staying disciplined!"
- Metrics: Average audit duration, park vs swap ratio, creep frequency

**Dependencies:**
This plan completes Wave 2 (Week 1 Mockup + Scope Audit). Wave 3 begins with portfolio defense implementation.

---

## Deviations from Plan

None - plan executed exactly as written.

Plan specified:
- Task 1: Document weekly scope audit flow ✅
- Task 2: Document scope creep confession handling ✅

Both tasks delivered as specified with all verification criteria met.

---

## Metrics

**Commits:**
- 2e55177: docs(05-04): add weekly scope audit flow
- fa3066e: docs(05-04): add scope creep handling with park/swap options

**Files Modified:**
- CLAUDE.md: +211 lines (2 subsections added to Section 16)

**Duration:** 1m 43s (103 seconds)
- Task 1: ~50s (weekly audit flow)
- Task 2: ~53s (creep handling)

**Verification:** 10/10 criteria passed

---

## Learning & Insights

### Insight 1: Scope Creep is Universal
Every beginner project faces this. Acknowledging it ("scope creep happens to everyone!") removes shame and creates psychological safety for confessions. Students confess when they don't feel judged.

### Insight 2: Options Create Autonomy
Presenting "Park It" or "Swap It" (not just "no") respects student agency. They choose the path, but both paths maintain the 3-feature limit. Autonomy within structure.

### Insight 3: Friction Prevents Impulse
The swap option's 3 challenge questions create just enough friction to prevent "new and shiny" syndrome. Most students realize during the questions that parking makes more sense. Friction is a feature, not a bug.

### Insight 4: Hard Limits Teach Prioritization
Allowing 4 features would defeat the entire purpose. The discomfort of choosing "which ONE can wait for V2?" is the learning moment. That's where real prioritization skill develops.

---

## Next Phase Readiness

**Ready for 05-05 (Portfolio Defense):**
- ✅ Scope audit system documented and ready to integrate
- ✅ project.json patterns established (last_audit, scope_changes)
- ✅ V1 feature discipline enforced through multiple mechanisms

**Blockers:** None

**Open Questions:** None

**Technical Debt:** None

**Future Enhancements:**
- Audit analytics dashboard ("Your scope audits: 5 clean, 1 swap, 0 park")
- Scope creep heatmap (which features get swapped most often?)
- Discipline streak tracking (X consecutive clean audits)

---

*Summary created: 2026-01-25*
*Phase 5 Plan 4: Weekly Scope Audit & Creep Handling - COMPLETE*
