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

export interface BusinessRequestMetrics {
  id: string;
  name: string;
  themeName: string;
  initiativeName: string;
  totalItems: number;
  completedItems: number;
  inProgressItems: number;
  blockedItems: number;
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
  // Compliance & Security theme
  {
    id: 'br-1',
    name: 'GDPR Compliance Requirements',
    themeName: 'Compliance & Security',
    initiativeName: 'Data Protection Initiative',
    totalItems: 89,
    completedItems: 55,
    inProgressItems: 28,
    blockedItems: 6,
    completionPercentage: 62,
    priority: 'high',
  },
  {
    id: 'br-2',
    name: 'SOC 2 Audit Preparation',
    themeName: 'Compliance & Security',
    initiativeName: 'Security Certification',
    totalItems: 144,
    completedItems: 60,
    inProgressItems: 72,
    blockedItems: 12,
    completionPercentage: 42,
    priority: 'high',
  },

  // Customer Experience theme
  {
    id: 'br-3',
    name: 'Customer Dashboard Modernization',
    themeName: 'Customer Experience',
    initiativeName: 'UI/UX Enhancement',
    totalItems: 89,
    completedItems: 31,
    inProgressItems: 48,
    blockedItems: 10,
    completionPercentage: 35,
    priority: 'medium',
  },
  {
    id: 'br-4',
    name: 'Real-time Analytics Dashboard',
    themeName: 'Customer Experience',
    initiativeName: 'UI/UX Enhancement',
    totalItems: 89,
    completedItems: 54,
    inProgressItems: 30,
    blockedItems: 5,
    completionPercentage: 61,
    priority: 'medium',
  },
  {
    id: 'br-5',
    name: 'Mobile Application Suite',
    themeName: 'Customer Experience',
    initiativeName: 'UI/UX Enhancement',
    totalItems: 156,
    completedItems: 23,
    inProgressItems: 89,
    blockedItems: 44,
    completionPercentage: 15,
    priority: 'medium',
  },
  {
    id: 'br-6',
    name: 'AI-Powered Search & Recommendations',
    themeName: 'Customer Experience',
    initiativeName: 'AI Innovation',
    totalItems: 98,
    completedItems: 8,
    inProgressItems: 22,
    blockedItems: 68,
    completionPercentage: 8,
    priority: 'low',
  },

  // Platform Reliability theme
  {
    id: 'br-7',
    name: 'API Rate Limiting Enhancement',
    themeName: 'Platform Reliability',
    initiativeName: 'Infrastructure Hardening',
    totalItems: 55,
    completedItems: 0,
    inProgressItems: 12,
    blockedItems: 43,
    completionPercentage: 0,
    priority: 'medium',
  },
  {
    id: 'br-8',
    name: 'Cloud Migration Initiative',
    themeName: 'Platform Reliability',
    initiativeName: 'Infrastructure Hardening',
    totalItems: 146,
    completedItems: 44,
    inProgressItems: 67,
    blockedItems: 35,
    completionPercentage: 30,
    priority: 'high',
  },
];
