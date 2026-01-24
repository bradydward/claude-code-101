# Phase 3 Plan Revisions - Scope Clarification

**Date:** 2026-01-24
**Reason:** Clarify that Phase 3 adds music to web portal onboarding only, not CLI teaching sessions

---

## Issues Identified

### Issue #1: Scope Ambiguity
**Problem:** Plans didn't clarify that background music is for web portal (5-20 min onboarding) only, not the main CLI teaching platform (months of learning).

**Impact:** Could create misleading expectations about where music plays and why CLI doesn't have background music yet.

### Issue #2: Misleading "Event Sound Layering" Documentation
**Problem:** Plan 03-02 Task 3 documented that "afplay event sounds layer on Howler.js background music" - but these systems run in mutually exclusive contexts:
- Web portal: Howler.js plays, but NO afplay events (no teaching, no task completions)
- CLI session: afplay plays, but NO Howler.js (terminal only, no browser)

**Impact:** Suggested a technical integration that doesn't actually exist.

---

## Revisions Made

### 1. Plan 03-01-PLAN.md
**Change:** Added scope clarification to `<objective>` section
**Content:**
```
SCOPE CLARIFICATION: This phase adds background music to the web portal
onboarding experience (web/terminal.html) only. The web portal is a 5-20
minute practice session where students learn basic terminal commands before
entering the actual CLI learning platform. The main CLI teaching sessions
(where students run `claude` command and complete the 15-module curriculum)
will receive background music in a future phase.
```

### 2. Plan 03-02-PLAN.md
**Changes:**
- Added scope clarification to `<objective>` section (matching 03-01)
- Rewrote Task 3 from "Document event sound layering" to "Document web portal audio architecture"
- Removed misleading documentation about afplay/Howler.js "layering"
- Added accurate two-context architecture explanation
- Updated must_haves truth: "Event sounds layer..." → "Web portal audio scope clearly documented..."
- Updated verification step 11: Removed event sound layering reference
- Updated success criteria: Removed MUS-04 event layering reference

**New Task 3 Documentation:**
```javascript
/**
 * BACKGROUND MUSIC SYSTEM - Web Portal Only
 *
 * ARCHITECTURE CONTEXT:
 *   Claude Code 101 has TWO separate learning contexts:
 *
 *   1. Web Portal (THIS FILE):
 *      - Location: Browser (web/terminal.html)
 *      - Audio: Howler.js background music
 *      - Purpose: 5-quest onboarding (echo, pwd, ls, cd, mkdir)
 *      - Duration: 5-20 minutes
 *
 *   2. CLI Teaching Platform (SEPARATE SYSTEM):
 *      - Location: Terminal (student runs `claude` command)
 *      - Audio: macOS afplay for event sounds
 *      - Purpose: 15-module curriculum with full progression
 *      - Duration: Months
 *      - Background music: Not yet implemented (future phase)
 *
 * IMPORTANT:
 *   These two contexts do NOT run simultaneously.
 */
```

### 3. ROADMAP.md
**Changes:**
- Updated Phase 3 requirements:
  - MUS-01: Added "(web portal)" clarification
  - MUS-03: "active session" → "web portal session"
  - MUS-04: Changed from "Event sounds layer on background music" → "Architecture documented (web portal vs CLI contexts)"
- Added note after requirements explaining scope limitation
- Updated Phase 3 success criteria (removed event layering reference, added architecture documentation requirement)
- Added new section: "Future Phases (Phase 6+)" with CLI Background Music System as planned enhancement

---

## Key Architectural Facts

### Two Separate Learning Contexts

| Aspect | Web Portal (terminal.html) | CLI Session (claude command) |
|--------|---------------------------|---------------------------|
| **Location** | Browser window | Terminal window |
| **Purpose** | Onboarding/practice | Actual learning |
| **Content** | 5 quests, basic commands | 15 modules, full curriculum |
| **Audio (Phase 3)** | Howler.js background music | afplay event sounds only |
| **Duration** | 5-20 minutes | Months |
| **Overlap** | NONE - sequential, not parallel | N/A |

### Why They Don't Interfere

1. **Separate processes:** Browser (web portal) vs Terminal (CLI session)
2. **Different timing:** Students complete web portal → THEN enter CLI
3. **Independent audio:** Howler.js (browser) and afplay (terminal) never run simultaneously
4. **No data sync:** Web portal uses localStorage, CLI uses progress.json

---

## Forward-Looking Plan

**Phase 3 (Current):** Web portal background music only

**Phase 6+ (Future):** CLI background music system
- Planned requirements documented in ROADMAP.md
- Will require Node.js audio libraries or external player process
- Research phase needed to evaluate technical approach
- Must not block CLI teaching flow or command execution

---

## Impact on Execution

**No technical changes to Plan 03-01 or 03-02 tasks** - only documentation updates.

All implementation work remains the same:
- Task 1: Create BackgroundMusicManager class ✓
- Task 2: Add music panel HTML and CSS ✓
- Task 3: Wire UI interactions and custom upload ✓

**Verification unchanged:** All technical functionality criteria remain identical.

**Only difference:** Documentation now accurately reflects web portal scope and explains the two-context architecture, preventing confusion about where music plays and why CLI doesn't have background music yet.

---

## Approval

- [x] Scope clarified (web portal only, CLI is future work)
- [x] Misleading "event sound layering" documentation removed
- [x] Two-context architecture explained accurately
- [x] Future CLI music work documented in ROADMAP
- [x] No changes to technical implementation

**Status:** Ready for execution
