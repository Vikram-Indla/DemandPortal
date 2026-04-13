import DashboardLayout from '@/components/DashboardLayout';
import StatusDashboard from '@/components/StatusDashboard';
import RoadmapView from '@/components/RoadmapView';
import FeatureRoadmap from '@/components/FeatureRoadmap';
import EpicRoadmap from '@/components/EpicRoadmap';
import ReleaseDashboard from '@/components/ReleaseDashboard';
import RoadmapGuide from '@/pages/RoadmapGuide';

// Import mock seed data (temporary - will be replaced with real Jira data)
import { featureRoadmapMock } from '@/data/featureRoadmapMock';
import { epicRoadmapMock } from '@/data/epicRoadmapMock';
import { releaseDashboardMock } from '@/data/releaseDashboardMock';
import { 
  initiativeMetricsMock, 
  businessRequestMetricsMock 
} from '@/data/portfolioMetricsMock';

export default function Dashboard() {
  return (
    <DashboardLayout
      statusContent={
        <StatusDashboard 
          initiatives={initiativeMetricsMock}
          businessRequests={businessRequestMetricsMock}
        />
      }
      roadmapContent={<RoadmapView />}
      featureRoadmapContent={<FeatureRoadmap features={featureRoadmapMock} />}
      epicRoadmapContent={<EpicRoadmap epics={epicRoadmapMock} />}
      storyCompletionContent={<ReleaseDashboard stories={releaseDashboardMock} />}
      roadmapGuideContent={<RoadmapGuide />}
    />
  );
}
