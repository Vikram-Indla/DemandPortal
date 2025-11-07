import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, ArrowUp, Minus, ArrowDown, Clock, Target, Layers, FileText, ChevronRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

type RiskPriority = 'high' | 'medium' | 'low';

export interface CompactRiskItem {
  id: string;
  key: string;
  title: string;
  type?: 'initiative' | 'feature' | 'epic' | 'story';
  hierarchyBreadcrumb?: string;
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
    badgeClass: 'bg-red-500/90 text-white',
    label: 'High'
  },
  medium: { 
    icon: Minus, 
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-500/10 dark:bg-amber-500/20',
    badgeClass: 'bg-amber-500/90 text-white',
    label: 'Medium'
  },
  low: { 
    icon: ArrowDown, 
    color: 'text-slate-600 dark:text-slate-400',
    bgColor: 'bg-slate-500/10 dark:bg-slate-500/20',
    badgeClass: 'bg-slate-500/90 text-white',
    label: 'Low'
  },
};

const typeConfig = {
  initiative: { icon: Zap, label: 'Initiative', color: 'text-purple-600 dark:text-purple-400' },
  feature: { icon: Target, label: 'Feature', color: 'text-blue-600 dark:text-blue-400' },
  epic: { icon: Layers, label: 'Epic', color: 'text-indigo-600 dark:text-indigo-400' },
  story: { icon: FileText, label: 'Story', color: 'text-green-600 dark:text-green-400' },
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
          const TypeIcon = item.type ? typeConfig[item.type].icon : null;
          const daysUntilDue = Math.ceil((new Date(item.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
          const isOverdue = daysUntilDue < 0;
          const isUrgent = daysUntilDue >= 0 && daysUntilDue <= 7;

          return (
            <div
              key={item.id}
              className={cn(
                "flex flex-col gap-1.5 px-3 py-2.5 rounded-md border hover-elevate",
                priorityConfig[item.priority].bgColor
              )}
              data-testid={`risk-item-${item.id}`}
            >
              {/* Top row: Work item key, title, priority badge */}
              <div className="flex items-center gap-2">
                {/* Priority Icon */}
                <div className="flex-shrink-0">
                  <PriorityIcon className={cn("w-3.5 h-3.5", priorityConfig[item.priority].color)} />
                </div>

                {/* Work Item Key & Title */}
                <div className="flex-1 min-w-0 flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground flex-shrink-0">
                    {item.key}
                  </span>
                  <span className="text-sm truncate font-medium">
                    {item.title}
                  </span>
                </div>

                {/* Priority Badge */}
                <Badge className={cn("text-xs h-5 flex-shrink-0", priorityConfig[item.priority].badgeClass)}>
                  {priorityConfig[item.priority].label}
                </Badge>
              </div>

              {/* Bottom row: Type, hierarchy, progress, date */}
              <div className="flex items-center gap-3 pl-5">
                {/* Type Badge */}
                {item.type && TypeIcon && (
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <TypeIcon className={cn("w-3 h-3", typeConfig[item.type].color)} />
                    <Badge variant="outline" className="text-xs h-5">
                      {typeConfig[item.type].label}
                    </Badge>
                  </div>
                )}

                {/* Hierarchy Breadcrumb */}
                {item.hierarchyBreadcrumb && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground flex-1 min-w-0">
                    <ChevronRight className="w-2.5 h-2.5 flex-shrink-0" />
                    <span className="truncate">{item.hierarchyBreadcrumb}</span>
                  </div>
                )}

                {/* Spacer if no hierarchy */}
                {!item.hierarchyBreadcrumb && <div className="flex-1" />}

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
            </div>
          );
        })}
      </div>
    </div>
  );
}
