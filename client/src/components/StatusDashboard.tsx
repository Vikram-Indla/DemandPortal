import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Clock, AlertCircle, Circle, TrendingUp, Target, Layers } from 'lucide-react';

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

interface StatusMetrics {
  total: number;
  done: number;
  inProgress: number;
  blocked: number;
  notStarted: number;
}

interface StatusDashboardProps {
  metrics?: StatusMetrics;
  businessRequests?: BusinessRequestMetrics[];
}

export default function StatusDashboard({ metrics, businessRequests }: StatusDashboardProps) {
  const defaultMetrics: StatusMetrics = metrics || {
    total: 156,
    done: 62,
    inProgress: 48,
    blocked: 12,
    notStarted: 34,
  };

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

  const completionRate = Math.round((defaultMetrics.done / defaultMetrics.total) * 100);

  const statusCards = [
    {
      title: 'Completed',
      count: defaultMetrics.done,
      icon: CheckCircle2,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'In Progress',
      count: defaultMetrics.inProgress,
      icon: Clock,
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-500/10',
    },
    {
      title: 'Blocked',
      count: defaultMetrics.blocked,
      icon: AlertCircle,
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-500/10',
    },
    {
      title: 'Not Started',
      count: defaultMetrics.notStarted,
      icon: Circle,
      color: 'text-gray-600 dark:text-gray-400',
      bgColor: 'bg-gray-500/10',
    },
  ];

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
        <p className="text-muted-foreground">Overview of all work items and strategic business requests</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statusCards.map((card) => (
          <Card key={card.title} data-testid={`card-status-${card.title.toLowerCase().replace(' ', '-')}`}>
            <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <div className={`p-2 rounded-md ${card.bgColor}`}>
                <card.icon className={`w-4 h-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.count}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {Math.round((card.count / defaultMetrics.total) * 100)}% of total
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Completion Rate</span>
              <span className="text-2xl font-bold text-primary">{completionRate}%</span>
            </div>
            <Progress value={completionRate} className="h-3" />
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Items</p>
              <p className="text-2xl font-semibold">{defaultMetrics.total}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Items Remaining</p>
              <p className="text-2xl font-semibold">{defaultMetrics.total - defaultMetrics.done}</p>
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
