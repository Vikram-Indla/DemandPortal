import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, ArrowUp, Minus, ArrowDown, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

type RiskPriority = 'high' | 'medium' | 'low';

export interface CompactRiskItem {
  id: string;
  key: string;
  title: string;
  priority: RiskPriority;
  progress: number;
  endDate: string;
  isAtRisk: boolean;
}

interface CompactRiskListProps {
  items: CompactRiskItem[];
  title?: string;
  emptyMessage?: string;
}

const priorityConfig = {
  high: { 
    icon: ArrowUp, 
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-500/10 dark:bg-red-500/20',
    label: 'High'
  },
  medium: { 
    icon: Minus, 
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-500/10 dark:bg-amber-500/20',
    label: 'Medium'
  },
  low: { 
    icon: ArrowDown, 
    color: 'text-slate-600 dark:text-slate-400',
    bgColor: 'bg-slate-500/10 dark:bg-slate-500/20',
    label: 'Low'
  },
};

export function CompactRiskList({ items, title, emptyMessage = "No at-risk items" }: CompactRiskListProps) {
  const atRiskItems = items.filter(item => item.isAtRisk);
  const criticalCount = atRiskItems.filter(item => item.priority === 'high').length;
  const mediumCount = atRiskItems.filter(item => item.priority === 'medium').length;

  if (atRiskItems.length === 0) {
    return (
      <div className="text-sm text-muted-foreground py-4 text-center">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {title && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
            <h4 className="font-semibold text-sm">{title}</h4>
            <Badge variant="outline" className="text-xs h-5">
              {atRiskItems.length} at risk
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            {criticalCount > 0 && (
              <div className="flex items-center gap-1 text-xs">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-muted-foreground">High: {criticalCount}</span>
              </div>
            )}
            {mediumCount > 0 && (
              <div className="flex items-center gap-1 text-xs">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-muted-foreground">Medium: {mediumCount}</span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="space-y-1.5">
        {atRiskItems.map((item) => {
          const PriorityIcon = priorityConfig[item.priority].icon;
          const daysUntilDue = Math.ceil((new Date(item.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
          const isOverdue = daysUntilDue < 0;
          const isUrgent = daysUntilDue >= 0 && daysUntilDue <= 7;

          return (
            <div
              key={item.id}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md border hover-elevate",
                priorityConfig[item.priority].bgColor
              )}
              data-testid={`risk-item-${item.id}`}
            >
              {/* Priority Icon */}
              <div className="flex-shrink-0">
                <PriorityIcon className={cn("w-3.5 h-3.5", priorityConfig[item.priority].color)} />
              </div>

              {/* Work Item */}
              <div className="flex-1 min-w-0 flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground flex-shrink-0">
                  {item.key}
                </span>
                <span className="text-sm truncate font-medium">
                  {item.title}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="flex-shrink-0 w-24">
                <div className="flex items-center gap-2">
                  <Progress 
                    value={item.progress} 
                    className="h-1.5 w-16" 
                  />
                  <span className="text-xs font-medium w-8 text-right">
                    {item.progress}%
                  </span>
                </div>
              </div>

              {/* End Date */}
              <div className="flex-shrink-0 flex items-center gap-1.5">
                <Clock className={cn(
                  "w-3.5 h-3.5",
                  isOverdue ? "text-red-600 dark:text-red-400" : 
                  isUrgent ? "text-amber-600 dark:text-amber-400" : 
                  "text-muted-foreground"
                )} />
                <span className={cn(
                  "text-xs font-medium",
                  isOverdue ? "text-red-600 dark:text-red-400" : 
                  isUrgent ? "text-amber-600 dark:text-amber-400" : 
                  "text-muted-foreground"
                )}>
                  {new Date(item.endDate).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric'
                  })}
                  {isOverdue && (
                    <span className="ml-1">({Math.abs(daysUntilDue)}d late)</span>
                  )}
                  {isUrgent && !isOverdue && (
                    <span className="ml-1">({daysUntilDue}d)</span>
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
