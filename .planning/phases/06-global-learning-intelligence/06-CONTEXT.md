# Phase 6: Global Learning Intelligence - Context

**Gathered:** 2026-01-25
**Status:** Deferred for research

<domain>
## Phase Boundary

Build a global learning intelligence system that:
- Captures student questions anonymously across all Claude Code sessions
- Syncs question data to cloud database (Supabase)
- Analyzes patterns with AI to categorize questions (topic, severity, type)
- Surfaces insights via analytics dashboard
- Feeds real-time hints into teaching flow
- Tracks technology trends and graduate questions
- Provides privacy controls (opt-in, opt-out, data deletion)

This phase transforms the platform from single-user learning to global collective intelligence that improves curriculum for all students.

</domain>

<decisions>
## Implementation Decisions

### Approach Strategy

User has no prior experience with:
- MCP (Model Context Protocol) hooks for global tracking
- Cloud database sync patterns (Supabase integration)
- AI categorization pipelines
- Privacy-compliant data collection at scale

**Decision:** Phase 6 requires research phase before planning.

Research needs to cover:
1. **MCP Hook Mechanics** - How do global hooks work? Can they intercept questions across all Claude Code sessions? Performance implications?
2. **Supabase Integration** - Anonymous auth patterns, real-time sync vs batch, schema design for question logging
3. **AI Categorization** - Claude API for question analysis? Prompt design for topic extraction? Cost implications?
4. **Privacy Architecture** - GDPR-compliant anonymization, opt-in/opt-out flows, data deletion requests
5. **Analytics Dashboard** - Display layer (web app?), query patterns for "top questions", trend detection algorithms

### Claude's Discretion

All implementation details - this phase is exploratory until research completes.

</decisions>

<specifics>
## Specific Ideas

- CLAUDE.md already has question logging MVP (Section 2a) using local JSON file
- Global hook should extend this to capture questions from ANY Claude Code session, not just tutorial
- Privacy-first: No PII, no code contents, just anonymized questions with context (module/lesson/topic_tags)
- Dashboard should be simple: "Top 10 questions this week", "Confusion hotspots", "Technology trends"
- Real-time hints: "Many students struggle here - here's a hint" based on global data

</specifics>

<deferred>
## Deferred Ideas

None - discussion focused on acknowledging knowledge gap and need for research before planning.

</deferred>

---

*Phase: 06-global-learning-intelligence*
*Context gathered: 2026-01-25*
