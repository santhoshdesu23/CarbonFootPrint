import { describe, expect, it } from 'vitest';
import { buildCarbonProfile } from '../../services/carbonEngine';
import {
  buildBenchmarkComparison,
  buildCategoryChartData,
  buildTrendChartData,
} from '../../services/analyticsService';
import type { CarbonInput } from '../../types/carbon';

const input: CarbonInput = {
  transportKm: 30,
  transportDaysPerWeek: 5,
  meatMealsPerWeek: 4,
  dairyMealsPerWeek: 6,
  homeEnergyKwhPerMonth: 200,
  shoppingSpendPerWeek: 100,
  lifestyleHoursPerWeek: 8,
};

describe('buildCategoryChartData', () => {
  const profile = buildCarbonProfile(input);

  it('returns 5 chart entries', () => {
    expect(buildCategoryChartData(profile)).toHaveLength(5);
  });

  it('each entry has a name and value', () => {
    buildCategoryChartData(profile).forEach((entry) => {
      expect(entry.name.length).toBeGreaterThan(0);
      expect(entry.value).toBeGreaterThanOrEqual(0);
    });
  });

  it('names match category keys', () => {
    const names = buildCategoryChartData(profile).map((e) => e.name);
    ['transport', 'food', 'energy', 'shopping', 'lifestyle'].forEach((cat) => {
      expect(names).toContain(cat);
    });
  });
});

describe('buildTrendChartData', () => {
  const profile = buildCarbonProfile(input);

  it('returns 7 weekly entries', () => {
    expect(buildTrendChartData(profile)).toHaveLength(7);
  });

  it('each entry has a label and value', () => {
    buildTrendChartData(profile).forEach((entry) => {
      expect(entry.label.length).toBeGreaterThan(0);
      expect(entry.value).toBeGreaterThanOrEqual(0);
    });
  });
});

describe('buildBenchmarkComparison', () => {
  const profile = buildCarbonProfile(input);

  it('returns exactly 2 entries', () => {
    expect(buildBenchmarkComparison(profile)).toHaveLength(2);
  });

  it('first entry is "You" with the profile total', () => {
    const [you] = buildBenchmarkComparison(profile);
    expect(you.label).toBe('You');
    expect(you.value).toBe(profile.totalKgCo2e);
  });

  it('second entry is "Benchmark"', () => {
    const [, benchmark] = buildBenchmarkComparison(profile);
    expect(benchmark.label).toBe('Benchmark');
    expect(benchmark.value).toBeGreaterThan(0);
  });
});
