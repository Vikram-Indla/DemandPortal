import GanttChart, { GanttItem } from '../GanttChart';

const mockGanttData: GanttItem[] = [
  {
    id: 'task-1',
    title: 'Digital Transformation Initiative',
    type: 'Theme',
    status: 'in-progress',
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-06-30'),
    progress: 45,
  },
  {
    id: 'task-2',
    title: 'Customer Portal Modernization',
    type: 'Initiative',
    status: 'in-progress',
    startDate: new Date('2025-01-15'),
    endDate: new Date('2025-04-30'),
    progress: 60,
  },
  {
    id: 'task-3',
    title: 'New Authentication System',
    type: 'BR',
    status: 'done',
    startDate: new Date('2025-02-01'),
    endDate: new Date('2025-03-15'),
    progress: 100,
  },
  {
    id: 'task-4',
    title: 'SSO Integration',
    type: 'Epic',
    status: 'done',
    startDate: new Date('2025-02-01'),
    endDate: new Date('2025-03-01'),
    progress: 100,
  },
  {
    id: 'task-5',
    title: 'Cloud Migration',
    type: 'Initiative',
    status: 'not-started',
    startDate: new Date('2025-05-01'),
    endDate: new Date('2025-08-31'),
    progress: 0,
  },
  {
    id: 'task-6',
    title: 'API Gateway Setup',
    type: 'Feature',
    status: 'blocked',
    startDate: new Date('2025-03-01'),
    endDate: new Date('2025-04-15'),
    progress: 25,
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
