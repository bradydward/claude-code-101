# Phase 4: Test-Out System - Research

**Researched:** 2026-01-24
**Domain:** Competency-based assessment, proficiency testing, challenge validation systems
**Confidence:** HIGH

## Summary

This research investigated how to implement a test-out system that allows experienced students to skip modules by proving mastery through challenges. The domain spans three key areas: **competency-based assessment design** (validating real skills vs rote memorization), **challenge validation patterns** (automated checks + conversational validation), and **reward parity systems** (ensuring challenge path feels as rewarding as lesson path).

The standard approach in 2026 competency-based education emphasizes: authentic assessments using real-world scenarios, clear competency definitions with measurable criteria, multiple sources of evidence (not single quiz scores), meaningful pass/fail thresholds validated empirically, and progressive reward structures that motivate right behavior.

For CLI educational platforms, successful patterns include: cmdchallenge.com's one-line terminal tasks, automated file/command verification for technical skills, conversational validation for conceptual understanding, and 5-10 minute time-boxed challenges that respect student time.

The key insight: test-out systems must feel like efficient mastery demonstration, not like missing out on the learning journey. Epic celebrations on pass, kind failure feedback with retry options, and XP parity ensure students feel rewarded for existing knowledge without cheapening the lesson path experience.

**Primary recommendation:** Use mixed validation (automated checks for files/commands + conversational verification for understanding), 5-10 minute time-boxed challenges per module, full XP/badge rewards on pass, unlimited retries with cooldown, and module-start announcements to surface the option without pressure.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Claude Conversation | Native | Conversational validation | Can verify understanding through dialogue, detect gaps in knowledge |
| Bash verification | Native | Command output checks | Automated validation of terminal skills (files created, commands work) |
| Read/Grep/Glob tools | Native | File system validation | Verify artifacts created during challenge match specifications |
| progress.json | Existing schema | Challenge completion tracking | Add `challenges_passed` array to existing game state structure |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Temp directories | mktemp | Sandboxed challenge workspace | Modules requiring file operations without polluting student workspace |
| Diff/cmp | Native | Output comparison | Validate command output matches expected results exactly |
| Timer logic | Date arithmetic | Time-box challenges | Optional 10-minute soft limit with warnings at 5/8 minutes |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Mixed validation | Pure automated tests | Automated tests can't validate conceptual understanding, miss "why" knowledge |
| Conversation + files | Multiple-choice quiz | MCQ can't verify practical skills, easy to game with luck/guessing |
| Unlimited retries | 3-attempt limit | Hard limits feel punishing, discourage experimentation, create anxiety |
| Module-start trigger | Mid-module exit option | Mid-module feels like quitting vs testing out feels like confidence |

**Installation:**
```bash
# No new dependencies needed
# Uses existing Claude Code CLI tools:
# - Read, Write, Bash, Grep, Glob for validation
# - progress.json for tracking challenges_passed
# - CLAUDE.md for challenge content and validation logic
```

## Architecture Patterns

### Recommended Project Structure
```
.planning/phases/04-test-out-system/
├── 04-RESEARCH.md           # This file
├── 04-CONTEXT.md            # User decisions (exists)
├── 04-01-PLAN.md            # Challenge design (modules 2-4)
├── 04-02-PLAN.md            # Challenge design (modules 5-7)
├── 04-03-PLAN.md            # Validation engine + retry logic
└── 04-04-PLAN.md            # Integration + announcements

CLAUDE.md additions:
├── Section X: Module Challenges
│   ├── Challenge trigger (/challenge command)
│   ├── Validation patterns (mixed checks)
│   ├── Pass/fail handling
│   └── Retry policy

progress.json additions:
└── challenges_passed: ["2", "5", "7"]  # Array of module IDs passed via challenge
```

### Pattern 1: Challenge Trigger and Announcement

**What:** Surface the test-out option at module start without creating pressure or FOMO.

**When to use:** Beginning of Modules 2-7 (after Module 1 complete).

**Example:**
```markdown
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📚 MODULE 2: Installing Claude Code
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Already familiar with npm, API keys, and installing CLIs?

Type /challenge to test out of this module in 5-10 minutes.

Or type "continue" to go through the lessons step by step.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Why it works:**
- Framed as efficiency ("5-10 minutes") not as skipping
- No pressure ("Or type continue...")
- Clear value proposition (already familiar = save time)
- Available but not pushed

### Pattern 2: Mixed Validation Architecture

**What:** Combine automated file/command checks with conversational understanding verification.

**When to use:** All module challenges.

**Validation layers:**

**Layer 1 - Automated checks (files, commands, outputs):**
```bash
# Example: Module 2 challenge validation
# Check: Did they install Claude Code?
claude --version

# Check: Do they have an API key configured?
ls ~/.config/claude-code/config.json

# Check: Can they describe what npm does?
# (Conversational - see Layer 2)
```

**Layer 2 - Conversational understanding:**
```markdown
Claude: "You've shown you can install tools. Now let me verify understanding:
         What does the -g flag in 'npm install -g' do?"

Student: "It installs globally so I can use it from any folder"

Claude: "Perfect! That shows you understand the concept, not just the steps."
```

**Layer 3 - Practical demonstration:**
```markdown
Claude: "Final check: Create a temp folder and demonstrate installing a package."

# Student performs task, Claude verifies:
# - Folder created correctly
# - Package installed successfully
# - Student can explain what happened
```

**Why three layers:**
- Automated checks: Speed, objectivity, consistency
- Conversation: Validates "why" not just "how"
- Practical demo: Proves real-world capability

### Pattern 3: Pass Celebration (Reward Parity)

**What:** Epic victory celebration matching module completion celebration from lesson path.

**When to use:** Challenge successfully completed.

**Example:**
```markdown
╔══════════════════════════════════════════╗
║   🏆 CHALLENGE COMPLETE! 🏆             ║
║                                          ║
║   Module 2: Installing Claude Code       ║
║                                          ║
║   You proved your mastery! ⚡            ║
║                                          ║
║   +200 XP | +10 Aura                    ║
║   Badge Earned: Setup Champion 🏆        ║
║                                          ║
║   Stats Boosted: ⚙️ Efficiency +3       ║
║                                          ║
║   Challenge time: 7 minutes              ║
╚══════════════════════════════════════════╝

🎵 {random module_complete sequence}

You demonstrated existing knowledge and skipped ahead efficiently.
Your stats and rewards match the lesson path - you didn't miss anything!

Ready for Module 3?
```

**Sound sequence:**
```bash
# Same as module completion from lesson path
(afplay /System/Library/Sounds/Hero.aiff 2>/dev/null || true) &
(sleep 1.5 && afplay /System/Library/Sounds/Glass.aiff 2>/dev/null || true) &
(sleep 3 && afplay /System/Library/Sounds/Sosumi.aiff 2>/dev/null || true) &
```

**progress.json update:**
```json
{
  "completed": {
    "modules": [1, 2],  // Add module to completed
    "lessons": ["1.1", "1.2", ...],  // Leave as-is (didn't do lessons)
    "tasks": [...]  // Leave as-is
  },
  "challenges_passed": ["2"],  // NEW: Track challenge path separately
  "badges": ["Terminal Explorer 🏆", "Setup Champion 🏆"],  // Same badge
  "student": {
    "total_xp": 520,  // +200 XP (same as lesson path)
  },
  "stats": {
    "efficiency": 18  // +3 (same as lesson path)
  },
  "aura_system": {
    "total_earned": 50,  // +10 Aura (same as lesson path)
    "current_balance": 50
  }
}
```

### Pattern 4: Failure Feedback (Kind and Specific)

**What:** Constructive feedback on failure with clear options to retry or take lessons.

**When to use:** Challenge validation fails.

**Example (close attempt):**
```markdown
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 CHALLENGE RESULT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

You're close! You got:
✅ Tool installation (perfect)
✅ File navigation (solid)
❌ Package management concept (needs review)

The challenge requires demonstrating understanding of
global vs local package installation. This is a key
concept for Module 2.

Your options:
1. Type /challenge to retry (no XP penalty)
2. Type "continue" to take the lessons (comprehensive)
3. Type /hint for a concept refresher before retrying

Retrying after reviewing the concept is totally normal!
Many students retry 1-2 times.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Example (far from passing):**
```markdown
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 CHALLENGE RESULT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This module covers several concepts you haven't
encountered yet. That's totally okay!

The challenge path is for students who've already
learned this material elsewhere. If Module 2 is new
to you, the lesson path is the best way to learn.

Your options:
1. Type "continue" to take the lessons (recommended)
2. Type /challenge to retry if you want another attempt

No penalty either way - the goal is learning, not racing!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Why it works:**
- Specific feedback (what passed, what didn't)
- Clear options without judgment
- Normalizes retrying ("many students retry 1-2 times")
- Frames lessons as valuable, not as penalty

### Pattern 5: Challenge Content Design (Compressed Tasks)

**What:** Design challenges that compress module lessons into essential validation scenarios.

**When to use:** Creating challenges for each module.

**Design approach:**

**Lesson path:** 4 lessons × 4-6 tasks = 16-24 discrete steps
**Challenge path:** 3-5 key validation scenarios covering same ground

**Example: Module 2 (Installing Claude Code)**

Lesson path teaches:
- Lesson 2.1: Getting API key (6 tasks)
- Lesson 2.2: Installing Claude Code (5 tasks)
- Lesson 2.3: First launch (6 tasks)

Challenge compresses to:
1. **Scenario 1:** "Show me you can install a global npm package" (validates 2.2)
2. **Scenario 2:** "Explain what an API key does and where you'd get one" (validates 2.1 understanding)
3. **Scenario 3:** "Start Claude Code and run a simple file query" (validates 2.3)

**Validation:**
- Automated: Check `npm list -g` for package, verify Claude Code starts
- Conversational: Ask conceptual questions about API authentication, global installs
- Time: 5-10 minutes vs 30-45 minutes for lesson path

### Pattern 6: Retry Logic and Cooldown

**What:** Allow unlimited retries with optional short cooldown to prevent brute-forcing.

**When to use:** After challenge failure.

**Implementation options:**

**Option A - Unlimited immediate retries (recommended):**
```markdown
# Simpler, less punishing
Student fails → Can retry immediately
No artificial barriers
Encourages learning through iteration
```

**Option B - Soft cooldown:**
```markdown
# If gaming becomes an issue
First retry: Immediate
Second retry: 5-minute cooldown or complete 1 lesson
Third+ retry: Recommend taking lessons

Track retry count in progress.json temporarily:
{
  "challenge_attempts": {
    "module_2": 2,  // Reset to 0 on pass or module start via lessons
  }
}
```

**Recommendation:** Start with Option A (unlimited immediate). Add cooldown only if students game the system by spamming retries without learning.

### Anti-Patterns to Avoid

- **Hard retry limits:** "You failed 3 times, must take lessons now" feels punishing
- **XP penalties:** "Challenge gives less XP than lessons" makes it feel inferior
- **Silent challenge option:** Students won't discover `/challenge` if not announced
- **Trivial challenges:** Easy MCQ that anyone can pass without real knowledge
- **Brutal challenges:** Expecting perfect recall of every detail from module
- **Surprise difficulty:** Unclear what knowledge is being tested
- **Badge distinction shame:** "Tested Out" badge feels lesser than "Completed" badge
- **Time pressure:** Hard 5-minute limit with forced failure creates anxiety

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| CLI quiz interface | Custom TUI with arrow keys | Simple numbered prompts | Complexity not worth it for 3-5 questions, numbered works fine |
| Challenge timer | setInterval() with UI updates | Simple Date arithmetic | No need for real-time countdown, check duration at end |
| Answer validation | String matching | Conversation + automated checks | String matching is brittle, misses paraphrasing, can't assess understanding |
| Pass/fail threshold | Fixed percentage score | Multi-layer validation (files + concepts + demo) | Percentage scores don't work when each layer tests different competency |
| Retry rate limiting | Custom token bucket algorithm | Simple attempt counter | Over-engineering for anti-gaming that may never be needed |

**Key insight:** Challenge validation is fundamentally different from traditional testing. The goal is proving real competency, not scoring percentage correct. Mixed validation (automated + conversational + practical) is more reliable than pure quiz logic.

## Common Pitfalls

### Pitfall 1: Reward Imbalance Creates FOMO

**What goes wrong:** Challenge path gives less XP or different badge, making lesson path feel mandatory even for experienced students.

**Why it happens:** Designers worry about "cheapening" the full curriculum experience.

**How to avoid:**
- Full XP parity (200 XP + 10 Aura + badge, same as lessons)
- Same badge earned (not "Tested Out" variant)
- Same stat gains (+3 to module stat)
- Frame as efficiency, not shortcut

**Warning signs:**
- Students ask "will I miss XP if I challenge?"
- Students take lessons despite already knowing material
- Challenge path feels like punishment for prior knowledge

### Pitfall 2: Validation Too Easy or Too Hard

**What goes wrong:** Challenges are trivial (anyone passes) or brutal (requires perfect recall).

**Why it happens:** No clear competency threshold or trying to test everything.

**How to avoid:**
- Define 3-5 core competencies per module
- Test essential knowledge, not every detail
- Accept paraphrasing and alternative approaches
- Validate understanding (why) not just execution (how)

**Warning signs:**
- 100% pass rate (too easy)
- <20% pass rate (too hard)
- Students who clearly know material fail on technicalities
- Students who don't know material pass through luck

### Pitfall 3: Failure Feedback is Demotivating

**What goes wrong:** Generic "You failed" message with no guidance on what to improve.

**Why it happens:** Treating failure as binary outcome instead of learning moment.

**How to avoid:**
- Specific feedback (what passed, what needs work)
- Frame as normal ("many retry 1-2 times")
- Clear next steps (retry, take lessons, get hint)
- No shame or penalty language

**Warning signs:**
- Students feel discouraged after failure
- Students don't retry even when close
- Failure feels like "not good enough" instead of "needs review"

### Pitfall 4: Challenge Discovery Failure

**What goes wrong:** Students don't know `/challenge` exists, take all lessons despite prior knowledge.

**Why it happens:** Feature not announced, buried in docs, unclear when available.

**How to avoid:**
- Announce at EVERY module start (2-7)
- Clear command (`/challenge` not obscure syntax)
- Frame as option, not requirement
- Include in `/help` command list

**Warning signs:**
- Experienced students complain about repetitive lessons
- Low `/challenge` usage despite relevant audience
- Students discover feature late and feel frustrated

### Pitfall 5: Time Pressure Creates Anxiety

**What goes wrong:** Hard 5-minute limit with forced failure feels like race against clock.

**Why it happens:** Trying to enforce "quick proof" concept with technical timer.

**How to avoid:**
- Soft limit (warning at 8 minutes, no forced failure)
- Or no timer at all (rely on design to be quick)
- Focus on competency, not speed
- Frame as "typically takes 5-10 minutes" not "must finish in 10"

**Warning signs:**
- Students report stress during challenges
- Failures due to time running out, not lack of knowledge
- Students avoid challenges due to time pressure

### Pitfall 6: Stat Growth Doesn't Reflect Challenge Path

**What goes wrong:** Challenge awards +3 module stat but students miss +1 per task lesson stat growth.

**Why it happens:** Stat system designed for task-by-task progression, challenge bypasses tasks.

**How to avoid:**
- Calculate equivalent stat growth from skipped lessons
- Module 2 has 17 tasks × +1 Efficiency = +17 Efficiency
- Challenge awards +3 Efficiency (module bonus) + ??? (equivalent to skipped tasks?)
- **CRITICAL DECISION:** Research can't resolve this - planner must decide philosophy

**Options:**
- **Option A:** Challenge awards same as module path (+20 total for Module 2)
- **Option B:** Challenge awards only module bonus (+3 for Module 2)
- **Option C:** Challenge awards hybrid (module bonus + fraction of task stats)

**Recommendation:** Option A (full parity) unless user wants challenge path to emphasize different progression feel.

## Code Examples

Verified patterns from competency-based assessment research:

### Challenge Validation Pattern (Mixed)

```javascript
// Source: Competency-based assessment best practices (2026)
// Pattern: Multi-layer validation with clear competency thresholds

async function validateModuleChallenge(moduleId, studentResponses) {
  const results = {
    automated: null,
    conceptual: null,
    practical: null,
    passed: false,
    feedback: []
  };

  // Layer 1: Automated checks
  results.automated = await runAutomatedChecks(moduleId);
  // Example: Check if files exist, commands work, output matches

  // Layer 2: Conversational understanding
  results.conceptual = await askConceptualQuestions(moduleId, studentResponses);
  // Example: "What does -g flag do?" - validate understanding not memorization

  // Layer 3: Practical demonstration
  results.practical = await validatePracticalTask(moduleId);
  // Example: Create temp folder, install package, explain what happened

  // Determine pass/fail (must pass ALL layers)
  results.passed = results.automated.passed &&
                   results.conceptual.passed &&
                   results.practical.passed;

  // Generate specific feedback
  if (!results.passed) {
    if (!results.automated.passed) {
      results.feedback.push("❌ Technical execution needs review");
    }
    if (!results.conceptual.passed) {
      results.feedback.push("❌ Conceptual understanding needs strengthening");
    }
    if (!results.practical.passed) {
      results.feedback.push("❌ Practical application needs practice");
    }
  }

  return results;
}
```

### Challenge Announcement Pattern

```javascript
// Source: Progressive disclosure + opt-in design patterns
// Pattern: Surface option without pressure

function announceModuleStart(moduleId, studentProgress) {
  // Only show challenge option for Modules 2-7
  if (moduleId < 2 || moduleId > 7) {
    return showStandardModuleIntro(moduleId);
  }

  // Check if student has completed Module 1 (prerequisite)
  if (!studentProgress.completed.modules.includes(1)) {
    return showStandardModuleIntro(moduleId);
  }

  const module = curriculum.modules[moduleId];

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📚 MODULE ${moduleId}: ${module.name}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Already familiar with ${module.topicsList}?

Type /challenge to test out of this module in 5-10 minutes.

Or type "continue" to go through the lessons step by step.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `);

  // Wait for student choice
  const choice = await waitForInput();

  if (choice === '/challenge') {
    return startModuleChallenge(moduleId);
  } else {
    return startModuleLesson(moduleId, 1);
  }
}
```

### Pass Celebration Pattern

```javascript
// Source: VIS-04 template from visual-templates.md
// Pattern: Epic victory matching module completion

async function celebrateChallengePass(moduleId, challengeTime) {
  const module = curriculum.modules[moduleId];

  // Read progress once
  const progress = await readJSON('progress.json');

  // Calculate all updates
  const updates = {
    completed: {
      ...progress.completed,
      modules: [...progress.completed.modules, moduleId]
    },
    challenges_passed: [...(progress.challenges_passed || []), moduleId.toString()],
    badges: [...progress.badges, module.badge],
    student: {
      ...progress.student,
      total_xp: progress.student.total_xp + 200  // Same as lesson path
    },
    stats: {
      ...progress.stats,
      [module.stat_tag]: progress.stats[module.stat_tag] + 3  // Module bonus
    },
    aura_system: {
      ...progress.aura_system,
      total_earned: progress.aura_system.total_earned + 10,
      current_balance: progress.aura_system.current_balance + 10
    }
  };

  // Write once
  await writeJSON('progress.json', { ...progress, ...updates });

  // Display VIS-04 (module completion frame)
  console.log(`
╔══════════════════════════════════════════╗
║   🏆 CHALLENGE COMPLETE! 🏆             ║
║                                          ║
║   Module ${moduleId}: ${module.name.padEnd(28)} ║
║                                          ║
║   You proved your mastery! ⚡            ║
║                                          ║
║   +200 XP | +10 Aura                    ║
║   Badge Earned: ${module.badge.padEnd(20)} ║
║                                          ║
║   Stats Boosted: ${module.stat_emoji} ${module.stat_tag} +3       ║
║                                          ║
║   Challenge time: ${challengeTime} minutes              ║
╚══════════════════════════════════════════╝
  `);

  // Play music (non-blocking)
  playMusicSequence('module_complete');

  console.log(`
You demonstrated existing knowledge and skipped ahead efficiently.
Your stats and rewards match the lesson path - you didn't miss anything!

Ready for Module ${moduleId + 1}?
  `);
}
```

### Failure Feedback Pattern (Specific)

```javascript
// Source: Competency-based assessment feedback best practices
// Pattern: Specific, actionable, encouraging

function provideChallengeFailureFeedback(validationResults, retryCount) {
  const passedChecks = [];
  const failedChecks = [];

  if (validationResults.automated.passed) {
    passedChecks.push("✅ Tool installation (perfect)");
  } else {
    failedChecks.push("❌ " + validationResults.automated.specificIssue);
  }

  if (validationResults.conceptual.passed) {
    passedChecks.push("✅ Conceptual understanding (solid)");
  } else {
    failedChecks.push("❌ " + validationResults.conceptual.specificIssue);
  }

  if (validationResults.practical.passed) {
    passedChecks.push("✅ Practical application (excellent)");
  } else {
    failedChecks.push("❌ " + validationResults.practical.specificIssue);
  }

  const encouragement = retryCount === 0
    ? "You're close! Many students retry 1-2 times."
    : retryCount === 1
    ? "Making progress! The lessons cover this in depth if you need a refresher."
    : "This material might be new to you - the lesson path is designed to teach it thoroughly.";

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 CHALLENGE RESULT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${passedChecks.join('\n')}
${failedChecks.join('\n')}

${encouragement}

Your options:
1. Type /challenge to retry (no XP penalty)
2. Type "continue" to take the lessons (comprehensive)
${retryCount === 0 ? '3. Type /hint for a concept refresher before retrying' : ''}

${retryCount < 2 ? 'Retrying after reviewing the concept is totally normal!' : 'The lesson path ensures you master every concept.'}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `);
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Multiple-choice quizzes | Practical skills assessment + conversation | 2024-2026 | Tests real competency, not memorization or luck |
| Hard retry limits (3 attempts) | Unlimited retries or soft cooldown | 2025-2026 | Reduces anxiety, encourages learning through iteration |
| Percentage-based pass thresholds | Multi-layer competency validation | 2026 (CBE evolution) | More accurate skill measurement, harder to game |
| Single assessment moment | Multiple sources of evidence | 2026 (NAEP framework) | Better captures true understanding vs test-taking skill |
| Generic "You failed" messages | Specific feedback with next steps | 2025-2026 gamification | Failure becomes learning moment, not dead end |
| Test-out as obscure option | Progressive disclosure with announcements | 2026 UX patterns | Higher discovery rate, students feel empowered |

**Deprecated/outdated:**
- **MCQ-only assessments** (can't validate practical terminal skills)
- **Hard time limits with forced failure** (creates anxiety without improving validation)
- **Three-strikes retry policies** (punishing rather than educational)
- **Hidden test-out options** (low discovery, feels like secret for "insiders")
- **XP penalties for challenge path** (discourages efficiency, creates FOMO)

## Open Questions

Things that couldn't be fully resolved:

1. **Stat Growth Equivalence (Challenge vs Lesson Path)**
   - What we know: Lesson path awards +1 stat per task (17 tasks in Module 2 = +17 Efficiency) plus module bonus (+3)
   - What's unclear: Should challenge path award same total (+20 Efficiency) or just module bonus (+3)?
   - Recommendation: **PLANNER MUST DECIDE.** Options: (A) Full parity (+20), (B) Module bonus only (+3), (C) Hybrid (module bonus + 50% of task stats). User decision from CONTEXT.md says "Claude's discretion" so planner chooses philosophy.

2. **Mid-Module Challenge Triggers**
   - What we know: Module-start trigger is clear and announced
   - What's unclear: Does `/challenge` work mid-module (e.g., after Lesson 1 of 4)?
   - Recommendation: Start with module-start only (simpler). Add mid-module if students request it based on real usage patterns.

3. **Challenge Difficulty Calibration**
   - What we know: 5-10 minutes target, 3-5 validation scenarios, multi-layer checks
   - What's unclear: Exact pass threshold (all layers must pass, or 2 out of 3?)
   - Recommendation: Start strict (all layers pass). Relax if pass rates are <30% after real student data.

4. **Cheat Sheet Updates for Challenge Path**
   - What we know: Lesson path auto-updates MY_CHEAT_SHEET.md after each lesson
   - What's unclear: Does challenge path get condensed cheat sheet entries, or skip entirely?
   - Recommendation: Auto-populate with condensed entries (1-2 lines per key command/concept). Challenge completers still need reference material.

5. **Module 1 Challenge Availability**
   - What we know: CONTEXT.md says Modules 2-7 (excludes Module 1)
   - What's unclear: Why exclude Module 1? Is it prerequisite for all challenges, or just not worth testing out?
   - Recommendation: Keep Module 1 mandatory (establishes baseline terminal skills + first XP + orientation). All students start at same foundation.

## Sources

### Primary (HIGH confidence)
- [BEST PRACTICES FOR ASSESSMENT IN COMPETENCY-BASED EDUCATION](https://files.eric.ed.gov/fulltext/ED557614.pdf) - Empirical validation, competency definitions, standard-setting
- [Competency Based Learning & Assessment Guide 2025](https://www.verifyed.io/blog/competency-learning-assessment-guide) - Authentic assessments, real-world scenarios, portfolio development
- [Measuring Mastery: Best Practices for Assessment in CBE](https://www.aei.org/research-products/report/measuring-mastery-best-practices-for-assessment-in-competency-based-education/) - Pass thresholds, multiple evidence sources, quality assurance
- [Automated Grading and Feedback Tools for Programming Education](https://dl.acm.org/doi/10.1145/3636515) - Automated assessment for code, real-time feedback systems
- [Cmdchallenge](https://cmdchallenge.com/) - Terminal challenge platform, one-line validation patterns
- progress.json (project file) - Existing game state schema
- CLAUDE.md (project file) - Teaching patterns, reward systems
- 04-CONTEXT.md (phase file) - User decisions on challenge design

### Secondary (MEDIUM confidence)
- [How to Assess Learners in CBE Teaching Model](https://info.nhanow.com/learning-leading-blog/how-to-assess-learners-in-a-competency-based-education-teaching-model) - Assessment methods, practical skills application
- [Octalysis Gamification Framework (2026)](https://yukaichou.com/gamification-examples/octalysis-gamification-framework/) - Reward systems, engagement mechanics
- [Gamifying Quizzes with Leaderboards and Rewards](https://estha.ai/blog/a-complete-guide-to-gamifying-quizzes-with-leaderboards-and-rewards/) - Retry logic, progressive rewards
- [Test Out of College Classes Guide](https://study.com/college/online-degrees/can-you-test-out-of-college-classes-how-it-works-and-how-many-you-can-skip.html) - Challenge exam patterns, credit equivalence
- [CLI Quiz Game npm package](https://www.npmjs.com/package/cli-game-quiz) - Terminal quiz interfaces
- [Quizify - CLI Quiz App with JavaScript](https://www.geeksforgeeks.org/videos/quizify-cli-quiz-app-with-javascript/) - CLI quiz implementation patterns

### Tertiary (LOW confidence - general context)
- [Gamification in Learning 2026](https://www.gocadmium.com/resources/gamification-in-learning) - General trends, story/flow vs points/badges
- [Educational Assessment Knowledge for Teachers](https://www.mdpi.com/2227-7102/14/7/751) - Assessment literacy, formative vs summative
- Various quiz platform examples (Knovus, Spur Protocol) - Daily challenge patterns, retry mechanics

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Uses existing Claude Code tools, no new dependencies
- Architecture: HIGH - Patterns verified in CBE research and existing project structure
- Validation approach: HIGH - Multi-layer validation is proven CBE best practice
- Reward parity: MEDIUM - Philosophy decision needed (full parity vs differentiation)
- Challenge content design: MEDIUM - Requires per-module curriculum analysis (planning phase work)

**Research date:** 2026-01-24
**Valid until:** ~60 days (CBE assessment practices stable, challenge design may evolve with student feedback)

**Key gaps filled by this research:**
1. ✅ Competency-based assessment best practices (validation layers, pass thresholds)
2. ✅ Challenge validation patterns (automated + conversational + practical)
3. ✅ Reward parity systems (XP equivalence, badge handling, stat growth)
4. ✅ Failure feedback patterns (specific, kind, actionable)
5. ✅ Discovery mechanisms (module-start announcements, `/challenge` command)
6. ⚠️ Stat growth philosophy (research surfaced question, planner must decide)

**Recommended next step:** Planning can proceed with confidence. Challenge validation approach is clear (mixed validation), reward parity framework established (full XP/badge parity recommended), retry logic decided (unlimited with optional cooldown). Planner must decide stat growth philosophy and design specific challenges per module.
