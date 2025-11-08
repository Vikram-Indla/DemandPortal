import { TreeNode } from '@/components/HierarchyTree';
import { GanttItem } from '@/components/GanttChart';

// Business Request mock data for Business Roadmap
// Hierarchical model: Business Request → Epic → Story
// Completion percentages are automatically calculated from immediate children

// Story interface
interface Story {
  id: string;
  title: string;
  status: 'in-progress' | 'done' | 'blocked' | 'not-started';
  priority: 'high' | 'medium' | 'low';
  targetStartDate: Date;
  targetEndDate: Date;
  completionPercentage: number;
  storyPoints?: number;
}

// Epic interface with optional children
interface Epic {
  id: string;
  title: string;
  status: 'in-progress' | 'done' | 'blocked' | 'not-started';
  priority: 'high' | 'medium' | 'low';
  releaseLabel?: string;
  targetStartDate: Date;
  targetEndDate: Date;
  completionPercentage?: number; // Optional - will be calculated from stories if not provided
  storyPoints?: number;
  stories?: Story[];
}

// Business Request interface with children
interface BusinessRequest {
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
  completionPercentage?: number; // Optional - will be calculated from epics
  epics: Epic[];
}

// Automatic percentage calculation based on immediate children
function calculateCompletion(item: BusinessRequest | Epic): number {
  if ('epics' in item) {
    // Business Request - calculate from epics
    if (!item.epics || item.epics.length === 0) return 0;
    const total = item.epics.reduce((sum, epic) => sum + calculateCompletion(epic), 0);
    return Math.round(total / item.epics.length);
  } else if ('stories' in item && item.stories && item.stories.length > 0) {
    // Epic with stories - calculate from stories
    const total = item.stories.reduce((sum, story) => sum + story.completionPercentage, 0);
    return Math.round(total / item.stories.length);
  } else {
    // Epic without stories - use explicit percentage or 0
    return item.completionPercentage || 0;
  }
}

// Hierarchical business request data
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
    epics: [
      {
        id: 'epic-br1-1',
        title: 'Data Privacy Controls',
        status: 'in-progress',
        priority: 'high',
        releaseLabel: 'Q1 2025',
        targetStartDate: new Date('2024-11-01'),
        targetEndDate: new Date('2025-01-31'),
        storyPoints: 34,
        stories: [
          {
            id: 'story-br1-1',
            title: 'User consent management UI',
            status: 'done',
            priority: 'high',
            targetStartDate: new Date('2024-11-01'),
            targetEndDate: new Date('2024-12-15'),
            completionPercentage: 100,
            storyPoints: 13,
          },
          {
            id: 'story-br1-2',
            title: 'Cookie banner implementation',
            status: 'in-progress',
            priority: 'high',
            targetStartDate: new Date('2024-12-16'),
            targetEndDate: new Date('2025-01-31'),
            completionPercentage: 70,
            storyPoints: 21,
          },
        ],
      },
      {
        id: 'epic-br1-2',
        title: 'Data Export Functionality',
        status: 'in-progress',
        priority: 'high',
        releaseLabel: 'Q1 2025',
        targetStartDate: new Date('2025-02-01'),
        targetEndDate: new Date('2025-03-31'),
        storyPoints: 55,
        stories: [
          {
            id: 'story-br1-3',
            title: 'Export user data API',
            status: 'done',
            priority: 'high',
            targetStartDate: new Date('2025-02-01'),
            targetEndDate: new Date('2025-02-28'),
            completionPercentage: 100,
            storyPoints: 34,
          },
          {
            id: 'story-br1-4',
            title: 'PDF generation for export',
            status: 'not-started',
            priority: 'medium',
            targetStartDate: new Date('2025-03-01'),
            targetEndDate: new Date('2025-03-31'),
            completionPercentage: 0,
            storyPoints: 21,
          },
        ],
      },
    ],
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
    epics: [
      {
        id: 'epic-br2-1',
        title: 'Access Control Audit Trail',
        status: 'in-progress',
        priority: 'high',
        releaseLabel: 'Q2 2025',
        targetStartDate: new Date('2025-01-15'),
        targetEndDate: new Date('2025-04-15'),
        storyPoints: 55,
        stories: [
          {
            id: 'story-br2-1',
            title: 'Implement audit logging',
            status: 'done',
            priority: 'high',
            targetStartDate: new Date('2025-01-15'),
            targetEndDate: new Date('2025-03-01'),
            completionPercentage: 100,
            storyPoints: 34,
          },
          {
            id: 'story-br2-2',
            title: 'Build audit dashboard',
            status: 'in-progress',
            priority: 'medium',
            targetStartDate: new Date('2025-03-02'),
            targetEndDate: new Date('2025-04-15'),
            completionPercentage: 40,
            storyPoints: 21,
          },
        ],
      },
      {
        id: 'epic-br2-2',
        title: 'Security Documentation',
        status: 'not-started',
        priority: 'medium',
        releaseLabel: 'Q2 2025',
        targetStartDate: new Date('2025-04-16'),
        targetEndDate: new Date('2025-06-30'),
        storyPoints: 89,
        stories: [
          {
            id: 'story-br2-3',
            title: 'Document security policies',
            status: 'in-progress',
            priority: 'medium',
            targetStartDate: new Date('2025-04-16'),
            targetEndDate: new Date('2025-05-31'),
            completionPercentage: 30,
            storyPoints: 55,
          },
          {
            id: 'story-br2-4',
            title: 'Create incident response plan',
            status: 'not-started',
            priority: 'medium',
            targetStartDate: new Date('2025-06-01'),
            targetEndDate: new Date('2025-06-30'),
            completionPercentage: 0,
            storyPoints: 34,
          },
        ],
      },
    ],
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
    epics: [
      {
        id: 'epic-br3-1',
        title: 'Real-time Analytics',
        status: 'in-progress',
        priority: 'medium',
        releaseLabel: 'Q2 2025',
        targetStartDate: new Date('2025-02-01'),
        targetEndDate: new Date('2025-04-15'),
        storyPoints: 55,
        stories: [
          {
            id: 'story-br3-1',
            title: 'WebSocket live updates',
            status: 'in-progress',
            priority: 'high',
            targetStartDate: new Date('2025-02-01'),
            targetEndDate: new Date('2025-03-15'),
            completionPercentage: 60,
            storyPoints: 34,
          },
          {
            id: 'story-br3-2',
            title: 'Custom metrics widgets',
            status: 'not-started',
            priority: 'medium',
            targetStartDate: new Date('2025-03-16'),
            targetEndDate: new Date('2025-04-15'),
            completionPercentage: 0,
            storyPoints: 21,
          },
        ],
      },
      {
        id: 'epic-br3-2',
        title: 'Mobile Responsive Design',
        status: 'blocked',
        priority: 'low',
        releaseLabel: 'Q2 2025',
        targetStartDate: new Date('2025-04-16'),
        targetEndDate: new Date('2025-05-31'),
        storyPoints: 34,
        stories: [
          {
            id: 'story-br3-3',
            title: 'Responsive layout implementation',
            status: 'blocked',
            priority: 'low',
            targetStartDate: new Date('2025-04-16'),
            targetEndDate: new Date('2025-05-31'),
            completionPercentage: 20,
            storyPoints: 34,
          },
        ],
      },
    ],
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
    epics: [
      {
        id: 'epic-br4-1',
        title: 'Rate Limiter Implementation',
        status: 'not-started',
        priority: 'medium',
        releaseLabel: 'Q3 2025',
        targetStartDate: new Date('2025-07-01'),
        targetEndDate: new Date('2025-09-30'),
        storyPoints: 55,
        stories: [
          {
            id: 'story-br4-1',
            title: 'Redis rate limiter setup',
            status: 'not-started',
            priority: 'medium',
            targetStartDate: new Date('2025-07-01'),
            targetEndDate: new Date('2025-09-30'),
            completionPercentage: 0,
            storyPoints: 55,
          },
        ],
      },
    ],
  },
];

// Helper functions to work with the hierarchical model

// Build tree structure for HierarchyTree component
export function buildBusinessRequestTree(br: BusinessRequest): TreeNode {
  const brCompletion = calculateCompletion(br);
  
  return {
    id: br.id,
    title: br.title,
    type: 'business-request',
    status: br.status,
    priority: br.priority,
    releaseLabel: br.releaseLabel,
    completionPercentage: brCompletion,
    children: br.epics.map(epic => {
      const epicCompletion = calculateCompletion(epic);
      return {
        id: epic.id,
        title: epic.title,
        type: 'epic',
        status: epic.status,
        priority: epic.priority,
        releaseLabel: epic.releaseLabel,
        completionPercentage: epicCompletion,
        children: epic.stories?.map(story => ({
          id: story.id,
          title: story.title,
          type: 'story',
          status: story.status,
          priority: story.priority,
          completionPercentage: story.completionPercentage,
        })),
      };
    }),
  };
}

// Build tree data for all business requests
export const businessRequestTreeData: TreeNode[] = businessRequests.map(br => 
  buildBusinessRequestTree(br)
);

// Flatten hierarchical structure for Gantt timeline
function flattenToGanttItems(br: BusinessRequest): GanttItem[] {
  const brCompletion = calculateCompletion(br);
  const items: GanttItem[] = [];
  
  // Add business request
  items.push({
    id: br.id,
    title: br.title,
    type: 'business-request' as const,
    status: br.status,
    priority: br.priority,
    releaseLabel: br.releaseLabel,
    targetStartDate: br.targetStartDate,
    targetEndDate: br.targetEndDate,
    completionPercentage: brCompletion,
    themeName: br.themeName,
    initiativeName: br.initiativeName,
    storyPoints: undefined,
  });
  
  // Add epics
  for (const epic of br.epics) {
    const epicCompletion = calculateCompletion(epic);
    items.push({
      id: epic.id,
      title: epic.title,
      type: 'epic' as const,
      status: epic.status,
      priority: epic.priority,
      releaseLabel: epic.releaseLabel,
      targetStartDate: epic.targetStartDate,
      targetEndDate: epic.targetEndDate,
      completionPercentage: epicCompletion,
      themeName: br.themeName,
      initiativeName: br.initiativeName,
      storyPoints: epic.storyPoints,
    });
    
    // Add stories
    if (epic.stories) {
      for (const story of epic.stories) {
        items.push({
          id: story.id,
          title: story.title,
          type: 'story' as const,
          status: story.status,
          priority: story.priority,
          targetStartDate: story.targetStartDate,
          targetEndDate: story.targetEndDate,
          completionPercentage: story.completionPercentage,
          themeName: br.themeName,
          initiativeName: br.initiativeName,
          storyPoints: story.storyPoints,
        });
      }
    }
  }
  
  return items;
}

// Build timeline data - flatten all business requests and their children
export const businessRequestTimelineData: GanttItem[] = businessRequests.flatMap(br => 
  flattenToGanttItems(br)
);
