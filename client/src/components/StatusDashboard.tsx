import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Layers, TrendingUp, Target } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BusinessRequestGrid from './BusinessRequestGrid';
import StrategicThemeSpotlight from './StrategicThemeSpotlight';
import { CompactRiskList, CompactRiskItem } from './CompactRiskList';

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
  const [selectedTheme, setSelectedTheme] = useState<string>('all');

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
    {
      id: 'br-5',
      name: 'Real-time Analytics Dashboard',
      themeName: 'Digital Transformation',
      initiativeName: 'Data Analytics Platform',
      totalItems: 18,
      completedItems: 10,
      inProgressItems: 6,
      blockedItems: 2,
      completionPercentage: 56,
      priority: 'high',
    },
  ];

  // Mock portfolio risk items derived from business requests
  const mockPortfolioRisks: CompactRiskItem[] = [
    {
      id: 'br-1',
      key: 'BR-001',
      title: 'SSO Integration',
      priority: 'high',
      progress: 65,
      endDate: '2025-12-15',
      isAtRisk: true,
    },
    {
      id: 'br-3',
      key: 'BR-003',
      title: 'GDPR Compliance',
      priority: 'high',
      progress: 29,
      endDate: '2025-11-25',
      isAtRisk: true,
    },
    {
      id: 'br-2',
      key: 'BR-002',
      title: 'Customer Portal Modernization',
      priority: 'medium',
      progress: 33,
      endDate: '2026-01-30',
      isAtRisk: true,
    },
    {
      id: 'br-5',
      key: 'BR-005',
      title: 'Real-time Analytics Dashboard',
      priority: 'high',
      progress: 56,
      endDate: '2025-12-10',
      isAtRisk: true,
    },
  ];

  const themes = useMemo(() => {
    const uniqueThemes = new Set(defaultInitiatives.map(i => i.themeName));
    return Array.from(uniqueThemes);
  }, [defaultInitiatives]);

  const filteredInitiatives = useMemo(() => {
    if (selectedTheme === 'all') return defaultInitiatives;
    return defaultInitiatives.filter(i => i.themeName === selectedTheme);
  }, [selectedTheme, defaultInitiatives]);

  const filteredBusinessRequests = useMemo(() => {
    if (selectedTheme === 'all') return defaultBusinessRequests;
    return defaultBusinessRequests.filter(br => br.themeName === selectedTheme);
  }, [selectedTheme, defaultBusinessRequests]);

  const totalItems = filteredInitiatives.reduce((sum, init) => sum + init.totalItems, 0);
  const completedItems = filteredInitiatives.reduce((sum, init) => sum + init.completedItems, 0);
  const overallCompletion = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  const themeMetrics = useMemo(() => {
    if (selectedTheme === 'all') return null;
    
    const themeInitiatives = defaultInitiatives.filter(i => i.themeName === selectedTheme);
    const themeRequests = defaultBusinessRequests.filter(br => br.themeName === selectedTheme);
    
    const totalThemeItems = themeInitiatives.reduce((sum, init) => sum + init.totalItems, 0);
    const completedThemeItems = themeInitiatives.reduce((sum, init) => sum + init.completedItems, 0);
    const atRisk = themeRequests.reduce((sum, br) => sum + br.blockedItems, 0);
    const completedInits = themeInitiatives.filter(i => i.completionPercentage === 100).length;
    
    return {
      themeName: selectedTheme,
      completionPercentage: totalThemeItems > 0 ? Math.round((completedThemeItems / totalThemeItems) * 100) : 0,
      totalInitiatives: themeInitiatives.length,
      completedInitiatives: completedInits,
      totalItems: totalThemeItems,
      completedItems: completedThemeItems,
      atRiskItems: atRisk,
      trend: completedThemeItems > totalThemeItems * 0.5 ? 'up' as const : completedThemeItems > 0 ? 'stable' as const : 'down' as const,
    };
  }, [selectedTheme, defaultInitiatives, defaultBusinessRequests]);

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
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Portfolio Dashboard</h2>
          <p className="text-muted-foreground">Strategic initiatives and business request progress</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-muted-foreground" />
          <Tabs value={selectedTheme} onValueChange={setSelectedTheme}>
            <TabsList data-testid="tabs-theme-switcher">
              <TabsTrigger value="all" data-testid="tab-theme-all">All Themes</TabsTrigger>
              {themes.map(theme => (
                <TabsTrigger key={theme} value={theme} data-testid={`tab-theme-${theme.toLowerCase().replace(/\s+/g, '-')}`}>
                  {theme}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {themeMetrics && (
        <div>
          <StrategicThemeSpotlight metrics={themeMetrics} />
        </div>
      )}

      {filteredInitiatives.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">No initiatives found for the selected theme.</p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div>
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-semibold">Initiative Progress</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredInitiatives.map((initiative) => (
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


          <div>
            <div className="flex items-center gap-2 mb-4">
              <Layers className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-semibold">Strategic Business Requests</h3>
            </div>
            
            <BusinessRequestGrid requests={filteredBusinessRequests} />
          </div>

          <div>
            <Card>
              <CardContent className="p-4">
                <CompactRiskList 
                  items={mockPortfolioRisks}
                  title="Portfolio Risks"
                  emptyMessage="No portfolio risks identified"
                />
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
