import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown, 
  CheckCircle2, 
  Circle, 
  AlertCircle,
  Minus,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

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

interface BusinessRequestGridProps {
  requests: BusinessRequestMetrics[];
}

type SortField = 'name' | 'priority' | 'completion' | 'blocked';
type SortDirection = 'asc' | 'desc';

export default function BusinessRequestGrid({ requests }: BusinessRequestGridProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const priorityOrder = { high: 3, medium: 2, low: 1 };

  const filteredAndSortedRequests = useMemo(() => {
    let filtered = requests.filter(req =>
      req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.themeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.initiativeName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'priority':
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
          break;
        case 'completion':
          comparison = a.completionPercentage - b.completionPercentage;
          break;
        case 'blocked':
          comparison = a.blockedItems - b.blockedItems;
          break;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [requests, searchTerm, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'high':
        return { 
          color: 'text-red-600 dark:text-red-400',
          bgColor: 'bg-red-100 dark:bg-red-950/30',
          icon: ArrowUp 
        };
      case 'medium':
        return { 
          color: 'text-amber-600 dark:text-amber-400',
          bgColor: 'bg-amber-100 dark:bg-amber-950/30',
          icon: Minus 
        };
      default:
        return { 
          color: 'text-slate-600 dark:text-slate-400',
          bgColor: 'bg-slate-100 dark:bg-slate-800/30',
          icon: ArrowDown 
        };
    }
  };

  const getHealthDot = (completion: number, blocked: number) => {
    if (blocked > 0) return 'bg-red-500';
    if (completion >= 75) return 'bg-green-500';
    if (completion >= 50) return 'bg-amber-500';
    return 'bg-blue-500';
  };

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 px-2 hover-elevate"
      onClick={() => handleSort(field)}
    >
      <span className="font-semibold text-xs">{children}</span>
      {sortField === field && (
        sortDirection === 'asc' ? 
          <ArrowUp className="ml-1 w-3 h-3" /> : 
          <ArrowDown className="ml-1 w-3 h-3" />
      )}
      {sortField !== field && <ArrowUpDown className="ml-1 w-3 h-3 opacity-40" />}
    </Button>
  );

  return (
    <div className="space-y-4">
      {/* Search & Summary */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2 flex-1 min-w-64">
          <Search className="w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
            data-testid="input-search-requests"
          />
        </div>
        <div className="text-sm text-muted-foreground">
          Showing {filteredAndSortedRequests.length} of {requests.length} requests
        </div>
      </div>

      {/* Data Grid */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-muted/50 sticky top-0 z-10">
                <tr>
                  <th className="text-left p-0 w-12"></th>
                  <th className="text-left p-2">
                    <SortButton field="name">Request</SortButton>
                  </th>
                  <th className="text-left p-2 w-32">
                    <SortButton field="priority">Priority</SortButton>
                  </th>
                  <th className="text-left p-2 w-48">
                    <SortButton field="completion">Progress</SortButton>
                  </th>
                  <th className="text-center p-2 w-24">
                    <span className="text-xs font-semibold">Total</span>
                  </th>
                  <th className="text-center p-2 w-24">
                    <span className="text-xs font-semibold">Done</span>
                  </th>
                  <th className="text-center p-2 w-24">
                    <span className="text-xs font-semibold">In Progress</span>
                  </th>
                  <th className="text-center p-2 w-24">
                    <SortButton field="blocked">Blocked</SortButton>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedRequests.map((req, index) => {
                  const priorityConfig = getPriorityConfig(req.priority);
                  const PriorityIcon = priorityConfig.icon;
                  const isExpanded = expandedRow === req.id;
                  
                  return (
                    <tr 
                      key={req.id} 
                      className={cn(
                        "border-b hover-elevate transition-colors",
                        index % 2 === 0 ? 'bg-background' : 'bg-muted/20'
                      )}
                      data-testid={`row-br-${req.id}`}
                    >
                      <td className="p-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => setExpandedRow(isExpanded ? null : req.id)}
                        >
                          {isExpanded ? 
                            <ChevronDown className="w-4 h-4" /> : 
                            <ChevronRight className="w-4 h-4" />
                          }
                        </Button>
                      </td>
                      <td className="p-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <div className={cn("w-2 h-2 rounded-full", getHealthDot(req.completionPercentage, req.blockedItems))} />
                            <span className="font-medium text-sm">{req.name}</span>
                          </div>
                          {isExpanded && (
                            <div className="pl-4 space-y-0.5 text-xs text-muted-foreground">
                              <div>Theme: {req.themeName}</div>
                              <div>Initiative: {req.initiativeName}</div>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge 
                          variant="secondary" 
                          className={cn("capitalize flex items-center gap-1 w-fit", priorityConfig.color)}
                        >
                          <PriorityIcon className="w-3 h-3" />
                          {req.priority}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between gap-2">
                            <Progress value={req.completionPercentage} className="h-2 flex-1" />
                            <span className="text-sm font-semibold w-10 text-right">{req.completionPercentage}%</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Circle className="w-3 h-3 text-muted-foreground" />
                          <span className="text-sm font-medium">{req.totalItems}</span>
                        </div>
                      </td>
                      <td className="p-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-green-600 dark:text-green-400" />
                          <span className="text-sm font-semibold text-green-600 dark:text-green-400">{req.completedItems}</span>
                        </div>
                      </td>
                      <td className="p-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Circle className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{req.inProgressItems}</span>
                        </div>
                      </td>
                      <td className="p-3 text-center">
                        {req.blockedItems > 0 ? (
                          <div className="flex items-center justify-center gap-1">
                            <AlertCircle className="w-3 h-3 text-red-600 dark:text-red-400" />
                            <span className="text-sm font-semibold text-red-600 dark:text-red-400">{req.blockedItems}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredAndSortedRequests.length === 0 && (
            <div className="p-12 text-center text-muted-foreground">
              No business requests found matching your search.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
