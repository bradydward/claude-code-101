---
phase: 05-guided-project-track
plan: 01
subsystem: curriculum
tags: [guided-project, discovery-wizard, version-contract, project-routing]

# Dependency graph
requires:
  - phase: 04-test-out-system
    provides: Challenge system and progress.json schema foundation
provides:
  - Discovery wizard (4-phase conversational flow from idea to scoped V1)
  - Version contract system (hard 3-feature limit with V2 parking lot)
  - project.json schema for project-specific state
  - guided_project object in progress.json for game state tracking
  - /project commands (/start, /status, /audit, /defense)
  - Project type classification (5 types: static_site, crud_app, api_consumer, game, utility_tool)
affects: [05-02-contextualization, 05-03-routing, 05-04-scope-audits]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "4-phase discovery wizard pattern (Open Capture → Dream Expansion → Value Ranking → Contract Review)"
    - "Version contract pattern (V1 locked, V2 parking lot, scope change tracking)"
    - "Project type classification logic (keyword-based feature analysis)"

key-files:
  created:
    - ".planning/phases/05-guided-project-track/05-01-SUMMARY.md"
  modified:
    - "CLAUDE.md (Section 8a progress.json template, Section 10 Key Commands, Section 16 Guided Project Mode)"

key-decisions:
  - "Hard 3-feature limit for V1 (no exceptions) to enforce ruthless prioritization"
  - "Separate project.json from progress.json (game state vs project state separation)"
  - "4-phase wizard explicitly acknowledges dream BEFORE narrowing (validate vision, then scope)"
  - "Project type classification during Phase 3 based on feature keywords"

patterns-established:
  - "Discovery wizard flow: Open capture → Dream expansion → Value ranking (3-feature hard limit) → Contract review"
  - "Version contract structure: v1_features (locked), v2_parking_lot (deferred), scope_changes (audit trail)"
  - "Project type detection: keyword-based classification from feature descriptions"

# Metrics
duration: 4min
completed: 2026-01-25
---

# Phase 5 Plan 01: Discovery Wizard and Version Contract

**4-phase conversational wizard guides students from vague idea to scoped V1 with exactly 3 features locked in version contract**

## Performance

- **Duration:** 4 min
- **Started:** 2026-01-25T23:10:33Z
- **Completed:** 2026-01-25T23:14:32Z
- **Tasks:** 3
- **Files modified:** 1 (CLAUDE.md)

## Accomplishments
- Discovery wizard with 4 conversational phases (Open Capture, Dream Expansion, Value Ranking, Contract Review)
- Hard 3-feature limit enforced in Phase 3 with iteration loop until exactly 3 confirmed
- Version contract system with V1 locked scope, V2 parking lot, and Week 1 mockup milestone
- Project type classification (5 types) based on feature keyword analysis
- guided_project object added to progress.json schema for tracking active project state
- project.json schema documented with version_contract, milestones, and contextualization_vars
- /project commands integrated into Key Commands with handler documentation

## Task Commits

Each task was committed atomically:

1. **Task 1: Add guided_project to progress.json and document project.json schema** - `93d921a` (feat)
2. **Task 2: Implement 4-phase discovery wizard flow in CLAUDE.md** - `0bdc9f9` (feat)
3. **Task 3: Add /project commands to Key Commands section** - `a97f1f1` (feat, combined with 05-02 work)

_Note: Task 3 was committed as part of a97f1f1 which included both 05-01 and 05-02 changes_

## Files Created/Modified
- `CLAUDE.md` - Added guided_project to progress.json template (Section 8a, line 486), created Section 16: Guided Project Mode with project.json schema, discovery wizard flow (4 phases with conversation examples), project type classification table, and /project command handlers
- `.planning/phases/05-guided-project-track/05-01-SUMMARY.md` - This summary

## Decisions Made

**Hard 3-feature V1 limit (no flexibility)**
- Rationale: Ruthless prioritization is the only way students actually finish projects. 3 features forces "would this be useful with ONLY these?" test. More features = scope creep = abandonment.
- Impact: Phase 3 has iteration loop ("You listed [N]. I need exactly 3. Which ONE can wait for V2?") until exactly 3 confirmed
- Alternative rejected: Flexible 3-5 range would defeat the forcing function

**Acknowledge dream BEFORE scoping**
- Rationale: Phase 2 (Dream Expansion) explicitly validates complete vision before Phase 3 narrows. Prevents deflation ("why are you killing my idea?") and creates buy-in ("I see your vision, now let's be strategic")
- Impact: Wizard feels collaborative, not restrictive. Student sees their full idea reflected back before prioritization.
- Pattern: "That's a fantastic full vision! I can see: [list ALL features]. This would be powerful. Now let's be strategic about getting there..."

**Separate project.json from progress.json**
- Rationale: progress.json tracks game state (XP, stats, progression). project.json tracks project-specific state (version contract, milestones). Mixing them creates namespace pollution and coupling.
- Impact: Clear separation of concerns. project.json created in student's project folder (co-located with project code). progress.json stays in Claude Code 101 folder (game state).
- Pattern: Game state = progress.json. Project state = project.json in project folder.

**Project type classification during Phase 3**
- Rationale: Type affects curriculum routing (which lessons apply, how to contextualize examples). Classify early so Week 1 mockup phase knows what to teach.
- Impact: Classification logic checks feature keywords ("save/store/keep" → crud_app, "weather/fetch/api" → api_consumer, etc.)
- Alternative rejected: Ask student to self-classify (they don't have context to choose accurately)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None - plan specified all required content and structure clearly.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

Ready for 05-02 (Contextualization Variables):
- project.json schema includes contextualization_vars object
- Discovery wizard captures project_name, project_type, and features
- Project type classification logic ready to populate YOUR_APP_NAME, YOUR_DATA_TYPE variables
- Version contract locked features provide context for lesson adaptation

Blockers/Concerns:
- None

---
*Phase: 05-guided-project-track*
*Completed: 2026-01-25*
