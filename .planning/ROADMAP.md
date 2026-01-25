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
- [x] 02-01-PLAN.md — One-click idempotent installer (Xcode CLT, Homebrew, Node, Claude CLI)
- [x] 02-02-PLAN.md — First-session flow (name XP, orientation, first-win tutorial)
- [x] 02-03-PLAN.md — Progressive disclosure and web portal acknowledgment

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

**Plans:** 3 plans

Plans:
- [x] 03-01-PLAN.md — Howler.js integration and BackgroundMusicManager engine (autoplay, fading, memory)
- [x] 03-02-PLAN.md — Music UI controls, track selection, custom MP3 upload
- [x] 03-03-PLAN.md — Source royalty-free MP3 tracks for background music library (gap closure)

**Requirements:**
- MUS-01: Howler.js integrated for background music (web portal)
- MUS-02: Student chooses background track from library
- MUS-03: Background music plays during web portal session
- MUS-04: Architecture documented (web portal vs CLI contexts)
- MUS-05: Music preferences saved to localStorage
- MUS-06: Student can add personal MP3s to library

**Note:** This phase adds music to the web portal onboarding experience only (5-20 minute practice session). CLI teaching sessions currently use afplay for event sounds. CLI background music is planned for Phase 5+ as part of the guided project track enhancements.

**Success Criteria:**
1. Student can choose background music track from library (5+ tracks available) during web portal onboarding
2. Background music plays during web portal practice sessions with fade in/out
3. Student can toggle music on/off and adjust volume (persists in localStorage)
4. Student can add their own MP3 files (max 5MB, stored in localStorage)
5. Architecture clearly documented: web portal music is onboarding-only, CLI background music is future work

---

### Phase 4: Test-Out System

**Goal:** Experienced users can prove knowledge and skip lessons while keeping XP rewards.

**Dependencies:** Phase 1 (curriculum must be complete and verified before challenges can test it)

**Plans:** 4 plans

Plans:
- [x] 04-01-PLAN.md — Challenge content for Modules 2-4 (installation, conversations, models)
- [x] 04-02-PLAN.md — Challenge content for Modules 5-7 (prompting, plan mode, technical foundations)
- [x] 04-03-PLAN.md — Validation engine, progress tracking, pass/fail handling
- [ ] 04-04-PLAN.md — Integration of announcements and /challenge flow (gap closure)

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

---

### Phase 6: Global Learning Intelligence

**Goal:** Platform learns from ALL students globally, self-improves curriculum based on real-world question patterns.

**Dependencies:** Phase 1 (teaching system must work), Phase 2 (onboarding flow for first-time users)

**Requirements:**
- INTEL-01: Question logging in CLAUDE.md teaching loop
- INTEL-02: Global MCP hook tracks questions across all Claude Code sessions (not just tutorial)
- INTEL-03: Anonymous question data syncs to Supabase cloud database
- INTEL-04: AI analysis categorizes questions nightly (topic, severity, type)
- INTEL-05: Analytics dashboard shows top questions and confusion hotspots
- INTEL-06: Auto-generated lesson suggestions for frequently asked questions
- INTEL-07: Smart hints use question data in real-time teaching
- INTEL-08: Graduate tracking (questions asked after completing tutorial)
- INTEL-09: Technology trend detection (React, Next.js, etc. usage patterns)
- INTEL-10: Privacy controls (opt-in consent, easy opt-out, data deletion)

**Success Criteria:**
1. Student questions are anonymously logged to cloud during teaching sessions (with consent)
2. Global MCP hook captures questions from ANY Claude Code session (not just tutorial folder)
3. Analytics dashboard shows "Top 10 questions this week" with module/lesson context
4. System auto-suggests new lessons when 50+ students ask similar questions
5. Graduates' real-world questions feed back into curriculum improvements
6. Students see "Many students struggle here - here's a hint" based on global data
7. Technology trends visible: "456 students building React apps - add React module?"
8. Privacy: 100% anonymous, clear opt-out, no PII collected

---

## Future Phases (Phase 7+)

**Potential enhancements beyond initial roadmap:**

### CLI Background Music System
**Goal:** Add continuous background music to CLI teaching sessions (matching web portal experience)

**Challenges:**
- CLI is terminal-based (no browser for Howler.js)
- Must not block teaching flow or command execution
- Options: Node.js audio libraries (node-speaker, play-sound), terminal multiplexer with audio daemon, or external audio player process

**Requirements:**
- MUS-CLI-01: Background music plays during `claude` teaching sessions
- MUS-CLI-02: Music preferences sync between web portal and CLI (optional)
- MUS-CLI-03: Track selection via `/music` command or interactive menu
- MUS-CLI-04: Volume control and toggle (persists in progress.json or separate config)
- MUS-CLI-05: Music pauses during student command execution, resumes after
- MUS-CLI-06: afplay event sounds continue to layer on background music

**Approach:**
Research Phase 6 will evaluate:
- Node.js audio playback libraries (cross-platform)
- Background process management (spawn vs fork)
- Audio ducking during afplay events
- State management (play/pause/volume across sessions)

---

## Progress

| Phase | Status | Start Date | End Date | Requirements Completed |
|-------|--------|------------|----------|------------------------|
| 1 - Core Experience Polish | Complete | 2026-01-23 | 2026-01-23 | 18/18 |
| 2 - Onboarding & Flow | Complete | 2026-01-24 | 2026-01-24 | 5/5 |
| 3 - Music System Upgrade | Complete | 2026-01-24 | 2026-01-24 | 6/6 |
| 4 - Test-Out System | Planned | -- | -- | 0/4 |
| 5 - Guided Project Track | Pending | -- | -- | 0/9 |
| 6 - Global Learning Intelligence | Pending | -- | -- | 0/10 |

**Overall Progress:** 29/52 requirements complete (56%)

---

*Last updated: 2026-01-24*
