// Custom React hook for fetching Business Requests
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../client';

export interface BusinessRequest {
  id: string;
  key: string;
  title: string;
  description: string | null;
  initiative_id: string | null;
  theme_id: string | null;
  completion_percentage: number;
  status: 'done' | 'in-progress' | 'blocked' | 'not-started';
  priority: 'high' | 'medium' | 'low';
  owner: string | null;
  start_date: string | null;
  end_date: string | null;
  // Breakdown counts
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
  created_at: string;
  updated_at: string;
}

// Fetch all business requests
export const useBusinessRequests = () => {
  return useQuery({
    queryKey: ['business-requests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('business_requests')
        .select('*')
        .order('key');
      
      if (error) throw error;
      return data as BusinessRequest[];
    },
  });
};

// Fetch business requests by theme
export const useBusinessRequestsByTheme = (themeId: string | null) => {
  return useQuery({
    queryKey: ['business-requests', 'theme', themeId],
    queryFn: async () => {
      let query = supabase
        .from('business_requests')
        .select('*');
      
      if (themeId && themeId !== 'all') {
        query = query.eq('theme_id', themeId);
      }
      
      const { data, error } = await query.order('key');
      
      if (error) throw error;
      return data as BusinessRequest[];
    },
  });
};

// Fetch business requests by initiative
export const useBusinessRequestsByInitiative = (initiativeId: string) => {
  return useQuery({
    queryKey: ['business-requests', 'initiative', initiativeId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('business_requests')
        .select('*')
        .eq('initiative_id', initiativeId)
        .order('key');
      
      if (error) throw error;
      return data as BusinessRequest[];
    },
    enabled: !!initiativeId,
  });
};

// Fetch single business request
export const useBusinessRequest = (id: string) => {
  return useQuery({
    queryKey: ['business-requests', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('business_requests')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as BusinessRequest;
    },
    enabled: !!id,
  });
};
