import DashboardLayout from '../DashboardLayout';

export default function DashboardLayoutExample() {
  return (
    <DashboardLayout
      statusContent={<div className="p-6"><h2 className="text-2xl font-semibold">Status Dashboard</h2></div>}
      roadmapContent={<div className="p-6"><h2 className="text-2xl font-semibold">Roadmap View</h2></div>}
    />
  );
}
