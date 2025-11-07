import { useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Progress } from '@/components/ui/progress';
import { Calendar, Users, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Feature {
  id: string;
  title: string;
  themeName: string;
  startDate: Date;
  endDate: Date;
  completionPercentage: number;
  status: 'done' | 'in-progress' | 'blocked' | 'not-started';
  epicCount: number;
  completedEpics: number;
  owner?: string;
  description?: string;
}

interface FeatureRoadmapProps {
  features: Feature[];
}

const statusColors: Record<string, { bg: string; border: string; text: string }> = {
  done: { 
    bg: 'bg-green-100 dark:bg-green-950/30', 
    border: 'border-green-500',
    text: 'text-green-800 dark:text-green-300'
  },
  'in-progress': { 
    bg: 'bg-amber-100 dark:bg-amber-950/30', 
    border: 'border-amber-500',
    text: 'text-amber-900 dark:text-amber-300'
  },
  blocked: { 
    bg: 'bg-red-100 dark:bg-red-950/30', 
    border: 'border-red-500',
    text: 'text-red-900 dark:text-red-300'
  },
  'not-started': { 
    bg: 'bg-slate-100 dark:bg-slate-800/30', 
    border: 'border-slate-400',
    text: 'text-slate-800 dark:text-slate-300'
  },
};

export default function FeatureRoadmap({ features }: FeatureRoadmapProps) {
  const { months, startDate, endDate } = useMemo(() => {
    if (features.length === 0) return { months: [], startDate: new Date(), endDate: new Date() };

    const allDates = features.flatMap(f => [f.startDate, f.endDate]);
    const minDate = new Date(Math.min(...allDates.map(d => d.getTime())));
    const maxDate = new Date(Math.max(...allDates.map(d => d.getTime())));

    minDate.setDate(1);
    const end = new Date(maxDate);
    end.setMonth(end.getMonth() + 1);
    end.setDate(0);

    const monthsList: { label: string; date: Date }[] = [];
    const current = new Date(minDate);
    while (current <= end) {
      monthsList.push({
        label: current.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        date: new Date(current),
      });
      current.setMonth(current.getMonth() + 1);
    }

    return { months: monthsList, startDate: minDate, endDate: end };
  }, [features]);

  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  const getBarPosition = (feature: Feature) => {
    const itemStart = Math.max(feature.startDate.getTime(), startDate.getTime());
    const itemEnd = Math.min(feature.endDate.getTime(), endDate.getTime());

    const startOffset = Math.ceil((itemStart - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const duration = Math.ceil((itemEnd - itemStart) / (1000 * 60 * 60 * 24));

    const left = (startOffset / totalDays) * 100;
    const width = (duration / totalDays) * 100;

    return { left: `${left}%`, width: `${width}%` };
  };

  if (features.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        No features to display
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto bg-background">
      <div className="sticky top-0 z-[5] bg-card border-b">
        <div className="flex h-12 items-center">
          <div className="w-80 px-4 font-semibold text-sm border-r flex-shrink-0">Feature</div>
          <div className="flex-1 flex">
            {months.map((month, idx) => (
              <div
                key={idx}
                className="flex-1 px-2 py-3 text-center text-xs font-medium border-r last:border-r-0"
              >
                {month.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative">
        {features.map((feature) => {
          const statusColor = statusColors[feature.status];
          
          return (
            <div key={feature.id} className="flex h-20 border-b hover-elevate" data-testid={`feature-item-${feature.id}`}>
              <div className="w-80 px-4 py-3 flex flex-col gap-2 border-r flex-shrink-0">
                <div className="flex items-center gap-2">
                  <Target className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium truncate flex-1">{feature.title}</span>
                  <Badge variant="secondary" className="text-xs">Feature</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs h-5">
                    {feature.themeName}
                  </Badge>
                  <span className="text-xs text-muted-foreground truncate">
                    {feature.completedEpics}/{feature.epicCount} epics
                  </span>
                </div>
              </div>
              
              <div className="flex-1 relative py-3">
                <div className="absolute inset-0 flex">
                  {months.map((_, idx) => (
                    <div key={idx} className="flex-1 border-r last:border-r-0" />
                  ))}
                </div>
                
                <HoverCard openDelay={200}>
                  <HoverCardTrigger asChild>
                    <div
                      className="absolute top-3 h-14 cursor-pointer group"
                      style={getBarPosition(feature)}
                    >
                      <div className={cn(
                        "absolute inset-0 rounded-md border-2 transition-all overflow-hidden",
                        statusColor.bg,
                        statusColor.border
                      )}>
                        <div 
                          className="h-full bg-foreground/8 transition-all"
                          style={{ width: `${feature.completionPercentage}%` }}
                        />
                        
                        <div className="absolute inset-0 flex items-center justify-between px-3">
                          <span className={cn("text-xs font-medium", statusColor.text)}>
                            {feature.startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                          <span className={cn("text-xs font-bold", statusColor.text)}>
                            {feature.completionPercentage}%
                          </span>
                          <span className={cn("text-xs font-medium", statusColor.text)}>
                            {feature.endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent 
                    className="w-96 p-4 z-[100]"
                    side="top"
                    align="start"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Target className="w-4 h-4 text-primary" />
                            <h4 className="font-semibold text-sm">{feature.title}</h4>
                          </div>
                          {feature.description && (
                            <p className="text-xs text-muted-foreground mt-2">{feature.description}</p>
                          )}
                        </div>
                        <Badge variant="secondary" className={cn("text-xs", statusColor.text)}>
                          {feature.status.replace('-', ' ')}
                        </Badge>
                      </div>

                      <div className="space-y-2 pt-2 border-t">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-semibold">{feature.completionPercentage}%</span>
                        </div>
                        <Progress value={feature.completionPercentage} className="h-1.5" />
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-2 border-t text-xs">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                          <div>
                            <div className="text-muted-foreground">Start</div>
                            <div className="font-medium">
                              {feature.startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                          <div>
                            <div className="text-muted-foreground">End</div>
                            <div className="font-medium">
                              {feature.endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t text-xs">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Epics:</span>
                          <span className="font-semibold">{feature.completedEpics}/{feature.epicCount}</span>
                        </div>
                        {feature.owner && (
                          <div className="flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5 text-muted-foreground" />
                            <span className="text-muted-foreground">{feature.owner}</span>
                          </div>
                        )}
                      </div>

                      <div className="pt-2 border-t">
                        <Badge variant="outline" className="text-xs">
                          {feature.themeName}
                        </Badge>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
