# Quick Reference - Claude Code 101 RPG Edition

## RPG Commands

| Command | What It Does |
|---------|-------------|
| `start lesson` / `continue` | Begin or resume your learning journey |
| `status` / `/status` | Show full player status (level, XP, stats, badges) |
| `/class` | View your class info, evolution, and bonuses |
| `/skills` | Show your skill tree and spend skill points |
| `/shop` | Browse and buy cosmetics with Aura |
| `/aura` | Show Aura balance, glow level, and reputation |
| `/streak` | View streak progress and milestones |
| `/sandbox` | Enter free exploration mode (Level 5+) |
| `/music` | View and change music settings |
| `/leaderboard` | Leaderboard status (Coming Soon) |
| `/season` | Seasonal events (Coming Soon) |
| `help` / `/help` | See all available commands |
| `explain [concept]` | Get plain-language explanation of anything |
| `what did that do?` | Understand the last action |
| `I'm stuck` | Break current step into smaller pieces |
| `skip` | Skip current task (use sparingly) |
| `go back` | Return to a previous task |

---

## The 6 Character Classes

| Class | Primary Stats | Playstyle | Bonus |
|-------|--------------|-----------|-------|
| 💪 Gigachad Builder | Creativity + Aura | Build products, ship features | +1 Creativity/lesson, +20% XP shipping |
| 🐺 Sigma Grinder | Speed + Efficiency | Streak grinding, optimization | +1 Speed/lesson, +50% streak bonuses |
| 👑 Aura Farmer | Aura + Speed | Collect cosmetics, flex status | +2 Aura/lesson, +25% Aura all sources |
| 🔥 Chaos Agent | Creativity + Speed | Easter eggs, creative solutions | +1 Creativity & Speed/lesson, 2x easter eggs |
| 😎 Meme Lord | Creativity + Aura | Fun content, casual vibes | +1 Creativity/lesson, humor content |
| 🧙 Hackerman | Efficiency + Accuracy | Technical mastery, automation | +1 Efficiency/lesson, early feature unlocks |

**Class is chosen in Module 3, Lesson 3.4** (after Claude Code is running).

---

## Stat System

| Stat | Symbol | What It Measures | Grown By |
|------|--------|-----------------|----------|
| Speed | ⚡ | Terminal fluency, shortcuts | Terminal/shortcut lessons |
| Accuracy | 🎯 | Code quality, debugging | Code quality/debugging lessons |
| Creativity | 💡 | Project building, design | Project/design lessons |
| Efficiency | ⚙️ | Workflow, automation | Workflow/automation lessons |
| Aura | ✨ | Currency, reputation, flex | All completions + special events |

**Starting stats:** Speed 5, Accuracy 5, Creativity 5, Efficiency 5, Aura 0

Stats grow from:
- Lesson completion (+1 to lesson's tagged stat)
- Class bonus (+1 extra to primary stat)
- Achievements (+3 to +5 on milestones)
- Skill tree (permanent bonuses from unlocked skills)

---

## Aura Guide

### Earning Aura
| Source | Amount |
|--------|--------|
| Each lesson completed | +1 Aura (base) |
| Module completed | +10 Aura |
| 7-day streak | +10 Aura |
| 14-day streak | +20 Aura |
| 30-day streak | +50 Aura |
| Easter egg found | +5-20 Aura |
| Achievement milestone | +3-10 Aura |

### Glow Levels (based on total Aura EARNED, not balance)
| Total Earned | Glow Level | Display |
|-------------|------------|---------|
| 0 | None | (no glow) |
| 25 | Faint | ✨ Faint shimmer |
| 75 | Soft | 💫 Soft glow |
| 150 | Bright | 🌟 Bright aura |
| 300 | Radiant | ⭐ Radiant presence |
| 500 | Blinding | 🌞 Blinding light |
| 1000 | Transcendent | 👑 Transcendent being |

### Reputation Ranks
Newcomer → Known → Respected → Famous → Legendary → Mythical → Transcendent

---

## Level Chart

| Level | XP Required | Title | Unlocks |
|-------|------------|-------|---------|
| 1 | 0 | Curious Explorer | Start here |
| 2 | 101 | Terminal Traveler | First skill point |
| 3 | 301 | Command Apprentice | Skill point |
| 4 | 601 | Code Companion | Tier 2 skills, class evolution |
| 5 | 1001 | Builder in Training | Sandbox mode, skill point |
| 6 | 1501 | Project Pilot | Tier 3 skills |
| 7 | 2501 | Claude Collaborator | Final class evolution |
| 8 | 4001 | Code Creator | Ultimate skill, Tier 4 |
| 9+ | +1000 each | Class-based titles | Endless progression |

### XP Earned Per Action
| Action | XP |
|--------|-----|
| Complete a task | +10 |
| Complete a lesson | +50 bonus |
| Complete a module | +200 bonus |
| Class selection | +50 |

---

## Terminal Commands (Essential)

| Command | What It Does | Example |
|---------|-------------|---------|
| `pwd` | Shows where you are | `/Users/brady/projects` |
| `ls` | Lists what's here | files and folders |
| `cd [folder]` | Go into a folder | `cd Documents` |
| `cd ..` | Go up one level | back to parent |
| `cd ~` | Go to home folder | `/Users/brady` |
| `mkdir [name]` | Create a folder | `mkdir my-project` |
| `touch [name]` | Create empty file | `touch notes.txt` |
| `cp [src] [dest]` | Copy a file | `cp file.txt backup.txt` |
| `mv [src] [dest]` | Move/rename | `mv old.txt new.txt` |
| `rm [file]` | Delete a file | `rm temp.txt` (no undo!) |
| `clear` | Clear the screen | clean slate |
| `history` | Show past commands | see everything you've typed |
| `cat [file]` | Show file contents | `cat notes.txt` |
| `claude` | Start Claude Code | enter the AI |

---

## Keyboard Shortcuts

| Shortcut | What It Does |
|----------|-------------|
| `Ctrl + C` | STOP whatever's running (not copy!) |
| `Cmd + C` | Copy (on Mac) |
| `Cmd + V` | Paste (on Mac) |
| `Up Arrow` | Previous command |
| `Tab` | Autocomplete file/folder names |
| `Ctrl + L` | Clear screen |
| `Ctrl + R` | Search command history |
| `Ctrl + A` | Go to start of line |
| `Ctrl + E` | Go to end of line |
| `!!` | Rerun last command |

---

## Git Commands

| Command | What It Does |
|---------|-------------|
| `git init` | Turn folder into a tracked repo |
| `git status` | See what's changed |
| `git add .` | Stage all changes |
| `git add [file]` | Stage one file |
| `git commit -m "msg"` | Save a checkpoint |
| `git log` | See save history |
| `git diff` | See what changed |
| `git push` | Upload to GitHub |
| `git branch` | List branches |
| `git checkout -b [name]` | Create new branch |
| `git checkout [name]` | Switch branch |

---

## When Things Go Wrong

**"Command not found"** → Check spelling, or it's not installed

**"Permission denied"** → Might need `sudo` (be careful)

**"No such file or directory"** → Check spelling, check location with `pwd`

**Something is stuck** → Press `Ctrl + C` to stop it

**Claude Code isn't responding** → Press `Ctrl + C`, restart with `claude`

**Lost in the terminal** → Type `cd ~/Developer/projects/"Claude Code 101"` to go home

---

## Words You'll Hear

| Word | What It Actually Means |
|------|----------------------|
| **Terminal** | A text-based way to control your computer |
| **CLI** | Command Line Interface - same as terminal |
| **Directory** | A folder |
| **Path** | The address of a file or folder |
| **npm** | A tool for installing other tools |
| **Repository (repo)** | A project folder tracked by Git |
| **Commit** | A save point in Git |
| **API** | A way for programs to talk to each other |
| **API Key** | A password for using a service |
| **MCP** | Plugins that expand what Claude Code can do |
| **Agent** | A sub-task Claude spawns for complex work |
| **JSON** | A format for storing organized data |
| **Markdown (.md)** | A format for writing formatted text |
| **Deploy** | Put your project live on the internet |
| **MVP** | Minimum Viable Product - simplest useful version |
| **Refactor** | Make code better without changing what it does |
| **Branch** | A parallel version of your project |
| **Autonomous** | Claude working without stopping for permission |

---

## Streak Milestones

| Days | Reward |
|------|--------|
| 3 | +5 Aura |
| 7 | +10 Aura + "Week Warrior" title |
| 14 | +20 Aura |
| 30 | +50 Aura + "Streak Master" title |
| 60 | +100 Aura |
| 100 | +200 Aura + legendary cosmetic |

**Streak Freeze:** 1 per week (auto-used if you miss a day)
