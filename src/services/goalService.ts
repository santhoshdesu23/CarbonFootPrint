import { createId } from '../utils/helpers';
import type { Goal, GoalFormValues } from '../types/goal';

export function createGoal(values: GoalFormValues): Goal {
  return {
    id: createId('goal'),
    ...values,
    completed: values.progressKgCo2e >= values.targetKgCo2e,
  };
}

export function updateGoalProgress(goal: Goal, progressKgCo2e: number): Goal {
  return {
    ...goal,
    progressKgCo2e,
    completed: progressKgCo2e >= goal.targetKgCo2e,
  };
}

export function getAchievementRate(goals: Goal[]) {
  if (goals.length === 0) {
    return 0;
  }

  return Math.round((goals.filter((goal) => goal.completed).length / goals.length) * 100);
}
