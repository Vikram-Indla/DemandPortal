import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Progress } from '@/components/ui/progress';
import { Calendar, Users, Target, ChevronLeft, ChevronRight } from 'lucide-react';
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

type TimelineView = 'weekly' | 'bi-weekly' | 'monthly';

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

// Helper to get Monday of a given date
const getMonday = (date: Date): Date => {
  const d = new Date(date);
  const dayOfWeek = d.getDay();
  const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  d.setDate(d.getDate() + daysToMonday);
  return d;
};

export default function FeatureRoadmap({ features }: FeatureRoadmapProps) {
  const [timelineView, setTimelineView] = useState<TimelineView>('bi-weekly');
  
  // Initialize window start date to the Monday of the current week
  const [windowStartDate, setWindowStartDate] = useState<Date>(() => getMonday(new Date()));

  // Navigation functions
  const goToPreviousWindow = () => {
    setWindowStartDate(prev => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() - 56); // 8 weeks
      return newDate;
    });
  };

  const goToNextWindow = () => {
    setWindowStartDate(prev => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() + 56); // 8 weeks
      return newDate;
    });
  };

  const goToToday = () => {
    setWindowStartDate(getMonday(new Date()));
  };

  const { periods, startDate, endDate, visibleFeatures } = useMemo(() => {
    // Fixed 8-week (56-day) window
    const alignedStartDate = new Date(windowStartDate);
    alignedStartDate.setHours(0, 0, 0, 0); // Normalize to midnight
    
    const alignedEndDate = new Date(windowStartDate);
    alignedEndDate.setDate(alignedEndDate.getDate() + 55); // 56 days inclusive (0-55)
    alignedEndDate.setHours(23, 59, 59, 999); // Normalize to end of day

    // Filter features that overlap with the window
    const filtered = features.filter(f => {
      return f.endDate >= alignedStartDate && f.startDate <= alignedEndDate;
    });

    const periodsList: { label: string; date: Date }[] = [];

    if (timelineView === 'weekly') {
      // 8 weeks = 8 columns
      const current = new Date(alignedStartDate);
      for (let i = 0; i < 8; i++) {
        const weekStart = new Date(current);
        const weekEnd = new Date(current);
        weekEnd.setDate(weekEnd.getDate() + 6);
        
        periodsList.push({
          label: `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
          date: new Date(current),
        });
        current.setDate(current.getDate() + 7);
      }
    } else if (timelineView === 'bi-weekly') {
      // 8 weeks = 4 columns
      const current = new Date(alignedStartDate);
      for (let i = 0; i < 4; i++) {
        const biWeekStart = new Date(current);
        const biWeekEnd = new Date(current);
        biWeekEnd.setDate(biWeekEnd.getDate() + 13);
        
        periodsList.push({
          label: `${biWeekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${biWeekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
          date: new Date(current),
        });
        current.setDate(current.getDate() + 14);
      }
    } else {
      // Monthly: cover months that intersect the 8-week window
      const current = new Date(alignedStartDate);
      current.setDate(1); // Start of month
      
      while (current <= alignedEndDate) {
        periodsList.push({
          label: current.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          date: new Date(current),
        });
        current.setMonth(current.getMonth() + 1);
      }
    }

    return { 
      periods: periodsList, 
      startDate: alignedStartDate, 
      endDate: alignedEndDate,
      visibleFeatures: filtered
    };
  }, [windowStartDate, features, timelineView]);

  // Fixed to 56 days for 8 weeks
  const totalDays = 56;

  const getBarPosition = (feature: Feature) => {
    const DAY_MS = 1000 * 60 * 60 * 24;
    const itemStart = Math.max(feature.startDate.getTime(), startDate.getTime());
    const itemEnd = Math.min(feature.endDate.getTime(), endDate.getTime());

    const startOffset = Math.ceil((itemStart - startDate.getTime()) / DAY_MS);
    // Add 1 day to make the duration inclusive (end date is part of the span)
    const duration = Math.max(1, Math.ceil((itemEnd - itemStart + DAY_MS) / DAY_MS));

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

  const hasVisibleFeatures = visibleFeatures.length > 0;

  return (
    <div className="h-full flex flex-col overflow-hidden bg-background">
      <div className="p-2 border-b flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={goToPreviousWindow}
            data-testid="button-prev-window"
          >
            <ChevronLeft className="w-4 h-4" />
            Prev 8 Weeks
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={goToToday}
            data-testid="button-today"
          >
            Today
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={goToNextWindow}
            data-testid="button-next-window"
          >
            Next 8 Weeks
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={timelineView === 'weekly' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimelineView('weekly')}
            data-testid="button-weekly-view"
          >
            Weekly
          </Button>
          <Button
            variant={timelineView === 'bi-weekly' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimelineView('bi-weekly')}
            data-testid="button-bi-weekly-view"
          >
            Bi-Weekly
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

        <div className="text-sm text-muted-foreground">
          {startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - {endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="sticky top-0 z-[5] bg-card border-b">
          <div className="flex h-12 items-center">
            <div className="w-80 px-4 font-semibold text-sm border-r flex-shrink-0">Feature</div>
            <div className="flex-1 flex">
              {periods.map((period, idx) => (
                <div
                  key={idx}
                  className="flex-1 px-2 py-3 text-center text-xs font-medium border-r last:border-r-0"
                >
                  {period.label}
                </div>
              ))}
            </div>
          </div>
        </div>

      <div className="relative">
        {!hasVisibleFeatures && (
          <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
            No features in this 8-week window. Use navigation to view other periods.
          </div>
        )}
        {visibleFeatures.map((feature) => {
          const statusColor = statusColors[feature.status];
          
          return (
            <div key={feature.id} className="flex h-20 border-b hover-elevate" data-testid={`feature-item-${feature.id}`}>
              <div className="w-80 px-4 py-3 flex flex-col gap-2 border-r flex-shrink-0">
                <div className="flex items-center gap-2">
                  <Target className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium truncate flex-1">{feature.title}</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className={cn("text-xs h-5", statusColor.bg, statusColor.text)}>
                    {feature.status.charAt(0).toUpperCase() + feature.status.slice(1).replace('-', ' ')}
                  </Badge>
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
                  {periods.map((_, idx) => (
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
    </div>
  );
}
