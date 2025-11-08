// Custom React hook for fetching Stories
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../client';

export interface Story {
  id: string;
  key: string;
  title: string;
  description: string | null;
  epic_id: string | null;
  business_request_id: string | null;
  completion_percentage: number;
  status: 'todo' | 'in-progress' | 'done' | 'blocked';
  priority: 'high' | 'medium' | 'low';
  assignee: string | null;
  fix_version: string | null;
  story_points: number | null;
  epic_name: string | null;
  feature_name: string | null;
  business_request_name: string | null;
  created_at: string;
  updated_at: string;
}

// Fetch all stories
export const useStories = () => {
  return useQuery({
    queryKey: ['stories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('stories')
        .select('*')
        .order('key');
      
      if (error) throw error;
      return data as Story[];
    },
  });
};

// Fetch stories by epic
export const useStoriesByEpic = (epicId: string) => {
  return useQuery({
    queryKey: ['stories', 'epic', epicId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('stories')
        .select('*')
        .eq('epic_id', epicId)
        .order('key');
      
      if (error) throw error;
      return data as Story[];
    },
    enabled: !!epicId,
  });
};

// Fetch stories by release version (for Release Dashboard)
export const useStoriesByRelease = (fixVersion: string) => {
  return useQuery({
    queryKey: ['stories', 'release', fixVersion],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('stories')
        .select(`
          *,
          subtasks (
            id,
            key,
            title,
            status,
            assignee
          )
        `)
        .eq('fix_version', fixVersion)
        .order('priority', { ascending: false })
        .order('key');
      
      if (error) throw error;
      return data as (Story & { subtasks: any[] })[];
    },
    enabled: !!fixVersion,
  });
};

// Fetch all stories grouped by release version
export const useStoriesByAllReleases = () => {
  return useQuery({
    queryKey: ['stories', 'all-releases'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('stories')
        .select(`
          *,
          subtasks (
            id,
            key,
            title,
            status,
            assignee
          )
        `)
        .order('fix_version')
        .order('priority', { ascending: false });
      
      if (error) throw error;
      return data as (Story & { subtasks: any[] })[];
    },
  });
};

// Fetch single story
export const useStory = (id: string) => {
  return useQuery({
    queryKey: ['stories', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('stories')
        .select(`
          *,
          subtasks (
            id,
            key,
            title,
            status,
            assignee
          )
        `)
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as Story & { subtasks: any[] };
    },
    enabled: !!id,
  });
};
