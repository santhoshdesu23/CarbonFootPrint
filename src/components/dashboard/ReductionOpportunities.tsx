import Card from '../common/Card';
import Button from '../common/Button';
import { useCarbonStore } from '../../store/carbonStore';
import { useUserStore } from '../../store/userStore';
import { formatSavings } from '../../utils/formatters';

export default function ReductionOpportunities() {
  const recommendations = useCarbonStore((state) => state.recommendations);
  const unit = useUserStore((state) => state.user.preferredUnit);

  return (
    <Card className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Reduction Opportunities</h2>
        <p className="text-sm text-slate-500">High-confidence savings ideas ranked by impact.</p>
      </div>
      <div className="space-y-3">
        {recommendations.slice(0, 3).map((item) => (
          <div key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">{item.title}</p>
            <p className="mt-1 text-sm text-slate-600">{item.description}</p>
            <div className="mt-3 flex items-center justify-between gap-3 text-xs text-slate-500">
              <span>{item.impactLabel}</span>
              <span>{formatSavings(item.savingsKgCo2e, unit)}</span>
            </div>
          </div>
        ))}
      </div>
      <Button variant="secondary" className="w-full">Review all actions</Button>
    </Card>
  );
}
