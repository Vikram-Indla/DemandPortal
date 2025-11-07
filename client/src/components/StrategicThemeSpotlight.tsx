import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, TrendingUp, TrendingDown, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

function CircularGauge({ 
  percentage, 
  size = 140,
  strokeWidth = 10 
}: { 
  percentage: number; 
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const getColor = () => {
    if (percentage >= 75) return 'hsl(var(--chart-2))';
    if (percentage >= 50) return 'hsl(var(--chart-3))';
    if (percentage >= 25) return 'hsl(var(--primary))';
    return 'hsl(var(--chart-4))';
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
          fill="none"
          className="opacity-20"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor()}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold">{percentage}%</span>
        <span className="text-[10px] text-muted-foreground mt-0.5">Complete</span>
      </div>
    </div>
  );
}

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

        {/* Right: Primary KPI with Circular Gauge */}
        <div className="flex items-center gap-6">
          {/* Circular Gauge */}
          <CircularGauge percentage={metrics.completionPercentage} size={140} strokeWidth={10} />

          {/* Metadata */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <TrendIcon className={cn("w-4 h-4", health.color)} />
              <span className="text-sm text-muted-foreground font-medium">Theme Progress</span>
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <div className="flex justify-between gap-4">
                <span>Completed:</span>
                <span className="font-semibold text-foreground">{metrics.completedItems} items</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Remaining:</span>
                <span className="font-semibold text-foreground">{metrics.totalItems - metrics.completedItems} items</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
