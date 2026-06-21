import Card from '../common/Card';
import { useCarbonStore } from '../../store/carbonStore';
import { useUserStore } from '../../store/userStore';
import { formatScore } from '../../utils/formatters';

export default function CarbonScoreCard() {
  const score = useCarbonStore((state) => state.profile.carbonScore);
  const total = useCarbonStore((state) => state.profile.totalKgCo2e);
  const unit = useUserStore((state) => state.user.preferredUnit);

  return (
    <Card>
      <p className="text-sm font-medium text-slate-500">Carbon Score</p>
      <div className="mt-3 flex items-end justify-between gap-4">
        <div>
          <div className="text-5xl font-semibold tracking-tight text-slate-950">{score.toFixed(0)}</div>
          <p className="mt-1 text-sm text-slate-500">out of 100, based on your monthly footprint</p>
        </div>
        <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-right">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-emerald-700">Total CO2e</p>
          <p className="text-lg font-semibold text-emerald-900">{formatScore(total, unit)}</p>
        </div>
      </div>
    </Card>
  );
}
