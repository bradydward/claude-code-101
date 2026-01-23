# Testing Patterns

**Analysis Date:** 2026-01-23

## Test Framework

**Status:** No automated testing configured

**Runner:**
- Not detected. No `jest.config.js`, `vitest.config.js`, or test runner dependencies.

**Assertion Library:**
- Not detected. No test assertions found in codebase.

**Run Commands:**
```bash
# No test commands available
# Manual testing only via browser
npm run dev              # Start dev server, manual test in browser
node web/scripts/validate-sprites.js  # Validation script (sprite integrity only)
```

## Test File Organization

**Location:**
- No test files present. Pattern would be co-located (`.test.js` or `.spec.js` next to source).

**Current Files:**
- Source: `web/js/terminal-sim.js`, `web/js/landing.js`, `web/js/avatar-system.js`
- No corresponding test files

**Validation Script Only:**
- `web/scripts/validate-sprites.js` - Node.js script that validates 36 avatar PNG sprites
- Not a test framework, but provides validation/health check

## Manual Testing Patterns

**Browser Testing:**
Manual testing occurs through browser interaction:

**Terminal Simulator Testing:**
- Start quest system by opening `web/terminal.html`
- Test flow: character creation → quest 1 → quest 2 → ... → quest 5 → completion screen
- Verify command input matching with strict/forgiving logic: `terminal-sim.js` lines 566-576
- Check state persistence: localStorage saved/loaded correctly

**Avatar System Testing:**
- Verify sprite rendering: PNG loads or SVG fallback
- Check evolution stages: recruit → trainee → adventurer at quest milestones
- Test speech bubbles: show/hide on correct/wrong commands
- Verify animations: idle, happy, confused, victory emotions

**Landing Page Testing:**
- Test particle effects render
- Verify scroll reveal animations
- Test CTA button transition with particle explosion
- Check sound effects play (hover/click if on macOS)

## Validation Script (Only Automated Check)

**Location:** `web/scripts/validate-sprites.js`

**Purpose:**
- Validates all 36 avatar sprites exist and are valid PNGs
- Checks file size (5KB - 500KB range)
- Reports missing, invalid, and valid sprites

**Execution:**
```bash
node web/scripts/validate-sprites.js
```

**Validation Checks:**
```javascript
// Line 101-136: validate-sprites.js
- File exists at expected path
- PNG signature check: 89 50 4E 47 0D 0A 1A 0A
- File size minimum: 5000 bytes
- File size warning: 500000 bytes max
- Output: categorized report (missing/invalid/valid)
```

**Output Format:**
- ASCII art progress bar
- Categorized results with file counts
- Detailed lists by stage (recruit, trainee, adventurer)
- Completion percentage
- Exit code: 0 if all 36 valid, 1 if incomplete

## What IS Tested (Implicitly)

**Terminal Simulator Logic:**
- Command input normalization: `terminal-sim.js` lines 566-572
- Quote-flexible matching: removes quotes for comparison
- Alt-expected patterns for variations (e.g., `cd Desktop` vs `cd desktop`)
- State transitions: step completion → next step → quest completion

**Avatar System:**
- Config loading with fallback: `avatar-system.js` lines 14-22
- Stage-based sizing: `sizes = { recruit: 48, trainee: 72, adventurer: 128 }`
- SVG placeholder generation when PNG missing: lines 105-168
- Speech bubble selection from config array with random choice: `Math.floor(Math.random() * messages.length)`
- Evolution triggers based on quest progress: lines 240-249

**Landing Page:**
- DOM element existence before manipulation: `if (!container) return;`
- Null-safe querySelector: `if (target)` before calling scrollIntoView
- Event listener attachment to multiple elements via forEach

**Local Storage Persistence:**
- `terminal-sim.js` lines 354-374: save/load progress
- `avatar-system.js` lines 292-318: save/load avatar state
- Error handling for localStorage quota exceeded

## What IS NOT Tested

**Critical Gaps:**

**Terminal Flow:**
- No tests for full 5-quest progression
- No verification of XP accumulation logic
- No tests for celebration/level-up animations
- No tests for quest bar progress calculations

**Avatar System:**
- No tests for emotion animation timing
- No tests for evolution state transitions
- No tests for config JSON parsing with missing fields
- No tests for multiple avatar colors across evolution stages

**Landing Page:**
- No tests for scroll reveal timing
- No tests for particle animation performance
- No tests for transition overlay fade timing
- No tests for CTA button state handling

**Performance:**
- No load time tests
- No render performance benchmarks
- No animation frame rate monitoring
- No memory leak detection

**Edge Cases:**
- No tests for rapid command submissions
- No tests for localStorage disabled
- No tests for network failures during config load
- No tests for missing audio files
- No tests for concurrent DOM manipulation

**Browser Compatibility:**
- No tests across browser versions
- No tests for feature detection (fetch, localStorage, IntersectionObserver)
- No tests for touch events (only mouse events)

## Mocking

**Framework:** Not applicable - no test framework configured

**What Would Need Mocking (if tests existed):**
- `localStorage` - use `jest.spyOn(Storage.prototype, 'getItem')`
- `fetch()` - use `jest.mock('fetch')`
- `setTimeout` - use `jest.useFakeTimers()`
- `document.querySelector` - mock DOM
- `navigator.platform` - for macOS sound check in landing.js

## Fixtures and Test Data

**Current Test Data:**
- `QUESTS` array in `terminal-sim.js` lines 3-197 serves as both app data and implicit test data
- 5 quests with 3-4 steps each, defined with expected inputs and response outputs
- Sample data includes:
  - `echo "hello"` → response: `hello`
  - `pwd` → response: `/Users/you`
  - `ls` → response: `Desktop  Documents  Downloads  projects`

**No Separate Test Fixtures:**
- Reuses production data
- No factory functions for test data generation
- No separate test data files

## Coverage

**Requirements:** Not enforced. No coverage tool configured.

**Estimated Coverage:**
- Terminal core flow: ~30% (command matching tested implicitly, flow not tested)
- Avatar system: ~20% (rendering tested manually, animations not tested)
- Landing page: ~10% (DOM structure tested manually, timing not tested)
- Overall: < 20% estimated (most code path coverage missing)

**Untested Areas:**
- All timing-dependent code
- All animation sequences
- All error recovery paths
- localStorage unavailable scenarios
- Network failures
- Config load failures

## Test Types

**Unit Tests:**
- Not present
- Would test: individual methods like `getGlowSize()`, `normalizeInput()`, `calculateLevel()`
- Would mock: DOM, localStorage, fetch

**Integration Tests:**
- Not present
- Would test: quest progression flow, avatar evolution, state persistence
- Would require: full DOM, localStorage, timing control

**E2E Tests:**
- Manual browser testing only
- Would require: test framework like Playwright, Cypress, or Puppeteer
- Current approach: developer opens page, runs quests, verifies manually

**Validation Scripts:**
- One validation script only: `web/scripts/validate-sprites.js`
- Node.js-based file system checks
- Not a test framework, but serves as health check for critical assets

## Browser-Based Manual Testing Approach

**How Tests Currently Run:**
1. Developer opens `web/terminal.html` in browser
2. Proceeds through quest system manually
3. Observes:
   - Command input acceptance/rejection
   - Visual feedback (particles, XP floats)
   - Avatar animations and speech bubbles
   - State persistence across page reload
   - Progress calculations and displays

**Verification Points:**
- Quest progresses with correct inputs
- Wrong inputs trigger hints
- Celebrations show correct XP amounts
- Avatar evolves at quest 3 and quest 5
- Progress persists in localStorage
- Completion screen shows final XP

**Limitations:**
- No automated failure detection
- No regression detection
- No performance metrics
- Time-consuming manual process
- Error-prone (human observation only)

## Recommended Testing Structure (If Tests Were Added)

**Suggested Framework:** Jest or Vitest

**File Structure:**
```
web/js/
├── terminal-sim.js
├── terminal-sim.test.js        ← would test core logic
├── avatar-system.js
├── avatar-system.test.js       ← would test avatar logic
├── landing.js
├── landing.test.js             ← would test DOM interactions
└── __mocks__/
    ├── localStorage.js         ← mock implementation
    └── fetch.js               ← mock fetch responses
```

**Test Organization:**
```javascript
// Example structure (not implemented)
describe('TerminalSimulator', () => {
  describe('command processing', () => {
    test('accepts exact command match', () => {});
    test('accepts alt command variations', () => {});
    test('matches without quotes', () => {});
    test('normalizes whitespace', () => {});
  });

  describe('quest progression', () => {
    test('advances step on correct input', () => {});
    test('completes quest when steps exhausted', () => {});
    test('saves progress to localStorage', () => {});
  });

  describe('XP and scoring', () => {
    test('awards XP per quest completion', () => {});
    test('calculates level from total XP', () => {});
  });
});
```

---

*Testing analysis: 2026-01-23*
