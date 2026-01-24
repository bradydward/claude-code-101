---
phase: 01-core-experience-polish
plan: 05
subsystem: game-mechanics
tags: [rpg, stats, class-bonuses, streak-system, skill-trees, aura]

# Dependency graph
requires:
  - phase: 01-02
    provides: Curriculum structure with stat_tag assignments for lessons
  - phase: 01-03
    provides: Visual celebration templates for displaying completions
  - phase: 01-04
    provides: Shop system requiring Aura economy calculations
provides:
  - Game mechanics calculation formulas (XP, stats, streaks, skills, Aura)
  - Explicit class bonus rules for all 6 classes
  - Authoritative calculation reference in CLAUDE.md
affects: [teaching-flow, performance-optimization, beginner-onboarding]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Game mechanics formula documentation pattern (explicit step-by-step calculations)"
    - "Streak freeze auto-activation logic (weekly reset, class variations)"

key-files:
  created: []
  modified:
    - "CLAUDE.md"

key-decisions:
  - "MECHANICS-DOC-01: Explicit calculation formulas as authoritative reference"
  - "VERIFICATION-GAP-01: Human verification found 4 critical gaps requiring closure"

patterns-established:
  - "MECHANICS-DOC-01: All game formulas documented with worked examples (XP, stats, streaks, skills, Aura)"
  - "VERIFICATION-GAP-01: Verification checkpoints can identify gaps that require closure plans"

# Metrics
duration: 8min
completed: 2026-01-24
---

# Phase 1 Plan 5: Game Mechanics Verification Summary

**Explicit calculation formulas for XP, stats, streaks, skills, and Aura documented in CLAUDE.md - human verification identified 4 critical gaps requiring closure**

## Performance

- **Duration:** 8 minutes
- **Started:** 2026-01-24T05:15:00Z
- **Completed:** 2026-01-24T05:23:00Z
- **Tasks:** 3 (2 auto, 1 checkpoint)
- **Files modified:** 1 (CLAUDE.md)

## Accomplishments
- Game mechanics calculation rules documented with explicit formulas
- All 6 class bonuses specified with exact stat gains
- Streak freeze logic handles all edge cases (same day, consecutive, gap with/without freeze)
- Progress.json validated against formulas (internally consistent)
- **Human verification completed: gaps identified for closure**

## Task Commits

Each task was committed atomically:

1. **Task 1: Document Game Mechanics Calculation Rules** - `950bc6e` (docs)
2. **Task 2: Validate Progress.json Against Formulas** - No commit (progress.json gitignored, validated only)
3. **Task 3: Human Verification Checkpoint** - Completed (gaps found)

**Plan metadata:** (pending - this commit)

## Files Created/Modified
- `CLAUDE.md` - Added Section 21 "Game Mechanics Calculation Rules" with explicit formulas for:
  - Task completion XP (base + class bonuses)
  - Stat growth per task (lesson stat_tag + class primary bonuses)
  - Streak freeze logic (auto-activation, weekly reset, edge cases)
  - Skill unlock stat bonuses (read from skill_trees.json)
  - Aura economy (earning vs spending vs glow/reputation)
  - Easter egg trigger (4+ lessons, Chaos Agent at 3)

## Decisions Made

**MECHANICS-DOC-01: Explicit Calculation Formulas as Authoritative Reference**
- **Decision:** Document all game mechanics as step-by-step formulas with worked examples
- **Rationale:** Eliminates interpretation errors - any Claude instance applies identical calculations
- **Impact:** CLAUDE.md Section 21 becomes source of truth for all game math
- **Context:** Covers XP, stats, streaks, skills, Aura economy with specific numbers

**VERIFICATION-GAP-01: Verification Found Gaps Requiring Closure**
- **Decision:** Document gaps and pause Phase 1 completion until closed
- **Rationale:** Critical performance and UX issues block production readiness
- **Impact:** Orchestrator will create gap closure plans before Phase 1 complete
- **Context:** 4 gaps identified (CLAUDE.md size, command namespace, permissions, teaching flow)

## Deviations from Plan

None - plan executed exactly as written. Verification checkpoint worked as designed (found gaps).

## Issues Encountered

None during plan execution. Issues surfaced during human verification (documented as gaps).

## Verification Results

**Status:** Gaps Found (verification complete, issues identified)

**What Was Verified:**
- Player status display rendering
- Teaching pattern (single conversation, collaborative tone)
- Task completion celebrations (visual + sound)
- Shop system (`/shop` command, browsing, purchasing)

**What Works:**
✅ Overall tone is collaborative and encouraging ("Let's..." not "Go do this...")
✅ Teaching approach feels right (beginner-friendly, patient)

**Gaps Identified:**

### GAP-01: CLAUDE.md Performance Issue
- **Category:** Performance (Critical Blocker)
- **Details:** CLAUDE.md is 71.8k characters (threshold: 40k)
- **Impact:** File too large, impacts loading time. Status display slow to render after writing.
- **User feedback:** "Status display slow to render after writing"
- **Recommendation:** Split CLAUDE.md or restructure (move reference content out)
- **Affects:** All teaching sessions (CLAUDE.md loaded in every conversation)

### GAP-02: Command Namespace Collision
- **Category:** UX (Critical Blocker)
- **Details:** `/shop` command conflicts with GSD skill system slash commands
- **Impact:** User typed `/shop` but triggered GSD system instead of game shop
- **User feedback:** "Typed `/shop` but triggered GSD skill system instead of game shop"
- **Recommendation:** Different command structure (e.g., `shop` without slash, or `@shop` prefix)
- **Affects:** All slash commands (`/status`, `/skills`, `/streak`, etc.)

### GAP-03: Permission Friction
- **Category:** UX (Critical Blocker)
- **Details:** User must approve commands constantly during teaching
- **Impact:** Deters beginner users (breaks immersion, adds friction)
- **User feedback:** "User needs to approve commands constantly - this deters beginner users"
- **Recommendation:** Document `dangerously-skip-permissions` flag for this project
- **Affects:** Onboarding experience, beginner retention

### GAP-04: Teaching Flow Performance
- **Category:** Architecture (Performance Issue)
- **Details:** Main terminal gets bogged down with verbose output
- **Impact:** Teaching flow feels slow, main conversation cluttered
- **User feedback:** "Main terminal gets bogged down with verbose output. Use GSD-style background agents for tasks."
- **Recommendation:** Delegate heavy lifting to background agents (keep main conversation light)
- **Affects:** All teaching sessions, status displays, celebrations

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

**Status:** Blocked - gaps must be closed before Phase 1 complete

**Blockers:**
1. **GAP-01 (CLAUDE.md size)** - Must split or restructure before production use
2. **GAP-02 (command namespace)** - Must resolve collision before shop/stats commands work reliably
3. **GAP-03 (permissions)** - Must document dangerously-skip-permissions pattern for beginners
4. **GAP-04 (teaching flow)** - Should optimize before scaling to full curriculum

**Next Steps:**
- Orchestrator creates gap closure plans (01-06, 01-07, 01-08, 01-09 or combined)
- Close all gaps before Phase 1 marked complete
- Re-verify end-to-end experience after gap closure

**What's Ready:**
- Game mechanics formulas documented and validated
- Progress.json structure consistent
- Teaching pattern established (single conversation)
- Celebration system wired (visual + sound)
- Shop system implemented (needs namespace fix)

---
*Phase: 01-core-experience-polish*
*Completed: 2026-01-24*
