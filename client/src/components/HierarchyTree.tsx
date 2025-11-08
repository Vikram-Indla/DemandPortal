import { useState } from 'react';
import { ChevronRight, ChevronDown, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface TreeNode {
  id: string;
  title: string;
  type: 'feature' | 'epic' | 'story' | 'business-request';
  status: 'done' | 'in-progress' | 'blocked' | 'not-started';
  priority: 'high' | 'medium' | 'low';
  releaseLabel?: string;
  completionPercentage: number;
  children?: TreeNode[];
}

interface HierarchyTreeProps {
  nodes: TreeNode[];
  onNodeClick?: (node: TreeNode) => void;
}

const typeLabels: Record<string, string> = {
  feature: 'Feature',
  epic: 'Epic',
  story: 'Story',
  'business-request': 'Business Request',
};

const statusColors: Record<string, string> = {
  done: 'bg-green-500/20 text-green-700 dark:text-green-400',
  'in-progress': 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400',
  blocked: 'bg-red-500/20 text-red-700 dark:text-red-400',
  'not-started': 'bg-gray-500/20 text-gray-700 dark:text-gray-400',
};

const priorityConfig: Record<string, { icon: any; color: string }> = {
  high: { icon: ArrowUp, color: 'text-red-600 dark:text-red-400' },
  medium: { icon: Minus, color: 'text-yellow-600 dark:text-yellow-400' },
  low: { icon: ArrowDown, color: 'text-gray-600 dark:text-gray-400' },
};

function TreeNodeItem({ node, level = 0, onNodeClick }: { node: TreeNode; level?: number; onNodeClick?: (node: TreeNode) => void }) {
  const [isExpanded, setIsExpanded] = useState(level < 2);
  const hasChildren = node.children && node.children.length > 0;
  const PriorityIcon = priorityConfig[node.priority]?.icon || Minus;

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-2 py-2 px-3 hover-elevate active-elevate-2 rounded-md cursor-pointer",
          level === 0 && "font-semibold"
        )}
        style={{ paddingLeft: `${level * 1.5 + 0.75}rem` }}
        onClick={() => {
          if (hasChildren) setIsExpanded(!isExpanded);
          onNodeClick?.(node);
        }}
        data-testid={`tree-node-${node.id}`}
      >
        {hasChildren ? (
          isExpanded ? (
            <ChevronDown className="w-4 h-4 flex-shrink-0" />
          ) : (
            <ChevronRight className="w-4 h-4 flex-shrink-0" />
          )
        ) : (
          <span className="w-4" />
        )}
        
        <PriorityIcon className={cn("w-3 h-3 flex-shrink-0", priorityConfig[node.priority]?.color || 'text-gray-600')} />
        
        <span className="flex-1 text-sm truncate">{node.title}</span>
        
        <div className="flex items-center gap-1 flex-shrink-0">
          {node.releaseLabel && (
            <Badge variant="outline" className="text-xs h-5">
              {node.releaseLabel}
            </Badge>
          )}
          <Badge variant="secondary" className={cn("text-xs", statusColors[node.status])}>
            {typeLabels[node.type]}
          </Badge>
          <span className="text-xs text-muted-foreground ml-1">
            {node.completionPercentage}%
          </span>
        </div>
      </div>
      {isExpanded && hasChildren && (
        <div>
          {node.children!.map((child) => (
            <TreeNodeItem key={child.id} node={child} level={level + 1} onNodeClick={onNodeClick} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function HierarchyTree({ nodes, onNodeClick }: HierarchyTreeProps) {
  const hasBusinessRequests = nodes.some(node => node.type === 'business-request');
  const hierarchyDescription = hasBusinessRequests 
    ? 'Business Requests with epics and stories' 
    : 'Feature → Epic → Story hierarchy';

  return (
    <div className="h-full overflow-auto p-4 bg-card">
      <div className="mb-4 px-3">
        <h3 className="text-lg font-semibold mb-1">Work Items</h3>
        <p className="text-xs text-muted-foreground">{hierarchyDescription}</p>
      </div>
      <div className="space-y-1">
        {nodes.map((node) => (
          <TreeNodeItem key={node.id} node={node} onNodeClick={onNodeClick} />
        ))}
      </div>
    </div>
  );
}
