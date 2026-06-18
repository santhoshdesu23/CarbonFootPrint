import type { CarbonProfile } from '../types/carbon';

export function buildCategoryChartData(profile: CarbonProfile) {
  return profile.categoryEmissions.map((entry) => ({
    name: entry.category,
    value: entry.kgCo2e,
  }));
}

export function buildTrendChartData(profile: CarbonProfile) {
  return profile.weeklyTrend.map((entry) => ({
    label: entry.weekLabel,
    value: entry.kgCo2e,
  }));
}

export function buildBenchmarkComparison(profile: CarbonProfile) {
  return [
    { label: 'You', value: profile.totalKgCo2e },
    { label: 'Benchmark', value: profile.benchmarkKgCo2e },
  ];
}
