// TypeScript types for Digital Services Roadmap Dashboard
// Matches Supabase database schema

export type StatusType = 'on-track' | 'in-progress' | 'at-risk' | 'done' | 'blocked' | 'not-started';
export type StoryStatusType = 'todo' | 'in-progress' | 'done' | 'blocked';
export type PriorityType = 'high' | 'medium' | 'low';

// Strategic Theme
export interface StrategicTheme {
  id: string;
  name: string;
  description?: string;
  status: 'on-track' | 'in-progress' | 'at-risk';
  start_date?: string;
  end_date?: string;
  created_at?: string;
  updated_at?: string;
}

// Initiative
export interface Initiative {
  id: string;
  name: string;
  theme_id?: string;
  description?: string;
  completion_percentage: number;
  total_items: number;
  completed_items: number;
  status: StatusType;
  priority?: PriorityType;
  owner?: string;
  start_date?: string;
  end_date?: string;
  created_at?: string;
  updated_at?: string;
}

// Business Request
export interface BusinessRequest {
  id: string;
  key: string; // BR-1, BR-2, etc.
  title: string;
  description?: string;
  initiative_id?: string;
  theme_id?: string;
  completion_percentage: number;
  status: StatusType;
  priority: PriorityType;
  owner?: string;
  start_date?: string;
  end_date?: string;
  // Status breakdown counts
  features_total: number;
  features_done: number;
  features_in_progress: number;
  features_blocked: number;
  features_not_started: number;
  epics_total: number;
  epics_done: number;
  epics_in_progress: number;
  epics_blocked: number;
  epics_not_started: number;
  stories_total: number;
  stories_done: number;
  stories_in_progress: number;
  stories_blocked: number;
  stories_not_started: number;
  created_at?: string;
  updated_at?: string;
}

// Feature
export interface Feature {
  id: string;
  key: string;
  title: string;
  description?: string;
  business_request_id?: string;
  theme_id?: string;
  completion_percentage: number;
  status: StatusType;
  priority?: PriorityType;
  owner?: string;
  start_date: string;
  end_date: string;
  epic_count: number;
  completed_epics: number;
  created_at?: string;
  updated_at?: string;
}

// Epic
export interface Epic {
  id: string;
  key: string;
  title: string;
  description?: string;
  feature_id?: string;
  business_request_id?: string;
  theme_id?: string;
  completion_percentage: number;
  status: StatusType;
  priority?: PriorityType;
  owner?: string;
  start_date: string;
  end_date: string;
  story_count: number;
  completed_stories: number;
  feature_name?: string;
  created_at?: string;
  updated_at?: string;
}

// Story
export interface Story {
  id: string;
  key: string;
  title: string;
  description?: string;
  epic_id?: string;
  business_request_id?: string;
  completion_percentage: number;
  status: StoryStatusType;
  priority: PriorityType;
  assignee?: string;
  fix_version?: string; // For release grouping
  story_points?: number;
  epic_name?: string;
  feature_name?: string;
  business_request_name?: string;
  created_at?: string;
  updated_at?: string;
}

// Subtask
export interface Subtask {
  id: string;
  key: string;
  title: string;
  story_id?: string;
  status: StoryStatusType;
  assignee?: string;
  created_at?: string;
  updated_at?: string;
}

// Hierarchy item types (for tree visualization)
export type HierarchyItem = StrategicTheme | Initiative | BusinessRequest | Feature | Epic | Story | Subtask;

// Type guards for discriminated unions
export function isTheme(item: HierarchyItem): item is StrategicTheme {
  return 'name' in item && !('key' in item);
}

export function isInitiative(item: HierarchyItem): item is Initiative {
  return 'theme_id' in item && 'total_items' in item;
}

export function isBusinessRequest(item: HierarchyItem): item is BusinessRequest {
  return 'key' in item && 'features_total' in item;
}

export function isFeature(item: HierarchyItem): item is Feature {
  return 'key' in item && 'epic_count' in item && 'business_request_id' in item;
}

export function isEpic(item: HierarchyItem): item is Epic {
  return 'key' in item && 'story_count' in item && ('feature_id' in item || 'business_request_id' in item);
}

export function isStory(item: HierarchyItem): item is Story {
  return 'key' in item && 'story_points' in item;
}

export function isSubtask(item: HierarchyItem): item is Subtask {
  return 'key' in item && 'story_id' in item;
}

// Status breakdowns
export interface StatusBreakdown {
  done: number;
  inProgress: number;
  blocked: number;
  notStarted: number;
  total: number;
}

// Filter options
export interface FilterOptions {
  search?: string;
  status?: StatusType[];
  initiative?: string;
  theme?: string;
}
