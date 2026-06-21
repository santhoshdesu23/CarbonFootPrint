import { describe, expect, it } from 'vitest';
import { buildCarbonProfile } from '../../services/carbonEngine';
import { buildImpactSummary } from '../../services/impactEngine';
import type { CarbonInput } from '../../types/carbon';

const input: CarbonInput = {
  transportKm: 40,
  transportDaysPerWeek: 5,
  meatMealsPerWeek: 5,
  dairyMealsPerWeek: 8,
  homeEnergyKwhPerMonth: 280,
  shoppingSpendPerWeek: 120,
  lifestyleHoursPerWeek: 10,
};

describe('buildImpactSummary', () => {
  const profile = buildCarbonProfile(input);
  const summary = buildImpactSummary(profile);

  it('monthlySavingsKgCo2e is non-negative', () => {
    expect(summary.monthlySavingsKgCo2e).toBeGreaterThanOrEqual(0);
  });

  it('annualSavingsKgCo2e is 12x monthly', () => {
    expect(summary.annualSavingsKgCo2e).toBeCloseTo(summary.monthlySavingsKgCo2e * 12, 1);
  });

  it('treeEquivalent is at least 1', () => {
    expect(summary.treeEquivalent).toBeGreaterThanOrEqual(1);
  });

  it('carMilesAvoided is at least 1', () => {
    expect(summary.carMilesAvoided).toBeGreaterThanOrEqual(1);
  });

  it('estimatedMoneySavedUsd is non-negative', () => {
    expect(summary.estimatedMoneySavedUsd).toBeGreaterThanOrEqual(0);
  });

  it('communityHouseholds is 250', () => {
    expect(summary.communityHouseholds).toBe(250);
  });

  it('communityAnnualKgCo2e is annualSavings * 250', () => {
    expect(summary.communityAnnualKgCo2e).toBeCloseTo(summary.annualSavingsKgCo2e * 250, 1);
  });

  it('communityAnnualTonsCo2e is communityAnnualKgCo2e / 1000', () => {
    expect(summary.communityAnnualTonsCo2e).toBeCloseTo(summary.communityAnnualKgCo2e / 1000, 3);
  });

  it('headline is a non-empty string', () => {
    expect(summary.headline.length).toBeGreaterThan(0);
  });

  it('zero-input profile returns valid summary', () => {
    const zeroProfile = buildCarbonProfile({
      transportKm: 0, transportDaysPerWeek: 0, meatMealsPerWeek: 0,
      dairyMealsPerWeek: 0, homeEnergyKwhPerMonth: 0, shoppingSpendPerWeek: 0, lifestyleHoursPerWeek: 0,
    });
    const zeroSummary = buildImpactSummary(zeroProfile);
    expect(zeroSummary.monthlySavingsKgCo2e).toBeGreaterThanOrEqual(0);
    expect(zeroSummary.estimatedMoneySavedUsd).toBe(0);
  });
});
