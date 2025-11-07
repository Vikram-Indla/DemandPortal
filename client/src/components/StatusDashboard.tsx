import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Layers, TrendingUp } from 'lucide-react';

interface BusinessRequestMetrics {
  id: string;
  name: string;
  themeName: string;
  initiativeName: string;
  totalItems: number;
  completedItems: number;
  inProgressItems: number;
  blockedItems: number;
  completionPercentage: number;
  priority: 'high' | 'medium' | 'low';
}

interface InitiativeMetrics {
  id: string;
  name: string;
  themeName: string;
  completionPercentage: number;
  totalBusinessRequests: number;
  completedBusinessRequests: number;
  totalItems: number;
  completedItems: number;
}

interface StatusDashboardProps {
  initiatives?: InitiativeMetrics[];
  businessRequests?: BusinessRequestMetrics[];
}

function CircularGauge({ 
  percentage, 
  size = 180,
  strokeWidth = 12 
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
        <span className="text-xs text-muted-foreground mt-1">Complete</span>
      </div>
    </div>
  );
}

export default function StatusDashboard({ initiatives, businessRequests }: StatusDashboardProps) {
  const defaultInitiatives: InitiativeMetrics[] = initiatives || [
    {
      id: 'init-1',
      name: 'Customer Portal Modernization',
      themeName: 'Digital Transformation',
      completionPercentage: 62,
      totalBusinessRequests: 2,
      completedBusinessRequests: 1,
      totalItems: 60,
      completedItems: 38,
    },
    {
      id: 'init-2',
      name: 'Compliance & Audit',
      themeName: 'Security Enhancement',
      completionPercentage: 29,
      totalBusinessRequests: 1,
      completedBusinessRequests: 0,
      totalItems: 28,
      completedItems: 8,
    },
    {
      id: 'init-3',
      name: 'Cloud Migration',
      themeName: 'Infrastructure Optimization',
      completionPercentage: 0,
      totalBusinessRequests: 1,
      completedBusinessRequests: 0,
      totalItems: 42,
      completedItems: 0,
    },
    {
      id: 'init-4',
      name: 'Data Analytics Platform',
      themeName: 'Digital Transformation',
      completionPercentage: 45,
      totalBusinessRequests: 2,
      completedBusinessRequests: 1,
      totalItems: 26,
      completedItems: 12,
    },
  ];

  const defaultBusinessRequests: BusinessRequestMetrics[] = businessRequests || [
    {
      id: 'br-1',
      name: 'New Authentication System',
      themeName: 'Digital Transformation',
      initiativeName: 'Customer Portal Modernization',
      totalItems: 24,
      completedItems: 20,
      inProgressItems: 4,
      blockedItems: 0,
      completionPercentage: 83,
      priority: 'high',
    },
    {
      id: 'br-2',
      name: 'UI/UX Redesign',
      themeName: 'Digital Transformation',
      initiativeName: 'Customer Portal Modernization',
      totalItems: 36,
      completedItems: 12,
      inProgressItems: 18,
      blockedItems: 6,
      completionPercentage: 33,
      priority: 'medium',
    },
    {
      id: 'br-3',
      name: 'GDPR Compliance',
      themeName: 'Security Enhancement',
      initiativeName: 'Compliance & Audit',
      totalItems: 28,
      completedItems: 8,
      inProgressItems: 8,
      blockedItems: 12,
      completionPercentage: 29,
      priority: 'high',
    },
    {
      id: 'br-4',
      name: 'AWS Infrastructure Setup',
      themeName: 'Infrastructure Optimization',
      initiativeName: 'Cloud Migration',
      totalItems: 42,
      completedItems: 0,
      inProgressItems: 0,
      blockedItems: 0,
      completionPercentage: 0,
      priority: 'medium',
    },
  ];

  const totalItems = defaultInitiatives.reduce((sum, init) => sum + init.totalItems, 0);
  const completedItems = defaultInitiatives.reduce((sum, init) => sum + init.completedItems, 0);
  const overallCompletion = Math.round((completedItems / totalItems) * 100);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 dark:text-red-400';
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'low':
        return 'text-gray-600 dark:text-gray-400';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="p-6 space-y-6 overflow-auto h-full">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Status Dashboard</h2>
        <p className="text-muted-foreground">Strategic initiatives and business request progress</p>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-semibold">Initiative Progress</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {defaultInitiatives.map((initiative) => (
            <Card key={initiative.id} className="hover-elevate" data-testid={`card-initiative-${initiative.id}`}>
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4">
                  <CircularGauge percentage={initiative.completionPercentage} size={160} strokeWidth={10} />
                  
                  <div className="text-center space-y-2 w-full">
                    <h4 className="font-semibold text-sm leading-tight">{initiative.name}</h4>
                    <p className="text-xs text-muted-foreground">{initiative.themeName}</p>
                    
                    <div className="pt-2 space-y-1 border-t">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Business Requests</span>
                        <span className="font-medium">{initiative.completedBusinessRequests}/{initiative.totalBusinessRequests}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Work Items</span>
                        <span className="font-medium">{initiative.completedItems}/{initiative.totalItems}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Overall Portfolio Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Completion Rate</span>
              <span className="text-2xl font-bold text-primary">{overallCompletion}%</span>
            </div>
            <Progress value={overallCompletion} className="h-3" />
          </div>
          <div className="grid grid-cols-3 gap-4 pt-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Initiatives</p>
              <p className="text-2xl font-semibold">{defaultInitiatives.length}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Items</p>
              <p className="text-2xl font-semibold">{totalItems}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Items Remaining</p>
              <p className="text-2xl font-semibold">{totalItems - completedItems}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <Layers className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-semibold">Strategic Business Requests</h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {defaultBusinessRequests.map((br) => (
            <Card key={br.id} data-testid={`card-br-${br.id}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <CardTitle className="text-base mb-1">{br.name}</CardTitle>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium">Theme:</span> {br.themeName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium">Initiative:</span> {br.initiativeName}
                      </p>
                    </div>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={`capitalize ${getPriorityColor(br.priority)}`}
                  >
                    {br.priority}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-semibold">{br.completionPercentage}%</span>
                  </div>
                  <Progress value={br.completionPercentage} className="h-2" />
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-center pt-2">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Total</p>
                    <p className="text-lg font-semibold">{br.totalItems}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-green-600 dark:text-green-400">Done</p>
                    <p className="text-lg font-semibold text-green-600 dark:text-green-400">{br.completedItems}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-red-600 dark:text-red-400">Blocked</p>
                    <p className="text-lg font-semibold text-red-600 dark:text-red-400">{br.blockedItems}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
