import { describe, expect, it } from 'vitest';
import {
  buildCarbonProfile,
  buildScenarioProjection,
  calculateCarbonScore,
  calculateCategoryEmissions,
  calculateTotalEmissions,
  estimateMonthlySavings,
  getAverageTrend,
  getCarbonScenarioPreset,
} from '../../services/carbonEngine';
import type { CarbonInput } from '../../types/carbon';

const baseInput: CarbonInput = {
  transportKm: 40,
  transportDaysPerWeek: 5,
  meatMealsPerWeek: 5,
  dairyMealsPerWeek: 8,
  homeEnergyKwhPerMonth: 280,
  shoppingSpendPerWeek: 120,
  lifestyleHoursPerWeek: 10,
};

describe('calculateCategoryEmissions', () => {
  it('returns exactly 5 categories', () => {
    const result = calculateCategoryEmissions(baseInput);
    expect(result).toHaveLength(5);
  });

  it('includes all expected categories', () => {
    const result = calculateCategoryEmissions(baseInput);
    const names = result.map((e) => e.category);
    expect(names).toContain('transport');
    expect(names).toContain('food');
    expect(names).toContain('energy');
    expect(names).toContain('shopping');
    expect(names).toContain('lifestyle');
  });

  it('all emissions are non-negative', () => {
    const result = calculateCategoryEmissions(baseInput);
    result.forEach((entry) => expect(entry.kgCo2e).toBeGreaterThanOrEqual(0));
  });

  it('returns 0 for all-zero input', () => {
    const zeroInput: CarbonInput = {
      transportKm: 0, transportDaysPerWeek: 0, meatMealsPerWeek: 0,
      dairyMealsPerWeek: 0, homeEnergyKwhPerMonth: 0, shoppingSpendPerWeek: 0, lifestyleHoursPerWeek: 0,
    };
    const result = calculateCategoryEmissions(zeroInput);
    result.forEach((entry) => expect(entry.kgCo2e).toBe(0));
  });

  it('values are rounded to one decimal place', () => {
    const result = calculateCategoryEmissions(baseInput);
    result.forEach((entry) => {
      expect(entry.kgCo2e).toBe(Math.round(entry.kgCo2e * 10) / 10);
    });
  });
});

describe('calculateTotalEmissions', () => {
  it('returns a positive total for typical input', () => {
    expect(calculateTotalEmissions(baseInput)).toBeGreaterThan(0);
  });

  it('returns 0 for all-zero input', () => {
    const zeroInput: CarbonInput = {
      transportKm: 0, transportDaysPerWeek: 0, meatMealsPerWeek: 0,
      dairyMealsPerWeek: 0, homeEnergyKwhPerMonth: 0, shoppingSpendPerWeek: 0, lifestyleHoursPerWeek: 0,
    };
    expect(calculateTotalEmissions(zeroInput)).toBe(0);
  });
});

describe('calculateCarbonScore', () => {
  it('returns 100 for zero emissions', () => {
    expect(calculateCarbonScore(0)).toBe(100);
  });

  it('returns 0 for emissions at or above benchmark', () => {
    expect(calculateCarbonScore(1200)).toBe(0);
    expect(calculateCarbonScore(9999)).toBe(0);
  });

  it('clamps to [0, 100]', () => {
    expect(calculateCarbonScore(-50)).toBe(100);
    expect(calculateCarbonScore(5000)).toBe(0);
  });

  it('returns a score between 0 and 100 for typical emissions', () => {
    const score = calculateCarbonScore(600);
    expect(score).toBeGreaterThan(0);
    expect(score).toBeLessThan(100);
  });
});

describe('buildCarbonProfile', () => {
  it('score is within [0, 100]', () => {
    const profile = buildCarbonProfile(baseInput);
    expect(profile.carbonScore).toBeGreaterThanOrEqual(0);
    expect(profile.carbonScore).toBeLessThanOrEqual(100);
  });

  it('includes 7 weekly trend entries', () => {
    const profile = buildCarbonProfile(baseInput);
    expect(profile.weeklyTrend).toHaveLength(7);
  });

  it('includes 6 monthly trend entries', () => {
    const profile = buildCarbonProfile(baseInput);
    expect(profile.monthlyTrend).toHaveLength(6);
  });

  it('sets benchmarkKgCo2e to 1200', () => {
    const profile = buildCarbonProfile(baseInput);
    expect(profile.benchmarkKgCo2e).toBe(1200);
  });

  it('totalKgCo2e matches sum of categories', () => {
    const profile = buildCarbonProfile(baseInput);
    const categorySum = profile.categoryEmissions.reduce((sum, e) => sum + e.kgCo2e, 0);
    expect(profile.totalKgCo2e).toBeCloseTo(categorySum, 1);
  });

  it('preserves all input fields on the profile', () => {
    const profile = buildCarbonProfile(baseInput);
    expect(profile.transportKm).toBe(baseInput.transportKm);
    expect(profile.meatMealsPerWeek).toBe(baseInput.meatMealsPerWeek);
  });
});

describe('getCarbonScenarioPreset', () => {
  it('returns commuter preset with valid percentages', () => {
    const preset = getCarbonScenarioPreset('commuter');
    expect(preset.transportReductionPercent).toBeGreaterThan(0);
    expect(preset.transportReductionPercent).toBeLessThanOrEqual(100);
  });

  it('returns food-first preset', () => {
    const preset = getCarbonScenarioPreset('food-first');
    expect(preset.foodReductionPercent).toBeGreaterThan(0);
  });

  it('returns home-energy preset', () => {
    const preset = getCarbonScenarioPreset('home-energy');
    expect(preset.energyReductionPercent).toBeGreaterThan(0);
  });
});

describe('buildScenarioProjection', () => {
  const profile = buildCarbonProfile(baseInput);
  const scenario = getCarbonScenarioPreset('commuter');

  it('projected total is lower than original', () => {
    const projection = buildScenarioProjection(profile, scenario);
    expect(projection.projectedTotalKgCo2e).toBeLessThanOrEqual(profile.totalKgCo2e);
  });

  it('totalSavingsKgCo2e is non-negative', () => {
    const projection = buildScenarioProjection(profile, scenario);
    expect(projection.totalSavingsKgCo2e).toBeGreaterThanOrEqual(0);
  });

  it('returns a strongestLever that is a valid category', () => {
    const projection = buildScenarioProjection(profile, scenario);
    expect(['transport', 'food', 'energy', 'shopping', 'lifestyle']).toContain(projection.strongestLever);
  });

  it('returns a non-empty narrative string', () => {
    const projection = buildScenarioProjection(profile, scenario);
    expect(projection.narrative.length).toBeGreaterThan(0);
  });

  it('projectedCarbonScore is within [0, 100]', () => {
    const projection = buildScenarioProjection(profile, scenario);
    expect(projection.projectedCarbonScore).toBeGreaterThanOrEqual(0);
    expect(projection.projectedCarbonScore).toBeLessThanOrEqual(100);
  });

  it('handles zero-reduction scenario gracefully', () => {
    const noChange = { transportReductionPercent: 0, foodReductionPercent: 0, energyReductionPercent: 0, shoppingReductionPercent: 0, lifestyleReductionPercent: 0 };
    const projection = buildScenarioProjection(profile, noChange);
    expect(projection.totalSavingsKgCo2e).toBe(0);
  });
});

describe('estimateMonthlySavings', () => {
  const profile = buildCarbonProfile(baseInput);

  it('returns a positive estimate', () => {
    expect(estimateMonthlySavings(profile, 20)).toBeGreaterThan(0);
  });

  it('returns 0 for 0% reduction', () => {
    expect(estimateMonthlySavings(profile, 0)).toBe(0);
  });

  it('clamps to 100% reduction maximum', () => {
    const max = estimateMonthlySavings(profile, 100);
    const over = estimateMonthlySavings(profile, 150);
    expect(over).toBe(max);
  });
});

describe('getAverageTrend', () => {
  it('returns average of weekly trend entries', () => {
    const profile = buildCarbonProfile(baseInput);
    const avg = getAverageTrend(profile.weeklyTrend);
    expect(avg).toBeGreaterThan(0);
  });

  it('returns 0 for empty trend', () => {
    expect(getAverageTrend([])).toBe(0);
  });
});
