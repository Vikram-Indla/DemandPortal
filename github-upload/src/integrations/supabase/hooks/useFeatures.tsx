// Custom React hook for fetching Features
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../client';

export interface Feature {
  id: string;
  key: string;
  title: string;
  description: string | null;
  business_request_id: string | null;
  theme_id: string | null;
  completion_percentage: number;
  status: 'done' | 'in-progress' | 'blocked' | 'not-started';
  priority: 'high' | 'medium' | 'low' | null;
  owner: string | null;
  start_date: string;
  end_date: string;
  epic_count: number;
  completed_epics: number;
  created_at: string;
  updated_at: string;
}

// Fetch all features
export const useFeatures = () => {
  return useQuery({
    queryKey: ['features'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('features')
        .select('*')
        .order('start_date');
      
      if (error) throw error;
      return data as Feature[];
    },
  });
};

// Fetch features by business request
export const useFeaturesByBusinessRequest = (businessRequestId: string) => {
  return useQuery({
    queryKey: ['features', 'business-request', businessRequestId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('features')
        .select('*')
        .eq('business_request_id', businessRequestId)
        .order('start_date');
      
      if (error) throw error;
      return data as Feature[];
    },
    enabled: !!businessRequestId,
  });
};

// Fetch features by theme
export const useFeaturesByTheme = (themeId: string) => {
  return useQuery({
    queryKey: ['features', 'theme', themeId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('features')
        .select('*')
        .eq('theme_id', themeId)
        .order('start_date');
      
      if (error) throw error;
      return data as Feature[];
    },
    enabled: !!themeId,
  });
};

// Fetch single feature
export const useFeature = (id: string) => {
  return useQuery({
    queryKey: ['features', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('features')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as Feature;
    },
    enabled: !!id,
  });
};
