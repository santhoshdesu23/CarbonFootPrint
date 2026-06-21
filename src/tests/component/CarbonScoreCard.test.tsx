import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import CarbonScoreCard from '../../components/dashboard/CarbonScoreCard';
import { useCarbonStore } from '../../store/carbonStore';
import type { CarbonInput } from '../../types/carbon';

const defaultInput: CarbonInput = {
  transportKm: 42,
  transportDaysPerWeek: 5,
  meatMealsPerWeek: 6,
  dairyMealsPerWeek: 10,
  homeEnergyKwhPerMonth: 320,
  shoppingSpendPerWeek: 140,
  lifestyleHoursPerWeek: 12,
};

beforeEach(() => {
  useCarbonStore.getState().updateInput(defaultInput);
});

describe('CarbonScoreCard', () => {
  it('renders the Carbon Score label', () => {
    render(<CarbonScoreCard />);
    expect(screen.getByText(/Carbon Score/i)).toBeInTheDocument();
  });

  it('renders the "out of 100" description', () => {
    render(<CarbonScoreCard />);
    expect(screen.getByText(/out of 100/i)).toBeInTheDocument();
  });

  it('renders the Total CO2e label', () => {
    render(<CarbonScoreCard />);
    expect(screen.getByText(/Total CO2e/i)).toBeInTheDocument();
  });

  it('displays a numeric score', () => {
    render(<CarbonScoreCard />);
    const score = useCarbonStore.getState().profile.carbonScore;
    expect(screen.getByText(score.toFixed(0))).toBeInTheDocument();
  });

  it('displays the formatted total emissions', () => {
    render(<CarbonScoreCard />);
    const total = useCarbonStore.getState().profile.totalKgCo2e;
    expect(screen.getByText(`${total.toFixed(1)} kg CO2e`)).toBeInTheDocument();
  });
});
