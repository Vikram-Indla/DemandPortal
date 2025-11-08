// Custom React hook for fetching Epics
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../client';

export interface Epic {
  id: string;
  key: string;
  title: string;
  description: string | null;
  feature_id: string | null;
  business_request_id: string | null;
  theme_id: string | null;
  completion_percentage: number;
  status: 'done' | 'in-progress' | 'blocked' | 'not-started';
  priority: 'high' | 'medium' | 'low' | null;
  owner: string | null;
  start_date: string;
  end_date: string;
  story_count: number;
  completed_stories: number;
  feature_name: string | null;
  created_at: string;
  updated_at: string;
}

// Fetch all epics
export const useEpics = () => {
  return useQuery({
    queryKey: ['epics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('epics')
        .select('*')
        .order('start_date');
      
      if (error) throw error;
      return data as Epic[];
    },
  });
};

// Fetch epics by feature
export const useEpicsByFeature = (featureId: string) => {
  return useQuery({
    queryKey: ['epics', 'feature', featureId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('epics')
        .select('*')
        .eq('feature_id', featureId)
        .order('start_date');
      
      if (error) throw error;
      return data as Epic[];
    },
    enabled: !!featureId,
  });
};

// Fetch epics by business request (direct children)
export const useEpicsByBusinessRequest = (businessRequestId: string) => {
  return useQuery({
    queryKey: ['epics', 'business-request', businessRequestId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('epics')
        .select('*')
        .eq('business_request_id', businessRequestId)
        .order('start_date');
      
      if (error) throw error;
      return data as Epic[];
    },
    enabled: !!businessRequestId,
  });
};

// Fetch epics by theme
export const useEpicsByTheme = (themeId: string) => {
  return useQuery({
    queryKey: ['epics', 'theme', themeId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('epics')
        .select('*')
        .eq('theme_id', themeId)
        .order('start_date');
      
      if (error) throw error;
      return data as Epic[];
    },
    enabled: !!themeId,
  });
};

// Fetch single epic
export const useEpic = (id: string) => {
  return useQuery({
    queryKey: ['epics', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('epics')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as Epic;
    },
    enabled: !!id,
  });
};
