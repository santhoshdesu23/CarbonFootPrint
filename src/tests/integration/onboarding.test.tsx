import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

describe('Carbon profile onboarding', () => {
  it('store initialises with a valid profile', () => {
    const { profile } = useCarbonStore.getState();
    expect(profile.totalKgCo2e).toBeGreaterThan(0);
    expect(profile.carbonScore).toBeGreaterThanOrEqual(0);
    expect(profile.carbonScore).toBeLessThanOrEqual(100);
  });

  it('updateInput recalculates the profile', () => {
    const before = useCarbonStore.getState().profile.totalKgCo2e;
    act(() => {
      useCarbonStore.getState().updateInput({ transportKm: 0, transportDaysPerWeek: 0 });
    });
    const after = useCarbonStore.getState().profile.totalKgCo2e;
    expect(after).toBeLessThan(before);
  });

  it('updateInput does not corrupt non-updated fields', () => {
    act(() => {
      useCarbonStore.getState().updateInput({ transportKm: 10 });
    });
    const { profile } = useCarbonStore.getState();
    expect(profile.meatMealsPerWeek).toBe(defaultInput.meatMealsPerWeek);
    expect(profile.homeEnergyKwhPerMonth).toBe(defaultInput.homeEnergyKwhPerMonth);
  });

  it('resetProfile restores default values', () => {
    act(() => {
      useCarbonStore.getState().updateInput({ transportKm: 200 });
      useCarbonStore.getState().resetProfile();
    });
    const { profile } = useCarbonStore.getState();
    expect(profile.transportKm).toBe(42);
  });

  it('profile has recommendations after update', () => {
    const { recommendations } = useCarbonStore.getState();
    expect(recommendations.length).toBeGreaterThan(0);
  });

  it('CarbonScoreCard reflects updated score', () => {
    act(() => {
      useCarbonStore.getState().updateInput({ transportKm: 0, transportDaysPerWeek: 0, meatMealsPerWeek: 0, dairyMealsPerWeek: 0, homeEnergyKwhPerMonth: 0, shoppingSpendPerWeek: 0, lifestyleHoursPerWeek: 0 });
    });
    render(<CarbonScoreCard />);
    // Score should be 100 when all emissions are 0
    expect(screen.getByText('100')).toBeInTheDocument();
  });
});
