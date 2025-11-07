import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Clock, AlertCircle, Circle } from 'lucide-react';

interface StatusMetrics {
  total: number;
  done: number;
  inProgress: number;
  blocked: number;
  notStarted: number;
}

interface StatusDashboardProps {
  metrics?: StatusMetrics;
}

export default function StatusDashboard({ metrics }: StatusDashboardProps) {
  const defaultMetrics: StatusMetrics = metrics || {
    total: 47,
    done: 18,
    inProgress: 15,
    blocked: 3,
    notStarted: 11,
  };

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

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Status Dashboard</h2>
        <p className="text-muted-foreground">Overview of all work items across the organization</p>
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

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { title: 'SSO Integration completed', time: '2 hours ago', status: 'done' },
              { title: 'API Gateway Setup blocked', time: '5 hours ago', status: 'blocked' },
              { title: 'Customer Portal Modernization updated', time: '1 day ago', status: 'in-progress' },
            ].map((activity, idx) => (
              <div key={idx} className="flex items-center gap-4 pb-4 last:pb-0 border-b last:border-b-0">
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                <Badge variant="secondary" className="capitalize">
                  {activity.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
