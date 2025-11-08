-- Digital Services Roadmap Dashboard - Supabase Schema
-- Migration: Initial Schema
-- Created: 2025-11-08

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- STRATEGIC THEMES
-- =============================================
CREATE TABLE strategic_themes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL CHECK (status IN ('on-track', 'in-progress', 'at-risk')),
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- INITIATIVES
-- =============================================
CREATE TABLE initiatives (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  theme_id UUID REFERENCES strategic_themes(id) ON DELETE CASCADE,
  description TEXT,
  completion_percentage INTEGER DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
  total_items INTEGER DEFAULT 0,
  completed_items INTEGER DEFAULT 0,
  status TEXT NOT NULL CHECK (status IN ('on-track', 'in-progress', 'at-risk', 'done', 'blocked', 'not-started')),
  priority TEXT CHECK (priority IN ('high', 'medium', 'low')),
  owner TEXT,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- BUSINESS REQUESTS
-- =============================================
CREATE TABLE business_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT NOT NULL UNIQUE, -- BR-1, BR-2, etc.
  title TEXT NOT NULL,
  description TEXT,
  initiative_id UUID REFERENCES initiatives(id) ON DELETE CASCADE,
  theme_id UUID REFERENCES strategic_themes(id) ON DELETE CASCADE,
  completion_percentage INTEGER DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
  status TEXT NOT NULL CHECK (status IN ('done', 'in-progress', 'blocked', 'not-started')),
  priority TEXT NOT NULL CHECK (priority IN ('high', 'medium', 'low')),
  owner TEXT,
  start_date DATE,
  end_date DATE,
  -- Status breakdown counts (derived from children)
  features_total INTEGER DEFAULT 0,
  features_done INTEGER DEFAULT 0,
  features_in_progress INTEGER DEFAULT 0,
  features_blocked INTEGER DEFAULT 0,
  features_not_started INTEGER DEFAULT 0,
  epics_total INTEGER DEFAULT 0,
  epics_done INTEGER DEFAULT 0,
  epics_in_progress INTEGER DEFAULT 0,
  epics_blocked INTEGER DEFAULT 0,
  epics_not_started INTEGER DEFAULT 0,
  stories_total INTEGER DEFAULT 0,
  stories_done INTEGER DEFAULT 0,
  stories_in_progress INTEGER DEFAULT 0,
  stories_blocked INTEGER DEFAULT 0,
  stories_not_started INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- FEATURES
-- =============================================
CREATE TABLE features (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  business_request_id UUID REFERENCES business_requests(id) ON DELETE CASCADE,
  theme_id UUID REFERENCES strategic_themes(id) ON DELETE CASCADE,
  completion_percentage INTEGER DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
  status TEXT NOT NULL CHECK (status IN ('done', 'in-progress', 'blocked', 'not-started')),
  priority TEXT CHECK (priority IN ('high', 'medium', 'low')),
  owner TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  epic_count INTEGER DEFAULT 0,
  completed_epics INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- EPICS
-- =============================================
CREATE TABLE epics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  feature_id UUID REFERENCES features(id) ON DELETE CASCADE,
  business_request_id UUID REFERENCES business_requests(id) ON DELETE CASCADE,
  theme_id UUID REFERENCES strategic_themes(id) ON DELETE CASCADE,
  completion_percentage INTEGER DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
  status TEXT NOT NULL CHECK (status IN ('done', 'in-progress', 'blocked', 'not-started')),
  priority TEXT CHECK (priority IN ('high', 'medium', 'low')),
  owner TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  story_count INTEGER DEFAULT 0,
  completed_stories INTEGER DEFAULT 0,
  feature_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  -- Constraint: Epic must belong to either Feature OR Business Request (but not both)
  CONSTRAINT epic_parent_check CHECK (
    (feature_id IS NOT NULL AND business_request_id IS NULL) OR
    (feature_id IS NULL AND business_request_id IS NOT NULL)
  )
);

-- =============================================
-- STORIES
-- =============================================
CREATE TABLE stories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  epic_id UUID REFERENCES epics(id) ON DELETE CASCADE,
  business_request_id UUID REFERENCES business_requests(id) ON DELETE CASCADE,
  completion_percentage INTEGER DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
  status TEXT NOT NULL CHECK (status IN ('todo', 'in-progress', 'done', 'blocked')),
  priority TEXT NOT NULL CHECK (priority IN ('high', 'medium', 'low')),
  assignee TEXT,
  fix_version TEXT, -- For release grouping
  story_points INTEGER,
  epic_name TEXT,
  feature_name TEXT,
  business_request_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- SUBTASKS
-- =============================================
CREATE TABLE subtasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('todo', 'in-progress', 'done', 'blocked')),
  assignee TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- INDEXES for Performance
-- =============================================

-- Themes
CREATE INDEX idx_themes_status ON strategic_themes(status);

-- Initiatives
CREATE INDEX idx_initiatives_theme ON initiatives(theme_id);
CREATE INDEX idx_initiatives_status ON initiatives(status);

-- Business Requests
CREATE INDEX idx_br_initiative ON business_requests(initiative_id);
CREATE INDEX idx_br_theme ON business_requests(theme_id);
CREATE INDEX idx_br_status ON business_requests(status);
CREATE INDEX idx_br_key ON business_requests(key);

-- Features
CREATE INDEX idx_features_br ON features(business_request_id);
CREATE INDEX idx_features_theme ON features(theme_id);
CREATE INDEX idx_features_status ON features(status);
CREATE INDEX idx_features_dates ON features(start_date, end_date);

-- Epics
CREATE INDEX idx_epics_feature ON epics(feature_id);
CREATE INDEX idx_epics_br ON epics(business_request_id);
CREATE INDEX idx_epics_theme ON epics(theme_id);
CREATE INDEX idx_epics_status ON epics(status);
CREATE INDEX idx_epics_dates ON epics(start_date, end_date);

-- Stories
CREATE INDEX idx_stories_epic ON stories(epic_id);
CREATE INDEX idx_stories_br ON stories(business_request_id);
CREATE INDEX idx_stories_status ON stories(status);
CREATE INDEX idx_stories_version ON stories(fix_version);

-- Subtasks
CREATE INDEX idx_subtasks_story ON subtasks(story_id);

-- =============================================
-- FUNCTIONS for Automatic Updates
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables
CREATE TRIGGER update_themes_updated_at BEFORE UPDATE ON strategic_themes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_initiatives_updated_at BEFORE UPDATE ON initiatives
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_br_updated_at BEFORE UPDATE ON business_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_features_updated_at BEFORE UPDATE ON features
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_epics_updated_at BEFORE UPDATE ON epics
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_stories_updated_at BEFORE UPDATE ON stories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subtasks_updated_at BEFORE UPDATE ON subtasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- COMMENTS for Documentation
-- =============================================

COMMENT ON TABLE strategic_themes IS 'Multi-year strategic direction and company priorities';
COMMENT ON TABLE initiatives IS 'Major strategic investments aligned with themes';
COMMENT ON TABLE business_requests IS 'Business-level work items that can contain Features and/or direct Epics';
COMMENT ON TABLE features IS 'Feature-level work items that contain Epics';
COMMENT ON TABLE epics IS 'Epic-level work items that contain Stories. Can belong to Feature OR Business Request.';
COMMENT ON TABLE stories IS 'Story-level work items organized by releases';
COMMENT ON TABLE subtasks IS 'Subtask-level work items within Stories';
