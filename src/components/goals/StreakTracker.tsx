import Card from '../common/Card';
import { useCarbonStore } from '../../store/carbonStore';

export default function StreakTracker() {
  const weeklyTrend = useCarbonStore((state) => state.profile.weeklyTrend);
  const positiveDays = weeklyTrend.filter((entry) => entry.kgCo2e <= weeklyTrend[0]?.kgCo2e).length;

  return (
    <Card className="space-y-3">
      <h2 className="text-lg font-semibold text-slate-900">Streak Tracking</h2>
      <p className="text-sm text-slate-500">Maintained reduction days this week.</p>
      <div className="text-4xl font-semibold text-emerald-600">{positiveDays}</div>
      <p className="text-sm text-slate-600">Consecutive positive behavior signals</p>
    </Card>
  );
}
