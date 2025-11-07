import GanttChart, { GanttItem } from '../GanttChart';

const mockGanttData: GanttItem[] = [
  {
    id: 'feat-1',
    title: 'User Authentication',
    type: 'feature',
    status: 'in-progress',
    priority: 'high',
    releaseLabel: 'Q1 2025',
    targetStartDate: new Date('2025-01-15'),
    targetEndDate: new Date('2025-03-31'),
    completionPercentage: 75,
    themeName: 'Digital Transformation',
    initiativeName: 'Customer Portal Modernization',
    storyPoints: 34,
  },
  {
    id: 'epic-1',
    title: 'SSO Integration',
    type: 'epic',
    status: 'done',
    priority: 'high',
    targetStartDate: new Date('2025-01-15'),
    targetEndDate: new Date('2025-02-28'),
    completionPercentage: 100,
    themeName: 'Digital Transformation',
    initiativeName: 'Customer Portal Modernization',
    storyPoints: 13,
  },
];

export default function GanttChartExample() {
  return (
    <div className="h-96">
      <GanttChart
        items={mockGanttData}
        onItemClick={(item) => console.log('Item clicked:', item)}
      />
    </div>
  );
}
