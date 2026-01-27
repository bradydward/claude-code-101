# Learning Gaps & Questions Log

This document tracks questions asked by students that reveal knowledge gaps. These gaps inform curriculum improvements and personalized learning paths.

---

## Session: 2026-01-24

### Student: Brady

**Questions Asked:**

*(Questions will be logged here as they come)*

---

## How This Gets Used in the Game

### 1. **Adaptive Curriculum**
- If multiple students ask the same question → Add a lesson/task
- If a question reveals a prerequisite gap → Add earlier foundation lesson

### 2. **Personalized Path** (Future Feature)
- Track individual student questions in `progress.json`
- Generate bonus lessons tailored to their gaps
- "Based on your questions, here's a custom lesson on X"

### 3. **Smart Hints**
- When student gets stuck, check their question history
- Offer hints that connect to concepts they've asked about before
- "Remember when you asked about X? This is related..."

### 4. **Curriculum Validation**
- Questions reveal what the curriculum missed
- If many ask "What's a terminal?" after Module 1 → Module 1 failed
- Continuous improvement loop

---

## Integration Plan

### Phase 1: Manual Tracking (Now)
- Log questions in this document
- Identify patterns
- Add missing lessons to curriculum.md

### Phase 2: Automated Tracking
- Add `questions_asked` array to progress.json
- Claude logs questions automatically during lessons
- Structure:
  ```json
  "questions_asked": [
    {
      "question": "What's a path?",
      "asked_at": "2026-01-24T10:30:00Z",
      "module": 1,
      "lesson": 2,
      "context": "During navigation lesson"
    }
  ]
  ```

### Phase 3: Adaptive Response
- If student asks "What's X?" during lesson
- Claude checks: Did curriculum already cover X?
- If yes: "We covered this in M2.L3 - want a refresher?"
- If no: "Great question! Let me add a quick explainer..."

### Phase 4: Analytics Dashboard (Web)
- Show instructor: "Most asked questions this week"
- Heatmap of confusion points in curriculum
- Student profile: "Strengths: Git | Gaps: File paths"

---

## Question Categories

Track questions by type to identify curriculum weaknesses:

**Foundational Concepts**
- "What's a terminal?"
- "What's a file path?"
- "What does ~ mean?"

**Tool-Specific**
- "How does git work?"
- "What's the difference between npm and node?"

**Workflow/Process**
- "When should I commit?"
- "How do I know if my code works?"

**Troubleshooting**
- "Why isn't this working?"
- "What does this error mean?"

**Meta/Strategy**
- "What should I learn next?"
- "Is this the right way to do it?"

---

## Notes

- Questions are learning signals, not failures
- The best curriculum minimizes "obvious" questions (e.g., "What just happened?")
- But maximizes "deep" questions (e.g., "Why does git use staging?")
