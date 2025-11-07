import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, Users, TrendingDown, Target, Layers, FileText, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

type RiskLevel = 'critical' | 'high' | 'medium';

interface RiskItem {
  id: string;
  key: string;
  title: string;
  type: 'initiative' | 'feature' | 'epic' | 'story';
  riskLevel: RiskLevel;
  riskCategory: 'schedule' | 'resource' | 'dependency' | 'scope' | 'technical';
  riskDescription: string;
  impact: string;
  recommendedAction: string;
  owner: string;
  dueDate: string;
  hierarchyPath: string;
  statusImpact: string;
}

const riskLevelConfig = {
  critical: {
    bg: 'bg-red-500/10 dark:bg-red-500/20',
    border: 'border-red-500',
    text: 'text-red-700 dark:text-red-400',
    badge: 'bg-red-500/90 text-white',
    label: 'Critical',
    icon: AlertCircle,
  },
  high: {
    bg: 'bg-orange-500/10 dark:bg-orange-500/20',
    border: 'border-orange-500',
    text: 'text-orange-700 dark:text-orange-400',
    badge: 'bg-orange-500/90 text-white',
    label: 'High',
    icon: AlertTriangle,
  },
  medium: {
    bg: 'bg-amber-500/10 dark:bg-amber-500/20',
    border: 'border-amber-500',
    text: 'text-amber-700 dark:text-amber-400',
    badge: 'bg-amber-500/90 text-white',
    label: 'Medium',
    icon: TrendingDown,
  },
};

const categoryConfig = {
  schedule: { icon: Clock, label: 'Schedule Risk', color: 'text-red-600 dark:text-red-400' },
  resource: { icon: Users, label: 'Resource Risk', color: 'text-orange-600 dark:text-orange-400' },
  dependency: { icon: Target, label: 'Dependency Risk', color: 'text-amber-600 dark:text-amber-400' },
  scope: { icon: Layers, label: 'Scope Risk', color: 'text-yellow-600 dark:text-yellow-400' },
  technical: { icon: AlertTriangle, label: 'Technical Risk', color: 'text-red-600 dark:text-red-400' },
};

const typeConfig = {
  initiative: { icon: Target, label: 'Initiative', color: 'text-purple-600 dark:text-purple-400' },
  feature: { icon: Target, label: 'Feature', color: 'text-blue-600 dark:text-blue-400' },
  epic: { icon: Layers, label: 'Epic', color: 'text-indigo-600 dark:text-indigo-400' },
  story: { icon: FileText, label: 'Story', color: 'text-green-600 dark:text-green-400' },
};

// Mock data for at-risk items
const mockRiskItems: RiskItem[] = [
  {
    id: '1',
    key: 'INIT-001',
    title: 'Single Sign-On Implementation',
    type: 'initiative',
    riskLevel: 'critical',
    riskCategory: 'schedule',
    riskDescription: 'External vendor integration delayed by 3 weeks; critical path to Q1 launch',
    impact: 'Delays 5 downstream features affecting 12,000 users',
    recommendedAction: 'Escalate to vendor C-level; prepare internal SSO fallback option',
    owner: 'Sarah Chen',
    dueDate: '2025-12-15',
    hierarchyPath: 'Platform Modernization → Security Enhancement',
    statusImpact: '3 weeks behind schedule',
  },
  {
    id: '2',
    key: 'FEAT-023',
    title: 'Mobile App Payment Gateway',
    type: 'feature',
    riskLevel: 'high',
    riskCategory: 'technical',
    riskDescription: 'PCI compliance review identified 8 critical security gaps in payment flow',
    impact: 'Blocks revenue generation for 50k mobile users',
    recommendedAction: 'Assign dedicated security engineer; schedule compliance re-review in 2 weeks',
    owner: 'Michael Rodriguez',
    dueDate: '2025-12-01',
    hierarchyPath: 'Mobile Experience → Commerce',
    statusImpact: 'Compliance blocker',
  },
  {
    id: '3',
    key: 'EPIC-089',
    title: 'Data Migration to Cloud',
    type: 'epic',
    riskLevel: 'critical',
    riskCategory: 'resource',
    riskDescription: 'Lead database architect resigned; 2TB migration requires specialized expertise',
    impact: 'Infrastructure modernization at risk; $200K/month legacy costs continue',
    recommendedAction: 'Engage external migration specialist immediately; knowledge transfer from departing architect',
    owner: 'David Kim',
    dueDate: '2025-11-30',
    hierarchyPath: 'Infrastructure → Cloud Migration',
    statusImpact: 'Critical resource gap',
  },
  {
    id: '4',
    key: 'EPIC-045',
    title: 'Real-time Analytics Dashboard',
    type: 'epic',
    riskLevel: 'high',
    riskCategory: 'dependency',
    riskDescription: 'Dependent on API Gateway (EPIC-012) which is 40% behind schedule',
    impact: 'Executive dashboards unavailable for Q4 business review',
    recommendedAction: 'Re-sequence work to use temporary direct DB connection; parallel track API completion',
    owner: 'Jennifer Lee',
    dueDate: '2025-12-10',
    hierarchyPath: 'Analytics Platform → Reporting',
    statusImpact: 'Blocked by EPIC-012',
  },
  {
    id: '5',
    key: 'STORY-1247',
    title: 'GDPR Data Export Feature',
    type: 'story',
    riskLevel: 'critical',
    riskCategory: 'schedule',
    riskDescription: 'Regulatory deadline in 3 weeks; current implementation only 30% complete',
    impact: 'Legal non-compliance penalty up to €20M; reputational damage',
    recommendedAction: 'Immediately reassign 2 additional engineers; daily standup with legal team',
    owner: 'Alex Thompson',
    dueDate: '2025-11-25',
    hierarchyPath: 'Compliance → GDPR',
    statusImpact: 'Hard regulatory deadline',
  },
  {
    id: '6',
    key: 'FEAT-067',
    title: 'Multi-tenant Architecture',
    type: 'feature',
    riskLevel: 'medium',
    riskCategory: 'scope',
    riskDescription: 'Scope expanded 3x after initial planning; original timeline no longer achievable',
    impact: 'Enterprise sales pipeline stalled; $2M ARR at risk',
    recommendedAction: 'Re-baseline project with phased delivery; MVP for top 3 enterprise prospects first',
    owner: 'Rachel Singh',
    dueDate: '2026-01-15',
    hierarchyPath: 'Enterprise Features → Architecture',
    statusImpact: 'Scope creep detected',
  },
  {
    id: '7',
    key: 'EPIC-091',
    title: 'API Rate Limiting System',
    type: 'epic',
    riskLevel: 'high',
    riskCategory: 'technical',
    riskDescription: 'Current Redis-based solution failing at scale; 15% API errors during peak load',
    impact: 'API customers experiencing outages; SLA penalties accumulating',
    recommendedAction: 'Implement distributed rate limiter using proven open-source solution; scale testing required',
    owner: 'Kevin Park',
    dueDate: '2025-11-28',
    hierarchyPath: 'API Platform → Reliability',
    statusImpact: 'Production incidents',
  },
];

export function RiskDashboard() {
  const criticalCount = mockRiskItems.filter(item => item.riskLevel === 'critical').length;
  const highCount = mockRiskItems.filter(item => item.riskLevel === 'high').length;
  const mediumCount = mockRiskItems.filter(item => item.riskLevel === 'medium').length;

  return (
    <div className="space-y-4">
      {/* Header with summary metrics */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
            Portfolio Risk Register
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Active risks requiring executive attention and immediate action
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-red-500/10 border border-red-500/20">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-xs font-medium">Critical: {criticalCount}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-orange-500/10 border border-orange-500/20">
            <div className="w-2 h-2 rounded-full bg-orange-500" />
            <span className="text-xs font-medium">High: {highCount}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-amber-500/10 border border-amber-500/20">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-xs font-medium">Medium: {mediumCount}</span>
          </div>
        </div>
      </div>

      {/* Risk grid */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left text-xs font-semibold px-4 py-3 w-16">Risk</th>
                <th className="text-left text-xs font-semibold px-4 py-3 w-64">Work Item</th>
                <th className="text-left text-xs font-semibold px-4 py-3 w-20">Type</th>
                <th className="text-left text-xs font-semibold px-4 py-3">Risk Description & Impact</th>
                <th className="text-left text-xs font-semibold px-4 py-3">Recommended Action</th>
                <th className="text-left text-xs font-semibold px-4 py-3 w-32">Owner</th>
                <th className="text-left text-xs font-semibold px-4 py-3 w-28">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {mockRiskItems.map((item) => {
                const riskConfig = riskLevelConfig[item.riskLevel];
                const RiskIcon = riskConfig.icon;
                const CategoryIcon = categoryConfig[item.riskCategory].icon;
                const TypeIcon = typeConfig[item.type].icon;

                return (
                  <tr 
                    key={item.id} 
                    className={cn(
                      "border-b hover-elevate transition-colors",
                      "border-l-4",
                      riskConfig.border
                    )}
                    data-testid={`risk-item-${item.id}`}
                  >
                    {/* Risk Level */}
                    <td className="px-4 py-5">
                      <HoverCard openDelay={200}>
                        <HoverCardTrigger asChild>
                          <div className="flex items-center gap-1.5 cursor-pointer">
                            <RiskIcon className={cn("w-4 h-4", riskConfig.text)} />
                          </div>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-64" side="right">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Badge className={riskConfig.badge}>
                                {riskConfig.label} Risk
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {categoryConfig[item.riskCategory].label}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Status Impact: {item.statusImpact}
                            </p>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </td>

                    {/* Work Item */}
                    <td className="px-4 py-5">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <TypeIcon className={cn("w-3.5 h-3.5 flex-shrink-0", typeConfig[item.type].color)} />
                          <span className="font-mono text-xs text-muted-foreground">
                            {item.key}
                          </span>
                        </div>
                        <div className="font-medium text-sm leading-tight">
                          {item.title}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {item.hierarchyPath}
                        </div>
                      </div>
                    </td>

                    {/* Type */}
                    <td className="px-4 py-5">
                      <Badge variant="outline" className="text-xs">
                        {typeConfig[item.type].label}
                      </Badge>
                    </td>

                    {/* Risk Description & Impact */}
                    <td className="px-4 py-5">
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <CategoryIcon className={cn("w-3.5 h-3.5 flex-shrink-0 mt-0.5", categoryConfig[item.riskCategory].color)} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm leading-relaxed">
                              {item.riskDescription}
                            </p>
                          </div>
                        </div>
                        <div className={cn(
                          "text-xs px-2 py-1.5 rounded border-l-2",
                          riskConfig.bg,
                          riskConfig.border
                        )}>
                          <span className="font-medium">Impact:</span> {item.impact}
                        </div>
                      </div>
                    </td>

                    {/* Recommended Action */}
                    <td className="px-4 py-5">
                      <div className="flex items-start gap-2">
                        <Target className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-primary" />
                        <p className="text-sm leading-relaxed font-medium">
                          {item.recommendedAction}
                        </p>
                      </div>
                    </td>

                    {/* Owner */}
                    <td className="px-4 py-5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-semibold text-primary">
                            {item.owner.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="text-sm truncate">{item.owner}</span>
                      </div>
                    </td>

                    {/* Due Date */}
                    <td className="px-4 py-5">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          {new Date(item.dueDate).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Footer note */}
      <div className="text-xs text-muted-foreground flex items-center gap-2 px-2">
        <AlertCircle className="w-3.5 h-3.5" />
        <span>Risk register updated in real-time based on project status, dependencies, and schedule analysis</span>
      </div>
    </div>
  );
}
