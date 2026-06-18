import Card from '../common/Card';
import Button from '../common/Button';
import RecommendationCard from './RecommendationCard';
import { useCarbonStore } from '../../store/carbonStore';
import { useAssistantStore } from '../../store/assistantStore';

export default function AiCoach() {
  const profile = useCarbonStore((state) => state.profile);
  const recommendations = useCarbonStore((state) => state.recommendations);
  const seedAssistant = useAssistantStore((state) => state.seedAssistant);

  return (
    <Card className="space-y-5">
      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-500">AI Sustainability Coach</p>
        <h2 className="text-2xl font-semibold text-slate-950">Local recommendations, tuned to your footprint</h2>
        <p className="text-sm leading-6 text-slate-600">The coach evaluates your carbon profile locally and suggests the most effective behavior changes without calling external AI APIs.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Score</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{profile.carbonScore.toFixed(0)}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Top category</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{profile.categoryEmissions[0]?.category ?? 'n/a'}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Monthly savings</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{Math.round(profile.totalKgCo2e * 0.12).toFixed(0)}</p>
        </div>
      </div>
      <Button variant="secondary" onClick={() => seedAssistant(profile)}>Seed coach conversation</Button>
      <div className="space-y-3">
        {recommendations.slice(0, 2).map((recommendation) => (
          <RecommendationCard key={recommendation.id} recommendation={recommendation} />
        ))}
      </div>
    </Card>
  );
}
