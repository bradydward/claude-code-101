# Architecture

**Analysis Date:** 2026-01-23

## Pattern Overview

**Overall:** Dual-system architecture with two distinct subsystems: (1) Claude-based AI teaching engine for local progression, and (2) static web portal for onboarding and learning reference.

**Key Characteristics:**
- Decoupled frontend (web portal) from backend (Claude Code engine)
- File-based progression state (no database)
- Event-driven celebration system using macOS afplay sounds
- Data-driven configuration (curriculum, skills, cosmetics, music all in JSON)
- Claude acts as the teaching orchestrator - reads progress, curriculum, and config files, then guides via conversation

## Layers

**Presentation Layer (Web):**
- Purpose: Onboarding, landing page, mock terminal education, visual inspiration
- Location: `web/` directory (index.html, terminal.html, landing page)
- Contains: HTML pages, CSS styling (landing.css, terminal.css), JavaScript interaction (landing.js, terminal-sim.js, avatar-system.js)
- Depends on: Static assets (fonts, character sprites), JSON data files (sprite-config.json)
- Used by: Complete beginners arriving at the website before downloading the project

**Configuration Layer:**
- Purpose: Centralized data source for progression rules, sound events, skill trees, shop items
- Location: Root-level JSON files
- Contains:
  - `curriculum.md` - Task definitions and learning structure
  - `skill_trees.json` - 6 classes × 15 skills with prerequisites and stat bonuses
  - `cosmetics.json` - Shop items (skins, colors, themes, sound packs)
  - `music_config.json` - Event→sound mappings for afplay
  - `seasons.json` - (Placeholder) future seasonal events
- Depends on: None
- Used by: Claude Code engine during session execution

**State Layer:**
- Purpose: Persist student progress between sessions
- Location: `progress.json` (single file, atomic writes)
- Contains: Student name, level, XP, stats, Aura, customization, position in curriculum, completed tasks/lessons/modules, badges, streaks, easter eggs, sandbox status, session history
- Structure: Flat JSON with nested objects for organization (student, stats, aura_system, skill_tree, customization, current_position, completed, etc.)
- Read Pattern: Claude reads entire file at session start + status checks
- Write Pattern: Single atomic write after each task/lesson completion with all updates calculated in memory

**Reference Layer:**
- Purpose: Auto-updating quick reference for students
- Location: `MY_CHEAT_SHEET.md` and `MY_CHEAT_SHEET.html`
- Contains: Lessons learned (commands, shortcuts, key insights, copy-paste examples)
- Built from: Curriculum content, auto-appended after each lesson completion
- Used by: Students looking up what they've already learned

**Teaching Engine (Claude Code):**
- Purpose: Main AI orchestrator that guides the student through curriculum
- Process:
  1. Student starts conversation in Claude Code (`claude` command in terminal)
  2. Claude is in the project directory (has access to all files via tools)
  3. Claude reads progress.json to understand current state
  4. Claude reads curriculum.md to find current task
  5. Claude presents task with clear instructions (🖥️/💬 two-terminal format)
  6. Student executes commands in practice terminal, reports back to Claude
  7. Claude verifies completion on their system (using file tools)
  8. Claude calculates XP/stat gains, applies class bonuses, checks level-ups
  9. Claude writes complete updated progress.json (atomic single write)
  10. Claude awards celebration with music and visual display
  11. Claude repeats until student completes lesson/module

## Data Flow

**Session Start Flow:**

1. Student runs `claude` command in their terminal
2. Claude Code initializes (API key required, stored by tool)
3. Claude reads `progress.json` to load current state
4. Claude reads `music_config.json` to get session_start sound config
5. Claude triggers session start music via Bash tool: `afplay /System/Library/Sounds/Pop.aiff` (non-blocking)
6. Claude reads curriculum.md to find Module X, Lesson Y, Task Z based on current_position
7. Claude displays status block with current stats, level, streak, badges
8. Claude presents next task from curriculum
9. Flow continues → Task completion → Update progress → Music → Status → Next task

**Task Completion Flow:**

1. Student completes task (terminal command executed, file created, question answered)
2. Claude verifies completion (checks file existence, output format, or accepts explanation)
3. Claude reads progress.json (fresh read to avoid conflicts)
4. Claude calculates in memory:
   - Base XP: +10 (task) or +50 (lesson) or +200 (module)
   - Stat gain: +1 to lesson's stat_tag stat
   - Class bonus: e.g., +1 extra to primary stat (Gigachad gets +1 Creativity)
   - Aura: +1 base + class bonuses (Aura Farmer gets +2)
   - Skill tree: If points available, consider passive bonuses
   - Level check: If new_xp >= level_threshold, prepare level-up
   - Position update: current_position.task += 1
   - Array updates: Append to completed.tasks, completed.lessons, completed.modules as applicable
5. Claude writes updated progress.json with ALL changes in single Write operation
6. Claude reads music_config.json and triggers appropriate celebration sound:
   - Task complete: single Ping.aiff via afplay
   - Lesson complete: single Glass.aiff + 5 bonus XP display
   - Module complete: random sequence from module_complete.sequences
7. Claude displays celebration block with stat gains and XP earned
8. If level-up triggered:
   - Display level-up animation
   - Trigger level-up music (random sequence from level_up.sequences)
   - Present available skill points from skill_trees.json
   - Let student choose skill
   - Update skill_tree.skills_unlocked array
9. Claude continues to next task/lesson

**Streak Calculation Flow:**

1. Claude checks progress.json.student.last_session vs today's date
2. If same day: skip all streak logic
3. If new day AND consecutive: increment streak_days
4. If new day AND gap detected:
   - If streak_freeze_available: auto-use it, set to false, keep streak
   - If no freeze: reset streak_days to 1, update longest_streak if needed
5. Check milestone: if streak_days matches 3, 7, 14, 30, 60, or 100, award bonus Aura
6. Update last_session to today's date
7. Recalculate glow_level and reputation_rank based on aura_system.total_earned

**State Management:**

- Aura Layer 1 (Currency): `aura_system.current_balance` tracks spending (reduced by shop purchases)
- Aura Layer 2 (Glow): `aura_system.glow_level` derived from `aura_system.total_earned` (never reduced)
- Aura Layer 3 (Reputation): `aura_system.reputation_rank` also derived from total_earned
- XP: `student.total_xp` accumulates forever (never reset)
- Stats: Grow through lessons and never reset (only increase)
- Customization: Purchases applied to `customization` fields

## Key Abstractions

**Curriculum Task:**
- Location: `curriculum.md` (markdown structure, not JSON)
- Format: Module → Lesson → Task hierarchy
- Example: Module 2, Lesson 1, Task 1 (ID: "2.1.1")
- Each task has:
  - Clear instruction (plain language, no jargon)
  - Expected action (terminal command OR file creation OR explanation)
  - Stat tag (which stat it grows: speed, accuracy, creativity, efficiency)
  - Reward XP (per-task or bonus for lesson/module)
- Verification: Claude checks output matches expected result or accepts reasonable explanation

**Character Class:**
- Location: `skill_trees.json` (complete class definitions)
- Fields: name, description, primary_stats, evolution (3 stages), emoji, aura_color, bonus description
- Evolution: Same class name with 3 tiers based on levels (e.g., Chad → Gigachad → Godmode Developer at levels 1, 4, 7)
- Example: Gigachad Builder (💪) has primary_stats: ["creativity", "aura"], gets +1 Creativity per lesson + 20% XP bonus for shipping features
- Skills: 15 skills across 4 tiers (each tier unlocks at specific levels)

**Skill:**
- Location: `skill_trees.json` (nested under classes)
- Fields: id, name, description, tier (1-4), type (passive/active/ultimate), stat_bonus (JSON dict), unlock_level, prerequisite_skills
- Passive: Always active once unlocked (e.g., +1 stat, +X% XP on action)
- Active: Triggered by specific action/command (e.g., "skip optional sub-tasks without penalty")
- Ultimate: Capstone ability, one per class at tier 4
- Stat bonus: Map of stat → number (e.g., {"creativity": 1} adds +1 Creativity)

**Cosmetic Item:**
- Location: `cosmetics.json`
- Types: character_skins, aura_colors, terminal_themes, sound_packs, accessories, titles
- Fields: id, name, price (in Aura), rarity (common/uncommon/rare/epic/legendary), description
- Class-locked: Some legendary skins only purchasable with specific class (e.g., "Ultimate Gigachad" for Gigachad Builder)
- Applied in: `customization` fields in progress.json after purchase

**Music Event:**
- Location: `music_config.json`
- Structure: event_type → config with sound/sequence definition
- Simple events (task/lesson/badge): single sound file + optional duration
- Epic events (module/level/class): array of sound sequences with timing
- Sequence: Array of sounds with delay_seconds, played in parallel via separate afplay commands with staggered `sleep` delays
- Execution: Always via Bash tool with `run_in_background: true` to prevent blocking

**Avatar (Web Portal Only):**
- Location: `web/js/avatar-system.js`
- States: stage (recruit/trainee/adventurer), color (cyan/gold/purple), emotion (idle/happy/confused/victory)
- Sprites: PNG images in `web/assets/characters/` (format: `{stage}-{color}-{emotion}.png`)
- Config: `web/data/sprite-config.json` with color hex codes and speech bubble text
- Function: Guides player through mock terminal quests, provides visual feedback on correct/wrong commands

## Entry Points

**Local Development (Main Path):**
- Location: Terminal, student runs `claude` command in `~/Developer/projects/Claude Code 101/`
- Triggers: Student types "start lesson" or "continue"
- Responsibilities:
  1. Load progress.json
  2. Load curriculum.md
  3. Load music_config.json
  4. Load skill_trees.json (if at level-up)
  5. Load cosmetics.json (if at /shop)
  6. Present current task with plain-language instructions
  7. Verify completion on student's system
  8. Update progress.json atomically
  9. Award XP, stats, Aura
  10. Trigger celebrations and music

**Web Onboarding (Optional Path):**
- Location: `web/index.html` (landing page) → `web/terminal.html` (mock terminal)
- Entry: Student visits website, clicks "Begin Your Quest"
- Responsibilities:
  1. Render landing page with hero, class cards, journey steps
  2. Create particles and smooth animations
  3. If student clicks "Begin Your Quest", navigate to terminal.html
  4. Load terminal.html with mock terminal simulator (terminal-sim.js)
  5. Load avatar system (avatar-system.js) with sprite engine
  6. Present 5 scripted quests teaching basic commands
  7. Track XP and quest progress locally in browser
  8. On completion, show download instructions for local project

**Commands (Conversation-Based):**
- "start lesson" / "continue" → Begin progression
- "status" → Show full player status block
- "/class" → Display class info and stats
- "/skills" → Show skill tree and available points
- "/shop" → Browse cosmetics, spend Aura
- "/aura" → Show Aura balance, glow level, reputation
- "/streak" → Show streak details and milestones
- "/cheat" → Show path to MY_CHEAT_SHEET.md and MY_CHEAT_SHEET.html
- "/sandbox" → Enter free-form mode (Level 5+)
- "/music" → Show music settings
- "explain [concept]" → Plain-language deep dive
- "I'm stuck" → Break current step smaller
- "help" → List all commands

## Error Handling

**Strategy:** Graceful degradation with fallback behavior. No fatal errors block learning.

**Patterns:**

**Missing Files:**
- If curriculum.md missing: Display error, offer help, don't crash
- If progress.json missing: Create new progress.json with default values (Level 1, 0 XP, no class)
- If skill_trees.json missing: Load defaults, continue without skill tree
- If music_config.json missing: Skip music, continue teaching

**Invalid Progress State:**
- If current_position points to non-existent lesson: Rewind to last completed lesson
- If XP/stats are corrupted: Recalculate from completed.tasks/lessons/modules arrays
- If class is null at high level: Prompt to choose class with extra bonus

**Command Execution Failures:**
- If student's terminal command fails: Show output, explain error, guide to fix, award XP anyway (learning from mistakes counts)
- If file not created as expected: Check file system directly, guide troubleshooting, offer to help

**Music Failures:**
- If afplay not found: Silently skip, teaching continues
- If sound file missing: Error suppressed with `2>/dev/null`, non-blocking continues
- Teaching flow NEVER waits for music (all commands use `run_in_background: true`)

## Cross-Cutting Concerns

**Logging:**
- No dedicated logging system
- `session_history` array in progress.json tracks broad events (optional)
- Claude's conversation itself IS the audit trail (visible in terminal)
- SQL-like tracking not needed for this scope

**Validation:**
- Curriculum tasks: Validated by Claude at presentation time (checks file exists)
- Progress updates: Validated by atomic JSON writes (corruption impossible)
- Student input: Validated against expected values (case-insensitive for commands)
- Aura/XP calculations: Validated by recalculation logic (can regenerate from tasks array)

**Authentication:**
- API key (Anthropic) stored by Claude Code tool, not by this project
- Progress.json in user's local directory (implicitly "authenticated" as file owner)
- Web portal: No auth needed (read-only access)

**Customization:**
- All visual customization stored in `customization` fields (character_skin, aura_color, terminal_theme, music_pack)
- Applied at display time in celebration blocks and status display
- No impact on progression or XP (purely visual)

---

*Architecture analysis: 2026-01-23*
