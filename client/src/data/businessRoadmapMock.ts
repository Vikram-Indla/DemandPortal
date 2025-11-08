import { TreeNode } from '@/components/HierarchyTree';
import { GanttItem } from '@/components/GanttChart';

// Business Request mock data with mixed hierarchy
// New model: Business Request → Feature → Epic → Story
//            Business Request → Epic → Story (direct epic without feature parent)
// Completion percentages are automatically calculated from immediate children

// Common base fields for all work items
interface BaseWorkItem {
  id: string;
  title: string;
  status: 'in-progress' | 'done' | 'blocked' | 'not-started';
  priority: 'high' | 'medium' | 'low';
  targetStartDate: Date;
  targetEndDate: Date;
  completionPercentage?: number; // Optional - calculated from children if not provided
  storyPoints?: number;
}

// Story (leaf node)
export interface Story extends BaseWorkItem {
  type: 'story';
  completionPercentage: number; // Required for stories (not calculated)
}

// Epic (can have stories)
export interface Epic extends BaseWorkItem {
  type: 'epic';
  releaseLabel?: string;
  stories?: Story[];
}

// Feature (can have epics)
export interface Feature extends BaseWorkItem {
  type: 'feature';
  releaseLabel?: string;
  epics: Epic[];
}

// Business Request (can have Features OR Epics as direct children)
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
  completionPercentage?: number; // Optional - calculated from children
  children: Array<Feature | Epic>; // Mixed children using discriminated union
}

// Type guards for discriminated unions
function isFeature(item: Feature | Epic): item is Feature {
  return item.type === 'feature';
}

function isEpic(item: Feature | Epic | Story): item is Epic {
  return item.type === 'epic';
}

function isStory(item: Story | Epic): item is Story {
  return item.type === 'story';
}

// Recursive completion calculation
function calculateCompletion(item: BusinessRequest | Feature | Epic | Story): number {
  // Use explicit override if provided
  if (item.completionPercentage !== undefined && item.completionPercentage !== null) {
    // Stories always use their explicit percentage
    if ('type' in item && item.type === 'story') {
      return item.completionPercentage;
    }
    // For others, if they have children, calculate from children instead
  }
  
  // Business Request - calculate from mixed children (features and epics)
  if ('children' in item && item.children && item.children.length > 0) {
    const total = item.children.reduce((sum, child) => sum + calculateCompletion(child), 0);
    return Math.round(total / item.children.length);
  }
  
  // Feature - calculate from epics
  if ('type' in item && item.type === 'feature' && 'epics' in item && item.epics && item.epics.length > 0) {
    const total = item.epics.reduce((sum, epic) => sum + calculateCompletion(epic), 0);
    return Math.round(total / item.epics.length);
  }
  
  // Epic - calculate from stories
  if ('type' in item && item.type === 'epic' && 'stories' in item && item.stories && item.stories.length > 0) {
    const total = item.stories.reduce((sum, story) => sum + story.completionPercentage, 0);
    return Math.round(total / item.stories.length);
  }
  
  // Fallback to explicit percentage or 0
  return item.completionPercentage || 0;
}

// Mixed hierarchy business request data
export const businessRequests: BusinessRequest[] = [
  // BR-1: Has BOTH a Feature and a direct Epic
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
    children: [
      // Feature under BR-1
      {
        type: 'feature',
        id: 'feat-br1-1',
        title: 'Privacy Management Platform',
        status: 'in-progress',
        priority: 'high',
        releaseLabel: 'Q1 2025',
        targetStartDate: new Date('2024-11-01'),
        targetEndDate: new Date('2025-01-31'),
        storyPoints: 89,
        epics: [
          {
            type: 'epic',
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
                type: 'story',
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
                type: 'story',
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
        ],
      },
      // Direct Epic under BR-1 (no feature parent)
      {
        type: 'epic',
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
            type: 'story',
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
            type: 'story',
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
  
  // BR-2: Has TWO Features
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
    children: [
      {
        type: 'feature',
        id: 'feat-br2-1',
        title: 'Audit Trail System',
        status: 'in-progress',
        priority: 'high',
        releaseLabel: 'Q2 2025',
        targetStartDate: new Date('2025-01-15'),
        targetEndDate: new Date('2025-04-15'),
        storyPoints: 76,
        epics: [
          {
            type: 'epic',
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
                type: 'story',
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
                type: 'story',
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
        ],
      },
      {
        type: 'feature',
        id: 'feat-br2-2',
        title: 'Security Documentation Suite',
        status: 'not-started',
        priority: 'medium',
        releaseLabel: 'Q2 2025',
        targetStartDate: new Date('2025-04-16'),
        targetEndDate: new Date('2025-06-30'),
        storyPoints: 123,
        epics: [
          {
            type: 'epic',
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
                type: 'story',
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
                type: 'story',
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
    ],
  },
  
  // BR-3: Has one Feature with multiple Epics
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
    children: [
      {
        type: 'feature',
        id: 'feat-br3-1',
        title: 'Modern Dashboard Platform',
        status: 'in-progress',
        priority: 'medium',
        releaseLabel: 'Q2 2025',
        targetStartDate: new Date('2025-02-01'),
        targetEndDate: new Date('2025-05-31'),
        storyPoints: 110,
        epics: [
          {
            type: 'epic',
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
                type: 'story',
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
                type: 'story',
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
            type: 'epic',
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
                type: 'story',
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
    ],
  },
  
  // BR-4: Has only direct Epics (no features)
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
    children: [
      {
        type: 'epic',
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
            type: 'story',
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

// Helper functions for mixed hierarchy

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
    children: br.children.map(child => {
      if (isFeature(child)) {
        // Feature node
        const featureCompletion = calculateCompletion(child);
        return {
          id: child.id,
          title: child.title,
          type: 'feature',
          status: child.status,
          priority: child.priority,
          releaseLabel: child.releaseLabel,
          completionPercentage: featureCompletion,
          children: child.epics.map(epic => {
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
      } else {
        // Direct Epic node (no feature parent)
        const epicCompletion = calculateCompletion(child);
        return {
          id: child.id,
          title: child.title,
          type: 'epic',
          status: child.status,
          priority: child.priority,
          releaseLabel: child.releaseLabel,
          completionPercentage: epicCompletion,
          children: child.stories?.map(story => ({
            id: story.id,
            title: story.title,
            type: 'story',
            status: story.status,
            priority: story.priority,
            completionPercentage: story.completionPercentage,
          })),
        };
      }
    }),
  };
}

// Build tree data for all business requests
export const businessRequestTreeData: TreeNode[] = businessRequests.map(br => 
  buildBusinessRequestTree(br)
);

// Flatten mixed hierarchy for Gantt timeline (depth-first traversal)
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
  
  // Add children (features or direct epics)
  for (const child of br.children) {
    if (isFeature(child)) {
      // Add feature
      const featureCompletion = calculateCompletion(child);
      items.push({
        id: child.id,
        title: child.title,
        type: 'feature' as const,
        status: child.status,
        priority: child.priority,
        releaseLabel: child.releaseLabel,
        targetStartDate: child.targetStartDate,
        targetEndDate: child.targetEndDate,
        completionPercentage: featureCompletion,
        themeName: br.themeName,
        initiativeName: br.initiativeName,
        storyPoints: child.storyPoints,
      });
      
      // Add epics under feature
      for (const epic of child.epics) {
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
        
        // Add stories under epic
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
    } else {
      // Direct epic (no feature parent)
      const epicCompletion = calculateCompletion(child);
      items.push({
        id: child.id,
        title: child.title,
        type: 'epic' as const,
        status: child.status,
        priority: child.priority,
        releaseLabel: child.releaseLabel,
        targetStartDate: child.targetStartDate,
        targetEndDate: child.targetEndDate,
        completionPercentage: epicCompletion,
        themeName: br.themeName,
        initiativeName: br.initiativeName,
        storyPoints: child.storyPoints,
      });
      
      // Add stories under direct epic
      if (child.stories) {
        for (const story of child.stories) {
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
  }
  
  return items;
}

// Build timeline data - flatten all business requests and their children
export const businessRequestTimelineData: GanttItem[] = businessRequests.flatMap(br => 
  flattenToGanttItems(br)
);
