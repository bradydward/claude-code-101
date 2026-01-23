# My Claude Code 101 Cheat Sheet

Last Updated: 2026-01-23 | Level: 4 (Code Companion) | Current Module: 2

---

## Quick Commands I've Learned

### Terminal Navigation
- `pwd` - Show current directory ("where am I?")
- `ls` - List files and folders in current directory
- `cd <folder>` - Go to folder (change directory)
- `cd ..` - Go up one level (to parent folder)
- `cd ~` - Go to home directory
- `cd ~/path/to/folder` - Go directly to specific path from anywhere

### Terminal Shortcuts
- ⬆️ Up Arrow - Scroll through command history
- Tab - Autocomplete commands and filenames
- Ctrl+C - STOP running command (NOT copy!)
- Ctrl+L or `clear` - Clean terminal screen
- Cmd+C / Cmd+V - Copy/paste in terminal (Mac)

### File & Folder Management
- `mkdir <name>` - Create new folder
- `mkdir "name with spaces"` - Create folder with spaces in name (needs quotes!)
- `touch <file>` - Create empty file
- `echo "text"` - Print text to terminal (test command)

---

## Key Insights from Module 1

### Module 1: Getting Into the Terminal
**Completed: 2026-01-23** | **Badge Earned: Terminal Explorer 🏆**

#### Lesson 1.1: Opening Your Terminal
💡 **The Terminal is Just a Way to Talk to Your Computer**
- Terminal = typing interface to control your computer
- Every button you click could be a command you type
- `echo "hello"` - your first command that makes computer respond

#### Lesson 1.2: Understanding Where You Are
💡 **You're Always "In" a Folder**
- `pwd` shows your current location (path)
- Path looks like `/Users/brady/Desktop` - a trail of folders
- `ls` shows what's in your current location
- Terminal has a "working directory" - where you are right now

#### Lesson 1.3: Moving Around
💡 **`cd` is Like Clicking Folders, But With Typing**
- `cd Desktop` = double-click Desktop folder
- `cd ..` = click "back" button (up one level)
- The `..` means "parent folder" in every OS
- Always use `pwd` after `cd` to confirm where you ended up

#### Lesson 1.4: Creating Your Project Folder
💡 **Spaces in Names Need Quotes**
- `mkdir projects` - no spaces, no quotes needed
- `mkdir "Claude Code 101"` - has spaces, MUST use quotes
- Same rule applies to `cd` - if folder name has spaces, wrap in quotes
- Your project home base: `~/Developer/projects/"Claude Code 101"`

#### Lesson 1.5: Terminal Survival Kit
💡 **These Shortcuts Will Save You Hours**
- Up Arrow = don't retype, just scroll through history
- Tab = autocomplete saves typing (type `pw` + Tab → `pwd`)
- Ctrl+C = emergency stop button (not copy!)
- `clear` or Ctrl+L = clean screen when messy

💡 **Terminal History Only Works in THAT Terminal Window**
- New terminal = new session = no history yet
- Each terminal window has its own command history
- Up Arrow won't show anything until you run commands first

💡 **Biggest Beginner Mistake: Ctrl+C vs Cmd+C**
- In terminal: Ctrl+C = STOP command (kill process)
- Everywhere else on Mac: Cmd+C = copy
- This trips EVERYONE up at first!

---

## Copy-Paste Examples

### Navigate to Project Folder
```bash
cd ~/Developer/projects/"Claude Code 101"
pwd  # Confirm you're there
```

### Create and Navigate Folders
```bash
mkdir new-project
cd new-project
pwd  # Should show new-project in path
```

### Create Nested Folders
```bash
mkdir parent
cd parent
mkdir child
cd child
pwd  # Shows full path to child folder
```

### Go Back to Home
```bash
cd ~
pwd  # Should show /Users/brady (your home)
```

---

## Terminal Survival Quick Reference

From Lesson 1.5 - The shortcuts that matter most:

| Shortcut | What It Does | When to Use It |
|----------|--------------|----------------|
| ⬆️ Up Arrow | Show previous command | Rerun same command without retyping |
| ⬇️ Down Arrow | Scroll forward in history | After going up, go back down |
| Tab | Autocomplete | Type first few letters, let terminal finish |
| Ctrl+C | Stop running command | When something's stuck or you changed your mind |
| Ctrl+L | Quick clear | Clean screen fast (same as `clear` command) |
| Cmd+C | Copy text | Select text in terminal, then Cmd+C |
| Cmd+V | Paste text | Paste into terminal (also Right-click → Paste) |

**Pro Tip:** Tab autocomplete works on commands AND filenames. Start typing `cd Doc` then Tab → `cd Documents/`

---

## Common Mistakes I've Made

1. **Pressing Ctrl+C to copy** - Stopped my command instead! Use Cmd+C in terminal.
2. **Forgetting quotes for folder names with spaces** - `cd Claude Code 101` fails, need `cd "Claude Code 101"`
3. **Pressing Up Arrow in new terminal** - No history yet! Need to run commands first in that window.
4. **Getting lost after multiple `cd` commands** - Solution: use `pwd` frequently to check location

---

## My Progress Tracker

- ✅ Module 1: Getting Into the Terminal (Terminal Explorer 🏆) - Completed 2026-01-23
- ⏳ Module 2: Installing Claude Code (in progress...)

**Current Stats:**
- Level: 4 (Code Companion)
- Total XP: 620 / 1000 to Level 5
- Aura: 35 ✨ (faint glow)
- Streak: 1 day 🔥

**Stats Growth:**
- ⚡ Speed: 31 (grew from Module 1!)
- 🎯 Accuracy: 5
- 💡 Creativity: 5
- ⚙️ Efficiency: 5
- ✨ Aura: 35

---

## Questions I Had (And Their Answers)

**Q: What's the difference between terminal and Finder?**
A: Finder = visual interface (click folders), Terminal = typing interface (type commands). Same computer, different ways to control it.

**Q: Can I break my computer with terminal commands?**
A: Not easily! Most commands just move files or show info. Dangerous commands (like `rm -rf`) require special syntax you won't type by accident.

**Q: Why use terminal instead of clicking?**
A: Some things (like Claude Code!) only work in terminal. Plus it's faster once you learn it - no hunting for buttons.

**Q: What if I get stuck in a weird screen?**
A: Press `q` to quit most views, or Ctrl+C to stop most commands. When in doubt, close terminal and open fresh one.

---

## Next Up

📚 Module 2: Installing Claude Code
- Getting API key from Anthropic
- Installing `claude` command with npm
- First launch and configuration

---

*This cheat sheet grows with you as you complete lessons. Keep it open for quick reference!*
*Use Cmd+F to search for any command or concept.*
