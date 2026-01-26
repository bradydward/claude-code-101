# Module Challenges (Test-Out System)

**Reference for CLAUDE.md Section 15**

This document contains the complete challenges/test-out system that allows experienced students to skip modules by proving existing mastery through quick validation challenges.

---

## Overview

The test-out system provides an efficient path for students who already know module content from prior experience. Instead of repeating lessons, they can demonstrate competency through 5-10 minute challenges.

**Key Features:**
- Available for Modules 2-7 (Module 1 is prerequisite for all)
- Triggered by `/challenge` command at module start
- 5-10 minute validation proving existing knowledge
- Full XP/badge parity with lesson path (same rewards, no penalties)
- Unlimited retries with kind feedback

**Philosophy:** Test-out feels like efficiency, not like missing out. Challenge path and lesson path both lead to the same destination with the same rewards.

## Challenge Trigger Pattern

**Command:** `/challenge`

**When valid:** Only at module start (not mid-module). Student must have completed Module 1.

**Response:** Begin challenge validation for current module.

**Prerequisites:**
- Module 1 must be complete (check `completed.modules` array)
- Student must be at the start of a module (lesson 1, task 1)
- Modules 2-7 only (Module 1 has no challenge option)

## Module 2 Challenge: Installing Claude Code

**Core competencies tested:**
- Understanding API keys and authentication
- npm global installation
- First Claude Code launch

**Validation scenarios (3 total, ~7 min):**

**Scenario 1 (Automated): Verify Claude Code is installed**
- Run: `claude --version` via Bash tool
- Pass criteria: Command returns version number without error
- Why automated: Objective check, no interpretation needed

**Scenario 2 (Conversational): Understanding global installation**
- Ask: "What does the -g flag mean in npm install -g? Why is it needed for Claude Code?"
- Pass criteria: Student explains global installation (available from any folder, not project-specific)
- Accept paraphrasing: Test understanding, not memorization
- Why conversational: Validates "why" not just "how"

**Scenario 3 (Practical): Package verification demonstration**
- Ask: "Show me how you'd check if a global npm package is installed"
- Student demonstrates (e.g., `npm list -g`, `which claude`, etc.)
- Claude verifies command works and shows correct output
- Pass criteria: Student uses valid method and interprets results correctly
- Why practical: Proves real-world capability, not just theory

**Pass criteria:** All 3 scenarios pass

**Badge on pass:** Setup Champion 🏆

## Module 3 Challenge: First Conversations + Class Selection

**Core competencies tested:**
- File creation via conversation
- Specific vs vague prompts
- Understanding Claude Code's capabilities (what it CAN and CAN'T do)

**Validation scenarios (4 total, ~8 min):**

**Scenario 1 (Practical): File creation through conversation**
- Ask: "Create a file called challenge-test.txt with the content 'Claude Code validation test' inside"
- Claude verifies file exists with correct content via Read tool
- Pass criteria: File created correctly through conversational request
- Why practical: Core skill of Module 3 - talking to Claude Code to create files

**Scenario 2 (Conversational): Prompt specificity**
- Ask: "What's the difference between asking Claude Code 'make a webpage' vs giving specific requirements like 'create index.html with blue background, white text, and a heading saying Hello World'?"
- Pass criteria: Student explains specific prompts yield specific results, vague prompts require guessing
- Accept paraphrasing: Various ways to express this concept
- Why conversational: Understanding prompt quality is conceptual, not mechanical

**Scenario 3 (Conversational): Capability boundaries**
- Ask: "Can Claude Code check the weather? Why or why not?"
- Pass criteria: Student explains Claude Code works with local files/computer, not internet data
- Alternative phrasings accepted: "It can't access APIs", "It's not connected to weather services", etc.
- Why conversational: Understanding scope prevents frustration later

**Scenario 4 (Class Selection): Required if not already selected**
- If `student.class` is null: Must select class (cannot skip this)
- If already selected: Skip this scenario
- Why required: Class selection is permanent decision affecting all future progression

**Pass criteria:** Scenarios 1-3 pass, class selected (if needed)

**Badge on pass:** First Contact 🏆

## Module 4 Challenge: Claude Code Models

**Core competencies tested:**
- Understanding model differences (Haiku/Sonnet/Opus)
- Knowing when to use each model
- Switching models via /model command

**Validation scenarios (3 total, ~6 min):**

**Scenario 1 (Automated): Model switching capability**
- Ask student to switch to Haiku: `/model haiku`
- Verify via conversation (ask "what model am I?")
- Ask student to switch to Sonnet: `/model sonnet`
- Verify again
- Pass criteria: Student successfully switches models using /model command
- Why automated: Mechanical skill, objective verification

**Scenario 2 (Conversational): Model selection reasoning**
- Ask: "Describe when you'd use Haiku vs Opus. Give an example task for each."
- Pass criteria: Student explains Haiku for simple/fast tasks, Opus for complex/quality tasks
- Example answers accepted:
  - "Haiku for quick questions, Opus for architecture design"
  - "Haiku when speed matters, Opus when I need deep thinking"
  - Any response showing understanding of speed/simplicity vs power/complexity tradeoff
- Why conversational: Decision-making is conceptual, many correct ways to express it

**Scenario 3 (Conversational): Default model understanding**
- Ask: "Which model is the default and why is it a good default?"
- Pass criteria: Student identifies Sonnet as default and explains it balances speed/quality
- Accept paraphrasing: "middle ground", "all-rounder", "good enough for most work"
- Why conversational: Understanding defaults helps students make informed choices

**Pass criteria:** All 3 scenarios pass

**Badge on pass:** Model Master 🏆

## Module 5 Challenge: Writing Prompts Like a Pro

**Core competencies tested:**
- Context-rich prompting (the "Context Is King" principle)
- Multi-step instructions
- Iterating on responses
- Using prompt templates/patterns

**Validation scenarios (4 total, ~8 min):**

**Scenario 1 (Practical): Vague to specific prompt transformation**
- Give: "Fix the bug"
- Ask: "I'll give you a vague prompt. Rewrite it to be specific and actionable."
- Expect response like: "Look at [file] and find the error causing [symptom]. Fix it while keeping [constraint]."
- Pass criteria: Response includes context (file/location), specific action, and constraint
- Why practical: Tests ability to apply prompt engineering principles in real-world scenario

**Scenario 2 (Practical): Multi-step prompt creation**
- Ask: "Give me a multi-step prompt that creates a folder, puts a file in it, and writes specific content."
- Pass criteria: Student writes prompt with all three steps clearly specified
- Claude executes to verify it works
- Why practical: Tests ability to structure complex requests efficiently

**Scenario 3 (Conversational): Show your work pattern**
- Ask: "What's the 'show your work' prompting pattern and when would you use it?"
- Pass criteria: Student explains asking Claude to explain reasoning while building
- Accept paraphrasing: "Make Claude explain each step", "Ask for explanations with code", etc.
- Why conversational: Understanding pattern purpose, not just mechanics

**Scenario 4 (Conversational): Options vs single answer**
- Ask: "What's the difference between asking for options vs asking for a single answer?"
- Pass criteria: Student understands options pattern explores solution space before committing
- Accept variations: "Options help compare approaches", "Single answer is faster but less exploratory"
- Why conversational: Decision-making strategy, not memorizable fact

**Pass criteria:** All 4 scenarios demonstrate understanding (not memorization)

**Badge on pass:** Prompt Engineer 🏆

## Module 6 Challenge: Plan Mode - Safe Exploration

**Core competencies tested:**
- Understanding what plan mode does (preview without execution)
- Knowing when to use plan mode
- Exiting plan mode to execute

**Validation scenarios (3 total, ~6 min):**

**Scenario 1 (Automated + Conversational): Plan mode demonstration**
- Ask: "Enter plan mode and ask Claude to reorganize files. What do you see?"
- Student types `/plan`
- Student asks Claude to reorganize files
- Pass criteria: Student explains they see a preview/plan without actual file changes
- Why hybrid: Tests both mechanical skill (entering plan mode) and understanding (recognizing preview)

**Scenario 2 (Conversational): When to use plan mode**
- Ask: "When would you use plan mode vs just asking Claude to do something directly?"
- Pass criteria: Student mentions big changes, irreversible operations, wanting to preview, or being unsure
- Key insight: Plan mode is for "big changes you want to preview first"
- Accept variations: Many valid ways to express this use case
- Why conversational: Strategic decision-making based on context

**Scenario 3 (Practical): Exiting plan mode**
- Ask: "Exit plan mode and verify you're back in normal mode."
- Student types `/plan` again (toggles off) or `/exit-plan`
- Claude verifies plan mode is off
- Pass criteria: Student demonstrates understanding of toggle/exit mechanism
- Why practical: Must prove ability to control mode, not just describe it

**Pass criteria:** All 3 scenarios pass

**Badge on pass:** Plan Mode Pro 🏆

## Module 7 Challenge: Technical Foundations

**Core competencies tested:**
- Understanding JSON structure
- Recognizing common file types
- File management (copy, move, delete)
- Understanding paths (absolute vs relative)
- Basic terminal power moves
- Reading error messages

**Validation scenarios (5 total, ~10 min):**

**Scenario 1 (Practical): JSON creation**
- Ask: "Create a valid JSON file with an object containing a name string and age number."
- Claude verifies via Read tool: file created, JSON is valid, has correct structure
- Pass criteria: Valid JSON with string and number properties
- Why practical: JSON literacy is hands-on, not theoretical

**Scenario 2 (Conversational): File type understanding**
- Ask: "What's the difference between .md and .json files? When would you use each?"
- Pass criteria: Student explains Markdown is for human-readable docs, JSON is for structured data
- Accept paraphrasing: Many ways to express this distinction
- Why conversational: Conceptual understanding of file purposes

**Scenario 3 (Conversational): Path types**
- Ask: "What's the difference between an absolute path and a relative path? Give an example of each?"
- Pass criteria: Student explains absolute starts from root (/ or ~), relative starts from current location
- Example: `/Users/name/Desktop` (absolute) vs `./Desktop` or `Desktop` (relative)
- Why conversational: Fundamental concept, multiple valid explanations

**Scenario 4 (Practical): File management command**
- Ask: "Show me how you'd copy a file to a new location using the terminal."
- Student demonstrates `cp source destination` pattern
- Pass criteria: Student can execute or explain the cp command correctly
- Why practical: Real command usage, not just theory

**Scenario 5 (Conversational): Error interpretation**
- Ask: "If you see 'Permission denied' error, what does it usually mean and what would you try?"
- Pass criteria: Student mentions file permissions, ownership, or using sudo (with caution note)
- Accept variations: Multiple valid troubleshooting approaches
- Why conversational: Error handling is contextual problem-solving

**Pass criteria:** At least 4 of 5 scenarios pass (this module is broader, slight leniency)

**Badge on pass:** Tech Foundation 🏆

## Validation Approach

**Three validation layers:**

1. **Automated checks** (files, commands, outputs)
   - Use Bash tool to run commands
   - Use Read tool to verify file contents
   - Objective, fast, consistent
   - Good for: Installation verification, command execution, file creation

2. **Conversational validation** (understanding, reasoning)
   - Ask conceptual questions
   - Accept paraphrasing and alternative phrasings
   - Test understanding, not memorization
   - Good for: "Why" questions, decision-making, capability boundaries

3. **Practical demonstrations** (capability, not just knowledge)
   - Student performs task, Claude verifies
   - Proves real-world skill, not just theory
   - Good for: Command usage, troubleshooting, applying concepts

**Timing guidance:**
- Each challenge designed for 5-10 minutes
- If taking longer than 10 minutes: Gently suggest lesson path may be better fit
- No hard time limit (avoid creating pressure/anxiety)
- Track actual completion time for feedback

## Challenge Announcement (Module Start)

**When to show:** At the start of every module 2-7, before presenting Lesson 1.

**Prerequisites check:**
- Module 1 must be complete (check `completed.modules` includes 1)
- Student must be at module start position (lesson 1, task 1)

**Announcement Template:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[emoji] MODULE {N}: {Module Name}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Already familiar with {topic_summary}?

Type /challenge to test out of this module in 5-10 minutes.

Or type "continue" to go through the lessons step by step.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Topic summaries by module:**
- Module 2: "npm, API keys, and installing CLIs"
- Module 3: "creating files through conversation and knowing Claude Code's capabilities"
- Module 4: "Claude's different models and when to use each"
- Module 5: "context-rich prompting, multi-step instructions, and prompt templates"
- Module 6: "plan mode for previewing changes before execution"
- Module 7: "JSON, file types, paths, file management, and reading error messages"

**Announcement rules:**
1. Show at EVERY module start (2-7) if Module 1 is complete
2. Wait for student response before proceeding
3. If student types `/challenge`: Start challenge validation for current module
4. If student types "continue" or anything else: Start Lesson 1 normally
5. Never pressure students - frame as option, not expectation

**Example flow:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📚 MODULE 2: Installing Claude Code
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Already familiar with npm, API keys, and installing CLIs?

Type /challenge to test out of this module in 5-10 minutes.

Or type "continue" to go through the lessons step by step.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Student responds with either `/challenge` (start challenge) or "continue" (start lessons).

## Challenge Pass Celebration

**Celebration Template (VIS-04 variant):**

When a student successfully passes a module challenge, display this epic celebration:

```
╔══════════════════════════════════════════╗
║   🏆 CHALLENGE COMPLETE! 🏆              ║
║                                          ║
║   Module {N}: {Module Name}              ║
║                                          ║
║   You proved your mastery! ⚡            ║
║                                          ║
║   +200 XP | +10 Aura                     ║
║   Badge Earned: {Badge Name} 🏆          ║
║                                          ║
║   Stats Boosted: {stat_emoji} {Stat} +3  ║
║                                          ║
║   Challenge time: {minutes} minutes      ║
╚══════════════════════════════════════════╝

🎵 {random module_complete sequence}

You demonstrated existing knowledge and skipped ahead efficiently.
Your stats and rewards match the lesson path - you didn't miss anything!

Ready for Module {N+1}?
```

**Music:** Same as module completion - random module_complete sequence (run_in_background: true)

**Progress Update Pattern (CRITICAL - single atomic write):**

1. Read progress.json ONCE
2. Calculate ALL updates:
   - Add module number to `completed.modules` array
   - Add module number (as string) to `challenges_passed` array (create if doesn't exist)
   - Add badge to `badges` array
   - Add +200 to `student.total_xp`
   - Add +3 to the module's stat (efficiency for M2, creativity for M3, etc.)
   - Add +10 to `aura_system.total_earned` AND `aura_system.current_balance`
   - Update `current_position.module` to N+1, `current_position.lesson` to 1, `current_position.task` to 1
   - Update `last_session` to today
3. Write progress.json ONCE

**Important notes:**
- Challenge path does NOT add individual lessons/tasks to completed arrays (student skipped them)
- The `challenges_passed` array tracks which modules were tested out (for analytics/display)
- XP parity: 200 XP matches module completion bonus from lesson path
- Stat parity: +3 matches module bonus (not per-task gains - this is the design decision from research)
- Aura parity: +10 matches module completion Aura

## Challenge Failure Feedback

**Close Attempt Template (passed some scenarios):**

When a student passes some scenarios but not all, provide specific encouraging feedback:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 CHALLENGE RESULT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

You're close! You got:
✅ {passed_scenario_1}
✅ {passed_scenario_2}
❌ {failed_scenario}

{Specific feedback on what needs review - 1-2 sentences}

Your options:
1. Type /challenge to retry (no XP penalty)
2. Type "continue" to take the lessons (comprehensive)
3. Type /hint for a concept refresher before retrying

Retrying after reviewing the concept is totally normal!
Many students retry 1-2 times.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Far From Passing Template (most scenarios failed):**

When a student fails most scenarios, gently guide them to the lesson path:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 CHALLENGE RESULT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This module covers several concepts you haven't
encountered yet. That's totally okay!

The challenge path is for students who've already
learned this material elsewhere. If Module {N} is new
to you, the lesson path is the best way to learn.

Your options:
1. Type "continue" to take the lessons (recommended)
2. Type /challenge to retry if you want another attempt

No penalty either way - the goal is learning, not racing!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Feedback guidelines:**
- Be specific about what passed and what needs work
- Never use shame or penalty language
- Frame lessons as valuable alternative, not punishment
- Normalize retrying ("many students retry 1-2 times")
- No music on failure (keep it low-key)

**Retry policy:**
- Unlimited immediate retries (no cooldown)
- No XP penalty for failing or retrying
- No tracking of attempt count (keep it simple)
- If student retries 3+ times, gently suggest lesson path might be better fit

**Hint command:**
- `/hint` during challenge shows a brief concept refresher (1-2 sentences per gap)
- Not the full lesson content, just the key insight
- Example for Module 2 npm question: "The -g flag installs packages globally, meaning you can use them from any folder on your computer."
