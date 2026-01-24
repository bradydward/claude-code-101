# Requirements: Claude Code 101

**Defined:** 2026-01-24
**Core Value:** Learning by doing through irresistible game progression

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Curriculum Quality

- [ ] **CURR-01**: All 15 modules content complete (no missing lessons)
- [ ] **CURR-02**: Every task has crystal-clear instructions (no ambiguity about what to do)
- [ ] **CURR-03**: Every task has explanation of WHY (not just what)
- [ ] **CURR-04**: Living cheat sheet updates automatically after each lesson completion

### Visual Celebrations

- [ ] **VIS-01**: Task completion shows animated celebration (ASCII art, particles, or color)
- [ ] **VIS-02**: Lesson completion displays epic visual sequence matching sound quality
- [ ] **VIS-03**: Level-up shows progression animation (old level → new level with visual flair)
- [ ] **VIS-04**: Module completion displays full-screen celebration with stats gained
- [ ] **VIS-05**: Badge earned shows badge visual with unlock animation
- [ ] **VIS-06**: Skill unlock displays skill card with stat bonuses highlighted

### Onboarding Flow

- [ ] **ONBD-01**: One-click installer reduces manual steps (brew, node, npm, claude check/install)
- [ ] **ONBD-02**: First real Claude conversation happens within 5 minutes of install
- [ ] **ONBD-03**: Web portal progress acknowledged verbally on first local session
- [ ] **ONBD-04**: Progressive disclosure - skill tree unlocks at Module 3, shop at Module 6
- [ ] **ONBD-05**: First win tutorial ("You just did your first real task!") after completing Module 1, Lesson 1, Task 1

### Test-Out Mechanics

- [ ] **TEST-01**: Module Challenge available for Modules 2-7 (prove knowledge)
- [ ] **TEST-02**: Successful challenge awards full module XP and stats
- [ ] **TEST-03**: Failed challenge allows retry or normal progression through module
- [ ] **TEST-04**: Test-out progress tracked separately (challenges_passed in progress.json)

### Music System

- [ ] **MUS-01**: Howler.js integrated for background music playback
- [ ] **MUS-02**: Student can choose background music track from library
- [ ] **MUS-03**: Background music plays during active session (fadeable)
- [ ] **MUS-04**: Event sounds (afplay) layer on top of background music
- [ ] **MUS-05**: Music preferences saved to progress.json (background_track, volume)
- [ ] **MUS-06**: Personal music picks - student can add their own MP3s to music library

### Guided Project System

- [ ] **PROJ-01**: Project discovery wizard (structured interview to define scope)
- [ ] **PROJ-02**: Version contract locks V1 scope, creates V2 parking lot
- [ ] **PROJ-03**: Week 1 ships static HTML mockup (visible progress immediately)
- [ ] **PROJ-04**: Curriculum router contextualizes lessons to project type
- [ ] **PROJ-05**: Auto-skip irrelevant lessons (database lesson if project is static HTML)
- [ ] **PROJ-06**: Project-specific commands in terminal (YOUR-app-name instead of hello.txt)
- [ ] **PROJ-07**: Weekly scope audit prevents scope creep
- [ ] **PROJ-08**: Portfolio defense - student demos and explains their project
- [ ] **PROJ-09**: Showcase format prevents toxic comparison (celebrate learning, not complexity)

### Game Mechanics

- [ ] **GAME-01**: Skill unlocks feel powerful (stat bonuses, new capabilities, visual impact)
- [ ] **GAME-02**: Cosmetics shop browseable and items purchaseable (free Aura only in v1)
- [ ] **GAME-03**: Streak freeze mechanic works as designed (auto-use on missed day)
- [ ] **GAME-04**: Class bonus calculations correct (Gigachad +1 Creativity, Aura Farmer +2 Aura, etc.)

### Teaching Clarity

- [ ] **TEACH-01**: Single conversation pattern - all teaching, commands, verification in one Claude session
- [ ] **TEACH-02**: Command verification - Claude checks student's system to confirm completion
- [ ] **TEACH-03**: Error recovery guidance - if student makes mistake, show how to fix
- [ ] **TEACH-04**: Concept reinforcement - key insights repeated in cheat sheet, status displays

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Monetization

- **MON-01**: Server backend with user accounts (authentication)
- **MON-02**: Payment processing via Stripe
- **MON-03**: Cosmetics shop purchase flow (real money → Aura)
- **MON-04**: Premium boosts (XP multipliers, streak freezes, instant unlocks)

### Social & Community

- **SOC-01**: Cohort-based leaderboards (grouped by start date or level)
- **SOC-02**: Achievement sharing (post to Twitter/Discord)
- **SOC-03**: Weekly build highlights showcase
- **SOC-04**: Friend system or external social integration

### Infrastructure

- **INFRA-01**: Progress syncing across devices (cloud storage)
- **INFRA-02**: Remote content updates (push new lessons without reinstall)
- **INFRA-03**: Analytics and telemetry (opt-in usage data)
- **INFRA-04**: Admin dashboard for monitoring student progress

### Platform Expansion

- **PLAT-01**: Windows/Linux support (replace afplay with cross-platform audio)
- **PLAT-02**: Web-only version (no local install required)
- **PLAT-03**: Mobile app (iOS/Android)

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Pay-to-skip lessons | Kills learning motivation, research shows 73% abandonment |
| Energy/lives system | Punishes learning, opposite of educational goals |
| Content paywalls | Core learning must stay free (freemium model) |
| Competitive PvP | Creates toxic comparison, kills psychological safety |
| Real-time multiplayer | Complexity too high, async community sufficient |
| Video tutorials | Text-based teaching forces active doing vs passive watching |
| AI code generation in lessons | Student must type commands themselves to learn |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| CURR-01 | Phase 1 | Pending |
| CURR-02 | Phase 1 | Pending |
| CURR-03 | Phase 1 | Pending |
| CURR-04 | Phase 1 | Pending |
| VIS-01 | Phase 1 | Pending |
| VIS-02 | Phase 1 | Pending |
| VIS-03 | Phase 1 | Pending |
| VIS-04 | Phase 1 | Pending |
| VIS-05 | Phase 1 | Pending |
| VIS-06 | Phase 1 | Pending |
| GAME-01 | Phase 1 | Pending |
| GAME-02 | Phase 1 | Pending |
| GAME-03 | Phase 1 | Pending |
| GAME-04 | Phase 1 | Pending |
| TEACH-01 | Phase 1 | Pending |
| TEACH-02 | Phase 1 | Pending |
| TEACH-03 | Phase 1 | Pending |
| TEACH-04 | Phase 1 | Pending |
| ONBD-01 | Phase 2 | Pending |
| ONBD-02 | Phase 2 | Pending |
| ONBD-03 | Phase 2 | Pending |
| ONBD-04 | Phase 2 | Pending |
| ONBD-05 | Phase 2 | Pending |
| MUS-01 | Phase 3 | Pending |
| MUS-02 | Phase 3 | Pending |
| MUS-03 | Phase 3 | Pending |
| MUS-04 | Phase 3 | Pending |
| MUS-05 | Phase 3 | Pending |
| MUS-06 | Phase 3 | Pending |
| TEST-01 | Phase 4 | Pending |
| TEST-02 | Phase 4 | Pending |
| TEST-03 | Phase 4 | Pending |
| TEST-04 | Phase 4 | Pending |
| PROJ-01 | Phase 5 | Pending |
| PROJ-02 | Phase 5 | Pending |
| PROJ-03 | Phase 5 | Pending |
| PROJ-04 | Phase 5 | Pending |
| PROJ-05 | Phase 5 | Pending |
| PROJ-06 | Phase 5 | Pending |
| PROJ-07 | Phase 5 | Pending |
| PROJ-08 | Phase 5 | Pending |
| PROJ-09 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 42 total
- Mapped to phases: 42/42 (100%)
- Unmapped: 0

---
*Requirements defined: 2026-01-24*
*Last updated: 2026-01-24 after roadmap creation*
