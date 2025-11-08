// Custom React hook for fetching Initiatives
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../client';

export interface Initiative {
  id: string;
  name: string;
  theme_id: string | null;
  description: string | null;
  completion_percentage: number;
  total_items: number;
  completed_items: number;
  status: 'on-track' | 'in-progress' | 'at-risk' | 'done' | 'blocked' | 'not-started';
  priority: 'high' | 'medium' | 'low' | null;
  owner: string | null;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
  updated_at: string;
}

// Fetch all initiatives
export const useInitiatives = () => {
  return useQuery({
    queryKey: ['initiatives'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('initiatives')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as Initiative[];
    },
  });
};

// Fetch initiatives by theme
export const useInitiativesByTheme = (themeId: string | null) => {
  return useQuery({
    queryKey: ['initiatives', 'theme', themeId],
    queryFn: async () => {
      let query = supabase
        .from('initiatives')
        .select('*');
      
      if (themeId && themeId !== 'all') {
        query = query.eq('theme_id', themeId);
      }
      
      const { data, error } = await query.order('name');
      
      if (error) throw error;
      return data as Initiative[];
    },
  });
};

// Fetch single initiative
export const useInitiative = (id: string) => {
  return useQuery({
    queryKey: ['initiatives', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('initiatives')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as Initiative;
    },
    enabled: !!id,
  });
};
