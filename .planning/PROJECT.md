# Claude Code 101

## What This Is

Claude Code 101 is an RPG-style learning platform that teaches complete beginners to use Claude Code through addictive game mechanics. Students learn by building real things (not reading theory) while progressing through levels, unlocking character classes, earning cosmetics, and celebrating victories with music. The game lives in the Claude Code terminal - using the actual tool to teach the tool.

## Core Value

Learning by doing through irresistible game progression. If the game feel breaks or the teaching becomes confusing, nothing else matters. Students must feel "I can't stop playing" while actually mastering real technical skills.

## Requirements

### Validated

<!-- Existing foundation (already built) -->

- ✓ 15-module curriculum structure exists — existing
- ✓ RPG progression system (XP, levels, stats, badges, streaks) — existing
- ✓ 6 character classes with 15-skill trees each — existing
- ✓ Cosmetics shop structure (skins, themes, sounds, accessories) — existing
- ✓ Music celebration system (afplay sounds for events) — existing
- ✓ Web portal with landing page and mock terminal quests — existing
- ✓ Avatar sprite system with evolution stages — existing
- ✓ Living cheat sheet (auto-updating reference document) — existing
- ✓ Progress tracking (local progress.json file) — existing
- ✓ Single-conversation teaching (all learning happens in one Claude session) — existing

### Active

<!-- v1 scope - make the core experience incredible -->

- [ ] **Curriculum completion**: Audit all 15 modules, complete missing content, polish existing lessons
- [ ] **Teaching clarity**: Improve instructions (remove ambiguity) and explanations (teach why, not just what)
- [ ] **Game feel polish**: Visual celebrations feel epic, every interaction smooth and satisfying
- [ ] **Music expansion**: Background soundtrack, personal song choices, not just event sounds
- [ ] **Test-out mechanics**: Students can prove knowledge and skip lessons while keeping XP
- [ ] **Web → terminal flow**: Seamless onboarding from web portal to local Claude Code
- [ ] **Meaningful progression**: Skills feel powerful, unlocks feel valuable, stats matter
- [ ] **Visual feedback**: ASCII art, animations, color, celebration sequences
- [ ] **Personal completion**: Builder completes all 15 modules and feels transformed
- [ ] **Guided project track**: Optional path where students learn by building THEIR idea (not sample projects)
- [ ] **Weekly build highlights**: Showcase feature celebrating what students shipped

### Out of Scope

<!-- Deferred to v2 (business layer) -->

- Server backend and authentication — v2 (requires infrastructure)
- Payment processing and monetization — v2 (prove value first)
- Functional cosmetics shop (purchase flow) — v2 (business layer)
- Leaderboards and competitive features — v2 (requires server)
- Progress syncing across devices — v2 (requires cloud storage)
- Remote content updates — v2 (content management system)
- Real-time multiplayer — v2 (complexity too high for v1)
- Mobile app or web-only version — v2 (desktop-first)

## Context

**Builder perspective:**
This project is being built by someone who IS the target user - a complete beginner who discovered Claude Code and felt both excitement (the possibilities!) and frustration (what's a pull request? how do I commit? what's git?). The best learning happens by doing, not watching YouTube tutorials or reading docs.

**Existing foundation:**
Substantial codebase exists (see `.planning/codebase/` for full analysis):
- 15-module curriculum from terminal basics through autonomous agents
- Complete RPG system with classes, skills, stats, badges, cosmetics
- Web onboarding portal with mock terminal (5 scripted quests)
- Avatar system with sprite rendering and evolution
- Music celebration system using macOS afplay
- Living cheat sheet that grows as student learns

**Current gaps:**
- Curriculum completion status unknown (needs systematic audit)
- Teaching quality inconsistent (some lessons unclear)
- Game feel needs polish (celebrations exist but don't feel epic yet)
- Music limited to system sounds (vision includes full soundtrack)
- Test-out mechanics don't exist (all students start Module 1)

**Target audience:**
The "me's of the world" - people who:
- Caught the AI vision ("I can build anything with this!")
- Have zero technical background (don't know terminal, git, code)
- Feel frustrated/embarrassed by not knowing basics
- Have ideas but lack execution skills
- Need to learn by doing, not by theory

**Future vision (v2):**
Free-to-play business model like Duolingo or Fortnite:
- Core learning always free (all 15 modules accessible)
- Monetize cosmetics (skins, themes, auras, accessories)
- Monetize boosts (XP multipliers, streak freezes)
- Monetize social (leaderboards, profile flex, special titles)
- Monetize exclusive content (rare cosmetics, easter eggs)

This ensures no paywall blocks learning while capturing value from engaged users who want to customize and compete.

## Constraints

- **Platform**: macOS (Claude Code CLI, terminal environment, afplay for music)
- **Teaching environment**: Claude Code terminal (students use actual tool to learn the tool)
- **Scope**: v1 focuses on core learning experience, not business infrastructure
- **Quality bar**: Must work for complete beginners (builder is the test case)
- **Architecture**: Local files for v1 (server backend deferred to v2)
- **Offline capability**: v1 works completely offline (no internet required)
- **Timeline**: No hard deadline, but builder wants to complete personal journey through all 15 modules

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Local files (v1) → Server backend (v2) | Prove learning works before building infrastructure | — Pending |
| Freemium monetization model | Remove paywall from learning, monetize engagement | — Pending |
| Web portal → Terminal onboarding | Hook them fast, get them into Claude Code ASAP | — Pending |
| Test out with XP credit | Respect existing knowledge while preserving game progression | — Pending |
| Full music integration | Celebration sounds + background soundtrack + personal picks | — Pending |
| 15-module curriculum scope | Terminal basics → Autonomous agents (complete journey) | — Pending |
| MacOS-only for v1 | Builder's platform, afplay integration, simplify scope | — Pending |

---
*Last updated: 2026-01-23 after initialization*
