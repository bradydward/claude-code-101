---
phase: 04-test-out-system
plan: 01
subsystem: curriculum-assessment
tags: [test-out, module-challenges, competency-validation, progressive-disclosure]

requires:
  - 02-03-PLAN.md  # Progressive disclosure pattern established
  - curriculum.md  # Module content to design challenges around

provides:
  - Module challenge designs for Modules 2-4 (Installing Claude Code, First Conversations, Models)
  - Challenge announcement pattern for module-start discovery
  - Validation framework (automated + conversational + practical layers)
  - /challenge command integration in Key Commands

affects:
  - 04-02-PLAN.md  # Will extend pattern to Modules 5-7
  - 04-03-PLAN.md  # Will implement validation engine using these designs
  - Section 8 (Session Flow)  # Will integrate announcement at module start

tech-stack:
  added: []
  patterns:
    - Mixed validation (automated + conversational + practical)
    - Progressive challenge discovery (announced at module start)
    - Full reward parity (challenge path = lesson path XP/badges)

key-files:
  created: []
  modified:
    - CLAUDE.md  # Added Section 15 (Module Challenges), updated Section 10 (Key Commands)

decisions:
  - Challenge duration target: 5-10 minutes per module (quick proof of knowledge)
  - Validation layers: Automated checks (Bash/Read tools) + conversational understanding + practical demonstration
  - Topic summaries: Module 2 (npm/API keys/CLIs), Module 3 (file creation/capabilities), Module 4 (models/when to use)
  - Announcement timing: Every module start (2-7) if Module 1 complete
  - Command: /challenge (slash command, fits with system commands)

metrics:
  duration: 2m 15s
  completed: 2026-01-25
---

# Phase 4 Plan 01: Module Challenges Design (M2-M4) Summary

**One-liner:** Challenge validation system for Modules 2-4 using mixed validation (automated + conversational + practical) to test npm/installation, file creation/capabilities, and model selection competencies in 5-10 minutes each.

## What Was Built

Added Section 15 (Module Challenges - Test-Out System) to CLAUDE.md with complete challenge designs for Modules 2, 3, and 4:

**Module 2 Challenge: Installing Claude Code**
- 3 validation scenarios (~7 min total)
- Tests: API keys/authentication, npm global installation, first Claude Code launch
- Automated: Verify `claude --version` works
- Conversational: Explain -g flag purpose and why needed
- Practical: Demonstrate checking if global package installed
- Badge on pass: Setup Champion 🏆

**Module 3 Challenge: First Conversations + Class Selection**
- 4 validation scenarios (~8 min total)
- Tests: File creation via conversation, specific vs vague prompts, capability boundaries
- Practical: Create file through conversation, verify with Read tool
- Conversational: Explain prompt specificity and Claude Code scope (can't check weather)
- Required: Class selection if not already selected
- Badge on pass: First Contact 🏆

**Module 4 Challenge: Claude Code Models**
- 3 validation scenarios (~6 min total)
- Tests: Model differences (Haiku/Sonnet/Opus), when to use each, switching via /model command
- Automated: Verify model switching works
- Conversational: Explain Haiku vs Opus use cases, identify Sonnet as default and why
- Badge on pass: Model Master 🏆

**Challenge Announcement Pattern:**
- Template for module-start display
- Topic summaries for each module
- Announcement rules (show every module 2-7, wait for response, branch on /challenge vs continue)
- Example flow showing how announcement surfaces the option

**Key Commands Integration:**
- Added `/challenge` to Section 10 table
- Description: "Test out of current module (Modules 2-7, requires Module 1 complete)"

## Validation Framework

Defined three-layer validation approach:

1. **Automated checks** - Bash/Read tools verify files, commands, outputs (objective, fast, consistent)
2. **Conversational validation** - Ask conceptual questions, accept paraphrasing (test understanding not memorization)
3. **Practical demonstrations** - Student performs task, Claude verifies (prove capability not just knowledge)

**Timing guidance:**
- Each challenge designed for 5-10 minutes
- No hard time limit (avoid pressure/anxiety)
- If taking longer than 10 min, gently suggest lesson path may be better fit

**Pass criteria philosophy:**
- All scenarios must pass to complete challenge
- Accept paraphrasing and alternative phrasings for conversational validation
- Test understanding of "why" not just execution of "how"

## Technical Decisions

**Challenge content design:**
- Compress module lessons into 3-5 essential validation scenarios
- Module 2: 3 scenarios vs 17 tasks in lesson path
- Module 3: 4 scenarios vs 19 tasks in lesson path
- Module 4: 3 scenarios vs 18 tasks in lesson path
- Same competencies tested, faster validation for experienced students

**Discovery pattern:**
- Announced at EVERY module start (2-7) if Module 1 complete
- Framed as option not pressure: "Already familiar with X? Type /challenge..."
- Wait for student response before proceeding
- Branch: /challenge → start validation, "continue" → start Lesson 1

**Prerequisite logic:**
- Module 1 must be complete (check `completed.modules` array)
- Student must be at module start position (lesson 1, task 1)
- Modules 2-7 only (Module 1 has no challenge option - establishes baseline)

## Deviations from Plan

None - plan executed exactly as written.

Both tasks completed successfully:
1. Added Section 15 with complete Module Challenges system (overview, trigger pattern, challenges for M2/M3/M4, validation approach)
2. Added Challenge Announcement subsection with template, topic summaries, rules, and integrated /challenge into Key Commands

## Next Phase Readiness

**Ready for 04-02-PLAN.md (Challenge Design for Modules 5-7):**
- Validation framework established (automated + conversational + practical)
- Challenge structure pattern proven (competencies → scenarios → pass criteria → badge)
- Timing target clear (5-10 minutes)
- Announcement pattern ready to extend with Module 5/6/7 topic summaries

**Ready for 04-03-PLAN.md (Validation Engine Implementation):**
- Challenge designs complete for Modules 2-4 (reference scenarios to implement)
- Pass/fail logic clear (all scenarios must pass)
- Retry policy defined (unlimited retries, kind feedback)
- Reward parity documented (full XP/badge parity with lesson path)

**Ready for 04-04-PLAN.md (Integration & Announcements):**
- Announcement template ready to integrate in Session Flow
- /challenge command documented in Key Commands
- Prerequisites check logic defined (Module 1 complete, at module start)

**No blockers:** All prerequisite decisions made in CONTEXT.md (validation approach, duration, reward parity). Research provided framework (mixed validation, challenge patterns, competency-based assessment). Implementation can proceed immediately.

## Commits

- `7b636f2` - feat(04-01): add module challenges section with M2-M4 designs
- `d69f982` - feat(04-01): add challenge announcement pattern

**Duration:** 2 minutes 15 seconds
**Files modified:** 1 (CLAUDE.md)
**Lines added:** 345 lines (Section 15 + Key Commands update)

---

*Plan completed: 2026-01-25*
*Phase: 04-test-out-system*
*Executor: Claude Sonnet 4.5*
