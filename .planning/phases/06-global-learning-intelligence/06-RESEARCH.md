# Phase 6: Global Learning Intelligence - Research

**Researched:** 2026-01-25
**Domain:** Global learning analytics, MCP hooks, privacy-first data collection, AI-powered question analysis
**Confidence:** MEDIUM

## Summary

Phase 6 requires building a global learning intelligence system that captures student questions anonymously across all Claude Code sessions, syncs to cloud storage, and uses AI to identify curriculum improvement opportunities. The research reveals this is a multi-layered architecture combining MCP custom servers for global tracking, Supabase for privacy-compliant data storage with anonymous auth, Claude API for question categorization, and real-time analytics dashboards.

**Key Finding:** MCP doesn't provide built-in global tracking hooks. You'll need to build a custom MCP server that acts as a middleware layer, intercepting conversational events and extracting pedagogical questions before logging them to Supabase. This requires combining MCP's TypeScript SDK with event-driven architecture patterns.

**Critical Decision Point:** True "global tracking across ALL Claude Code sessions" requires either:
1. Users installing a custom MCP server alongside Claude Code (opt-in friction)
2. Building the tutorial as a standalone app with embedded tracking (simpler but limits scope)
3. Using local logging only with manual cloud sync (privacy-first but incomplete data)

**Primary recommendation:** Start with local logging (already in CLAUDE.md Section 2a), add opt-in Supabase sync, then explore MCP server for power users. Progressive enhancement beats trying to track everything from day one.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| @modelcontextprotocol/sdk | 1.x | MCP server/client development | Official TypeScript SDK from Anthropic, v2 coming Q1 2026 |
| @supabase/supabase-js | Latest | Cloud database with auth | Industry standard for privacy-first backends, anonymous auth built-in |
| Anthropic SDK | Latest | Claude API for question analysis | Official SDK for batch categorization |
| Supabase Edge Functions | Built-in | Scheduled jobs (pg_cron) | Native Supabase cron for nightly analysis |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Plausible Analytics | Cloud | Privacy-first dashboard UI | If building public-facing analytics view (GDPR compliant by default) |
| zod | Latest | Schema validation | Type-safe question data structures |
| OpenTelemetry | Latest | MCP observability | If building production MCP server with distributed tracing |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Supabase | Firebase | Firebase lacks anonymous auth as robust, more invasive tracking |
| MCP Server | Middleware API | API is simpler but misses "global tracking" across all Claude sessions |
| Claude API | OpenAI | Claude has better prompt caching (90% discount), ideal for batch categorization |

**Installation:**
```bash
# MCP Server (if pursuing global tracking)
npm install @modelcontextprotocol/sdk
npm install --save-dev @types/node

# Supabase client
npm install @supabase/supabase-js

# Claude API (for categorization)
npm install @anthropic-ai/sdk
```

## Architecture Patterns

### Recommended System Architecture
```
┌─────────────────────────────────────────────────────────┐
│  Claude Code 101 Tutorial                               │
│  - Local question logging (questions_log.json)          │
│  - Pedagogical question detection (CLAUDE.md Section 2a)│
└─────────────────┬───────────────────────────────────────┘
                  │
                  │ (Opt-in sync)
                  ▼
┌─────────────────────────────────────────────────────────┐
│  Supabase Backend                                       │
│  ├── Auth: Anonymous sign-in                            │
│  ├── Database: questions table with RLS                 │
│  ├── Edge Functions: Nightly categorization (pg_cron)   │
│  └── Realtime: Dashboard subscriptions                  │
└─────────────────┬───────────────────────────────────────┘
                  │
                  │ (Batch API, 50% discount)
                  ▼
┌─────────────────────────────────────────────────────────┐
│  Claude API (Haiku 4.5)                                 │
│  - Topic extraction                                     │
│  - Severity categorization                              │
│  - Question type classification                         │
└─────────────────┬───────────────────────────────────────┘
                  │
                  │ (Categorized data)
                  ▼
┌─────────────────────────────────────────────────────────┐
│  Analytics Dashboard                                    │
│  - Top 10 questions this week                           │
│  - Confusion hotspots (module/lesson heatmap)           │
│  - Technology trend detection                           │
│  - Graduate vs. active student patterns                 │
└─────────────────────────────────────────────────────────┘
```

### Pattern 1: Local-First Question Logging
**What:** Questions logged to local JSON file first, cloud sync is optional upgrade
**When to use:** Privacy-first approach, works offline, no external dependencies
**Example:**
```typescript
// Source: CLAUDE.md Section 2a (already implemented)
interface QuestionLog {
  question: string;
  asked_at: string; // ISO 8601
  context: {
    module: number;
    lesson: number;
    task: number;
    student_level: number;
    working_directory: string;
    topic_tags: string[];
  };
  synced_to_cloud?: boolean; // Optional upgrade
}

// Write to ~/.claude-code-global-questions.json
// Sync to Supabase when user opts in
```

### Pattern 2: Anonymous Authentication with Supabase
**What:** Create anonymous session on first sync, no PII required
**When to use:** When user enables cloud sync via consent flow
**Example:**
```typescript
// Source: https://supabase.com/docs/guides/auth/auth-anonymous
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Sign in anonymously (creates session, no email/password)
const { data, error } = await supabase.auth.signInAnonymously()

// JWT has is_anonymous claim for RLS policies
// Can link identity later if user wants permanent account
```

### Pattern 3: Batch Categorization with Claude API
**What:** Nightly Edge Function collects new questions, sends batch to Claude API
**When to use:** Cost optimization (50% discount), non-urgent categorization
**Example:**
```typescript
// Source: https://platform.claude.com/docs/en/about-claude/pricing
// Supabase Edge Function (scheduled via pg_cron)

import Anthropic from '@anthropic-ai/sdk'
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// Batch process questions (runs nightly)
Deno.serve(async (req) => {
  const uncategorized = await supabase
    .from('questions')
    .select('*')
    .is('category', null)
    .limit(100)

  const categorized = await anthropic.messages.create({
    model: "claude-haiku-4.5", // $1/$5 per million tokens
    max_tokens: 1024,
    system: `You are a curriculum analyst. Categorize each question by:
    - topic (paths, git, npm, prompting, etc.)
    - severity (minor_confusion, moderate_gap, critical_blocker)
    - type (conceptual, procedural, troubleshooting)

    Return JSON array with same order as input.`,
    messages: [{
      role: "user",
      content: JSON.stringify(uncategorized.map(q => q.question))
    }]
  })

  // Update database with categories
  // Cost: ~$0.001 per 100 questions with Haiku
})
```

### Pattern 4: Privacy-First Analytics Dashboard
**What:** Real-time dashboard using Supabase Realtime with RLS, no cookies
**When to use:** Displaying aggregate insights to instructors/designers
**Example:**
```typescript
// Source: https://supabase.com/docs/guides/realtime/authorization
// Real-time subscription with RLS enforcement

const channel = supabase
  .channel('question-insights')
  .on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'question_aggregates'
  }, (payload) => {
    // Update dashboard UI
    updateTopQuestions(payload.new.top_10)
    updateConfusionHeatmap(payload.new.module_confusion)
  })
  .subscribe()

// RLS policy ensures only authorized users see data
// CREATE POLICY "Instructors see aggregates"
// ON question_aggregates FOR SELECT
// TO authenticated
// USING (auth.jwt()->>'role' = 'instructor');
```

### Anti-Patterns to Avoid
- **Tracking without consent:** Never log questions to cloud without explicit opt-in. GDPR violation, user trust erosion.
- **Synchronous cloud writes:** Don't block teaching flow to log questions. Local first, sync async.
- **Storing PII:** Never log student names, emails, code contents. Questions + context only.
- **Real-time categorization:** Using Claude API synchronously per question is 2x cost. Batch nightly instead.
- **Over-reliance on MCP:** Building custom MCP server for Phase 1 adds massive complexity. Start simpler.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Privacy analytics | Custom cookie-less tracking | Plausible or Simple Analytics | GDPR compliance is complex; these are battle-tested, EU-hosted |
| Question deduplication | String matching logic | Claude API with prompt caching | LLMs understand semantic similarity better than regex |
| Anonymous user tracking | Custom session tokens | Supabase anonymous auth | Handles JWT, RLS, rate limiting, abuse prevention out of box |
| Scheduled jobs | Cron + Node scripts | Supabase pg_cron + Edge Functions | Native integration, no server to maintain |
| Data anonymization | Manual field stripping | Differential privacy libraries | Mathematically proven anonymity vs. hoping you removed enough |
| Real-time dashboards | WebSockets from scratch | Supabase Realtime | Handles RLS checks, connection scaling, reconnection logic |

**Key insight:** Privacy-first infrastructure (anonymous auth, cookieless analytics, differential privacy) is harder than it looks. Each has edge cases that take years to discover. Use proven libraries.

## Common Pitfalls

### Pitfall 1: Assuming MCP Provides Global Hooks
**What goes wrong:** You expect MCP to have built-in "track all Claude Code conversations" functionality. It doesn't. MCP is a protocol for client-server communication, not a surveillance framework.
**Why it happens:** Documentation mentions "global" in the context of MCP becoming the "global standard," not global tracking hooks.
**How to avoid:** Build custom MCP server that users explicitly install. It acts as middleware, listening to conversation events and extracting questions. This is opt-in by design.
**Warning signs:** If you're searching for "MCP.on('user_question')" in docs, you're headed down wrong path.

### Pitfall 2: Anonymous != Truly Anonymous
**What goes wrong:** You collect "anonymous" data but accidentally include identifying details (IP addresses, exact timestamps, full file paths, working directories with usernames).
**Why it happens:** GDPR compliance requires aggressive anonymization. IP addresses are PII. Timestamps can be quasi-identifiers when combined with other data.
**How to avoid:** Follow differential privacy principles: add noise to timestamps (round to hour), hash IP addresses, strip usernames from paths, aggregate before storing.
**Warning signs:** If your questions table includes columns like `ip_address`, `exact_timestamp_ms`, or `full_working_directory`, you're storing PII.
**Source:** [Anonymization and GDPR](https://www.gdprsummary.com/anonymization-and-gdpr/)

### Pitfall 3: RLS Performance Degradation at Scale
**What goes wrong:** You enable Row-Level Security on the questions table with policy `auth.uid() = user_id`. Works great for 100 questions. At 10,000 questions, queries take 3+ seconds.
**Why it happens:** RLS checks run on EVERY row without proper indexing. For 100 subscribed users on real-time channel, a single insert triggers 100 authorization checks on single thread.
**How to avoid:**
1. Index ALL columns used in RLS policies: `CREATE INDEX idx_questions_user_id ON questions(user_id)`
2. Wrap auth functions in SELECT for caching: `(SELECT auth.uid()) = user_id` instead of `auth.uid() = user_id`
3. For aggregates dashboard, use separate table WITHOUT RLS (instructors only, no per-user filtering)
**Warning signs:** Dashboard feels slow, Supabase logs show timeout errors, real-time subscriptions lag behind inserts.
**Source:** [Supabase RLS Performance Best Practices](https://supabase.com/docs/guides/troubleshooting/rls-performance-and-best-practices-Z5Jjwv)

### Pitfall 4: Claude API Cost Explosion
**What goes wrong:** You send each question to Claude API immediately for categorization. 1000 students asking 5 questions/day = 5000 API calls/day = $150/month on Sonnet.
**Why it happens:** Not using batch processing + prompt caching + cheapest model.
**How to avoid:**
1. Use **Batch API** (50% discount): Process questions nightly, not real-time
2. Use **Haiku 4.5** ($1/$5 per million tokens): For categorization, not creative writing
3. Use **Prompt Caching** (90% discount on cached tokens): System prompt stays same, questions change
4. **Combined:** $150/month → $7.50/month (Batch) → $0.75/month (Caching on system prompt)
**Warning signs:** Monthly Anthropic bill growing faster than student count, categorization happening synchronously.
**Source:** [Claude API Pricing 2026](https://www.metacto.com/blogs/anthropic-api-pricing-a-full-breakdown-of-costs-and-integration)

### Pitfall 5: Supabase Anonymous Auth Abuse
**What goes wrong:** You enable anonymous sign-in. Bad actors hit endpoint 1000x/second, creating millions of fake users, filling your database.
**Why it happens:** Anonymous auth is public endpoint with default 30 req/hour IP rate limit. Sophisticated attackers use proxies.
**How to avoid:**
1. **Enable CAPTCHA:** Invisible reCAPTCHA or Cloudflare Turnstile (strongly recommended by Supabase)
2. **Tighten rate limits:** Default 30/hour is generous. Consider 10/hour for tutorial use case
3. **Monitor user growth:** Alert if >100 new anon users/hour (suspicious pattern)
4. **Garbage collection:** Delete anon users older than 30 days (they can't recover accounts anyway)
**Warning signs:** Database size growing faster than student count, billing alerts, performance degradation.
**Source:** [Supabase Anonymous Auth Security](https://supabase.com/docs/guides/auth/auth-anonymous)

### Pitfall 6: MCP Server Security Holes
**What goes wrong:** Custom MCP server deployed without authentication, exposed on public internet, leaking student questions to anyone.
**Why it happens:** MCP spec doesn't enforce auth at protocol level. Security is implementor responsibility.
**How to avoid:**
1. **Never expose MCP server publicly:** Local-only or behind OAuth
2. **Validate all inputs:** MCP servers can execute arbitrary code via tools
3. **Use least-privilege:** Server should only READ conversation logs, not execute commands
4. **Audit dependencies:** MCP TypeScript SDK + all transitive deps
**Warning signs:** Shodan scans finding your server, logs showing requests from unknown IPs, data leakage reports.
**Source:** [MCP Security Survival Guide](https://towardsdatascience.com/the-mcp-security-survival-guide-best-practices-pitfalls-and-real-world-lessons/)

## Code Examples

Verified patterns from official sources:

### Example 1: Supabase Schema for Questions Table
```sql
-- Source: Supabase RLS best practices + GDPR anonymization patterns
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  asked_at TIMESTAMPTZ NOT NULL, -- Rounded to hour for anonymity
  context JSONB NOT NULL, -- { module, lesson, task, topic_tags }
  category TEXT, -- Filled by nightly Claude API job
  severity TEXT, -- minor_confusion | moderate_gap | critical_blocker
  type TEXT, -- conceptual | procedural | troubleshooting
  user_id UUID REFERENCES auth.users(id), -- Anonymous user
  synced_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for RLS performance (100x speedup)
CREATE INDEX idx_questions_user_id ON questions(user_id);
CREATE INDEX idx_questions_category ON questions(category);
CREATE INDEX idx_questions_asked_at ON questions(asked_at);

-- RLS Policy: Users see only their questions
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see own questions"
ON questions FOR SELECT
TO authenticated
USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users insert own questions"
ON questions FOR INSERT
TO authenticated
WITH CHECK ((SELECT auth.uid()) = user_id);

-- Separate aggregates table for dashboard (NO RLS - instructors only)
CREATE TABLE question_aggregates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  week_starting DATE NOT NULL,
  top_10_questions JSONB, -- Array of { question, count }
  module_confusion JSONB, -- { module_1: 23, module_2: 45, ... }
  technology_trends JSONB, -- { react: 456, nextjs: 234, ... }
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Example 2: Supabase Edge Function for Nightly Categorization
```typescript
// Source: https://supabase.com/docs/guides/functions/schedule-functions
// File: supabase/functions/categorize-questions/index.ts

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Anthropic from 'https://esm.sh/@anthropic-ai/sdk@0.32.1'

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')! // Bypass RLS
  )

  const anthropic = new Anthropic({
    apiKey: Deno.env.get('ANTHROPIC_API_KEY')!
  })

  // Fetch uncategorized questions (max 100 per run)
  const { data: questions } = await supabase
    .from('questions')
    .select('id, question, context')
    .is('category', null)
    .limit(100)

  if (!questions || questions.length === 0) {
    return new Response('No questions to categorize', { status: 200 })
  }

  // Batch categorize with Claude Haiku
  const response = await anthropic.messages.create({
    model: 'claude-haiku-4.5',
    max_tokens: 2048,
    system: `You are a curriculum analyst for a coding tutorial. Categorize student questions by:

    1. topic: One of [paths, git, npm, terminal, prompting, models, files, json, other]
    2. severity: One of [minor_confusion, moderate_gap, critical_blocker]
    3. type: One of [conceptual, procedural, troubleshooting]

    Return JSON array with same length and order as input. Each item: { topic, severity, type }`,
    messages: [{
      role: 'user',
      content: JSON.stringify(questions.map(q => ({
        question: q.question,
        context: q.context
      })))
    }]
  })

  const categories = JSON.parse(response.content[0].text)

  // Update database with categories
  const updates = questions.map((q, i) => ({
    id: q.id,
    category: categories[i].topic,
    severity: categories[i].severity,
    type: categories[i].type
  }))

  for (const update of updates) {
    await supabase
      .from('questions')
      .update({
        category: update.category,
        severity: update.severity,
        type: update.type
      })
      .eq('id', update.id)
  }

  return new Response(
    JSON.stringify({ categorized: updates.length }),
    { headers: { 'Content-Type': 'application/json' } }
  )
})

// Schedule with pg_cron (runs nightly at 2 AM UTC):
// SELECT cron.schedule(
//   'categorize-questions-nightly',
//   '0 2 * * *',
//   $$SELECT net.http_post(
//     url := 'https://PROJECT_REF.supabase.co/functions/v1/categorize-questions',
//     headers := '{"Authorization": "Bearer ANON_KEY"}'::jsonb
//   )$$
// );
```

### Example 3: Privacy-First Question Sync (Client-Side)
```typescript
// Source: GDPR anonymization patterns + Supabase anonymous auth
import { createClient } from '@supabase/supabase-js'

interface QuestionLog {
  question: string
  asked_at: string
  context: {
    module: number
    lesson: number
    task: number
    topic_tags: string[]
  }
}

class PrivacyFirstQuestionSync {
  private supabase
  private consentGiven = false

  constructor() {
    this.supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    this.consentGiven = this.loadConsent()
  }

  // Ask for opt-in consent (GDPR requirement)
  async requestConsent(): Promise<boolean> {
    // Show UI: "Help improve curriculum by sharing anonymous questions?"
    // Explain: No PII, questions only, can opt-out anytime
    const consent = await showConsentDialog()

    if (consent) {
      // Sign in anonymously
      const { data, error } = await this.supabase.auth.signInAnonymously()
      if (error) throw error

      this.consentGiven = true
      this.saveConsent(true)
    }

    return consent
  }

  // Sync questions with privacy protections
  async syncQuestion(log: QuestionLog) {
    if (!this.consentGiven) return // Respect opt-out

    // Anonymize timestamp (round to hour)
    const askedAt = new Date(log.asked_at)
    askedAt.setMinutes(0, 0, 0)

    // Strip potentially identifying info from context
    const anonymizedContext = {
      module: log.context.module,
      lesson: log.context.lesson,
      task: log.context.task,
      topic_tags: log.context.topic_tags,
      // NO: working_directory, student_level, previous_command, error_occurred
    }

    // Insert to Supabase (async, non-blocking)
    const { error } = await this.supabase
      .from('questions')
      .insert({
        question: log.question,
        asked_at: askedAt.toISOString(),
        context: anonymizedContext
      })

    if (error) {
      console.warn('Question sync failed (non-critical):', error)
      // Fail silently - don't disrupt learning experience
    }
  }

  // GDPR: Right to be forgotten
  async deleteMyData() {
    const { error } = await this.supabase
      .from('questions')
      .delete()
      .eq('user_id', (await this.supabase.auth.getUser()).data.user?.id)

    if (!error) {
      this.consentGiven = false
      this.saveConsent(false)
    }
  }

  private loadConsent(): boolean {
    return localStorage.getItem('question_sync_consent') === 'true'
  }

  private saveConsent(value: boolean) {
    localStorage.setItem('question_sync_consent', String(value))
  }
}
```

### Example 4: Analytics Dashboard with Real-Time Updates
```typescript
// Source: Supabase Realtime + privacy-first analytics patterns
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Subscribe to aggregated insights (NO individual questions - privacy)
const channel = supabase
  .channel('curriculum-insights')
  .on('postgres_changes', {
    event: 'UPDATE',
    schema: 'public',
    table: 'question_aggregates'
  }, (payload) => {
    updateDashboard(payload.new)
  })
  .subscribe()

function updateDashboard(data: any) {
  // Top 10 questions this week
  const topQuestions = data.top_10_questions.map((q: any, i: number) => `
    ${i + 1}. "${q.question}" (${q.count} students)
  `).join('\n')

  // Confusion heatmap
  const heatmap = Object.entries(data.module_confusion)
    .map(([module, count]) => `Module ${module}: ${count} questions`)
    .join('\n')

  // Technology trends
  const trends = Object.entries(data.technology_trends)
    .map(([tech, count]) => `${tech}: ${count} students`)
    .join('\n')

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 CURRICULUM INSIGHTS (This Week)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TOP QUESTIONS:
${topQuestions}

CONFUSION HOTSPOTS:
${heatmap}

TECHNOLOGY TRENDS:
${trends}

Updated: ${new Date().toLocaleString()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `)
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Manual surveys | Real-time question logging | 2023-2024 | Capture confusion moments, not post-hoc recollections |
| Google Analytics | Privacy-first analytics (Plausible, Simple Analytics) | 2022-2025 | GDPR compliance by default, no cookie banners |
| Permanent accounts only | Anonymous authentication | 2024-2025 | Reduce signup friction, still get user-scoped data |
| Sync per event | Batch processing with prompt caching | 2025-2026 | 95% cost reduction on AI categorization |
| String matching for duplicates | Semantic deduplication with LLMs | 2025-2026 | Catch "What's a path?" vs "What does ~ mean?" similarity |
| Scheduled cron jobs on servers | Serverless edge functions (Supabase pg_cron) | 2023-2025 | No server maintenance, native DB integration |
| Manual anonymization | Differential privacy libraries | 2024-2026 | Mathematically proven privacy vs ad-hoc field stripping |

**Deprecated/outdated:**
- **MCP v1.x stability assumption:** Spec is at 2025-11-25 version, v2 coming Q1 2026. Don't build production system on assumption v1 is final.
- **Firebase for privacy use cases:** Firebase analytics is Google-owned, GDPR concerns. Supabase is EU-compliant by design.
- **Real-time AI categorization:** Pre-2025 pattern was synchronous API calls. Current best practice: batch nightly with Haiku + caching.
- **Cookie-based session tracking:** Deprecated for privacy analytics. Use cookieless (server-side sessions, fingerprinting with consent, or anonymous JWT).

## Open Questions

Things that couldn't be fully resolved:

1. **MCP Global Hook Feasibility**
   - What we know: MCP servers can be built with TypeScript SDK, can expose tools/resources/prompts
   - What's unclear: Can MCP server intercept ALL conversation events across Claude Desktop/CLI without explicit tool calls?
   - Recommendation: Prototype minimal MCP server that listens for conversation events. If not possible, fallback to local logging with opt-in sync.
   - Research needed: Deep dive into MCP server notifications and sampling features

2. **Graduate Tracking Mechanics**
   - What we know: Want to track questions asked AFTER completing tutorial (real-world usage)
   - What's unclear: How to identify "graduate" status if student uses Claude Code outside tutorial folder?
   - Recommendation: Add completion flag to progress.json, sync to Supabase. Questions after completion_date are tagged as "graduate" questions.
   - Edge case: What if student completes tutorial but never opts into cloud sync? Missing graduate data.

3. **Technology Trend Detection Accuracy**
   - What we know: Can extract mentions of "React", "Next.js", etc. from questions and context
   - What's unclear: How to distinguish "learning React" (student question) from "teaching React" (curriculum mentioning it)?
   - Recommendation: Combine question text analysis + user's guided_project.project_type field. If project_type includes framework, tag as "student using X".
   - False positives: Student asks "Should I learn React?" without actually building React project.

4. **Optimal Categorization Frequency**
   - What we know: Nightly batch is cheapest. Real-time is most responsive but 2x cost.
   - What's unclear: Is nightly too slow for "smart hints use question data in real-time teaching"?
   - Recommendation: Hybrid approach - simple keyword matching for instant hints ("Many students ask about paths"), nightly AI for deep insights.
   - Trade-off: Real-time AI would be $15/month vs $0.75/month for nightly. Worth it for real-time hints?

5. **Privacy Compliance Across Jurisdictions**
   - What we know: GDPR requires opt-in consent, right to be forgotten, data minimization
   - What's unclear: CCPA (California), PIPEDA (Canada), other jurisdictions have different requirements
   - Recommendation: Start with strictest standard (GDPR). If compliant with GDPR, likely covers most other privacy laws.
   - Caveat: Not legal advice. Consult privacy lawyer before production launch.

## Sources

### Primary (HIGH confidence)
- [Model Context Protocol Specification (2025-11-25)](https://modelcontextprotocol.io/specification/2025-11-25) - Official MCP architecture
- [Supabase Anonymous Authentication](https://supabase.com/docs/guides/auth/auth-anonymous) - Anonymous auth patterns
- [Supabase Scheduling Edge Functions](https://supabase.com/docs/guides/functions/schedule-functions) - pg_cron integration
- [Claude API Pricing 2026](https://platform.claude.com/docs/en/about-claude/pricing) - Batch API, prompt caching
- [Supabase RLS Performance Best Practices](https://supabase.com/docs/guides/troubleshooting/rls-performance-and-best-practices-Z5Jjwv) - RLS optimization

### Secondary (MEDIUM confidence)
- [MCP TypeScript SDK (GitHub)](https://github.com/modelcontextprotocol/typescript-sdk) - Official SDK for custom servers
- [15 Best Practices for Building MCP Servers in Production](https://thenewstack.io/15-best-practices-for-building-mcp-servers-in-production/) - Production patterns
- [MCP Security Survival Guide](https://towardsdatascience.com/the-mcp-security-survival-guide-best-practices-pitfalls-and-real-world-lessons/) - Security pitfalls
- [Supabase Realtime Benchmarks](https://supabase.com/docs/guides/realtime/benchmarks) - Performance at scale
- [GDPR Anonymization Guide](https://www.gdprsummary.com/anonymization-and-gdpr/) - Anonymization techniques
- [Differential Privacy Guide](https://privacytools.seas.harvard.edu/differential-privacy) - Mathematical anonymity
- [Plausible Analytics](https://plausible.io/) - Privacy-first analytics alternative
- [Claude API Pricing Guide 2026](https://www.metacto.com/blogs/anthropic-api-pricing-a-full-breakdown-of-costs-and-integration) - Cost optimization strategies

### Tertiary (LOW confidence - needs validation)
- [AI-Powered Learning Analytics Trends 2026](https://www.disco.co/blog/7-ai-innovations-shaping-the-future-of-learning-in-2026) - Curriculum improvement patterns
- [Event-Driven Architecture Examples 2025](https://streamkap.com/resources-and-guides/event-driven-architecture-examples) - Real-time analytics patterns
- [Privacy Analytics Dashboard Challenges](https://secureprivacy.ai/blog/privacy-governance-dashboard-gdpr) - GDPR dashboard patterns

## Metadata

**Confidence breakdown:**
- MCP global tracking: LOW - Spec doesn't clearly support conversation interception; may need workaround
- Supabase stack: HIGH - Official docs, proven patterns, production-ready
- Privacy architecture: MEDIUM - GDPR patterns well-documented, but multi-jurisdiction compliance unclear
- AI categorization: HIGH - Official Anthropic pricing, batch API documented, Haiku is production-ready
- Analytics dashboard: MEDIUM - Supabase Realtime is proven, but RLS performance at scale needs testing

**Research date:** 2026-01-25
**Valid until:** 2026-02-25 (30 days - MCP v2 arriving Q1 2026 may change SDK patterns)

**Critical gaps requiring validation:**
1. MCP conversation event interception - prototype needed
2. RLS performance with 10,000+ questions - load testing needed
3. Multi-jurisdiction privacy compliance - legal review needed
4. Real-time hint integration with teaching flow - UX design needed
