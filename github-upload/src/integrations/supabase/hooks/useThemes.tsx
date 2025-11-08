// Custom React hook for fetching Strategic Themes
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../client';

export interface StrategicTheme {
  id: string;
  name: string;
  description: string | null;
  status: 'on-track' | 'in-progress' | 'at-risk';
  start_date: string | null;
  end_date: string | null;
  created_at: string;
  updated_at: string;
}

// Fetch all themes
export const useThemes = () => {
  return useQuery({
    queryKey: ['strategic-themes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('strategic_themes')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as StrategicTheme[];
    },
  });
};

// Fetch single theme by ID
export const useTheme = (id: string) => {
  return useQuery({
    queryKey: ['strategic-themes', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('strategic_themes')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as StrategicTheme;
    },
    enabled: !!id,
  });
};
