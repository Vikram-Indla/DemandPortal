import { useMemo } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Target, Calendar, TrendingUp, Flag, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Feature {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  completionPercentage: number;
  status: 'planning' | 'in-progress' | 'completed' | 'at-risk';
  priority: 'critical' | 'high' | 'medium' | 'low';
  themeName: string;
  owner?: string;
  epicCount: number;
  completedEpics: number;
}

interface FeatureRoadmapProps {
  features: Feature[];
}

const statusConfig = {
  planning: { 
    label: 'Planning',
    color: 'bg-slate-100 dark:bg-slate-800/30 text-slate-700 dark:text-slate-300',
    icon: Target
  },
  'in-progress': { 
    label: 'In Progress',
    color: 'bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300',
    icon: TrendingUp
  },
  completed: { 
    label: 'Completed',
    color: 'bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-300',
    icon: Flag
  },
  'at-risk': { 
    label: 'At Risk',
    color: 'bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-300',
    icon: Flag
  },
};

const priorityColors = {
  critical: 'border-l-red-600 dark:border-l-red-400',
  high: 'border-l-amber-600 dark:border-l-amber-400',
  medium: 'border-l-blue-600 dark:border-l-blue-400',
  low: 'border-l-slate-400 dark:border-l-slate-500',
};

export default function FeatureRoadmap({ features }: FeatureRoadmapProps) {
  const { timelineMonths, minDate, maxDate } = useMemo(() => {
    if (features.length === 0) return { timelineMonths: [], minDate: new Date(), maxDate: new Date() };

    const allDates = features.flatMap(f => [f.startDate, f.endDate]);
    const min = new Date(Math.min(...allDates.map(d => d.getTime())));
    const max = new Date(Math.max(...allDates.map(d => d.getTime())));

    min.setDate(1);
    const end = new Date(max);
    end.setMonth(end.getMonth() + 1);

    const months: { label: string; date: Date }[] = [];
    const current = new Date(min);
    while (current <= end) {
      months.push({
        label: current.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
        date: new Date(current),
      });
      current.setMonth(current.getMonth() + 1);
    }

    return { timelineMonths: months, minDate: min, maxDate: end };
  }, [features]);

  const getFeaturePosition = (feature: Feature) => {
    const totalDays = Math.ceil((maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24));
    const startOffset = Math.ceil((feature.startDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24));
    const duration = Math.ceil((feature.endDate.getTime() - feature.startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    return {
      left: `${(startOffset / totalDays) * 100}%`,
      width: `${(duration / totalDays) * 100}%`,
    };
  };

  if (features.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        No features to display
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      {/* Timeline Header */}
      <div className="relative">
        <div className="flex border-b-2 border-primary/20">
          {timelineMonths.map((month, idx) => (
            <div
              key={idx}
              className="flex-1 text-center pb-3"
            >
              <span className="text-sm font-semibold text-primary">{month.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Cards */}
      <div className="space-y-6">
        {features.map((feature) => {
          const StatusIcon = statusConfig[feature.status].icon;
          const position = getFeaturePosition(feature);

          return (
            <Card 
              key={feature.id} 
              className={cn(
                "border-l-4 hover-elevate transition-all",
                priorityColors[feature.priority]
              )}
              data-testid={`feature-card-${feature.id}`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <Target className="w-6 h-6 text-primary" />
                      <h3 className="text-xl font-bold">{feature.title}</h3>
                    </div>
                    {feature.description && (
                      <p className="text-sm text-muted-foreground ml-9">{feature.description}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="secondary"
                      className={cn("flex items-center gap-1.5 px-3 py-1", statusConfig[feature.status].color)}
                    >
                      <StatusIcon className="w-3.5 h-3.5" />
                      {statusConfig[feature.status].label}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Metrics Row */}
                <div className="flex items-center gap-8 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">
                      {feature.startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="text-muted-foreground">→</span>
                    <span className="font-medium">
                      {feature.endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>

                  {feature.owner && (
                    <>
                      <div className="h-4 w-px bg-border" />
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{feature.owner}</span>
                      </div>
                    </>
                  )}

                  <div className="h-4 w-px bg-border" />
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Epics:</span>
                    <span className="font-semibold">{feature.completedEpics}/{feature.epicCount}</span>
                  </div>

                  <div className="flex-1" />
                  
                  <div className="text-right">
                    <span className="text-2xl font-bold text-primary">{feature.completionPercentage}%</span>
                    <span className="text-xs text-muted-foreground ml-2">Complete</span>
                  </div>
                </div>

                {/* Visual Timeline */}
                <div className="space-y-2">
                  <div className="relative h-12 bg-muted/30 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex">
                      {timelineMonths.map((_, idx) => (
                        <div key={idx} className="flex-1 border-r border-muted last:border-r-0" />
                      ))}
                    </div>
                    
                    <div
                      className="absolute top-1/2 -translate-y-1/2 h-8 rounded-md shadow-lg"
                      style={position}
                    >
                      <div className={cn(
                        "h-full rounded-md border-2 overflow-hidden",
                        feature.status === 'completed' ? 'bg-green-500 border-green-600' :
                        feature.status === 'at-risk' ? 'bg-red-500 border-red-600' :
                        feature.status === 'in-progress' ? 'bg-blue-500 border-blue-600' :
                        'bg-slate-400 border-slate-500'
                      )}>
                        <div 
                          className="h-full bg-white/30"
                          style={{ width: `${feature.completionPercentage}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <Progress value={feature.completionPercentage} className="h-1.5" />
                </div>

                {/* Theme Badge */}
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {feature.themeName}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
