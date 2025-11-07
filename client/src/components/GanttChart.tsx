import { useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export interface GanttItem {
  id: string;
  title: string;
  type: string;
  status: 'done' | 'in-progress' | 'blocked' | 'not-started';
  startDate: Date;
  endDate: Date;
  progress: number;
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

export default function GanttChart({ items, onItemClick }: GanttChartProps) {
  const { months, startDate, endDate } = useMemo(() => {
    if (items.length === 0) return { months: [], startDate: new Date(), endDate: new Date() };

    const allDates = items.flatMap(item => [item.startDate, item.endDate]);
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
    const itemStart = Math.max(item.startDate.getTime(), startDate.getTime());
    const itemEnd = Math.min(item.endDate.getTime(), endDate.getTime());

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
          <div className="w-64 px-4 font-semibold text-sm border-r flex-shrink-0">Task</div>
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
        {items.map((item, idx) => (
          <div key={item.id} className="flex h-12 border-b hover-elevate" data-testid={`gantt-item-${item.id}`}>
            <div className="w-64 px-4 flex items-center gap-2 border-r flex-shrink-0">
              <span className="text-sm truncate flex-1">{item.title}</span>
              <Badge variant="secondary" className="text-xs">{item.type}</Badge>
            </div>
            <div className="flex-1 relative">
              <div className="absolute inset-0 flex">
                {months.map((_, idx) => (
                  <div key={idx} className="flex-1 border-r last:border-r-0" />
                ))}
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={cn(
                      "absolute top-1/2 -translate-y-1/2 h-6 rounded-md cursor-pointer transition-all hover:h-7",
                      statusColors[item.status]
                    )}
                    style={getBarPosition(item)}
                    onClick={() => onItemClick?.(item)}
                  >
                    <div className="h-full w-full relative overflow-hidden rounded-md">
                      <div
                        className="h-full bg-white/30"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1">
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-xs">Status: {item.status}</p>
                    <p className="text-xs">Progress: {item.progress}%</p>
                    <p className="text-xs">
                      {item.startDate.toLocaleDateString()} - {item.endDate.toLocaleDateString()}
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
