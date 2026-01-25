# Phase 5: Guided Project Track - Research

**Researched:** 2026-01-25
**Domain:** Project-based learning, discovery wizards, curriculum adaptation, scope management, portfolio assessment
**Confidence:** HIGH

## Summary

This research investigated how to implement a guided project track that allows students to learn Claude Code by building THEIR app instead of following generic curriculum. The domain spans five key areas: **discovery wizard design** (conversational scoping from vague idea to V1 spec), **curriculum adaptation patterns** (routing lessons based on project type), **Week 1 static mockup strategy** (immediate visible progress), **scope management** (version contracts and weekly audits), and **portfolio defense formats** (showcase without toxic comparison).

The standard approach in 2026 project-based learning emphasizes: conversational discovery flows that validate before narrowing, ruthless MVP scoping with hard feature limits, contextualized learning where generic concepts connect to student's specific project, frequent deployment milestones (ship early, ship often), and reflective assessment that celebrates learning journey not just final product.

For beginner-focused platforms, successful patterns include: open-ended discovery that lets ideas emerge naturally before structuring, hard feature limits (3 max) to ensure completion, Week 1 static HTML deployment for instant gratification, project-type classification for lesson routing, parking lots for V2 ideas, weekly scope audits that prevent creep, and portfolio defenses using case study format (problem, approach, result, reflection).

The key insight from CONTEXT.md decisions: the wizard should feel like a helpful coach (not a gatekeeper), be strict on scope (3 features, no exceptions), but encouraging in tone. Pattern: Validate dream -> Acknowledge vision -> THEN guide to V1 scope (not deflate immediately).

**Primary recommendation:** Use conversational discovery wizard (open-ended start, structured finish), classify projects into 5 types for curriculum routing, deploy static mockup in Week 1 via GitHub Pages, implement version contract with V2 parking lot, run weekly 5-minute scope audits, and use case study format for portfolio defense with demo video + written reflection.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| CLAUDE.md conversation | Native | Discovery wizard interview | Can have natural conversation, understand intent, guide scoping |
| project.json | New schema | Project state tracking | Separate from progress.json, tracks project-specific data |
| progress.json | Existing | Learning progress + project mode flag | Add `guided_project` object to existing schema |
| GitHub Pages | Free tier | Static site deployment | Free, automatic from repo, beginner-friendly |
| curriculum.md | Existing | Lesson definitions | Add `project_types[]` and `skip_if[]` fields per lesson |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Netlify CLI | Optional | Alternative deployment | If student prefers Netlify over GitHub Pages |
| Bash verification | Native | Deployment confirmation | Verify files exist, URL accessible |
| Read/Grep tools | Native | Project file analysis | Check mockup contents, verify scope |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Conversational discovery | Form-based wizard | Forms feel clinical, miss nuance, can't adapt to unexpected ideas |
| project.json separate file | Embed in progress.json | Separation cleaner, project state can be reset without losing game progress |
| GitHub Pages | Vercel/Netlify | GitHub already in curriculum (Module 8), less new tooling |
| 3-feature hard limit | Flexible "small scope" guideline | Flexibility leads to creep, hard limit forces prioritization |

**Installation:**
```bash
# No new dependencies needed
# Uses existing Claude Code CLI tools:
# - Conversation for discovery wizard
# - Read/Write for project.json management
# - Bash for deployment verification
# - CLAUDE.md for wizard flow and curriculum routing logic
```

## Architecture Patterns

### Recommended Project Structure
```
progress.json additions:
└── guided_project: {
      active: true,
      project_name: "Recipe Keeper",
      project_type: "crud_app",
      started: "2026-01-25",
      version_contract: {...},
      completed_weeks: [],
      last_scope_audit: "2026-01-25"
    }

student-project/
├── project.json           # Project-specific state (V1 scope, parking lot, milestones)
├── README.md              # Auto-generated project description
├── mockup/                # Week 1 static HTML
│   ├── index.html
│   ├── styles.css
│   └── assets/
└── src/                   # Later weeks: real implementation

CLAUDE.md additions:
├── Section: Guided Project Mode
│   ├── /project start (trigger discovery wizard)
│   ├── /project status (show current scope and progress)
│   ├── /project audit (weekly scope check)
│   └── /project defense (trigger portfolio presentation)
├── Section: Discovery Wizard Flow
│   ├── Phase 1: Open-ended idea capture
│   ├── Phase 2: Dream expansion (full vision)
│   ├── Phase 3: Value ranking (prioritize to 3 features)
│   └── Phase 4: Version contract generation
├── Section: Curriculum Routing
│   ├── Project type classification
│   ├── Lesson relevance mapping
│   └── Auto-skip logic
└── Section: Portfolio Defense
    ├── Demo video preparation
    ├── Reflection prompts
    └── Showcase format
```

### Pattern 1: Discovery Wizard Flow (Conversational)

**What:** Multi-phase conversational wizard that guides from vague idea to scoped V1 spec.

**When to use:** Student types `/project start` to enter guided project mode.

**Phase 1: Open-Ended Capture (Let Ideas Emerge)**
```markdown
Claude: "Welcome to Guided Project Mode!

Instead of following a fixed curriculum, you'll learn Claude Code
by building YOUR app. Every skill you learn will connect to YOUR project.

Tell me about your idea. What do you want to build?
(There's no wrong answer - just describe it in your own words)"

Student: "I want to make something for my recipes"

Claude: "A recipe app! Great starting point.

Help me understand what you're imagining:
- What problem does this solve for you?
- When would you use it?
- What made you think of this idea?"

# KEY: Let them talk. Extract understanding, don't impose structure yet.
```

**Phase 2: Dream Expansion (Validate Full Vision)**
```markdown
Claude: "I love this idea. You want a place to keep your recipes
organized and easy to find when cooking.

Before we narrow down, let's dream big:
If this app could do EVERYTHING you'd ever want, what features
would the complete version have? List them all - no limits."

Student: "Search recipes, save favorites, share with friends,
         meal planning, shopping list, nutrition info, photos..."

Claude: "That's a fantastic full vision! I can see the complete app:
- Recipe storage with search
- Favorites and categories
- Social sharing
- Meal planning calendar
- Auto-generated shopping lists
- Nutrition tracking
- Photo galleries

This would be a powerful recipe platform. Now let's be strategic
about getting there..."

# KEY: VALIDATE the complete vision before narrowing. Don't deflate.
```

**Phase 3: Value Ranking (Ruthless Prioritization)**
```markdown
Claude: "Here's the secret to actually finishing:
We start with V1 - a tiny version that's still useful.

Looking at your list, which THREE features would make this
app useful even without the others?

Think: 'Would this solve my recipe problem with ONLY these 3?'"

Student: "Hmm... save recipes, search them, and... categories maybe?"

Claude: "Perfect choices! Let me check:

With ONLY these 3 features (no sharing, no meal planning, no photos):
- Save recipes: YES - core purpose
- Search recipes: YES - finding what you saved
- Categories: YES - organizing by type

Would this be useful to you? Would you actually use it?"

Student: "Yeah, I'd use that. The other stuff would be nice later."

Claude: "Exactly. The other features become V2. They're not gone,
just parked for after V1 ships.

Your V1 scope is LOCKED:
1. Save recipes (title, ingredients, steps)
2. Search recipes by name/ingredient
3. Organize by categories

These 3 features. No more. Even if you have 'just one quick idea'
during development, it goes to V2. This discipline is how things ship."

# KEY: Hard limit enforced, but with explanation of WHY it matters.
```

**Phase 4: Version Contract Generation**
```markdown
Claude: "I'm creating your Version Contract now...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 VERSION CONTRACT: Recipe Keeper V1
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

V1 FEATURES (locked):
1. Save recipes (title, ingredients, steps)
2. Search recipes by name or ingredient
3. Organize recipes by category

V2 PARKING LOT (not now):
- Photo uploads
- Social sharing
- Meal planning
- Shopping list generation
- Nutrition tracking
- Favorites system

WEEK 1 GOAL:
Static HTML mockup showing all 3 features
(Looks like the app, doesn't work yet)
Deployed to: yourusername.github.io/recipe-keeper

Do you accept this Version Contract? (yes/no)"

# KEY: Written contract makes scope tangible and committal.
```

### Pattern 2: Project Type Classification

**What:** Classify student projects into types for curriculum routing.

**When to use:** During discovery wizard Phase 3, after features are identified.

**Five Project Types:**
```markdown
| Type | Description | Examples | Key Lessons Needed | Lessons to Skip |
|------|-------------|----------|-------------------|-----------------|
| static_site | Information display, no data storage | Portfolio, landing page, documentation | HTML/CSS, deployment, responsive | Database, CRUD, auth |
| crud_app | Create, read, update, delete data | Recipe keeper, todo list, inventory | HTML/CSS, JS basics, JSON, localStorage | Server setup, auth |
| api_consumer | Fetches and displays external data | Weather app, news reader, movie search | HTML/CSS, fetch/API, JSON parsing | Database, auth, CRUD |
| game | Interactive entertainment | Quiz, text adventure, simple arcade | HTML/CSS, JS logic, DOM manipulation | Database, server, API |
| utility_tool | Performs specific task | Calculator, converter, generator | HTML/CSS, JS functions, algorithms | Database, deployment (optional) |
```

**Classification Logic:**
```javascript
// Determine project type from features
function classifyProject(features) {
  const hasDataStorage = features.some(f =>
    f.includes('save') || f.includes('store') || f.includes('keep')
  );
  const hasExternalAPI = features.some(f =>
    f.includes('weather') || f.includes('fetch') || f.includes('api')
  );
  const hasInteractivity = features.some(f =>
    f.includes('game') || f.includes('play') || f.includes('score')
  );
  const hasCalculation = features.some(f =>
    f.includes('calculate') || f.includes('convert') || f.includes('generate')
  );

  if (hasDataStorage && !hasExternalAPI) return 'crud_app';
  if (hasExternalAPI) return 'api_consumer';
  if (hasInteractivity) return 'game';
  if (hasCalculation) return 'utility_tool';
  return 'static_site';  // Default for portfolios, info sites
}
```

**Curriculum Routing:**
```markdown
# curriculum.md enhancement

### Lesson 9.2: HTML Basics Through Claude
- stat_tag: Creativity
- project_types: ["all"]  # Universal lesson
- skip_if: []

### Lesson 11.3: GitHub MCP
- stat_tag: Efficiency
- project_types: ["crud_app", "api_consumer"]  # Needs GitHub integration
- skip_if: ["static_site", "utility_tool", "game"]

### Lesson 7.1: Understanding JSON
- stat_tag: Speed
- project_types: ["crud_app", "api_consumer"]  # Data-focused
- skip_if: ["static_site"]
- contextualize_as: {
    "crud_app": "Storing your recipes as JSON data",
    "api_consumer": "Parsing weather API responses"
  }
```

### Pattern 3: Week 1 Static Mockup Strategy

**What:** Students deploy a static HTML version of their app in Week 1, proving the concept works visually before adding functionality.

**When to use:** After Version Contract is signed, before any real coding lessons.

**Week 1 Flow:**
```markdown
Day 1-2: Design mockup with Claude
- "Create index.html that looks like my recipe app"
- "Show the search bar, recipe cards, and category sidebar"
- "Make it look modern with CSS - dark theme, nice fonts"

Day 3-4: Add all screens (static)
- "Create add-recipe.html with a form for new recipes"
- "Create recipe-detail.html showing a single recipe"
- "Make the navigation work between pages"

Day 5: Polish and deploy
- "Make it responsive for phones"
- "Deploy to GitHub Pages"
- "Give me the live URL to share"

OUTCOME: Student has LIVE URL they can share, showing what their app will do.
Even though it doesn't "work" yet, they can SEE their vision.
```

**Why Static First:**
- **Instant gratification:** Live URL in Week 1, not Week 8
- **Validates design:** See if UI makes sense before coding logic
- **Reduces risk:** If design is wrong, HTML is cheap to redo
- **Teaches fundamentals:** HTML/CSS mastery before JS complexity
- **Shareable progress:** "Look what I'm building!" to friends/family

**Deployment Verification:**
```bash
# Claude verifies deployment worked
curl -s -o /dev/null -w "%{http_code}" https://username.github.io/recipe-keeper/

# Check key files exist
curl -s https://username.github.io/recipe-keeper/index.html | grep -q "<title>"

# Display success
echo "Your mockup is LIVE at: https://username.github.io/recipe-keeper/"
```

### Pattern 4: Version Contract and Scope Audit

**What:** Written document locking V1 scope with weekly audits to prevent creep.

**project.json Schema:**
```json
{
  "project_name": "Recipe Keeper",
  "project_type": "crud_app",
  "started": "2026-01-25",
  "version_contract": {
    "v1_features": [
      "Save recipes (title, ingredients, steps)",
      "Search recipes by name or ingredient",
      "Organize recipes by category"
    ],
    "v2_parking_lot": [
      "Photo uploads",
      "Social sharing",
      "Meal planning",
      "Shopping list generation"
    ],
    "signed": "2026-01-25",
    "last_audit": "2026-01-25",
    "scope_changes": []
  },
  "milestones": {
    "week_1_mockup": {
      "due": "2026-02-01",
      "completed": null,
      "url": null
    },
    "week_2_data": {
      "due": "2026-02-08",
      "completed": null
    }
  }
}
```

**Weekly Scope Audit (5 minutes):**
```markdown
Claude: "Time for your weekly scope audit!

Let's check: Are you building ONLY what's in V1?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 SCOPE AUDIT: Recipe Keeper
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

V1 Features (your commitment):
1. [x] Save recipes - IN PROGRESS
2. [ ] Search recipes - NOT STARTED
3. [ ] Categories - NOT STARTED

Questions for you:
1. Have you added anything that's not on this list?
2. Have you thought about adding 'just one small thing'?
3. Is anything from V2 creeping in?

Be honest - scope creep happens to everyone!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

Student: "Well... I was thinking about adding photo uploads..."

Claude: "I hear you! Photos would be great. But here's the thing:

Photo uploads is in V2. If we add it now:
- V1 takes longer to finish
- You have MORE features that could break
- You delay the 'done' feeling

My strong recommendation: Ship V1 first. Then V2 can be your
victory lap where you add all the fun extras.

Let's keep photos in the parking lot for now. Deal?"

# KEY: Gentle but firm. Explain WHY scope discipline matters.
```

**Scope Change Request (Rare, Intentional):**
```markdown
Claude: "You want to change V1 scope. This is a big deal.

Before we proceed:
- What feature do you want to ADD?
- What feature are you willing to REMOVE to make room?
- Why is this essential for V1?

If you can't remove something, the answer is 'V2 parking lot.'

This isn't gatekeeping - it's helping you finish."
```

### Pattern 5: Curriculum Contextualization

**What:** Present generic lessons using student's specific project context.

**When to use:** Every lesson in guided project mode.

**Contextualization Pattern:**
```markdown
# Generic lesson (Module 7.1: Understanding JSON)

Normal version:
"JSON = a way to store organized data, like a form with labeled fields..."
"Ask Claude to add a field called 'favorite_color' with value 'blue' to progress.json"

Contextualized version (for Recipe Keeper):
"JSON is how your Recipe Keeper will store recipes. Let's look at how
a single recipe would be structured:

{
  "title": "Chocolate Chip Cookies",
  "ingredients": ["flour", "sugar", "butter", "chocolate chips"],
  "steps": ["Mix dry ingredients", "Add butter", "Fold in chips", "Bake"],
  "category": "desserts"
}

This is one recipe. Your app will store many of these in an array.

Let's create your first recipe file..."

# KEY: Same learning outcome, but directly relevant to THEIR project.
```

**Lesson Relevance Check:**
```javascript
// Before presenting a lesson, check if it's relevant
function shouldShowLesson(lessonId, projectType) {
  const lesson = curriculum.lessons[lessonId];

  // Universal lessons always shown
  if (lesson.project_types.includes('all')) return true;

  // Check if project type is in lesson's target types
  if (lesson.project_types.includes(projectType)) return true;

  // Check if project type is in skip list
  if (lesson.skip_if?.includes(projectType)) {
    return false;  // Auto-skip
  }

  return true;  // Default: show lesson
}

// When skipping, explain why
function explainSkip(lessonId, projectType) {
  const lesson = curriculum.lessons[lessonId];
  return `
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    ⏭️  LESSON SKIPPED: ${lesson.title}
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    This lesson covers ${lesson.topic} which isn't needed
    for your ${projectType} project.

    You still earned the progression:
    +10 XP (efficiency bonus for skipping irrelevant content)

    Moving to the next relevant lesson...
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `;
}
```

### Pattern 6: Portfolio Defense Format

**What:** Final presentation combining demo video with written reflection.

**When to use:** After V1 is complete and deployed.

**Portfolio Defense Structure:**
```markdown
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎓 PORTFOLIO DEFENSE: Recipe Keeper
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Your V1 is complete! Time to present your work.

This isn't a test - it's a celebration of what you built
and what you learned.

PART 1: Demo Video (2-3 minutes)
Record yourself walking through your app:
- Show the live URL
- Demonstrate each V1 feature
- Explain one technical choice you made

PART 2: Written Reflection
Answer these prompts (2-3 sentences each):

1. THE PROBLEM
   "My app solves [problem] for [who]..."

2. THE APPROACH
   "I built it by [key technical approach]..."
   "The hardest part was [challenge] because [why]..."

3. WHAT I LEARNED
   "Before this project, I didn't know [concept]..."
   "Now I understand [insight]..."

4. WHAT'S NEXT
   "For V2, I'm excited to add [feature] because [why]..."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

When you're ready, type /project defense to start the process.
I'll guide you through recording and uploading.
```

**Showcase Format (Prevents Toxic Comparison):**
```markdown
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌟 PROJECT SHOWCASE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RECIPE KEEPER by [Student Name]
"A place to save and find my favorite recipes"

📺 Watch Demo: [YouTube link]
🌐 Try It Live: [GitHub Pages link]
📝 Read Reflection: [link or inline]

JOURNEY HIGHLIGHTS:
• Started: 2026-01-25
• Completed V1: 2026-02-15
• Lessons Completed: 24
• Biggest Challenge: "Getting search to work with localStorage"
• Proudest Moment: "When my mom saved her first recipe on my app"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# NOTE: No comparison to other students. No ranking.
# Focus is on individual journey and learning growth.
```

### Anti-Patterns to Avoid

- **Categorical wizard start:** "Choose a project type: (1) Static site (2) CRUD app..." kills authentic idea exploration
- **Immediate scope reduction:** "That's too big" before validating the dream feels dismissive
- **Flexible feature limits:** "3-5 features" becomes 7, then 10, then never ships
- **Lessons without context:** Teaching JSON using progress.json when student is building a game
- **Single deployment moment:** Waiting until Week 8 to deploy anything
- **Scope audit as interrogation:** "Did you add something??" feels like catching cheaters
- **Ranked showcases:** "Top 10 projects this month" creates toxic comparison
- **Perfect video required:** 2-3 minute casual demo, not production quality

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Project type detection | Complex ML classifier | Simple keyword matching | 5 types is enough, keywords are reliable |
| Static site deployment | Custom server setup | GitHub Pages free tier | Zero config, automatic from repo |
| Scope tracking | Complex state machine | JSON file with version array | Simple, readable, version-controllable |
| Video hosting | Custom upload service | YouTube/Loom unlisted | Free, reliable, already familiar |
| Progress dashboard | Custom web app | progress.json + ASCII display | Keep in terminal where learning happens |

**Key insight:** The guided project system is primarily a CONVERSATION DESIGN problem, not a technical infrastructure problem. The wizard is Claude talking to the student. The curriculum router is CLAUDE.md logic. The scope audit is a 5-minute conversation. Don't over-engineer what conversation can solve.

## Common Pitfalls

### Pitfall 1: Wizard Kills Creative Ideas

**What goes wrong:** Student says "I want to build something cool" and wizard responds with "That's too vague. Please choose from: (1) Portfolio (2) Todo App..."

**Why it happens:** Trying to structure too early, fear of ambiguous input.

**How to avoid:**
- Start with open prompt: "Tell me about your idea"
- Ask follow-up questions to understand, not categorize
- Let the structure emerge from their words
- Only classify after Phase 2 (dream expansion)

**Warning signs:**
- Student feels constrained before they've explained their idea
- Wizard responses sound like forms
- Good ideas get shoehorned into preset categories

### Pitfall 2: Scope Creep Despite Contract

**What goes wrong:** Student adds "just one small feature" repeatedly until V1 is massive.

**Why it happens:** Each individual addition seems small, cumulative effect invisible.

**How to avoid:**
- Hard 3-feature limit (not negotiable)
- Weekly scope audits surface drift early
- Explain cumulative cost: "That's feature #4. Remove one to add this."
- Parking lot makes V2 visible (ideas aren't lost, just deferred)

**Warning signs:**
- V1 feature list grows past 3
- Student keeps saying "but it's just a small thing"
- Weeks pass without deployment

### Pitfall 3: Contextualization Is Superficial

**What goes wrong:** "Today we learn JSON. By the way, your Recipe app will use JSON too." Then proceed to teach with progress.json examples anyway.

**Why it happens:** Easier to write one version of lessons than truly contextualize.

**How to avoid:**
- Lesson examples use student's actual project
- Variable substitution: "YOUR-APP-NAME" becomes "recipe-keeper"
- Create actual project files during lessons (recipe.json, not example.json)
- Connect every concept to their specific use case

**Warning signs:**
- Student asks "when will I use this for my project?"
- Examples feel disconnected from their app
- "Tutorial world" and "project world" feel separate

### Pitfall 4: Week 1 Mockup Feels Fake

**What goes wrong:** Static HTML mockup feels like a chore, not a milestone.

**Why it happens:** Presented as "practice before real app" instead of "your app, just static."

**How to avoid:**
- Frame as "the visual version of YOUR app"
- Deploy to real URL they can share
- Make it look good (CSS matters for pride)
- Celebrate: "Your app is LIVE on the internet!"

**Warning signs:**
- Student rushes through mockup to get to "real coding"
- Mockup looks obviously fake/placeholder
- No pride in sharing the URL

### Pitfall 5: Portfolio Defense Creates Anxiety

**What goes wrong:** Student stresses about video quality, comparison to others, judgment.

**Why it happens:** "Defense" sounds like defending thesis, grading, evaluation.

**How to avoid:**
- Frame as "celebration" not "evaluation"
- Demo video is casual (phone recording OK)
- Reflection prompts focus on journey, not quality
- Showcase doesn't rank or compare students

**Warning signs:**
- Student delays finishing because "it's not good enough"
- Asks "will people judge my project?"
- Perfectionism stalls completion

### Pitfall 6: Curriculum Routing Skips Too Much

**What goes wrong:** Static site student skips so many lessons they miss fundamental skills.

**Why it happens:** Over-aggressive skip_if rules, missing foundational lessons.

**How to avoid:**
- Core lessons (HTML, CSS, Git, deployment) are "all" project types
- Only skip clearly irrelevant lessons (database for static site)
- Award XP for skips (efficiency bonus) so it feels like progress
- When in doubt, show lesson with contextualization

**Warning signs:**
- Student reaches later modules missing basics
- Huge chunks of curriculum skipped
- Student asks about concepts they should have learned

## Code Examples

Verified patterns from project-based learning and conversational design research:

### Discovery Wizard State Machine

```javascript
// Source: Conversational design best practices
// Pattern: Phase-based wizard with state tracking

const WIZARD_STATES = {
  OPEN_CAPTURE: 'open_capture',      // "Tell me about your idea"
  DREAM_EXPANSION: 'dream_expansion', // "What would the full version have?"
  VALUE_RANKING: 'value_ranking',     // "Which 3 are essential?"
  CONTRACT_REVIEW: 'contract_review', // "Do you accept this V1?"
  COMPLETE: 'complete'
};

function processWizardInput(currentState, input, context) {
  switch (currentState) {
    case WIZARD_STATES.OPEN_CAPTURE:
      // Extract project concept, ask clarifying questions
      context.raw_idea = input;
      context.clarifying_questions = generateClarifyingQuestions(input);
      return {
        nextState: context.clarifying_questions.length > 0
          ? WIZARD_STATES.OPEN_CAPTURE
          : WIZARD_STATES.DREAM_EXPANSION,
        response: context.clarifying_questions[0] ||
          `Great concept! Let's dream big - what would the FULL version have?`
      };

    case WIZARD_STATES.DREAM_EXPANSION:
      // Capture full feature list, validate vision
      context.full_feature_list = extractFeatures(input);
      return {
        nextState: WIZARD_STATES.VALUE_RANKING,
        response: `
          I can see the complete vision! You want:
          ${context.full_feature_list.map(f => `- ${f}`).join('\n')}

          That would be powerful. Now let's be strategic:
          Which THREE features would make this useful even
          without the others?
        `
      };

    case WIZARD_STATES.VALUE_RANKING:
      // Extract top 3, enforce hard limit
      context.v1_features = extractTopFeatures(input, 3);
      if (context.v1_features.length > 3) {
        return {
          nextState: WIZARD_STATES.VALUE_RANKING,
          response: `
            You listed ${context.v1_features.length} features.
            I need you to choose exactly 3 - the essential ones.

            Which ONE can wait for V2?
          `
        };
      }
      return {
        nextState: WIZARD_STATES.CONTRACT_REVIEW,
        response: generateVersionContract(context)
      };

    case WIZARD_STATES.CONTRACT_REVIEW:
      if (input.toLowerCase().includes('yes')) {
        return {
          nextState: WIZARD_STATES.COMPLETE,
          response: `
            Contract signed! Your V1 scope is LOCKED.

            Let's start Week 1: Building your static mockup.
          `
        };
      }
      return {
        nextState: WIZARD_STATES.VALUE_RANKING,
        response: `What would you like to change about the V1 scope?`
      };
  }
}
```

### Curriculum Router

```javascript
// Source: Contextualized teaching and learning research
// Pattern: Lesson filtering and contextualization

function routeLessonForProject(lessonId, projectConfig) {
  const lesson = curriculum.lessons[lessonId];
  const projectType = projectConfig.project_type;

  // Check if lesson should be skipped
  if (lesson.skip_if?.includes(projectType)) {
    return {
      action: 'skip',
      reason: `${lesson.title} is not needed for ${projectType} projects`,
      xp_award: 10,  // Efficiency bonus for skipping irrelevant content
      next_lesson: findNextRelevantLesson(lessonId, projectType)
    };
  }

  // Check if lesson needs contextualization
  if (lesson.contextualize_as?.[projectType]) {
    return {
      action: 'contextualize',
      original_title: lesson.title,
      contextualized_title: lesson.contextualize_as[projectType],
      variables: {
        'YOUR_APP_NAME': projectConfig.project_name,
        'YOUR_APP_FOLDER': projectConfig.project_name.toLowerCase().replace(/ /g, '-'),
        'YOUR_DATA_TYPE': getDataType(projectConfig),  // "recipe", "task", etc.
        'YOUR_DATA_PLURAL': getDataPlural(projectConfig)  // "recipes", "tasks"
      }
    };
  }

  // Show lesson as-is
  return {
    action: 'show',
    lesson: lesson
  };
}

// Variable substitution in lesson content
function contextualizeContent(content, variables) {
  let result = content;
  for (const [key, value] of Object.entries(variables)) {
    result = result.replace(new RegExp(key, 'g'), value);
  }
  return result;
}
```

### Weekly Scope Audit

```javascript
// Source: Project management scope creep prevention
// Pattern: Quick check with gentle enforcement

function runWeeklyScopeAudit(projectConfig) {
  const contract = projectConfig.version_contract;
  const today = new Date().toISOString().split('T')[0];

  // Update last audit date
  contract.last_audit = today;

  return `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 WEEKLY SCOPE AUDIT: ${projectConfig.project_name}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Your V1 commitment (signed ${contract.signed}):
${contract.v1_features.map((f, i) => `${i+1}. ${f}`).join('\n')}

${contract.v2_parking_lot.length > 0 ? `
Parked for V2:
${contract.v2_parking_lot.map(f => `• ${f}`).join('\n')}
` : ''}

Quick check:
1. Are you building ONLY what's in V1?
2. Any "just one small thing" temptations?
3. Anything from V2 creeping in?

If you added something not on the list, tell me now.
We can either park it for V2 or swap it for a V1 feature.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `;
}

function handleScopeCreepConfession(confession, projectConfig) {
  const creepingFeature = extractFeature(confession);

  return `
I appreciate the honesty! "${creepingFeature}" sounds cool.

Here are your options:
1. PARK IT: Add to V2, continue with original V1
2. SWAP IT: Replace one V1 feature with this one

Remember: V1 stays at exactly 3 features. That's the deal.

Which option do you want?
  `;
}
```

### Portfolio Defense Flow

```javascript
// Source: Portfolio presentation and case study formats
// Pattern: Structured reflection with celebration

function startPortfolioDefense(projectConfig) {
  return `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎓 PORTFOLIO DEFENSE: ${projectConfig.project_name}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Congratulations on completing V1! 🎉

This isn't a test - it's a celebration of what you built
and what you learned along the way.

STEP 1: Demo Video (2-3 minutes)
Record a casual walkthrough of your app:
• Show the live URL
• Demo each feature
• Explain one technical decision you made

You can use your phone, Loom, or any screen recorder.
No editing needed - this is about authenticity, not production value.

Ready to start? Type "ready for video" when you've recorded it.
  `;
}

function processReflectionResponses(responses) {
  return `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌟 YOUR PROJECT SHOWCASE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${responses.project_name} by ${responses.student_name}
"${responses.one_liner}"

📺 Demo: ${responses.video_url}
🌐 Live: ${responses.deploy_url}

THE PROBLEM:
${responses.problem}

THE APPROACH:
${responses.approach}

WHAT I LEARNED:
${responses.learned}

WHAT'S NEXT:
${responses.whats_next}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This showcase is ready to share!
Your journey from idea to deployed app is complete.

🏆 Badge Earned: Project Pioneer
+500 XP | +50 Aura
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `;
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Form-based project wizards | Conversational discovery | 2024-2026 | More authentic ideas, better scoping outcomes |
| Flexible MVP scope | Hard 3-feature limits | 2025-2026 (lean methodology) | Higher completion rates, faster shipping |
| Deploy at end of course | Deploy Week 1 (static mockup) | 2026 | Earlier validation, sustained motivation |
| Generic curriculum for all | Project-type curriculum routing | 2025-2026 (CTL adoption) | Higher engagement, relevant learning |
| Single final presentation | Continuous deployment + defense | 2026 | Lower stakes, more frequent wins |
| Ranked project showcases | Individual journey celebration | 2025-2026 (anti-toxic design) | Psychological safety, completion focus |

**Deprecated/outdated:**
- **"Choose your project type" dropdowns** (kills creative exploration)
- **"5-7 features for MVP"** (too many, scope creeps, never ships)
- **Teaching all lessons regardless** (wastes time on irrelevant skills)
- **Single "capstone project" at end** (too late, too high stakes)
- **Public project rankings** (creates toxic comparison, discourages beginners)

## Open Questions

Things that couldn't be fully resolved:

1. **Project Complexity Limits**
   - What we know: 3-feature hard limit for V1
   - What's unclear: Should we reject projects that are inherently complex (ML, multiplayer game)?
   - Recommendation: Accept any idea, but scope down aggressively. "AI recipe recommender" becomes "recipe saver with categories" for V1.

2. **Multi-Week Pacing**
   - What we know: Week 1 = mockup, subsequent weeks = functionality
   - What's unclear: Exact week-by-week breakdown varies by project type
   - Recommendation: Define weekly milestones per project type during planning. CRUD app has different weeks than game.

3. **XP for Skipped Lessons**
   - What we know: Award efficiency bonus XP when skipping irrelevant lessons
   - What's unclear: How much? 10 XP (same as task)? 50 XP (lesson completion)?
   - Recommendation: 10 XP per skipped lesson (task equivalent) + explanation of why it was skipped.

4. **Project Abandonment**
   - What we know: Some students may want to switch projects mid-stream
   - What's unclear: How to handle this without losing progress?
   - Recommendation: Allow project switch, but start new discovery wizard. Previous XP/stats retained, but project-specific progress resets.

5. **Team Projects**
   - What we know: Phase 5 is single-student focused
   - What's unclear: Would collaborative projects work in this system?
   - Recommendation: Out of scope for Phase 5. Consider for Phase 7+ after core system proven.

## Sources

### Primary (HIGH confidence)
- [Contextualized Teaching & Learning Faculty Primer](https://careerladdersproject.org/docs/CTL.pdf) - Curriculum contextualization patterns, evidence of effectiveness
- [MVP Specification Document Best Practices](https://www.f22labs.com/blogs/mvp-specification-document-2025-complete-software-requirement-specification/) - Version contracts, feature locking, stakeholder approval
- [Conversational Design Essentials (Smashing Magazine)](https://www.smashingmagazine.com/2016/12/conversational-design-essentials-tips-for-building-a-chatbot/) - Wizard flow design, branching logic, error handling
- [Scope Creep Prevention - PMI](https://www.pmi.org/learning/library/top-five-causes-scope-creep-6675) - Weekly audits, change control systems, traceability
- [GitHub Pages Deployment Guide](https://everhour.com/blog/how-to-host-website-on-github/) - Free hosting, beginner-friendly deployment
- [User Interview Question Flow](https://www.userinterviews.com/ux-research-field-guide-chapter/user-interviews) - Semi-structured interviews, follow-up questions
- progress.json (project file) - Existing game state schema
- curriculum.md (project file) - Existing lesson structure
- 05-CONTEXT.md (phase file) - User decisions on discovery wizard approach

### Secondary (MEDIUM confidence)
- [Junior Dev Portfolio Guide 2026](https://codeworks.me/blog/junior-dev-portfolio-projects-coding-5-skills/) - Case study format, what hiring managers look for
- [Agile Parking Lot Concept](https://www.wrike.com/agile-guide/faq/what-is-parking-lot-in-agile/) - V2 parking lot pattern
- [Project-Based Learning Examples](https://www.smartlablearning.com/project-based-learning-examples/) - PBL implementation patterns
- [Adaptive Learning Platforms 2026](https://whatfix.com/blog/adaptive-learning-platforms/) - Curriculum routing, personalized paths
- [CRUD App Ideas](https://codingzap.com/crud-app-ideas/) - Beginner project classifications

### Tertiary (LOW confidence - general context)
- Various chatbot design articles - Onboarding flow patterns
- Bootcamp curriculum guides - Project-based education models
- Retrospective presentation templates - Reflection format inspiration

## Metadata

**Confidence breakdown:**
- Discovery wizard design: HIGH - Directly applies user decisions from CONTEXT.md, standard conversational patterns
- Curriculum routing: HIGH - Project type classification is straightforward, contextualization is proven CTL pattern
- Week 1 mockup strategy: HIGH - GitHub Pages deployment is well-documented, static-first is standard practice
- Scope management: HIGH - Version contracts and weekly audits are established project management patterns
- Portfolio defense: MEDIUM - Format clear, but execution details (video hosting, sharing) need more specifics in planning

**Research date:** 2026-01-25
**Valid until:** ~90 days (project-based learning patterns stable, deployment platforms may add features)

**Key gaps filled by this research:**
1. Discovery wizard flow design (open-ended start, structured finish)
2. Project type classification (5 types with curriculum routing rules)
3. Week 1 static mockup strategy (GitHub Pages deployment)
4. Version contract format (V1 locked, V2 parking lot)
5. Weekly scope audit pattern (5-minute check, gentle enforcement)
6. Portfolio defense format (demo video + reflection, showcase without ranking)

**Recommended next step:** Planning can proceed with confidence. Discovery wizard flow is fully designed (4 phases with conversation examples), project type classification is defined (5 types), curriculum routing logic is specified, scope management patterns are clear (version contract + weekly audits), and portfolio defense format is documented (demo + reflection + showcase). Planner should create plans for: (1) wizard implementation, (2) curriculum routing, (3) Week 1 mockup flow, (4) scope management, (5) portfolio defense integration.
