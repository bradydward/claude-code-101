# Global Question Tracking System

## The Big Idea

Track pedagogical questions across ALL Claude Code sessions, everywhere you work - not just in the tutorial folder. This reveals what developers ACTUALLY struggle with in real projects and feeds that insight back into the curriculum.

---

## Why This Is Genius

### Traditional Approach:
- Only track questions inside the tutorial
- Miss what happens when students apply skills to real projects
- Don't know if lessons transferred to real-world use

### This Approach:
- Track questions EVERYWHERE (with permission)
- See what gaps persist in real projects
- Learn what people need after "graduating"
- Build curriculum based on ACTUAL struggles

---

## Example Scenarios

### Scenario 1: React Project (Outside Tutorial)

**You (in ~/my-react-app):** "How do I use useState in React?"

**What happens:**
1. Claude answers clearly
2. System logs: "useState question - user is Level 7, completed Module 9, working in React project"
3. Platform learns: "Even after completing Module 9 (Building Projects), students ask about React hooks"
4. **Action:** Add "React Hooks Deep Dive" bonus module to curriculum

### Scenario 2: Git Trouble (Real Repo)

**You (in ~/client-website):** "How do I undo my last commit?"

**What happens:**
1. Claude helps
2. System logs: "Git undo question - user completed Module 8 (Git Basics) 2 weeks ago"
3. Platform learns: "Module 8 doesn't cover undoing commits well"
4. **Action:** Add "Git Undo Strategies" to Module 8

### Scenario 3: Deployment Confusion

**You (in ~/my-portfolio):** "How do I deploy to Vercel?"

**What happens:**
1. Claude walks you through
2. System logs: "Deployment question - 47 students asked about Vercel this month"
3. Platform learns: "High demand for Vercel tutorial"
4. **Action:** Create Module 13.5 "Deploying to Vercel"

---

## The Intelligence Gained

### 1. **Skills Transfer Validation**

See if lessons stick in real-world use:

```
Module 8: Git Basics (completed by 1,000 students)

Questions AFTER completing Module 8:
• "How do I undo a commit?" - 342 students (34%)
• "What's a merge conflict?" - 287 students (29%)
• "How do I rename a branch?" - 156 students (16%)

INSIGHT: Module 8 teaches basics but misses common real-world scenarios
ACTION: Add "Git Survival Guide" covering these 3 topics
```

### 2. **Real-World Curriculum Gaps**

Discover what the tutorial SHOULD teach:

```
Top questions asked OUTSIDE the tutorial folder:

1. "How do environment variables work?" - 456 asks
   → Not covered anywhere! Add Module 7.5

2. "What's the difference between npm and npx?" - 389 asks
   → Briefly mentioned in M2, needs dedicated explanation

3. "How do I debug this error?" - 312 asks
   → Need Module 12.5: Debugging Strategies
```

### 3. **Technology Trends**

See what students are actually building:

```
Questions by technology (last 30 days):

• React: 789 questions (add React module!)
• Next.js: 456 questions (high demand)
• Tailwind: 312 questions (popular)
• Python: 89 questions (lower priority)
• Docker: 67 questions (advanced topic)
```

### 4. **Graduation Success Rate**

Measure if students are self-sufficient:

```
Students who completed Module 15 (Graduation):

• Asked 0-2 questions after: 423 students (42%) ✅ GREAT!
• Asked 3-10 questions after: 389 students (39%) ⚠️ OK
• Asked 10+ questions after: 187 students (19%) ❌ NEED HELP

Common questions from the 10+ group:
• Deployment issues
• Environment configuration
• Real API integration

ACTION: Add Module 16 (Post-Graduation Bootcamp) covering these
```

---

## How It Works Technically

### 1. Global Claude Code Hook

**Install a global listener** that runs in EVERY Claude Code session, not just the tutorial folder.

**Using MCP (Model Context Protocol):**

Create a global MCP server: `~/.config/claude-code/servers/question-tracker.json`

```json
{
  "mcpServers": {
    "question-tracker": {
      "command": "node",
      "args": ["/path/to/question-tracker-server.js"],
      "env": {
        "SUPABASE_URL": "https://your-project.supabase.co",
        "SUPABASE_KEY": "your-anon-key"
      }
    }
  }
}
```

**The server:** `/path/to/question-tracker-server.js`

```javascript
// MCP server that logs questions globally
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const server = new Server(
  {
    name: 'question-tracker',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Tool: Log a pedagogical question
server.setRequestHandler('tools/call', async (request) => {
  if (request.params.name === 'log_question') {
    const { question, context } = request.params.arguments;

    // Read student's progress (if in tutorial folder)
    let studentContext = null;
    const progressPath = findProgressJson(); // Search up directory tree

    if (progressPath) {
      const progress = JSON.parse(fs.readFileSync(progressPath, 'utf8'));
      studentContext = {
        level: progress.student.level,
        class: progress.student.class,
        completed_modules: progress.completed.modules,
      };
    }

    // Log to Supabase
    await supabase.from('learning_questions').insert({
      question,
      asked_at: new Date().toISOString(),
      student_level: studentContext?.level || null,
      student_class: studentContext?.class || null,
      context: {
        cwd: context.cwd,
        project_type: detectProjectType(context.cwd),
        files_in_context: context.files,
        ...context,
      },
      in_tutorial: !!progressPath,
    });

    return { content: [{ type: 'text', text: 'Question logged' }] };
  }
});

// Detect project type from folder structure
function detectProjectType(cwd) {
  if (fs.existsSync(path.join(cwd, 'package.json'))) {
    const pkg = JSON.parse(fs.readFileSync(path.join(cwd, 'package.json')));
    if (pkg.dependencies?.react) return 'react';
    if (pkg.dependencies?.next) return 'nextjs';
    if (pkg.dependencies?.express) return 'express';
    return 'node';
  }
  if (fs.existsSync(path.join(cwd, 'requirements.txt'))) return 'python';
  if (fs.existsSync(path.join(cwd, 'Cargo.toml'))) return 'rust';
  return 'unknown';
}

const transport = new StdioServerTransport();
await server.connect(transport);
```

### 2. Question Detection Logic

**In CLAUDE.md (or global system prompt):**

When a user asks a question, Claude decides: "Is this pedagogical?"

```
User: "How do I center a div in CSS?"
→ YES - pedagogical question
→ Call MCP tool: log_question

User: "What's the capital of France?"
→ NO - not coding-related
→ Don't log

User: "Write a function that sorts an array"
→ NO - imperative request, not a question
→ Don't log

User: "Why isn't my useState updating?"
→ YES - learning/debugging question
→ Call MCP tool: log_question
```

**Heuristics for pedagogical questions:**
- Starts with: "How do I...", "What is...", "Why does...", "When should I..."
- Contains learning keywords: "difference between", "best practice", "how does X work"
- Error-related: "this error", "not working", "fix this"
- Conceptual: "understand", "explain", "what's the point of"

### 3. Privacy & Consent

**First time the global tracker activates:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌍 GLOBAL LEARNING INTELLIGENCE

Hey! We noticed you completed Claude Code 101.

We'd like to track pedagogical questions you ask
across ALL your projects (not just the tutorial).

WHY?
• Helps us see what real-world skills you need
• Improves the curriculum based on actual struggles
• Benefits future students learning the same things

WHAT WE TRACK:
• Questions you ask (anonymized)
• What project you're working on (e.g., "React app")
• Your level/class from the tutorial (if applicable)

WHAT WE DON'T TRACK:
• Your actual code
• Project names or file contents
• Personal information

You can disable this anytime:
/global-tracking off

[Yes, help improve the platform] [No thanks]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Opt-out command:**

```bash
# Disable global tracking
claude --global-tracking off

# Re-enable
claude --global-tracking on

# Check status
claude --global-tracking status
```

### 4. Data Structure

**Extended `learning_questions` table:**

```sql
CREATE TABLE learning_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  asked_at TIMESTAMP DEFAULT NOW(),

  -- Tutorial context (if in tutorial folder)
  in_tutorial BOOLEAN DEFAULT false,
  module INTEGER,
  lesson INTEGER,
  task INTEGER,
  student_level INTEGER,
  student_class TEXT,

  -- Real-world project context (if outside tutorial)
  project_type TEXT, -- 'react', 'nextjs', 'python', 'express', etc.
  project_cwd TEXT, -- Hashed folder path (for anonymization)
  files_in_context TEXT[], -- Types of files being worked on

  -- Common fields
  context JSONB,
  session_id TEXT, -- Anonymized
  question_type TEXT, -- Added by AI analysis
  topic_tags TEXT[], -- Added by AI analysis
  severity TEXT
);

CREATE INDEX idx_questions_project_type ON learning_questions (project_type);
CREATE INDEX idx_questions_in_tutorial ON learning_questions (in_tutorial);
CREATE INDEX idx_questions_graduate ON learning_questions (student_level, in_tutorial);
```

---

## Analytics Insights

### Dashboard View: "Real-World Skills Gap"

```
╔═══════════════════════════════════════════════════════════╗
║  🌍 REAL-WORLD LEARNING INSIGHTS                          ║
╠═══════════════════════════════════════════════════════════╣
║                                                           ║
║  📊 Questions by Location:                                ║
║    • Inside tutorial: 2,456 questions (35%)               ║
║    • Outside tutorial: 4,578 questions (65%)              ║
║                                                           ║
║    → Most learning happens in REAL projects!              ║
║                                                           ║
║  🔥 Top Questions OUTSIDE Tutorial:                       ║
║    1. "How do environment variables work?" (456 asks)     ║
║       Project types: React (234), Next.js (178), Node (44)║
║       [Create Module] [Add to FAQ]                        ║
║                                                           ║
║    2. "How do I fix this CORS error?" (389 asks)          ║
║       Project types: Express (201), React (188)           ║
║       [Add to Deployment Module]                          ║
║                                                           ║
║    3. "What's the difference between dependencies         ║
║       and devDependencies?" (312 asks)                    ║
║       [Add to Package Management Lesson]                  ║
║                                                           ║
║  📈 Skills Transfer Analysis:                             ║
║    Module 8 (Git Basics):                                 ║
║      • Completed by: 1,000 students                       ║
║      • Real-world git questions after: 547 (55%)          ║
║      • Top gaps: "undo commit", "merge conflicts"         ║
║      → ⚠️ MODULE NEEDS IMPROVEMENT                        ║
║                                                           ║
║    Module 9 (Personal Website):                           ║
║      • Completed by: 856 students                         ║
║      • Real-world web questions after: 189 (22%)          ║
║      → ✅ SKILLS TRANSFERRED WELL                         ║
║                                                           ║
║  🎯 Recommended New Modules:                              ║
║    • "Environment Variables & Config" (456 real asks)     ║
║    • "Debugging CORS Issues" (389 real asks)              ║
║    • "React Hooks Deep Dive" (334 real asks)              ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
```

### Graduation Success Metric

**The ultimate measure: Do students become self-sufficient?**

```sql
-- Students who rarely need help after graduating
SELECT
  student_id,
  student_class,
  COUNT(*) as questions_after_graduation
FROM learning_questions
WHERE student_level >= 8 -- Graduated
  AND in_tutorial = false
  AND asked_at > graduation_date + INTERVAL '30 days'
GROUP BY student_id, student_class
ORDER BY questions_after_graduation ASC;
```

**Success tiers:**
- **0-5 questions/month:** Self-sufficient (goal!)
- **6-15 questions/month:** Still learning (normal)
- **16+ questions/month:** Struggling (need support)

For the struggling group, analyze:
- What topics do they ask about?
- Did they skip modules?
- Were certain lessons ineffective?
- Do they need a "refresher" path?

---

## New Features This Enables

### 1. "Alumni Support" Mode

**For graduated students working on real projects:**

```
You: "How do I deploy this to AWS?"

Claude:
"Hey! I see you graduated Claude Code 101 (congrats!).

This is outside the core curriculum, but I can help.
I'll also log this as a common post-graduation need.

Here's how to deploy to AWS..."

[Question logged as: graduate_gap]
```

### 2. "Skills Bridge" Recommendations

**After detecting repeated questions from graduates:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 NEW BONUS MODULE AVAILABLE!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Based on questions from 234 graduates,
we created a new module:

"Environment Variables & Configuration"

This covers the #1 thing graduates ask about
when building real projects.

Type: /bonus modules
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 3. Technology Demand Signals

**Track what students are actually building:**

```sql
-- What tech are students using after graduation?
SELECT
  project_type,
  COUNT(DISTINCT session_id) as students_using,
  COUNT(*) as total_questions
FROM learning_questions
WHERE in_tutorial = false
  AND student_level >= 8
  AND asked_at > NOW() - INTERVAL '90 days'
GROUP BY project_type
ORDER BY students_using DESC;
```

**Results:**
```
react       - 456 students (789 questions)  → Add React module!
nextjs      - 334 students (567 questions)  → High demand
express     - 289 students (445 questions)  → Backend popular
python      - 123 students (234 questions)  → Lower priority
tailwind    - 401 students (312 questions)  → CSS framework demand
```

**Action:** Build modules for the top technologies students ACTUALLY use.

### 4. Real-World Difficulty Prediction

**Warn students about tricky transitions:**

```
You just completed Module 8 (Git Basics)!

⚠️ Heads up: 55% of students ask follow-up git
questions when building real projects.

Common stumbling blocks:
• Undoing commits
• Handling merge conflicts
• Working with branches in teams

We recommend: Module 8.5 (Git Survival Guide)
before starting your first team project.
```

---

## Privacy Safeguards

### What We Track:
✅ Anonymized questions
✅ Project type ("React app")
✅ Tutorial progress (level, class)
✅ Timestamp & context

### What We DON'T Track:
❌ Project names
❌ File names or code content
❌ Personal information
❌ Specific folder paths (hashed only)
❌ Company/client names

### User Controls:
- **Opt-in required:** Must consent explicitly
- **Easy opt-out:** `/global-tracking off` forever
- **Transparency:** Show what's being tracked
- **Data retention:** Auto-delete after 1 year
- **Right to delete:** `/delete my-global-data`

---

## Implementation Plan

### Phase 1: MCP Global Hook (Week 1)
- Build MCP server that logs questions
- Install globally (works in all projects)
- Test with consent flow
- Privacy controls

**Ship with:**
- `/global-tracking on/off` command
- Consent prompt on first use

### Phase 2: Real-World Analytics (Week 2)
- Extend Supabase schema
- Build "Real-World Insights" dashboard
- Track graduation success rates
- Detect curriculum gaps

**Ship with:**
- Maintainer dashboard showing real-world questions
- "Skills transfer" metrics

### Phase 3: Auto-Curriculum (Week 3)
- AI analysis of real-world questions
- Auto-generate "bonus modules" for common gaps
- Recommend modules based on real usage
- "Alumni support" mode

**Ship with:**
- Bonus module suggestions
- Graduate support features

### Phase 4: Feedback Loop (Week 4+)
- Students see their question patterns
- "You ask a lot about React - here are resources"
- Personalized learning paths post-graduation
- Continuous improvement

---

## Success Metrics

**Platform Intelligence:**
1. **Curriculum completeness:** % of real questions covered
2. **Graduate self-sufficiency:** Questions/month after graduation
3. **Skills transfer rate:** % still asking about completed modules
4. **Technology alignment:** Do modules match real usage?

**Target Goals:**
- 80% of real-world questions addressed in curriculum
- Graduates ask <10 questions/month after 90 days
- <30% still asking about completed module topics
- Top 5 technologies have dedicated modules

---

## Why This Changes Everything

**Most tutorials:**
- Teach in isolation
- Hope skills transfer
- Never know if graduates succeed
- Curriculum based on instructor assumptions

**This platform:**
- **Sees real-world application** (not just tutorial performance)
- **Validates skills transfer** (do they still ask after graduating?)
- **Adapts to reality** (what do people ACTUALLY build?)
- **Closes the loop** (tutorial → real project → improve tutorial)

This is the future of learning platforms. No one else does this.

---

## Next Steps

Ready to build it? We can:

1. **Create the MCP server** - Global question tracker
2. **Set up consent flow** - Privacy-first onboarding
3. **Build analytics dashboard** - Real-world insights view
4. **Add to CLAUDE.md** - Integration with teaching

Want to start? I can build the MCP server right now! 🚀
