import { useState, useMemo } from 'react';
import HierarchyTree, { TreeNode } from './HierarchyTree';
import GanttChart, { GanttItem } from './GanttChart';
import FilterBar from './FilterBar';
import { Button } from '@/components/ui/button';
import { PanelLeftClose, PanelLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const mockTreeData: TreeNode[] = [
  {
    id: 'theme-1',
    title: 'Digital Transformation Initiative',
    type: 'theme',
    status: 'in-progress',
    children: [
      {
        id: 'init-1',
        title: 'Customer Portal Modernization',
        type: 'initiative',
        status: 'in-progress',
        children: [
          {
            id: 'br-1',
            title: 'New Authentication System',
            type: 'br',
            status: 'done',
            children: [
              {
                id: 'epic-1',
                title: 'SSO Integration',
                type: 'epic',
                status: 'done',
                children: [
                  {
                    id: 'feature-1',
                    title: 'OAuth2 Provider Setup',
                    type: 'feature',
                    status: 'done',
                    children: [
                      {
                        id: 'story-1',
                        title: 'Configure OAuth endpoints',
                        type: 'story',
                        status: 'done',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'br-2',
            title: 'UI/UX Redesign',
            type: 'br',
            status: 'in-progress',
            children: [
              {
                id: 'epic-2',
                title: 'Dashboard Refresh',
                type: 'epic',
                status: 'in-progress',
                children: [
                  {
                    id: 'feature-2',
                    title: 'New Analytics Widget',
                    type: 'feature',
                    status: 'in-progress',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'theme-2',
    title: 'Infrastructure Optimization',
    type: 'theme',
    status: 'not-started',
    children: [
      {
        id: 'init-2',
        title: 'Cloud Migration',
        type: 'initiative',
        status: 'not-started',
        children: [
          {
            id: 'br-3',
            title: 'AWS Setup',
            type: 'br',
            status: 'not-started',
          },
        ],
      },
    ],
  },
  {
    id: 'theme-3',
    title: 'Security Enhancement',
    type: 'theme',
    status: 'in-progress',
    children: [
      {
        id: 'init-3',
        title: 'Compliance & Audit',
        type: 'initiative',
        status: 'blocked',
        children: [
          {
            id: 'br-4',
            title: 'GDPR Compliance',
            type: 'br',
            status: 'blocked',
            children: [
              {
                id: 'epic-3',
                title: 'Data Privacy Controls',
                type: 'epic',
                status: 'blocked',
              },
            ],
          },
        ],
      },
    ],
  },
];

const mockGanttData: GanttItem[] = [
  {
    id: 'theme-1',
    title: 'Digital Transformation Initiative',
    type: 'Theme',
    status: 'in-progress',
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-06-30'),
    progress: 45,
  },
  {
    id: 'init-1',
    title: 'Customer Portal Modernization',
    type: 'Initiative',
    status: 'in-progress',
    startDate: new Date('2025-01-15'),
    endDate: new Date('2025-04-30'),
    progress: 60,
  },
  {
    id: 'br-1',
    title: 'New Authentication System',
    type: 'BR',
    status: 'done',
    startDate: new Date('2025-02-01'),
    endDate: new Date('2025-03-15'),
    progress: 100,
  },
  {
    id: 'epic-1',
    title: 'SSO Integration',
    type: 'Epic',
    status: 'done',
    startDate: new Date('2025-02-01'),
    endDate: new Date('2025-03-01'),
    progress: 100,
  },
  {
    id: 'br-2',
    title: 'UI/UX Redesign',
    type: 'BR',
    status: 'in-progress',
    startDate: new Date('2025-03-01'),
    endDate: new Date('2025-05-31'),
    progress: 40,
  },
  {
    id: 'theme-2',
    title: 'Infrastructure Optimization',
    type: 'Theme',
    status: 'not-started',
    startDate: new Date('2025-05-01'),
    endDate: new Date('2025-12-31'),
    progress: 0,
  },
  {
    id: 'init-2',
    title: 'Cloud Migration',
    type: 'Initiative',
    status: 'not-started',
    startDate: new Date('2025-05-01'),
    endDate: new Date('2025-08-31'),
    progress: 0,
  },
  {
    id: 'theme-3',
    title: 'Security Enhancement',
    type: 'Theme',
    status: 'in-progress',
    startDate: new Date('2025-02-15'),
    endDate: new Date('2025-07-31'),
    progress: 20,
  },
  {
    id: 'init-3',
    title: 'Compliance & Audit',
    type: 'Initiative',
    status: 'blocked',
    startDate: new Date('2025-03-01'),
    endDate: new Date('2025-06-30'),
    progress: 25,
  },
];

export default function RoadmapView() {
  const [isTreeVisible, setIsTreeVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();

  const filteredGanttData = useMemo(() => {
    return mockGanttData.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLevel = levelFilter === 'all' || item.type.toLowerCase() === levelFilter;
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      return matchesSearch && matchesLevel && matchesStatus;
    });
  }, [searchTerm, levelFilter, statusFilter]);

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
        onExport={handleExport}
      />

      <div className="flex-1 flex overflow-hidden">
        {isTreeVisible && (
          <div className="w-80 border-r flex-shrink-0 overflow-hidden">
            <HierarchyTree
              nodes={mockTreeData}
              onNodeClick={(node) => {
                toast({
                  title: 'Item Selected',
                  description: `${node.title} (${node.type})`,
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
                  Hide Tree
                </>
              ) : (
                <>
                  <PanelLeft className="w-4 h-4 mr-2" />
                  Show Tree
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
                  description: `Status: ${item.status} | Progress: ${item.progress}%`,
                });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
