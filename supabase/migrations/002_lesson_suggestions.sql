-- Lesson suggestions table
CREATE TABLE lesson_suggestions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  question_count INTEGER NOT NULL,
  lesson_title TEXT NOT NULL,
  lesson_summary TEXT,
  target_module TEXT,
  priority TEXT,
  addresses TEXT,
  status TEXT DEFAULT 'pending', -- pending, accepted, rejected
  created_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  reviewer_notes TEXT
);

CREATE INDEX idx_suggestions_status ON lesson_suggestions(status);
CREATE INDEX idx_suggestions_priority ON lesson_suggestions(priority);
