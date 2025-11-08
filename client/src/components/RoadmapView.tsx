import { useState, useMemo } from 'react';
import HierarchyTree, { TreeNode } from './HierarchyTree';
import GanttChart, { GanttItem } from './GanttChart';
import FilterBar from './FilterBar';
import { Button } from '@/components/ui/button';
import { PanelLeftClose, PanelLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { businessRequestTreeData, businessRequestTimelineData } from '@/data/businessRoadmapMock';

//todo: remove mock functionality - replace with real Jira data
const mockTreeData: TreeNode[] = businessRequestTreeData;

// Original mock data - replaced with business request data
const _oldMockTreeData: TreeNode[] = [
  {
    id: 'feat-1',
    title: 'User Authentication & Authorization',
    type: 'feature',
    status: 'in-progress',
    priority: 'high',
    releaseLabel: 'Q1 2025',
    completionPercentage: 75,
    children: [
      {
        id: 'epic-1',
        title: 'SSO Integration',
        type: 'epic',
        status: 'done',
        priority: 'high',
        releaseLabel: 'Q1 2025',
        completionPercentage: 100,
        children: [
          {
            id: 'story-1',
            title: 'Configure OAuth2 endpoints',
            type: 'story',
            status: 'done',
            priority: 'high',
            completionPercentage: 100,
          },
          {
            id: 'story-2',
            title: 'Implement token refresh',
            type: 'story',
            status: 'done',
            priority: 'medium',
            completionPercentage: 100,
          },
        ],
      },
      {
        id: 'epic-2',
        title: 'Multi-factor Authentication',
        type: 'epic',
        status: 'in-progress',
        priority: 'high',
        releaseLabel: 'Q1 2025',
        completionPercentage: 50,
        children: [
          {
            id: 'story-3',
            title: 'SMS verification setup',
            type: 'story',
            status: 'done',
            priority: 'high',
            completionPercentage: 100,
          },
          {
            id: 'story-4',
            title: 'Authenticator app integration',
            type: 'story',
            status: 'in-progress',
            priority: 'medium',
            completionPercentage: 40,
          },
        ],
      },
    ],
  },
  {
    id: 'feat-2',
    title: 'Dashboard Analytics Widget',
    type: 'feature',
    status: 'in-progress',
    priority: 'medium',
    releaseLabel: 'Q2 2025',
    completionPercentage: 35,
    children: [
      {
        id: 'epic-3',
        title: 'Real-time Data Visualization',
        type: 'epic',
        status: 'in-progress',
        priority: 'medium',
        releaseLabel: 'Q2 2025',
        completionPercentage: 50,
        children: [
          {
            id: 'story-5',
            title: 'Chart.js integration',
            type: 'story',
            status: 'done',
            priority: 'medium',
            completionPercentage: 100,
          },
          {
            id: 'story-6',
            title: 'WebSocket connection for live updates',
            type: 'story',
            status: 'in-progress',
            priority: 'high',
            completionPercentage: 60,
          },
        ],
      },
      {
        id: 'epic-4',
        title: 'Custom Report Builder',
        type: 'epic',
        status: 'blocked',
        priority: 'low',
        releaseLabel: 'Q2 2025',
        completionPercentage: 10,
        children: [
          {
            id: 'story-7',
            title: 'Design report template engine',
            type: 'story',
            status: 'blocked',
            priority: 'low',
            completionPercentage: 10,
          },
        ],
      },
    ],
  },
  {
    id: 'feat-3',
    title: 'GDPR Data Privacy Controls',
    type: 'feature',
    status: 'blocked',
    priority: 'high',
    releaseLabel: 'Q2 2025',
    completionPercentage: 20,
    children: [
      {
        id: 'epic-5',
        title: 'User Data Export',
        type: 'epic',
        status: 'blocked',
        priority: 'high',
        releaseLabel: 'Q2 2025',
        completionPercentage: 25,
        children: [
          {
            id: 'story-8',
            title: 'Create export API endpoint',
            type: 'story',
            status: 'in-progress',
            priority: 'high',
            completionPercentage: 70,
          },
          {
            id: 'story-9',
            title: 'Add PDF generation',
            type: 'story',
            status: 'blocked',
            priority: 'medium',
            completionPercentage: 0,
          },
        ],
      },
    ],
  },
  {
    id: 'feat-4',
    title: 'Cloud Infrastructure Migration',
    type: 'feature',
    status: 'not-started',
    priority: 'medium',
    releaseLabel: 'Q3 2025',
    completionPercentage: 0,
    children: [
      {
        id: 'epic-6',
        title: 'AWS EKS Cluster Setup',
        type: 'epic',
        status: 'not-started',
        priority: 'medium',
        releaseLabel: 'Q3 2025',
        completionPercentage: 0,
        children: [
          {
            id: 'story-10',
            title: 'Setup EKS cluster',
            type: 'story',
            status: 'not-started',
            priority: 'medium',
            completionPercentage: 0,
          },
        ],
      },
    ],
  },
];

//todo: remove mock functionality - replace with real Jira data
const mockGanttData: GanttItem[] = businessRequestTimelineData;

// Original mock Gantt data - replaced with business request data
const _oldMockGanttData: GanttItem[] = [
  {
    id: 'feat-1',
    title: 'User Authentication & Authorization',
    type: 'feature',
    status: 'in-progress',
    priority: 'high',
    releaseLabel: 'Q1 2025',
    targetStartDate: new Date('2025-01-15'),
    targetEndDate: new Date('2025-03-31'),
    completionPercentage: 75,
    themeName: 'Digital Transformation',
    initiativeName: 'Customer Portal Modernization',
    storyPoints: 34,
  },
  {
    id: 'epic-1',
    title: 'SSO Integration',
    type: 'epic',
    status: 'done',
    priority: 'high',
    releaseLabel: 'Q1 2025',
    targetStartDate: new Date('2025-01-15'),
    targetEndDate: new Date('2025-02-28'),
    completionPercentage: 100,
    themeName: 'Digital Transformation',
    initiativeName: 'Customer Portal Modernization',
    storyPoints: 13,
  },
  {
    id: 'epic-2',
    title: 'Multi-factor Authentication',
    type: 'epic',
    status: 'in-progress',
    priority: 'high',
    releaseLabel: 'Q1 2025',
    targetStartDate: new Date('2025-02-15'),
    targetEndDate: new Date('2025-03-31'),
    completionPercentage: 50,
    themeName: 'Digital Transformation',
    initiativeName: 'Customer Portal Modernization',
    storyPoints: 21,
  },
  {
    id: 'story-1',
    title: 'Configure OAuth2 endpoints',
    type: 'story',
    status: 'done',
    priority: 'high',
    targetStartDate: new Date('2025-01-15'),
    targetEndDate: new Date('2025-02-01'),
    completionPercentage: 100,
    themeName: 'Digital Transformation',
    initiativeName: 'Customer Portal Modernization',
    storyPoints: 8,
  },
  {
    id: 'story-4',
    title: 'Authenticator app integration',
    type: 'story',
    status: 'in-progress',
    priority: 'medium',
    targetStartDate: new Date('2025-03-01'),
    targetEndDate: new Date('2025-03-31'),
    completionPercentage: 40,
    themeName: 'Digital Transformation',
    initiativeName: 'Customer Portal Modernization',
    storyPoints: 13,
  },
  {
    id: 'feat-2',
    title: 'Dashboard Analytics Widget',
    type: 'feature',
    status: 'in-progress',
    priority: 'medium',
    releaseLabel: 'Q2 2025',
    targetStartDate: new Date('2025-03-01'),
    targetEndDate: new Date('2025-06-30'),
    completionPercentage: 35,
    themeName: 'Digital Transformation',
    initiativeName: 'Customer Portal Modernization',
    storyPoints: 55,
  },
  {
    id: 'epic-3',
    title: 'Real-time Data Visualization',
    type: 'epic',
    status: 'in-progress',
    priority: 'medium',
    releaseLabel: 'Q2 2025',
    targetStartDate: new Date('2025-03-01'),
    targetEndDate: new Date('2025-05-15'),
    completionPercentage: 50,
    themeName: 'Digital Transformation',
    initiativeName: 'Customer Portal Modernization',
    storyPoints: 34,
  },
  {
    id: 'epic-4',
    title: 'Custom Report Builder',
    type: 'epic',
    status: 'blocked',
    priority: 'low',
    releaseLabel: 'Q2 2025',
    targetStartDate: new Date('2025-05-01'),
    targetEndDate: new Date('2025-06-30'),
    completionPercentage: 10,
    themeName: 'Digital Transformation',
    initiativeName: 'Customer Portal Modernization',
    storyPoints: 21,
  },
  {
    id: 'feat-3',
    title: 'GDPR Data Privacy Controls',
    type: 'feature',
    status: 'blocked',
    priority: 'high',
    releaseLabel: 'Q2 2025',
    targetStartDate: new Date('2025-04-01'),
    targetEndDate: new Date('2025-07-31'),
    completionPercentage: 20,
    themeName: 'Security Enhancement',
    initiativeName: 'Compliance & Audit',
    storyPoints: 89,
  },
  {
    id: 'epic-5',
    title: 'User Data Export',
    type: 'epic',
    status: 'blocked',
    priority: 'high',
    releaseLabel: 'Q2 2025',
    targetStartDate: new Date('2025-04-01'),
    targetEndDate: new Date('2025-06-15'),
    completionPercentage: 25,
    themeName: 'Security Enhancement',
    initiativeName: 'Compliance & Audit',
    storyPoints: 55,
  },
  {
    id: 'feat-4',
    title: 'Cloud Infrastructure Migration',
    type: 'feature',
    status: 'not-started',
    priority: 'medium',
    releaseLabel: 'Q3 2025',
    targetStartDate: new Date('2025-07-01'),
    targetEndDate: new Date('2025-09-30'),
    completionPercentage: 0,
    themeName: 'Infrastructure Optimization',
    initiativeName: 'Cloud Migration',
    storyPoints: 144,
  },
];

export default function RoadmapView() {
  const [isTreeVisible, setIsTreeVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [releaseFilter, setReleaseFilter] = useState('all');
  const { toast } = useToast();

  const releases = useMemo(() => {
    const uniqueReleases = new Set(mockGanttData.map(item => item.releaseLabel).filter(Boolean));
    return Array.from(uniqueReleases) as string[];
  }, []);

  const filteredGanttData = useMemo(() => {
    return mockGanttData.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLevel = levelFilter === 'all' || item.type === levelFilter;
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || item.priority === priorityFilter;
      const matchesRelease = releaseFilter === 'all' || item.releaseLabel === releaseFilter;
      return matchesSearch && matchesLevel && matchesStatus && matchesPriority && matchesRelease;
    });
  }, [searchTerm, levelFilter, statusFilter, priorityFilter, releaseFilter]);

  const handleExport = () => {
    toast({
      title: 'Export Started',
      description: 'Your roadmap is being exported to PDF...',
    });
  };

  return (
    <div className="h-full flex flex-col">
      <FilterBar
        onSearchChange={setSearchTerm}
        onLevelChange={setLevelFilter}
        onStatusChange={setStatusFilter}
        onPriorityChange={setPriorityFilter}
        onReleaseChange={setReleaseFilter}
        onExport={handleExport}
        releases={releases}
      />

      <div className="flex-1 flex overflow-hidden">
        {isTreeVisible && (
          <div className="w-96 border-r flex-shrink-0 overflow-hidden">
            <HierarchyTree
              nodes={mockTreeData}
              onNodeClick={(node) => {
                toast({
                  title: 'Item Selected',
                  description: `${node.title} - ${node.completionPercentage}% complete`,
                });
              }}
            />
          </div>
        )}

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-2 border-b flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsTreeVisible(!isTreeVisible)}
              data-testid="button-toggle-tree"
            >
              {isTreeVisible ? (
                <>
                  <PanelLeftClose className="w-4 h-4 mr-2" />
                  Hide Hierarchy
                </>
              ) : (
                <>
                  <PanelLeft className="w-4 h-4 mr-2" />
                  Show Hierarchy
                </>
              )}
            </Button>
            <span className="text-sm text-muted-foreground">
              Showing {filteredGanttData.length} of {mockGanttData.length} items
            </span>
          </div>

          <div className="flex-1 overflow-hidden">
            <GanttChart
              items={filteredGanttData}
              onItemClick={(item) => {
                toast({
                  title: item.title,
                  description: `${item.themeName} > ${item.initiativeName}`,
                });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
