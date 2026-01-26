-- Phase 6: Graduate Tracking Schema
-- Tracks completion status and enables graduate question analysis

-- Graduate status table (links anonymous user to completion state)
CREATE TABLE graduate_status (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) UNIQUE,
  completed_at TIMESTAMPTZ,
  modules_completed INTEGER DEFAULT 0,
  total_xp INTEGER DEFAULT 0,
  class_selected TEXT,
  project_completed BOOLEAN DEFAULT FALSE,
  synced_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_graduate_status_user ON graduate_status(user_id);
CREATE INDEX idx_graduate_status_completed ON graduate_status(completed_at);

-- RLS for graduate status
ALTER TABLE graduate_status ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see own status"
ON graduate_status FOR SELECT
TO authenticated
USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users update own status"
ON graduate_status FOR INSERT
TO authenticated
WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can update own status"
ON graduate_status FOR UPDATE
TO authenticated
USING ((SELECT auth.uid()) = user_id);

-- Graduate insights aggregate table
CREATE TABLE graduate_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  week_starting DATE NOT NULL UNIQUE,
  total_graduates INTEGER DEFAULT 0,
  graduate_questions INTEGER DEFAULT 0,
  top_graduate_topics JSONB, -- { react: 45, debugging: 32, ... }
  common_struggles JSONB, -- Questions graduates still ask
  skill_gaps JSONB, -- Topics not covered by tutorial that graduates need
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_graduate_insights_week ON graduate_insights(week_starting);

-- Update questions table to support graduate flagging
-- (Column already exists from 001_questions_schema.sql, this is a no-op if already there)
-- ALTER TABLE questions ADD COLUMN IF NOT EXISTS is_graduate BOOLEAN DEFAULT FALSE;

-- Function to check if user is graduate
CREATE OR REPLACE FUNCTION is_user_graduate(check_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM graduate_status
    WHERE user_id = check_user_id
    AND completed_at IS NOT NULL
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
