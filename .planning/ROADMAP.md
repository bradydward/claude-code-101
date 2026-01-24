# Roadmap: Claude Code 101

**Created:** 2026-01-24
**Core Value:** Learning by doing through irresistible game progression
**Depth:** Quick (5 phases)

## Overview

Transform Claude Code 101 from solid foundation to irresistible learning experience. Five phases take existing curriculum and RPG systems from "works" to "can't stop playing." Each phase delivers complete, verifiable capabilities that make learning more engaging, frictionless, or personalized.

## Phases

### Phase 1: Core Experience Polish

**Goal:** Existing curriculum, teaching, and celebrations feel professional and addictive.

**Dependencies:** None (foundation already exists)

**Plans:** 7 plans

Plans:
- [x] 01-01-PLAN.md — Teaching pattern conversion (single conversation, error recovery, verification)
- [x] 01-02-PLAN.md — Curriculum audit and polish (15 modules, clarity, WHY explanations)
- [x] 01-03-PLAN.md — Visual celebrations system (6 event types, ASCII art, hierarchy)
- [x] 01-04-PLAN.md — Cosmetics shop implementation (browse, purchase, equip)
- [x] 01-05-PLAN.md — Game mechanics verification (class bonuses, streaks, skills, final validation)
- [x] 01-06-PLAN.md — Architecture optimization (split CLAUDE.md, extract reference docs)
- [x] 01-07-PLAN.md — UX friction removal (command namespace, permissions setup)

**Requirements:**
- CURR-01: All 15 modules content complete
- CURR-02: Crystal-clear instructions
- CURR-03: Explanations include WHY
- CURR-04: Living cheat sheet auto-updates
- VIS-01: Task completion animations
- VIS-02: Lesson completion visuals
- VIS-03: Level-up progression animations
- VIS-04: Module completion full-screen celebration
- VIS-05: Badge earned visuals
- VIS-06: Skill unlock displays
- GAME-01: Skills feel powerful
- GAME-02: Cosmetics shop browseable/purchaseable
- GAME-03: Streak freeze works
- GAME-04: Class bonuses calculate correctly
- TEACH-01: Single conversation pattern maintained
- TEACH-02: Command verification on student's system
- TEACH-03: Error recovery guidance
- TEACH-04: Concept reinforcement in cheat sheet

**Success Criteria:**
1. Student can complete any lesson without confusion about what to do next
2. Every task completion triggers visible celebration (ASCII art, color, animation)
3. Level-up sequence feels epic (animation + sound + skill choice)
4. Student can browse cosmetics shop and purchase items with earned Aura
5. Living cheat sheet updates automatically after each lesson with new commands/insights

---

### Phase 2: Onboarding & Flow

**Goal:** Students go from "I want to learn" to first real win in under 5 minutes.

**Dependencies:** Phase 1 (teaching clarity required for smooth flow)

**Plans:** 3 plans

Plans:
- [ ] 02-01-PLAN.md — One-click idempotent installer (Xcode CLT, Homebrew, Node, Claude CLI)
- [ ] 02-02-PLAN.md — First-session flow (name XP, orientation, first-win tutorial)
- [ ] 02-03-PLAN.md — Progressive disclosure and web portal acknowledgment

**Requirements:**
- ONBD-01: One-click installer reduces manual steps
- ONBD-02: First Claude conversation within 5 minutes
- ONBD-03: Web portal progress acknowledged
- ONBD-04: Progressive disclosure (skill tree Module 3, shop Module 6)
- ONBD-05: First win tutorial after Module 1, Lesson 1, Task 1

**Success Criteria:**
1. Student can run installer and have working Claude Code session in under 5 minutes
2. Student completes first task and sees XP/stat gains before any technical setup
3. Student coming from web portal hears acknowledgment: "You already conquered pwd in the portal!"
4. Features unlock progressively (skill tree hidden until Module 3, shop until Module 6)
5. First task completion triggers tutorial: "You just did your first real task!"

---

### Phase 3: Music System Upgrade

**Goal:** Learning has emotional soundtrack, not just event sounds.

**Dependencies:** Phase 1 (celebration system must work before adding background music)

**Requirements:**
- MUS-01: Howler.js integrated for background music
- MUS-02: Student chooses background track from library
- MUS-03: Background music plays during active session
- MUS-04: Event sounds (afplay) layer on background music
- MUS-05: Music preferences saved to progress.json
- MUS-06: Student can add personal MP3s to library

**Success Criteria:**
1. Student can choose background music track from library (5+ tracks available)
2. Background music plays during teaching sessions with fade in/out
3. Event sounds (task complete, level-up) layer on top without interrupting background track
4. Student can toggle music on/off and adjust volume (persists in progress.json)
5. Student can add their own MP3 files to custom music folder

---

### Phase 4: Test-Out System

**Goal:** Experienced users can prove knowledge and skip lessons while keeping XP rewards.

**Dependencies:** Phase 1 (curriculum must be complete and verified before challenges can test it)

**Requirements:**
- TEST-01: Module Challenge available for Modules 2-7
- TEST-02: Successful challenge awards full module XP/stats
- TEST-03: Failed challenge allows retry or normal progression
- TEST-04: Test-out progress tracked separately

**Success Criteria:**
1. Student can trigger Module Challenge for Modules 2-7 with `/challenge` command
2. Challenge validates knowledge (automated checks + practical tasks)
3. Passing awards full module XP (200 bonus + all lesson XP) and badge
4. Failing shows kind feedback with option to retry or take module normally
5. Test-out completions tracked in `progress.json.challenges_passed` array

---

### Phase 5: Guided Project Track

**Goal:** Students can learn by building THEIR app instead of following generic curriculum.

**Dependencies:** Phase 1 (teaching system), Phase 2 (onboarding flow), Phase 4 (test-out for skipping irrelevant lessons)

**Requirements:**
- PROJ-01: Project discovery wizard (structured interview)
- PROJ-02: Version contract locks V1 scope
- PROJ-03: Week 1 ships static HTML mockup
- PROJ-04: Curriculum router contextualizes lessons
- PROJ-05: Auto-skip irrelevant lessons
- PROJ-06: Project-specific commands in examples
- PROJ-07: Weekly scope audit prevents creep
- PROJ-08: Portfolio defense demos project
- PROJ-09: Showcase format celebrates learning

**Success Criteria:**
1. Student can start guided project mode with `/project start` command
2. Discovery wizard guides from vague idea to scoped V1 (max 3 features)
3. Student ships static HTML version of their app in Week 1 (deployed to public URL)
4. Lessons adapt to student's project type (CRUD lessons for recipe app, skip database for static site)
5. Student demonstrates completed project via portfolio defense (demo video + written reflection)

---

## Progress

| Phase | Status | Start Date | End Date | Requirements Completed |
|-------|--------|------------|----------|------------------------|
| 1 - Core Experience Polish | Complete | 2026-01-23 | 2026-01-23 | 18/18 |
| 2 - Onboarding & Flow | Planned | -- | -- | 0/5 |
| 3 - Music System Upgrade | Pending | -- | -- | 0/6 |
| 4 - Test-Out System | Pending | -- | -- | 0/4 |
| 5 - Guided Project Track | Pending | -- | -- | 0/9 |

**Overall Progress:** 18/42 requirements complete (43%)

---

*Last updated: 2026-01-23*
