import { useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, ArrowUp, ArrowDown, Minus } from 'lucide-react';
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

const statusColors: Record<string, string> = {
  done: 'bg-green-500',
  'in-progress': 'bg-yellow-500',
  blocked: 'bg-red-500',
  'not-started': 'bg-gray-400',
};

const priorityConfig: Record<string, { icon: any; color: string; borderColor: string }> = {
  high: { icon: ArrowUp, color: 'text-red-600', borderColor: 'border-red-500' },
  medium: { icon: Minus, color: 'text-yellow-600', borderColor: 'border-yellow-500' },
  low: { icon: ArrowDown, color: 'text-gray-600', borderColor: 'border-gray-400' },
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
          
          return (
            <div key={item.id} className="flex h-16 border-b hover-elevate" data-testid={`gantt-item-${item.id}`}>
              <div className="w-80 px-4 py-2 flex flex-col gap-1 border-r flex-shrink-0">
                <div className="flex items-center gap-2">
                  <PriorityIcon className={cn("w-3 h-3", priorityConfig[item.priority]?.color || 'text-gray-600')} />
                  <span className="text-sm font-medium truncate flex-1">{item.title}</span>
                  <Badge variant="secondary" className="text-xs">{typeLabels[item.type]}</Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  {item.releaseLabel && (
                    <Badge variant="outline" className="text-xs h-5">
                      {item.releaseLabel}
                    </Badge>
                  )}
                  <span>{item.completionPercentage}% complete</span>
                </div>
              </div>
              
              <div className="flex-1 relative">
                <div className="absolute inset-0 flex">
                  {months.map((_, idx) => (
                    <div key={idx} className="flex-1 border-r last:border-r-0" />
                  ))}
                </div>
                
                <HoverCard openDelay={200}>
                  <HoverCardTrigger asChild>
                    <div
                      className={cn(
                        "absolute top-1/2 -translate-y-1/2 h-10 rounded-md cursor-pointer transition-all hover:h-11 border-2 overflow-visible",
                        statusColors[item.status],
                        priorityConfig[item.priority]?.borderColor || 'border-gray-400'
                      )}
                      style={getBarPosition(item)}
                      onClick={() => onItemClick?.(item)}
                    >
                      <div className="h-full w-full relative flex items-center justify-between px-2 gap-1">
                        <div
                          className="absolute inset-0 bg-white/40 rounded-sm"
                          style={{ width: `${item.completionPercentage}%` }}
                        />
                        
                        <div className="relative z-10 flex items-center gap-1">
                          <PriorityIcon className={cn("w-3 h-3 text-white drop-shadow", priorityConfig[item.priority]?.color)} />
                          <span className="text-xs font-semibold text-white drop-shadow">
                            {item.completionPercentage}%
                          </span>
                        </div>
                        
                        <div className="relative z-10 flex items-center gap-1 text-xs text-white drop-shadow">
                          <span className="font-medium">
                            {item.targetStartDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                          <span>→</span>
                          <span className="font-medium">
                            {item.targetEndDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                        
                        {item.status === 'blocked' && (
                          <AlertCircle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white drop-shadow z-10" />
                        )}
                      </div>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-64 z-50" align="start" side="top">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                        <p className="text-xs text-muted-foreground">{typeLabels[item.type]}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Initiative:</span>
                          <span className="font-medium">{item.initiativeName}</span>
                        </div>
                        {item.releaseLabel && (
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Release:</span>
                            <Badge variant="outline" className="text-xs h-5">{item.releaseLabel}</Badge>
                          </div>
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Completion</span>
                          <span className="font-semibold">{item.completionPercentage}%</span>
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
