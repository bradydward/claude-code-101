# Global Learning Intelligence System

## The Vision

Every question a student asks gets anonymously tracked in the cloud. The system analyzes patterns across ALL users to automatically:

- Identify common confusion points
- Generate new lessons for frequently asked questions
- Prioritize curriculum improvements based on real data
- Provide better hints to future students
- Make Claude smarter at teaching over time

**The more people use it, the better it gets at teaching.**

---

## How It Works

### 1. Question Capture (In-Game)

**When a student asks a question during a lesson:**

```
Student: "What's a file path?"
Claude: [Answers clearly]
Claude: [Behind the scenes - logs to cloud]
```

**Data captured:**
```json
{
  "question": "What's a file path?",
  "asked_at": "2026-01-24T10:30:00Z",
  "module": 1,
  "lesson": 2,
  "task": 3,
  "student_level": 0,
  "student_class": null,
  "context": {
    "previous_command": "cd Desktop",
    "error_occurred": false,
    "attempts_so_far": 2
  },
  "session_id": "anonymous_hash_12345"
}
```

**Privacy:**
- No usernames, emails, or personal data
- Just anonymous session IDs
- Students can opt-out in settings

### 2. Cloud Aggregation (Backend)

**Supabase table: `learning_questions`**

```sql
CREATE TABLE learning_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  asked_at TIMESTAMP DEFAULT NOW(),
  module INTEGER,
  lesson INTEGER,
  task INTEGER,
  student_level INTEGER,
  student_class TEXT,
  context JSONB,
  session_id TEXT,

  -- Enrichment (added by AI analysis)
  question_type TEXT, -- 'concept', 'tool', 'workflow', 'error', 'meta'
  topic_tags TEXT[], -- ['paths', 'navigation', 'filesystem']
  severity TEXT, -- 'critical', 'common', 'rare'
  resolved BOOLEAN DEFAULT false,
  resolution_added_at TIMESTAMP
);

CREATE INDEX idx_questions_module ON learning_questions (module, lesson, task);
CREATE INDEX idx_questions_topic ON learning_questions USING GIN (topic_tags);
CREATE INDEX idx_questions_time ON learning_questions (asked_at DESC);
```

**Aggregated views:**

```sql
-- Most asked questions
CREATE VIEW top_questions AS
SELECT
  question,
  COUNT(*) as ask_count,
  module,
  lesson,
  task,
  array_agg(DISTINCT topic_tags) as topics
FROM learning_questions
WHERE asked_at > NOW() - INTERVAL '30 days'
GROUP BY question, module, lesson, task
ORDER BY ask_count DESC
LIMIT 100;

-- Confusion hotspots
CREATE VIEW confusion_points AS
SELECT
  module,
  lesson,
  task,
  COUNT(DISTINCT session_id) as unique_students,
  COUNT(*) as total_questions,
  array_agg(DISTINCT question) as common_questions
FROM learning_questions
GROUP BY module, lesson, task
HAVING COUNT(DISTINCT session_id) > 10
ORDER BY total_questions DESC;
```

### 3. AI Analysis (Daily Batch Job)

**Every night, an AI job processes new questions:**

```python
# Pseudo-code
async def analyze_new_questions():
  questions = get_questions_since_last_run()

  for question in questions:
    # Use Claude API to categorize
    analysis = await anthropic.messages.create(
      model="claude-3-5-haiku-20241022",
      messages=[{
        "role": "user",
        "content": f"""
        Analyze this student question from a coding tutorial:

        Question: "{question.text}"
        Context: Module {question.module}, Lesson {question.lesson}

        Classify:
        1. Type: concept/tool/workflow/error/meta
        2. Topic tags: (e.g., 'paths', 'git', 'terminal')
        3. Severity: critical/common/rare
        4. Suggested lesson title to address this

        Return JSON.
        """
      }]
    )

    # Update question with enrichment
    update_question(question.id, analysis)

  # Cluster similar questions
  clusters = cluster_similar_questions(questions)

  # Generate curriculum suggestions
  for cluster in clusters:
    if cluster.size > 50:  # 50+ students asked similar question
      suggest_new_lesson(cluster)
```

**Output:**
- "147 students asked about file paths in Module 1 → Add explicit path lesson"
- "89 students confused about git staging in Module 8 → Improve staging explanation"
- "203 students asked 'what does ~ mean?' → Add shell symbols reference"

### 4. Curriculum Auto-Improvement

**Two modes:**

#### Mode A: Manual Review (Phase 1)
- Weekly email to maintainer: "Top 10 questions this week"
- Maintainer reviews, decides which to address
- Adds lessons to curriculum.md manually

#### Mode B: Auto-Generation (Phase 2)
- System auto-generates lesson drafts
- Uses AI to create:
  - Lesson title
  - Learning objectives
  - Task breakdown
  - Common mistakes section
- Maintainer reviews and approves

**Example auto-generated lesson:**

```markdown
# Module 1, Lesson 2a: Understanding File Paths (Auto-Generated)

**Why this lesson exists:**
203 students asked "What does ~ mean?" during navigation lessons.

**Learning objectives:**
- Understand absolute vs relative paths
- Know common path symbols (~, ., .., /)
- Navigate using paths confidently

**Tasks:**

1. **Learn the symbols**
   - ~ means home directory
   - . means current directory
   - .. means parent directory
   - / means root (or separates folders)

2. **Practice with pwd**
   Type pwd to see where you are.
   You'll see something like: /Users/yourname

3. **Use ~ shortcut**
   Type: cd ~
   Type: pwd
   See? You're home!

4. **Navigate with paths**
   Type: cd ~/Desktop
   Type: pwd
   You jumped straight to Desktop!

**Common mistakes (from student data):**
- Typing ~/ instead of ~ alone (both work!)
- Confusing .. with . (.. goes up, . stays here)

**Quick reference:**
~ = /Users/yourname
. = wherever you are now
.. = one folder up
/ = the very top of your computer
```

### 5. Smart Hints (Real-Time)

**When a student gets stuck, the system checks:**

```python
# In CLAUDE.md teaching logic
def provide_hint(student, current_task):
  # Check: Have other students struggled here?
  common_questions = get_common_questions(
    module=current_task.module,
    lesson=current_task.lesson,
    task=current_task.task,
    min_ask_count=10
  )

  if common_questions:
    # Proactively address common confusion
    return f"""
    Many students get stuck here! Common questions:

    • {common_questions[0].question}
      → {common_questions[0].quick_answer}

    • {common_questions[1].question}
      → {common_questions[1].quick_answer}

    Does one of these help?
    """

  # Check: Has THIS student asked about related topics?
  student_history = get_student_questions(student.id)
  related = find_related_questions(student_history, current_task.topics)

  if related:
    return f"""
    Remember when you asked about {related.topic}?
    This is related - {explain_connection()}
    """
```

### 6. Analytics Dashboard (Web)

**For maintainers/teachers:**

```
╔═══════════════════════════════════════════════════════════╗
║  📊 LEARNING INTELLIGENCE DASHBOARD                       ║
╠═══════════════════════════════════════════════════════════╣
║                                                           ║
║  📈 This Week:                                            ║
║    • 1,247 students active                                ║
║    • 423 questions asked                                  ║
║    • 3 new confusion hotspots detected                    ║
║                                                           ║
║  🔥 Top Questions (Last 30 Days):                         ║
║    1. "What's a file path?" (203 asks) → Module 1.2       ║
║       [Generate Lesson] [Mark Resolved]                   ║
║                                                           ║
║    2. "How does git staging work?" (147 asks) → Module 8  ║
║       [Improve Existing] [Add Example]                    ║
║                                                           ║
║    3. "What does ~ mean?" (89 asks) → Module 1.2          ║
║       [Add to Cheat Sheet] [Quick Hint]                   ║
║                                                           ║
║  🗺️ Confusion Heatmap:                                    ║
║    Module 1: ████░░░░ (moderate)                          ║
║    Module 2: ██░░░░░░ (low)                               ║
║    Module 8: ███████░ (high - needs revision!)            ║
║                                                           ║
║  🎯 Suggested Improvements:                               ║
║    • Add "File Paths Explained" to Module 1               ║
║    • Expand git staging explanation in Module 8           ║
║    • Create "Common Shell Symbols" reference              ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
```

**For students (on their profile page):**

```
╔═══════════════════════════════════════════════════════════╗
║  💡 YOUR LEARNING INSIGHTS                                ║
╠═══════════════════════════════════════════════════════════╣
║                                                           ║
║  Questions You've Asked: 12                               ║
║                                                           ║
║  Your Top Topics:                                         ║
║    • Git (4 questions)                                    ║
║    • File paths (3 questions)                             ║
║    • Terminal navigation (2 questions)                    ║
║                                                           ║
║  🎓 Suggested Bonus Lessons:                              ║
║    Based on your questions, try these:                    ║
║    • "Git Deep Dive" (addresses 3 of your questions)      ║
║    • "Mastering File Paths" (answers your path confusion) ║
║                                                           ║
║  🤝 You're Not Alone:                                     ║
║    • 89% of students also asked about git staging         ║
║    • 67% asked about file paths                           ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
```

---

## Implementation Phases

### Phase 1: Basic Tracking (Week 1)
- Add question logging to CLAUDE.md
- Sync questions to Supabase
- Manual review of top questions
- Privacy opt-in/out

**Ship with:**
- `/questions` command shows student's history
- Privacy toggle in settings

### Phase 2: Analysis & Insights (Week 2-3)
- AI categorization of questions (nightly job)
- Analytics dashboard (web)
- Confusion heatmap
- Top questions view

**Ship with:**
- Maintainer dashboard
- Weekly email digest

### Phase 3: Auto-Improvement (Week 4+)
- AI-generated lesson suggestions
- Smart hints based on common questions
- Curriculum gap detector
- Student-specific recommendations

**Ship with:**
- "Suggested Lessons" on profile
- Real-time hints when stuck

### Phase 4: Advanced Intelligence (Future)
- Predictive: "Students who struggled here also struggled with X"
- A/B testing: Try different explanations, see which reduces questions
- Personalized learning paths: "Based on your questions, here's your optimal path"
- Voice of the student: "147 students would like more examples in Module 8"

---

## Privacy & Ethics

### Strict Rules:
1. **No PII:** Never collect names, emails, or identifiable data
2. **Opt-in by default:** Ask permission first time
3. **Easy opt-out:** `/sync questions off` disables forever
4. **Transparent:** Show students what's collected
5. **Data retention:** Delete after 1 year
6. **Anonymization:** Hash session IDs
7. **Right to delete:** `/delete my-questions` wipes all

### Consent Flow:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 HELP IMPROVE THE CURRICULUM?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

We'd like to track questions students ask to:
✅ Identify confusing lessons
✅ Add missing explanations
✅ Help future students avoid confusion

We collect:
• Your questions (anonymized)
• When/where you asked
• What you were working on

We DON'T collect:
• Your name or email
• Code you write
• Personal information

You can disable this anytime: /sync questions off

[Yes, help improve it] [No thanks]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Technical Architecture

```
┌─────────────────────────────────────────────────────────┐
│  Student's Terminal (Claude Code)                      │
│  ┌───────────────────────────────────────────────────┐ │
│  │  Student: "What's a file path?"                   │ │
│  │  Claude: [Answers] + [Logs question]              │ │
│  └───────────────────────────────────────────────────┘ │
└────────────────────┬────────────────────────────────────┘
                     │ Sync (if enabled)
                     ↓
┌─────────────────────────────────────────────────────────┐
│  Supabase Cloud Database                                │
│  ┌───────────────────────────────────────────────────┐ │
│  │  learning_questions table                         │ │
│  │  (anonymized question data)                       │ │
│  └───────────────────────────────────────────────────┘ │
└────────────────────┬────────────────────────────────────┘
                     │ Nightly batch
                     ↓
┌─────────────────────────────────────────────────────────┐
│  AI Analysis Service (Serverless Function)              │
│  ┌───────────────────────────────────────────────────┐ │
│  │  • Categorize questions (Claude API)              │ │
│  │  • Cluster similar questions                      │ │
│  │  • Detect confusion hotspots                      │ │
│  │  • Generate lesson suggestions                    │ │
│  └───────────────────────────────────────────────────┘ │
└────────────────────┬────────────────────────────────────┘
                     │ Updates
                     ↓
┌─────────────────────────────────────────────────────────┐
│  Curriculum Intelligence Database                       │
│  ┌───────────────────────────────────────────────────┐ │
│  │  • Top questions (aggregated)                     │ │
│  │  • Confusion heatmap                              │ │
│  │  • Suggested improvements                         │ │
│  │  • Generated lesson drafts                        │ │
│  └───────────────────────────────────────────────────┘ │
└──────────┬─────────────────────────┬────────────────────┘
           │                         │
           ↓                         ↓
┌──────────────────────┐  ┌──────────────────────────────┐
│  Maintainer          │  │  Next Student's Session      │
│  Dashboard (Web)     │  │  (Gets smarter hints!)       │
│                      │  │                              │
│  • Review questions  │  │  "Many students ask about    │
│  • Approve lessons   │  │  X - here's a quick hint..." │
│  • Track metrics     │  │                              │
└──────────────────────┘  └──────────────────────────────┘
```

---

## Cost Estimate

**For 1,000 active students:**

**Storage (Supabase):**
- ~10 questions per student = 10,000 questions/month
- ~500 bytes per question = 5MB/month
- Cost: $0 (well within free tier)

**AI Analysis (Claude Haiku):**
- Process 10,000 questions nightly
- ~200 tokens per question (categorization)
- Input: 2M tokens/month = $0.50
- Output: 1M tokens/month = $1.25
- **Total: ~$1.75/month**

**Extremely affordable!**

---

## Success Metrics

**Track effectiveness:**

1. **Question Reduction Rate**
   - If lesson added for "What's a path?", do fewer students ask it?
   - Target: 50% reduction after improvement

2. **Student Success Rate**
   - Do students complete tasks faster after hints added?
   - Target: 20% increase in first-try success

3. **Curriculum Coverage**
   - % of top 100 questions addressed in curriculum
   - Target: 80% coverage

4. **Student Satisfaction**
   - Do students feel less confused?
   - Survey: "How often did you get stuck?" (1-5 scale)
   - Target: 4.0+ average

---

## Integration with Game

**New commands:**

- `/questions` - See your question history
- `/questions top` - See most asked questions globally
- `/questions suggest` - Get personalized lesson recommendations
- `/sync questions on/off` - Control tracking

**New features:**

- **Smart Hints:** "Many students get stuck here - here's a tip..."
- **Bonus Lessons:** Auto-generated based on common questions
- **Learning Profile:** "You tend to ask about git - here are resources"

**In CLAUDE.md:**

Add to teaching flow:
```python
# After student asks a question
if sync_enabled and question_is_pedagogical:
  log_question_to_cloud({
    question: student_question,
    context: current_task_context
  })
```

---

## Next Steps

Ready to build this? I can:

1. **Set up question tracking** - Add to CLAUDE.md + progress.json
2. **Create Supabase schema** - Database tables for questions
3. **Build analytics dashboard** - Web view of top questions
4. **Implement AI analysis** - Nightly categorization job
5. **Add smart hints** - Use question data in teaching

Which should we tackle first?
