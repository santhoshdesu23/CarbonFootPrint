import Card from '../common/Card';
import { useCarbonStore } from '../../store/carbonStore';

export default function AchievementBadge() {
  const score = useCarbonStore((state) => state.profile.carbonScore);
  const badges = [
    { title: 'Score Starter', unlocked: score >= 50 },
    { title: 'Efficiency Builder', unlocked: score >= 65 },
    { title: 'Sustainability Leader', unlocked: score >= 80 },
  ];

  return (
    <Card className="space-y-3">
      <h2 className="text-lg font-semibold text-slate-900">Achievement Badges</h2>
      <div className="grid gap-3">
        {badges.map((badge) => (
          <div key={badge.title} className={`rounded-2xl border p-4 ${badge.unlocked ? 'border-emerald-200 bg-emerald-50' : 'border-slate-200 bg-slate-50'}`}>
            <p className="font-medium text-slate-900">{badge.title}</p>
            <p className="text-sm text-slate-500">{badge.unlocked ? 'Unlocked' : 'Locked'}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
