# Game Mechanics Calculation Rules

This document provides AUTHORITATIVE formulas for all game mechanics. When in doubt, these calculations are correct.

---

## 1. Task Completion XP Calculation

**Base XP:**
```
base_task_xp = 10
```

**Class XP Modifiers:**
```
Gigachad Builder: +20% when task creates files/features
  - Check if task involves: file creation, function implementation, feature building
  - If yes: task_xp = base_task_xp * 1.2 = 12 XP
  - If no: task_xp = base_task_xp = 10 XP

All other classes: no task XP modifier
  - Sigma bonus is on streaks (not XP)
  - Aura Farmer bonus is on Aura (not XP)
  - Others have no XP modifiers
```

**Total Task XP:**
```
total_task_xp = floor(base_task_xp + class_bonus_xp)
```

**Example (Gigachad creating a file):**
```
base_task_xp = 10
class_bonus_xp = 10 * 0.2 = 2
total_task_xp = 10 + 2 = 12 XP
```

**Example (Sigma completing any task):**
```
base_task_xp = 10
class_bonus_xp = 0 (Sigma bonus is on streaks)
total_task_xp = 10 XP
```

---

## 2. Stat Growth Per Task

**Stat Tag System:**
```
Each lesson has a stat_tag (Speed, Accuracy, Creativity, Efficiency)
On task completion:
  1. Award +1 to the lesson's stat_tag stat
  2. Award +1 to class primary stat (ALWAYS, every task)
  3. Award Aura based on class
```

**Class Primary Stat Bonuses (PER TASK):**
```
Gigachad Builder:
  - +1 Creativity (always, every task)

Sigma Grinder:
  - +1 Speed (always, every task)

Aura Farmer:
  - +1 Aura (extra, on top of base +1) = +2 Aura per task total

Chaos Agent (NPC Destroyer):
  - +1 Creativity (always, every task)
  - +1 Speed (always, every task)
  - Both bonuses apply simultaneously

Meme Lord:
  - +1 Creativity (always, every task)

Hackerman (Code Wizard):
  - +1 Efficiency (always, every task)
```

**Example Task Completion (Gigachad, Speed lesson):**
```
Lesson stat_tag: Speed
Before: Speed 10, Creativity 15
After:
  - Speed +1 (from stat_tag) = 11
  - Creativity +1 (from class bonus) = 16
Result: Speed 11, Creativity 16
```

**Example Task Completion (Chaos Agent, Speed lesson):**
```
Lesson stat_tag: Speed
Before: Speed 10, Creativity 8
After:
  - Speed +1 (from stat_tag) = 11
  - Speed +1 (from class bonus) = 12
  - Creativity +1 (from class bonus) = 9
Result: Speed 12, Creativity 9
```

**Aura Growth Per Task:**
```
Base Aura gain: +1 (all classes)
Aura Farmer class: +2 Aura per task (not +1)

Example (Aura Farmer):
  Before: Aura 35
  After task: Aura 35 + 2 = 37
```

---

## 3. Streak Freeze Logic

**On Session Start (every time):**
```
1. Read last_session date from progress.json
2. Calculate days_gap = today - last_session

3. CASE: days_gap == 0 (same day)
   - No streak change
   - Skip all streak logic

4. CASE: days_gap == 1 (consecutive day)
   - streak_days += 1
   - Check for streak milestones (3, 7, 14, 30, 60, 100)
   - Award milestone Aura if threshold reached

5. CASE: days_gap == 2 AND streak_freeze_available == true (1 day missed, freeze available)
   - Auto-use freeze: streak_days += 1 (streak preserved!)
   - Set streak_freeze_available = false
   - Display: "⚡ Streak Freeze used! Your [X]-day streak is safe."
   - Check for streak milestones normally

6. CASE: days_gap == 2 AND streak_freeze_available == false (1 day missed, no freeze)
   - Streak broken: save longest_streak if current > longest
   - Set streak_days = 1
   - Display: "Your [X]-day streak ended. That's still impressive! Starting fresh."

7. CASE: days_gap > 2 (multiple days missed)
   - Streak broken: save longest_streak if current > longest
   - Set streak_days = 1
   - Freeze doesn't help (can't skip 2+ days)
   - Display encouragement

8. Update last_session = today
```

**Freeze Reset (weekly):**
```
1. Track last_freeze_reset date in progress.json
2. On session start, check if new week started (current week != last week)
3. If new week (Monday 00:00):
   - streak_freeze_available = true
   - last_freeze_reset = this_week_monday

Sigma Grinder class:
  - Check skill_tree.skills_unlocked for freeze-related skills
  - Some skills grant extra freezes (2 available instead of 1)
```

**Streak Milestones:**
```
Days | Reward
-----|-------
3    | +5 Aura
7    | +10 Aura + "Week Warrior" title option
14   | +20 Aura
30   | +50 Aura + "Streak Master" title earned
60   | +100 Aura
100  | +200 Aura + legendary cosmetic unlock
```

**Sigma Grinder Streak Bonus:**
```
Sigma gets +50% streak milestone bonuses:
- 7 days: +10 Aura becomes +15 Aura
- 14 days: +20 Aura becomes +30 Aura
- 30 days: +50 Aura becomes +75 Aura
- Etc.
```

---

## 4. Skill Unlock Stat Bonuses

**When Student Levels Up:**
```
1. Award 1 skill point: skill_tree.points_available += 1
2. Read skill_trees.json for student's class
3. Filter available skills:
   - unlock_level <= current_level
   - prerequisite_skills all in skills_unlocked array
4. Present skill choices (VIS-03 includes skill selection UI)
5. Wait for student choice
```

**When Student Unlocks a Skill:**
```
1. Read chosen skill from skill_trees.json
2. Apply stat_bonus to progress.json stats:
   - skill.stat_bonus = {"creativity": 2, "accuracy": 1}
   - stats.creativity += 2
   - stats.accuracy += 1
3. Add skill.id to skill_tree.skills_unlocked array
4. Decrement skill_tree.points_available by 1
5. Display VIS-06 (skill unlock celebration)
6. Resume teaching
```

**Example Skill Unlock (Blueprint Vision for Gigachad):**
```
Skill: gb_01 "Blueprint Vision"
stat_bonus: {"creativity": 1}

Before: Creativity 20, points_available 1
After:
  - Creativity 20 + 1 = 21
  - skills_unlocked: ["gb_01"]
  - points_available: 0
```

**Passive Skills:**
- Apply bonuses permanently once unlocked
- Check skills_unlocked array to determine active passives
- Some skills modify XP/Aura gains (apply in calculations)

---

## 5. Aura Economy

**Earning Aura:**
```
Task complete: +1 Aura (base)
  - Aura Farmer: +2 Aura per task (not +1)

Lesson complete: +1 Aura (already counted from final task)
  - No additional Aura for lesson completion

Module complete: +10 Aura (bonus)

Streak milestones:
  - 3 days: +5 Aura
  - 7 days: +10 Aura (Sigma: +15)
  - 14 days: +20 Aura (Sigma: +30)
  - 30 days: +50 Aura (Sigma: +75)
  - 60 days: +100 Aura (Sigma: +150)
  - 100 days: +200 Aura (Sigma: +300)

Easter eggs: +5 to +20 Aura (random)
  - Chaos Agent: double reward (+10 to +40)

Achievements: +3 to +10 Aura (specific milestones)
```

**Spending Aura:**
```
On purchase from cosmetics shop:
  1. Check current_balance >= item.price
  2. If insufficient: display "Need [X] more Aura" message
  3. If sufficient:
     - aura_system.current_balance -= item.price
     - aura_system.total_earned UNCHANGED (never decreases)
     - Add item to owned_[category] array
     - Equip item in customization section
```

**Glow Calculation:**
```
Based on aura_system.total_earned (NOT current_balance)

Thresholds:
  0-24: none (no glow emoji)
  25-74: faint ✨
  75-149: soft 💫
  150-299: bright 🌟
  300-499: radiant ⭐
  500-999: blinding 🌞
  1000+: transcendent 👑

Example:
  total_earned = 35 → glow_level = "faint" (35 >= 25, 35 < 75)
  total_earned = 150 → glow_level = "bright" (150 >= 150, 150 < 300)
```

**Reputation Calculation:**
```
Based on aura_system.total_earned

Thresholds:
  0-49: Newcomer
  50-149: Known
  150-299: Respected
  300-599: Famous
  600-999: Legendary
  1000-1999: Mythical
  2000+: Transcendent

Example:
  total_earned = 35 → reputation_rank = "Newcomer" (35 < 50)
  total_earned = 300 → reputation_rank = "Famous" (300 >= 300, 300 < 600)
```

---

## 6. Easter Egg Trigger

**Base Trigger Condition:**
```
After completing 4th lesson in a single day:
  - Check daily_lessons.completed_today >= 4
  - Check easter_eggs.last_triggered (must be > 7 days ago)
  - If both true: trigger easter egg

Chaos Agent class:
  - Trigger threshold: 3 lessons instead of 4
  - Check daily_lessons.completed_today >= 3
```

**Easter Egg Rewards:**
```
Base reward: +25 to +50 XP (random)
Base Aura: +5 to +20 Aura (random)

Chaos Agent class:
  - XP doubled: +50 to +100 XP
  - Aura doubled: +10 to +40 Aura
```

**Easter Egg Execution:**
```
1. Display surprise message (ascii art, fun fact, joke)
2. Award XP and Aura (apply class modifiers)
3. Play Funk.aiff (run_in_background: true)
4. Update easter_eggs.discovered array (add unique ID)
5. Update easter_eggs.last_triggered = today
6. Continue teaching normally
```

**Example (Chaos Agent completing 3rd lesson today):**
```
Before: completed_today = 2
After 3rd lesson: completed_today = 3
Trigger check: 3 >= 3 AND last_triggered was 2026-01-15 (> 7 days ago)
Result: Easter egg triggers!
Reward: random(50, 100) XP + random(10, 40) Aura
```

---

## 7. Level Thresholds

**Core Levels (1-8):**
```
Level 1: 0-100 XP
Level 2: 101-300 XP
Level 3: 301-600 XP
Level 4: 601-1000 XP
Level 5: 1001-1500 XP
Level 6: 1501-2500 XP
Level 7: 2501-4000 XP
Level 8: 4001+ XP
```

**Level-Up Detection:**
```
On any XP gain:
  1. Calculate new_xp = current_xp + xp_gained
  2. Determine current_level from old XP
  3. Determine new_level from new_xp
  4. If new_level > current_level:
     - Trigger level-up sequence (VIS-03)
     - Award skill point: points_available += 1
     - Trigger level-up music sequence
     - Present skill choices
     - Wait for selection
```

**Example Level-Up:**
```
Before: total_xp = 595, level = 3
XP gained: +10 (task completion)
After: total_xp = 605
Check: 605 >= 601 (level 4 threshold)
Result: Level up! 3 → 4
Award: +1 skill point (points_available: 2 → 3)
```

---

## Authoritative Reference

These formulas are the source of truth. When implementing game mechanics:

1. **Always apply class bonuses** - Every task gives class primary stat bonus
2. **Never modify total_earned when spending** - Only current_balance decreases
3. **Auto-use streak freeze on 1-day gap** - Preserve streak if freeze available
4. **Aura Farmer gets +2 per task** - Not +1 like other classes
5. **Gigachad gets +20% XP on shipping** - Check if task creates files/features
6. **Sigma gets +50% streak bonuses** - Apply multiplier to milestone rewards
7. **Chaos Agent triggers easter eggs at 3 lessons** - Not 4 like others
8. **Skill stat bonuses apply immediately** - Update stats when skill unlocked

When in doubt, reference this document. These calculations produce correct, balanced game mechanics.
