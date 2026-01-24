# Game Systems Reference

Complete reference for character classes, stats, progression, and core game systems.

---

## Character Classes

Classes are selected in Module 3, Lesson 3.4 (after Claude Code is running). Until then, student has no class.

### Gigachad Builder 💪
- **Primary Stats:** Creativity (★★★★★) + Aura (★★★★☆)
- **Evolution:** Chad → Gigachad → Godmode Developer (at levels 1, 4, 7)
- **Bonus:** +1 Creativity per lesson, +20% XP for shipping features
- **Playstyle:** Build products, ship features, design systems
- **Aura Color:** Gold

### Sigma Grinder 🐺
- **Primary Stats:** Speed (★★★★★) + Efficiency (★★★★☆)
- **Evolution:** NPC → Sigma → Lone Wolf Legend (at levels 1, 4, 7)
- **Bonus:** +1 Speed per lesson, +50% streak bonuses
- **Playstyle:** Grind streaks, optimize workflows, speed through tasks
- **Aura Color:** Blue

### Aura Farmer 👑
- **Primary Stats:** Aura (★★★★★) + Speed (★★★☆☆)
- **Evolution:** Lurker → Aura Farmer → Influencer Maximus (at levels 1, 4, 7)
- **Bonus:** +2 Aura per lesson, +25% Aura from all sources
- **Playstyle:** Collect cosmetics, maximize Aura, flex status
- **Aura Color:** Rainbow

### NPC Destroyer / Chaos Agent 🔥
- **Primary Stats:** Creativity (★★★★☆) + Speed (★★★★☆)
- **Evolution:** Noob → Chaos Agent → System Breaker (at levels 1, 4, 7)
- **Bonus:** +1 Creativity and +1 Speed per lesson, 2x easter egg rewards
- **Playstyle:** Find easter eggs, creative solutions, break expectations
- **Aura Color:** Red

### Meme Lord / Shitposter 😎
- **Primary Stats:** Creativity (★★★★☆) + Aura (★★★★☆)
- **Evolution:** Normie → Meme Lord → Based Deity (at levels 1, 4, 7)
- **Bonus:** +1 Creativity per lesson, unlocks humor content
- **Playstyle:** Fun content, creative expression, casual vibes
- **Aura Color:** Purple

### Hackerman / Code Wizard 🧙
- **Primary Stats:** Efficiency (★★★★★) + Accuracy (★★★★☆)
- **Evolution:** Script Kiddie → Hackerman → Code Wizard (at levels 1, 4, 7)
- **Bonus:** +1 Efficiency per lesson, unlock advanced features earlier
- **Playstyle:** Technical mastery, automation, deep understanding
- **Aura Color:** Green

---

## Stat System

Five stats, starting at 5 each (Aura starts at 0):

| Stat | What It Measures | Grown By |
|------|-----------------|----------|
| ⚡ Speed | Terminal fluency, shortcuts, quick execution | Terminal/shortcut lessons |
| 🎯 Accuracy | Code quality, debugging, understanding | Code quality/debugging lessons |
| 💡 Creativity | Project building, design, original solutions | Project building/design lessons |
| ⚙️ Efficiency | Workflow, automation, tool mastery | Workflow/automation lessons |
| ✨ Aura | Social currency, reputation, flex | All completions (+1 small), purchases, achievements |

### How Stats Grow
- Each lesson has a `stat_tag` - the primary stat it grows (+1 to that stat)
- Class bonus: +1 extra to your class's primary stat per lesson
- Achievements: Milestone bumps (+3 to +5 on major completions)
- Skill tree: Unlocked skills give permanent stat bonuses

---

## Aura System (Triple Layer)

Aura serves THREE purposes:

### Layer 1: Currency
- Earn Aura from lessons, achievements, streaks, easter eggs
- Spend at the cosmetics shop (see shop-system.md)
- Balance tracked in `aura_system.current_balance`

### Layer 2: Glow
- Based on TOTAL Aura earned (not current balance - spending doesn't reduce glow)
- Levels: none → faint ✨ → soft 💫 → bright 🌟 → radiant ⭐ → blinding 🌞 → transcendent 👑
- Thresholds: 0, 25, 75, 150, 300, 500, 1000

### Layer 3: Reputation
- Based on total Aura earned
- Ranks: Newcomer → Known → Respected → Famous → Legendary → Mythical → Transcendent
- Displayed in status alongside glow level

### Earning Aura
- Every lesson completion: +1 Aura (base)
- Class bonus (Aura Farmer gets +2 per lesson)
- Streak milestones: +5 at 7 days, +10 at 14, +25 at 30
- Module completion: +10 Aura
- Easter eggs: +5-20 Aura
- Achievements: +3-10 Aura

---

## Skill Trees

Each class has 15 skills across 4 tiers (see skill_trees.json for full details):
- **Tier 1** (Levels 2-3): 3 beginner skills
- **Tier 2** (Levels 4-5): 4 intermediate skills
- **Tier 3** (Levels 6-7): 5 advanced skills
- **Tier 4** (Level 8+): 2 capstone skills (including 1 Ultimate)

Earn 1 skill point per level up. Skills have prerequisites. Present skill choices on level up.

When student levels up:
1. Show available skills they can unlock
2. Let them choose (explain each option in plain language)
3. Update skill_tree in progress.json
4. Show the stat bonus they gained

---

## Progression System

### Core Levels (1-8)
| Level | XP Range | Title |
|-------|----------|-------|
| 1 | 0-100 | Curious Explorer |
| 2 | 101-300 | Terminal Traveler |
| 3 | 301-600 | Command Apprentice |
| 4 | 601-1000 | Code Companion |
| 5 | 1001-1500 | Builder in Training |
| 6 | 1501-2500 | Project Pilot |
| 7 | 2501-4000 | Claude Collaborator |
| 8 | 4001+ | Code Creator |

### Endless Levels (9+)
After Level 8, every 1000 XP is a new level. Titles become custom based on class:
- Gigachad: "Godmode Developer II, III..."
- Sigma: "Lone Wolf Legend II, III..."
- Etc.

### XP Awards
- Task completion: +10 XP
- Lesson completion: +50 XP bonus
- Module completion: +200 XP bonus
- Class bonuses apply on top (e.g., Gigachad +20% for shipping)
- Skill tree passives may add bonus XP

### Badges (One per Module)
| Module | Badge |
|--------|-------|
| 1 | Terminal Explorer 🏆 |
| 2 | Setup Champion 🏆 |
| 3 | First Contact 🏆 |
| 4 | Model Master 🏆 |
| 5 | Prompt Engineer 🏆 |
| 6 | Plan Mode Pro 🏆 |
| 7 | Tech Foundation 🏆 |
| 8 | Version Controller 🏆 |
| 9 | Web Builder 🏆 |
| 10 | Agent Commander 🏆 |
| 11 | MCP Specialist 🏆 |
| 12 | Advanced Practitioner 🏆 |
| 13 | Product Shipper 🏆 |
| 14 | Autonomous Operator 🏆 |
| 15 | Claude Code Graduate 🎓 |

---

## Streak System

### How It Works
- A "day" = any calendar day where at least 1 task is completed
- Streak increments on consecutive days
- Missing a day breaks the streak (unless freeze is used)

### Streak Freeze
- 1 freeze available by default (resets weekly)
- Sigma Grinder class gets extra freezes via skill tree
- Freeze is auto-used if a day is missed

### Streak Milestones
| Days | Reward |
|------|--------|
| 3 | +5 Aura |
| 7 | +10 Aura, "Week Warrior" title option |
| 14 | +20 Aura |
| 30 | +50 Aura, "Streak Master" title earned |
| 60 | +100 Aura |
| 100 | +200 Aura, legendary cosmetic unlock |

### Streak Recovery
If streak breaks:
- Show encouragement, not punishment
- "Your streak ended at [X] days. That's still impressive!"
- Longest streak is always tracked and celebrated

---

## Easter Eggs

### Trigger Condition
- Completing 4+ lessons in a single day (beyond the 3 recommended)
- Maximum 1 easter egg trigger per week

### What Happens
1. After the 4th lesson, display a surprise message
2. Award bonus XP (+25-50) and Aura (+5-20)
3. Play surprise music (if available)
4. Reveal a hidden fun fact, joke, or mini-challenge
5. Track in `easter_eggs.discovered`

### Chaos Agent Bonus
- Chaos Agent class triggers easter eggs at 3 lessons instead of 4
- Easter egg rewards doubled for Chaos Agent

### Examples of Easter Eggs
- "Secret Achievement: Night Owl" (completing a lesson after midnight)
- "Hidden Track" (play an unexpected song)
- "Bonus Round" (a fun mini-task for extra XP)
- "The Matrix Has You" (terminal-themed surprise)

---

## Sandbox Mode

### Unlock Condition
- Unlocked at Level 5 (1001+ XP)
- Set `sandbox_unlocked: true` in progress.json

### What It Is
- Free exploration mode outside the curriculum
- Student can ask Claude to help build anything
- Still earns Aura and stats (at reduced rate: 50%)
- No structured tasks or lessons
- Good for creativity and experimentation

### Activation
When student says "sandbox" or "/sandbox":
- Verify they're Level 5+
- Enter free-form mode
- Track time spent in sandbox
- Award Aura at 50% rate for demonstrated learning

---

## Feature Unlock Schedule

Features reveal progressively to avoid overwhelming new students. Each feature unlocks when the student has enough context to understand it.

| Feature | Unlock Trigger | progress.json Field | Command |
|---------|----------------|---------------------|---------|
| Skill Tree | Module 3 complete | `feature_unlocks.skill_tree_unlocked` | `skills` or `/skills` |
| Cosmetics Shop | Module 6 complete | `feature_unlocks.shop_unlocked` | `shop` or `/shop` |
| Sandbox Mode | Level 5 reached | `feature_unlocks.sandbox_unlocked` | `sandbox` or `/sandbox` |

### Unlock Communication

**Before unlock (student tries command):**
Show friendly "locked" message with unlock condition and encouragement.

**On unlock (milestone reached):**
Show celebration banner with feature description and command hint.

**After unlock:**
Feature works normally. Include in status displays.

### Why These Thresholds

- **Skill Tree at Module 3:** Class selection happens in Module 3, Lesson 4. Skills require understanding of stats and class bonuses. Before Module 3, skill points have no context.
- **Shop at Module 6:** Students need ~60+ Aura to afford basic items. Module 6 gives enough accumulated Aura for first purchase. Also needs class context for class-locked items.
- **Sandbox at Level 5:** Free experimentation requires confidence in basics. Level 5 (~400 XP) means student has completed enough tasks to self-direct.

---

## Class Selection Event (Module 3, Lesson 3.4)

This is a special scripted event. When the student reaches this point:

1. Play dramatic music
2. Present the 6 classes with ASCII art:

```
╔══════════════════════════════════════════════════════╗
║            ⚔️  CHOOSE YOUR CLASS  ⚔️                ║
╠══════════════════════════════════════════════════════╣
║                                                      ║
║  1. 💪 Gigachad Builder                              ║
║     "I want to BUILD things"                         ║
║     Primary: Creativity + Aura                       ║
║                                                      ║
║  2. 🐺 Sigma Grinder                                ║
║     "I want to be FAST and EFFICIENT"                ║
║     Primary: Speed + Efficiency                      ║
║                                                      ║
║  3. 👑 Aura Farmer                                  ║
║     "I want maximum FLEX and STATUS"                 ║
║     Primary: Aura + Speed                            ║
║                                                      ║
║  4. 🔥 NPC Destroyer / Chaos Agent                  ║
║     "I want to find SECRETS and break RULES"         ║
║     Primary: Creativity + Speed                      ║
║                                                      ║
║  5. 😎 Meme Lord / Shitposter                       ║
║     "I want to have FUN and be CREATIVE"             ║
║     Primary: Creativity + Aura                       ║
║                                                      ║
║  6. 🧙 Hackerman / Code Wizard                      ║
║     "I want TECHNICAL MASTERY"                       ║
║     Primary: Efficiency + Accuracy                   ║
║                                                      ║
╚══════════════════════════════════════════════════════╝
```

3. Let them choose (explain each in detail if asked)
4. Confirm their choice
5. Update progress.json: set class, apply first stat bonus
6. Show their character with new class identity
7. Award +50 XP for class selection
8. Big celebration moment
