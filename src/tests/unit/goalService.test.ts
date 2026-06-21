import { describe, expect, it } from 'vitest';
import { createGoal, getAchievementRate, updateGoalProgress } from '../../services/goalService';
import type { Goal } from '../../types/goal';

const baseValues = {
  title: 'Reduce transport',
  targetKgCo2e: 50,
  progressKgCo2e: 10,
  deadline: 'Weekly',
};

describe('createGoal', () => {
  it('returns a goal with an id', () => {
    const goal = createGoal(baseValues);
    expect(goal.id.startsWith('goal-')).toBe(true);
  });

  it('completed is true when progress meets target', () => {
    const goal = createGoal({ ...baseValues, progressKgCo2e: 50, targetKgCo2e: 50 });
    expect(goal.completed).toBe(true);
  });

  it('completed is false when progress is below target', () => {
    const goal = createGoal(baseValues);
    expect(goal.completed).toBe(false);
  });

  it('completed is true when progress exceeds target', () => {
    const goal = createGoal({ ...baseValues, progressKgCo2e: 60, targetKgCo2e: 50 });
    expect(goal.completed).toBe(true);
  });

  it('preserves all form values', () => {
    const goal = createGoal(baseValues);
    expect(goal.title).toBe(baseValues.title);
    expect(goal.targetKgCo2e).toBe(baseValues.targetKgCo2e);
    expect(goal.deadline).toBe(baseValues.deadline);
  });

  it('each created goal has a unique id', () => {
    const id1 = createGoal(baseValues).id;
    const id2 = createGoal(baseValues).id;
    expect(id1).not.toBe(id2);
  });
});

describe('updateGoalProgress', () => {
  const goal: Goal = { id: 'goal-1', title: 'Test', targetKgCo2e: 40, progressKgCo2e: 10, deadline: 'Monthly', completed: false };

  it('updates progressKgCo2e', () => {
    const updated = updateGoalProgress(goal, 25);
    expect(updated.progressKgCo2e).toBe(25);
  });

  it('marks completed when progress reaches target', () => {
    const updated = updateGoalProgress(goal, 40);
    expect(updated.completed).toBe(true);
  });

  it('marks completed when progress exceeds target', () => {
    const updated = updateGoalProgress(goal, 99);
    expect(updated.completed).toBe(true);
  });

  it('remains incomplete when progress is below target', () => {
    const updated = updateGoalProgress(goal, 20);
    expect(updated.completed).toBe(false);
  });

  it('does not mutate the original goal', () => {
    updateGoalProgress(goal, 40);
    expect(goal.completed).toBe(false);
  });
});

describe('getAchievementRate', () => {
  it('returns 0 for empty goals array', () => {
    expect(getAchievementRate([])).toBe(0);
  });

  it('returns 100 when all goals are completed', () => {
    const goals: Goal[] = [
      { id: '1', title: 'A', targetKgCo2e: 10, progressKgCo2e: 10, deadline: 'W', completed: true },
      { id: '2', title: 'B', targetKgCo2e: 20, progressKgCo2e: 20, deadline: 'W', completed: true },
    ];
    expect(getAchievementRate(goals)).toBe(100);
  });

  it('returns 50 when half are completed', () => {
    const goals: Goal[] = [
      { id: '1', title: 'A', targetKgCo2e: 10, progressKgCo2e: 10, deadline: 'W', completed: true },
      { id: '2', title: 'B', targetKgCo2e: 20, progressKgCo2e: 5, deadline: 'W', completed: false },
    ];
    expect(getAchievementRate(goals)).toBe(50);
  });

  it('returns 0 when no goals are completed', () => {
    const goals: Goal[] = [
      { id: '1', title: 'A', targetKgCo2e: 10, progressKgCo2e: 2, deadline: 'W', completed: false },
    ];
    expect(getAchievementRate(goals)).toBe(0);
  });
});
