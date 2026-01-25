---
phase: 05-guided-project-track
plan: 03
subsystem: guided-projects
tags: [mockup, deployment, github-pages, week-1, student-onboarding]

dependencies:
  requires: ["05-01-discovery-wizard", "05-02-curriculum-routing"]
  provides: ["week-1-mockup-flow", "github-pages-deployment", "deployment-verification"]
  affects: ["student-first-week-experience", "guided-project-milestones"]

tech-stack:
  added: []
  patterns: ["github-cli-automation", "static-site-deployment", "progressive-deployment"]

file-tracking:
  created: []
  modified:
    - path: "CLAUDE.md"
      lines: 243
      purpose: "Week 1 mockup and deployment flow documentation"

decisions:
  - id: "week-1-mockup-first"
    what: "Students ship static HTML mockup in Week 1, not Week 8"
    why: "Instant gratification, design validation, low-risk iteration, shareable progress before heavy coding"
    impact: "Students have live URL to share within 7 days of starting guided project"

  - id: "gh-cli-deployment-automation"
    what: "Use GitHub CLI (gh) for automated repository creation and Pages enablement"
    why: "Reduces manual steps, prevents configuration errors, faster deployment"
    impact: "Single command (`gh repo create --public --source=. --push`) handles repo creation and push"

  - id: "manual-fallback-provided"
    what: "Provide manual GitHub UI steps as fallback if gh CLI fails"
    why: "Ensures students can complete deployment even if CLI authentication fails"
    impact: "No student gets blocked by tooling issues"

  - id: "deployment-verification-automated"
    what: "Claude automatically verifies deployment success with curl checks"
    why: "Confirms URL is live before celebration, catches deployment failures early"
    impact: "Students know deployment worked, troubleshooting starts immediately if not"

metrics:
  duration: "3 minutes"
  completed: "2026-01-25"
  tasks: 3
  commits: 1
  lines-added: 243
---

# Phase 05 Plan 03: Week 1 Mockup & GitHub Pages Deployment Summary

**One-liner:** Document Week 1 static mockup flow with GitHub Pages deployment automation via gh CLI

## What Was Built

Added Week 1 mockup creation flow and GitHub Pages deployment guide to CLAUDE.md Section 16 (Guided Project Mode).

**Week 1: Static Mockup subsection:**
- Day-by-day flow (Days 1-2: main screen, Days 3-4: additional screens, Day 5: polish)
- Purpose bullets (instant gratification, design validation, low-risk iteration, shareable progress)
- Mockup quality checklist (6 criteria)
- Example file structure (recipe-keeper)

**Deploying to GitHub Pages subsection:**
- 4-step deployment flow (init git, create repo, enable pages, get URL)
- gh CLI automation for repo creation and Pages enablement
- Celebration template with 100 XP + 10 Aura rewards
- project.json milestone update pattern

**Deployment Verification subsection:**
- Curl-based verification commands (HTTP 200, HTML content, CSS loads)
- Failure handling with wait/retry logic
- Troubleshooting table (5 common issues with solutions)
- Manual fallback steps for gh CLI failures

## Key Decisions Made

**1. Week 1 Mockup-First Approach**

Students ship a static HTML mockup of their V1 app in Week 1, not Week 8.

**Why:** Instant gratification (live URL immediately), design validation (see if UI makes sense before coding), low-risk iteration (HTML is cheap to redo), shareable progress ("Look what I'm building!").

**Impact:** Students go from version contract acceptance to live deployed URL within 7 days. Creates early motivation and validates design before investing in backend/functionality.

**2. GitHub CLI Automation for Deployment**

Use `gh repo create --public --source=. --push` and `gh repo edit --enable-pages --branch main` for automated deployment.

**Why:** Reduces 8-10 manual GitHub UI steps to 2 CLI commands. Prevents configuration errors (wrong branch, private repo, missing index.html). Faster deployment (30 seconds vs 5 minutes).

**Impact:** Claude can fully automate deployment. Students don't context-switch to GitHub UI. Less friction = more students complete Week 1 milestone.

**3. Automated Deployment Verification**

Claude automatically runs curl checks to verify deployment succeeded before celebrating.

**Why:** Confirms URL is live and serving content. GitHub Pages can take 1-5 minutes to build, so verification prevents premature celebration. Catches deployment failures immediately.

**Impact:** Students know deployment worked before they share URL with friends/family. Troubleshooting starts immediately if verification fails (not hours later when they check manually).

**4. Manual Fallback for gh CLI Failures**

Provide 5-step manual GitHub UI process as fallback if gh authentication fails.

**Why:** gh CLI requires authentication (`gh auth login`) which can fail (browser issues, network, credentials). Manual fallback ensures no student gets blocked by tooling.

**Impact:** Deployment success rate near 100% even if CLI fails. Students complete Week 1 milestone regardless of environment issues.

## How It Works

**Week 1 Flow (Day-by-Day):**

1. **Days 1-2:** Student describes main screen, Claude creates index.html with CSS
2. **Days 3-4:** Based on V1 features, Claude identifies needed screens and creates HTML files
3. **Day 5:** Polish (responsive, favicon, navigation check) and deploy

**Deployment Flow (4 Steps):**

1. **Init Git:** `git init && git add . && git commit`
2. **Create Repo:** `gh repo create [PROJECT] --public --source=. --push`
3. **Enable Pages:** `gh repo edit --enable-pages --branch main`
4. **Verify:** `gh api repos/[USER]/[PROJECT]/pages --jq '.html_url'` + curl checks

**Verification Pattern:**

```bash
# 1. Check HTTP 200
curl -s -o /dev/null -w "%{http_code}" [URL]

# 2. Check HTML content exists
curl -s [URL]/index.html | grep -q "<title>"

# 3. Check CSS loads
curl -s [URL]/styles.css | head -5
```

If all pass → celebration + 100 XP + 10 Aura + project.json milestone update
If fail → wait 2 min, retry, then troubleshoot with manual checks

## Integration Points

**With 05-01 (Discovery Wizard):**
- Week 1 flow begins immediately after version contract is signed
- Uses project_name, project_type, v1_features from project.json
- Updates milestones.week_1_mockup in project.json

**With 05-02 (Curriculum Routing):**
- Mockup screens map to V1 features from version contract
- Uses YOUR_APP_FOLDER variable from contextualization_vars
- File structure example uses project type (crud_app → recipe-keeper)

**With progress.json:**
- Awards 100 XP for Week 1 milestone completion
- Awards 10 Aura for deployment success
- Plays module_complete music sequence

## Next Phase Readiness

**Enables:**
- 05-04 (Weekly Scope Audit): Mockup is first tangible artifact to audit against version contract
- Future curriculum lessons: Students now have live deployed project to iterate on
- Portfolio building: Students accumulate live URLs throughout guided project track

**No blockers.** Week 1 mockup flow is self-contained and ready for student use.

**Recommended next:** Proceed to 05-04 (Weekly Scope Audit) to document the scope defense mechanism.

## Deviations from Plan

None - plan executed exactly as written.

All 3 tasks completed:
1. ✅ Week 1 mockup creation flow documented with day-by-day guidance
2. ✅ GitHub Pages deployment flow documented with gh CLI commands and celebration
3. ✅ Deployment verification and troubleshooting documented

## Performance Notes

**Execution time:** 3 minutes (single commit, 243 lines added)

**File impact:**
- CLAUDE.md: +243 lines (Section 16 expanded)
- 3 new subsections added (Week 1 Mockup, Deploying to GitHub Pages, Deployment Verification)

**Quality:**
- All verification criteria met (day-by-day flow, 4-step deployment, curl checks, troubleshooting table, manual fallback)
- Success criteria satisfied (gh CLI automation, live URL celebration, verification checks, manual fallback)
- Deployment pattern tested (gh CLI commands validated against gh documentation)

## Files Changed

- `CLAUDE.md` (+243 lines) - Week 1 mockup and deployment flow in Section 16

## Commits

- `a35ae0d` - docs(05-03): add Week 1 mockup flow and GitHub Pages deployment
