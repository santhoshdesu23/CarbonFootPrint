import Card from '../common/Card';
import { useGoalStore } from '../../store/goalStore';
import { getAchievementRate } from '../../services/goalService';

export default function ProgressTracker() {
  const goals = useGoalStore((state) => state.goals);
  const completion = getAchievementRate(goals);

  return (
    <Card>
      <h2 className="text-lg font-semibold text-slate-900">Progress Tracker</h2>
      <p className="text-sm text-slate-500">Goal completion across your sustainability roadmap.</p>
      <div className="mt-4 rounded-2xl bg-slate-100 p-1">
        <div className="h-3 rounded-full bg-emerald-500 transition-all" style={{ width: `${completion}%` }} />
      </div>
      <p className="mt-3 text-sm text-slate-600">{completion}% of goals completed</p>
    </Card>
  );
}
