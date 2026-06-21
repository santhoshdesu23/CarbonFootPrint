import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import GoalCard from '../../components/goals/GoalCard';
import { useGoalStore } from '../../store/goalStore';

beforeEach(() => {
  // Reset store goals to empty before each test
  act(() => {
    useGoalStore.setState({ goals: [] });
  });
});

describe('GoalCard — empty state', () => {
  it('renders the Weekly Goals heading', () => {
    render(<GoalCard />);
    expect(screen.getByRole('heading', { name: /Weekly Goals/i })).toBeInTheDocument();
  });

  it('shows empty state message when no goals', () => {
    render(<GoalCard />);
    expect(screen.getByText(/No goals yet/i)).toBeInTheDocument();
  });
});

describe('GoalCard — with goals', () => {
  beforeEach(() => {
    act(() => {
      useGoalStore.getState().addGoal({
        title: 'Reduce commute',
        targetKgCo2e: 30,
        progressKgCo2e: 10,
        deadline: 'Weekly',
      });
    });
  });

  it('renders the goal title', () => {
    render(<GoalCard />);
    expect(screen.getByText(/Reduce commute/i)).toBeInTheDocument();
  });

  it('renders the target and deadline', () => {
    render(<GoalCard />);
    expect(screen.getByText(/30 kg CO2e/i)).toBeInTheDocument();
  });

  it('renders a Done button', () => {
    render(<GoalCard />);
    expect(screen.getByRole('button', { name: /Mark.*complete/i })).toBeInTheDocument();
  });

  it('toggles to Undo when Done is clicked', async () => {
    render(<GoalCard />);
    await userEvent.click(screen.getByRole('button', { name: /Mark.*complete/i }));
    expect(screen.getByRole('button', { name: /Mark.*incomplete/i })).toBeInTheDocument();
  });

  it('toggles back to Done after Undo is clicked', async () => {
    render(<GoalCard />);
    await userEvent.click(screen.getByRole('button', { name: /Mark.*complete/i }));
    await userEvent.click(screen.getByRole('button', { name: /Mark.*incomplete/i }));
    expect(screen.getByRole('button', { name: /Mark.*complete/i })).toBeInTheDocument();
  });
});
