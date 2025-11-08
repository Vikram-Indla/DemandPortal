import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, CheckCircle2, Play, AlertCircle, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

function CircularGauge({ 
  percentage, 
  size = 130,
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
        <span className="text-2xl font-bold">{percentage}%</span>
        <span className="text-[10px] text-muted-foreground mt-0.5">Complete</span>
      </div>
    </div>
  );
}

interface StatusBreakdown {
  done: number;
  inProgress: number;
  blocked: number;
  notStarted: number;
}

interface ThemeMetrics {
  themeName: string;
  completionPercentage: number;
  businessRequests: StatusBreakdown;
  initiatives: StatusBreakdown;
  status: 'on-track' | 'in-progress' | 'at-risk';
}

interface StrategicThemeSpotlightProps {
  metrics: ThemeMetrics;
}

function StatusMatrixRow({ 
  icon: Icon, 
  label, 
  count, 
  color 
}: { 
  icon: typeof CheckCircle2; 
  label: string; 
  count: number; 
  color: string;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-1.5">
        <Icon className={cn("w-3.5 h-3.5", color)} />
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <span className="text-xs font-semibold">{count}</span>
    </div>
  );
}

export default function StrategicThemeSpotlight({ metrics }: StrategicThemeSpotlightProps) {
  const getStatusBadge = () => {
    if (metrics.status === 'on-track') return { 
      label: 'On Track', 
      variant: 'default' as const,
    };
    if (metrics.status === 'in-progress') return { 
      label: 'In Progress', 
      variant: 'secondary' as const,
    };
    return { 
      label: 'At Risk', 
      variant: 'destructive' as const,
    };
  };

  const statusBadge = getStatusBadge();
  const totalBRs = metrics.businessRequests.done + metrics.businessRequests.inProgress + 
                   metrics.businessRequests.blocked + metrics.businessRequests.notStarted;
  const totalInits = metrics.initiatives.done + metrics.initiatives.inProgress + 
                     metrics.initiatives.blocked + metrics.initiatives.notStarted;

  return (
    <Card className="border-l-4 border-l-primary" data-testid="banner-theme-progress">
      <div className="p-5">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <Badge variant="outline" className="text-[10px] px-1.5 py-0">THEME</Badge>
                <h2 className="text-lg font-bold" data-testid="text-theme-name">{metrics.themeName}</h2>
              </div>
              <Badge variant={statusBadge.variant} className="text-[10px]" data-testid="badge-health-status">
                {statusBadge.label}
              </Badge>
            </div>
          </div>
        </div>

        {/* Two-Column Layout */}
        <div className="flex gap-6">
          {/* Left Column: Circular Gauge */}
          <div className="flex flex-col items-center justify-center gap-2">
            <CircularGauge percentage={metrics.completionPercentage} size={130} strokeWidth={10} />
          </div>

          {/* Right Column: Status Matrices */}
          <div className="flex-1 grid grid-cols-2 gap-4">
            {/* Initiatives Matrix */}
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b pb-1.5">
                <span className="text-xs font-semibold text-muted-foreground">Initiatives</span>
                <span className="text-xs font-bold">{totalInits}</span>
              </div>
              <div className="space-y-1.5">
                <StatusMatrixRow 
                  icon={CheckCircle2} 
                  label="Done" 
                  count={metrics.initiatives.done} 
                  color="text-green-600 dark:text-green-400" 
                />
                <StatusMatrixRow 
                  icon={Play} 
                  label="In Progress" 
                  count={metrics.initiatives.inProgress} 
                  color="text-blue-600 dark:text-blue-400" 
                />
                <StatusMatrixRow 
                  icon={AlertCircle} 
                  label="Blocked" 
                  count={metrics.initiatives.blocked} 
                  color="text-red-600 dark:text-red-400" 
                />
                <StatusMatrixRow 
                  icon={Circle} 
                  label="Not Started" 
                  count={metrics.initiatives.notStarted} 
                  color="text-gray-400 dark:text-gray-500" 
                />
              </div>
            </div>

            {/* Business Requests Matrix */}
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b pb-1.5">
                <span className="text-xs font-semibold text-muted-foreground">Business Requests</span>
                <span className="text-xs font-bold">{totalBRs}</span>
              </div>
              <div className="space-y-1.5">
                <StatusMatrixRow 
                  icon={CheckCircle2} 
                  label="Done" 
                  count={metrics.businessRequests.done} 
                  color="text-green-600 dark:text-green-400" 
                />
                <StatusMatrixRow 
                  icon={Play} 
                  label="In Progress" 
                  count={metrics.businessRequests.inProgress} 
                  color="text-blue-600 dark:text-blue-400" 
                />
                <StatusMatrixRow 
                  icon={AlertCircle} 
                  label="Blocked" 
                  count={metrics.businessRequests.blocked} 
                  color="text-red-600 dark:text-red-400" 
                />
                <StatusMatrixRow 
                  icon={Circle} 
                  label="Not Started" 
                  count={metrics.businessRequests.notStarted} 
                  color="text-gray-400 dark:text-gray-500" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
