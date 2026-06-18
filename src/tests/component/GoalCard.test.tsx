import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import GoalCard from '../../components/goals/GoalCard';

describe('GoalCard', () => {
  it('renders goal heading', () => {
    render(<GoalCard />);
    expect(screen.getByText(/Weekly Goals/i)).toBeInTheDocument();
  });
});
