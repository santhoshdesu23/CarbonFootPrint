import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CarbonScoreCard from '../../components/dashboard/CarbonScoreCard';

describe('CarbonScoreCard', () => {
  it('renders a score card', () => {
    render(<CarbonScoreCard />);
    expect(screen.getByText(/Carbon Score/i)).toBeInTheDocument();
  });
});
