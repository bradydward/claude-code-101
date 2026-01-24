---
phase: 02-onboarding-a-flow
plan: 01
subsystem: installer
tags: [bash, homebrew, node, npm, claude-cli, idempotent, apple-silicon]

# Dependency graph
requires:
  - phase: 01-core-experience-polish
    provides: Stable curriculum and teaching flow ready for new students
provides:
  - Idempotent one-click installer (install.sh)
  - Apple Silicon PATH handling
  - Xcode CLT graceful handling
  - Error recovery patterns for all brew/npm commands
  - Clear next-steps onboarding flow
affects: [02-02-progressive-disclosure, 02-03-first-win-tutorial, web-portal-integration]

# Tech tracking
tech-stack:
  added: [install.sh, bash script patterns]
  patterns: [idempotent prerequisite detection, command -v checks, error recovery with manual alternatives]

key-files:
  created: [install.sh]
  modified: [README.md]

key-decisions:
  - "Installer does NOT create progress.json (Claude handles first session per research Approach B)"
  - "Xcode CLT triggers install and exits with re-run instructions (not blocking install)"
  - "Apple Silicon PATH appended to ~/.zshrc automatically for M1/M2 Macs"
  - "Repository cloning included in installer (full setup in one command)"

patterns-established:
  - "Idempotent pattern: command -v checks before all installs"
  - "Error recovery: friendly message + manual alternative on brew/npm failures"
  - "Visual separators: unicode box-drawing for readability in terminal output"

# Metrics
duration: 2min
completed: 2026-01-24
---

# Phase 2 Plan 01: One-Click Installer Summary

**Idempotent installer with Apple Silicon PATH handling, Xcode CLT detection, and error recovery for all prerequisite installations**

## Performance

- **Duration:** 2 minutes
- **Started:** 2026-01-24T07:20:05Z
- **Completed:** 2026-01-24T07:22:18Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- Students can install all prerequisites with a single command: `/bin/bash install.sh`
- Installer detects existing tools and skips already-installed components (idempotent)
- Apple Silicon Macs get automatic PATH configuration for Homebrew in /opt/homebrew
- Xcode Command Line Tools check with graceful exit and re-run instructions
- Error recovery for all brew/npm commands with manual alternatives shown

## Task Commits

Each task was committed atomically:

1. **Task 1: Create idempotent installer script** - `6288873` (feat)
2. **Task 2: Make installer executable and add to README** - `571e2a6` (feat)

## Files Created/Modified
- `install.sh` - One-click installer with idempotent checks for Xcode CLT, Homebrew, Node.js, Claude Code CLI, and project setup
- `README.md` - Added One-Click Install section at top of Quick Start, moved manual steps to Alternative section

## Decisions Made

**1. Installer does NOT create progress.json**
- Rationale: Research (02-RESEARCH.md Approach B) recommends Claude creates it on first session for personalized experience
- Impact: Simpler installer, allows Claude to greet warmly and collect name interactively
- Alternative considered: Approach A (template in installer) - rejected as less personal

**2. Xcode CLT triggers install and exits (not blocking)**
- Rationale: CLT install requires GUI interaction (popup window), can't block script
- Impact: Student runs installer twice in worst case (first triggers CLT install, second completes setup)
- Pattern: Clear re-run instructions shown after exit

**3. Apple Silicon PATH handling automatic**
- Rationale: M1/M2 Macs install Homebrew to /opt/homebrew (not /usr/local), PATH not set by default
- Impact: Fixes "brew: command not found" on Apple Silicon after successful install
- Pattern: Detects `uname -m == arm64`, appends shellenv to ~/.zshrc if not present, evals immediately

**4. Repository cloning included in installer**
- Rationale: Complete setup in one command (not "install tools then clone separately")
- Impact: Student runs one command and has full working environment
- Idempotent: If repo exists, pulls updates instead

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None - all tasks completed without problems.

## User Setup Required

None - installer is fully automated. Students only need to:
1. Run the installer
2. Get API key from console.anthropic.com (documented in installer output)
3. Open new terminal window (to load updated PATH)
4. Navigate to project and run `claude`

## Next Phase Readiness

Installer complete and ready for:
- Integration with progressive disclosure (02-02) - first session can detect fresh install vs. existing
- First-win tutorial (02-03) - name choice awards first XP immediately after install
- Web portal handoff (future) - installer could detect web portal localStorage and set `from_web_portal` flag

**Blockers:** None
**Concerns:** None - installer tested with syntax check and idempotent checks verified

---
*Phase: 02-onboarding-a-flow*
*Completed: 2026-01-24*
