# Phase 2: Onboarding & Flow - Context

**Gathered:** 2026-01-23
**Status:** Ready for planning

<domain>
## Phase Boundary

Students go from "I want to learn" to first real win in under 5 minutes. This phase removes friction from the initial experience - from installation through first task completion. Teaching quality (Phase 1) is complete. New features (music system, test-out, guided projects) come in later phases. Focus: remove barriers between discovery and first success.

</domain>

<decisions>
## Implementation Decisions

### First 5 Minutes Flow

**Installer behavior:**
- Claude's discretion on exact flow (silent setup vs interactive vs hybrid)
- Whatever minimizes friction and gets to teaching fastest

**First XP gain timing:**
- Student sees XP gain immediately after choosing name (before any commands)
- Name choice itself awards 10 XP - instant gratification, teaches progression system
- Front-loads the reward to create immediate engagement

**Pre-teaching setup:**
- Quick name prompt
- 30-second orientation ("Here's how this works")
- Show status screen once
- Then jump straight to Module 1, Lesson 1, Task 1

**First win tutorial (after M1.L1.T1):**
- Explains XP system: "You just earned 10 XP! Here's how leveling works..."
- Quick tour of stats, levels, progression mechanics
- Happens AFTER first real task, not before (context before concept)

### Claude's Discretion

- Installation experience (script vs GUI, prerequisites, error handling)
- Web portal handoff acknowledgment (tone, timing, what gets mentioned)
- Progressive disclosure mechanics (exact unlock timing, communication of locked features)
- Orientation script content (what gets said in 30 seconds)
- Status screen design for first display

</decisions>

<specifics>
## Specific Ideas

- Under 5 minutes from install to first win is the north star
- Name choice awards XP to teach the system immediately
- Orientation is brief (30 seconds max) - just enough to not feel lost
- First task completion triggers tutorial about progression (not before)

</specifics>

<deferred>
## Deferred Ideas

None - discussion stayed within phase scope

</deferred>

---

*Phase: 02-onboarding-a-flow*
*Context gathered: 2026-01-23*
