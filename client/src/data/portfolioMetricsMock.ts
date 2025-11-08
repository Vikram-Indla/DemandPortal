// Portfolio Dashboard (StatusDashboard) mock data
// Metrics for initiatives and business requests

export interface InitiativeMetrics {
  id: string;
  name: string;
  themeName: string;
  completionPercentage: number;
  totalBusinessRequests: number;
  completedBusinessRequests: number;
  totalItems: number;
  completedItems: number;
}

// Breakdown by work item type and status
export interface ItemBreakdown {
  done: number;
  inProgress: number;
  blocked: number;
  notStarted: number;
}

export interface BusinessRequestMetrics {
  id: string;
  name: string;
  themeName: string;
  initiativeName: string;
  features: ItemBreakdown;
  epics: ItemBreakdown;
  stories: ItemBreakdown;
  completionPercentage: number;
  priority: 'high' | 'medium' | 'low';
}

export const initiativeMetricsMock: InitiativeMetrics[] = [
  {
    id: 'init-1',
    name: 'Data Protection Initiative',
    themeName: 'Compliance & Security',
    completionPercentage: 58,
    totalBusinessRequests: 2,
    completedBusinessRequests: 0,
    totalItems: 233,
    completedItems: 135,
  },
  {
    id: 'init-2',
    name: 'Security Certification',
    themeName: 'Compliance & Security',
    completionPercentage: 42,
    totalBusinessRequests: 1,
    completedBusinessRequests: 0,
    totalItems: 144,
    completedItems: 60,
  },
  {
    id: 'init-3',
    name: 'UI/UX Enhancement',
    themeName: 'Customer Experience',
    completionPercentage: 48,
    totalBusinessRequests: 2,
    completedBusinessRequests: 0,
    totalItems: 178,
    completedItems: 85,
  },
  {
    id: 'init-4',
    name: 'Infrastructure Hardening',
    themeName: 'Platform Reliability',
    completionPercentage: 22,
    totalBusinessRequests: 2,
    completedBusinessRequests: 0,
    totalItems: 201,
    completedItems: 44,
  },
  {
    id: 'init-5',
    name: 'AI Innovation',
    themeName: 'Customer Experience',
    completionPercentage: 8,
    totalBusinessRequests: 1,
    completedBusinessRequests: 0,
    totalItems: 98,
    completedItems: 8,
  },
];

export const businessRequestMetricsMock: BusinessRequestMetrics[] = [
  // BR-1: GDPR Compliance Requirements
  {
    id: 'BR-1',
    name: 'GDPR Compliance Requirements',
    themeName: 'Compliance & Security',
    initiativeName: 'Data Protection Initiative',
    features: { done: 0, inProgress: 1, blocked: 0, notStarted: 0 }, // 1 feature
    epics: { done: 0, inProgress: 2, blocked: 0, notStarted: 0 }, // 2 epics
    stories: { done: 2, inProgress: 1, blocked: 0, notStarted: 1 }, // 4 stories
    completionPercentage: 68,
    priority: 'high',
  },
  
  // BR-2: SOC 2 Audit Preparation
  {
    id: 'BR-2',
    name: 'SOC 2 Audit Preparation',
    themeName: 'Compliance & Security',
    initiativeName: 'Security Certification',
    features: { done: 0, inProgress: 1, blocked: 0, notStarted: 1 }, // 2 features
    epics: { done: 0, inProgress: 1, blocked: 0, notStarted: 1 }, // 2 epics
    stories: { done: 1, inProgress: 2, blocked: 0, notStarted: 1 }, // 4 stories
    completionPercentage: 43,
    priority: 'high',
  },

  // BR-3: Customer Dashboard Modernization
  {
    id: 'BR-3',
    name: 'Customer Dashboard Modernization',
    themeName: 'Customer Experience',
    initiativeName: 'UI/UX Enhancement',
    features: { done: 0, inProgress: 1, blocked: 0, notStarted: 0 }, // 1 feature
    epics: { done: 0, inProgress: 1, blocked: 1, notStarted: 0 }, // 2 epics
    stories: { done: 0, inProgress: 1, blocked: 1, notStarted: 1 }, // 3 stories
    completionPercentage: 25,
    priority: 'medium',
  },
  
  // BR-4: API Rate Limiting Enhancement
  {
    id: 'BR-4',
    name: 'API Rate Limiting Enhancement',
    themeName: 'Platform Reliability',
    initiativeName: 'Infrastructure Hardening',
    features: { done: 0, inProgress: 0, blocked: 0, notStarted: 0 }, // 0 features
    epics: { done: 0, inProgress: 0, blocked: 0, notStarted: 1 }, // 1 epic
    stories: { done: 0, inProgress: 0, blocked: 0, notStarted: 1 }, // 1 story
    completionPercentage: 0,
    priority: 'medium',
  },
  
  // BR-5: Mobile App Redesign
  {
    id: 'BR-5',
    name: 'Mobile App Redesign',
    themeName: 'Customer Experience',
    initiativeName: 'UI/UX Enhancement',
    features: { done: 1, inProgress: 2, blocked: 1, notStarted: 1 }, // 5 features
    epics: { done: 3, inProgress: 6, blocked: 2, notStarted: 4 }, // 15 epics
    stories: { done: 12, inProgress: 18, blocked: 8, notStarted: 22 }, // 60 stories
    completionPercentage: 35,
    priority: 'high',
  },
  
  // BR-6: AI-Powered Search & Recommendations
  {
    id: 'BR-6',
    name: 'AI-Powered Search & Recommendations',
    themeName: 'Customer Experience',
    initiativeName: 'AI Innovation',
    features: { done: 0, inProgress: 0, blocked: 1, notStarted: 2 }, // 3 features
    epics: { done: 0, inProgress: 2, blocked: 4, notStarted: 6 }, // 12 epics
    stories: { done: 2, inProgress: 8, blocked: 22, notStarted: 38 }, // 70 stories
    completionPercentage: 8,
    priority: 'low',
  },
  
  // BR-7: Payment Gateway Integration
  {
    id: 'BR-7',
    name: 'Payment Gateway Integration',
    themeName: 'Platform Reliability',
    initiativeName: 'Infrastructure Hardening',
    features: { done: 1, inProgress: 1, blocked: 0, notStarted: 1 }, // 3 features
    epics: { done: 2, inProgress: 4, blocked: 1, notStarted: 3 }, // 10 epics
    stories: { done: 8, inProgress: 12, blocked: 4, notStarted: 18 }, // 42 stories
    completionPercentage: 42,
    priority: 'high',
  },
  
  // BR-8: Cloud Migration Initiative
  {
    id: 'BR-8',
    name: 'Cloud Migration Initiative',
    themeName: 'Platform Reliability',
    initiativeName: 'Infrastructure Hardening',
    features: { done: 0, inProgress: 1, blocked: 1, notStarted: 2 }, // 4 features
    epics: { done: 1, inProgress: 5, blocked: 3, notStarted: 8 }, // 17 epics
    stories: { done: 6, inProgress: 22, blocked: 14, notStarted: 44 }, // 86 stories
    completionPercentage: 18,
    priority: 'medium',
  },
];
