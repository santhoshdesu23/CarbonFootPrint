import Card from '../common/Card';
import { useCarbonStore } from '../../store/carbonStore';
import { useUserStore } from '../../store/userStore';
import { formatWeight } from '../../utils/formatters';

export default function BenchmarkCard() {
  const [you, benchmark] = useCarbonStore((state) => state.benchmarkData);
  const unit = useUserStore((state) => state.user.preferredUnit);

  return (
    <Card>
      <p className="text-sm font-medium text-slate-500">Benchmark Comparison</p>
      <div className="mt-4 grid grid-cols-2 gap-4">
        {[you, benchmark].map((entry) => (
          <div key={entry.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{entry.label}</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{entry.value.toFixed(1)}</p>
            <p className="text-xs text-slate-500">{formatWeight(entry.value, unit).split(' ').slice(1).join(' ')}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
