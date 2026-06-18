import Card from '../common/Card';
import { useCarbonStore } from '../../store/carbonStore';

export default function SmartInsights() {
  const profile = useCarbonStore((state) => state.profile);

  const insight =
    profile.carbonScore >= 70
      ? 'Your profile is efficient. Focus on fine-tuning the high-impact transport and food categories.'
      : 'The fastest savings come from transport and food. Small changes there will move the score quickly.';

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
          <p className="mt-1 text-xl font-semibold text-slate-900">{Math.max(0, profile.totalKgCo2e - profile.benchmarkKgCo2e).toFixed(1)}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 p-4">
          <p className="text-slate-500">Monthly opportunity</p>
          <p className="mt-1 text-xl font-semibold text-slate-900">{Math.round(profile.totalKgCo2e * 0.12).toFixed(0)}</p>
        </div>
      </div>
    </Card>
  );
}
