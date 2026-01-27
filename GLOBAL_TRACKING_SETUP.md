# Global Question Tracking - Quick Setup

## What This Is

Lightweight global question tracking that works across ALL your Claude Code sessions (any folder, any project). Questions get logged to a central file and will feed into the Phase 6 analytics system.

---

## ✅ Setup Complete!

Global question log created at:
```
/Users/bradyward/.claude-code-global-questions.json
```

This file is in your home directory, so ALL Claude sessions can access it.

---

## How to Enable in Any Session

### Option 1: Add to Custom Instructions (Recommended)

Add this to your Claude Code custom instructions (Settings → Custom Instructions):

```markdown
# Question Tracking for Learning Intelligence

When I ask a pedagogical question (What is..., How do I..., Why..., error help), log it to improve the Claude Code 101 curriculum.

**After answering any pedagogical question:**

1. Read `/Users/bradyward/.claude-code-global-questions.json`
2. Append to `questions` array:
   ```json
   {
     "question": "[the question]",
     "asked_at": "[ISO timestamp]",
     "context": {
       "working_directory": "[current directory]",
       "project_type": "[detected: react/node/python/unknown]",
       "topic_tags": ["[relevant]", "[tags]"],
       "question_type": "[concept/tool/workflow/error]"
     }
   }
   ```
3. Write updated JSON

**Don't log:**
- Imperative requests ("Write a function...")
- General chat
- Non-technical questions
```

### Option 2: Paste This at Start of Each Session

Copy/paste this into any Claude Code session:

```
Hey! Quick setup: I'm collecting pedagogical questions to improve Claude Code 101.

When I ask learning questions (What is X?, How do I...?, Why...?, error help),
please log them to: /Users/bradyward/.claude-code-global-questions.json

Format:
{
  "question": "...",
  "asked_at": "timestamp",
  "context": {
    "working_directory": "...",
    "project_type": "...",
    "topic_tags": ["..."]
  }
}

Thanks! This helps build a smarter learning platform.
```

### Option 3: Project-Specific (Claude Code 101 Only)

Already enabled! This project's `CLAUDE.md` now logs to the global file automatically.

---

## Viewing Your Global Questions

### From ANY folder:

```bash
# Pretty print all questions
cat ~/.claude-code-global-questions.json | python3 -m json.tool

# Count total questions
cat ~/.claude-code-global-questions.json | grep -o '"question"' | wc -l

# See recent questions (last 5)
cat ~/.claude-code-global-questions.json | python3 -c "
import json, sys
data = json.load(sys.stdin)
for q in data['questions'][-5:]:
    print(f\"• {q['question']} ({q['context'].get('project_type', 'unknown')})\")
"
```

### From Claude Code 101:

Just type: `questions`

(It will show both local AND global questions)

---

## What Gets Tracked

**✅ Tracked:**
- "What is a file path?"
- "How do I use git?"
- "Why does this error happen?"
- "What's the difference between X and Y?"

**❌ Not Tracked:**
- "Write a function that..."
- "How are you?"
- "What's the weather?"

**Privacy:**
- No code/file contents
- No personal information
- Just questions + context
- Stored locally (cloud sync in Phase 6)

---

## Analytics (Coming in Phase 6)

Once we have enough data, we'll build:
- Top questions dashboard
- Curriculum gap detection
- Technology trend analysis
- Auto-generated lessons
- Real-world vs tutorial comparison

---

## Test It Right Now

1. Open Claude in another project folder
2. Use Option 2 (paste the setup snippet)
3. Ask a real question about that project
4. Come back here and type `questions`
5. You'll see questions from BOTH sessions!

---

## Next Steps

**Today (MVP):**
- ✅ Global log file created
- ✅ Instructions for other sessions
- ⏳ Start collecting real data

**Phase 6 (Full System):**
- Automatic tracking (no setup needed)
- Cloud sync (Supabase)
- AI analysis and categorization
- Analytics dashboard
- Auto-lesson generation

---

*Global tracking enabled: 2026-01-24*
