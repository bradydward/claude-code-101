# Phase 1 Context: Core Experience Polish

**Created:** 2026-01-24
**Goal:** Existing curriculum, teaching, and celebrations feel professional and addictive

## Overview

Phase 1 takes the existing foundation (15-module curriculum, RPG system, celebrations, teaching patterns) and polishes it to "can't stop playing" quality. This is NOT a rebuild - it's making what exists feel professional and irresistible.

**Core principle:** Fix and polish existing systems before adding new capabilities. Students must feel confident in instructions, rewarded by celebrations, and engaged by progression.

## Locked Decisions

### 1. Curriculum Audit Approach

**Decision:** Baseline quality focus (NOT self-improvement/adaptive system)

**What this means:**
- Audit all 15 modules in curriculum.md for completeness
- Every module must have all lessons and tasks defined
- Every task must have clear, step-by-step instructions
- Every task must explain WHY (the learning objective, not just what to do)
- Missing content gets written, unclear instructions get rewritten
- Test quality by builder going through modules themselves

**What we're NOT doing:**
- Automated tracking of student confusion points
- Analytics on question patterns or common mistakes
- Self-updating content based on cohort data
- A/B testing different instruction approaches
- Machine learning or adaptive curriculum features

**Rationale:**
- Builder IS the test user - direct feedback loop
- Phase 1 goal is "professional and addictive" (quality now, not smart later)
- Organic improvement happens as builder completes modules
- Research shows time-to-first-win matters more than curriculum optimization
- v2 can add adaptive features once baseline works reliably

**Completeness bar:**
- Module is "complete" when: all lessons have actionable tasks with WHY explanations
- NOT production-perfect, but good enough for builder to learn from
- Gaps discovered during builder's journey get fixed immediately
- Quality bar: "Could another complete beginner follow this?"

### 2. Teaching Pattern (Already Decided)

**Decision:** Single conversation pattern (NOT two terminals)

**Reference:** Detailed plan exists at `/Users/bradyward/.claude/plans/keen-sniffing-quail.md`

**What this means:**
- Student runs `claude` in project folder
- All teaching, practice, verification happens in that one conversation
- Claude can demonstrate commands (Bash tool) OR student can run them
- Both approaches valid - choose based on teaching moment
- Verification uses file tools (Read, Glob, Grep) regardless of who ran command

**What changes:**
- CLAUDE.md Section 17 (How to Teach) - rewrite to remove two-terminal pattern
- CLAUDE.md Section 16 (Session Flow) - update to single conversation
- Remove all 🖥️/💬 emoji format examples
- Shift tone from directive to collaborative ("Let's do this together")

**Rationale:**
- Matches GSD pattern (single conversation, collaborative)
- Reduces beginner confusion (no window switching)
- Documentation-reality mismatch fix (curriculum.md never mentioned two terminals)
- More natural teaching flow

### 3. Visual Celebrations (Pattern-Based)

**Decision:** Use existing music_config.json patterns with afplay sequences

**What this means:**
- Build on proven afplay architecture (non-blocking, bulletproof)
- Single sounds for quick events (task/lesson/badge)
- Choreographed sequences for epic events (module/level/class)
- ASCII art + color + music = complete celebration experience
- All celebration logic already documented in CLAUDE.md Section 8

**Enhancement areas:**
- VIS-01 through VIS-06 may need NEW ASCII art designs
- Ensure celebrations feel epic (not just functional)
- Color usage via ANSI codes for visual impact
- Animation through timed ASCII frame sequences (if needed)

**Constraints:**
- Must never block teaching flow (run_in_background: true)
- Must work on macOS with zero setup (afplay only)
- Must use error suppression pattern: `(afplay ... 2>/dev/null || true) &`

**Existing assets:**
- music_config.json has all event triggers and sound sequences
- CLAUDE.md Section 8 documents DJ logic completely
- System sounds library available at `/System/Library/Sounds/`

### 4. Cosmetics Shop (Build on Existing)

**Decision:** CLI interface using cosmetics.json structure

**What this means:**
- cosmetics.json already defines all items (skins, themes, sounds, accessories)
- Shop command (`/shop`) presents browseable categories
- Purchase flow: select item → confirm cost → deduct Aura → update progress.json
- Display uses ASCII formatting (category headers, item cards, price tags)

**Must-haves:**
- Show student's current Aura balance prominently
- Group items by category (skins, themes, sounds, accessories)
- Show price and owned status for each item
- Handle insufficient Aura gracefully ("Need 50 more Aura!")
- Update customization section in progress.json on purchase

**Nice-to-haves:**
- Preview equipped vs unequipped items
- "Recommended for your class" suggestions
- Rarity indicators (common, rare, legendary)

**Constraints:**
- Free cosmetics in v1 (no real money)
- All items purchaseable with earned Aura only
- No loot boxes or randomization (direct purchase)

### 5. Game Mechanics Verification

**Decision:** Trust existing formulas, verify calculations match specs

**What this means:**
- Skill unlocks (GAME-01): Verify stat bonuses apply correctly
- Shop (GAME-02): Covered above
- Streak freeze (GAME-03): Verify auto-use logic works
- Class bonuses (GAME-04): Verify calculations (Gigachad +1 Creativity, etc.)

**Verification approach:**
- Create test scenarios in progress.json
- Run through level-up, skill unlock, streak scenarios
- Check that numbers match formulas in CLAUDE.md
- Fix any calculation bugs found

**NOT rebuilding:**
- XP system (already works)
- Stat growth formulas (already defined)
- Class bonus logic (already specified)
- Just verifying implementation matches design

### 6. Teaching Clarity (Documentation + Testing)

**Decision:** CLAUDE.md is source of truth, verify via builder testing

**What this means:**
- TEACH-01: Single conversation pattern (see #2 above)
- TEACH-02: Command verification uses Read/Glob/Grep tools
- TEACH-03: Error recovery guidance documented in CLAUDE.md Section 17
- TEACH-04: Concept reinforcement in cheat sheet (auto-update after lessons)

**Verification approach:**
- Builder goes through modules themselves
- Document any confusion moments
- Update CLAUDE.md if teaching pattern unclear
- Update curriculum.md if task instructions unclear

**Living Cheat Sheet:**
- MY_CHEAT_SHEET.md updates after each lesson
- Appends: commands learned, key insights, examples, common mistakes
- Also generates MY_CHEAT_SHEET.html for browser viewing
- Logic already documented in CLAUDE.md Section 17

## Success Criteria (Interpreted)

From ROADMAP.md, Phase 1 success means:

1. **"Student can complete any lesson without confusion about what to do next"**
   - Interpretation: Every task has clear next-step instructions
   - Test: Builder completes Module 1 without external help
   - Evidence: No "what do I do now?" moments during builder testing

2. **"Every task completion triggers visible celebration"**
   - Interpretation: Task complete = ASCII + sound + stat display
   - Test: Complete 5 tasks, verify each shows celebration
   - Evidence: No silent completions (always feedback)

3. **"Level-up sequence feels epic"**
   - Interpretation: Animation + music sequence + skill choice + stat display
   - Test: Trigger level-up, measure emotional impact ("That felt awesome!")
   - Evidence: ASCII art, sound sequence, skill tree presentation

4. **"Student can browse cosmetics shop and purchase items"**
   - Interpretation: `/shop` command shows items, purchase flow works
   - Test: Browse categories, purchase item, verify Aura deducted
   - Evidence: cosmetics applied to status display, balance updated

5. **"Living cheat sheet updates automatically after each lesson"**
   - Interpretation: Lesson complete → MY_CHEAT_SHEET.md gets new content
   - Test: Complete lesson, verify new commands/insights appended
   - Evidence: File timestamp updates, content grows organically

## Scope Boundaries

### IN SCOPE (Phase 1)

**Curriculum:**
- Audit all 15 modules for completeness
- Write missing lesson content
- Rewrite unclear instructions
- Add WHY explanations where missing
- Update living cheat sheet logic

**Visual Celebrations:**
- Design ASCII art for 6 event types
- Ensure music triggers on all events
- Add color to celebration displays
- Level-up animation polish

**Game Mechanics:**
- Verify skill unlock stat bonuses
- Verify class bonus calculations
- Verify streak freeze auto-use
- Build working cosmetics shop CLI

**Teaching Clarity:**
- Convert two-terminal → single conversation (CLAUDE.md updates)
- Document verification patterns (when to use Read/Glob/Grep)
- Error recovery guidance examples
- Cheat sheet auto-update implementation

### OUT OF SCOPE (Defer to Later Phases)

**Not Phase 1:**
- One-click installer (Phase 2: Onboarding)
- Web portal integration (Phase 2: Onboarding)
- Progressive disclosure (Phase 2: Onboarding)
- Background music with Howler.js (Phase 3: Music System)
- Test-out mechanics (Phase 4: Test-Out System)
- Guided project system (Phase 5: Guided Projects)
- Self-improving curriculum (v2 feature)
- Analytics or tracking systems (v2 feature)
- Multiplayer or social features (v2 feature)

## Key Files and Patterns

### Files to Modify

**High Priority:**
- `curriculum.md` - Audit, complete, polish all 15 modules
- `CLAUDE.md` - Update teaching pattern (Sections 17, 16, 12)
- `MY_CHEAT_SHEET.md` - Verify auto-update logic works
- Visual celebration displays (new ASCII art needed)

**Medium Priority:**
- Shop command implementation (uses cosmetics.json)
- Game mechanics verification scripts
- Error recovery examples

**Reference Only (Don't Modify):**
- `cosmetics.json` - Item definitions (complete)
- `music_config.json` - Sound sequences (complete)
- `skill_trees.json` - Skill definitions (complete)
- `progress.json` - Data structure (complete)
- `.planning/codebase/*` - Architecture understanding

### Patterns to Follow

**Progress Updates (MANDATORY):**
```
1. Read progress.json ONCE
2. Calculate ALL updates (XP, stats, aura, positions, arrays)
3. Write complete updated JSON in ONE operation (Write tool)
4. Display results to student
```

**Music Commands (MANDATORY):**
```bash
# Always use run_in_background: true
(afplay /System/Library/Sounds/Hero.aiff 2>/dev/null || true) &
```

**Verification Pattern:**
```
1. Student completes task OR Claude demonstrates
2. Claude verifies with Read/Glob/Grep tools
3. Celebrate completion with XP/stats/music
4. Update progress.json atomically
```

**Celebration Sequence:**
```
1. Display ASCII art (instant visual)
2. Trigger music (non-blocking)
3. Show stat gains and XP earned
4. Check for level-up threshold
5. Update progress.json (single write)
```

## Open Questions

**None** - All major decisions locked. Details can be resolved during planning/execution.

## Context for Downstream Agents

**For Researcher (if spawned):**
- Focus: ASCII art libraries, celebration sequence timing, CLI shop interface patterns
- Skip: Music system research (already complete), teaching theory (already decided)
- Priority: Practical implementation examples (working code, proven patterns)

**For Planner:**
- Start with curriculum audit (foundational)
- Teaching pattern conversion is high-impact (affects all lessons)
- Visual celebrations can be incremental (task → lesson → module)
- Shop can be final polish (nice-to-have, not critical path)

**For Executor:**
- Test everything as builder going through curriculum
- Verify each change improves clarity or game feel
- Commit atomically (curriculum updates, teaching pattern changes, shop implementation)
- Maintain CLAUDE.md as source of truth

## Dependencies

**From Previous Work:**
- codebase map documents (`.planning/codebase/`)
- cosmetics.json structure
- music_config.json sequences
- skill_trees.json definitions
- progress.json schema
- Two-terminal teaching pattern analysis (keen-sniffing-quail.md plan)

**For Next Phases:**
- Phase 2 needs working curriculum (clear instructions, verified teaching)
- Phase 3 needs celebration events working (music triggers)
- Phase 4 needs complete curriculum (test-out validates against it)
- Phase 5 needs teaching clarity (guided projects use same pattern)

---

*Context locked: 2026-01-24*
*Ready for planning: Yes*
