import DashboardLayout from '../components/layout/DashboardLayout';
import TrendLineChart from '../components/charts/TrendLineChart';
import CategoryBarChart from '../components/charts/CategoryBarChart';
import CarbonPieChart from '../components/charts/CarbonPieChart';
import BenchmarkChart from '../components/charts/BenchmarkChart';

export default function InsightsPage() {
  return (
    <DashboardLayout>
      <div className="grid gap-6 lg:grid-cols-2">
        <TrendLineChart />
        <BenchmarkChart />
        <CarbonPieChart />
        <CategoryBarChart />
      </div>
    </DashboardLayout>
  );
}
