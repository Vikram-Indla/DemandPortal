import { useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, ArrowUp, ArrowDown, Minus, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface GanttItem {
  id: string;
  title: string;
  type: 'feature' | 'epic' | 'story';
  status: 'done' | 'in-progress' | 'blocked' | 'not-started';
  priority: 'high' | 'medium' | 'low';
  releaseLabel?: string;
  targetStartDate: Date;
  targetEndDate: Date;
  completionPercentage: number;
  themeName: string;
  initiativeName: string;
  storyPoints?: number;
}

interface GanttChartProps {
  items: GanttItem[];
  onItemClick?: (item: GanttItem) => void;
}

const statusColors: Record<string, { bg: string; border: string; text: string }> = {
  done: { 
    bg: 'bg-green-100 dark:bg-green-950/30', 
    border: 'border-green-500',
    text: 'text-green-700 dark:text-green-400'
  },
  'in-progress': { 
    bg: 'bg-amber-100 dark:bg-amber-950/30', 
    border: 'border-amber-500',
    text: 'text-amber-700 dark:text-amber-400'
  },
  blocked: { 
    bg: 'bg-red-100 dark:bg-red-950/30', 
    border: 'border-red-500',
    text: 'text-red-700 dark:text-red-400'
  },
  'not-started': { 
    bg: 'bg-slate-100 dark:bg-slate-800/30', 
    border: 'border-slate-400',
    text: 'text-slate-700 dark:text-slate-400'
  },
};

const priorityConfig: Record<string, { icon: any; color: string }> = {
  high: { icon: ArrowUp, color: 'text-red-600 dark:text-red-400' },
  medium: { icon: Minus, color: 'text-amber-600 dark:text-amber-400' },
  low: { icon: ArrowDown, color: 'text-slate-600 dark:text-slate-400' },
};

const typeLabels: Record<string, string> = {
  feature: 'Feature',
  epic: 'Epic',
  story: 'Story',
};

export default function GanttChart({ items, onItemClick }: GanttChartProps) {
  const { months, startDate, endDate } = useMemo(() => {
    if (items.length === 0) return { months: [], startDate: new Date(), endDate: new Date() };

    const allDates = items.flatMap(item => [item.targetStartDate, item.targetEndDate]);
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
  }, [items]);

  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  const getBarPosition = (item: GanttItem) => {
    const itemStart = Math.max(item.targetStartDate.getTime(), startDate.getTime());
    const itemEnd = Math.min(item.targetEndDate.getTime(), endDate.getTime());

    const startOffset = Math.ceil((itemStart - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const duration = Math.ceil((itemEnd - itemStart) / (1000 * 60 * 60 * 24));

    const left = (startOffset / totalDays) * 100;
    const width = (duration / totalDays) * 100;

    return { left: `${left}%`, width: `${width}%` };
  };

  if (items.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        No items to display
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto bg-background">
      <div className="sticky top-0 z-10 bg-card border-b">
        <div className="flex h-12 items-center">
          <div className="w-80 px-4 font-semibold text-sm border-r flex-shrink-0">Item</div>
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
        {items.map((item) => {
          const PriorityIcon = priorityConfig[item.priority]?.icon || Minus;
          const statusColor = statusColors[item.status];
          
          return (
            <div key={item.id} className="flex h-20 border-b hover-elevate" data-testid={`gantt-item-${item.id}`}>
              <div className="w-80 px-4 py-3 flex flex-col gap-2 border-r flex-shrink-0">
                <div className="flex items-center gap-2">
                  <PriorityIcon className={cn("w-3 h-3 flex-shrink-0", priorityConfig[item.priority]?.color || 'text-gray-600')} />
                  <span className="text-sm font-medium truncate flex-1">{item.title}</span>
                  <Badge variant="secondary" className="text-xs">{typeLabels[item.type]}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  {item.releaseLabel && (
                    <Badge variant="outline" className="text-xs h-5">
                      {item.releaseLabel}
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground">{item.initiativeName}</span>
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
                      style={getBarPosition(item)}
                      onClick={() => onItemClick?.(item)}
                    >
                      {/* Status color bar */}
                      <div className={cn(
                        "absolute inset-0 rounded-md border-2 transition-all",
                        statusColor.bg,
                        statusColor.border
                      )}>
                        {/* Completion progress overlay */}
                        <div 
                          className="h-full bg-foreground/5 rounded-sm transition-all"
                          style={{ width: `${item.completionPercentage}%` }}
                        />
                        
                        {item.status === 'blocked' && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <AlertCircle className={cn("w-5 h-5", statusColor.text)} />
                          </div>
                        )}
                      </div>
                      
                      {/* Information overlay panel */}
                      <div className="absolute inset-x-0 top-0 h-full flex items-center justify-between px-2 gap-2">
                        {/* Left side: Priority & Completion */}
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-background/95 backdrop-blur-sm border shadow-sm">
                          <PriorityIcon className={cn("w-3 h-3", priorityConfig[item.priority]?.color)} />
                          <span className="text-xs font-semibold">
                            {item.completionPercentage}%
                          </span>
                        </div>
                        
                        {/* Right side: Date range */}
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-background/95 backdrop-blur-sm border shadow-sm">
                          <Calendar className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs font-medium">
                            {item.targetStartDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                          <span className="text-xs text-muted-foreground">→</span>
                          <span className="text-xs font-medium">
                            {item.targetEndDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-72 z-50" align="start" side="top">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-sm mb-1 leading-tight">{item.title}</h4>
                        <p className="text-xs text-muted-foreground">{typeLabels[item.type]}</p>
                      </div>
                      
                      <div className="space-y-2 pb-2 border-b">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Initiative</span>
                          <span className="font-medium text-right">{item.initiativeName}</span>
                        </div>
                        {item.releaseLabel && (
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Release</span>
                            <Badge variant="outline" className="text-xs h-5">{item.releaseLabel}</Badge>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground font-medium">Completion</span>
                          <span className="text-sm font-semibold">{item.completionPercentage}%</span>
                        </div>
                        <Progress value={item.completionPercentage} className="h-2" />
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
