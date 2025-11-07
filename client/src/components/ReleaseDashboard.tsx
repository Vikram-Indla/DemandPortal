import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Package, CheckCircle2, Circle, AlertCircle, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Story {
  id: string;
  key: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done' | 'blocked';
  priority: 'high' | 'medium' | 'low';
  assignee?: string;
  fixVersion: string;
  storyPoints?: number;
  epicName: string;
}

interface ReleaseDashboardProps {
  stories: Story[];
}

const statusConfig = {
  todo: { icon: Circle, color: 'text-slate-500' },
  'in-progress': { icon: Circle, color: 'text-amber-500' },
  done: { icon: CheckCircle2, color: 'text-green-500' },
  blocked: { icon: AlertCircle, color: 'text-red-500' },
};

const priorityConfig = {
  high: { icon: ArrowUp, color: 'text-red-600 dark:text-red-400' },
  medium: { icon: Minus, color: 'text-amber-600 dark:text-amber-400' },
  low: { icon: ArrowDown, color: 'text-slate-600 dark:text-slate-400' },
};

export default function ReleaseDashboard({ stories }: ReleaseDashboardProps) {
  const groupedByFixVersion = useMemo(() => {
    const groups = stories.reduce((acc, story) => {
      if (!acc[story.fixVersion]) {
        acc[story.fixVersion] = [];
      }
      acc[story.fixVersion].push(story);
      return acc;
    }, {} as Record<string, Story[]>);

    return groups;
  }, [stories]);

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

  return (
    <div className="p-6 space-y-6 overflow-auto h-full">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Release Dashboard</h2>
        <p className="text-muted-foreground">Track story progress by release version</p>
      </div>

      <div className="space-y-6">
        {Object.entries(groupedByFixVersion).map(([version, versionStories]) => {
          const metrics = getVersionMetrics(versionStories);

          return (
            <Card key={version} data-testid={`version-card-${version}`}>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-primary" />
                    <div>
                      <CardTitle className="text-lg">{version}</CardTitle>
                      <p className="text-xs text-muted-foreground mt-1">
                        {metrics.total} stories · {metrics.donePoints}/{metrics.totalPoints} points
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="font-semibold">{metrics.done}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Circle className="w-4 h-4 text-amber-500" />
                        <span className="font-semibold">{metrics.inProgress}</span>
                      </div>
                      {metrics.blocked > 0 && (
                        <div className="flex items-center gap-1">
                          <AlertCircle className="w-4 h-4 text-red-500" />
                          <span className="font-semibold text-red-600 dark:text-red-400">{metrics.blocked}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{metrics.completionPercentage}%</div>
                      <div className="text-xs text-muted-foreground">Complete</div>
                    </div>
                  </div>
                </div>
                
                <Progress value={metrics.pointsCompletion} className="h-2 mt-4" />
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-2">
                  {versionStories.map((story) => {
                    const StatusIcon = statusConfig[story.status].icon;
                    const PriorityIcon = priorityConfig[story.priority].icon;

                    return (
                      <div 
                        key={story.id}
                        className="flex items-center gap-3 p-3 rounded-md border hover-elevate"
                        data-testid={`story-item-${story.key}`}
                      >
                        <PriorityIcon className={cn("w-3.5 h-3.5 flex-shrink-0", priorityConfig[story.priority].color)} />
                        
                        <code className="text-xs font-mono font-semibold text-primary w-24 flex-shrink-0">
                          {story.key}
                        </code>
                        
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{story.title}</p>
                          <p className="text-xs text-muted-foreground truncate">{story.epicName}</p>
                        </div>

                        <div className="flex items-center gap-3 flex-shrink-0">
                          <div className="flex items-center gap-1.5">
                            <StatusIcon className={cn("w-4 h-4", statusConfig[story.status].color)} />
                            <span className="text-xs capitalize">{story.status.replace('-', ' ')}</span>
                          </div>

                          {story.storyPoints && (
                            <Badge variant="outline" className="text-xs">
                              {story.storyPoints} pts
                            </Badge>
                          )}

                          {story.assignee && (
                            <span className="text-xs text-muted-foreground w-28 truncate text-right">
                              {story.assignee}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {Object.keys(groupedByFixVersion).length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">No stories to display</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
