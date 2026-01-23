# External Integrations

**Analysis Date:** 2026-01-23

## APIs & External Services

**None detected.**

The codebase is designed to be **self-contained and offline-capable**. This is intentional - allowing complete beginners to learn without requiring external API accounts.

## Data Storage

**Databases:**
- None - Local file-based storage only
- Student progress stored in: `progress.json`
- Persisted locally in `.claude/settings.local.json` for Claude Code settings

**File Storage:**
- Local filesystem only
- Web app: Static files served from `/web` directory
- Game state: JSON files in project root
- No cloud storage integration

**Caching:**
- None - All data is read/written directly from JSON files
- Browser localStorage used in web app for avatar state (in `avatar-system.js`)
  - Data persisted to `LocalStorage` via `saveToStorage()` / `loadFromStorage()`
  - Only applies to web onboarding UI (terminal quests)

## Authentication & Identity

**Auth Provider:**
- None required for main curriculum
- Claude Code requires Anthropic API key (separate installation step)
  - Key obtained from: https://console.anthropic.com
  - Stored locally in user's Claude Code installation
  - Not managed by this codebase

**Web Onboarding:**
- No authentication - Completely anonymous
- No user accounts or logins

## Monitoring & Observability

**Error Tracking:**
- None - No external error reporting service

**Logs:**
- Console output only
  - Browser console (web app)
  - Terminal output (Claude Code interactions)
  - No centralized logging

**Player Progress Tracking:**
- Local JSON file: `progress.json`
- All analytics captured in that single file
- No external analytics platforms

## CI/CD & Deployment

**Hosting:**
- Web Frontend: Vercel
  - Project configured in `web/.vercel/`
  - Static site deployment
  - Domain: Not specified in codebase (see Vercel project settings)

**Git-based Deployment:**
- Vercel auto-deploys on git push to configured branch
- No CI pipeline files (GitHub Actions, etc.) detected
- Simple push-to-deploy workflow

**Local Development:**
- `npm run dev` or `npm start` runs `npx serve .`
- Serves static files on localhost:3000

## Environment Configuration

**Required env vars:**
- None for the learning platform itself
- Students will set up: `ANTHROPIC_API_KEY` in Claude Code during Module 2
  - This is Claude Code's responsibility, not managed by this codebase

**Secrets location:**
- None in this codebase
- Claude Code stores API key in: `~/.local/share/anthropic/` (platform-dependent)
- Not tracked in git (`.gitignore` excludes environment files)

## Webhooks & Callbacks

**Incoming:**
- None detected

**Outgoing:**
- None detected

## External Content

**Google Fonts CDN:**
- `fonts.googleapis.com` - Font definitions
- `fonts.gstatic.com` - Font files
- Referenced in:
  - `web/index.html`
  - `web/terminal.html`
- Fonts loaded:
  - Inter (400, 600, 700, 800 weights)
  - Press Start 2P (retro gaming font)
  - JetBrains Mono (code font, 400, 600 weights)

**GitHub Integration (Documentation Only):**
- `web/terminal.html` contains reference to:
  - GitHub Homebrew installer: `https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh`
  - Not a live integration - Just documentation showing students how to install Homebrew
  - Example code shown in onboarding

**Anthropic Services (Curriculum Teaching Only):**
- Students visit: https://console.anthropic.com
  - Purpose: Generate API key for Claude Code
  - Part of Module 2 curriculum
  - Not integrated into codebase - Manual step by student

## Design Philosophy: Offline-First

This codebase is intentionally **dependency-light** and **offline-capable**:

1. **No databases** - Enables running locally without setup
2. **No authentication** - Anyone can start learning immediately
3. **No external APIs** - Except Claude Code itself (student installs separately)
4. **All config in JSON** - Version-controlled, git-friendly
5. **Static web frontend** - No backend server needed

This design choice prioritizes:
- Low friction onboarding
- Complete offline learning (after initial web visit)
- Simplicity for absolute beginners
- No operational complexity for maintainers

---

*Integration audit: 2026-01-23*
