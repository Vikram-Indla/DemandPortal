-- Digital Services Roadmap Dashboard - Seed Data
-- Migration: Seed realistic mock data
-- Created: 2025-11-08

-- =============================================
-- STRATEGIC THEMES
-- =============================================
INSERT INTO strategic_themes (id, name, description, status, start_date, end_date) VALUES
('11111111-1111-1111-1111-111111111111', 'Compliance & Security', 'Ensure regulatory compliance and strengthen security posture', 'in-progress', '2024-01-01', '2026-12-31'),
('22222222-2222-2222-2222-222222222222', 'Customer Experience', 'Enhance user engagement and satisfaction across all touchpoints', 'on-track', '2024-01-01', '2026-12-31'),
('33333333-3333-3333-3333-333333333333', 'Platform Reliability', 'Improve infrastructure stability and performance', 'at-risk', '2024-01-01', '2026-12-31'),
('44444444-4444-4444-4444-444444444444', 'Digital Transformation', 'Drive innovation and digital capabilities', 'in-progress', '2024-01-01', '2026-12-31'),
('55555555-5555-5555-5555-555555555555', 'Operational Excellence', 'Optimize processes and reduce operational costs', 'on-track', '2024-01-01', '2026-12-31');

-- =============================================
-- INITIATIVES
-- =============================================
INSERT INTO initiatives (id, name, theme_id, description, completion_percentage, total_items, completed_items, status, priority, owner, start_date, end_date) VALUES
-- Compliance & Security
('a1111111-1111-1111-1111-111111111111', 'Data Protection Initiative', '11111111-1111-1111-1111-111111111111', 'Implement GDPR compliance and data protection measures', 58, 233, 135, 'in-progress', 'high', 'David Park', '2024-01-01', '2025-06-30'),
('a2222222-2222-2222-2222-222222222222', 'Security Certification', '11111111-1111-1111-1111-111111111111', 'Achieve SOC 2 Type II certification', 42, 144, 60, 'in-progress', 'high', 'Emily White', '2024-03-01', '2025-09-30'),

-- Customer Experience
('a3333333-3333-3333-3333-333333333333', 'UI/UX Enhancement', '22222222-2222-2222-2222-222222222222', 'Modernize user interface and improve experience', 48, 178, 85, 'in-progress', 'medium', 'Sarah Johnson', '2024-02-01', '2025-08-31'),
('a5555555-5555-5555-5555-555555555555', 'AI Innovation', '22222222-2222-2222-2222-222222222222', 'Integrate AI capabilities for personalization', 8, 98, 8, 'not-started', 'medium', 'Alex Thompson', '2025-01-01', '2025-12-31'),

-- Platform Reliability
('a4444444-4444-4444-4444-444444444444', 'Infrastructure Hardening', '33333333-3333-3333-3333-333333333333', 'Strengthen infrastructure resilience and scalability', 22, 201, 44, 'blocked', 'high', 'Michael Chen', '2024-04-01', '2025-12-31');

-- =============================================
-- BUSINESS REQUESTS
-- =============================================
INSERT INTO business_requests (id, key, title, description, initiative_id, theme_id, completion_percentage, status, priority, owner, start_date, end_date, 
  features_total, features_done, features_in_progress, features_blocked, features_not_started,
  epics_total, epics_done, epics_in_progress, epics_blocked, epics_not_started,
  stories_total, stories_done, stories_in_progress, stories_blocked, stories_not_started) VALUES
  
-- BR-1: GDPR Compliance Requirements
('b1111111-1111-1111-1111-111111111111', 'BR-1', 'GDPR Compliance Requirements', 'Implement comprehensive GDPR compliance framework', 
 'a1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 68, 'in-progress', 'high', 'David Park', '2024-01-15', '2025-03-31',
 1, 0, 1, 0, 0,  -- features
 2, 0, 2, 0, 0,  -- epics
 4, 2, 1, 0, 1), -- stories

-- BR-2: SOC 2 Audit Preparation
('b2222222-2222-2222-2222-222222222222', 'BR-2', 'SOC 2 Audit Preparation', 'Prepare systems and documentation for SOC 2 Type II audit',
 'a2222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 43, 'in-progress', 'high', 'Emily White', '2024-03-01', '2025-06-30',
 2, 0, 1, 0, 1,  -- features
 2, 0, 1, 0, 1,  -- epics
 4, 1, 2, 0, 1), -- stories

-- BR-3: Customer Dashboard Modernization
('b3333333-3333-3333-3333-333333333333', 'BR-3', 'Customer Dashboard Modernization', 'Redesign customer portal with modern UI/UX',
 'a3333333-3333-3333-3333-333333333333', '22222222-2222-2222-2222-222222222222', 25, 'blocked', 'medium', 'Sarah Johnson', '2024-02-15', '2025-05-31',
 1, 0, 1, 0, 0,  -- features
 2, 0, 1, 1, 0,  -- epics
 3, 0, 1, 1, 1), -- stories

-- BR-4: Mobile App Development
('b4444444-4444-4444-4444-444444444444', 'BR-4', 'Mobile App Development', 'Develop native mobile applications for iOS and Android',
 'a3333333-3333-3333-3333-333333333333', '22222222-2222-2222-2222-222222222222', 15, 'blocked', 'high', 'James Wilson', '2024-04-01', '2025-08-31',
 2, 0, 0, 2, 0,  -- features
 3, 0, 0, 2, 1,  -- epics
 5, 0, 1, 2, 2), -- stories

-- BR-5: AI-Powered Search
('b5555555-5555-5555-5555-555555555555', 'BR-5', 'AI-Powered Search', 'Implement intelligent search with AI/ML capabilities',
 'a5555555-5555-5555-5555-555555555555', '22222222-2222-2222-2222-222222222222', 8, 'blocked', 'medium', 'Alex Thompson', '2025-01-01', '2025-09-30',
 1, 0, 0, 1, 0,  -- features
 2, 0, 0, 2, 0,  -- epics
 3, 0, 0, 2, 1), -- stories

-- BR-6: Infrastructure Migration
('b6666666-6666-6666-6666-666666666666', 'BR-6', 'Cloud Infrastructure Migration', 'Migrate on-premise infrastructure to cloud',
 'a4444444-4444-4444-4444-444444444444', '33333333-3333-3333-3333-333333333333', 15, 'blocked', 'high', 'Michael Chen', '2024-06-01', '2025-12-31',
 2, 0, 0, 1, 1,  -- features
 3, 0, 0, 2, 1,  -- epics
 6, 0, 1, 3, 2), -- stories

-- BR-7: API Gateway Platform
('b7777777-7777-7777-7777-777777777777', 'BR-7', 'API Integration Platform', 'Build unified API gateway for third-party integrations',
 'a4444444-4444-4444-4444-444444444444', '33333333-3333-3333-3333-333333333333', 35, 'not-started', 'medium', 'Rachel Kim', '2024-11-01', '2025-05-31',
 1, 0, 0, 0, 1,  -- features
 3, 0, 1, 1, 1,  -- epics
 5, 1, 1, 1, 2), -- stories

-- BR-8: Security Framework
('b8888888-8888-8888-8888-888888888888', 'BR-8', 'Security Compliance Framework', 'Implement enterprise security compliance framework',
 'a1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 29, 'in-progress', 'high', 'David Park', '2024-11-15', '2025-03-31',
 1, 0, 1, 0, 0,  -- features
 2, 0, 1, 0, 1,  -- epics
 4, 0, 2, 0, 2); -- stories

-- =============================================
-- FEATURES
-- =============================================
INSERT INTO features (id, key, title, description, business_request_id, theme_id, completion_percentage, status, priority, owner, start_date, end_date, epic_count, completed_epics) VALUES
-- Customer Experience Features
('f1111111-1111-1111-1111-111111111111', 'FEAT-1', 'Customer Portal Modernization', 'Modernize customer-facing portal with new UI/UX', 'b3333333-3333-3333-3333-333333333333', '22222222-2222-2222-2222-222222222222', 82, 'in-progress', 'high', 'Sarah Johnson', '2024-09-15', '2024-12-15', 5, 4),
('f2222222-2222-2222-2222-222222222222', 'FEAT-2', 'Real-time Analytics Dashboard', 'Real-time analytics and business intelligence', 'b3333333-3333-3333-3333-333333333333', '22222222-2222-2222-2222-222222222222', 65, 'in-progress', 'high', 'Lisa Anderson', '2024-10-01', '2024-12-31', 3, 2),
('f3333333-3333-3333-3333-333333333333', 'FEAT-3', 'Mobile App Launch', 'Native mobile applications for iOS and Android', 'b4444444-4444-4444-4444-444444444444', '22222222-2222-2222-2222-222222222222', 15, 'in-progress', 'high', 'James Wilson', '2024-12-01', '2025-05-31', 4, 0),
('f7777777-7777-7777-7777-777777777777', 'FEAT-7', 'AI-Powered Search', 'AI-powered semantic search and recommendations', 'b5555555-5555-5555-5555-555555555555', '22222222-2222-2222-2222-222222222222', 25, 'blocked', 'medium', 'Alex Thompson', '2025-10-01', '2025-12-15', 3, 0),

-- Platform Reliability Features
('f4444444-4444-4444-4444-444444444444', 'FEAT-4', 'API Integration Platform', 'Unified API gateway for integrations', 'b7777777-7777-7777-7777-777777777777', '33333333-3333-3333-3333-333333333333', 35, 'in-progress', 'medium', 'Michael Chen', '2024-11-01', '2025-02-28', 4, 1),
('f6666666-6666-6666-6666-666666666666', 'FEAT-6', 'Cloud Infrastructure Migration', 'Migrate infrastructure to AWS cloud', 'b6666666-6666-6666-6666-666666666666', '33333333-3333-3333-3333-333333333333', 15, 'blocked', 'high', 'Emily Rodriguez', '2025-09-15', '2025-12-31', 6, 0),
('f8888888-8888-8888-8888-888888888888', 'FEAT-8', 'Multi-Region Deployment', 'Deploy across multiple geographic regions', 'b6666666-6666-6666-6666-666666666666', '33333333-3333-3333-3333-333333333333', 10, 'not-started', 'high', 'Rachel Kim', '2025-10-15', '2026-01-31', 5, 0),

-- Compliance & Security Features
('f5555555-5555-5555-5555-555555555555', 'FEAT-5', 'Security Compliance Framework', 'GDPR and SOC2 compliance measures', 'b8888888-8888-8888-8888-888888888888', '11111111-1111-1111-1111-111111111111', 29, 'in-progress', 'high', 'David Park', '2024-11-15', '2025-03-31', 3, 0),

-- Milestone Features
('f9999999-9999-9999-9999-999999999999', 'FEAT-9', 'Q4 2025 Release Milestone', 'Major release milestone', NULL, '22222222-2222-2222-2222-222222222222', 0, 'not-started', 'high', 'Product Team', '2025-11-15', '2025-11-15', 0, 0),
('f1010101-1010-1010-1010-101010101010', 'FEAT-10', 'Year-End Security Audit', 'Annual security compliance audit', NULL, '11111111-1111-1111-1111-111111111111', 100, 'done', 'high', 'Security Team', '2024-09-15', '2024-09-15', 0, 0);

-- =============================================
-- EPICS (20 epics spanning multiple features and direct BR connections)
-- =============================================
INSERT INTO epics (id, key, title, description, feature_id, business_request_id, theme_id, completion_percentage, status, priority, owner, start_date, end_date, story_count, completed_stories, feature_name) VALUES
-- Customer Portal Modernization Epics
('e1111111-1111-1111-1111-111111111111', 'EPIC-1', 'SSO Integration', 'Single Sign-On with OAuth2 and SAML', 'f1111111-1111-1111-1111-111111111111', NULL, '22222222-2222-2222-2222-222222222222', 100, 'done', 'high', 'John Smith', '2024-09-15', '2024-11-01', 8, 8, 'Customer Portal Modernization'),
('e3333333-3333-3333-3333-333333333333', 'EPIC-3', 'User Profile Management', 'Enhanced user profiles with customization', 'f1111111-1111-1111-1111-111111111111', NULL, '22222222-2222-2222-2222-222222222222', 75, 'in-progress', 'high', 'Sarah Johnson', '2024-11-05', '2024-12-20', 12, 9, 'Customer Portal Modernization'),
('e9999999-9999-9999-9999-999999999999', 'EPIC-9', 'Notification System', 'Real-time notifications and alerts', 'f1111111-1111-1111-1111-111111111111', NULL, '22222222-2222-2222-2222-222222222222', 30, 'in-progress', 'medium', 'Sarah Johnson', '2024-12-10', '2025-01-20', 10, 3, 'Customer Portal Modernization'),

-- Analytics Dashboard Epics
('e2222222-2222-2222-2222-222222222222', 'EPIC-2', 'Real-time Data Pipeline', 'Data ingestion and processing', 'f2222222-2222-2222-2222-222222222222', NULL, '22222222-2222-2222-2222-222222222222', 100, 'done', 'high', 'Lisa Anderson', '2024-10-01', '2024-11-15', 10, 10, 'Real-time Analytics Dashboard'),
('e4444444-4444-4444-4444-444444444444', 'EPIC-4', 'Analytics Dashboard UI', 'Interactive dashboards with widgets', 'f2222222-2222-2222-2222-222222222222', NULL, '22222222-2222-2222-2222-222222222222', 55, 'in-progress', 'high', 'Lisa Anderson', '2024-11-16', '2024-12-31', 16, 9, 'Real-time Analytics Dashboard'),

-- API Platform Epics
('e5555555-5555-5555-5555-555555555555', 'EPIC-5', 'API Gateway Setup', 'API gateway infrastructure', 'f4444444-4444-4444-4444-444444444444', NULL, '33333333-3333-3333-3333-333333333333', 40, 'in-progress', 'high', 'Michael Chen', '2024-11-01', '2025-01-15', 15, 6, 'API Integration Platform'),
('e1212121-1212-1212-1212-121212121212', 'EPIC-12', 'Third-party Integrations', 'Connect external services', 'f4444444-4444-4444-4444-444444444444', NULL, '33333333-3333-3333-3333-333333333333', 20, 'blocked', 'high', 'Michael Chen', '2025-01-16', '2025-02-28', 12, 2, 'API Integration Platform'),

-- Security Framework Epics
('e6666666-6666-6666-6666-666666666666', 'EPIC-6', 'GDPR Data Controls', 'Data privacy and consent management', 'f5555555-5555-5555-5555-555555555555', NULL, '11111111-1111-1111-1111-111111111111', 35, 'in-progress', 'high', 'David Park', '2024-11-15', '2025-01-31', 14, 5, 'Security Compliance Framework'),
('e1313131-1313-1313-1313-131313131313', 'EPIC-13', 'Audit Logging System', 'Comprehensive audit trail', 'f5555555-5555-5555-5555-555555555555', NULL, '11111111-1111-1111-1111-111111111111', 45, 'in-progress', 'high', 'David Park', '2025-02-01', '2025-03-31', 11, 5, 'Security Compliance Framework'),

-- Cloud Migration Epics
('e7777777-7777-7777-7777-777777777777', 'EPIC-7', 'AWS Infrastructure Setup', 'Cloud infrastructure foundation', 'f6666666-6666-6666-6666-666666666666', NULL, '33333333-3333-3333-3333-333333333333', 25, 'blocked', 'high', 'Emily Rodriguez', '2025-09-15', '2025-10-31', 18, 4, 'Cloud Infrastructure Migration'),
('e1414141-1414-1414-1414-141414141414', 'EPIC-14', 'Database Migration', 'Migrate databases to RDS', 'f6666666-6666-6666-6666-666666666666', NULL, '33333333-3333-3333-3333-333333333333', 15, 'not-started', 'high', 'Emily Rodriguez', '2025-11-01', '2025-12-15', 20, 0, 'Cloud Infrastructure Migration'),

-- Mobile App Epics
('e8888888-8888-8888-8888-888888888888', 'EPIC-8', 'iOS App Development', 'Native iOS application', 'f3333333-3333-3333-3333-333333333333', NULL, '22222222-2222-2222-2222-222222222222', 20, 'in-progress', 'high', 'James Wilson', '2024-12-01', '2025-03-31', 22, 4, 'Mobile App Launch'),
('e1515151-1515-1515-1515-151515151515', 'EPIC-15', 'Android App Development', 'Native Android application', 'f3333333-3333-3333-3333-333333333333', NULL, '22222222-2222-2222-2222-222222222222', 18, 'in-progress', 'high', 'James Wilson', '2024-12-15', '2025-04-15', 20, 3, 'Mobile App Launch'),

-- AI Search Epics
('e1010101-1010-1010-1010-101010101010', 'EPIC-10', 'Machine Learning Pipeline', 'ML model training infrastructure', 'f7777777-7777-7777-7777-777777777777', NULL, '22222222-2222-2222-2222-222222222222', 35, 'blocked', 'medium', 'Alex Thompson', '2025-10-01', '2025-11-15', 14, 5, 'AI-Powered Search'),
('e1111112-1111-1111-1111-111111111111', 'EPIC-11', 'Search Results Ranking', 'AI-powered relevance ranking', 'f7777777-7777-7777-7777-777777777777', NULL, '22222222-2222-2222-2222-222222222222', 20, 'not-started', 'medium', 'Alex Thompson', '2025-11-16', '2025-12-15', 12, 0, 'AI-Powered Search'),

-- Direct BR Epics (no feature parent)
('e1616161-1616-1616-1616-161616161616', 'EPIC-16', 'Access Control System', 'Role-based access controls', NULL, 'b1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 60, 'in-progress', 'high', 'David Park', '2024-01-15', '2025-02-28', 9, 5, NULL),
('e1717171-1717-1717-1717-171717171717', 'EPIC-17', 'Data Encryption', 'End-to-end data encryption', NULL, 'b1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 75, 'in-progress', 'high', 'David Park', '2024-02-01', '2025-03-15', 8, 6, NULL),

-- Multi-Region Epics
('e1818181-1818-1818-1818-181818181818', 'EPIC-18', 'Global Load Balancing', 'Geographic traffic distribution', 'f8888888-8888-8888-8888-888888888888', NULL, '33333333-3333-3333-3333-333333333333', 10, 'not-started', 'high', 'Rachel Kim', '2025-10-15', '2025-12-01', 16, 0, 'Multi-Region Deployment'),

-- Milestone Epic
('e1919191-1919-1919-1919-191919191919', 'EPIC-19', 'Q4 Sprint Review', 'Quarterly review milestone', NULL, NULL, '22222222-2222-2222-2222-222222222222', 0, 'not-started', 'medium', 'Product Team', '2025-11-20', '2025-11-20', 0, 0, NULL);

-- Note: Stories and Subtasks would be added in a similar pattern
-- For brevity, showing just a few representative stories

-- =============================================
-- STORIES (Sample - Release Dashboard data)
-- =============================================
INSERT INTO stories (id, key, title, description, epic_id, business_request_id, completion_percentage, status, priority, assignee, fix_version, story_points, epic_name, feature_name, business_request_name) VALUES
-- v1.0 Release Stories
('s1111111-1111-1111-1111-111111111111', 'STORY-1', 'Implement OAuth2 flow', 'OAuth2 authentication flow', 'e1111111-1111-1111-1111-111111111111', NULL, 100, 'done', 'high', 'John Smith', 'v1.0', 5, 'SSO Integration', 'Customer Portal Modernization', 'Customer Dashboard Modernization'),
('s2222222-2222-2222-2222-222222222222', 'STORY-2', 'SAML configuration', 'SAML identity provider setup', 'e1111111-1111-1111-1111-111111111111', NULL, 100, 'done', 'high', 'John Smith', 'v1.0', 8, 'SSO Integration', 'Customer Portal Modernization', 'Customer Dashboard Modernization'),
('s3333333-3333-3333-3333-333333333333', 'STORY-3', 'User session management', 'Session token handling', 'e1111111-1111-1111-1111-111111111111', NULL, 100, 'done', 'medium', 'Jane Doe', 'v1.0', 3, 'SSO Integration', 'Customer Portal Modernization', 'Customer Dashboard Modernization'),

-- v1.1 Release Stories
('s4444444-4444-4444-4444-444444444444', 'STORY-4', 'Profile settings UI', 'User profile settings page', 'e3333333-3333-3333-3333-333333333333', NULL, 80, 'in-progress', 'high', 'Sarah Johnson', 'v1.1', 5, 'User Profile Management', 'Customer Portal Modernization', 'Customer Dashboard Modernization'),
('s5555555-5555-5555-5555-555555555555', 'STORY-5', 'Avatar upload feature', 'User avatar image upload', 'e3333333-3333-3333-3333-333333333333', NULL, 60, 'in-progress', 'medium', 'Mike Brown', 'v1.1', 3, 'User Profile Management', 'Customer Portal Modernization', 'Customer Dashboard Modernization'),
('s6666666-6666-6666-6666-666666666666', 'STORY-6', 'Notification preferences', 'Configure notification settings', 'e9999999-9999-9999-9999-999999999999', NULL, 40, 'in-progress', 'medium', 'Sarah Johnson', 'v1.1', 3, 'Notification System', 'Customer Portal Modernization', 'Customer Dashboard Modernization'),

-- v2.0 Release Stories
('s7777777-7777-7777-7777-777777777777', 'STORY-7', 'API Gateway deployment', 'Deploy Kong API gateway', 'e5555555-5555-5555-5555-555555555555', NULL, 100, 'done', 'high', 'Michael Chen', 'v2.0', 13, 'API Gateway Setup', 'API Integration Platform', 'API Integration Platform'),
('s8888888-8888-8888-8888-888888888888', 'STORY-8', 'Rate limiting', 'Implement API rate limits', 'e5555555-5555-5555-5555-555555555555', NULL, 60, 'in-progress', 'high', 'Alex Kumar', 'v2.0', 5, 'API Gateway Setup', 'API Integration Platform', 'API Integration Platform'),
('s9999999-9999-9999-9999-999999999999', 'STORY-9', 'API documentation', 'Auto-generate API docs', 'e5555555-5555-5555-5555-555555555555', NULL, 30, 'in-progress', 'medium', 'Lisa Chen', 'v2.0', 5, 'API Gateway Setup', 'API Integration Platform', 'API Integration Platform'),
('s1010101-1010-1010-1010-101010101010', 'STORY-10', 'OAuth integration', 'Third-party OAuth support', 'e1212121-1212-1212-1212-121212121212', NULL, 0, 'blocked', 'high', 'Michael Chen', 'v2.0', 8, 'Third-party Integrations', 'API Integration Platform', 'API Integration Platform');

-- =============================================
-- SUBTASKS (Sample)
-- =============================================
INSERT INTO subtasks (id, key, title, story_id, status, assignee) VALUES
('t1111111-1111-1111-1111-111111111111', 'SUB-1', 'Setup OAuth2 library', 's1111111-1111-1111-1111-111111111111', 'done', 'John Smith'),
('t2222222-2222-2222-2222-222222222222', 'SUB-2', 'Configure redirect URLs', 's1111111-1111-1111-1111-111111111111', 'done', 'John Smith'),
('t3333333-3333-3333-3333-333333333333', 'SUB-3', 'Test OAuth flow', 's1111111-1111-1111-1111-111111111111', 'done', 'Jane Doe'),
('t4444444-4444-4444-4444-444444444444', 'SUB-4', 'Design profile UI mockups', 's4444444-4444-4444-4444-444444444444', 'done', 'Sarah Johnson'),
('t5555555-5555-5555-5555-555555555555', 'SUB-5', 'Implement profile form', 's4444444-4444-4444-4444-444444444444', 'in-progress', 'Sarah Johnson'),
('t6666666-6666-6666-6666-666666666666', 'SUB-6', 'Add validation rules', 's4444444-4444-4444-4444-444444444444', 'todo', 'Sarah Johnson');
