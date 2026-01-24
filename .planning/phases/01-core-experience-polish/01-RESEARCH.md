# Phase 1: Core Experience Polish - Research

**Researched:** 2026-01-23
**Domain:** CLI gamification, terminal UI, educational game mechanics
**Confidence:** HIGH

## Summary

Phase 1 polishes the existing RPG learning platform to "can't stop playing" quality. The research focused on three key technical domains: **ASCII celebration systems** (visual feedback with animations and colors), **CLI shop interfaces** (browsing/purchasing cosmetics), and **curriculum quality patterns** (gamified education best practices).

The standard approach for 2026 CLI games combines:
- Unicode box-drawing characters for professional UI frames
- ANSI escape codes for color (widely supported across all terminals)
- Non-blocking sound sequences (already implemented with afplay)
- Progressive disclosure in menus (arrow key navigation)
- Narrative-driven learning with immediate feedback loops

Existing music_config.json and cosmetics.json structures are well-designed. The research validates building on these foundations rather than introducing new libraries or frameworks.

**Primary recommendation:** Use native terminal capabilities (ANSI codes, Unicode box-drawing) with existing JSON configurations. Avoid external dependencies for core celebration/shop features. Focus polish on visual design, timing, and psychological reward loops.

## Standard Stack

The established libraries/tools for CLI gamification and terminal UI:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| ANSI Escape Codes | Universal | Color, cursor control, styling | Built into all modern terminals (2016+), zero dependencies |
| Unicode Box-Drawing | U+2500-U+257F | UI frames, borders, progress bars | 128 characters available, native terminal support |
| afplay (macOS) | System Built-in | Non-blocking sound playback | Already implemented, proven reliable, instant feedback |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| readline (stdin) | Node.js built-in | Arrow key navigation, input handling | CLI shop menu navigation |
| JSON config files | N/A | Data-driven content (cosmetics, music, skills) | Already in use, clean separation of data/logic |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Native ANSI codes | chalk, ansi-styles (npm) | External dependency for what's built-in. Adds 50-100KB for color functions. |
| Unicode box-drawing | ASCII-only characters | Less professional look, limited visual hierarchy |
| afplay sequences | Single background music track | Less impactful celebrations, no variety |
| JSON configs | Hardcoded in CLAUDE.md | Harder to modify, no data reuse |

**Installation:**
```bash
# No installation needed - all core tech is built-in
# ANSI codes: Supported natively (macOS, Linux, Windows 10+)
# Unicode: Supported by all modern terminals
# afplay: Pre-installed on macOS (/usr/bin/afplay)
```

## Architecture Patterns

### Recommended Project Structure
```
Claude Code 101/
├── cosmetics.json           # Shop items, prices, rarity
├── music_config.json        # Sound sequences, event triggers
├── skill_trees.json         # Class abilities, stat bonuses
├── curriculum.md            # 15 modules, lessons, tasks
├── CLAUDE.md               # Teaching patterns, game mechanics
├── progress.json           # Student state (XP, stats, inventory)
└── MY_CHEAT_SHEET.md       # Auto-updated reference guide
```

### Pattern 1: Celebration Display (Task/Lesson/Module)

**What:** Immediate visual + audio feedback on completion events

**When to use:** Every completion event (task, lesson, module, level-up, badge)

**Structure:**
```
1. ASCII art display (instant visual impact)
2. Sound trigger (non-blocking, runs in background)
3. Stat/XP gains shown (numeric feedback)
4. Progress.json update (single atomic write)
```

**Example:**
```markdown
# Task Complete (simple)
✅ Task Complete! +10 XP | +1 ⚡ Speed | +1 ✨ Aura

# Lesson Complete (bordered)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎉 LESSON COMPLETE!
Lesson 2.1: Getting Your API Key
+50 XP Bonus | +2 ⚙️ Efficiency
Total XP: 175/300
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Module Complete (full frame with color)
╔══════════════════════════════════════════╗
║     🏆 MODULE COMPLETE! 🏆              ║
║                                          ║
║     Module 2: Installing Claude Code     ║
║                                          ║
║     +200 XP | +10 Aura                  ║
║     Badge Earned: Setup Champion 🏆      ║
║                                          ║
║     Stats Boosted: ⚙️ Efficiency +3     ║
╚══════════════════════════════════════════╝
```

**Sound Integration:**
```bash
# Task complete (single sound, non-blocking)
(afplay /System/Library/Sounds/Ping.aiff 2>/dev/null || true) &

# Module complete (sequence with timing)
(afplay /System/Library/Sounds/Hero.aiff 2>/dev/null || true) &
(sleep 1.5 && afplay /System/Library/Sounds/Glass.aiff 2>/dev/null || true) &
(sleep 3 && afplay /System/Library/Sounds/Sosumi.aiff 2>/dev/null || true) &
```

**CRITICAL:** All music commands MUST use `run_in_background: true` in Bash tool calls.

### Pattern 2: Level-Up Animation

**What:** Multi-stage celebration with skill tree interaction

**When to use:** XP crosses level threshold

**Sequence:**
```
1. Stop current teaching
2. Display ASCII explosion/fireworks
3. Trigger level-up sound sequence (random from 4 variations)
4. Show evolution title change (if applicable)
5. Display stat gains
6. Present skill point choice (interactive menu)
7. Update progress.json (atomic write)
8. Resume teaching
```

**Example Display:**
```
╔══════════════════════════════════════════╗
║          ⚡ LEVEL UP! ⚡                ║
║                                          ║
║    ★ ★ ★ LEVEL 3 ★ ★ ★                ║
║    Command Apprentice                    ║
║                                          ║
║    +1 Skill Point Available!             ║
║    Stats: ⚡12 🎯8 💡10 ⚙️9 ✨15       ║
║                                          ║
║    ▓▓▓░░░░░░░ 301/600 XP               ║
╚══════════════════════════════════════════╝

Choose a skill to unlock:
1. ⚡ Quick Draw - Reduce command typing time (+2 Speed)
2. 🎯 Debug Vision - Spot errors faster (+2 Accuracy)
3. 💡 Creative Spark - Unlock bonus project ideas (+2 Creativity)

Which skill? (1-3):
```

### Pattern 3: CLI Shop Interface

**What:** Browseable cosmetics store with categories and purchasing

**When to use:** Student types `/shop` or `shop`

**Flow:**
```
1. Display current Aura balance prominently
2. Show category menu (skins, themes, sounds, accessories)
3. Student selects category (arrow keys or number)
4. Display items with price, rarity, description
5. Student selects item
6. Confirm purchase (show cost, check balance)
7. Deduct Aura, update progress.json customization
8. Show equipped item in next status display
```

**Example Display:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💰 COSMETICS SHOP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Your Aura: 285 ✨

Categories:
1. 🎭 Character Skins (26 items)
2. 🌈 Aura Colors (9 items)
3. 🎨 Terminal Themes (15 items)
4. 🎵 Sound Packs (4 items)
5. ✨ Accessories (12 items)
6. 👑 Titles (10 items)

Select category (1-6) or 'q' to quit:
```

**Category View (example: Skins):**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎭 CHARACTER SKINS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Your Aura: 285 ✨

 1. [OWNED] Default - The classic look (FREE)
 2. Hoodie Coder - Cozy coding vibes (50 Aura) ⭐
 3. Business Mode - Professional developer look (75 Aura) ⭐
 4. Code Ninja - Silent and deadly coder (100 Aura) ⭐
 5. Wizard Robe - Mystical developer energy (125 Aura) ⭐⭐
 6. Cyberpunk - Neon-lit future coder (150 Aura) ⭐⭐
 7. Golden God - Pure flex energy (350 Aura) ⭐⭐⭐

Select item (1-7), 'b' for back, 'q' to quit:
```

**Implementation Pattern:**
- Use Node.js readline for arrow key navigation (optional enhancement)
- Start with number selection (simpler, works immediately)
- JSON structure from cosmetics.json already complete
- Handle "insufficient Aura" gracefully: "Need 65 more Aura! Complete 4 more lessons."

### Pattern 4: Progress Bar Design

**What:** Visual representation of XP/streak/completion progress

**When to use:** Status display, XP gains, loading states

**Standard Patterns:**
```javascript
// XP Progress (use Unicode block characters)
XP: 175/300 ▓▓▓▓▓░░░░░ 58%

// Streak Display
Streak: 7 days 🔥🔥🔥🔥🔥🔥🔥 (Next milestone: 14 days)

// Module Completion
Progress: ▓▓▓░░░░░░░░░░░░ 3/15 modules (20%)

// Character Options:
// ▓ = filled block (U+2593)
// ░ = empty block (U+2591)
// ▓▓▓░░░ = smooth visual gradient
```

**Implementation (pseudo-code):**
```javascript
function renderProgressBar(current, max, width = 10) {
  const percent = current / max;
  const filled = Math.floor(percent * width);
  const empty = width - filled;
  return '▓'.repeat(filled) + '░'.repeat(empty);
}

// Usage:
const xpBar = renderProgressBar(175, 300, 10); // ▓▓▓▓▓░░░░░
console.log(`XP: 175/300 ${xpBar} 58%`);
```

### Pattern 5: ANSI Color Usage

**What:** Strategic color to highlight status, rewards, warnings

**When to use:** Stat displays, celebrations, error messages, rarity indicators

**Standard ANSI Codes:**
```
\x1b[0m  = Reset (always end with this)
\x1b[1m  = Bold/bright
\x1b[31m = Red (errors, warnings)
\x1b[32m = Green (success, completions)
\x1b[33m = Yellow (attention, warnings)
\x1b[34m = Blue (info, links)
\x1b[35m = Magenta (rare items, special)
\x1b[36m = Cyan (highlights, accents)
\x1b[37m = White (default text)
\x1b[90m = Gray (dimmed, secondary info)
```

**Rarity Color Scheme (matches RPG conventions):**
```javascript
const rarityColors = {
  common: '\x1b[37m',      // White
  uncommon: '\x1b[32m',    // Green
  rare: '\x1b[34m',        // Blue
  epic: '\x1b[35m',        // Magenta
  legendary: '\x1b[33m'    // Yellow (gold)
};

// Example:
console.log(`${rarityColors.legendary}Golden God${'\x1b[0m'} - Pure flex energy (350 Aura)`);
// Output: "Golden God" in yellow, rest in default color
```

**Best Practices:**
- Always reset color after use (`\x1b[0m`)
- Use sparingly - too much color = visual noise
- Match intent: green = success, red = error, yellow = caution
- Test on dark AND light terminal themes
- Reference cosmetics.json `terminal_themes` for user preferences

### Anti-Patterns to Avoid

- **Blocking music commands:** Never use afplay without `run_in_background: true`. Music must NEVER freeze teaching flow.
- **Multiple progress.json writes:** Always read once, calculate all changes, write once atomically. Eliminates 1.5-2s latency per update.
- **Hardcoded celebration text:** Use music_config.json and cosmetics.json for data-driven content.
- **Silent completions:** Every task/lesson MUST trigger celebration (visual + sound + stats).
- **Overwhelming beginners:** One task at a time. Don't show full curriculum or advanced features early.
- **Inconsistent feedback:** Task = small celebration, Lesson = medium, Module = epic. Clear hierarchy.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Arrow key navigation | Raw stdin parsing | readline (Node.js built-in) | Handles terminal modes, escape sequences, cross-platform |
| Color formatting | String concatenation | ANSI code constants | Easier to read, maintain, test on different themes |
| Sound sequence timing | setTimeout chains | Parallel bash commands with sleep | Non-blocking, survives failures, cleaner code |
| XP curve balancing | Manual level tables | Formula: `(level/x)^y` | Scalable to infinite levels, easy to tune |
| Progress tracking | In-memory objects | progress.json (file-based) | Survives crashes, debuggable, shareable |
| Box drawing | ASCII art generators | Unicode box-drawing chars | Professional look, terminal-native, accessible |

**Key insight:** Terminal capabilities (ANSI, Unicode, built-in commands) are more reliable and performant than external libraries. The ecosystem has converged on "use what's built-in" for CLI tools.

## Common Pitfalls

### Pitfall 1: Music Commands Block Teaching Flow

**What goes wrong:** Using afplay synchronously freezes terminal until sound completes (1-3 seconds per event)

**Why it happens:** Default bash commands wait for completion before returning control

**How to avoid:**
- ALWAYS use `run_in_background: true` in Bash tool
- ALWAYS use error suppression: `(afplay ... 2>/dev/null || true) &`
- Test that teaching resumes immediately while sound plays

**Warning signs:**
- 1-3 second pause after task completion
- Teaching feels sluggish or unresponsive
- Multiple sounds overlap (not intentional sequences)

### Pitfall 2: Progress.json Write Storms

**What goes wrong:** Multiple Edit/Write calls to progress.json cause 5-6 file operations per task completion (1.5-2s latency)

**Why it happens:** Updating XP, then stats, then arrays, then positions separately

**How to avoid:**
1. Read progress.json ONCE
2. Calculate ALL changes in memory (XP, stats, aura, arrays, positions)
3. Write complete updated JSON in ONE operation
4. Display results to student

**Warning signs:**
- Noticeable delay after "task complete" message
- File system thrashing (visible in Activity Monitor)
- Inconsistent data (writes interleaved)

**Correct Pattern:**
```javascript
// BAD (5-6 file operations)
progress.xp += 10;
writeFile(progress); // Write 1
progress.stats.speed += 1;
writeFile(progress); // Write 2
progress.stats.aura += 1;
writeFile(progress); // Write 3
// ...etc

// GOOD (1 file operation)
const updates = {
  xp: progress.xp + 10,
  stats: {
    ...progress.stats,
    speed: progress.stats.speed + 1,
    aura: progress.stats.aura + 1
  },
  // ...all other updates
};
writeFile({ ...progress, ...updates }); // Single write
```

### Pitfall 3: Unicode/ANSI Terminal Compatibility

**What goes wrong:** Box-drawing characters render as `?` or garbled text on some terminals

**Why it happens:** Terminal not configured for UTF-8 encoding

**How to avoid:**
- Verify terminal encoding: `echo $LANG` should include `UTF-8`
- Test on default macOS Terminal.app (most conservative)
- Provide ASCII fallback for rare edge cases
- Document in CLAUDE.md: "Requires UTF-8 terminal (default on macOS/Linux)"

**Warning signs:**
- Boxes render as question marks
- Progress bars show weird characters
- User reports "broken display"

### Pitfall 4: XP Curve Imbalance

**What goes wrong:** Levels feel too easy (spam levels) or too grindy (stuck forever)

**Why it happens:** Linear XP requirements or poorly tuned exponential formula

**How to avoid:**
- Use exponential formula: `XP_needed = base * (level ^ exponent)`
- Current system (0-100, 101-300, 301-600, etc.) is well-balanced for 15-module curriculum
- Test: Student should level up 1-2 times per module (avg 3-4 lessons per level)
- Adjust if levels come too fast (lower exponent) or too slow (raise base)

**Warning signs:**
- Multiple level-ups in single lesson (too easy)
- Stuck at same level for 5+ lessons (too grindy)
- Student loses interest in XP (not meaningful)

### Pitfall 5: Celebration Fatigue

**What goes wrong:** Constant celebrations become noise, lose meaning

**Why it happens:** Every small action triggers epic visuals/sounds

**How to avoid:**
- **Task complete:** Minimal (single line + ping sound)
- **Lesson complete:** Medium (bordered box + glass sound)
- **Module complete:** Epic (full frame + sound sequence + badge)
- **Level up:** Extra epic (animation + skill choice)
- Clear hierarchy: small → medium → epic

**Warning signs:**
- Student says "too much happening"
- Celebrations feel repetitive
- Important milestones don't feel special

### Pitfall 6: Shop UI Complexity

**What goes wrong:** Shop interface overwhelming, hard to navigate, unclear costs

**Why it happens:** Showing all 60+ items at once, complex menu trees

**How to avoid:**
- **Progressive disclosure:** Categories first, items second
- **Clear Aura display:** Show balance at top of every screen
- **Owned status:** Mark purchased items clearly (`[OWNED]`)
- **Insufficient funds:** Helpful message: "Need 50 more Aura! Complete 3 more lessons."
- **Rarity indicators:** Visual hierarchy (stars, colors)

**Warning signs:**
- Student says "where do I start?"
- Confusion about current balance
- Accidental purchases (unclear confirmation)

## Code Examples

Verified patterns from terminal UI best practices:

### ANSI Box-Drawing Template
```javascript
// Source: Unicode Box-Drawing Block (U+2500-U+257F)
// Widely supported in all modern terminals (macOS, Linux, Windows 10+)

const boxChars = {
  topLeft: '╔',
  topRight: '╗',
  bottomLeft: '╚',
  bottomRight: '╝',
  horizontal: '═',
  vertical: '║',
  thinHorizontal: '─',
  thinVertical: '│'
};

function drawBox(content, width = 40) {
  const top = boxChars.topLeft + boxChars.horizontal.repeat(width) + boxChars.topRight;
  const bottom = boxChars.bottomLeft + boxChars.horizontal.repeat(width) + boxChars.bottomRight;

  const lines = content.map(line => {
    const padding = width - line.length;
    return boxChars.vertical + line + ' '.repeat(padding) + boxChars.vertical;
  });

  return [top, ...lines, bottom].join('\n');
}

// Usage:
const levelUpBox = drawBox([
  '          ⚡ LEVEL UP! ⚡                ',
  '                                          ',
  '    ★ ★ ★ LEVEL 3 ★ ★ ★                ',
  '    Command Apprentice                    '
], 42);
console.log(levelUpBox);
```

### Music Sequence Execution
```javascript
// Source: music_config.json "dj_system.sequence_execution_logic"
// Proven pattern: Non-blocking, parallel execution with delays

function playMusicSequence(event) {
  const config = musicConfig.events[event];

  if (config.sequences) {
    // Pick random sequence (module/level events)
    const sequence = config.sequences[Math.floor(Math.random() * config.sequences.length)];
    const commands = sequence.sounds.map(sound => {
      const delay = sound.delay_seconds;
      if (delay === 0) {
        return `(afplay /System/Library/Sounds/${sound.file} 2>/dev/null || true) &`;
      } else {
        return `(sleep ${delay} && afplay /System/Library/Sounds/${sound.file} 2>/dev/null || true) &`;
      }
    });

    // Execute all commands together (parallel with delays)
    const fullCommand = commands.join(' ');
    Bash({
      command: fullCommand,
      run_in_background: true,
      description: `Play sequence: ${sequence.name}`
    });

    // Optional: Display sequence name
    console.log(`🎵 ${sequence.name}`);
  } else if (config.sound) {
    // Single sound (task/lesson/badge events)
    Bash({
      command: `(afplay /System/Library/Sounds/${config.sound} 2>/dev/null || true) &`,
      run_in_background: true,
      description: `Play ${event} sound`
    });
  }
}

// Usage:
playMusicSequence('module_complete'); // Plays random celebration sequence
playMusicSequence('task_complete');   // Plays single ping sound
```

### XP Progression Formula
```javascript
// Source: How to Make an RPG - Levels (howtomakeanrpg.com)
// Formula: XP_needed = (level / divisor) ^ exponent

const levelThresholds = {
  1: 0,
  2: 100,
  3: 300,
  4: 600,
  5: 1000,
  6: 1500,
  7: 2500,
  8: 4000
};

// For levels 9+: Every 1000 XP = 1 level
function getXPForLevel(level) {
  if (level <= 8) {
    return levelThresholds[level];
  } else {
    // Endless levels: 4000 + (level-8)*1000
    return 4000 + ((level - 8) * 1000);
  }
}

function checkLevelUp(currentXP, currentLevel) {
  const nextLevelXP = getXPForLevel(currentLevel + 1);
  if (currentXP >= nextLevelXP) {
    return {
      leveledUp: true,
      newLevel: currentLevel + 1,
      nextLevelXP: getXPForLevel(currentLevel + 2)
    };
  }
  return { leveledUp: false };
}

// Usage:
const result = checkLevelUp(310, 2); // XP: 310, Level: 2
if (result.leveledUp) {
  console.log(`Level Up! Now level ${result.newLevel}`);
  // Trigger level-up animation + music
}
```

### Atomic Progress Update
```javascript
// Source: CLAUDE.md Section 21 "Performance Optimization Guidelines"
// Pattern: Read → Calculate → Write (single operation)

async function completeTask(taskId) {
  // 1. READ (once)
  const progress = await readJSON('progress.json');

  // 2. CALCULATE (all updates in memory)
  const lesson = getCurrentLesson(taskId);
  const classBonus = getClassBonus(progress.student.class, lesson.stat_tag);

  const updates = {
    student: {
      ...progress.student,
      total_xp: progress.student.total_xp + 10
    },
    stats: {
      ...progress.stats,
      [lesson.stat_tag]: progress.stats[lesson.stat_tag] + 1 + classBonus,
      aura: progress.stats.aura + 1
    },
    completed: {
      ...progress.completed,
      tasks: [...progress.completed.tasks, taskId]
    },
    current_position: {
      ...progress.current_position,
      task: progress.current_position.task + 1
    },
    last_session: new Date().toISOString().split('T')[0] // YYYY-MM-DD
  };

  // Check for level-up
  const levelUpResult = checkLevelUp(updates.student.total_xp, progress.student.level);
  if (levelUpResult.leveledUp) {
    updates.student.level = levelUpResult.newLevel;
    updates.skill_tree.points_available += 1;
  }

  // 3. WRITE (once, atomically)
  await writeJSON('progress.json', { ...progress, ...updates });

  // 4. DISPLAY
  console.log(`✅ Task Complete! +10 XP | +1 ${lesson.stat_tag} | +1 ✨ Aura`);

  // Play music (non-blocking)
  playMusicSequence('task_complete');

  // Handle level-up if triggered
  if (levelUpResult.leveledUp) {
    await showLevelUpAnimation(levelUpResult.newLevel);
  }
}
```

### CLI Shop Category Display
```javascript
// Source: CLI UX Best Practices (evilmartians.com)
// Pattern: Progressive disclosure, clear hierarchy

function displayShopCategory(categoryName, items, currentAura) {
  const header = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${categoryName.toUpperCase()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Your Aura: ${currentAura} ✨
`;

  const rarityStars = {
    common: '⭐',
    uncommon: '⭐⭐',
    rare: '⭐⭐⭐',
    epic: '⭐⭐⭐⭐',
    legendary: '⭐⭐⭐⭐⭐'
  };

  const itemLines = items.map((item, index) => {
    const owned = item.owned ? '[OWNED] ' : '';
    const stars = rarityStars[item.rarity] || '';
    const canAfford = currentAura >= item.price;
    const color = canAfford ? '\x1b[32m' : '\x1b[90m'; // Green if affordable, gray if not

    return `${color} ${index + 1}. ${owned}${item.name} - ${item.description} (${item.price} Aura) ${stars}\x1b[0m`;
  });

  const footer = `
Select item (1-${items.length}), 'b' for back, 'q' to quit:`;

  console.log(header + '\n' + itemLines.join('\n') + footer);
}

// Usage:
const skins = cosmeticsData.character_skins.items;
displayShopCategory('🎭 Character Skins', skins, 285);
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Emoji-only feedback | Unicode box-drawing + ANSI colors | 2020+ | Professional UI, better visual hierarchy |
| Synchronous sounds | Parallel afplay sequences with sleep | 2024 (this project) | Non-blocking celebrations, no freezing |
| Linear XP curves | Exponential formulas | RPG industry standard | Balanced progression, endgame viability |
| Hardcoded content | JSON-driven data (cosmetics, music, skills) | Modern game dev | Easy to modify, data-driven design |
| Two-terminal pattern | Single conversation (GSD pattern) | 2026 (this phase) | Less beginner confusion, collaborative feel |
| Points/Badges (Gamification 1.0) | Story/Flow (Gamification 2.0) | 2025-2026 shift | Higher engagement, better retention |

**Deprecated/outdated:**
- **ASCII-only box drawing** (replaced by Unicode box-drawing characters in 2020+)
- **External color libraries (chalk, ansi-styles)** for simple coloring (ANSI codes are now universal)
- **Separate music player dependencies** (afplay is built-in and reliable on macOS)
- **Two-terminal teaching pattern** (cognitive overhead for beginners, documentation-reality mismatch)

## Open Questions

Things that couldn't be fully resolved:

1. **Arrow Key Navigation in Shop**
   - What we know: Node.js readline supports arrow keys, inquirer.js exists as library
   - What's unclear: Complexity vs. value (number selection works fine)
   - Recommendation: Start with number selection (v1), add arrow keys if users request (v2)

2. **ASCII Art Frame Animation Timing**
   - What we know: Termynal uses async/await, AnimASCII.js supports frame delays (ms)
   - What's unclear: Optimal frame rate for level-up "explosion" animation
   - Recommendation: Start with static ASCII art (instant), add animation if needed. Music sequences already provide dynamic feel (3-6 seconds).

3. **Terminal Theme Auto-Detection**
   - What we know: Can detect dark/light mode on macOS via `defaults read -g AppleInterfaceStyle`
   - What's unclear: Whether to auto-apply color scheme or let user choose
   - Recommendation: Let user choose from cosmetics shop (more agency, part of progression)

4. **Curriculum Completeness Bar**
   - What we know: 15 modules, ~60 lessons total (exact count TBD after audit)
   - What's unclear: How many tasks per module varies widely (Module 1: 21 tasks, others unknown)
   - Recommendation: Audit curriculum.md first, calculate total tasks, then build progress % formula

5. **Class-Locked Cosmetics Display**
   - What we know: Some items have `"class_locked": "gigachad_builder"` field
   - What's unclear: Show grayed-out to other classes, or hide entirely?
   - Recommendation: Show but mark as "Requires [Class Name] Class" (aspirational, clear)

## Sources

### Primary (HIGH confidence)
- [Unicode Box-Drawing Characters](https://en.wikipedia.org/wiki/Box-drawing_characters) - Official Unicode standard U+2500-U+257F
- [ANSI Escape Codes](https://gist.github.com/fnky/458719343aabd01cfb17a3a4f7296797) - Comprehensive ANSI code reference
- [Build Your Own Command Line with ANSI](https://www.lihaoyi.com/post/BuildyourownCommandLinewithANSIescapecodes.html) - Practical ANSI implementation guide
- [CLI UX Best Practices: Progress Displays](https://evilmartians.com/chronicles/cli-ux-best-practices-3-patterns-for-improving-progress-displays) - Professional CLI patterns
- cosmetics.json (project file) - Complete shop structure
- music_config.json (project file) - Proven sound sequence implementation
- CLAUDE.md (project file) - Teaching patterns, game mechanics

### Secondary (MEDIUM confidence)
- [How to Make an RPG: Levels](https://howtomakeanrpg.com/r/a/how-to-make-an-rpg-levels.html) - XP progression formulas
- [Converting Levels Into XP](https://blog.jakelee.co.uk/converting-levels-into-xp-vice-versa/) - XP calculation patterns
- [Gamification in Learning 2026](https://www.gocadmium.com/resources/gamification-in-learning) - Gamification 1.0 → 2.0 shift
- [Gamified Learning Platforms 2026](https://training.safetyculture.com/blog/gamified-learning-platforms/) - Story/Flow over Points/Badges
- [Interactive CLI Menu (GitHub)](https://github.com/ddosnotification/interactive-cli-menu) - No-dependency menu navigation
- [Inquirer.js Tutorial](https://www.digitalocean.com/community/tutorials/nodejs-interactive-command-line-prompts) - Arrow key prompt patterns

### Tertiary (LOW confidence - general context)
- [ASCII Animation Timing](https://llizard.etherwork.net/ascii-animation/ascii-animlesson.html) - Frame timing techniques
- [Termynal](https://github.com/ines/termynal) - Terminal animation library (async/await)
- [AnimASCII.js](https://github.com/TheGreatRambler/AnimASCII.js/) - ASCII animation with frame delays
- [CLI RPG Games](https://github.com/facundoolano/rpg-cli) - Terminal RPG implementations
- [AsciiPatrol](https://www.tecmint.com/best-linux-terminal-console-games/) - Terminal game with animations

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - ANSI/Unicode are universal, afplay proven in project
- Architecture: HIGH - Patterns verified in existing code (music_config.json, cosmetics.json)
- Pitfalls: HIGH - Based on performance optimization notes in CLAUDE.md
- Shop UI: MEDIUM - Patterns from web search, need implementation validation
- Animation timing: LOW - No specific CLI frame animation examples for level-up

**Research date:** 2026-01-23
**Valid until:** ~60 days (terminal standards stable, gamification trends evolving)

**Key gaps filled by this research:**
1. ✅ ASCII art implementation (Unicode box-drawing, ANSI colors)
2. ✅ Celebration sequence timing (music sequences + visual displays)
3. ✅ CLI shop patterns (progressive disclosure, rarity indicators)
4. ✅ Gamification best practices 2026 (Gamification 2.0: Story/Flow)
5. ✅ XP progression formulas (exponential curves, balance)
6. ✅ Terminal animation options (static vs. frame-based)

**Recommended next step:** Planning can proceed with confidence. All major technical questions answered, patterns proven, no blocking unknowns.
