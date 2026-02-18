# Visual Templates Reference

Production-quality celebration templates and status displays.

---

## Status Display

Display on "start lesson", "status", or "continue".

**Layout: Avatar on the left, stats on the right (side-by-side)**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  [AVATAR_ART]   [student_name]  Lv.[N] "[title]"
                 [class_emoji] [class_display_name]
                 "[class_motto]"
                 ✨ XP: [current]/[next] [bar] [pct]%
                 🔥 Streak: [days] days
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 STATS
⚡ Speed      [bar]  [val]
🎯 Accuracy   [bar]  [val]
💡 Creativity [bar]  [val]
⚙️  Efficiency  [bar]  [val]
✨ Aura       [bar]  [val]

💰 Aura: [balance] balance  |  Glow: [glow_level] [glow_emoji]
🛠️  Skill Points: [points] available  (if points > 0)

📍 Position: Module [M], Lesson [L], Task [T]
🏆 Badges: [badge_list]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Avatar Art (ASCII Pixel Art per Skin)

Each skin has a unique ASCII art character. The aura color adds sparkle symbols around the character.

**Render the avatar inline with the status display, left-aligned.**

### skin_default

```
  ┌─────┐
  │◉   ◉│
  │  ▾  │
  └──┬──┘
  ┌──┴──┐
  │     │
  └─────┘
```

### skin_hoodie

```
      ⊕
  ╭─────╮
  │⊙   ⊙│
  │  ≡  │
  ╰──┬──╯
╭──╱─┴─╲──╮
│╱   | |   ╲│
│    | |    │
│  ╔═════╗  │
│  ╚═════╝  │
╰───────────╯
```

Notes: ⊕ = antenna, ⊙ = robot eyes, ≡ = grill/mouth, flared top = hood up, | | = drawstrings, ╔╗╚╝ = front kangaroo pocket

### skin_ninja

```
  ┌─────┐
  │  ◈  │
  │▀▀▀▀▀│
  └──┬──┘
 ┌───┴───┐
 │ ||||  │
 └───────┘
```

### skin_wizard

```
    /\
   /  \
  ┌────┐
  │◉  ◉│
  │ ▾  │
  └─┬──┘
  ┌─┴──┐
  │~~~~│
  └────┘
```

### skin_robot

```
 ╔══════╗
 ║[◉][◉]║
 ║  --  ║
 ╠══════╣
 ║ [CC] ║
 ╚══════╝
```

---

## Aura Color Overlays

Add sparkle characters around the avatar based on equipped aura color:

| aura_color   | Overlay chars | Example wrap |
|--------------|---------------|--------------|
| aura_white   | (none)        | clean edges  |
| aura_gold    | ✦ ✧           | ✦ left/right corners, ✧ top/bottom |
| aura_blue    | ◈ ·           | ◈ corners, · sides |
| aura_purple  | ✦ ✶           | ✶ corners, ✦ top |
| aura_red     | ✸ ·           | ✸ corners |
| aura_green   | ✿ ·           | ✿ corners |
| aura_rainbow | ✦✧✸✶          | rotating chars, one per corner |

**aura_gold render example (skin_hoodie + aura_gold):**

```
  ✦     ✦
  ┌─────┐
  │◉   ◉│
  │  ▾  │
  └──┬──┘
 ┌───┴───┐
 │ (H)   │
 └───────┘
  ✧     ✧
```

---

**Avatar Card Variables:**
- `[class_emoji]` - Class emoji (💪🐺👑🔥😎🧙) or ❓ if no class yet
- `[student_name]` - From `progress.json → student.name`
- `[class_display_name]` - Full class name or "Class not yet chosen" if null
- `[class_motto]` - Short class flavor text (see below)
- `[title]` - Current level title

**Class Mottos:**
- `gigachad_builder` → "Ship it. Build it. Break it."
- `sigma_grinder` → "Efficiency is the way."
- `aura_farmer` → "Vibes over everything."
- `chaos_agent` → "Rules are suggestions."
- `meme_lord` → "Cursed but effective."
- `hackerman` → "There is no spoon."
- No class yet → "Your class awaits in Module 3."

**Avatar Card Notes:**
- Show avatar art from day 1 (no unlock gate)
- Before class selection: show ❓ emoji and "Class not yet chosen"
- After class selection: show full class identity
- `/shop` command available from Module 1 complete (students can browse and buy early)

---

## Celebration Templates

Production-quality templates for all 6 celebration event types. Claude MUST display the appropriate template for each event. No silent completions allowed.

### VIS-01: Task Completion (Minimal - single line)

Display immediately after task verification succeeds.

**Template:**
```
✅ Task Complete! +10 XP | +1 [stat_emoji] [Stat Name] | +1 ✨ Aura
```

**Variables:**
- `[stat_emoji]` - The emoji for the stat being increased (⚡🎯💡⚙️✨)
- `[Stat Name]` - The stat name (Speed, Accuracy, Creativity, Efficiency, Aura)

**Class Bonus Display:**
If the student's class provides a bonus to this stat, show it:
```
✅ Task Complete! +10 XP | +1 [stat_emoji] [Stat Name] (+1 class bonus) | +1 ✨ Aura
```

**Music:** Ping.aiff (run_in_background: true)
**Duration:** Instant (no pause in teaching)
**Behavior:** Continue immediately to next task or lesson summary

**Example:**
```
✅ Task Complete! +10 XP | +1 ⚡ Speed | +1 ✨ Aura
```

---

### VIS-02: Lesson Completion (Medium - bordered box)

Display after all tasks in a lesson are complete, before updating cheat sheet.

**Template:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎉 LESSON COMPLETE!
Lesson {M.L}: {Lesson Name}

+50 XP Bonus | +2 {stat_emoji} {Stat Name}
Total XP: {current_xp}/{next_level_xp} {progress_bar}
Aura: {balance} ({glow_emoji} {glow_level})
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Variables:**
- `{M.L}` - Module and lesson number (e.g., "2.1")
- `{Lesson Name}` - Full lesson name from curriculum.md
- `{stat_emoji}` and `{Stat Name}` - From lesson's stat_tag
- `{current_xp}` - Student's XP after lesson bonus
- `{next_level_xp}` - XP required for next level
- `{progress_bar}` - 10-character bar using ▓ (filled) and ░ (empty)
- `{balance}` - Current Aura balance
- `{glow_emoji}` - Current glow emoji (✨💫🌟⭐🌞👑)
- `{glow_level}` - Current glow level name (faint, soft, bright, radiant, blinding, transcendent)

**Progress Bar Calculation:**
```python
filled_count = int((current_xp / next_level_xp) * 10)
bar = "▓" * filled_count + "░" * (10 - filled_count)
```

**Music:** Glass.aiff (run_in_background: true)
**Duration:** Brief pause (present next content after ~1 second feel, but no actual sleep)
**Next Step:** Trigger cheat sheet update

**Example:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎉 LESSON COMPLETE!
Lesson 1.3: Your First ls Command

+50 XP Bonus | +2 ⚡ Speed
Total XP: 180/300 ▓▓▓▓▓▓░░░░
Aura: 8 (✨ faint)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### VIS-03: Level-Up (Extra Epic - INTERRUPTS flow)

Display whenever XP crosses a level threshold. This STOPS everything for the celebration and skill choice.

**Template:**
```
╔══════════════════════════════════════════════════════╗
║                                                      ║
║                  ⚡ LEVEL UP! ⚡                      ║
║                                                      ║
║               ★ ★ ★  LEVEL {N}  ★ ★ ★                ║
║                   {Title}                            ║
║                                                      ║
{evolution_line}
║                                                      ║
║            +1 Skill Point Available!                 ║
║                                                      ║
║   Stats: ⚡{spd} 🎯{acc} 💡{cre} ⚙️{eff} ✨{aur}    ║
║                                                      ║
║   XP: {current}/{next} {progress_bar} {pct}%        ║
║                                                      ║
╚══════════════════════════════════════════════════════╝
```

**Evolution Line (conditional):**
If this level triggers a class evolution (levels 4 and 7), insert:
```
║         {Old Evolution} → {New Evolution}            ║
```

Example: `║         Gigachad → Godmode Developer            ║`

If no evolution this level, omit this line entirely.

**After Template, Present Skill Choices:**
```

🎯 Choose a skill to unlock:

1. {skill_emoji} {Skill Name}
   {skill_description}
   Bonus: +{value} {stat_emoji} {Stat Name}

2. {skill_emoji} {Skill Name}
   {skill_description}
   Bonus: +{value} {stat_emoji} {Stat Name}

3. {skill_emoji} {Skill Name}
   {skill_description}
   Bonus: +{value} {stat_emoji} {Stat Name}

Type the number of your choice (1-3):
```

**Variables:**
- `{N}` - New level number
- `{Title}` - New level title
- `{Old Evolution}` / `{New Evolution}` - Class evolution names (if applicable)
- Stat values after level-up
- Skill details from skill_trees.json for current class and level

**Music:** Random sequence from music_config.json "level_up" events (4 variations)
**Behavior:** INTERRUPT teaching flow. Stop everything. Wait for student choice.
**After Choice:** Display VIS-06 (skill unlock), then resume teaching

**Example (with evolution at level 4):**
```
╔══════════════════════════════════════════════════════╗
║                                                      ║
║                  ⚡ LEVEL UP! ⚡                      ║
║                                                      ║
║               ★ ★ ★  LEVEL 4  ★ ★ ★                  ║
║                 Code Companion                       ║
║                                                      ║
║            Gigachad → Godmode Developer              ║
║                                                      ║
║            +1 Skill Point Available!                 ║
║                                                      ║
║   Stats: ⚡15 🎯10 💡18 ⚙️12 ✨32                    ║
║                                                      ║
║   XP: 650/1000 ▓▓▓▓▓▓░░░░ 65%                      ║
║                                                      ║
╚══════════════════════════════════════════════════════╝

🎵 Power Up

🎯 Choose a skill to unlock:

1. 💪 Ship It Fast
   Deploy features 20% faster
   Bonus: +2 ⚡ Speed

2. 🎨 Creative Vision
   Unlock advanced design patterns
   Bonus: +3 💡 Creativity

3. ✨ Aura Multiplier
   Earn 25% more Aura from all sources
   Bonus: +2 ✨ Aura

Type the number of your choice (1-3):
```

---

### VIS-04: Module Completion (Epic - full frame)

Display after all lessons in a module are complete. This is the BIGGEST regular celebration.

**Template:**
```
╔══════════════════════════════════════════════════════╗
║                                                      ║
║              🏆 MODULE {N} COMPLETE! 🏆              ║
║                                                      ║
║   {Module Name}                                      ║
║                                                      ║
║   ┌────────────────────────────────────────┐        ║
║   │  +200 XP        +10 ✨ Aura            │        ║
║   │  +3 {stat_emoji} {Stat Name}           │        ║
║   │                                         │        ║
║   │  Badge Earned: {Badge Name} 🏆         │        ║
║   │  "{badge_flavor_text}"                 │        ║
║   └────────────────────────────────────────┘        ║
║                                                      ║
║   Level {N}: {Title}                                 ║
║   XP: {current}/{next} {progress_bar} {pct}%        ║
║                                                      ║
║   Stats: ⚡{spd} 🎯{acc} 💡{cre} ⚙️{eff} ✨{aur}    ║
║                                                      ║
╚══════════════════════════════════════════════════════╝
```

**Variables:**
- `{N}` - Module number (1-15)
- `{Module Name}` - Full module name from curriculum.md
- `{stat_emoji}` and `{Stat Name}` - Module's primary stat (each module awards +3 to one stat)
- `{Badge Name}` and `{badge_flavor_text}` - From VIS-05 badge list
- `{Title}` - Current level title
- `{current}/{next}` - XP progress toward next level
- `{progress_bar}` - 10-character bar (▓ filled, ░ empty)
- `{pct}` - Percentage toward next level
- `{spd}{acc}{cre}{eff}{aur}` - All 5 current stat values

**Music:** Random sequence from music_config.json "module_complete" events (5 variations)
**Display:** Show sequence name: "🎵 {sequence_name}"
**Duration:** Full epic celebration - pause for effect before moving on
**Next Step:** Check if level-up triggered by the +200 XP

**Example:**
```
╔══════════════════════════════════════════════════════╗
║                                                      ║
║              🏆 MODULE 1 COMPLETE! 🏆                ║
║                                                      ║
║   Module 1: Terminal Basics                          ║
║                                                      ║
║   ┌────────────────────────────────────────┐        ║
║   │  +200 XP        +10 ✨ Aura            │        ║
║   │  +3 ⚡ Speed                            │        ║
║   │                                         │        ║
║   │  Badge Earned: Terminal Explorer 🏆    │        ║
║   │  "You've conquered the command line!"  │        ║
║   └────────────────────────────────────────┘        ║
║                                                      ║
║   Level 2: Terminal Traveler                         ║
║   XP: 285/300 ▓▓▓▓▓▓▓▓▓░ 95%                       ║
║                                                      ║
║   Stats: ⚡12 🎯6 💡7 ⚙️6 ✨15                       ║
║                                                      ║
╚══════════════════════════════════════════════════════╝

🎵 Champion's Fanfare
```

---

### VIS-05: Badge Earned (Medium - part of module celebration)

Display within the module completion frame (VIS-04). Not standalone.

**Template:**
```
Badge Earned: {Badge Name} 🏆
"{badge_flavor_text}"
```

**Badge List with Flavor Text:**
1. **Terminal Explorer** - "You've conquered the command line!"
2. **Setup Champion** - "Claude Code is yours to command!"
3. **First Contact** - "You and Claude are now collaborators!"
4. **Model Master** - "You wield Sonnet and Opus with skill!"
5. **Prompt Engineer** - "Your prompts shape reality!"
6. **Plan Mode Pro** - "You orchestrate complex workflows!"
7. **Tech Foundation** - "You understand the tools of creation!"
8. **Version Controller** - "Git is your time machine!"
9. **Web Builder** - "You craft interfaces that shine!"
10. **Agent Commander** - "You direct autonomous agents!"
11. **MCP Specialist** - "You extend Claude's capabilities!"
12. **Advanced Practitioner** - "You've mastered the advanced arts!"
13. **Product Shipper** - "You build and deploy with confidence!"
14. **Autonomous Operator** - "You orchestrate complex systems!"
15. **Claude Code Graduate** 🎓 - "You are a Claude Code master!"

**Music:** Hero.aiff (run_in_background: true)
**Context:** Always appears within VIS-04 (module completion frame)

**Example (as part of module celebration):**
```
Badge Earned: Terminal Explorer 🏆
"You've conquered the command line!"
```

---

### VIS-06: Skill Unlock (Confirmation after choice)

Display immediately after student chooses a skill during level-up flow.

**Template:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 SKILL UNLOCKED: {Skill Name}!
{skill_description}

Permanent Bonus: +{value} {stat_emoji} {Stat Name}
{Stat Name}: {old_value} → {new_value}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Variables:**
- `{Skill Name}` - The chosen skill's name
- `{skill_description}` - One-line description of what it does
- `{value}` - Stat bonus amount (e.g., +2, +3)
- `{stat_emoji}` and `{Stat Name}` - The stat being increased
- `{old_value}` - Stat value before unlock
- `{new_value}` - Stat value after unlock

**Music:** Glass.aiff (run_in_background: true)
**Behavior:** Brief confirmation, then resume teaching from where level-up interrupted

**Example:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 SKILL UNLOCKED: Creative Vision!
Unlock advanced design patterns

Permanent Bonus: +3 💡 Creativity
Creativity: 15 → 18
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Celebration Hierarchy

The celebration system prevents fatigue by matching celebration intensity to achievement size:

| Event | Visual Impact | Music | Interrupts Flow? |
|-------|--------------|-------|------------------|
| **Task Complete** | Single line + emoji | Ping.aiff | No - continue immediately |
| **Lesson Complete** | Bordered box + progress | Glass.aiff | No - brief pause |
| **Badge Earned** | Within module frame | Hero.aiff | No - part of module celebration |
| **Module Complete** | Full epic frame | Sound sequence (5 variations) | Brief pause for effect |
| **Level Up** | Extra epic + skill choice | Sound sequence (4 variations) | YES - wait for choice |
| **Skill Unlock** | Bordered confirmation | Glass.aiff | No - resume after display |

**Design Principles:**
- **Small wins feel quick:** Tasks complete instantly with minimal visual noise
- **Medium wins feel satisfying:** Lessons get a bordered celebration with context
- **Big milestones feel earned:** Modules get full-frame epic treatment
- **Level-ups demand attention:** Stop everything, make it interactive
- **Escalation feels natural:** Each tier is noticeably more impressive than the last
- **No celebration fatigue:** Quick events don't steal focus from learning

**Critical Rules:**
- NEVER skip a celebration (no silent completions)
- ALWAYS trigger music with run_in_background: true
- Level-up MUST interrupt and wait for skill choice
- Module celebration includes badge (VIS-05 within VIS-04)
- Progress bars always 10 characters (▓ filled, ░ empty)

---

## Event-to-Template Mapping

**On Task Complete:**
→ Display **VIS-01** (single-line celebration)
→ Trigger Ping.aiff (run_in_background: true)
→ Continue teaching immediately (no pause)

**On Lesson Complete:**
→ Display **VIS-02** (bordered box celebration)
→ Trigger Glass.aiff (run_in_background: true)
→ Trigger cheat sheet update
→ Brief pause before presenting next lesson

**On Module Complete:**
→ Display **VIS-04** (full-frame celebration, includes **VIS-05** badge)
→ Trigger random module_complete sequence from music_config.json (run_in_background: true)
→ Display "🎵 {sequence_name}"
→ Check if level-up triggered by XP gain

**On Level-Up (can happen during any XP award):**
→ **INTERRUPT current flow**
→ Display **VIS-03** (level-up celebration with skill choice)
→ Trigger random level_up sequence from music_config.json (run_in_background: true)
→ **Wait for student skill choice** (teaching paused)
→ Display **VIS-06** (skill unlock confirmation)
→ Resume teaching from where interrupted

**CRITICAL: No Silent Completions**
Every XP-awarding event MUST display its corresponding template. There is no code path where a completion event produces no visual output.
