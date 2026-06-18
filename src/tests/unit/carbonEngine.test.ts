import { describe, expect, it } from 'vitest';
import { buildCarbonProfile, calculateCarbonScore, calculateCategoryEmissions } from '../../services/carbonEngine';

describe('carbonEngine', () => {
  const input = {
    transportKm: 40,
    transportDaysPerWeek: 5,
    meatMealsPerWeek: 5,
    dairyMealsPerWeek: 8,
    homeEnergyKwhPerMonth: 280,
    shoppingSpendPerWeek: 120,
    lifestyleHoursPerWeek: 10,
  };

  it('calculates category emissions', () => {
    const categories = calculateCategoryEmissions(input);
    expect(categories).toHaveLength(5);
    expect(categories[0].kgCo2e).toBeGreaterThan(0);
  });

  it('builds a profile with a bounded score', () => {
    const profile = buildCarbonProfile(input);
    expect(profile.carbonScore).toBeGreaterThanOrEqual(0);
    expect(profile.carbonScore).toBeLessThanOrEqual(100);
    expect(profile.totalKgCo2e).toBeGreaterThan(0);
  });

  it('derives a score from emissions', () => {
    expect(calculateCarbonScore(0)).toBe(100);
  });
});
