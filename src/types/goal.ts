export type Goal = {
  id: string;
  title: string;
  targetKgCo2e: number;
  progressKgCo2e: number;
  deadline: string;
  completed: boolean;
};

export type GoalFormValues = Omit<Goal, 'id' | 'completed'>;
