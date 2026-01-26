---
phase: 06
plan: 04
subsystem: analytics
status: complete
completed: 2026-01-25
duration: 2 minutes

requires:
  - phase: 06
    plan: 02
    reason: Question aggregates table schema and categorization

provides:
  - artifact: Analytics Dashboard
    description: Real-time curriculum insights from question data
    files:
      - web/analytics-dashboard.html
      - web/js/analytics-dashboard.js
      - web/css/dashboard.css
  - artifact: Aggregate Computation Engine
    description: Weekly rollup computation for dashboard
    files:
      - supabase/functions/update-aggregates/index.ts

affects:
  - future: Curriculum improvement decisions
    impact: Dashboard surfaces confusion hotspots and tech trends

tech-stack:
  added:
    - Supabase Realtime (dashboard subscription)
  patterns:
    - Real-time data visualization
    - Aggregate rollup computation
    - Privacy-first analytics (no PII)

key-files:
  created:
    - supabase/functions/update-aggregates/index.ts (136 lines)
    - web/analytics-dashboard.html (78 lines)
    - web/js/analytics-dashboard.js (229 lines)
    - web/css/dashboard.css (242 lines)
  modified:
    - web/terminal.html (+3 lines - footer link)
    - CLAUDE.md (+24 lines - dashboard documentation)

decisions:
  - choice: Aggregate weekly rollups instead of real-time queries
    rationale: Reduces dashboard query load, enables historical trends, faster UI rendering
    alternatives: Query questions table directly on every load
  - choice: Terminal-themed CSS matching web portal aesthetic
    rationale: Visual consistency across platform, familiar environment for curriculum designers
    alternatives: Modern data viz dashboard style (charts, graphs)
  - choice: Discrete footer link, not prominent navigation
    rationale: Dashboard is for curriculum designers, not student-facing feature
    alternatives: Add to main navigation or student commands

tags: [analytics, dashboard, supabase, realtime, visualization, curriculum-insights]
---

# Phase 6 Plan 4: Analytics Dashboard Summary

**One-liner:** Real-time curriculum insights dashboard with Supabase Realtime showing top questions, confusion hotspots, tech trends, and severity distribution.

## What Was Built

### Aggregate Computation Engine
Created `update-aggregates` Edge Function that computes weekly rollups from questions table:
- **Top 10 questions** by similarity grouping (normalized text matching)
- **Module confusion** hotspots (questions per module count)
- **Technology trends** extraction (keyword matching: React, Next.js, Python, etc.)
- **Severity distribution** breakdown (minor/moderate/critical/uncategorized)
- **Weekly stats** (total questions, unique students, graduate questions)

Aggregates upserted to `question_aggregates` table with week_starting as primary key.

### Analytics Dashboard UI
Built privacy-first analytics dashboard with 5 insight sections:
1. **Top 10 Questions This Week** - Ordered list showing what students are confused about
2. **Confusion Hotspots** - Heatmap visualizing questions per module
3. **Technology Trends** - Tag cloud of tech mentions (React, Tailwind, Supabase, etc.)
4. **This Week Stats** - Total questions, unique students, graduate questions
5. **Severity Distribution** - Bar chart of minor/moderate/critical severity

**Real-time updates:** Dashboard subscribes to Supabase Realtime for live updates when aggregates change.

**Privacy:** Aggregates only. No individual student questions visible. No PII displayed.

### Integration
- Footer link in web portal (`terminal.html`) pointing to dashboard
- Documentation in CLAUDE.md Section 2a explaining dashboard purpose and privacy
- Error state UI when Supabase not configured

## Technical Architecture

**Data Flow:**
```
Questions (local log)
  → Sync to Supabase (with consent)
  → Categorize-questions Edge Function (tags, severity)
  → Update-aggregates Edge Function (weekly rollups)
  → question_aggregates table
  → Dashboard (Supabase Realtime subscription)
  → Live UI updates
```

**Edge Function Pattern:**
- CORS headers for browser access
- Service role key for write permissions
- Week start computation (Monday 00:00 UTC)
- Upsert with onConflict handling
- Error handling with 500 responses

**Dashboard Pattern:**
- Supabase client initialization with config fallback
- Initial data load on page mount
- Real-time subscription to question_aggregates table
- Render functions for each insight section
- HTML escaping for security
- Responsive grid layout (auto-fit, minmax)

## Files Changed

### Created (4 files, 685 lines)
1. **supabase/functions/update-aggregates/index.ts** (136 lines)
   - Weekly aggregate computation from questions table
   - Top 10 questions by similarity grouping
   - Module confusion, tech trends, severity breakdown
   - Upsert to question_aggregates table

2. **web/analytics-dashboard.html** (78 lines)
   - Dashboard container with 5 insight sections
   - Terminal-themed header and footer
   - Privacy statement footer
   - Supabase CDN script import

3. **web/js/analytics-dashboard.js** (229 lines)
   - AnalyticsDashboard class with init/load/subscribe pattern
   - Render functions for each insight section
   - Real-time subscription to question_aggregates table
   - Error state handling for unconfigured Supabase
   - HTML escaping for security

4. **web/css/dashboard.css** (242 lines)
   - Terminal-themed styling (dark mode, green accents)
   - Responsive grid layout
   - Heatmap bars with gradient fills
   - Tag cloud for tech trends
   - Severity distribution bar charts
   - Loading and error states

### Modified (2 files, 27 lines)
1. **web/terminal.html** (+3 lines)
   - Discrete footer link to analytics-dashboard.html
   - Terminal-green color matching portal theme

2. **CLAUDE.md** (+24 lines)
   - Analytics Dashboard section after Privacy Controls
   - Documents INTEL-05 and INTEL-09 fulfillment
   - Explains dashboard purpose, displays, privacy
   - How it works: data flow from local log to dashboard

## Decisions Made

### 1. Weekly Aggregates vs Real-Time Queries
**Decision:** Compute weekly rollups and store in question_aggregates table, dashboard queries aggregates (not raw questions).

**Rationale:**
- Reduces dashboard query load (1 row fetch vs scanning thousands of questions)
- Enables historical trend analysis (compare week-to-week)
- Faster UI rendering (pre-computed counts and top-N lists)
- Separates concerns (aggregation logic in Edge Function, dashboard just renders)

**Tradeoff:** Slightly stale data (aggregates recomputed periodically, not every question), but acceptable for weekly insights.

**Alternative:** Query questions table directly on every dashboard load. Rejected as scales poorly with question volume.

### 2. Terminal-Themed CSS
**Decision:** Match web portal aesthetic (dark background, terminal green accents, Courier monospace).

**Rationale:**
- Visual consistency across platform
- Familiar environment for curriculum designers (same theme as student-facing portal)
- Reinforces "terminal learning" brand identity
- Low-friction adoption (feels like part of existing system)

**Alternative:** Modern data viz dashboard (bright colors, charts, graphs). Rejected as creates visual disconnect from rest of platform.

### 3. Discrete Footer Link
**Decision:** Dashboard link in small footer, not prominent navigation or student commands.

**Rationale:**
- Dashboard is for curriculum designers, not student-facing feature
- Students don't need to see analytics (would create comparison anxiety)
- Designers know to look for "Curriculum Insights" link
- Progressive disclosure - surface when relevant (designing curriculum, not learning)

**Alternative:** Add to main navigation or /dashboard command. Rejected as conflates student experience with designer tools.

### 4. Supabase Realtime for Live Updates
**Decision:** Subscribe to question_aggregates table changes via Supabase Realtime channels.

**Rationale:**
- Instant updates when new aggregates computed (no manual refresh)
- Shows dashboard is "alive" and reacting to student questions
- Enables collaborative curriculum design (multiple designers see same live data)
- Built-in Supabase feature (no custom WebSocket infrastructure)

**Tradeoff:** Requires Supabase paid plan for Realtime (free tier has limits). Acceptable for MVP.

**Alternative:** Polling (setInterval fetch every 30s). Rejected as less elegant and more server load.

## Deviations from Plan

None. Plan executed exactly as specified.

## Verification

**Must-have truths verified:**
- ✅ Dashboard shows top 10 questions this week (renderTopQuestions function)
- ✅ Dashboard shows confusion hotspots by module (renderModuleConfusion function)
- ✅ Dashboard shows technology trends (renderTechTrends function)
- ✅ Dashboard updates in real-time via Supabase Realtime (subscribeToUpdates function)

**Artifacts verified:**
- ✅ web/analytics-dashboard.html provides dashboard UI with question-insights ID
- ✅ web/js/analytics-dashboard.js exports AnalyticsDashboard class with Supabase Realtime subscription
- ✅ supabase/functions/update-aggregates/index.ts computes question_aggregates

**Key links verified:**
- ✅ analytics-dashboard.js → question_aggregates table via Realtime subscription (supabase.channel pattern)
- ✅ update-aggregates/index.ts → questions table via aggregate computation (COUNT(*) pattern)

## Performance Notes

**Execution time:** 2 minutes (3 tasks, 3 atomic commits)

**Optimization decisions:**
- Pre-computed aggregates reduce dashboard query latency
- Supabase Realtime eliminates polling overhead
- Responsive grid layout adapts to screen size
- Lazy loading (dashboard only fetches current week)

**Scalability:**
- Aggregates scale to millions of questions (constant-time dashboard queries)
- Week-based partitioning enables historical cleanup (drop old weeks)
- Top-N slicing (top 10 questions, top 8 tech trends) caps UI complexity

## Next Phase Readiness

**Phase 6 Wave 2 Status:** 2/2 plans complete (06-03 cloud sync, 06-04 analytics dashboard)

**Phase 6 Completion:** All 4 plans complete (privacy, schema, sync, analytics)

**Blockers:** None. Analytics dashboard ready for use. Supabase configuration required but documented.

**Concerns:** Dashboard requires real question data to be useful. MVP ready, but value increases with student adoption.

**What's next:** Phase 6 complete. Global learning intelligence system operational. Ready for live student testing and curriculum iteration based on insights.

## Commits

1. `7d99ca8` - feat(06-04): add aggregate computation Edge Function
2. `cb0a29e` - feat(06-04): create analytics dashboard with real-time updates
3. `2085293` - docs(06-04): add dashboard link and documentation

**Total:** 3 commits, 712 lines added, 2 minutes

---

**Phase 6 Plan 4 complete.** Analytics dashboard surfaces curriculum insights for data-driven improvement.
