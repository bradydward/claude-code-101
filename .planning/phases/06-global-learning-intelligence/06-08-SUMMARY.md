---
phase: 06
plan: 08
subsystem: curriculum-intelligence
tags: [smart-hints, teaching-flow, confusion-detection, proactive-help]

requires:
  - docs/claude/smart-hints.md
  - question tracking infrastructure

provides:
  - executable hint integration logic
  - position-based hint lookup
  - session memory tracking pattern

affects:
  - teaching flow (Section 9)
  - student experience during lessons
  - confusion mitigation

tech-stack:
  added: []
  patterns: [session-memory-tracking, position-based-lookup]

key-files:
  created: []
  modified:
    - CLAUDE.md

decisions:
  - decision: "Use session memory (not persisted) for hint tracking"
    rationale: "Hints are contextual to current lesson - no need to persist across sessions"
    impact: "Simpler implementation, no file I/O overhead"

  - decision: "Max 1 hint per lesson enforced via session flag"
    rationale: "Prevent hint fatigue and information overload"
    impact: "Students get targeted help without feeling nagged"

  - decision: "Position-based lookup table in CLAUDE.md"
    rationale: "Quick reference for common positions without reading smart-hints.md every time"
    impact: "Faster hint display, clear mapping for Claude to execute"

metrics:
  duration: "1 minute"
  completed: "2026-01-26"
---

# Phase 6 Plan 8: Smart Hint Teaching Integration

**One-liner:** Added executable hint integration logic to CLAUDE.md with position-based lookup and session tracking to prevent fatigue.

## Overview

This plan closes Gap 2 from 06-VERIFICATION.md: smart-hints.md documented a hint library, but CLAUDE.md Section 9 had no programmatic integration. Hints existed but wouldn't actually appear during teaching.

Now Claude has clear, executable instructions:
1. Check if hint already shown this lesson (session memory)
2. Check if current position has confusion threshold met
3. Display hint BEFORE task presentation with standardized format

## What Was Built

### 1. Hint Integration Logic (3-Step Pattern)

Added to CLAUDE.md Section 9 "Smart Hints":

**Step 1: Check Hint Already Shown**
- Session memory tracks hints shown in current lesson
- Skip if already shown (enforce max 1 per lesson)

**Step 2: Check Confusion Threshold**
- Position-based rules (M1.L2+ for paths, M2.L1+ for npm, etc.)
- References smart-hints.md for authoritative library

**Step 3: Display Hint**
- Appears BEFORE task instruction (non-interrupting)
- Standardized format with 💡 emoji
- Mark as shown in session memory

### 2. Position-Based Lookup Table

Quick reference table maps positions to hint texts:

| Position | Hint Topic | Text Preview |
|----------|-----------|--------------|
| M1.L2.* | Paths | "Think of ~ as 'home' and / as separating folders" |
| M1.L3.* | cd navigation | "no slashes = folder in current location" |
| M2.L1.* | npm | "Think of it as an 'app store' for code tools" |
| M2.L2.* | API keys | "It's like a password that lets programs use services" |
| M3.L2.* | Prompts | "Be specific! 'Create a blue button' works better" |
| M4.L1.* | Models | "Haiku = fast/cheap, Sonnet = balanced, Opus = complex" |
| M7.L1.* | JSON | "Watch for missing commas and matching brackets" |
| M7.L3.* | Permissions | "'Permission denied' usually means you need sudo" |

### 3. Display Pattern Example

Shows Claude exactly how to format hints:

```
[Claude about to present Task 2.1.3]

Claude: "Before we continue...

💡 Many students ask about npm. Think of it as an
   'app store' for code tools.

Okay, let's install npm packages! Your task is..."
```

### 4. Session Memory Tracking Pattern

Documented tracking mechanism:
- Reset hint flag on lesson start
- Set flag after showing hint
- Check flag before showing any hint
- Not persisted (session-only)

## Technical Implementation

### Changes to CLAUDE.md

**Before (Gap):**
- Generic hint triggers listed (Module 1: paths, Module 2: npm)
- No executable logic for when/how to show hints
- No tracking mechanism for preventing duplicates
- No position-to-text mapping

**After (Closed):**
- 3-step executable integration logic
- Position-based threshold checks (M1.L2+, M2.L1+, etc.)
- Session memory tracking pattern documented
- Quick reference lookup table with exact hint texts
- Display pattern example for formatting

### Integration Points

1. **Teaching Flow Checkpoint:** BEFORE presenting any task, execute hint check
2. **smart-hints.md Reference:** `@docs/claude/smart-hints.md` for authoritative library
3. **Session Memory:** Tracked in Claude's session context (no file I/O)
4. **Privacy Preserved:** "Many students" phrasing, no individual references

## Key Design Decisions

### Decision 1: Session Memory vs Persistent Tracking

**Choice:** Session memory only (not persisted to progress.json)

**Rationale:**
- Hints are contextual to current lesson
- No value in remembering hints across sessions
- Reduces file I/O overhead
- Simpler implementation

**Tradeoff:** If student restarts session mid-lesson, might see hint again (acceptable)

### Decision 2: Max 1 Hint Per Lesson

**Choice:** Hard limit enforced via session flag

**Rationale:**
- Prevent hint fatigue and information overload
- Maintain teaching flow momentum
- Students learn best when not constantly interrupted

**Tradeoff:** Might miss showing hint for multiple confusion topics in one lesson (rare case)

### Decision 3: Position-Based Lookup Table

**Choice:** Include quick reference table in CLAUDE.md

**Rationale:**
- Claude can execute without reading smart-hints.md every time
- Clear mapping for common positions
- Reduces latency during teaching

**Tradeoff:** Duplication between CLAUDE.md and smart-hints.md (acceptable for speed)

## Verification

**All checks passed:**

✅ CLAUDE.md Section 9 contains "Hint Integration Logic" subsection
✅ Position-to-hint mapping table exists (8 positions mapped)
✅ Session memory tracking pattern documented
✅ Max 1 hint per lesson rule explicitly stated
✅ Display pattern example shows BEFORE task presentation

**Gap 2 Status:** ✅ CLOSED

## Next Phase Readiness

### Enabled Capabilities

1. **Proactive Confusion Mitigation:** Claude shows hints at known confusion hotspots
2. **Privacy-Preserving Help:** Aggregated insights without individual references
3. **Non-Disruptive Teaching:** Hints appear before tasks, not interrupting
4. **Fatigue Prevention:** Max 1 hint per lesson prevents nagging

### What This Unblocks

- **INTEL-07 (Smart Hints):** Now fully executable in teaching flow
- **Live Student Testing:** Hints will appear automatically when confusion detected
- **Data-Driven Iteration:** Can observe which hints reduce follow-up questions

### Integration Status

| System | Status | Notes |
|--------|--------|-------|
| Question Tracking | ✅ Complete | Feeds confusion data |
| Smart Hints Library | ✅ Complete | Authoritative hint source |
| Teaching Flow Integration | ✅ Complete | This plan |
| Privacy Controls | ✅ Complete | "Many students" phrasing |
| Analytics Dashboard | ✅ Complete | Shows confusion hotspots |

## Implementation Notes

### For Live Deployment

1. **First Sessions (No Data):** Skip hints if no confusion data available
2. **Hint Effectiveness:** Can measure by comparing questions before/after hint shown
3. **Hint Refinement:** Update smart-hints.md based on student feedback
4. **New Topics:** Add new hints when question aggregates reveal new confusion

### Testing Checklist

- [ ] Hint appears at M1.L2 start (paths confusion)
- [ ] Max 1 hint per lesson enforced (second task shows no hint)
- [ ] Hint resets on new lesson (M1.L3 can show different hint)
- [ ] Display format matches pattern (💡 emoji, "Many students" phrasing)
- [ ] No hints when confusion data unavailable (graceful degradation)

## Deviations from Plan

None - plan executed exactly as written.

## Completion Summary

**Objective:** ✅ Integrate smart hints into teaching flow with executable logic

**Gap Closure:** Gap 2 from 06-VERIFICATION.md resolved (smart-hints.md now has programmatic integration)

**Files Modified:** CLAUDE.md (Section 9 Smart Hints expanded from 22 lines to 50 lines)

**Commits:**
- feat(06-08): add executable hint integration logic to CLAUDE.md (589a88b)

**Duration:** 1 minute

**Impact:** Claude can now show proactive hints at known confusion hotspots, reducing student frustration and improving learning flow.
