# Codebase Concerns

**Analysis Date:** 2026-01-23

## Tech Debt

**Avatar SVG Placeholders:**
- **Issue:** Character sprites currently use simple SVG geometric shapes (circles with faces) instead of professional pixel art
- **Files:** `web/js/avatar-system.js`, `web/data/sprite-config.json`, `web/terminal.html`
- **Impact:** User experience feels less polished during critical first-impression moments; doesn't match the professional visual quality of landing page
- **Fix approach:** Replace with AI-generated pixel art sprites. `web/ONBOARDING_ENHANCEMENTS.md` includes complete guide with Midjourney/Leonardo.ai prompts. Requires generating 36 sprites total (3 colors × 4 emotions × 3 evolution stages). Estimated 2-4 hours to implement.
- **Priority:** Medium (functional but cosmetic)

**Platform-Specific Audio Dependency:**
- **Issue:** Music system relies exclusively on macOS `afplay` for sound effects
- **Files:** `web/js/terminal-sim.js` (partial usage), `CLAUDE.md` (Section 8 detailed), `music_config.json` (entire config)
- **Impact:** Windows/Linux users get silent experience. Web onboarding has no audio feedback on non-macOS platforms
- **Fix approach:** Add web-native audio fallback using HTML5 Audio API with web-hosted sound files. Could create a wrapper function that tries `afplay` first, falls back to web audio, finally silent mode
- **Priority:** Medium (affects cross-platform experience, but claude-code-101 is macOS-focused learning environment)

**Local-Only Progress Persistence:**
- **Issue:** All student progress data stored in `progress.json` (local filesystem) and web onboarding uses `localStorage`
- **Files:** `progress.json`, `web/js/avatar-system.js` (storage methods), `web/js/terminal-sim.js`
- **Impact:** No sync between devices. If student starts on one Mac, switches to another, all progress is lost. Web onboarding progress doesn't carry to local CLI
- **Fix approach:** Implement cloud backend sync (Firebase, Supabase, or custom endpoint). Currently out of scope per CLAUDE.md ("Portal XP does NOT carry over to main progression")
- **Priority:** Low (noted as future feature, MVP acceptable with this limitation)

## Fragile Areas

**Progress JSON Single Point of Failure:**
- **Files:** `progress.json`, `CLAUDE.md` Section 21 (Performance Optimization)
- **Why fragile:** All state is centralized in one JSON file. CLAUDE.md mandates "NEVER use multiple Edit calls" (read once, calculate all, write once). While this prevents corruption, any calculation error or edge case in the read→calculate→write cycle corrupts the entire progress state
- **Safe modification:** Always test stat calculations with multiple class combinations before deploying. Use JSON schema validation on write. Add pre-write validation checks (XP ranges, stat bounds, array integrity)
- **Test coverage:** No visible test suite for progress updates. `web/TESTING_CHECKLIST.md` is manual QA only
- **Current protection:** Performance rule forces atomic writes but adds risk if calculation logic is wrong

**Curriculum Module/Lesson Indexing:**
- **Files:** `curriculum.md`, `progress.json` (current_position tracking), `CLAUDE.md` Section 17 (Presenting Tasks)
- **Why fragile:** Lessons referenced by string IDs like "1.2.3" (module.lesson.task). If curriculum structure changes (adding lessons, reordering), all existing progress.json files with completed task IDs become out of sync
- **Safe modification:** Never renumber existing lessons. New lessons must be appended to end of each module. If restructuring needed, build migration script
- **Test coverage:** No validation that `current_position.task` matches `curriculum.md` structure
- **Risk:** Student at task 1.3.4 might not exist if someone reorganizes curriculum

**Class Selection Timing:**
- **Files:** `curriculum.md` (Lesson 3.4), `progress.json` (class field), `CLAUDE.md` Section 19
- **Why fragile:** Class selection happens at specific curriculum point (Module 3, Lesson 3.4) but `progress.json` allows students to reach any level without class. If student levels up before class selection, class-dependent stat bonuses don't apply
- **Safe modification:** Add validation: enforce `class === null` until Module 3 completion. After Module 3, require `class !== null` or reject progress updates
- **Test coverage:** No guard against students progressing past Module 3 without class selection
- **Risk:** XP and stat calculations become inconsistent if class bonuses applied unevenly

**Music Config Sound File Availability:**
- **Files:** `music_config.json`, `CLAUDE.md` Section 8
- **Why fragile:** Entire music system assumes `/System/Library/Sounds/` files exist and are playable. Config lists 14 different sound files by name but no validation that they exist on user's macOS version
- **Safe modification:** On first session start, validate all configured sounds exist. Log missing files. Fall back to subset of sounds known to exist on older macOS versions
- **Test coverage:** No sound availability checking before playback
- **Risk:** Some students get audio, others don't, with no clear feedback

## Scaling Limits

**Single-File Architecture Bottleneck:**
- **Current capacity:** `progress.json` is fine for ~1,000 active students (single instructor scenario)
- **Limit:** Once students start syncing progress across devices or uploading to cloud, JSON file format becomes unscalable. No transaction support, locking conflicts on concurrent writes
- **Scaling path:** At 100+ simultaneous students, migrate to lightweight database (SQLite for single-server, PostgreSQL for multi-server). Create migration tool to transform existing progress.json files into DB schema

**Curriculum Size Constraint:**
- **Current capacity:** 15 modules × ~5 lessons × ~5 tasks = ~375 total learnable tasks
- **Limit:** `curriculum.md` is 500+ lines and hard to navigate. At 20+ modules, becomes unmaintainable as single file
- **Scaling path:** Split into module files: `curriculum/module-01.md`, `curriculum/module-02.md`, etc. Create index loader
- **Priority:** Not urgent (current curriculum complete through Module 15)

**Stat Range Uncapped:**
- **Current capacity:** Stats start at 5, class bonuses add +1/lesson. At Level 50, could reach 60+ on primary stat
- **Limit:** Display and calculations assume stats fit in reasonable range. Large numbers could break UI layout in status display
- **Scaling path:** Add soft cap (stats cannot exceed 100) or reframe as "levels" instead of raw numbers
- **Priority:** Low (only matters at Level 30+, current max is Level 8)

## Performance Bottlenecks

**Avatar Image Loading in Web Onboarding:**
- **Problem:** Avatar system tries to load PNG sprites from `assets/characters/{stage}-{color}-{emotion}.png`. If PNG missing (which it is—SVG fallback active), client waits for failed image load before falling back to SVG
- **Files:** `web/js/avatar-system.js` lines 81-109 (image load/error handling)
- **Cause:** Synchronous `new Image()` with onerror callback. Each avatar render (6s idle bob animation) retries loading missing PNGs
- **Improvement path:** Pre-check which sprites exist at page load. Only attempt PNG load if confirmed available. Or use `<picture>` element with WebP/PNG/SVG cascade
- **Current impact:** Negligible on modern browsers but shows repeated 404s in console

**Music Config Parsing on Every Event:**
- **Problem:** If music triggering reads `music_config.json` for every event (module complete, level up, badge earned), that's repeated file I/O
- **Files:** `CLAUDE.md` Section 8 (DJ logic), `music_config.json`
- **Cause:** No caching indicated. Could parse config once at session start
- **Improvement path:** Load and cache `music_config.json` in first session setup. Reference cached version for all events
- **Current impact:** Minimal for learning platform, but bad pattern if scaled to 1000+ concurrent sessions

**Skill Tree Prerequisites Evaluation:**
- **Problem:** Checking if a skill is unlockable requires reading `skill_trees.json`, checking current level, finding prerequisites, validating unlock status—complex lookup for every skill choice
- **Files:** `skill_trees.json`, `progress.json` (skill_tree data)
- **Cause:** Flat JSON structure with references (prerequisite_skills arrays)
- **Improvement path:** Build skill availability index at session start. Memoize lookup results
- **Current impact:** Minor (only happens at level-up, ~8 times per playthrough)

## Missing Critical Features

**No Automated Testing Infrastructure:**
- **Problem:** Learning platform has complex game logic (XP calculations, stat bonuses, class multipliers, streak milestones) with no test coverage
- **Impact:** Bug in class bonus calculation could silently corrupt progress. No way to verify fixes
- **What's missing:** Unit tests for: stat calculations, XP awards, level-up logic, class bonuses, skill unlocks, aura glow/reputation levels
- **Files affected:** `progress.json` handling, `CLAUDE.md` Section 4-5 (all calculation logic)

**No Progress Backup/Recovery System:**
- **Problem:** No git history (untracked), no version control, single source of truth
- **Files:** `progress.json`
- **Impact:** Accidental corruption or malformed update → permanent data loss
- **What's missing:** Periodic backups, version history in git, or rollback capability

**No Admin Dashboard for Instructors:**
- **Problem:** Teacher (you) has no way to review student progress beyond reading progress.json manually
- **Impact:** Can't easily see which students are stuck, which topics are confusing, class distribution
- **What's missing:** Dashboard showing: student list, current level/progress, module completion dates, struggles noted

**No Analytics or Telemetry:**
- **Problem:** No data on: what makes students quit, which lessons take longest, which classes are most popular
- **Impact:** Can't optimize curriculum based on data
- **What's missing:** Opt-in analytics logging completions, session lengths, struggle points

## Test Coverage Gaps

**Web Onboarding Avatar System:**
- **What's not tested:** Evolution animations, sprite color switching, localStorage persistence across page reloads, speech bubble timing
- **Files:** `web/js/avatar-system.js`
- **Risk:** A bug in animation sequencing could freeze experience, silently fail to persist character state
- **Recommendation:** Add browser automation tests (Puppeteer/Playwright) for avatar creation → evolution → reload cycle

**Music/Sound Event Triggering:**
- **What's not tested:** Whether sounds actually play, sequence timing accuracy, fallback behavior when sounds unavailable
- **Files:** `music_config.json` usage in CLAUDE.md (assumed but not tested)
- **Risk:** Students get silent experience without knowing why, breaking dopamine-reward loop central to design
- **Recommendation:** Add macOS audio system mocks to test sequence execution without actual sound playback

**Curriculum Task Completion Edge Cases:**
- **What's not tested:** What happens if student completes task 1.2.3 twice, skips tasks, does Module 5 before Module 1, changes class mid-session
- **Files:** `curriculum.md`, `progress.json`
- **Risk:** Progress state becomes inconsistent
- **Recommendation:** Add property-based tests for progress state mutations

**Class Bonus Calculations:**
- **What's not tested:** Multi-class bonus stacking (do bonuses apply correctly when switching?), boundary conditions at level-ups
- **Files:** `CLAUDE.md` Section 4 (stat bonuses), Section 3 (class descriptions)
- **Risk:** Silently wrong XP calculations
- **Recommendation:** Table-driven tests for each class at levels 1-8

## Security Considerations

**API Key Exposure in Student Handoff:**
- **Risk:** Students copy their Claude API key into terminal during Module 2, Lesson 2.1
- **Files:** `curriculum.md` (Lesson 2.1), `CLAUDE.md` (assumes API key in progress.json would be stored)
- **Current mitigation:** No storage of API keys (good). Key entered directly to claude-code-101 CLI
- **Recommendations:** Add reminder in curriculum to never commit API keys to Git. Add `.env.example` template showing where to store secrets

**No Rate Limiting on Local CLI:**
- **Risk:** Aggressive student could spam claude-code-101 requests, burning through API quota
- **Files:** Not in scope of this codebase (claude-code-101 binary handles this), but affects teaching strategy
- **Current mitigation:** None explicit
- **Recommendations:** Document rate limits in CLAUDE.md. Encourage students to understand costs

**localStorage XSS Risk (Web Onboarding):**
- **Risk:** Avatar system stores character state in `localStorage`. If injected XSS, attacker could read/modify stored data
- **Files:** `web/js/avatar-system.js` (localStorage access)
- **Current mitigation:** No user input stored directly. All cosmetic data (colors) from static list
- **Recommendations:** Sanitize any student-entered custom names if added later

## Dependencies at Risk

**Node.js/npm Dependency Drift (Web Onboarding):**
- **Risk:** `web/package.json` not shown, but typical web stacks accumulate vulnerabilities
- **Current state:** Unknown (can't inspect package-lock.json)
- **Recommendation:** If exists, implement dependabot or weekly audit

**macOS System Sound Library Stability:**
- **Risk:** `/System/Library/Sounds/` could change across macOS versions. Sound files renamed/removed in future OS
- **Files:** `music_config.json`, `CLAUDE.md` Section 8
- **Current impact:** Low (Apple very stable here), but no fallback
- **Recommendation:** Vendor critical sounds locally in `web/assets/sounds/` as backup

## Known Limitations (Accepted Tradeoffs)

**Windows/Linux Unsupported:**
- **Accepted because:** Claude Code 101 is macOS-first learning platform. Core teaching happens via claude-code-101 CLI (macOS only)
- **Impact:** Web onboarding works anywhere, but local progression requires Mac
- **Workaround:** None—this is by design

**No Real-Time Multiplayer/Leaderboards:**
- **Status:** Marked "Coming Soon" in CLAUDE.md Section 15. Structure exists in progress.json but inactive
- **Impact:** Students can't compete, no cohort comparison
- **Accepted:** MVP doesn't need this; can add later if student base grows

**Portal → Local Progression Not Synced:**
- **Accepted because:** CLAUDE.md Section 22 explicitly states "Portal XP does NOT carry over to main progression (different systems)"
- **Impact:** Student doing web onboarding must restart curriculum locally
- **Rationale:** Web is onboarding only; real learning is local

---

*Concerns audit: 2026-01-23*
