# Custom Terminal Emulator Vision

## The Idea

Instead of a plain terminal OR a web app, build a **custom terminal emulator** specifically for Claude Code 101 that natively supports:

- 🎮 Character avatars with animations
- 🎵 Music & sound effects
- ✨ Celebration overlays (level-up explosions)
- 📊 Stats panel (always visible sidebar)
- 🏆 Live leaderboard (right sidebar)
- 🎨 Custom themes & cosmetics (applied in real-time)
- 💬 Rich text formatting (not just ANSI)

**Think: VS Code's terminal meets a video game HUD**

---

## Three Approaches

### Option 1: Rich TUI (Terminal UI) - Realistic & Fast

**Technology:**
- Python + Textual (modern TUI framework)
- OR Go + Bubbletea
- Runs INSIDE any existing terminal (iTerm2, Terminal.app, etc.)

**What you get:**
- ✅ Fast to build (framework handles layout)
- ✅ Works in any terminal
- ✅ Beautiful text-based UI with colors, boxes, animations
- ✅ No new app to install (runs as Python/Go script)
- ⚠️ Limited to text/unicode (no real images unless terminal supports Sixel/Kitty)
- ⚠️ Sound requires external player (afplay)

**Example UI:**

```
┌─────────────────────────────────────────────────────────────────┐
│ 💪 GIGACHAD BUILDER | Level 7 | 1,250 XP                        │
├──────────────────────────────────┬──────────────────────────────┤
│                                  │  📊 STATS                    │
│  Claude Code 101                 │  ⚡ Speed: 24                │
│  Module 8: Git Basics            │  🎯 Accuracy: 18             │
│                                  │  💡 Creativity: 31           │
│  Task: Create your first commit  │  ⚙️ Efficiency: 15           │
│                                  │  ✨ Aura: 247 ⭐             │
│  Type: git commit -m "message"   │                              │
│                                  │  🏆 LEADERBOARD              │
│  user@mac ~/project %            │  1. Mike    - L12 2450 XP    │
│  ▊                               │  2. Sarah   - L11 2201 XP    │
│                                  │  3. You     - L7  1250 XP ← │
│                                  │  4. Alex    - L6  987 XP     │
│                                  │                              │
│                                  │  [💬 Ask] [🎵 Music] [⚙️]    │
└──────────────────────────────────┴──────────────────────────────┘
[✨ +10 XP - Task complete!] ← Popup appears on success
```

**Textual Example Code:**

```python
from textual.app import App, ComposeResult
from textual.containers import Container, Horizontal, Vertical
from textual.widgets import Header, Footer, Static, Input
from rich.text import Text

class ClaudeCodeTerminal(App):
    CSS = """
    #stats-panel {
        width: 30;
        background: #1a1a2e;
        border: solid cyan;
    }

    #terminal-area {
        background: #0a0a0f;
    }
    """

    def compose(self) -> ComposeResult:
        yield Header()
        with Horizontal():
            with Vertical(id="terminal-area"):
                yield Static("Claude Code 101 - Module 8", id="title")
                yield Static("Task: Create your first commit", id="task")
                yield Input(placeholder="user@mac ~/project % ")
            with Vertical(id="stats-panel"):
                yield Static("📊 STATS", id="stats-header")
                yield Static(self.render_stats())
                yield Static("🏆 LEADERBOARD", id="leaderboard-header")
                yield Static(self.render_leaderboard())
        yield Footer()

    def render_stats(self):
        stats = self.progress['stats']
        return f"""
⚡ Speed: {stats['speed']}
🎯 Accuracy: {stats['accuracy']}
💡 Creativity: {stats['creativity']}
⚙️ Efficiency: {stats['efficiency']}
✨ Aura: {stats['aura']} ⭐
"""

    def on_input_submitted(self, event):
        command = event.value
        # Execute command, check if correct, award XP
        self.show_celebration("✨ +10 XP - Task complete!")
```

**Ship in 2-3 days!**

---

### Option 2: Electron Terminal - Full Power

**Technology:**
- Electron (Chromium-based desktop app)
- Uses xterm.js (terminal emulator library)
- HTML/CSS/JS for UI overlays

**What you get:**
- ✅ Full web capabilities (CSS animations, canvas, WebGL)
- ✅ Real images (avatar sprites, badges)
- ✅ Web Audio API (music playback)
- ✅ Celebration overlays (confetti, particles)
- ✅ Native app feel (icon, menubar, keyboard shortcuts)
- ⚠️ Larger download (~100MB with Electron)
- ⚠️ More complex to build

**Examples:**
- **Hyper** - Electron terminal by Vercel
- **Warp** - Rust + GPU but similar concept
- **Tabby** - Electron terminal with rich UI

**UI Mockup:**

Same terminal window, but with:
- Animated avatar in top-right (actual PNG sprites)
- Particle effects on task complete
- Background music player (waveform visualization)
- Smooth CSS transitions
- Emoji reactions that fly up from input

**Architecture:**

```
┌─────────────────────────────────────────┐
│  Electron Main Process                  │
│  - Window management                    │
│  - File system access                   │
│  - Runs Claude Code backend             │
└─────────────────────────────────────────┘
           ↓ IPC (Inter-Process Communication)
┌─────────────────────────────────────────┐
│  Electron Renderer (Web View)           │
│  ┌─────────────────────────────────────┐│
│  │  xterm.js (terminal emulator)       ││
│  │  - Runs shell (zsh/bash)            ││
│  │  - Displays output                  ││
│  └─────────────────────────────────────┘│
│  ┌─────────────────────────────────────┐│
│  │  Game UI Overlay (HTML/CSS)         ││
│  │  - Avatar (top-right)               ││
│  │  - Stats panel (right sidebar)      ││
│  │  - Celebration effects (canvas)     ││
│  │  - Music player (bottom)            ││
│  └─────────────────────────────────────┘│
└─────────────────────────────────────────┘
```

**Example Code:**

`main.js` (Electron main process):
```javascript
const { app, BrowserWindow } = require('electron')

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(createWindow)
```

`index.html`:
```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="xterm.css">
  <link rel="stylesheet" href="game-ui.css">
</head>
<body>
  <!-- Terminal -->
  <div id="terminal-container">
    <div id="xterm"></div>
  </div>

  <!-- Game Overlay -->
  <div id="game-overlay">
    <!-- Avatar -->
    <div id="avatar">
      <img src="assets/avatar-gigachad-happy.png" class="avatar-sprite">
    </div>

    <!-- Stats Panel -->
    <div id="stats-panel">
      <h3>📊 Stats</h3>
      <div class="stat">⚡ Speed: <span id="stat-speed">24</span></div>
      <!-- ... -->
    </div>

    <!-- Celebration Canvas -->
    <canvas id="celebration-canvas"></canvas>
  </div>

  <script src="xterm.js"></script>
  <script src="game-ui.js"></script>
  <script>
    const term = new Terminal()
    term.open(document.getElementById('xterm'))

    // Connect to local shell
    const pty = require('node-pty')
    const shell = pty.spawn('zsh', [], {
      name: 'xterm-color',
      cwd: process.env.HOME,
      env: process.env
    })

    term.onData(data => shell.write(data))
    shell.on('data', data => term.write(data))

    // Listen for game events
    shell.on('data', (data) => {
      if (data.includes('[GAME:LEVELUP]')) {
        showLevelUpCelebration()
      }
      if (data.includes('[GAME:XP+10]')) {
        updateXP(10)
        playSound('task-complete.mp3')
      }
    })
  </script>
</body>
</html>
```

**Ship in 1-2 weeks** (more polish needed)

---

### Option 3: Custom Zig Terminal (Like Ghostty) - Dream Mode

**Technology:**
- Zig or Rust
- GPU-accelerated rendering (Metal/Vulkan)
- Full control over every pixel

**What you get:**
- ✅ Native performance
- ✅ Beautiful rendering
- ✅ Custom everything
- ❌ Takes months to build from scratch
- ❌ Requires low-level graphics programming

**Verdict: Too ambitious for MVP** - But could fork Ghostty and add game features!

---

## Comparison Table

| Feature | Plain Terminal | Rich TUI | Electron Terminal | Custom Zig |
|---------|----------------|----------|-------------------|------------|
| **Build Time** | N/A (existing) | 2-3 days | 1-2 weeks | 3-6 months |
| **Avatar Display** | ❌ | Unicode art | ✅ PNG sprites | ✅ Native |
| **Music** | External (afplay) | External | ✅ Web Audio | ✅ Native |
| **Animations** | ❌ | Text-based | ✅ CSS/Canvas | ✅ GPU |
| **Stats Sidebar** | ❌ | ✅ | ✅ | ✅ |
| **Leaderboard** | ❌ | ✅ | ✅ | ✅ |
| **File Size** | N/A | <5MB | ~100MB | ~10MB |
| **Cross-Platform** | ✅ | ✅ | ✅ | ⚠️ (complex) |
| **Installation** | None | pip/brew | DMG/EXE | DMG/EXE |

---

## Recommended: Start with Rich TUI (Option 1)

**Why:**
1. **Ships in 2-3 days** - Can validate the concept quickly
2. **No new app install** - Runs in their existing terminal
3. **90% of the UX wins** - Stats, leaderboard, structured UI
4. **Easy iteration** - Python/Textual is fast to modify
5. **Can upgrade later** - If successful, build Electron version v2

**Then upgrade to Electron (Option 2) if:**
- Users love the TUI but want richer visuals
- You want to add true avatar animations
- Music integration is critical
- You're ready for a standalone app

---

## Rich TUI Implementation Plan

### Stack Decision: Python + Textual

**Why Textual:**
- Modern, actively developed
- Rich text support (colors, emoji, formatting)
- Layout system (CSS-like)
- Animation support
- Live updates (WebSocket-like reactivity)
- Great docs

**Alternative: Go + Bubbletea**
- Faster startup
- Single binary (easier distribution)
- But less rich features than Textual

**Verdict: Use Textual** - Python is easier to iterate on, richer features.

### File Structure

```
claude-code-tui/
├── main.py                 # Entry point
├── app.py                  # Textual app
├── components/
│   ├── terminal_panel.py   # Main terminal area
│   ├── stats_panel.py      # Stats sidebar
│   ├── leaderboard.py      # Leaderboard widget
│   ├── avatar.py           # ASCII/Unicode avatar
│   └── celebration.py      # Popup overlays
├── game/
│   ├── progress.py         # progress.json loader
│   ├── curriculum.py       # curriculum.md parser
│   └── xp_calculator.py    # Game mechanics
├── assets/
│   ├── ascii_avatars/      # Text-based sprites
│   └── sounds/             # Sound trigger files
└── requirements.txt
```

### Core Features (MVP)

**Layout:**
```
┌──────────────────────────────────────────┬──────────────────┐
│  Terminal Area                           │  Stats Panel     │
│  (70% width)                             │  (30% width)     │
│                                          │                  │
│  [Terminal output here]                  │  ⚡ Speed: 24    │
│                                          │  🎯 Acc: 18      │
│  user@mac ~/project % ▊                  │  💡 Cre: 31      │
│                                          │  ⚙️ Eff: 15      │
│                                          │  ✨ Aura: 247    │
│                                          │                  │
│                                          │  🏆 Leaderboard  │
│                                          │  1. Mike - L12   │
│                                          │  2. Sarah - L11  │
│                                          │  3. You - L7 ←   │
└──────────────────────────────────────────┴──────────────────┘
[Module 8 - Task 3] [Press ? for help]
```

**Live Updates:**
- Stats panel updates when XP awarded
- Leaderboard refreshes every 30s (if sync enabled)
- Avatar changes expression on success/failure
- Popup appears on level-up (modal overlay)

**Sound Integration:**
- TUI triggers afplay in background
- Same sound system as current CLAUDE.md
- Maybe visualize with animated text (♪♫ characters)

**Avatar (ASCII Art):**

Level 0-2 (Recruit):
```
  😊
 /|\\
  |
 / \\
```

Level 3-5 (Trainee):
```
  😄
 <|>
 /|\\
 | |
```

Level 6+ (Adventurer):
```
  💪😎
  <|>
 /|X|\\
  | |
 /   \\
```

Expressions change based on events:
- Success: 😄 → 🎉
- Error: 😊 → 😕
- Level up: 😄 → ⭐😎⭐

### Integration with Claude Code

**Option A: Replace `claude` command**

User types: `claude-tui` instead of `claude`
- Launches TUI
- TUI runs Claude Code in embedded terminal
- Intercepts output to detect game events

**Option B: Wrapper mode**

User types: `claude` (normal command)
- But it's aliased to launch TUI wrapper
- TUI spawns actual Claude Code subprocess
- Transparent to user

**Option C: Separate app**

User types: `claude-code-game`
- Launches TUI
- Guided experience (not free-form Claude)
- Uses progress.json and curriculum.md
- Custom teaching logic

**Recommendation: Option B (Wrapper)**
- User types familiar `claude` command
- Gets enhanced experience automatically
- Can fall back to plain terminal if TUI breaks

### Development Steps

**Day 1: Basic Layout**
1. Textual app with 2-column layout
2. Left: Mock terminal (just text display)
3. Right: Stats panel (hardcoded values)
4. Footer with current module/task

**Day 2: Game Integration**
1. Read progress.json
2. Display real stats
3. Parse curriculum.md for current task
4. Update stats on file change

**Day 3: Terminal Integration**
1. Embed real terminal (using `rich.console`)
2. Run Claude Code as subprocess
3. Capture output, detect game events
4. Trigger celebrations on XP gain

**Day 4: Polish**
1. ASCII avatar with expressions
2. Level-up modal overlay
3. Sound triggers (afplay)
4. Smooth animations

**Day 5: Testing & Launch**
1. Test on macOS
2. Package as pip install
3. Update CLAUDE.md to recommend TUI
4. Ship!

### Code Example: Basic TUI

```python
# app.py
from textual.app import App, ComposeResult
from textual.containers import Horizontal, Vertical
from textual.widgets import Header, Footer, Static
from textual.reactive import reactive
import json

class StatsPanel(Static):
    """Right sidebar showing player stats"""

    stats = reactive({
        'speed': 5,
        'accuracy': 5,
        'creativity': 5,
        'efficiency': 5,
        'aura': 0
    })

    def render(self):
        return f"""
📊 STATS

⚡ Speed: {self.stats['speed']}
🎯 Accuracy: {self.stats['accuracy']}
💡 Creativity: {self.stats['creativity']}
⚙️ Efficiency: {self.stats['efficiency']}
✨ Aura: {self.stats['aura']}
"""

    def update_stats(self, new_stats):
        self.stats = new_stats


class ClaudeCodeTUI(App):
    """Main TUI application"""

    CSS = """
    #stats-panel {
        width: 30;
        background: $panel;
        border: solid cyan;
    }

    #terminal-area {
        background: $surface;
    }
    """

    def compose(self) -> ComposeResult:
        yield Header()
        with Horizontal():
            yield Static("Terminal area", id="terminal-area")
            yield StatsPanel(id="stats-panel")
        yield Footer()

    def on_mount(self):
        # Load progress.json
        with open('progress.json') as f:
            self.progress = json.load(f)

        # Update stats panel
        stats_panel = self.query_one(StatsPanel)
        stats_panel.update_stats(self.progress['stats'])

        # Start file watcher for progress.json
        self.set_interval(1, self.check_progress_updates)

    def check_progress_updates(self):
        # Re-read progress.json, update UI if changed
        with open('progress.json') as f:
            new_progress = json.load(f)

        if new_progress['student']['total_xp'] > self.progress['student']['total_xp']:
            # XP increased - show celebration!
            self.show_xp_gain(new_progress['student']['total_xp'] - self.progress['student']['total_xp'])

        self.progress = new_progress
        stats_panel = self.query_one(StatsPanel)
        stats_panel.update_stats(new_progress['stats'])


if __name__ == "__main__":
    app = ClaudeCodeTUI()
    app.run()
```

Run with: `python app.py`

---

## Long-Term Vision: Electron Upgrade Path

If the TUI is successful, upgrade to Electron for:

### Visual Upgrades
- **Avatar**: True pixel art sprites (32px → 64px → 128px evolution)
- **Particles**: Celebration explosions (canvas-based)
- **Music**: Embedded player with waveform visualization
- **Themes**: Full cosmetic system (change terminal colors live)

### UX Upgrades
- **Onboarding**: Built-in tutorial (web portal embedded)
- **Shop**: Visual cosmetic browser (grid of items)
- **Profile**: Web-based profile page embedded
- **Leaderboard**: Richer visualization (charts, avatars)

### Technical Wins
- **One-click install**: DMG for Mac, EXE for Windows
- **Auto-update**: Electron's built-in updater
- **Offline mode**: Works without internet
- **Sync**: Background sync to Supabase

---

## Recommendation: 2-Phase Approach

### Phase 1: Rich TUI (This Week)
- Build Textual-based TUI
- Stats sidebar, ASCII avatar, text celebrations
- Ship as `pip install claude-code-tui`
- Test with real users
- **Goal: Validate that rich UI improves learning experience**

### Phase 2: Electron Terminal (Next Month)
- If TUI proves valuable, build Electron version
- Migrate UI to HTML/CSS/JS
- Add visual polish (sprites, particles, music)
- Ship as standalone app
- **Goal: Production-ready game-like terminal**

---

## Next Steps

Want to build this? I can:

1. **Build Rich TUI prototype** (Option 1)
   - Set up Textual project structure
   - Implement stats panel + terminal area
   - Integrate with progress.json
   - Add ASCII avatar + celebrations

2. **Prototype Electron terminal** (Option 2)
   - Set up Electron + xterm.js
   - Build game overlay UI
   - Implement celebration effects
   - Test with Claude Code subprocess

3. **Design custom terminal spec** (Option 3)
   - Research Ghostty architecture
   - Plan fork/extension strategy
   - Outline feature additions

Which approach excites you most? I'm ready to code! 🚀
