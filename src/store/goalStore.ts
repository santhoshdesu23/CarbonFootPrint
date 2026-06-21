import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createGoal, updateGoalProgress } from '../services/goalService';
import type { Goal, GoalFormValues } from '../types/goal';

type GoalState = {
	goals: Goal[];
	addGoal: (values: GoalFormValues) => void;
	updateProgress: (goalId: string, progressKgCo2e: number) => void;
	toggleComplete: (goalId: string) => void;
};

export const useGoalStore = create<GoalState>()(
	persist(
		(set, get) => ({
			goals: [],
			addGoal: (values) => {
				const goals = [createGoal(values), ...get().goals];
				set({ goals });
			},
			updateProgress: (goalId, progressKgCo2e) => {
				const goals = get().goals.map((goal) =>
					goal.id === goalId ? updateGoalProgress(goal, progressKgCo2e) : goal,
				);
				set({ goals });
			},
			toggleComplete: (goalId) => {
				const goals = get().goals.map((goal) =>
					goal.id === goalId ? { ...goal, completed: !goal.completed } : goal,
				);
				set({ goals });
			},
		}),
		{
			name: 'carbonwise-goals',
			storage: createJSONStorage(() => localStorage),
		},
	),
);

export const goalStore = useGoalStore;
