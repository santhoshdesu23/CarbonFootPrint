import Card from '../common/Card';
import { useCarbonStore } from '../../store/carbonStore';
import { useUserStore } from '../../store/userStore';
import { formatWeight } from '../../utils/formatters';

// Monthly reduction opportunity as a percentage of total emissions
const MONTHLY_OPPORTUNITY_RATE = 0.12;

export default function SmartInsights() {
  const profile = useCarbonStore((state) => state.profile);
  const unit = useUserStore((state) => state.user.preferredUnit);
  const topCategory = [...profile.categoryEmissions].sort((a, b) => b.kgCo2e - a.kgCo2e)[0];
  const monthlyOpportunity = Math.round(profile.totalKgCo2e * MONTHLY_OPPORTUNITY_RATE);
  const benchmarkGap = Math.max(0, profile.totalKgCo2e - profile.benchmarkKgCo2e);

  const insight = profile.carbonScore >= 70
    ? `Your profile is efficient. Fine-tuning ${topCategory?.category ?? 'your top category'} can push your score even higher.`
    : `Your biggest opportunity is ${topCategory?.category ?? 'reducing emissions'}. Small consistent changes there will move your score quickly.`;

  return (
    <Card className="space-y-3">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Smart Insights</h2>
        <p className="text-sm text-slate-500">AI-generated guidance from your local sustainability profile.</p>
      </div>
      <p className="rounded-2xl bg-emerald-50 p-4 text-sm leading-6 text-emerald-950">{insight}</p>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-2xl border border-slate-200 p-4">
          <p className="text-slate-500">Benchmark gap</p>
          <p className="mt-1 text-xl font-semibold text-slate-900">{formatWeight(benchmarkGap, unit)}</p>
          <p className="text-xs text-slate-400">above target</p>
        </div>
        <div className="rounded-2xl border border-slate-200 p-4">
          <p className="text-slate-500">Monthly opportunity</p>
          <p className="mt-1 text-xl font-semibold text-slate-900">{formatWeight(monthlyOpportunity, unit)}</p>
          <p className="text-xs text-slate-400">reducible this month</p>
        </div>
      </div>
    </Card>
  );
}
