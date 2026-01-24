# Music/DJ System Reference

Complete reference for the afplay-based celebration music system.

---

## Overview

Claude acts as DJ, triggering celebration sounds on key events using **afplay sound sequences**:
- **Quick events** (task/lesson/badge): Use single macOS system sounds - instant, zero setup
- **Epic moments** (module/level/class): Use choreographed sound sequences - multiple sounds with precise timing for dramatic celebration
- All music details are in music_config.json

### Why afplay-Only?

**Problems Solved:**
- Zero freezing - afplay is instant with no network delays or dependencies
- Zero setup - Works out of the box on every Mac, no external accounts needed
- Sound variety - Multiple sequence variations rotate randomly for big moments
- Fast feedback - First sound plays instantly (<100ms), sequences never block teaching
- 100% reliability - No dependency on Spotify, network, or permissions

---

## Event Triggers

| Event | Engine | Sound/Sequence | Duration |
|-------|--------|----------------|----------|
| Session start | afplay | Pop.aiff | ~1 second |
| Task complete | afplay | Ping.aiff | ~1 second |
| Lesson complete | afplay | Glass.aiff | ~2 seconds |
| Module complete | afplay | Sequence (5 variations) | 3-6 seconds |
| Level up | afplay | Sequence (4 variations) | 2.5-4.5 seconds |
| Class selection | afplay | Dramatic sequence | ~4 seconds |
| Badge earned | afplay | Hero.aiff | ~2 seconds |
| Streak milestone | afplay | Sosumi.aiff | ~2 seconds |
| Easter egg | afplay | Funk.aiff | ~2 seconds |

---

## Commands

**CRITICAL: All music commands MUST use `run_in_background: true` in the Bash tool.**

### Single Sound Commands

```bash
# Basic pattern (instant playback, non-blocking)
afplay /System/Library/Sounds/Ping.aiff

# Bulletproof pattern with error suppression (RECOMMENDED)
(afplay /System/Library/Sounds/Ping.aiff 2>/dev/null || true) &

# Examples for each event
afplay /System/Library/Sounds/Pop.aiff     # Session start
afplay /System/Library/Sounds/Ping.aiff    # Task complete
afplay /System/Library/Sounds/Glass.aiff   # Lesson complete
afplay /System/Library/Sounds/Hero.aiff    # Badge earned
afplay /System/Library/Sounds/Sosumi.aiff  # Streak milestone
afplay /System/Library/Sounds/Funk.aiff    # Easter egg
```

### Sound Sequence Commands (Epic Moments)

Sound sequences play multiple sounds with precise timing delays to create epic celebrations:

```bash
# Module Complete Example: "Champion's Fanfare" (3 sounds)
(afplay /System/Library/Sounds/Hero.aiff 2>/dev/null || true) &
(sleep 1.5 && afplay /System/Library/Sounds/Glass.aiff 2>/dev/null || true) &
(sleep 3 && afplay /System/Library/Sounds/Sosumi.aiff 2>/dev/null || true) &

# Level Up Example: "Power Up" (2 sounds)
(afplay /System/Library/Sounds/Hero.aiff 2>/dev/null || true) &
(sleep 1.5 && afplay /System/Library/Sounds/Sosumi.aiff 2>/dev/null || true) &

# Class Selection: "Class Chosen" (3 sounds, dramatic)
(afplay /System/Library/Sounds/Basso.aiff 2>/dev/null || true) &
(sleep 1.5 && afplay /System/Library/Sounds/Hero.aiff 2>/dev/null || true) &
(sleep 3 && afplay /System/Library/Sounds/Glass.aiff 2>/dev/null || true) &
```

**How Sequences Work:**
- All commands launch simultaneously in parallel
- `sleep` delays control when each sound plays
- First sound (delay 0) plays instantly
- Subsequent sounds play after their delays
- Total sequence duration = final delay + sound duration (~2s)
- Teaching flow never waits - all commands run in background

---

## DJ Logic

When triggering music:

1. **Read music_config.json** for the event configuration
2. **Check event type:**
   - **Simple events** (task/lesson/badge): Use single `sound` field
   - **Epic events** (module/level): Use `sequences` array (pick random)
   - **Class selection**: Use single `sequence` object
3. **For single sounds:**
   - Execute: `(afplay /System/Library/Sounds/{sound} 2>/dev/null || true) &`
   - Always run with `run_in_background: true`
4. **For sequences:**
   - Pick random sequence from `sequences` array (module/level) or use single `sequence` (class)
   - Build command for each sound with its delay
   - Execute all commands together in parallel
   - Always run with `run_in_background: true`
5. **Optional:** Display sequence name for epic moments: "🎵 {sequence_name}"

**Sequence Execution Example:**
```python
# Pseudocode for executing sequences
import random

# Read config
event_config = music_config["events"]["module_complete"]

# Pick random sequence
sequence = random.choice(event_config["sequences"])

# Build commands
commands = []
for sound_def in sequence["sounds"]:
    file = sound_def["file"]
    delay = sound_def["delay_seconds"]

    if delay == 0:
        cmd = f'(afplay /System/Library/Sounds/{file} 2>/dev/null || true) &'
    else:
        cmd = f'(sleep {delay} && afplay /System/Library/Sounds/{file} 2>/dev/null || true) &'

    commands.append(cmd)

# Execute all together (non-blocking)
full_command = " ".join(commands)
Bash(
    command=full_command,
    run_in_background=True,
    description=f"Play sequence: {sequence['name']}"
)

# Optional: Display what's playing
print(f"🎵 {sequence['name']}")
```

---

## Bulletproof Command Pattern

**Why This Pattern Works:**
- `()` = Subshell isolation (prevents blocking)
- `2>/dev/null` = Suppress error messages
- `|| true` = Always exit successfully (no failure)
- `&` = Background execution (return control immediately)
- Combined with `run_in_background: true` in Bash tool = Double protection

**MANDATORY for ALL music commands:**

```bash
# Single sound pattern
(afplay /System/Library/Sounds/{sound}.aiff 2>/dev/null || true) &

# Sequence pattern (multiple commands)
(afplay /System/Library/Sounds/Hero.aiff 2>/dev/null || true) &
(sleep 1.5 && afplay /System/Library/Sounds/Glass.aiff 2>/dev/null || true) &
```

This ensures music NEVER freezes the teaching flow, even if:
- Sound files are missing
- System volume is muted
- Permission problems arise
- Sound system is unavailable

---

## Available System Sounds

Located in `/System/Library/Sounds/`:

- **Ping.aiff** - Clean, satisfying (task complete)
- **Glass.aiff** - Bright, celebratory (lesson complete, used in sequences)
- **Hero.aiff** - Heroic, triumphant (badge earned, primary sequence sound)
- **Sosumi.aiff** - Uplifting, positive (streak milestone, sequence ending)
- **Funk.aiff** - Funky, surprising (easter egg, sequence variety)
- **Basso.aiff** - Deep, serious (sequence opener)
- **Bottle.aiff** - Unique, playful
- **Tink.aiff** - Light, delicate
- **Pop.aiff** - Upbeat, cheerful (session start)
- **Submarine.aiff** - Whimsical (sequence variety)
- **Purr.aiff** - Soft, calm
- **Morse.aiff** - Distinct, alert
- **Frog.aiff** - Quirky, fun
- **Blow.aiff** - Soft, gentle

---

## Sound Sequence Variations

**Module Complete (5 sequences, random selection):**
1. **Champion's Fanfare** - Hero → Glass → Sosumi (3s total)
2. **Victory March** - Basso → Hero → Glass (2.5s total)
3. **Epic Celebration** - Hero → Submarine → Glass (3s total)
4. **Triumphant Victory** - Glass → Hero → Sosumi → Ping (4.5s total)
5. **Boss Defeated** - Basso → Funk → Hero (2.5s total)

**Level Up (4 sequences, random selection):**
1. **Power Up** - Hero → Sosumi (1.5s total)
2. **Ascension** - Glass → Hero → Ping (3s total)
3. **Level Unlocked** - Submarine → Hero (1s total)
4. **Breakthrough** - Basso → Glass → Sosumi (2.5s total)

**Class Selection (1 dramatic sequence):**
- **Class Chosen** - Basso → Hero → Glass (3s total)

---

## Rules

- Play music ONLY on events (never during active teaching)
- **CRITICAL: Use `run_in_background: true` for ALL music Bash commands**
- **CRITICAL: Use error suppression pattern for ALL commands**
- Music must NEVER block the teaching flow
- Single sounds are instant (<100ms to first sound)
- Sequences create epic feel through timing and layering
- Random sequence selection prevents repetition
- Respect the student's sound_pack preference from customization
- For epic moments, optionally display "🎵 {Sequence Name}"

---

## Troubleshooting

**If sounds don't play:**
- Verify sound file exists: `ls /System/Library/Sounds/Ping.aiff`
- Check system volume is not muted
- Commands fail silently - no error shown to student
- Teaching flow continues unaffected

**If sequences feel wrong:**
- Check timing delays in music_config.json
- Verify sound files are correct
- Test manually: `afplay /System/Library/Sounds/Hero.aiff`
- All sounds should complete within 5-6 seconds max
