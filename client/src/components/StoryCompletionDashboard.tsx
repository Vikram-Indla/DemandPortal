import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  Search, 
  CheckCircle2, 
  Circle, 
  AlertCircle,
  Package,
  ArrowUpDown,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export interface Story {
  id: string;
  key: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done' | 'blocked';
  priority: 'highest' | 'high' | 'medium' | 'low' | 'lowest';
  assignee?: string;
  fixVersion: string;
  storyPoints?: number;
  epicName: string;
}

interface StoryCompletionDashboardProps {
  stories: Story[];
}

const statusIcons = {
  todo: Circle,
  'in-progress': Circle,
  done: CheckCircle2,
  blocked: AlertCircle,
};

const statusColors = {
  todo: 'text-slate-500',
  'in-progress': 'text-blue-500',
  done: 'text-green-500',
  blocked: 'text-red-500',
};

const priorityColors = {
  highest: 'text-red-600 dark:text-red-400',
  high: 'text-amber-600 dark:text-amber-400',
  medium: 'text-blue-600 dark:text-blue-400',
  low: 'text-slate-600 dark:text-slate-400',
  lowest: 'text-slate-500 dark:text-slate-500',
};

export default function StoryCompletionDashboard({ stories }: StoryCompletionDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<'key' | 'priority' | 'status'>('key');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const groupedByFixVersion = useMemo(() => {
    const filtered = stories.filter(story =>
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.fixVersion.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const groups = filtered.reduce((acc, story) => {
      if (!acc[story.fixVersion]) {
        acc[story.fixVersion] = [];
      }
      acc[story.fixVersion].push(story);
      return acc;
    }, {} as Record<string, Story[]>);

    // Sort stories within each group
    Object.keys(groups).forEach(version => {
      groups[version].sort((a, b) => {
        let comparison = 0;
        if (sortField === 'key') {
          comparison = a.key.localeCompare(b.key);
        } else if (sortField === 'priority') {
          const priorityOrder = { highest: 5, high: 4, medium: 3, low: 2, lowest: 1 };
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
        } else if (sortField === 'status') {
          comparison = a.status.localeCompare(b.status);
        }
        return sortDirection === 'asc' ? comparison : -comparison;
      });
    });

    return groups;
  }, [stories, searchTerm, sortField, sortDirection]);

  const handleSort = (field: 'key' | 'priority' | 'status') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getVersionMetrics = (versionStories: Story[]) => {
    const total = versionStories.length;
    const done = versionStories.filter(s => s.status === 'done').length;
    const inProgress = versionStories.filter(s => s.status === 'in-progress').length;
    const blocked = versionStories.filter(s => s.status === 'blocked').length;
    const totalPoints = versionStories.reduce((sum, s) => sum + (s.storyPoints || 0), 0);
    const donePoints = versionStories.filter(s => s.status === 'done').reduce((sum, s) => sum + (s.storyPoints || 0), 0);
    
    return {
      total,
      done,
      inProgress,
      blocked,
      completionPercentage: total > 0 ? Math.round((done / total) * 100) : 0,
      pointsCompletion: totalPoints > 0 ? Math.round((donePoints / totalPoints) * 100) : 0,
      totalPoints,
      donePoints,
    };
  };

  const SortButton = ({ field, children }: { field: 'key' | 'priority' | 'status'; children: React.ReactNode }) => (
    <Button
      variant="ghost"
      size="sm"
      className="h-7 px-2 text-xs font-semibold"
      onClick={() => handleSort(field)}
    >
      {children}
      {sortField === field && (
        sortDirection === 'asc' ? 
          <ArrowUp className="ml-1 w-3 h-3" /> : 
          <ArrowDown className="ml-1 w-3 h-3" />
      )}
      {sortField !== field && <ArrowUpDown className="ml-1 w-3 h-3 opacity-30" />}
    </Button>
  );

  return (
    <div className="space-y-6 p-6">
      {/* Search Bar */}
      <div className="flex items-center gap-2">
        <Search className="w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search stories, keys, or fix versions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
          data-testid="input-search-stories"
        />
      </div>

      {/* Fix Version Groups */}
      <div className="space-y-6">
        {Object.entries(groupedByFixVersion).map(([version, versionStories]) => {
          const metrics = getVersionMetrics(versionStories);

          return (
            <Card key={version} className="border-2" data-testid={`version-card-${version}`}>
              <CardHeader className="bg-muted/30 border-b-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                      <Package className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold flex items-center gap-2">
                        {version}
                        <Badge variant="secondary" className="text-xs">
                          {metrics.total} stories
                        </Badge>
                      </CardTitle>
                      <p className="text-xs text-muted-foreground mt-1">
                        {metrics.donePoints}/{metrics.totalPoints} story points completed
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{metrics.completionPercentage}%</div>
                      <div className="text-xs text-muted-foreground">Stories Complete</div>
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="font-semibold">{metrics.done}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Circle className="w-4 h-4 text-blue-500" />
                        <span className="font-semibold">{metrics.inProgress}</span>
                      </div>
                      {metrics.blocked > 0 && (
                        <div className="flex items-center gap-1">
                          <AlertCircle className="w-4 h-4 text-red-500" />
                          <span className="font-semibold text-red-600 dark:text-red-400">{metrics.blocked}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <Progress value={metrics.pointsCompletion} className="h-2 mt-3" />
              </CardHeader>

              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b bg-muted/10">
                      <tr>
                        <th className="text-left p-2 w-32">
                          <SortButton field="key">Key</SortButton>
                        </th>
                        <th className="text-left p-2">
                          <span className="text-xs font-semibold px-2">Summary</span>
                        </th>
                        <th className="text-left p-2 w-32">
                          <SortButton field="status">Status</SortButton>
                        </th>
                        <th className="text-left p-2 w-28">
                          <SortButton field="priority">Priority</SortButton>
                        </th>
                        <th className="text-left p-2 w-40">
                          <span className="text-xs font-semibold px-2">Assignee</span>
                        </th>
                        <th className="text-center p-2 w-20">
                          <span className="text-xs font-semibold">Points</span>
                        </th>
                        <th className="text-left p-2 w-48">
                          <span className="text-xs font-semibold px-2">Epic</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {versionStories.map((story, index) => {
                        const StatusIcon = statusIcons[story.status];

                        return (
                          <tr 
                            key={story.id}
                            className={cn(
                              "border-b last:border-b-0 hover-elevate",
                              index % 2 === 0 ? 'bg-background' : 'bg-muted/5'
                            )}
                            data-testid={`story-row-${story.key}`}
                          >
                            <td className="p-3">
                              <code className="text-xs font-mono font-semibold text-primary">{story.key}</code>
                            </td>
                            <td className="p-3">
                              <span className="text-sm">{story.title}</span>
                            </td>
                            <td className="p-3">
                              <div className="flex items-center gap-1.5">
                                <StatusIcon className={cn("w-4 h-4", statusColors[story.status])} />
                                <span className="text-xs capitalize">{story.status.replace('-', ' ')}</span>
                              </div>
                            </td>
                            <td className="p-3">
                              <Badge 
                                variant="outline" 
                                className={cn("text-xs capitalize", priorityColors[story.priority])}
                              >
                                {story.priority}
                              </Badge>
                            </td>
                            <td className="p-3">
                              <span className="text-xs">{story.assignee || '—'}</span>
                            </td>
                            <td className="p-3 text-center">
                              <span className="text-sm font-semibold">{story.storyPoints || '—'}</span>
                            </td>
                            <td className="p-3">
                              <span className="text-xs text-muted-foreground">{story.epicName}</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {Object.keys(groupedByFixVersion).length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No stories found matching your search.
        </div>
      )}
    </div>
  );
}
