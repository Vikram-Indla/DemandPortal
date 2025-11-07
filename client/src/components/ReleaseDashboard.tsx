import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';
import { 
  Package, 
  CheckCircle2, 
  Circle, 
  AlertCircle, 
  ArrowUp, 
  ArrowDown, 
  Minus,
  ChevronDown,
  ChevronRight,
  Users,
  ChevronRight as BreadcrumbIcon
} from 'lucide-react';
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
  featureName: string;
  businessRequestName: string;
  subtaskAssignees?: string[];
}

interface ReleaseDashboardProps {
  stories: Story[];
}

const statusConfig = {
  todo: { icon: Circle, color: 'text-slate-500', label: 'To Do' },
  'in-progress': { icon: Circle, color: 'text-amber-500', label: 'In Progress' },
  done: { icon: CheckCircle2, color: 'text-green-500', label: 'Done' },
  blocked: { icon: AlertCircle, color: 'text-red-500', label: 'Blocked' },
};

const priorityConfig = {
  high: { icon: ArrowUp, color: 'text-red-600 dark:text-red-400' },
  medium: { icon: Minus, color: 'text-amber-600 dark:text-amber-400' },
  low: { icon: ArrowDown, color: 'text-slate-600 dark:text-slate-400' },
};

export default function ReleaseDashboard({ stories }: ReleaseDashboardProps) {
  const [expandedVersions, setExpandedVersions] = useState<Record<string, boolean>>({});

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

  const toggleVersion = (version: string) => {
    setExpandedVersions(prev => ({
      ...prev,
      [version]: !prev[version]
    }));
  };

  const getVersionMetrics = (versionStories: Story[]) => {
    const total = versionStories.length;
    const done = versionStories.filter(s => s.status === 'done').length;
    const inProgress = versionStories.filter(s => s.status === 'in-progress').length;
    const blocked = versionStories.filter(s => s.status === 'blocked').length;
    
    return {
      total,
      done,
      inProgress,
      blocked,
      completionPercentage: total > 0 ? Math.round((done / total) * 100) : 0,
    };
  };

  return (
    <div className="p-6 space-y-6 overflow-auto h-full">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Release Dashboard</h2>
        <p className="text-muted-foreground">Track story progress by release version</p>
      </div>

      <div className="space-y-4">
        {Object.entries(groupedByFixVersion).map(([version, versionStories]) => {
          const metrics = getVersionMetrics(versionStories);
          const isExpanded = expandedVersions[version];

          return (
            <Card key={version} data-testid={`version-card-${version}`}>
              <CardHeader 
                className="pb-4 cursor-pointer hover-elevate transition-colors"
                onClick={() => toggleVersion(version)}
              >
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3 flex-1">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8 flex-shrink-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleVersion(version);
                      }}
                      data-testid={`button-toggle-${version}`}
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </Button>
                    
                    <Package className="w-5 h-5 text-primary flex-shrink-0" />
                    
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg">{version}</CardTitle>
                      <p className="text-xs text-muted-foreground mt-1">
                        {metrics.total} {metrics.total === 1 ? 'story' : 'stories'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 flex-shrink-0">
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
                
                <Progress value={metrics.completionPercentage} className="h-2 mt-4" />
              </CardHeader>

              {isExpanded && (
                <CardContent className="pt-0 space-y-1">
                  {versionStories.map((story) => {
                    const StatusIcon = statusConfig[story.status].icon;
                    const PriorityIcon = priorityConfig[story.priority].icon;
                    const hasResources = story.subtaskAssignees && story.subtaskAssignees.length > 0;

                    return (
                      <HoverCard key={story.id} openDelay={300}>
                        <HoverCardTrigger asChild>
                          <div 
                            className="px-3 py-2 rounded-md border hover-elevate transition-all cursor-pointer group"
                            data-testid={`story-item-${story.key}`}
                          >
                            <div className="flex items-center gap-2.5">
                              <PriorityIcon className={cn("w-3 h-3 flex-shrink-0", priorityConfig[story.priority].color)} />
                              
                              <code className="text-xs font-mono font-semibold text-primary w-20 flex-shrink-0">
                                {story.key}
                              </code>

                              <div className="flex items-center gap-1.5 flex-shrink-0">
                                <StatusIcon className={cn("w-3 h-3", statusConfig[story.status].color)} />
                                <span className="text-xs text-muted-foreground w-20">{statusConfig[story.status].label}</span>
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{story.title}</p>
                              </div>

                              <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0 max-w-md">
                                <span className="truncate">{story.businessRequestName}</span>
                                <BreadcrumbIcon className="w-2.5 h-2.5 flex-shrink-0" />
                                <span className="truncate">{story.featureName}</span>
                                <BreadcrumbIcon className="w-2.5 h-2.5 flex-shrink-0" />
                                <span className="truncate font-medium">{story.epicName}</span>
                              </div>

                              {hasResources && (
                                <div className="flex items-center gap-1 text-muted-foreground flex-shrink-0">
                                  <Users className="w-3 h-3" />
                                  <span className="text-xs font-semibold">{story.subtaskAssignees?.length || 0}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </HoverCardTrigger>
                        
                        {hasResources && (
                          <HoverCardContent 
                            className="w-80 p-4 z-[100]"
                            side="top"
                            align="end"
                          >
                            <div className="space-y-3">
                              <div className="flex items-center gap-2 pb-2 border-b">
                                <Users className="w-4 h-4 text-primary" />
                                <h4 className="font-semibold text-sm">Resources Working on This Story</h4>
                              </div>
                              
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-muted-foreground">Story</span>
                                  <code className="font-mono font-semibold text-primary">{story.key}</code>
                                </div>
                                <p className="text-sm font-medium">{story.title}</p>
                              </div>

                              <div className="pt-2 border-t">
                                <p className="text-xs text-muted-foreground mb-2">Team Members ({story.subtaskAssignees?.length || 0}):</p>
                                <div className="space-y-1.5">
                                  {story.subtaskAssignees?.map((assignee, index) => (
                                    <div 
                                      key={index}
                                      className="flex items-center gap-2 p-2 rounded-md bg-muted/30"
                                    >
                                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <span className="text-xs font-semibold text-primary">
                                          {assignee.split(' ').map(n => n[0]).join('')}
                                        </span>
                                      </div>
                                      <span className="text-sm">{assignee}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </HoverCardContent>
                        )}
                      </HoverCard>
                    );
                  })}
                </CardContent>
              )}
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
