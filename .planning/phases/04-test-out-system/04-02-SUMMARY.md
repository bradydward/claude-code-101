---
phase: 04-test-out-system
plan: 02
subsystem: curriculum
tags: [challenges, validation, prompting, plan-mode, technical-foundations, module-5, module-6, module-7]

# Dependency graph
requires:
  - phase: 04-test-out-system
    provides: Module Challenges section with Modules 2-4
provides:
  - Module 5 Challenge: Writing Prompts Like a Pro (4 validation scenarios)
  - Module 6 Challenge: Plan Mode - Safe Exploration (3 validation scenarios)
  - Module 7 Challenge: Technical Foundations (5 validation scenarios)
  - Topic summaries for challenge announcements (Modules 5-7)
  - Complete test-out system for Modules 2-7 (22 total scenarios)
affects: [curriculum, CLAUDE.md, test-out-teaching-flow]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Conversational validation pattern - accepts paraphrasing, tests understanding not memorization"
    - "Practical demonstration pattern - student performs task, Claude verifies capability"
    - "Hybrid validation pattern - combines automated checks with conceptual understanding"

key-files:
  created: []
  modified:
    - CLAUDE.md

key-decisions:
  - "Module 5 uses 4 scenarios (8 min) due to prompting pattern complexity"
  - "Module 7 allows 4 of 5 pass (slight leniency for broader technical foundations)"
  - "Challenge duration ranges from 6-10 minutes based on scenario count and complexity"

patterns-established:
  - "Validation approach notes: Each scenario explains WHY that validation type (automated/conversational/practical)"
  - "Topic summaries format: Concise comma-separated phrases for announcement template"
  - "Pass criteria flexibility: Modules 2-6 require all scenarios, Module 7 allows 4 of 5"

# Metrics
duration: 4min
completed: 2026-01-25
---

# Phase 4 Plan 2: Module Challenges for Modules 5-7

**Advanced module test-out challenges for prompting, plan mode, and technical foundations with conversational and practical validation**

## Performance

- **Duration:** 4 min
- **Started:** 2026-01-25T05:12:27Z
- **Completed:** 2026-01-25T05:16:40Z
- **Tasks:** 3
- **Files modified:** 1

## Accomplishments

- Module 5 Challenge tests prompt engineering competencies (context-rich prompting, multi-step instructions, iterating, patterns)
- Module 6 Challenge validates plan mode understanding (preview concept, when to use, mode control)
- Module 7 Challenge covers technical foundations (JSON, file types, paths, file management, error handling)
- All 6 modules (2-7) now have complete challenge definitions with 22 total validation scenarios
- Topic summaries added for announcement template integration

## Task Commits

Each task was combined into a single atomic commit due to logical cohesion:

1. **Task 1: Add Module 5 Challenge (Prompting)** - `1077651` (feat)
2. **Task 2: Add Module 6 Challenge (Plan Mode)** - `1077651` (feat)
3. **Task 3: Add Module 7 Challenge (Technical Foundations)** - `1077651` (feat)

**Combined commit rationale:** All three tasks extend the same Module Challenges section in CLAUDE.md. Single commit prevents partial state (having 5 but not 6, or 6 but not 7). User experiences complete Modules 5-7 as cohesive addition.

## Files Created/Modified

- `CLAUDE.md` - Added Module 5, 6, 7 challenges to Section 15 (Module Challenges), updated topic summaries in Challenge Announcement subsection

## Decisions Made

**Module 5 scenario count:** 4 scenarios (~8 min)
- Rationale: Prompting patterns are more nuanced than mechanical skills. Vague-to-specific transformation, multi-step creation, "show your work" pattern, and options vs single answer each test distinct competencies. 3 would be insufficient, 5 would exceed 10-minute target.

**Module 7 leniency (4 of 5 pass):**
- Rationale: Module 7 covers broader technical foundations (JSON, file types, paths, commands, errors) compared to focused modules. Requiring perfect 5/5 may gatekeep students strong in most areas. 80% pass threshold (4 of 5) validates competency while acknowledging breadth.

**Challenge duration variation (6-10 min):**
- Module 6: 3 scenarios, 6 min (focused on single feature - plan mode)
- Module 5: 4 scenarios, 8 min (pattern-heavy prompting)
- Module 7: 5 scenarios, 10 min (broadest technical scope)
- Rationale: Duration reflects complexity and scope, not arbitrary uniformity. All fit within 5-10 minute guideline.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## Next Phase Readiness

- Complete test-out system ready for Modules 2-7 (22 validation scenarios)
- Module 8+ do not have test-out challenges (Git, Web Building, Agents, MCP, Advanced Patterns, Shipping, Autonomous Loops, Graduation are experiential and cannot be validated via Q&A)
- Challenge announcement template ready with all 6 topic summaries
- Validation approach documented with three-layer pattern (automated/conversational/practical)
- Ready for Phase 4 Plan 3: Challenge flow implementation in teaching logic

---
*Phase: 04-test-out-system*
*Completed: 2026-01-25*
