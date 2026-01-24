# Phase 4: Test-Out System - Context

**Gathered:** 2026-01-24
**Status:** Ready for planning

<domain>
## Phase Boundary

Students can demonstrate mastery through module challenges for Modules 2-7. Successful challenge completion awards full module XP/stats/badges and unlocks next module. Failed attempts allow retry or normal lesson progression. This is a validation and skip system - not new teaching content.

</domain>

<decisions>
## Implementation Decisions

### Challenge Structure & Validation
- **Target duration:** 5-10 minutes per challenge (quick proof of knowledge)
- **Validation approach:** Claude's discretion - mix automated checks (files, commands) with conversational validation where appropriate
- **Challenge format:** Claude's discretion - design challenges that best validate each module's learning goals (compressed tasks vs new scenarios)
- **Environment:** Claude's discretion - some modules need temp sandbox, others benefit from real workspace

### Success/Failure Experience
- **Pass celebration:** Epic victory celebration - full VIS-04 module completion frame + music + "You proved your mastery!" Same fanfare as lesson path
- **Failure feedback:** Claude's discretion - provide feedback appropriate to how close they were (specific gaps vs general encouragement)
- **Retry policy:** Claude's discretion - balance accessibility with encouraging thorough learning
- **Comparative feel:** Claude's discretion - design experience that feels appropriate for demonstrating existing knowledge vs learning journey

### Reward Parity & Progression
- **XP equivalence:** Claude's discretion - design XP structure that feels fair and motivates right behavior
- **Stat growth:** Claude's discretion - reflect challenge path appropriately (same gains vs efficiency emphasis)
- **Cheat sheet updates:** Claude's discretion - handle appropriately for challenge completions (auto-populate vs condensed vs skip)
- **Badge distinction:** Claude's discretion - recognize both paths appropriately (identical vs variant vs separate)

### Discovery & Triggering
- **Discovery method:** Announced at module start - "Already know this? Type /challenge to test out."
- **Command:** `/challenge` (slash command, fits with system commands)
- **Trigger timing:** Claude's discretion - decide if mid-module challenges make sense or start-only
- **Prerequisites:** Claude's discretion - determine if Module 1 completion or level requirement needed

</decisions>

<specifics>
## Specific Ideas

- Student types `/challenge` at module start to bypass lessons
- Quick validation (5-10 min) proves mastery without tedious repetition
- Pass = epic celebration with same rewards as lesson path
- Announcement at each module start reminds students the option exists
- Challenge route feels like efficiency, not like missing out

</specifics>

<deferred>
## Deferred Ideas

None - discussion stayed within phase scope

</deferred>

---

*Phase: 04-test-out-system*
*Context gathered: 2026-01-24*
