import { useGoalStore } from '../store/goalStore';
import type { Goal } from '../types/goal';

export function useGoals(): Goal[] {
  return useGoalStore((state) => state.goals);
}
