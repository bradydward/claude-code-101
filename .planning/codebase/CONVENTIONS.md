# Coding Conventions

**Analysis Date:** 2026-01-23

## Naming Patterns

**Files:**
- kebab-case for multi-word files: `terminal-sim.js`, `avatar-system.js`, `landing.js`
- Descriptive purpose-driven naming: `validate-sprites.js`
- Config files are JSON: `sprite-config.json`, `music_config.json`

**Functions:**
- camelCase for all function names: `createParticles()`, `initSmoothScroll()`, `playAnimation()`
- Verbs at start for actions: `init*()` for initialization, `create*()` for DOM creation, `show*()` for display, `handle*()` for events
- Single responsibility reflected in name: `handleKeydown()`, `processCommand()`, `completeQuest()`

**Variables:**
- camelCase for all variables: `currentQuest`, `isWaitingForInput`, `wrongAttempts`, `typewriterSpeed`
- Descriptive names over abbreviations: `particleContainer` not `pc`, `animationDelay` not `delay`
- Boolean prefix with `is`/`has`: `isWaitingForInput`, `hasVisited`, `hasAvatar`

**Types/Classes:**
- PascalCase for classes: `TerminalSimulator`, `AvatarSystem`
- Private properties not prefixed (convention only): `currentStage`, `currentColor`

**Constants:**
- SCREAMING_SNAKE_CASE for immutable data: `QUESTS`, `EXPECTED_SPRITES`, `SPRITES_DIR`
- Object maps for configuration: `sounds = { hover: ..., click: ... }`, `sizes = { recruit: 48, trainee: 72 }`

## Code Style

**Formatting:**
- No formatter configured (no prettier/eslint config detected)
- Manual spacing: 2-space indentation throughout
- Readable spacing: blank lines between logical blocks
- HTML strings inline with template literals (backticks)

**Linting:**
- No linter configured
- Follows implicit conventions from existing code
- Empty catch blocks allowed with comments: `} catch (e) {}` and `} catch (error) { ... }`

## Import Organization

**Order:**
1. External libraries (none in browser code)
2. Config/data files (JSON reads via fetch)
3. DOM selection constants (none at top level)
4. Class instantiation

**Path Aliases:**
- No aliases used
- Relative paths only: `data/sprite-config.json`, `assets/characters/`
- Absolute system paths for sounds: `/System/Library/Sounds/`

## Error Handling

**Patterns:**
- Silent failure for non-critical errors: `try { ... } catch (e) { // Start fresh }`
- Logged warnings for resource loading: `console.warn('Could not load sprite config, using defaults')`
- Promise catch with empty handlers for sounds: `.catch(() => {})` - Silently fail on audio
- Try-catch wrapping localStorage access (can throw on quota exceeded)
- Fallback rendering when resources unavailable: PNG fails → use SVG placeholder

**Error Recovery:**
- No error thrown to caller (browser context)
- Graceful degradation: missing sprites → use generated SVG
- Default values returned: `getGlowSize(stage) || 10`, `sizes[stage] || 48`

## Logging

**Framework:** console (no logging library)

**Patterns:**
- `console.warn()` for non-fatal issues: resource loading failures
- No `console.log()` in production code (only in validation scripts)
- Silent failures preferred over console.log (user-facing app)
- Validation script (validate-sprites.js) uses console for status reporting

## Comments

**When to Comment:**
- Explaining non-obvious logic: `void this.spriteElement.offsetWidth;` → "Trigger reflow to restart animation"
- Documenting PNG signature: `// PNG signature: 89 50 4E 47 0D 0A 1A 0A`
- Section headers for logical groupings: `// Mock Terminal Engine - Scripted Quest System`
- Brief explanations for magic numbers: `// -100px` (animation offset)

**JSDoc/TSDoc:**
- Not used throughout the codebase
- Method names are self-documenting instead

## Function Design

**Size:**
- Focused functions: most 10-30 lines
- Larger complex logic broken into helper methods
- `TerminalSimulator` class has 30+ methods, each focused

**Parameters:**
- Minimal parameters (usually 0-2)
- Objects passed when multiple related values: `{ expected, altExpected, response }`
- Default parameters used: `duration = 3000`, `callback`

**Return Values:**
- Most methods return `undefined` (side effects on DOM/state)
- Some return values for chaining: `loadConfig()` returns promise
- Boolean predicates rarely used; state mutations instead

## Module Design

**Exports:**
- Classes exported as global constructors: `class TerminalSimulator` → `new TerminalSimulator()`
- Immediate DOM initialization: `document.addEventListener('DOMContentLoaded', () => new TerminalSimulator())`
- Validation script uses Node.js exports: `module.exports` pattern (not shown but implied by require)

**Barrel Files:**
- Not used (no index.js files for re-exports)
- Direct imports of specific files

**Coupling:**
- Tight coupling to DOM selectors: `document.getElementById('terminal-input')`
- `AvatarSystem` initialized inside `TerminalSimulator` (has `this.avatar`)
- No dependency injection (implicit dependencies on global `window.AvatarSystem`)

## DOM Interaction Patterns

**Selectors:**
- `document.getElementById()` for direct IDs (element is required)
- `document.querySelector()` for CSS selectors (often null-checked)
- `document.querySelectorAll()` for multiple elements with `.forEach()`

**DOM Manipulation:**
- `.innerHTML` for HTML strings with validation
- `.textContent` for plain text (safe, no parsing)
- `.classList.add()` / `.remove()` for styling
- Direct `.style.*` for inline CSS only when needed (animation values)

**Event Handling:**
- `.addEventListener()` consistently used
- Arrow functions for context preservation: `(e) => this.handleKeydown(e)`
- Event objects passed fully (not destructured)

## State Management

**Pattern:** Instance properties on class
- `this.currentQuest`, `this.currentStep`, `this.totalXP` in TerminalSimulator
- `this.currentStage`, `this.currentColor`, `this.currentEmotion` in AvatarSystem
- Mutations directly: `this.currentQuest++`, `this.totalXP += quest.xpReward`

**Persistence:**
- localStorage for session state: `localStorage.getItem()`, `localStorage.setItem()`
- JSON serialization of progress: `JSON.stringify()`, `JSON.parse()`
- Error-safe wrapper: try-catch around localStorage (quota/disabled)

## Async Patterns

**Promises:**
- `fetch()` with async/await in avatar config load
- Promise chains with `.then()` for callbacks
- No async/await outside class methods

**Callbacks:**
- Heavy use of setTimeout for sequencing: `setTimeout(() => this.startCurrentStep(), 500)`
- Callback parameters passed to functions: `typewriterLines(lines, callback)`
- No promise-based sequencing (setTimeout preferred)

**Timing:**
- Animation delays: `setTimeout(() => particle.remove(), 600)`
- Sequential actions: multiple setTimeout calls with increasing delays
- No animation frame API used (CSS animations instead)

---

*Convention analysis: 2026-01-23*
