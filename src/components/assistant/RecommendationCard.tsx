import Card from '../common/Card';
import type { Recommendation } from '../../types/carbon';
import { formatSavings } from '../../utils/formatters';

type RecommendationCardProps = {
  recommendation: Recommendation;
};

export default function RecommendationCard({ recommendation }: RecommendationCardProps) {
  return (
    <Card className="space-y-2">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900">{recommendation.title}</h3>
          <p className="mt-1 text-sm text-slate-600">{recommendation.description}</p>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">{recommendation.category}</span>
      </div>
      <div className="flex items-center justify-between text-sm text-slate-500">
        <span>{recommendation.impactLabel}</span>
        <span>{formatSavings(recommendation.savingsKgCo2e)}</span>
      </div>
    </Card>
  );
}
