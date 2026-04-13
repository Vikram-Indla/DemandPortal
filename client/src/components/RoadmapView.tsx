import { useState, useMemo } from 'react';
import HierarchyTree, { TreeNode } from './HierarchyTree';
import GanttChart, { GanttItem } from './GanttChart';
import FilterBar from './FilterBar';
import { Button } from '@/components/ui/button';
import { PanelLeftClose, PanelLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { businessRequestTreeData, businessRequestTimelineData } from '@/data/businessRoadmapMock';

const mockTreeData: TreeNode[] = businessRequestTreeData;

const mockGanttData: GanttItem[] = businessRequestTimelineData;

export default function RoadmapView() {
  const [isTreeVisible, setIsTreeVisible] = useState(false);
  const [timelineView, setTimelineView] = useState<'quarterly' | 'monthly'>('quarterly');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  // Get all business requests (for total count)
  const totalBusinessRequests = useMemo(() => {
    return mockGanttData.filter(item => item.type === 'business-request').length;
  }, []);

  const filteredGanttData = useMemo(() => {
    // For Business Roadmap, show only business requests (no child items)
    return mockGanttData.filter(item => {
      // Only show business requests at top level
      if (item.type !== 'business-request') return false;
      
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  }, [searchTerm]);

  // Filter tree data recursively
  const filteredTreeData = useMemo(() => {
    const filterNode = (node: TreeNode): TreeNode | null => {
      const matchesSearch = node.title.toLowerCase().includes(searchTerm.toLowerCase());

      // Filter children recursively
      const filteredChildren = node.children
        ?.map(child => filterNode(child))
        .filter((child): child is TreeNode => child !== null);

      // Show node if it matches filters OR if any of its children match
      const hasMatchingChildren = filteredChildren && filteredChildren.length > 0;

      if (matchesSearch || hasMatchingChildren) {
        return {
          ...node,
          children: filteredChildren,
        };
      }

      return null;
    };

    return mockTreeData
      .map(node => filterNode(node))
      .filter((node): node is TreeNode => node !== null);
  }, [searchTerm]);

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
        onExport={handleExport}
      />

      <div className="flex-1 flex overflow-hidden">
        {isTreeVisible && (
          <div className="w-96 border-r flex-shrink-0 overflow-hidden">
            <HierarchyTree
              nodes={filteredTreeData}
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
            <div className="flex items-center gap-2">
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
              <Button
                variant={timelineView === 'quarterly' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimelineView('quarterly')}
                data-testid="button-quarterly-view"
              >
                Quarterly
              </Button>
              <Button
                variant={timelineView === 'monthly' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimelineView('monthly')}
                data-testid="button-monthly-view"
              >
                Monthly
              </Button>
            </div>
            <span className="text-sm text-muted-foreground">
              Showing {filteredGanttData.length} of {totalBusinessRequests} items
            </span>
          </div>

          <div className="flex-1 overflow-hidden">
            <GanttChart
              items={filteredGanttData}
              timelineView={timelineView}
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
