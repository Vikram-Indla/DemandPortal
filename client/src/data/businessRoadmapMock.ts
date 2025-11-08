import { TreeNode } from '@/components/HierarchyTree';
import { GanttItem } from '@/components/GanttChart';

// Business Request mock data for Business Roadmap
// IMPORTANT: Business requests are LINKING mechanisms, not hierarchical parents
// Features, epics, and stories link to business requests via businessRequestId
// A feature/epic/story can be directly linked to a business request without strict parent-child relationships

// Business Request definitions (the tags/categories that items link to)
export interface BusinessRequest {
  id: string;
  title: string;
  description: string;
  themeName: string;
  initiativeName: string;
  status: 'in-progress' | 'done' | 'blocked' | 'not-started';
  priority: 'high' | 'medium' | 'low';
  releaseLabel: string;
  targetStartDate: Date;
  targetEndDate: Date;
  completionPercentage: number;
}

export const businessRequests: BusinessRequest[] = [
  {
    id: 'br-1',
    title: 'GDPR Compliance Requirements',
    description: 'Ensure all systems comply with GDPR regulations',
    themeName: 'Compliance & Security',
    initiativeName: 'Data Protection Initiative',
    status: 'in-progress',
    priority: 'high',
    releaseLabel: 'Q1 2025',
    targetStartDate: new Date('2024-11-01'),
    targetEndDate: new Date('2025-03-31'),
    completionPercentage: 62,
  },
  {
    id: 'br-2',
    title: 'SOC 2 Audit Preparation',
    description: 'Prepare systems and documentation for SOC 2 Type II audit',
    themeName: 'Compliance & Security',
    initiativeName: 'Security Certification',
    status: 'in-progress',
    priority: 'high',
    releaseLabel: 'Q2 2025',
    targetStartDate: new Date('2025-01-15'),
    targetEndDate: new Date('2025-06-30'),
    completionPercentage: 45,
  },
  {
    id: 'br-3',
    title: 'Customer Dashboard Modernization',
    description: 'Modernize customer-facing dashboard with real-time analytics',
    themeName: 'Customer Experience',
    initiativeName: 'UI/UX Enhancement',
    status: 'in-progress',
    priority: 'medium',
    releaseLabel: 'Q2 2025',
    targetStartDate: new Date('2025-02-01'),
    targetEndDate: new Date('2025-05-31'),
    completionPercentage: 35,
  },
  {
    id: 'br-4',
    title: 'API Rate Limiting Enhancement',
    description: 'Implement advanced rate limiting to protect API infrastructure',
    themeName: 'Platform Reliability',
    initiativeName: 'Infrastructure Hardening',
    status: 'not-started',
    priority: 'medium',
    releaseLabel: 'Q3 2025',
    targetStartDate: new Date('2025-07-01'),
    targetEndDate: new Date('2025-09-30'),
    completionPercentage: 0,
  },
];

// Work items that link to business requests
// These can be features, epics, or stories - all directly linked to business requests
export interface LinkedWorkItem extends GanttItem {
  businessRequestId: string; // Direct link to business request
}

// Linked work items - features, epics, and stories that are associated with business requests
// Each item has a businessRequestId that links it to a business request
export const linkedWorkItems: LinkedWorkItem[] = [
  // Epics and stories linked to BR-1: GDPR Compliance Requirements
  {
    id: 'epic-br1-1',
    businessRequestId: 'br-1',
    title: 'Data Privacy Controls',
    type: 'epic',
    status: 'in-progress',
    priority: 'high',
    releaseLabel: 'Q1 2025',
    targetStartDate: new Date('2024-11-01'),
    targetEndDate: new Date('2025-01-31'),
    completionPercentage: 75,
    themeName: 'Compliance & Security',
    initiativeName: 'Data Protection Initiative',
    storyPoints: 34,
  },
  {
    id: 'story-br1-1',
    businessRequestId: 'br-1',
    title: 'User consent management UI',
    type: 'story',
    status: 'done',
    priority: 'high',
    targetStartDate: new Date('2024-11-01'),
    targetEndDate: new Date('2024-12-15'),
    completionPercentage: 100,
    themeName: 'Compliance & Security',
    initiativeName: 'Data Protection Initiative',
    storyPoints: 13,
  },
  {
    id: 'story-br1-2',
    businessRequestId: 'br-1',
    title: 'Cookie banner implementation',
    type: 'story',
    status: 'in-progress',
    priority: 'high',
    targetStartDate: new Date('2024-12-16'),
    targetEndDate: new Date('2025-01-31'),
    completionPercentage: 70,
    themeName: 'Compliance & Security',
    initiativeName: 'Data Protection Initiative',
    storyPoints: 21,
  },
  {
    id: 'epic-br1-2',
    businessRequestId: 'br-1',
    title: 'Data Export Functionality',
    type: 'epic',
    status: 'in-progress',
    priority: 'high',
    releaseLabel: 'Q1 2025',
    targetStartDate: new Date('2025-02-01'),
    targetEndDate: new Date('2025-03-31'),
    completionPercentage: 50,
    themeName: 'Compliance & Security',
    initiativeName: 'Data Protection Initiative',
    storyPoints: 55,
  },
  {
    id: 'story-br1-3',
    businessRequestId: 'br-1',
    title: 'Export user data API',
    type: 'story',
    status: 'done',
    priority: 'high',
    targetStartDate: new Date('2025-02-01'),
    targetEndDate: new Date('2025-02-28'),
    completionPercentage: 100,
    themeName: 'Compliance & Security',
    initiativeName: 'Data Protection Initiative',
    storyPoints: 34,
  },
  {
    id: 'story-br1-4',
    businessRequestId: 'br-1',
    title: 'PDF generation for export',
    type: 'story',
    status: 'not-started',
    priority: 'medium',
    targetStartDate: new Date('2025-03-01'),
    targetEndDate: new Date('2025-03-31'),
    completionPercentage: 0,
    themeName: 'Compliance & Security',
    initiativeName: 'Data Protection Initiative',
    storyPoints: 21,
  },

  // Epics and stories linked to BR-2: SOC 2 Audit Preparation
  {
    id: 'epic-br2-1',
    businessRequestId: 'br-2',
    title: 'Access Control Audit Trail',
    type: 'epic',
    status: 'in-progress',
    priority: 'high',
    releaseLabel: 'Q2 2025',
    targetStartDate: new Date('2025-01-15'),
    targetEndDate: new Date('2025-04-15'),
    completionPercentage: 60,
    themeName: 'Compliance & Security',
    initiativeName: 'Security Certification',
    storyPoints: 55,
  },
  {
    id: 'story-br2-1',
    businessRequestId: 'br-2',
    title: 'Implement audit logging',
    type: 'story',
    status: 'done',
    priority: 'high',
    targetStartDate: new Date('2025-01-15'),
    targetEndDate: new Date('2025-03-01'),
    completionPercentage: 100,
    themeName: 'Compliance & Security',
    initiativeName: 'Security Certification',
    storyPoints: 34,
  },
  {
    id: 'story-br2-2',
    businessRequestId: 'br-2',
    title: 'Build audit dashboard',
    type: 'story',
    status: 'in-progress',
    priority: 'medium',
    targetStartDate: new Date('2025-03-02'),
    targetEndDate: new Date('2025-04-15'),
    completionPercentage: 40,
    themeName: 'Compliance & Security',
    initiativeName: 'Security Certification',
    storyPoints: 21,
  },
  {
    id: 'epic-br2-2',
    businessRequestId: 'br-2',
    title: 'Security Documentation',
    type: 'epic',
    status: 'not-started',
    priority: 'medium',
    releaseLabel: 'Q2 2025',
    targetStartDate: new Date('2025-04-16'),
    targetEndDate: new Date('2025-06-30'),
    completionPercentage: 30,
    themeName: 'Compliance & Security',
    initiativeName: 'Security Certification',
    storyPoints: 89,
  },
  {
    id: 'story-br2-3',
    businessRequestId: 'br-2',
    title: 'Document security policies',
    type: 'story',
    status: 'in-progress',
    priority: 'medium',
    targetStartDate: new Date('2025-04-16'),
    targetEndDate: new Date('2025-05-31'),
    completionPercentage: 30,
    themeName: 'Compliance & Security',
    initiativeName: 'Security Certification',
    storyPoints: 55,
  },
  {
    id: 'story-br2-4',
    businessRequestId: 'br-2',
    title: 'Create incident response plan',
    type: 'story',
    status: 'not-started',
    priority: 'medium',
    targetStartDate: new Date('2025-06-01'),
    targetEndDate: new Date('2025-06-30'),
    completionPercentage: 0,
    themeName: 'Compliance & Security',
    initiativeName: 'Security Certification',
    storyPoints: 34,
  },

  // Epics and stories linked to BR-3: Customer Dashboard Modernization
  {
    id: 'epic-br3-1',
    businessRequestId: 'br-3',
    title: 'Real-time Analytics',
    type: 'epic',
    status: 'in-progress',
    priority: 'medium',
    releaseLabel: 'Q2 2025',
    targetStartDate: new Date('2025-02-01'),
    targetEndDate: new Date('2025-04-15'),
    completionPercentage: 50,
    themeName: 'Customer Experience',
    initiativeName: 'UI/UX Enhancement',
    storyPoints: 55,
  },
  {
    id: 'story-br3-1',
    businessRequestId: 'br-3',
    title: 'WebSocket live updates',
    type: 'story',
    status: 'in-progress',
    priority: 'high',
    targetStartDate: new Date('2025-02-01'),
    targetEndDate: new Date('2025-03-15'),
    completionPercentage: 60,
    themeName: 'Customer Experience',
    initiativeName: 'UI/UX Enhancement',
    storyPoints: 34,
  },
  {
    id: 'story-br3-2',
    businessRequestId: 'br-3',
    title: 'Custom metrics widgets',
    type: 'story',
    status: 'not-started',
    priority: 'medium',
    targetStartDate: new Date('2025-03-16'),
    targetEndDate: new Date('2025-04-15'),
    completionPercentage: 0,
    themeName: 'Customer Experience',
    initiativeName: 'UI/UX Enhancement',
    storyPoints: 21,
  },
  {
    id: 'epic-br3-2',
    businessRequestId: 'br-3',
    title: 'Mobile Responsive Design',
    type: 'epic',
    status: 'blocked',
    priority: 'low',
    releaseLabel: 'Q2 2025',
    targetStartDate: new Date('2025-04-16'),
    targetEndDate: new Date('2025-05-31'),
    completionPercentage: 20,
    themeName: 'Customer Experience',
    initiativeName: 'UI/UX Enhancement',
    storyPoints: 34,
  },
  {
    id: 'story-br3-3',
    businessRequestId: 'br-3',
    title: 'Responsive layout implementation',
    type: 'story',
    status: 'blocked',
    priority: 'low',
    targetStartDate: new Date('2025-04-16'),
    targetEndDate: new Date('2025-05-31'),
    completionPercentage: 20,
    themeName: 'Customer Experience',
    initiativeName: 'UI/UX Enhancement',
    storyPoints: 34,
  },

  // Epics and stories linked to BR-4: API Rate Limiting Enhancement
  {
    id: 'epic-br4-1',
    businessRequestId: 'br-4',
    title: 'Rate Limiter Implementation',
    type: 'epic',
    status: 'not-started',
    priority: 'medium',
    releaseLabel: 'Q3 2025',
    targetStartDate: new Date('2025-07-01'),
    targetEndDate: new Date('2025-09-30'),
    completionPercentage: 0,
    themeName: 'Platform Reliability',
    initiativeName: 'Infrastructure Hardening',
    storyPoints: 55,
  },
  {
    id: 'story-br4-1',
    businessRequestId: 'br-4',
    title: 'Redis rate limiter setup',
    type: 'story',
    status: 'not-started',
    priority: 'medium',
    targetStartDate: new Date('2025-07-01'),
    targetEndDate: new Date('2025-09-30'),
    completionPercentage: 0,
    themeName: 'Platform Reliability',
    initiativeName: 'Infrastructure Hardening',
    storyPoints: 55,
  },
];

// Helper functions to work with the linking model

// Get all work items linked to a specific business request
export function getLinkedItems(businessRequestId: string): LinkedWorkItem[] {
  return linkedWorkItems.filter(item => item.businessRequestId === businessRequestId);
}

// Build tree structure for a business request (for HierarchyTree component)
export function buildBusinessRequestTree(businessRequestId: string): TreeNode {
  const br = businessRequests.find(r => r.id === businessRequestId);
  if (!br) throw new Error(`Business request ${businessRequestId} not found`);

  const items = getLinkedItems(businessRequestId);
  
  return {
    id: br.id,
    title: br.title,
    type: 'business-request',
    status: br.status,
    priority: br.priority,
    releaseLabel: br.releaseLabel,
    completionPercentage: br.completionPercentage,
    children: items.map(item => ({
      id: item.id,
      title: item.title,
      type: item.type as 'epic' | 'story' | 'feature',
      status: item.status,
      priority: item.priority,
      releaseLabel: item.releaseLabel,
      completionPercentage: item.completionPercentage,
    })),
  };
}

// Build tree data for all business requests
export const businessRequestTreeData: TreeNode[] = businessRequests.map(br => 
  buildBusinessRequestTree(br.id)
);

// Build timeline data - combine business requests with their linked items
export const businessRequestTimelineData: GanttItem[] = [
  // Add all business requests
  ...businessRequests.map(br => ({
    id: br.id,
    title: br.title,
    type: 'business-request' as const,
    status: br.status,
    priority: br.priority,
    releaseLabel: br.releaseLabel,
    targetStartDate: br.targetStartDate,
    targetEndDate: br.targetEndDate,
    completionPercentage: br.completionPercentage,
    themeName: br.themeName,
    initiativeName: br.initiativeName,
    storyPoints: undefined,
  })),
  // Add all linked work items
  ...linkedWorkItems,
];
