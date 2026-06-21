import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import GoalCard from '../../components/goals/GoalCard';
import GoalForm from '../../components/goals/GoalForm';
import { useGoalStore } from '../../store/goalStore';

beforeEach(() => {
  act(() => {
    useGoalStore.setState({ goals: [] });
  });
});

describe('Goal tracking flow', () => {
  it('GoalForm renders all required fields', () => {
    render(<GoalForm />);
    expect(screen.getByLabelText(/Goal title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Target kg CO2e/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Starting progress/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Deadline/i)).toBeInTheDocument();
  });

  it('submitting GoalForm adds a goal to the store', async () => {
    render(<GoalForm />);
    await userEvent.clear(screen.getByLabelText(/Goal title/i));
    await userEvent.type(screen.getByLabelText(/Goal title/i), 'Cut food emissions');
    await userEvent.click(screen.getByRole('button', { name: /Save goal/i }));
    expect(useGoalStore.getState().goals.length).toBeGreaterThan(0);
    expect(useGoalStore.getState().goals[0].title).toBe('Cut food emissions');
  });

  it('added goal appears in GoalCard', async () => {
    act(() => {
      useGoalStore.getState().addGoal({
        title: 'Reduce energy use',
        targetKgCo2e: 20,
        progressKgCo2e: 5,
        deadline: 'Monthly',
      });
    });
    render(<GoalCard />);
    expect(screen.getByText(/Reduce energy use/i)).toBeInTheDocument();
  });

  it('updating progress reflects in the store', () => {
    act(() => {
      useGoalStore.getState().addGoal({
        title: 'Walk more',
        targetKgCo2e: 15,
        progressKgCo2e: 0,
        deadline: 'Weekly',
      });
    });
    const goal = useGoalStore.getState().goals[0];
    act(() => {
      useGoalStore.getState().updateProgress(goal.id, 15);
    });
    const updated = useGoalStore.getState().goals.find((g) => g.id === goal.id);
    expect(updated?.completed).toBe(true);
  });

  it('toggleComplete flips completed status', () => {
    act(() => {
      useGoalStore.getState().addGoal({
        title: 'Test toggle',
        targetKgCo2e: 10,
        progressKgCo2e: 0,
        deadline: 'Weekly',
      });
    });
    const goal = useGoalStore.getState().goals[0];
    act(() => {
      useGoalStore.getState().toggleComplete(goal.id);
    });
    expect(useGoalStore.getState().goals[0].completed).toBe(true);
  });

  it('multiple goals are all shown in GoalCard', () => {
    act(() => {
      useGoalStore.getState().addGoal({ title: 'Goal A', targetKgCo2e: 10, progressKgCo2e: 0, deadline: 'W' });
      useGoalStore.getState().addGoal({ title: 'Goal B', targetKgCo2e: 20, progressKgCo2e: 0, deadline: 'W' });
    });
    render(<GoalCard />);
    expect(screen.getByText('Goal A')).toBeInTheDocument();
    expect(screen.getByText('Goal B')).toBeInTheDocument();
  });
});
