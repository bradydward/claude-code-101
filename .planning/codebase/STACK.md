# Technology Stack

**Analysis Date:** 2026-01-23

## Languages

**Primary:**
- JavaScript (ES6+) - Used for web frontend and Node.js utilities
- JSON - Configuration files, curriculum, skill trees, cosmetics, music events
- Markdown - Documentation, curriculum, guides

**Secondary:**
- Bash - Terminal commands, automation (referenced in teaching materials)

## Runtime

**Environment:**
- Node.js (for web development utilities and build scripts)
- Browser runtime (modern browsers for web frontend)
- macOS (primary target platform with native `afplay` audio system)

**Package Manager:**
- npm (Node Package Manager)
- Lockfile: Not committed (only `package.json` present, no `package-lock.json`)

## Frameworks

**Frontend:**
- Vanilla JavaScript (no frontend framework)
  - No React, Vue, Angular, or similar
  - Direct DOM manipulation
  - CSS Grid/Flexbox for layouts

**Web Utilities:**
- Node.js modules: `fs`, `path` (used in `web/scripts/validate-sprites.js`)

**Build/Dev:**
- serve (via `npx serve`) - Local development server
  - Config: `web/package.json` with scripts `dev` and `start`
  - Runs on default port 3000
  - Used to serve static files (HTML, CSS, JS)

## Key Dependencies

**Critical:**
- None for main curriculum interaction
- Implied: Claude Code CLI (`claude` command invoked from terminal)
  - Not a package dependency
  - Installed separately by student in Module 2
  - Used for AI-powered teaching and task verification

**Infrastructure:**
- Google Fonts API - for typography
  - `Inter` (400, 600, 700, 800 weights)
  - `Press Start 2P` (retro gaming font)
  - `JetBrains Mono` (monospace code font, 400, 600 weights)
  - Referenced in `web/index.html` and `web/terminal.html`
  - Domain: fonts.googleapis.com
  - Domain: fonts.gstatic.com

**Web Dev Utilities:**
- node `fs` module - File system operations in `web/scripts/validate-sprites.js`
- node `path` module - Path utilities in `web/scripts/validate-sprites.js`

## Configuration

**Environment:**
- `.claude/settings.local.json` - Local Claude Code settings (exists but contents private)
- `.gitignore` - Excludes `progress.json`, node_modules, OS files, editor files
- No `.env` files detected (no secrets management needed)

**Build:**
- No build configuration files (webpack, vite, tsconfig, etc.)
- Web app is pure static files (HTML, CSS, JS)
- Node.js scripts use CommonJS require() directly

**Web Deployment:**
- Vercel integration present: `web/.vercel/project.json` and `web/.vercel/README.txt`
- Indicates web app is deployed on Vercel
- Static site - no build step required for deployment

## Platform Requirements

**Development:**
- macOS (primary target for `afplay` audio system)
- Terminal/Shell access
- Node.js installation (for web dev utilities)
- npm (package manager)

**Production (Web Frontend):**
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for Google Fonts)
- No special plugins or extensions

**Production (Claude Code Teaching):**
- macOS with Terminal
- Claude Code CLI installed
- Anthropic API key (obtained from console.anthropic.com)

## Key Tech Stack Decisions

### Why Vanilla JavaScript + No Build System
- Zero dependencies to install
- Works immediately after git clone
- Students focus on Claude Code, not tooling setup
- Minimal friction for complete beginners

### Why afplay (macOS Only)
- Built-in to macOS - zero external dependencies
- Instant, non-blocking sound playback
- Reliable and predictable
- Graceful degradation if sounds unavailable (error suppression pattern)
- See `music_config.json` for complete DJ system architecture

### Why Static Files for Web
- Vercel serves static files efficiently
- No build step complexity
- Easy for beginners to understand (HTML is just files)
- Git-based deployment workflow

### Why JSON for Configuration
- Human-readable and editable
- No database needed
- Version control friendly (all config in git)
- Schema is flexible for future extensions

---

*Stack analysis: 2026-01-23*
