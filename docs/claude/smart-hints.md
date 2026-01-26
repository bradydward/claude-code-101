# Smart Hints System (INTEL-07)

## Overview

The smart hints system uses global question data to proactively help students at confusion hotspots. When many students struggle with a concept, Claude surfaces a contextual hint before the student asks.

## How It Works

1. **Data Source:** Weekly aggregates from `question_aggregates.module_confusion`
2. **Trigger:** Student reaches a task where many others have struggled
3. **Display:** Subtle hint appears without interrupting flow
4. **Privacy:** Hints reference aggregate patterns, never individual questions

## Common Struggle Hints

Hints are triggered when entering a module/lesson with high confusion scores:

### Module 1 (Terminal Basics)
| Task | Trigger | Hint |
|------|---------|------|
| 1.2.* | paths_confusion > 10 | "Tip: Many students find paths tricky at first. Think of ~ as 'home' and / as separating folders." |
| 1.3.* | cd_confusion > 10 | "Heads up: cd can be confusing. Remember: no slashes = folder in current location, leading / = absolute path." |

### Module 2 (Installation)
| Task | Trigger | Hint |
|------|---------|------|
| 2.1.* | npm_confusion > 15 | "Note: Many students ask about npm. Think of it as an 'app store' for code tools." |
| 2.2.* | api_key_confusion > 10 | "FYI: API keys confuse a lot of students. It's like a password that lets programs use services." |

### Module 3 (First Conversations)
| Task | Trigger | Hint |
|------|---------|------|
| 3.2.* | prompt_confusion > 10 | "Pro tip: Many students struggle with prompts. Be specific! 'Create a blue button' works better than 'make something nice.'" |

### Module 4 (Models)
| Task | Trigger | Hint |
|------|---------|------|
| 4.1.* | model_confusion > 10 | "Insight: Students often ask which model to use. Haiku = fast/cheap, Sonnet = balanced, Opus = complex tasks." |

### Module 7 (Technical Foundations)
| Task | Trigger | Hint |
|------|---------|------|
| 7.1.* | json_confusion > 15 | "Heads up: JSON trips up many students. Watch for missing commas and matching brackets!" |
| 7.3.* | permission_confusion > 10 | "Note: Permission errors confuse many. 'Permission denied' usually means you need sudo or different ownership." |

## Hint Display Pattern

```
┌───────────────────────────────────────┐
│ 💡 Many students find this tricky...  │
│                                       │
│ [Contextual tip based on global data] │
└───────────────────────────────────────┘
```

**Styling:**
- Subtle background (not alarming)
- Brief (1-2 sentences max)
- Actionable (gives concrete advice)
- Appears BEFORE student asks (proactive)

## Implementation

**In CLAUDE.md teaching flow:**

Before presenting a task, check if current position matches a high-confusion area:

```javascript
// Pseudo-code for hint check
function shouldShowHint(module, lesson, task) {
  const aggregates = getWeeklyAggregates();
  const confusionScore = aggregates.module_confusion[`module_${module}`];

  // Threshold: show hint if 10+ questions in this module
  if (confusionScore >= 10) {
    return getHintForPosition(module, lesson, task);
  }
  return null;
}
```

**Hint Storage:**
- Hints defined in this file (static, curated)
- Triggered by live aggregate data
- Can be updated based on dashboard insights

## Adding New Hints

When dashboard shows a new confusion hotspot:

1. Check `question_aggregates.top_10_questions` for common questions
2. Identify the module/lesson/task where confusion occurs
3. Write a 1-2 sentence hint addressing the root cause
4. Add to the appropriate module table above
5. Test that hint appears at correct position

## Hint Frequency

- Show max 1 hint per lesson (avoid hint fatigue)
- Don't repeat hints student has already seen (track in session)
- Hints are supplementary - never replace teaching

## Privacy Considerations

- Hints NEVER mention specific students or their questions
- Use aggregate language: "Many students...", "A common question is..."
- Hints are about patterns, not individuals
