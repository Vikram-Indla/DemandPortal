import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Download } from 'lucide-react';

interface FilterBarProps {
  onLevelChange?: (level: string) => void;
  onStatusChange?: (status: string) => void;
  onPriorityChange?: (priority: string) => void;
  onReleaseChange?: (release: string) => void;
  onSearchChange?: (search: string) => void;
  onExport?: () => void;
  releases?: string[];
}

export default function FilterBar({ 
  onLevelChange, 
  onStatusChange, 
  onPriorityChange,
  onReleaseChange,
  onSearchChange, 
  onExport,
  releases = []
}: FilterBarProps) {
  return (
    <div className="flex items-center gap-4 p-4 border-b bg-card flex-wrap">
      <div className="flex items-center gap-2 flex-1 min-w-64">
        <Search className="w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search items..."
          className="max-w-xs"
          onChange={(e) => onSearchChange?.(e.target.value)}
          data-testid="input-search"
        />
      </div>

      <Select onValueChange={onLevelChange} defaultValue="all">
        <SelectTrigger className="w-36" data-testid="select-level">
          <SelectValue placeholder="Item Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="business-request">Business Request</SelectItem>
          <SelectItem value="feature">Feature</SelectItem>
          <SelectItem value="epic">Epic</SelectItem>
          <SelectItem value="story">Story</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={onStatusChange} defaultValue="all">
        <SelectTrigger className="w-36" data-testid="select-status">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="done">Done</SelectItem>
          <SelectItem value="in-progress">In Progress</SelectItem>
          <SelectItem value="blocked">Blocked</SelectItem>
          <SelectItem value="not-started">Not Started</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={onPriorityChange} defaultValue="all">
        <SelectTrigger className="w-36" data-testid="select-priority">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Priority</SelectItem>
          <SelectItem value="high">High</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="low">Low</SelectItem>
        </SelectContent>
      </Select>

      {releases.length > 0 && (
        <Select onValueChange={onReleaseChange} defaultValue="all">
          <SelectTrigger className="w-36" data-testid="select-release">
            <SelectValue placeholder="Release" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Releases</SelectItem>
            {releases.map((release) => (
              <SelectItem key={release} value={release}>{release}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      <Button variant="outline" size="sm" onClick={onExport} data-testid="button-export">
        <Download className="w-4 h-4 mr-2" />
        Export PDF
      </Button>
    </div>
  );
}
