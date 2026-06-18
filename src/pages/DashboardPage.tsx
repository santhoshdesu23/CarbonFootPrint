import DashboardLayout from '../components/layout/DashboardLayout';
import CarbonScoreCard from '../components/dashboard/CarbonScoreCard';
import WeeklyTrendCard from '../components/dashboard/WeeklyTrendCard';
import BenchmarkCard from '../components/dashboard/BenchmarkCard';
import CarbonTwinSimulator from '../components/dashboard/CarbonTwinSimulator';
import ImpactAmplifier from '../components/dashboard/ImpactAmplifier';
import EmissionBreakdown from '../components/dashboard/EmissionBreakdown';
import ReductionOpportunities from '../components/dashboard/ReductionOpportunities';
import SmartInsights from '../components/dashboard/SmartInsights';
import ProgressTracker from '../components/dashboard/ProgressTracker';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <ImpactAmplifier />
          <CarbonTwinSimulator />
          <div className="grid gap-6 md:grid-cols-2">
            <CarbonScoreCard />
            <BenchmarkCard />
          </div>
          <WeeklyTrendCard />
          <EmissionBreakdown />
          <ProgressTracker />
        </div>
        <div className="space-y-6">
          <SmartInsights />
          <ReductionOpportunities />
        </div>
      </div>
    </DashboardLayout>
  );
}
