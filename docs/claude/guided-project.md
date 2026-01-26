# Guided Project Mode

**Reference for CLAUDE.md Section 16**

This document contains the complete guided project mode system that allows students to learn by building THEIR app instead of following generic curriculum.

---

Students can learn by building THEIR app instead of following generic curriculum.

### Schema: project.json

Created in student's project folder when they accept the version contract.

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
      "Meal planning"
    ],
    "signed": "2026-01-25",
    "last_audit": "2026-01-25",
    "scope_changes": []
  },
  "milestones": {
    "week_1_mockup": {
      "due": null,
      "completed": null,
      "url": null
    }
  },
  "contextualization_vars": {
    "YOUR_APP_NAME": "Recipe Keeper",
    "YOUR_APP_FOLDER": "recipe-keeper",
    "YOUR_DATA_TYPE": "recipe",
    "YOUR_DATA_PLURAL": "recipes"
  }
}
```

Note: project.json is SEPARATE from progress.json. progress.json tracks game state; project.json tracks project-specific state.

### Discovery Wizard Flow

Triggered by `/project start`. Four phases guide from vague idea to scoped V1.

**Phase 1: Open-Ended Capture**

Start open and welcoming - let ideas emerge naturally.

```
Claude: "Welcome to Guided Project Mode!

Instead of following a fixed curriculum, you'll learn Claude Code
by building YOUR app. Every skill connects to YOUR project.

Tell me about your idea. What do you want to build?
(No wrong answer - describe it in your own words)"
```

If student is vague, ask clarifying questions:
- "What problem does this solve for you?"
- "When would you use it?"
- "What made you think of this idea?"

Do NOT categorize yet. Let them talk. Extract understanding.

**Phase 2: Dream Expansion**

Validate the complete vision BEFORE narrowing.

```
Claude: "I love this! [Summarize their idea in your words]

Before we narrow down, let's dream big:
If this could do EVERYTHING you'd ever want, what features
would the complete version have? List them all - no limits."
```

After they list features, reflect them back:
```
Claude: "That's a fantastic full vision! I can see:
- [Feature 1]
- [Feature 2]
- [Feature 3]
...

This would be powerful. Now let's be strategic about getting there..."
```

KEY: Acknowledge the dream before scoping. Don't deflate immediately.

**Phase 3: Value Ranking**

Ruthless prioritization to exactly 3 features. HARD LIMIT, no exceptions.

```
Claude: "Here's the secret to actually finishing:
We start with V1 - a tiny version that's still useful.

Looking at your list, which THREE features would make this
useful even without the others?

Think: 'Would this solve my problem with ONLY these 3?'"
```

If student lists more than 3:
```
Claude: "You listed [N] features. I need exactly 3.

Which ONE of these can wait for V2? Remember - V2 features
aren't lost, just parked for later."
```

Repeat until exactly 3 features confirmed.

Test the V1:
```
Claude: "Your V1 would have:
1. [Feature 1]
2. [Feature 2]
3. [Feature 3]

With ONLY these 3 features (nothing else): Would this be useful to you?
Would you actually use it?"
```

If yes, proceed. If no, revisit which 3 features.

**Phase 4: Contract Review**

Generate and present the Version Contract.

```
Claude: "I'm creating your Version Contract now...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[project_emoji] VERSION CONTRACT: [Project Name] V1
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

V1 FEATURES (locked):
1. [Feature 1]
2. [Feature 2]
3. [Feature 3]

V2 PARKING LOT (not now):
- [Remaining features from dream list]

WEEK 1 GOAL:
Static HTML mockup showing all 3 features
(Looks like the app, doesn't work yet)
Deployed to: [username].github.io/[project-folder]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Do you accept this Version Contract? (yes/no)"
```

On "yes":
1. Create project.json with version contract
2. Update progress.json: guided_project.active = true
3. Set guided_project.project_name, project_type, started, version_contract_signed
4. Play Hero.aiff (run_in_background: true)
5. Display confirmation and proceed to Week 1 mockup phase

On "no":
1. Ask what they want to change
2. Return to Phase 3 (Value Ranking) to adjust

### Project Type Classification

Classify projects during Phase 3 based on features:

| Type | Indicators | Examples |
|------|------------|----------|
| static_site | No data storage, information display | Portfolio, landing page, docs |
| crud_app | Save/store/keep data locally | Recipe keeper, todo, inventory |
| api_consumer | Fetch external data | Weather app, news reader |
| game | Interactive entertainment, score/play | Quiz, text adventure, arcade |
| utility_tool | Calculate/convert/generate | Calculator, converter, generator |

Classification logic (check features):
- Contains "save", "store", "keep" without "api" -> crud_app
- Contains "weather", "fetch", "api" -> api_consumer
- Contains "game", "play", "score" -> game
- Contains "calculate", "convert", "generate" -> utility_tool
- Default (portfolio, info site) -> static_site

### /project Commands

**On "/project start":**
1. Check if guided_project.active is already true in progress.json
   - If yes: "You already have an active project: [project_name]. Type /project status to see progress, or /project restart to begin a new project (warning: this resets project progress)."
2. If no active project: Begin Discovery Wizard Phase 1

**On "/project status":**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[emoji] PROJECT STATUS: [Project Name]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Type: [project_type]
Started: [started_date]

V1 SCOPE (locked):
1. [x/o] [Feature 1] - [status]
2. [x/o] [Feature 2] - [status]
3. [x/o] [Feature 3] - [status]

MILESTONES:
- Week 1 Mockup: [status] [url if complete]

PARKING LOT (V2):
- [parked features]

Last Scope Audit: [date]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**On "/project audit":**
See Section: Weekly Scope Audit

**On "/project defense":**
See Section: Portfolio Defense

### Curriculum Router

When in guided project mode (guided_project.active = true), check lesson relevance before presenting.

**Routing Logic:**

1. Read lesson metadata from curriculum.md (project_types, skip_if, contextualize_as)
2. Get student's project_type from progress.json.guided_project.project_type

**Decision Flow:**

```
If lesson.project_types includes "all":
  -> Show lesson (universal content)

Else if lesson.skip_if includes student.project_type:
  -> Auto-skip with efficiency bonus (see below)

Else if lesson.project_types includes student.project_type:
  -> Show lesson with contextualization (if available)

Else:
  -> Show lesson as-is (default: include)
```

**Auto-Skip Display (10 XP efficiency bonus):**

When skipping an irrelevant lesson:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚡ LESSON SKIPPED: [Lesson Title]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This lesson covers [topic] which isn't needed
for your [project_type] project ([project_name]).

You earned the progression anyway:
+10 XP (efficiency bonus for focused learning)

Moving to the next relevant lesson...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Update progress.json:
- total_xp += 10
- Append lesson to completed.lessons (mark as skipped)
- DO NOT award stat points (skipped lessons don't build skills)

Play Pop.aiff (run_in_background: true) for the skip.

**Contextualization Display:**

When showing a contextualized lesson:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 FOR YOUR PROJECT: [Project Name]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[contextualize_as text with variables substituted]

Let's learn this by building part of YOUR_APP_NAME...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Then proceed with lesson tasks, using project context throughout.

### Variable Substitution in Lessons

When teaching in guided project mode, substitute these variables with student's project data:

| Variable | Source | Example |
|----------|--------|---------|
| YOUR_APP_NAME | project.json.project_name | "Recipe Keeper" |
| YOUR_APP_FOLDER | derived (lowercase, hyphens) | "recipe-keeper" |
| YOUR_DATA_TYPE | derived from project type | "recipe" |
| YOUR_DATA_PLURAL | derived from project type | "recipes" |

**Data Type Derivation:**

| Project Type | YOUR_DATA_TYPE | YOUR_DATA_PLURAL |
|--------------|----------------|------------------|
| crud_app | "item" or first V1 feature noun | "items" or plural |
| api_consumer | "result" | "results" |
| game | "score" | "scores" |
| utility_tool | "output" | "outputs" |
| static_site | "page" | "pages" |

For crud_app, attempt to extract noun from first V1 feature:
- "Save recipes" -> recipe/recipes
- "Track expenses" -> expense/expenses
- "Manage tasks" -> task/tasks

**Substitution Examples:**

Generic lesson text:
> "Create a file called example.json with your data"

Contextualized for Recipe Keeper:
> "Create a file called recipe.json with your recipe data"

Generic:
> "Open progress.json and add a new field"

Contextualized:
> "Open recipe-keeper/data.json and add a new recipe"

**Teaching Pattern:**

When presenting lesson content in guided project mode:
1. Read lesson text
2. Replace all YOUR_* variables with project values
3. Present contextualized version
4. Create ACTUAL project files (recipe.json, not example.json)

The student builds their REAL project during lessons, not throwaway examples.

### Week 1: Static Mockup

After version contract is signed, guide student through static HTML mockup of their V1.

**Purpose:**
- Instant gratification: Live URL in Week 1, not Week 8
- Design validation: See if UI makes sense before coding
- Low-risk iteration: HTML is cheap to redo
- Shareable progress: "Look what I'm building!"

**Day-by-Day Flow:**

**Days 1-2: Design main screen**
```
Claude: "Let's make your [Project Name] real!

Week 1 goal: A static HTML version of your app.
It will LOOK like the app but won't DO anything yet.
By Sunday, you'll have a live URL to share.

Let's start with the main screen. Tell me:
- What's the first thing users see?
- What actions can they take?
- What does the layout look like?"
```

Guide student through creating index.html:
- Create project folder: `mkdir [YOUR_APP_FOLDER] && cd [YOUR_APP_FOLDER]`
- Ask Claude to create index.html based on their description
- Add CSS for professional appearance (modern, clean, mobile-friendly)
- Use realistic placeholder content (not "Lorem ipsum")

**Days 3-4: Add additional screens**

Based on V1 features, identify needed screens:
- If "save [data]": Need a form/input screen
- If "search [data]": Need results display
- If "organize by category": Need category view

```
Claude: "Your V1 has 3 features. Let's make screens for each:

Feature 1: [Feature] -> [Screen needed]
Feature 2: [Feature] -> [Screen needed]
Feature 3: [Feature] -> [Screen needed]

Let's create [first additional screen] next..."
```

Create each HTML file with navigation between screens.
Use consistent styling across all pages.

**Day 5: Polish and prepare for deployment**
```
Claude: "Your mockup has all the screens! Let's polish:

1. Make it responsive (works on phones)
2. Add a favicon (small icon in browser tab)
3. Check all navigation links work
4. Review: Does this LOOK like your vision?

Then we'll deploy it live!"
```

**Mockup Quality Checklist:**
- [ ] All V1 features have visual representation
- [ ] Navigation works between all pages
- [ ] Responsive (test at mobile width)
- [ ] Realistic placeholder content
- [ ] Consistent visual style
- [ ] No broken links or images

**Example File Structure:**
```
recipe-keeper/
├── index.html          # Main recipe list view
├── add-recipe.html     # Form to add new recipe
├── recipe-detail.html  # Single recipe view
├── styles.css          # Shared styling
└── assets/
    └── favicon.ico
```

### Deploying to GitHub Pages

Free static site hosting - perfect for Week 1 mockup.

**Prerequisites:**
- GitHub account (if student doesn't have one, guide through creation)
- Git basics from Module 8 (or quick crash course)

**Deployment Flow:**

**Step 1: Initialize Git repository**
```
Claude: "Let's put your mockup online! First, we need Git.

I'll set up version control for your project..."
```

Commands Claude runs:
```bash
cd [PROJECT_FOLDER]
git init
git add .
git commit -m "Initial mockup for [PROJECT_NAME] V1"
```

**Step 2: Create GitHub repository**
```
Claude: "Now we need a GitHub repository to host it.

Do you have a GitHub account? (yes/no)"
```

If no: Guide through github.com account creation (2 minutes)
If yes: Continue

```
Claude: "I'll create the repository using GitHub CLI..."
```

Commands:
```bash
# Check if gh is installed and authenticated
gh auth status

# If not authenticated, guide through: gh auth login
# Create repo and push
gh repo create [YOUR_APP_FOLDER] --public --source=. --push
```

**Step 3: Enable GitHub Pages**
```
Claude: "Repository created! Now enabling GitHub Pages..."
```

Command:
```bash
gh repo edit --enable-pages --branch main
```

Note: This may take 1-2 minutes for GitHub to build the site.

**Step 4: Get live URL**
```
Claude: "Your site is deploying! Checking status..."
```

Wait and verify:
```bash
# Check pages status
gh api repos/[USERNAME]/[YOUR_APP_FOLDER]/pages --jq '.html_url'
```

**Celebration on successful deployment:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 YOUR APP IS LIVE!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Project Name] is now on the internet!

🌐 https://[username].github.io/[your-app-folder]/

Share this URL with anyone - they can see YOUR app!

This is a static mockup (doesn't "work" yet).
But it shows your vision. In the coming weeks,
we'll make it functional.

+100 XP | +10 Aura | Week 1 Milestone Complete!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Update project.json:
```json
"milestones": {
  "week_1_mockup": {
    "due": "[original due date]",
    "completed": "[today's date]",
    "url": "https://[username].github.io/[your-app-folder]/"
  }
}
```

Play module_complete music sequence (run_in_background: true).

### Deployment Verification

Claude verifies deployment automatically:

**Verification Commands:**
```bash
# Check HTTP status (should be 200)
curl -s -o /dev/null -w "%{http_code}" https://[username].github.io/[your-app-folder]/

# Check index.html has content
curl -s https://[username].github.io/[your-app-folder]/index.html | grep -q "<title>"

# Check CSS loads
curl -s https://[username].github.io/[your-app-folder]/styles.css | head -5
```

**If verification fails:**

Wait 2 minutes and retry (GitHub Pages can take time to build).

If still failing after 5 minutes:
```
Claude: "The deployment is taking longer than expected. Let's check:

1. Go to github.com/[username]/[your-app-folder]
2. Click 'Settings' -> 'Pages'
3. Is there an error message?

Common issues:
- Repository might be private (needs to be public for free Pages)
- Branch might need to be 'main' not 'master'
- index.html might be in wrong folder

Tell me what you see and we'll fix it."
```

**Common Troubleshooting:**

| Issue | Solution |
|-------|----------|
| 404 Not Found | Wait 2-5 min for build, or check index.html exists in root |
| Private repo warning | Change to public: `gh repo edit --visibility public` |
| Wrong branch | `gh repo edit --enable-pages --branch main` |
| Blank page | Check index.html has valid HTML structure |
| CSS not loading | Check styles.css path in HTML (relative path ./styles.css) |

**Manual Fallback:**

If gh CLI fails, provide manual steps:
1. Go to github.com -> New Repository
2. Name it [your-app-folder], make it Public
3. Upload files or use "Upload files" button
4. Go to Settings -> Pages -> Source: main branch
5. Wait 2 minutes, refresh to get URL

### Weekly Scope Audit

5-minute check to prevent feature creep. Runs automatically at session start if 7+ days since last audit, or manually via `/project audit`.

**Trigger Logic:**

```
On session start (if guided_project.active):
  days_since_audit = today - guided_project.last_scope_audit
  if days_since_audit >= 7:
    -> Run scope audit before continuing lesson
```

**Audit Flow:**

```
Claude: "Time for your weekly scope audit!

Let's check: Are you building ONLY what's in V1?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 SCOPE AUDIT: [Project Name]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

V1 Commitment (signed [contract_date]):
1. [Feature 1]
2. [Feature 2]
3. [Feature 3]

Parked for V2:
[List V2 parking lot items]

Quick check:
1. Have you added anything not on this list?
2. Any 'just one small thing' temptations?
3. Is anything from V2 creeping in?

Be honest - scope creep happens to everyone!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
```

**Clean Audit (no creep):**

If student says "no" or confirms they're on track:

```
Claude: "Excellent! Staying focused is how things ship.

Audit complete. Back to building!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Scope Audit: PASSED
Last audit: [today]
V1 on track: 3 features, no creep
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
```

Update project.json:
```json
"version_contract": {
  "last_audit": "[today's date]"
}
```

Update progress.json:
```json
"guided_project": {
  "last_scope_audit": "[today's date]"
}
```

Continue to lesson.

**Duration:** Entire audit should take under 5 minutes. If student has no creep to report, it's 30 seconds.

### Handling Scope Creep

When student admits adding something not in V1:

**Creep Confession Flow:**

```
Student: "Well... I was thinking about adding photo uploads..."

Claude: "I appreciate the honesty! Photo uploads would be great.

Here's the thing: Photo uploads is in V2.

If we add it now:
- V1 takes longer to finish
- You have MORE features that could break
- You delay the 'I shipped it!' feeling

You have two options:

1. PARK IT: Add to V2 parking lot, continue with original V1
2. SWAP IT: Replace one V1 feature with this one

V1 stays at exactly 3 features. That's the deal.

Which option do you want?"
```

**Option 1: Park It (Recommended)**

```
Student: "Let's park it for V2"

Claude: "Good choice! Parking photo uploads for V2.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📦 PARKED: Photo uploads
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Added to V2 parking lot. Your idea isn't lost -
it's just waiting for after V1 ships.

V1 scope unchanged. Back to building!"
```

Update project.json:
```json
"version_contract": {
  "v2_parking_lot": [...existing, "Photo uploads"],
  "last_audit": "[today]"
}
```

**Option 2: Swap It (Rare)**

```
Student: "I want to swap it for categories"

Claude: "You want to swap Categories for Photo uploads?

Before we do this:
- Why is Photo uploads more essential than Categories?
- Would V1 still be useful without Categories?
- Are you SURE this isn't just 'new and shiny' syndrome?

If yes to all: I'll update the contract.
If any hesitation: Let's park it instead."
```

If student confirms swap:

```
Claude: "Okay, updating your V1 contract:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 SCOPE CHANGE RECORDED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

REMOVED from V1: Organize by category
ADDED to V1: Photo uploads
MOVED to V2: Organize by category

New V1:
1. Save recipes
2. Search recipes
3. Photo uploads

This is recorded in your version contract.
Scope changes are rare - try not to make more.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
```

Update project.json:
```json
"version_contract": {
  "v1_features": [updated list with swap],
  "v2_parking_lot": [moved feature + existing],
  "scope_changes": [
    {
      "date": "[today]",
      "type": "swap",
      "removed": "Organize by category",
      "added": "Photo uploads",
      "reason": "[student's reason]"
    }
  ],
  "last_audit": "[today]"
}
```

**Gentle Pushback Pattern:**

If student wants to add without removing:

```
Student: "Can I just add photo uploads as a 4th feature? It's small!"

Claude: "I hear you - it feels small. But here's why I can't let you:

Every 'small' addition:
1. Adds code to maintain
2. Adds things that can break
3. Delays the finish line
4. Opens the door to 'just one more'

The 3-feature limit isn't arbitrary. It's how projects ship.

Your options remain:
1. Park it for V2 (recommended)
2. Swap it for a current V1 feature

Which will it be?"
```

NEVER allow 4+ features. This is a hard limit.

### Portfolio Defense

Triggered by `/project defense` after V1 is complete.

**Prerequisites Check:**

Before starting defense:
1. Check all V1 features marked complete in project.json
2. Check week_1_mockup milestone has completed date and URL
3. If prerequisites not met:

```
Claude: "Before starting your portfolio defense, let's confirm V1 is complete:

V1 Features:
1. [x/o] [Feature 1]
2. [x/o] [Feature 2]
3. [x/o] [Feature 3]

Mockup deployed: [yes/no]

[If incomplete]: Let's finish [missing items] first, then we'll celebrate!
[If complete]: You're ready for your portfolio defense!"
```

**Defense Introduction:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎓 PORTFOLIO DEFENSE: [Project Name]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Congratulations on completing V1! 🎉

This isn't a test - it's a CELEBRATION of what you built
and what you learned along the way.

Two parts:
1. Demo Video (2-3 minutes) - Walk through your app
2. Written Reflection - Tell your story

Ready to start? Type "ready" when you are.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Part 1: Demo Video**

```
Claude: "PART 1: Demo Video

Record a 2-3 minute casual walkthrough of your app.

Show:
✓ The live URL (your app on the internet!)
✓ Each V1 feature in action
✓ One technical choice you made (why you did something a certain way)

Recording tips:
- Use your phone, Loom, or any screen recorder
- NO editing needed - authentic > polished
- Talk like you're showing a friend
- If you mess up, keep going (it's charming!)

When you have the video, upload to YouTube (unlisted) or Loom,
then paste the link here."
```

Wait for video link. Validate it's a valid URL.

```
Claude: "Got it! Video saved: [URL]

Now for Part 2: Your reflection."
```

**Part 2: Written Reflection**

Present reflection prompts one at a time:

```
Claude: "PART 2: Written Reflection

Answer these prompts in 2-3 sentences each. Don't overthink it!

PROMPT 1: THE PROBLEM
'My app solves _________ for _________.'

What problem does your app address? Who benefits?"
```

[Wait for response, save as responses.problem]

```
Claude: "Great!

PROMPT 2: THE APPROACH
'I built it by _________. The hardest part was _________.'

What was your main technical approach? What challenged you?"
```

[Wait for response, save as responses.approach]

```
Claude: "

PROMPT 3: WHAT I LEARNED
'Before this, I didn't know _________. Now I understand _________.'

What's the biggest thing you learned? What clicked?"
```

[Wait for response, save as responses.learned]

```
Claude: "Last one!

PROMPT 4: WHAT'S NEXT
'For V2, I'm excited to add _________ because _________.'

What V2 feature are you most looking forward to?"
```

[Wait for response, save as responses.whats_next]

### Project Showcase

After all responses collected, generate and display the showcase:

```
Claude: "Your portfolio defense is complete! Here's your showcase:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌟 PROJECT SHOWCASE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[PROJECT_NAME] by [Student Name]
'[One-line description from problem response]'

📺 Watch Demo: [video_url]
🌐 Try It Live: [deployed_url]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

THE PROBLEM
[responses.problem]

THE APPROACH
[responses.approach]

WHAT I LEARNED
[responses.learned]

WHAT'S NEXT
[responses.whats_next]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

JOURNEY STATS:
• Project started: [project.started]
• V1 completed: [today]
• Lessons completed: [count from progress.json]
• Project type: [project_type]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This showcase is ready to share!
Your journey from idea to deployed app is complete.

🏆 Badge Earned: Project Pioneer 🏆
+500 XP | +50 Aura

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
```

**Completion Updates:**

Update progress.json:
```json
{
  "student.total_xp": current + 500,
  "aura_system.total_earned": current + 50,
  "aura_system.current_balance": current + 50,
  "badges": [...existing, "Project Pioneer 🏆"],
  "guided_project.active": false  // V1 complete, can start new project
}
```

Add to project.json:
```json
{
  "milestones": {
    "portfolio_defense": {
      "completed": "[today]",
      "video_url": "[url]",
      "reflection": {
        "problem": "[response]",
        "approach": "[response]",
        "learned": "[response]",
        "whats_next": "[response]"
      }
    }
  }
}
```

Play epic celebration sequence (run_in_background: true):
```bash
(afplay /System/Library/Sounds/Hero.aiff 2>/dev/null || true) &
(sleep 1.5 && afplay /System/Library/Sounds/Glass.aiff 2>/dev/null || true) &
(sleep 3 && afplay /System/Library/Sounds/Funk.aiff 2>/dev/null || true) &
```

### Showcase Philosophy

**What the showcase is NOT:**
- ❌ Comparison to other students
- ❌ Ranking or scoring
- ❌ Quality judgment
- ❌ Professional portfolio piece

**What the showcase IS:**
- ✓ Celebration of individual journey
- ✓ Record of learning growth
- ✓ Shareable achievement
- ✓ Personal milestone marker

**Why no ranking:**
Beginners comparing projects leads to:
- Imposter syndrome
- Discouragement
- Perfectionism paralysis
- Focus on "winning" vs learning

Every completed project is a victory. Period.

### After Defense

```
Claude: "What's next for you?

Options:
1. Start V2 of [Project Name] - add features from your parking lot
2. Start a NEW guided project - different idea, same journey
3. Continue with regular curriculum - master more skills first
4. Take a break - you earned it! 🎉

What sounds good?"
```

If V2:
- Keep same project.json, unlock parking lot features for V1 (now V2 scope)
- Reset version_contract.signed date
- Continue building

If new project:
- Archive current project.json (rename to project-v1-complete.json)
- Run discovery wizard fresh
- Previous XP/stats/badges retained

If regular curriculum:
- Set guided_project.active = false
- Resume from current_position in progress.json
- Project files remain for future

### /project defense Handler

**On "/project defense":**

1. **Check prerequisites:**
   - Is guided_project.active true?
   - Are all V1 features complete?
   - Is week_1_mockup.completed set?

2. **If prerequisites not met:**
   - Show what's incomplete
   - Offer to help finish remaining work
   - Don't start defense flow

3. **If prerequisites met:**
   - Begin Portfolio Defense flow (Part 1: Video, Part 2: Reflection)
   - Collect all responses
   - Generate showcase
   - Award badge and rewards
   - Update all tracking files

**Prerequisites Error Display:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️ NOT READY FOR DEFENSE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Let's check your V1 status:

[x] Feature 1: Save recipes - COMPLETE
[ ] Feature 2: Search recipes - IN PROGRESS
[ ] Feature 3: Categories - NOT STARTED

[x] Mockup deployed: https://...

Missing: Features 2 and 3 need completion.

Would you like to continue working on [next incomplete feature]?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Feature Completion Tracking:**

V1 features are marked complete when:
- Code/functionality exists for the feature
- Feature is testable/demonstrable
- Student confirms it's done: "I finished [feature]"

Update project.json feature status:
```json
"v1_features_status": {
  "feature_1": { "status": "complete", "completed": "2026-01-28" },
  "feature_2": { "status": "in_progress", "started": "2026-01-29" },
  "feature_3": { "status": "not_started" }
}
```

This is tracked conversationally - Claude asks "Did you finish [feature]?" during lessons and updates accordingly.

