import Card from '../common/Card';
import Button from '../common/Button';
import { useGoalStore } from '../../store/goalStore';

export default function GoalCard() {
  const goals = useGoalStore((state) => state.goals);
  const toggleComplete = useGoalStore((state) => state.toggleComplete);

  return (
    <Card className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Weekly Goals</h2>
        <p className="text-sm text-slate-500">Plan carbon reduction actions and track progress.</p>
      </div>
      <div className="space-y-3">
        {goals.map((goal) => {
          const pct = Math.min(100, goal.targetKgCo2e > 0 ? (goal.progressKgCo2e / goal.targetKgCo2e) * 100 : 0);
          return (
            <div key={goal.id} className="rounded-2xl border border-slate-200 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-slate-900">{goal.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">Target {goal.targetKgCo2e.toFixed(0)} kg CO2e by {goal.deadline}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleComplete(goal.id)}
                  aria-label={goal.completed ? `Mark "${goal.title}" incomplete` : `Mark "${goal.title}" complete`}
                >
                  {goal.completed ? 'Undo' : 'Done'}
                </Button>
              </div>
              <div
                className="mt-3 h-2 rounded-full bg-slate-100"
                role="progressbar"
                aria-valuenow={Math.round(pct)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${goal.title} progress`}
              >
                <div className="h-2 rounded-full bg-emerald-500 transition-all" style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
        {goals.length === 0 ? <p className="text-sm text-slate-500">No goals yet. Create one with the form above.</p> : null}
      </div>
    </Card>
  );
}
