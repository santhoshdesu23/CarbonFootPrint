import DashboardLayout from '../components/layout/DashboardLayout';
import GoalCard from '../components/goals/GoalCard';
import GoalForm from '../components/goals/GoalForm';
import AchievementBadge from '../components/goals/AchievementBadge';
import StreakTracker from '../components/goals/StreakTracker';

export default function GoalsPage() {
  return (
    <DashboardLayout>
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="space-y-6">
          <GoalForm />
          <GoalCard />
        </section>
        <section className="space-y-6">
          <AchievementBadge />
          <StreakTracker />
        </section>
      </div>
    </DashboardLayout>
  );
}
