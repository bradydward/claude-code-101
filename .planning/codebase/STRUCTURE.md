# Codebase Structure

**Analysis Date:** 2026-01-23

## Directory Layout

```
Claude Code 101/
├── web/                          # Landing page + mock terminal onboarding portal
│   ├── index.html               # Landing page (hero, classes, journey, features)
│   ├── terminal.html            # Mock terminal quests (5 scripted lessons)
│   ├── package.json             # Web project metadata (dev server)
│   ├── css/
│   │   ├── landing.css          # Landing page styling (particles, cards, scroll)
│   │   └── terminal.css         # Mock terminal styling (retro terminal window)
│   ├── js/
│   │   ├── landing.js           # Landing page interactions (particles, animations)
│   │   ├── terminal-sim.js      # Mock terminal engine (quest definitions, command matching)
│   │   └── avatar-system.js     # Character avatar sprite renderer (color, emotion, stage)
│   ├── data/
│   │   └── sprite-config.json   # Avatar configuration (colors, speech bubbles)
│   ├── assets/
│   │   └── characters/          # Character sprite images (PNG files, stage-color-emotion.png)
│   ├── scripts/
│   │   └── validate-sprites.js  # (Utility) Validates sprite files exist
│   └── TESTING_CHECKLIST.md     # Testing guide for web portal
│
├── curriculum.md                 # Complete 15-module curriculum with all tasks
├── progress.json                 # Student save file (state, progression, customization)
├── skill_trees.json              # All 6 class skill trees (15 skills each, 4 tiers)
├── cosmetics.json                # Shop catalog (skins, colors, themes, sounds, accessories)
├── music_config.json             # Sound event mappings for afplay celebration system
├── seasons.json                  # (Placeholder) Seasonal events structure (not active)
│
├── MY_CHEAT_SHEET.md             # Auto-updating markdown reference (grows with each lesson)
├── MY_CHEAT_SHEET.html           # Browser-friendly version with search and styling
├── quick-reference.md            # Static quick reference (commands, shortcuts)
├── README.md                      # Project overview and getting started
├── CLAUDE.md                      # AI teacher instructions (teaching philosophy, music rules, systems)
│
├── IMPLEMENTATION_SUMMARY.md      # (Documentation) Recent implementation notes
├── AVATAR_CONCEPT.md              # (Documentation) Avatar system design notes
├── AVATAR_SYSTEM_STATUS.md        # (Documentation) Avatar system implementation status
├── SPRITE_IMPLEMENTATION_SUMMARY.md # (Documentation) Sprite implementation details
├── QUICK_START_GENERATION.md      # (Documentation) Quick start generation guide
├── web/ONBOARDING_ENHANCEMENTS.md # (Documentation) Web onboarding enhancements
│
├── .claude/
│   └── settings.local.json       # Local Claude Code settings (not committed)
│
├── .planning/
│   └── codebase/                 # (Generated) GSD codebase analysis documents
│       ├── ARCHITECTURE.md       # (This location) Architecture patterns and layers
│       ├── STRUCTURE.md          # (This location) Directory layout and file locations
│       ├── CONVENTIONS.md        # (Optional) Coding style and naming patterns
│       └── TESTING.md            # (Optional) Test framework and patterns
│
├── .git/                         # Git repository metadata
├── .gitignore                    # Ignored files (sound files, temp data)
└── .DS_Store                     # macOS system file
```

## Directory Purposes

**`web/`:**
- Purpose: Standalone onboarding web portal for complete beginners
- Contains: Landing page (hero, classes, journey, how-it-works), mock terminal quests, avatar character system
- Key files: `index.html` (entry), `terminal.html` (quests), `js/` (interactivity), `css/` (styling), `assets/` (sprites)
- Served by: `npm run start` or `npm run dev` (uses `npx serve` from web/package.json)
- Accessed by: First-time learners visiting the website before downloading the project

**`web/js/`:**
- Purpose: JavaScript interaction engine for web portal
- Contains:
  - `landing.js`: Particle effects, smooth scroll, reveal animations, sound effects, CTA transitions
  - `terminal-sim.js`: Mock terminal command simulator, quest progress tracking, command validation
  - `avatar-system.js`: Character sprite rendering, emotion states, speech bubbles, localStorage persistence
- Execution: Loaded by HTML pages, runs entirely in browser (no backend)

**`web/css/`:**
- Purpose: Styling for landing page and mock terminal
- Contains:
  - `landing.css`: Hero section, class cards, journey steps, responsive layout, hover effects
  - `terminal.css`: Terminal window (retro macOS style), input field, output display, quest progress bar, celebration overlay

**`web/data/` and `web/assets/`:**
- Purpose: Configuration and media for web portal
- Contains:
  - `sprite-config.json`: Avatar color definitions, speech bubble text variations
  - `assets/characters/`: PNG sprite images (format: `{stage}-{color}-{emotion}.png`)
- Generated from: `web/scripts/validate-sprites.js` can check sprite files

**Root Configuration Files:**
- `curriculum.md`: Single source of truth for all 15 modules, lessons, and tasks
- `progress.json`: Student's save file (atomic, single file, read-once-write-once pattern)
- `skill_trees.json`: Complete definition of 6 character classes and 90 total skills
- `cosmetics.json`: All purchasable items organized by category (skins, colors, themes, sounds, accessories)
- `music_config.json`: Event→sound mappings for celebration system (afplay commands)
- `seasons.json`: Structure for seasonal events (not yet active)

**Reference & Documentation:**
- `MY_CHEAT_SHEET.md`: Auto-updating markdown (appended after each lesson)
- `MY_CHEAT_SHEET.html`: Rendered HTML version with search and styling
- `quick-reference.md`: Static quick reference (doesn't change)
- `README.md`: Project overview, how to start, commands list
- `CLAUDE.md`: Complete AI teacher instructions (must read for anyone teaching via Claude Code)

**Documentation Files (Development Notes):**
- `IMPLEMENTATION_SUMMARY.md`: Notes on recent implementation work
- `AVATAR_CONCEPT.md`: Design notes for avatar system
- `AVATAR_SYSTEM_STATUS.md`: Current status of avatar system features
- `SPRITE_IMPLEMENTATION_SUMMARY.md`: Technical notes on sprite implementation
- `QUICK_START_GENERATION.md`: Guide for quick start scenarios
- `web/ONBOARDING_ENHANCEMENTS.md`: Web portal enhancement ideas
- `web/TESTING_CHECKLIST.md`: Manual testing checklist for web portal

## Key File Locations

**Entry Points:**

**Local Teaching (Claude Code):**
- `~/Developer/projects/Claude Code 101/` - Student's working directory
- Student runs: `claude` command (starts Claude Code session)
- Claude reads: `progress.json`, `curriculum.md`, `skill_trees.json`, `music_config.json`
- Claude teaches: One task at a time, updates `progress.json` after each completion

**Web Onboarding:**
- `web/index.html` - Landing page entry point
- `web/terminal.html` - Mock terminal quests (if student clicks "Begin Your Quest")
- `web/js/terminal-sim.js` - Loads quiz definitions and quest engine

**Configuration & Data:**
- `curriculum.md` - All task definitions (Module 1-15, Lesson structure, task descriptions)
- `progress.json` - Current student state (read at session start, written after each task)
- `skill_trees.json` - Class definitions and skill systems
- `cosmetics.json` - Shop items and pricing
- `music_config.json` - Sound event definitions

**Reference:**
- `MY_CHEAT_SHEET.md` - Growing reference (student sees after each lesson)
- `MY_CHEAT_SHEET.html` - Rendered version (can open in browser)
- `README.md` - Quick start and feature overview

**Teaching Logic:**
- `CLAUDE.md` - CRITICAL: All instructions for the AI teacher (teaching philosophy, progression rules, music system, customization, session flow)

## Naming Conventions

**Files:**

- `index.html` / `terminal.html` - Lowercase with hyphens for multi-word files
- `.md` - Markdown documentation
- `.json` - Configuration and data files (camelCase within JSON, kebab-case or UPPERCASE for file names)
- `.js` - JavaScript (camelCase for file names: `landing.js`, `terminal-sim.js`, `avatar-system.js`)
- `.css` - Stylesheets (kebab-case: `landing.css`, `terminal.css`)
- `.html` - HTML pages (lowercase, hyphens or no separator)

**Directories:**

- `web/` - Feature directories (web portal as complete feature)
- `css/`, `js/`, `data/`, `assets/`, `scripts/` - By file type within features
- `assets/characters/` - Asset subcategories
- `.claude/`, `.git/`, `.planning/` - System directories (leadingDot prefix)

**Variables & IDs (in JSON):**

- `snake_case` - Progress.json fields: `total_xp`, `streak_days`, `current_position`, `aura_system`
- `kebab-case` - Skill/item IDs: `gb_01`, `skin_hoodie`, `aura_purple`, `theme_matrix`
- `camelCase` - Rarely used (JSON config often prefers snake_case)

**CSS Classes:**

- `kebab-case` - `.hero-title`, `.quest-progress`, `.terminal-window`, `.avatar-sprite`
- `--prefix` - CSS variables: Not observed in sample, but available if needed

**JavaScript Functions:**

- `camelCase` - `createParticles()`, `initSmoothScroll()`, `initRevealAnimations()`, `loadConfig()`
- `PascalCase` - Classes: `AvatarSystem`, not used elsewhere

## Where to Add New Code

**New Lesson/Task:**
1. Add to `curriculum.md` in appropriate Module, Lesson, Task hierarchy
2. Set `stat_tag` for the lesson (speed, accuracy, creativity, efficiency)
3. Claude Code will automatically load it when student reaches that position

**New Class:**
1. Add entry to `skill_trees.json` under `classes` object
2. Define 15 skills across 4 tiers (Tier 1: levels 2-3, Tier 2: levels 4-5, Tier 3: levels 6-7, Tier 4: level 8+)
3. Set primary_stats, evolution chain (3 stages), emoji, aura_color, bonus description
4. Claude Code will automatically parse and offer at class selection (Module 3, Lesson 3.4)

**New Cosmetic Item:**
1. Add to `cosmetics.json` under appropriate category (character_skins, aura_colors, terminal_themes, sound_packs, accessories, titles)
2. Set id, name, price (in Aura), rarity, description
3. Optional: class_locked field for class-exclusive items
4. Claude Code will automatically list in /shop command

**New Sound Event:**
1. Add to `music_config.json` under `events`
2. For single sounds: `{"engine": "afplay", "sound": "Sound.aiff"}`
3. For sequences: `{"engine": "afplay", "sequences": [{name, sounds: [{file, delay_seconds}]}]}`
4. Claude Code will trigger with Bash tool: `(afplay /System/Library/Sounds/{file} 2>/dev/null || true) &`

**New Landing Page Section:**
1. Add HTML to `web/index.html`
2. Add styling to `web/css/landing.css`
3. Optional: Add JavaScript handler to `web/js/landing.js`
4. Test locally: `npm run dev` from `web/` directory

**New Web Quest:**
1. Add quest object to `QUESTS` array in `web/js/terminal-sim.js`
2. Define steps with: prompt, instruction, expected command, response, explanation
3. Optionally add altExpected for command variations (case-insensitive, alternate syntax)
4. Add xpReward and description
5. Quest automatically loads when student completes previous quest

**New Web Avatar Feature:**
1. Add sprite PNG files to `web/assets/characters/` (format: `{stage}-{color}-{emotion}.png`)
2. Update `web/data/sprite-config.json` if adding new colors/emotions
3. Update `web/js/avatar-system.js` if adding new sprite loading logic

**Utilities & Helpers:**
- `web/scripts/validate-sprites.js` - Already exists for sprite validation
- Could add: curriculum validator, progress validator, JSON schema checker (if complexity grows)

## Special Directories

**`.planning/codebase/`:**
- Purpose: Generated GSD codebase analysis documents
- Committed: No (generated, regenerated on demand)
- Contains: ARCHITECTURE.md, STRUCTURE.md, CONVENTIONS.md, TESTING.md, CONCERNS.md (as generated by `/gsd:map-codebase`)
- Lifecycle: Regenerated before each `/gsd:plan-phase` to ensure fresh analysis

**`.claude/`:**
- Purpose: Local Claude Code settings
- Committed: No
- Contains: `settings.local.json` (API key, preferences)
- Lifecycle: Created by Claude Code on first run, modified by user preferences

**`.git/`:**
- Purpose: Git repository
- Committed: Yes (system directory)
- Contains: Commit history, branches, remote tracking

**`web/.vercel/`:**
- Purpose: Vercel deployment configuration
- Committed: Yes
- Contains: `project.json` (build and deployment settings)

## File Lifecycle

**Progress Management:**
- `progress.json` - Created on first run (if missing), read at session start, written after each task/lesson/module
- Pattern: Read-once, calculate-all-in-memory, write-once (atomic)
- Backup: Git tracks it (can review history), but no auto-backup
- Reset: Delete progress.json to start fresh (new Level 1 student)

**Cheat Sheet Updates:**
- `MY_CHEAT_SHEET.md` - Created automatically, appended after each lesson completion
- `MY_CHEAT_SHEET.html` - Regenerated from .md after each update (with styling and search)
- Pattern: Markdown is canonical, HTML is derived
- Growth: Organically grows as student learns (only includes completed lessons)

**Configuration Changes:**
- `curriculum.md` - Updated when new modules/lessons/tasks are added (manually, rarely)
- `skill_trees.json` - Updated when new classes or skills are designed
- `cosmetics.json` - Updated when new shop items are added
- `music_config.json` - Updated when new sound events or sequences are defined
- Impact: Immediately live (Claude reads fresh on each session start)

## Versioning & Stability

**Stable Interfaces:**
- `progress.json` schema - Critical to maintain backward compatibility (students' saves must not break)
- `curriculum.md` structure - Module→Lesson→Task hierarchy must be consistent
- `skill_trees.json` schema - Class and skill structures should be stable

**Evolving:**
- Cosmetics can be added freely (no breaking changes)
- Music events can be added (can reuse existing sounds)
- Lessons can be added to end of curriculum without affecting existing progress
- New features (seasons, leaderboards) marked "coming soon" in code, not breaking

**Deprecation:**
- Remove skill: Not possible (breaks existing progress where student has unlocked it)
- Remove lesson: Not recommended (breaks continuity)
- Rename class: Not possible (breaks existing student progress.json with class: "old_name")

---

*Structure analysis: 2026-01-23*
