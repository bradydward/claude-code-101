---
phase: 02-onboarding-a-flow
plan: 02
subsystem: onboarding
tags: [first-session, name-prompt, xp-award, orientation, tutorial, progress-json]
dependencies:
  requires: []
  provides: [first-session-flow, name-xp-formula, onboarding-fields]
  affects: [02-03, 02-04]
tech:
  added: []
  patterns: [instant-gratification, progressive-tutorial]
files:
  created: []
  modified: [CLAUDE.md, docs/claude/game-mechanics.md]
decisions:
  - id: DEC-02-02-01
    choice: Award 10 XP immediately after name prompt
    rationale: Instant gratification before any technical learning
  - id: DEC-02-02-02
    choice: First-win tutorial AFTER first task (not during name flow)
    rationale: Tutorial explains progression after student experienced it
  - id: DEC-02-02-03
    choice: Web portal check as optional question
    rationale: Non-blocking, sets flag for teaching adjustments
metrics:
  duration: 87 seconds
  completed: 2026-01-24
---

# Phase 2 Plan 02: First Session Onboarding Summary

**One-liner:** Name prompt with instant 10 XP reward, 30-second micro-orientation, and post-M1.L1.T1 first-win tutorial explaining progression system.

## What Was Built

Added complete first-session onboarding flow to CLAUDE.md as new Section 8a (between Session Flow and How to Teach), with automatic routing for new vs returning students.

### New Section: 8a. First Session Flow

**7-Step Onboarding:**

1. **Create progress.json** (if missing) - Full template with `onboarding` and `feature_unlocks` fields
2. **Ask for Name** - Simple welcome prompt
3. **Award Name XP + Orientation** - Instant +10 XP with custom banner, 30-second explanation
4. **Show Status Screen** - Display Level 0, 10 XP, position M1.L1.T1
5. **Check Web Portal** (optional) - Sets `from_web_portal` flag for teaching adjustments
6. **Begin Module 1** - Present first task immediately
7. **First Win Tutorial** - After M1.L1.T1 completion, explain progression system

**Routing Logic:**
- Section 8 (Session Flow) step 0: Check if first session, redirect to 8a if needed
- Section 8a trigger: `progress.json` missing OR `student.name` is null OR `onboarding.orientation_shown` is false
- Returning students: Skip entire Section 8a, go straight to Section 8

### Game Mechanics Documentation

Added "Name Choice XP" subsection to `docs/claude/game-mechanics.md`:
- Formula: +10 XP (fixed, no modifiers)
- One-time award when student provides name
- Does NOT trigger VIS-01 (uses custom welcome banner)
- Authoritative source alongside other XP formulas

### progress.json Schema Extensions

Added two new top-level objects to template:

**onboarding object:**
```json
"onboarding": {
  "from_web_portal": false,       // Did student arrive from web terminal?
  "orientation_shown": false,      // Has 30-second micro-orientation been shown?
  "first_win_tutorial_shown": false  // Has post-M1.L1.T1 tutorial been shown?
}
```

**feature_unlocks object:**
```json
"feature_unlocks": {
  "skill_tree_unlocked": false,   // Unlocks at Level 3
  "shop_unlocked": false,         // Unlocks at Module 6 or Level 5
  "sandbox_unlocked": false       // Unlocks at Level 5
}
```

## Implementation Details

### First-Win Tutorial Content

Displays after M1.L1.T1 (first task completion):

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎉 YOUR FIRST REAL TASK!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

You just earned 10 XP and +1 Speed!

Here's how progression works:
✨ XP - Earn 10 per task, level up every ~100 XP
📊 Stats - 5 stats grow as you learn (Speed, Accuracy,
   Creativity, Efficiency, Aura)
🏆 Levels - Unlock skill points, features, and epic titles

Type "status" anytime to see your full progress.

Ready for task 2? Let's keep going!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Music Integration

- **Name prompt completion:** Pop.aiff (run_in_background: true)
- **First-win tutorial:** Glass.aiff (run_in_background: true)
- Both use non-blocking pattern from music-system.md

### Single-Write Optimization

Step 3 (Award Name XP + Orientation) uses single write operation:
- Read progress.json ONCE (or create from template)
- Calculate ALL updates (name, started date, +10 XP, last_session, orientation flag)
- Write progress.json ONCE (Write tool, not Edit)
- Display results

## Testing Scenarios

### Scenario 1: Brand New Student (No progress.json)

```
Student: "start lesson"
Claude: Section 8 step 0 → no progress.json → redirect to Section 8a
Claude: Step 1 → create progress.json from template
Claude: Step 2 → "Welcome to Claude Code 101! What should I call you?"
Student: "Alex"
Claude: Step 3 → award +10 XP, show orientation banner, play Pop.aiff
Claude: Step 4 → show status (Level 0, 10 XP, M1.L1.T1)
Claude: Step 5 → "Did you try the web terminal tutorial? (yes/no)"
Student: "no"
Claude: Step 6 → present M1.L1.T1
Student: [completes task]
Claude: Step 7 → award task XP, show first-win tutorial, play Glass.aiff
```

### Scenario 2: Returning Student

```
Student: "continue"
Claude: Section 8 step 0 → progress.json exists AND student.name = "Alex" → normal Section 8 flow
Claude: Play welcome sound, read progress, update streak, display status, greet by name, present current task
```

### Scenario 3: Web Portal Arrival

```
Student: "start lesson" (first time, but from web portal)
Claude: Section 8a flow as normal
Claude: Step 5 → "Did you try the web terminal tutorial?"
Student: "yes"
Claude: Set onboarding.from_web_portal = true
Claude: Later teaching → "You remember pwd from the portal?"
```

## Deviations from Plan

None - plan executed exactly as written.

## Technical Decisions

**DEC-02-02-01: Instant XP After Name**
- Award +10 XP immediately after student provides name
- Rationale: Instant gratification before any technical learning begins
- Impact: Student sees progression working before first command
- Alternative considered: Award XP after M1.L1.T1 only (rejected - delays first win)

**DEC-02-02-02: First-Win Tutorial Timing**
- Display tutorial AFTER first task completion (not during name flow)
- Rationale: Tutorial explains progression after student has experienced it (do, then explain)
- Impact: Orientation stays under 30 seconds, tutorial has context
- Alternative considered: Explain everything during name flow (rejected - too much upfront)

**DEC-02-02-03: Web Portal Check as Optional Question**
- Ask about web portal as yes/no question (not automatic detection)
- Rationale: Non-blocking, simple, sets flag for teaching adjustments
- Impact: Section 14 (Web Onboarding Awareness) can reference portal progress
- Alternative considered: Auto-detect via cookies/URL params (rejected - requires web integration)

## Requirements Met

### From 02-CONTEXT.md

**ONBD-02:** Student enters Claude Code terminal and starts first conversation within 5 minutes
- ✅ Name prompt IS the first conversation
- ✅ No installer blocking (progress.json created inline)
- ✅ 30-second orientation gets student to first task quickly
- ✅ Total time: Name prompt (10s) + Orientation (30s) + Status (5s) + Web check (10s) = 55 seconds to first task

**ONBD-05:** Student sees first-win tutorial exactly once after first real task
- ✅ Tutorial triggers after M1.L1.T1 completion
- ✅ Flag `onboarding.first_win_tutorial_shown` prevents repeat display
- ✅ Tutorial explains progression AFTER student experienced it

### From Plan Objective

- ✅ Name prompt with immediate 10 XP award
- ✅ 30-second micro-orientation (Step 3 display)
- ✅ Status screen display (Step 4)
- ✅ Post-M1.L1.T1 first-win tutorial (Step 7)
- ✅ Updated game-mechanics.md with name XP formula
- ✅ Updated progress.json schema with onboarding fields
- ✅ Students see progression working before technical learning
- ✅ Returning students resume instantly from saved position

## Files Changed

### CLAUDE.md
- **Section 8 step 0:** Added first-session redirect check
- **Section 8a (NEW):** 7-step first-session flow (210 lines)
- **Location:** Between Section 8 (Session Flow) and Section 9 (How to Teach)

### docs/claude/game-mechanics.md
- **Section 1:** Added "Name Choice XP" subsection
- **Formula:** +10 XP (fixed, no modifiers)
- **Purpose:** Authoritative XP calculation reference

## Next Phase Readiness

**Enables:**
- **02-03:** Installer can reference Section 8a flow for first-run setup
- **02-04:** Progressive disclosure can check `feature_unlocks` flags
- **Web portal integration:** `onboarding.from_web_portal` flag ready for teaching adjustments

**Blocks:** None

**Follow-up Work:**
1. Create curriculum.md if missing (referenced in Step 6)
2. Implement status display formatting (referenced in Step 4)
3. Test Section 14 (Web Onboarding Awareness) with `from_web_portal = true`

## Success Metrics

**Time to First Win:**
- Name prompt to first task: ~55 seconds (under 5-minute goal)
- Name prompt to first task completion: ~2-3 minutes (including task execution)
- Total first session: ~5 minutes to first-win tutorial

**Student Experience:**
- Instant gratification: +10 XP before any technical learning
- Micro-orientation: 30 seconds (3 bullet points)
- First-win tutorial: Explains progression after student experienced it
- No installer blocking: progress.json created inline

**Code Quality:**
- Single-write optimization: Step 3 uses one write operation
- Non-blocking music: Both sounds use run_in_background pattern
- Authoritative formulas: Name XP documented in game-mechanics.md
- Schema completeness: onboarding and feature_unlocks fields ready

## Commits

1. **1f089e4** - feat(02-02): add first-session onboarding flow to CLAUDE.md
   - Add Section 8a with 7 steps
   - Add Section 8 step 0 redirect
   - Add progress.json template with onboarding and feature_unlocks objects
   - 206 lines added

2. **4c241aa** - docs(02-02): add name choice XP formula to game-mechanics.md
   - Add "Name Choice XP" subsection
   - Formula: +10 XP (fixed, no modifiers)
   - 10 lines added

**Total:** 2 tasks, 2 commits, 216 lines added, 0 lines removed, 2 files modified

---

**Duration:** 87 seconds
**Status:** ✅ Complete
**Next Plan:** 02-03 (One-Click Installer)
