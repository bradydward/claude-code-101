-- Phase 6: Global Learning Intelligence - Questions Schema
-- Source: 06-RESEARCH.md Example 1

-- Questions table (individual anonymous question logs)
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  asked_at TIMESTAMPTZ NOT NULL, -- Rounded to hour for anonymity
  context JSONB NOT NULL, -- { module, lesson, task, topic_tags }
  category TEXT, -- Filled by nightly categorization (topic)
  severity TEXT, -- minor_confusion | moderate_gap | critical_blocker
  type TEXT, -- conceptual | procedural | troubleshooting
  technologies TEXT[] DEFAULT '{}', -- Technology keywords extracted during categorization
  user_id UUID REFERENCES auth.users(id), -- Anonymous user
  synced_at TIMESTAMPTZ DEFAULT NOW(),
  is_graduate BOOLEAN DEFAULT FALSE -- True if asked after tutorial completion
);

-- Performance indexes (100x speedup for RLS - research Pitfall 3)
CREATE INDEX idx_questions_user_id ON questions(user_id);
CREATE INDEX idx_questions_category ON questions(category);
CREATE INDEX idx_questions_asked_at ON questions(asked_at);
CREATE INDEX idx_questions_is_graduate ON questions(is_graduate);

-- Enable RLS
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users see only their own questions
-- Using (SELECT auth.uid()) pattern for caching (research Pitfall 3)
CREATE POLICY "Users see own questions"
ON questions FOR SELECT
TO authenticated
USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users insert own questions"
ON questions FOR INSERT
TO authenticated
WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users delete own questions"
ON questions FOR DELETE
TO authenticated
USING ((SELECT auth.uid()) = user_id);

-- Aggregate table for dashboard (NO RLS - instructor access only)
-- Stores weekly rollups, not individual questions
CREATE TABLE question_aggregates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  week_starting DATE NOT NULL UNIQUE,
  top_10_questions JSONB, -- Array of { question, count }
  module_confusion JSONB, -- { module_1: 23, module_2: 45, ... }
  technology_trends JSONB, -- { react: 456, nextjs: 234, ... }
  severity_breakdown JSONB, -- { minor: 100, moderate: 50, critical: 10 }
  total_questions INTEGER DEFAULT 0,
  total_students INTEGER DEFAULT 0,
  graduate_questions INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for weekly lookups
CREATE INDEX idx_aggregates_week ON question_aggregates(week_starting);

-- Function to aggregate questions weekly (called by Edge Function)
CREATE OR REPLACE FUNCTION aggregate_weekly_questions()
RETURNS void AS $$
DECLARE
  week_start DATE := date_trunc('week', NOW())::DATE;
BEGIN
  INSERT INTO question_aggregates (week_starting, total_questions, total_students, graduate_questions)
  SELECT
    week_start,
    COUNT(*),
    COUNT(DISTINCT user_id),
    COUNT(*) FILTER (WHERE is_graduate = TRUE)
  FROM questions
  WHERE asked_at >= week_start
  ON CONFLICT (week_starting)
  DO UPDATE SET
    total_questions = EXCLUDED.total_questions,
    total_students = EXCLUDED.total_students,
    graduate_questions = EXCLUDED.graduate_questions,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
