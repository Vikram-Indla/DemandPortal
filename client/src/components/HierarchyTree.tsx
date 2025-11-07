import { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface TreeNode {
  id: string;
  title: string;
  type: 'theme' | 'initiative' | 'br' | 'epic' | 'feature' | 'story' | 'bug' | 'incident' | 'subtask';
  status: 'done' | 'in-progress' | 'blocked' | 'not-started';
  children?: TreeNode[];
}

interface HierarchyTreeProps {
  nodes: TreeNode[];
  onNodeClick?: (node: TreeNode) => void;
}

const typeLabels: Record<string, string> = {
  theme: 'Theme',
  initiative: 'Initiative',
  br: 'BR',
  epic: 'Epic',
  feature: 'Feature',
  story: 'Story',
  bug: 'Bug',
  incident: 'Incident',
  subtask: 'Subtask',
};

const statusColors: Record<string, string> = {
  done: 'bg-green-500/20 text-green-700 dark:text-green-400',
  'in-progress': 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400',
  blocked: 'bg-red-500/20 text-red-700 dark:text-red-400',
  'not-started': 'bg-gray-500/20 text-gray-700 dark:text-gray-400',
};

function TreeNodeItem({ node, level = 0, onNodeClick }: { node: TreeNode; level?: number; onNodeClick?: (node: TreeNode) => void }) {
  const [isExpanded, setIsExpanded] = useState(level < 2);
  const hasChildren = node.children && node.children.length > 0;

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
        <span className="flex-1 text-sm truncate">{node.title}</span>
        <Badge variant="secondary" className={cn("text-xs", statusColors[node.status])}>
          {typeLabels[node.type]}
        </Badge>
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
  return (
    <div className="h-full overflow-auto p-4 bg-card">
      <h3 className="text-lg font-semibold mb-4 px-3">Project Hierarchy</h3>
      <div className="space-y-1">
        {nodes.map((node) => (
          <TreeNodeItem key={node.id} node={node} onNodeClick={onNodeClick} />
        ))}
      </div>
    </div>
  );
}
