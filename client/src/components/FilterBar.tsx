import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, Download } from 'lucide-react';

interface FilterBarProps {
  onLevelChange?: (level: string) => void;
  onStatusChange?: (status: string) => void;
  onSearchChange?: (search: string) => void;
  onExport?: () => void;
}

export default function FilterBar({ onLevelChange, onStatusChange, onSearchChange, onExport }: FilterBarProps) {
  return (
    <div className="flex items-center gap-4 p-4 border-b bg-card">
      <div className="flex items-center gap-2 flex-1">
        <Search className="w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search items..."
          className="max-w-xs"
          onChange={(e) => onSearchChange?.(e.target.value)}
          data-testid="input-search"
        />
      </div>

      <Select onValueChange={onLevelChange} defaultValue="all">
        <SelectTrigger className="w-40" data-testid="select-level">
          <SelectValue placeholder="Hierarchy Level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Levels</SelectItem>
          <SelectItem value="theme">Strategic Theme</SelectItem>
          <SelectItem value="initiative">Initiative</SelectItem>
          <SelectItem value="br">Business Request</SelectItem>
          <SelectItem value="epic">Epic</SelectItem>
          <SelectItem value="feature">Feature</SelectItem>
          <SelectItem value="story">Story</SelectItem>
          <SelectItem value="bug">Bug</SelectItem>
          <SelectItem value="incident">Incident</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={onStatusChange} defaultValue="all">
        <SelectTrigger className="w-40" data-testid="select-status">
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

      <Button variant="outline" size="sm" onClick={onExport} data-testid="button-export">
        <Download className="w-4 h-4 mr-2" />
        Export PDF
      </Button>
    </div>
  );
}
