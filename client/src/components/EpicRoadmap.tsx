import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Progress } from '@/components/ui/progress';
import { Calendar, Users, Target, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Epic {
  id: string;
  title: string;
  featureName: string;
  themeName: string;
  startDate: Date;
  endDate: Date;
  completionPercentage: number;
  status: 'done' | 'in-progress' | 'blocked' | 'not-started';
  storyCount: number;
  completedStories: number;
  owner?: string;
  description?: string;
}

interface EpicRoadmapProps {
  epics: Epic[];
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

export default function EpicRoadmap({ epics }: EpicRoadmapProps) {
  const [timelineView, setTimelineView] = useState<TimelineView>('bi-weekly');

  const { periods, startDate, endDate } = useMemo(() => {
    if (epics.length === 0) return { periods: [], startDate: new Date(), endDate: new Date() };

    const allDates = epics.flatMap(e => [e.startDate, e.endDate]);
    const minDate = new Date(Math.min(...allDates.map(d => d.getTime())));
    const maxDate = new Date(Math.max(...allDates.map(d => d.getTime())));

    let alignedStartDate: Date;
    let alignedEndDate: Date;

    if (timelineView === 'monthly') {
      // Monthly alignment
      alignedStartDate = new Date(minDate);
      alignedStartDate.setDate(1);
      
      alignedEndDate = new Date(maxDate);
      alignedEndDate.setMonth(alignedEndDate.getMonth() + 1);
      alignedEndDate.setDate(0);
    } else {
      // Weekly or bi-weekly alignment
      alignedStartDate = new Date(minDate);
      // Align to Monday
      const dayOfWeek = alignedStartDate.getDay();
      const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
      alignedStartDate.setDate(alignedStartDate.getDate() + daysToMonday);

      alignedEndDate = new Date(maxDate);
      // Align to Sunday
      const endDayOfWeek = alignedEndDate.getDay();
      const daysToSunday = endDayOfWeek === 0 ? 0 : 7 - endDayOfWeek;
      alignedEndDate.setDate(alignedEndDate.getDate() + daysToSunday);
    }

    const periodsList: { label: string; date: Date }[] = [];

    if (timelineView === 'weekly') {
      const current = new Date(alignedStartDate);
      while (current <= alignedEndDate) {
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
      const current = new Date(alignedStartDate);
      while (current <= alignedEndDate) {
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
      // Monthly
      const current = new Date(alignedStartDate);
      while (current <= alignedEndDate) {
        periodsList.push({
          label: current.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          date: new Date(current),
        });
        current.setMonth(current.getMonth() + 1);
      }
    }

    return { periods: periodsList, startDate: alignedStartDate, endDate: alignedEndDate };
  }, [epics, timelineView]);

  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  const getBarPosition = (epic: Epic) => {
    const itemStart = Math.max(epic.startDate.getTime(), startDate.getTime());
    const itemEnd = Math.min(epic.endDate.getTime(), endDate.getTime());

    const startOffset = Math.ceil((itemStart - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const duration = Math.max(1, Math.ceil((itemEnd - itemStart) / (1000 * 60 * 60 * 24)));

    const left = (startOffset / totalDays) * 100;
    const width = (duration / totalDays) * 100;

    return { left: `${left}%`, width: `${width}%` };
  };

  if (epics.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        No epics to display
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-hidden bg-background">
      <div className="p-2 border-b flex items-center justify-center gap-2">
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

      <div className="flex-1 overflow-auto">
        <div className="sticky top-0 z-[5] bg-card border-b">
          <div className="flex h-12 items-center">
            <div className="w-80 px-4 font-semibold text-sm border-r flex-shrink-0">Epic</div>
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
        {epics.map((epic) => {
          const statusColor = statusColors[epic.status];
          
          return (
            <div key={epic.id} className="flex h-20 border-b hover-elevate" data-testid={`epic-item-${epic.id}`}>
              <div className="w-80 px-4 py-3 flex flex-col gap-2 border-r flex-shrink-0">
                <div className="flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium truncate flex-1">{epic.title}</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className={cn("text-xs h-5", statusColor.bg, statusColor.text)}>
                    {epic.status.charAt(0).toUpperCase() + epic.status.slice(1).replace('-', ' ')}
                  </Badge>
                  <Badge variant="outline" className="text-xs h-5">
                    {epic.featureName}
                  </Badge>
                  <span className="text-xs text-muted-foreground truncate">
                    {epic.completedStories}/{epic.storyCount} stories
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
                      style={getBarPosition(epic)}
                    >
                      <div className={cn(
                        "absolute inset-0 rounded-md border-2 transition-all overflow-hidden",
                        statusColor.bg,
                        statusColor.border
                      )}>
                        <div 
                          className="h-full bg-foreground/8 transition-all"
                          style={{ width: `${epic.completionPercentage}%` }}
                        />
                        
                        <div className="absolute inset-0 flex items-center justify-between px-3">
                          <span className={cn("text-xs font-medium", statusColor.text)}>
                            {epic.startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                          <span className={cn("text-xs font-bold", statusColor.text)}>
                            {epic.completionPercentage}%
                          </span>
                          <span className={cn("text-xs font-medium", statusColor.text)}>
                            {epic.endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
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
                      <div className="flex items-start gap-3">
                        <Layers className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm mb-1">{epic.title}</h4>
                          {epic.description && (
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {epic.description}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2 pt-2 border-t">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Feature</span>
                          <Badge variant="outline" className="text-xs">{epic.featureName}</Badge>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Theme</span>
                          <Badge variant="outline" className="text-xs">{epic.themeName}</Badge>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Status</span>
                          <Badge className={cn("text-xs", statusColor.bg, statusColor.text)}>
                            {epic.status.charAt(0).toUpperCase() + epic.status.slice(1).replace('-', ' ')}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2 pt-2 border-t">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {epic.startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            {' → '}
                            {epic.endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                        {epic.owner && (
                          <div className="flex items-center gap-2">
                            <Users className="w-3.5 h-3.5 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{epic.owner}</span>
                          </div>
                        )}
                      </div>

                      <div className="pt-2 border-t">
                        <div className="flex items-center justify-between text-xs mb-2">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-semibold">{epic.completedStories}/{epic.storyCount} stories</span>
                        </div>
                        <Progress value={epic.completionPercentage} className="h-2" />
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
