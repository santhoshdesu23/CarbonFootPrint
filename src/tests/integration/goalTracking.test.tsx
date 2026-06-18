import { act, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import GoalForm from '../../components/goals/GoalForm';
import GoalCard from '../../components/goals/GoalCard';
import { useGoalStore } from '../../store/goalStore';

describe('goalTracking', () => {
  it('adds and displays a goal', async () => {
    render(<GoalForm />);
    const title = screen.getByLabelText(/Goal title/i);
    expect(title).toBeInTheDocument();

    act(() => {
      useGoalStore.getState().addGoal({
        title: 'Cut transport emissions',
        targetKgCo2e: 20,
        progressKgCo2e: 5,
        deadline: 'Weekly',
      });
    });

    render(<GoalCard />);
    expect(screen.getByText(/Cut transport emissions/i)).toBeInTheDocument();
  });
});
