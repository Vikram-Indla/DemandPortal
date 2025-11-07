import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Target, TrendingUp, TrendingDown, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ThemeMetrics {
  themeName: string;
  completionPercentage: number;
  totalInitiatives: number;
  completedInitiatives: number;
  totalItems: number;
  completedItems: number;
  atRiskItems: number;
  trend: 'up' | 'down' | 'stable';
}

interface StrategicThemeSpotlightProps {
  metrics: ThemeMetrics;
}

export default function StrategicThemeSpotlight({ metrics }: StrategicThemeSpotlightProps) {
  const getHealthStatus = () => {
    if (metrics.completionPercentage >= 75) return { 
      label: 'On Track', 
      variant: 'default' as const,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-950/30',
      icon: CheckCircle2
    };
    if (metrics.completionPercentage >= 50) return { 
      label: 'In Progress', 
      variant: 'secondary' as const,
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-100 dark:bg-amber-950/30',
      icon: TrendingUp
    };
    return { 
      label: 'Needs Attention', 
      variant: 'destructive' as const,
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-100 dark:bg-red-950/30',
      icon: AlertTriangle
    };
  };

  const health = getHealthStatus();
  const HealthIcon = health.icon;
  const TrendIcon = metrics.trend === 'up' ? TrendingUp : metrics.trend === 'down' ? TrendingDown : TrendingUp;

  return (
    <Card className="border-l-4 border-l-primary" data-testid="banner-theme-progress">
      <div className="flex items-center justify-between p-6 gap-8">
        {/* Left: Theme Metadata */}
        <div className="flex items-center gap-6 flex-1">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
            <Target className="w-8 h-8 text-primary" />
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold" data-testid="text-theme-name">{metrics.themeName}</h2>
              <Badge variant={health.variant} className="flex items-center gap-1" data-testid="badge-health-status">
                <HealthIcon className="w-3 h-3" />
                {health.label}
              </Badge>
            </div>
            
            {/* KPI Strip */}
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Initiatives:</span>
                <span className="font-semibold" data-testid="text-initiatives-count">
                  {metrics.completedInitiatives} / {metrics.totalInitiatives}
                </span>
              </div>
              
              <div className="h-4 w-px bg-border" />
              
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Items:</span>
                <span className="font-semibold" data-testid="text-items-count">
                  {metrics.completedItems} / {metrics.totalItems}
                </span>
              </div>
              
              {metrics.atRiskItems > 0 && (
                <>
                  <div className="h-4 w-px bg-border" />
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span className="font-semibold text-red-600 dark:text-red-400" data-testid="text-at-risk">
                      {metrics.atRiskItems} at risk
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right: Primary KPI */}
        <div className="flex items-center gap-6">
          {/* Completion Metric */}
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-3">
              <TrendIcon className={cn("w-5 h-5", health.color)} />
              <span className="text-5xl font-bold" data-testid="kpi-completion">
                {metrics.completionPercentage}%
              </span>
            </div>
            <span className="text-sm text-muted-foreground font-medium">Overall Completion</span>
          </div>

          {/* Visual Progress */}
          <div className="flex flex-col gap-3 w-48">
            <Progress 
              value={metrics.completionPercentage} 
              className="h-3"
              data-testid="progress-theme"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{metrics.totalItems - metrics.completedItems} remaining</span>
              <span>{metrics.completedItems} done</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
