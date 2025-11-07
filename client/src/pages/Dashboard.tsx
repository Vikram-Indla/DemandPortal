import DashboardLayout from '@/components/DashboardLayout';
import StatusDashboard from '@/components/StatusDashboard';
import RoadmapView from '@/components/RoadmapView';

export default function Dashboard() {
  return (
    <DashboardLayout
      statusContent={<StatusDashboard />}
      roadmapContent={<RoadmapView />}
    />
  );
}
