import { create } from 'zustand';
import { createGoal, updateGoalProgress } from '../services/goalService';
import { readStorage, writeStorage } from '../services/storageService';
import type { Goal, GoalFormValues } from '../types/goal';

type GoalState = {
	goals: Goal[];
	addGoal: (values: GoalFormValues) => void;
	updateProgress: (goalId: string, progressKgCo2e: number) => void;
	toggleComplete: (goalId: string) => void;
};

const storedGoals = readStorage<Goal[]>('carbonwise-goals', []);

export const useGoalStore = create<GoalState>((set, get) => ({
	goals: storedGoals,
	addGoal: (values) => {
		const nextGoal = createGoal(values);
		const goals = [nextGoal, ...get().goals];
		writeStorage('carbonwise-goals', goals);
		set({ goals });
	},
	updateProgress: (goalId, progressKgCo2e) => {
		const goals = get().goals.map((goal) => (goal.id === goalId ? updateGoalProgress(goal, progressKgCo2e) : goal));
		writeStorage('carbonwise-goals', goals);
		set({ goals });
	},
	toggleComplete: (goalId) => {
		const goals = get().goals.map((goal) => goal.id === goalId ? { ...goal, completed: !goal.completed } : goal);
		writeStorage('carbonwise-goals', goals);
		set({ goals });
	},
}));

export const goalStore = useGoalStore;
