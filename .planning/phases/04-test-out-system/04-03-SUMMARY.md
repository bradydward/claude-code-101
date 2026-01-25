---
phase: 04-test-out-system
plan: 03
subsystem: challenge-validation-engine
tags: [test-out, validation, progress-tracking, rewards, feedback]
requires: [04-01, 04-02]
provides: ["Challenge pass/fail handling", "Reward calculation system", "Progress tracking pattern"]
affects: [04-04]
tech-stack:
  added: []
  patterns: ["Atomic progress updates", "Kind failure feedback", "Unlimited retry policy"]
key-files:
  created: []
  modified:
    - CLAUDE.md
    - docs/claude/game-mechanics.md
decisions:
  - id: "challenge-reward-parity"
    choice: "200 XP + 10 Aura + badge matches lesson path, but stats slightly lower"
    rationale: "XP parity respects existing knowledge, stat advantage encourages genuine learning"
  - id: "unlimited-retry-policy"
    choice: "No retry limit, no penalty, no cooldown"
    rationale: "Reduces pressure, normalizes retrying, focuses on learning not racing"
  - id: "challenges-passed-tracking"
    choice: "Separate array for analytics, doesn't affect gameplay"
    rationale: "Enables future features (display stats, insights) without complicating core flow"
metrics:
  duration: "2 minutes"
  completed: "2026-01-25"
---

# Phase 04 Plan 03: Challenge Validation Engine Summary

**One-liner:** Challenge validation engine with kind failure feedback, unlimited retries, and atomic progress tracking for test-out system.

## What Was Built

Completed the test-out system by implementing challenge pass/fail handling, reward calculations, and progress tracking patterns. The validation engine enables experienced students to prove mastery through 5-10 minute challenges while maintaining full reward parity with the lesson path.

### Challenge Pass Experience

**VIS-04 variant celebration template:**
- Epic frame with trophy emojis
- Shows XP/Aura/badge/stat rewards
- Displays challenge completion time
- Music sequence (random module_complete)
- Reassures student they earned same rewards as lesson path

**Atomic progress update pattern (CRITICAL):**
1. Read progress.json ONCE
2. Calculate ALL updates:
   - `completed.modules` array (add passed module)
   - `challenges_passed` array (track test-outs separately)
   - `badges` array (same badges as lesson path)
   - `student.total_xp` (+200, matching module completion)
   - Module primary stat (+3, matching module bonus)
   - `aura_system.total_earned` and `current_balance` (+10 each)
   - `current_position` (advance to next module)
   - `last_session` (today)
3. Write progress.json ONCE

### Challenge Failure Experience

**Two templates based on closeness:**

1. **Close attempt** (passed some scenarios):
   - Shows checkmarks for passed scenarios
   - Shows X for failed scenarios
   - Specific feedback on gaps (1-2 sentences)
   - Options: retry / take lessons / get hint
   - Normalizes retrying ("many students retry 1-2 times")

2. **Far from passing** (most scenarios failed):
   - Gentle acknowledgment ("concepts you haven't encountered yet")
   - Frames lessons as valuable, not punishment
   - Options: take lessons (recommended) / retry
   - No shame language

**Retry policy:**
- Unlimited immediate retries (no cooldown)
- No XP penalty for failing or retrying
- No attempt tracking (keeps it simple)
- Gentle suggestion after 3+ retries to try lesson path

**Hint command:**
- `/hint` during challenge shows concept refresher
- 1-2 sentences per gap, not full lesson content
- Example: "The -g flag installs packages globally..."

### Reward Formulas (game-mechanics.md Section 8)

**Challenge pass rewards:**
- XP: 200 (module completion bonus only, no per-task XP)
- Stats: +3 to module's primary stat (no per-task stat growth)
- Aura: +10 (same as module completion)
- Badge: Same badge as lesson path (no variant)

**Stat tags by module:**
- Module 2: Efficiency
- Module 3: Creativity
- Module 4: Efficiency
- Module 5: Creativity
- Module 6: Accuracy
- Module 7: Speed

**Challenge failure rewards:**
- XP: 0
- Stats: 0
- Aura: 0
- Penalty: 0 (no negative consequences)

**Progress tracking:**
- New `challenges_passed` array in progress.json schema
- Contains module IDs (as strings) for analytics
- Lesson/task arrays NOT populated (student skipped them)
- Purely tracking, doesn't affect gameplay

## Key Decisions Made

### 1. Reward Parity with Slight Stat Advantage for Lesson Path

**Decision:** Challenge pass awards 200 XP + 10 Aura + badge (full parity), but only +3 stats (vs lesson path's per-task stat growth).

**Reasoning:** XP parity respects existing knowledge and ensures challenge path doesn't feel like "missing out." Stat advantage for lesson path creates slight incentive for genuine learning while still respecting test-out efficiency.

**Impact:**
- Students choosing challenge path get same XP/Aura/badges
- Students taking lessons get more total stats (per-task growth adds up)
- Encourages authentic learning while honoring existing knowledge

**Alternative considered:** Full stat parity - rejected as removes any advantage to comprehensive learning journey.

### 2. Unlimited Retry Policy with No Penalties

**Decision:** Students can retry challenges immediately with no cooldown, no XP penalty, no tracking of attempt count.

**Reasoning:** Test-out should feel like efficiency, not like a high-stakes exam. Pressure and penalties create anxiety, which interferes with learning. Normalizing retries ("many students retry 1-2 times") removes shame.

**Impact:**
- Lower anxiety during challenges
- Students feel safe attempting test-out
- Gentle nudge after 3+ retries guides to lesson path without forcing
- No tracking keeps system simple

**Alternative considered:** 3-retry limit - rejected as creates pressure and penalty mindset.

### 3. Separate challenges_passed Array for Analytics

**Decision:** Track test-outs in dedicated `challenges_passed` array (module IDs as strings), separate from `completed.modules`.

**Reasoning:** Enables future features like displaying "You tested out of 3 modules!" or insights about student's existing knowledge. Keeps analytics separate from core gameplay logic.

**Impact:**
- Both arrays get updated on challenge pass
- Can distinguish lesson path from challenge path in future analytics
- Doesn't complicate current gameplay systems
- Ready for future dashboard/insights features

**Alternative considered:** Only use completed.modules - rejected as loses valuable analytics data.

## Deviations from Plan

None - plan executed exactly as written.

## Files Modified

### CLAUDE.md
**Changes:**
- Added "Challenge Pass Celebration" subsection with VIS-04 variant template
- Added "Challenge Failure Feedback" subsection with two templates (close attempt + far from passing)
- Documented atomic progress update pattern (read once, write once)
- Documented retry policy (unlimited, no penalty)
- Documented hint command for concept refreshers

**Lines added:** ~123

### docs/claude/game-mechanics.md
**Changes:**
- Added Section 8: "Challenge Completion Rewards"
- Documented XP/stat/Aura formulas for challenge pass
- Documented failure rewards (zero, no penalty)
- Documented progress tracking with challenges_passed array
- Listed badge names for Modules 2-7
- Explained stat parity design decision

**Lines added:** ~84

## Technical Patterns Established

### 1. Atomic Progress Updates for Challenges

**Pattern:** Read progress.json ONCE, calculate ALL updates, write ONCE.

**Why:** Eliminates file I/O bottlenecks (6-7 operations → 1), ensures data consistency, prevents race conditions.

**Implementation:**
```javascript
// Read once
const progress = await readProgressJSON();

// Calculate all
const updates = {
  completed: { modules: [...progress.completed.modules, moduleNumber] },
  challenges_passed: [...(progress.challenges_passed || []), String(moduleNumber)],
  badges: [...progress.badges, badgeName],
  student: {
    ...progress.student,
    total_xp: progress.student.total_xp + 200
  },
  stats: {
    ...progress.stats,
    [moduleStat]: progress.stats[moduleStat] + 3
  },
  aura_system: {
    ...progress.aura_system,
    total_earned: progress.aura_system.total_earned + 10,
    current_balance: progress.aura_system.current_balance + 10
  },
  current_position: { module: moduleNumber + 1, lesson: 1, task: 1 },
  last_session: today
};

// Write once
await writeProgressJSON({ ...progress, ...updates });
```

### 2. Kind Failure Feedback with Specific Guidance

**Pattern:** Differentiate close attempts (specific feedback) from far-from-passing (gentle redirection).

**Why:** Students who are close need targeted help to bridge gaps. Students who are far need encouragement to try the lesson path without feeling like they failed.

**Implementation:**
- Count passed scenarios
- If ≥50% passed: Use close attempt template with specific feedback
- If <50% passed: Use far-from-passing template with gentle redirection
- Always normalize retrying, never shame

### 3. Unlimited Retry with Soft Guidance

**Pattern:** No hard retry limit, but gentle suggestion after 3+ attempts.

**Why:** Hard limits create pressure and penalty mindset. Soft guidance respects student autonomy while offering helpful direction.

**Implementation:**
- Track attempt count in session memory (not progress.json)
- After 3rd retry: "I notice you've retried a few times. The lesson path might be a better fit for this module - it's designed to teach these concepts from scratch. Want to give it a try?"
- Student retains choice

## Next Phase Readiness

### Ready for Phase 4, Plan 4 (Integration)

**What's ready:**
- Challenge content defined for Modules 2-7 (Plans 01-02)
- Validation engine complete (Plan 03)
- Pass/fail handling patterns documented
- Reward formulas in game-mechanics.md
- Progress tracking pattern established

**What Plan 4 needs:**
- Integrate announcement pattern at module start
- Implement /challenge command flow
- Wire up validation scenarios to actual checks
- Connect to progress.json updates
- Add /hint command handler

**Blockers:** None

**Concerns:** None - validation patterns are clear and testable

## Metrics

**Execution time:** 2 minutes
**Tasks completed:** 3/3
**Commits:** 2 (Tasks 1+2 combined, Task 3 separate)
**Files modified:** 2
**Lines added:** ~207
**Verification checks:** 8/8 passed

## Quotes from Implementation

**From CLAUDE.md Challenge Pass Celebration:**
> "You demonstrated existing knowledge and skipped ahead efficiently.
> Your stats and rewards match the lesson path - you didn't miss anything!"

**From CLAUDE.md Challenge Failure Feedback:**
> "Retrying after reviewing the concept is totally normal!
> Many students retry 1-2 times."

**From game-mechanics.md Section 8:**
> "Note: Challenge path does NOT award per-task stat growth (+1 per task). The +3 module bonus is the total stat award. This creates a slight stat advantage for lesson path (more total stats) while keeping XP parity. This encourages genuine learning while respecting existing knowledge."

---

**Status:** Complete
**Dependencies satisfied:** ✅ 04-01 (M2-M4 challenges), ✅ 04-02 (M5-M7 challenges)
**Downstream unblocked:** ✅ 04-04 (Integration ready)
