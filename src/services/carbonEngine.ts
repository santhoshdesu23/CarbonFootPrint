import { clamp, roundToOneDecimal } from '../utils/helpers';
import { average } from '../utils/calculations';
import type {
  CarbonCategory,
  CarbonInput,
  CarbonProfile,
  CarbonScenario,
  CategoryEmission,
  MonthlyEmissionEntry,
  ScenarioProjection,
  WeeklyEmissionEntry,
} from '../types/carbon';

const TRANSPORT_FACTOR = 0.21;
// Food emissions use per-meal factors: meat = 2.4 kg CO2e, dairy = 0.9 kg CO2e
const MEAT_MEAL_FACTOR = 2.4;
const DAIRY_MEAL_FACTOR = 0.9;
const ENERGY_FACTOR = 0.43;
const SHOPPING_FACTOR = 0.18;
const LIFESTYLE_FACTOR = 0.08;
const BENCHMARK_KG_CO2E = 1200;
// Weekly-to-monthly multiplier (4 weeks per month)
const WEEKS_PER_MONTH = 4;

export function calculateCategoryEmissions(input: CarbonInput): CategoryEmission[] {
  const emissions: Record<CarbonCategory, number> = {
    transport: input.transportKm * input.transportDaysPerWeek * TRANSPORT_FACTOR,
    food: (input.meatMealsPerWeek * MEAT_MEAL_FACTOR) + (input.dairyMealsPerWeek * DAIRY_MEAL_FACTOR),
    energy: input.homeEnergyKwhPerMonth * ENERGY_FACTOR,
    shopping: input.shoppingSpendPerWeek * SHOPPING_FACTOR,
    lifestyle: input.lifestyleHoursPerWeek * LIFESTYLE_FACTOR,
  };

  return Object.entries(emissions).map(([category, kgCo2e]) => ({
    category: category as CarbonCategory,
    kgCo2e: roundToOneDecimal(kgCo2e),
  }));
}

export function calculateTotalEmissions(input: CarbonInput) {
  return calculateCategoryEmissions(input).reduce((sum, entry) => sum + entry.kgCo2e, 0);
}

export function calculateCarbonScore(totalKgCo2e: number) {
  const rawScore = 100 - (totalKgCo2e / BENCHMARK_KG_CO2E) * 100;
  return clamp(roundToOneDecimal(rawScore), 0, 100);
}

export function buildTrend(totalKgCo2e: number): WeeklyEmissionEntry[] {
  return Array.from({ length: 7 }, (_, index) => {
    const offset = index - 3;
    return {
      weekLabel: `W${index + 1}`,
      kgCo2e: roundToOneDecimal(Math.max(0, totalKgCo2e + offset * 8)),
    };
  });
}

export function buildMonthlyTrend(totalKgCo2e: number): MonthlyEmissionEntry[] {
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  return labels.map((label, index) => ({
    monthLabel: label,
    kgCo2e: roundToOneDecimal(Math.max(0, totalKgCo2e - 60 + index * 20)),
  }));
}

export function buildCarbonProfile(input: CarbonInput): CarbonProfile {
  const categoryEmissions = calculateCategoryEmissions(input);
  const totalKgCo2e = roundToOneDecimal(categoryEmissions.reduce((sum, entry) => sum + entry.kgCo2e, 0));

  return {
    ...input,
    categoryEmissions,
    totalKgCo2e,
    carbonScore: calculateCarbonScore(totalKgCo2e),
    benchmarkKgCo2e: BENCHMARK_KG_CO2E,
    weeklyTrend: buildTrend(totalKgCo2e),
    monthlyTrend: buildMonthlyTrend(totalKgCo2e),
  };
}

export function getCarbonScenarioPreset(name: 'commuter' | 'food-first' | 'home-energy') {
  const presets: Record<'commuter' | 'food-first' | 'home-energy', CarbonScenario> = {
    commuter: {
      transportReductionPercent: 25,
      foodReductionPercent: 5,
      energyReductionPercent: 5,
      shoppingReductionPercent: 2,
      lifestyleReductionPercent: 2,
    },
    'food-first': {
      transportReductionPercent: 5,
      foodReductionPercent: 22,
      energyReductionPercent: 4,
      shoppingReductionPercent: 3,
      lifestyleReductionPercent: 2,
    },
    'home-energy': {
      transportReductionPercent: 5,
      foodReductionPercent: 4,
      energyReductionPercent: 18,
      shoppingReductionPercent: 3,
      lifestyleReductionPercent: 2,
    },
  };

  return presets[name];
}

export function buildScenarioProjection(profile: CarbonProfile, scenario: CarbonScenario): ScenarioProjection {
  // Build a lookup map once instead of 5 sequential Array.find calls.
  const emissionMap = Object.fromEntries(
    profile.categoryEmissions.map((e) => [e.category, e.kgCo2e]),
  ) as Record<CarbonCategory, number>;

  const clampPct = (pct: number) => clamp(pct, 0, 100) / 100;

  const projectedCategoryEmissions: CategoryEmission[] = [
    { category: 'transport', kgCo2e: roundToOneDecimal((emissionMap['transport'] ?? 0) * (1 - clampPct(scenario.transportReductionPercent))) },
    { category: 'food',      kgCo2e: roundToOneDecimal((emissionMap['food'] ?? 0)      * (1 - clampPct(scenario.foodReductionPercent))) },
    { category: 'energy',    kgCo2e: roundToOneDecimal((emissionMap['energy'] ?? 0)    * (1 - clampPct(scenario.energyReductionPercent))) },
    { category: 'shopping',  kgCo2e: roundToOneDecimal((emissionMap['shopping'] ?? 0)  * (1 - clampPct(scenario.shoppingReductionPercent))) },
    { category: 'lifestyle', kgCo2e: roundToOneDecimal((emissionMap['lifestyle'] ?? 0) * (1 - clampPct(scenario.lifestyleReductionPercent))) },
  ];

  const projectedTotalKgCo2e = roundToOneDecimal(projectedCategoryEmissions.reduce((sum, entry) => sum + entry.kgCo2e, 0));
  const projectedCarbonScore = calculateCarbonScore(projectedTotalKgCo2e);
  const totalSavingsKgCo2e = roundToOneDecimal(profile.totalKgCo2e - projectedTotalKgCo2e);
  const strongestLever = [...projectedCategoryEmissions]
    .sort((a, b) => (emissionMap[b.category] ?? 0) - (emissionMap[a.category] ?? 0))[0]?.category ?? 'transport';

  const narrativeMap: Record<CarbonCategory, string> = {
    transport: 'Transport is the biggest swing factor in this scenario and creates the fastest score lift.',
    food: 'Food changes produce the largest structural reduction in your footprint mix.',
    energy: 'Energy efficiency has the strongest compounding effect on your monthly profile.',
    shopping: 'Shopping restraint lowers embodied emissions and improves long-term consistency.',
    lifestyle: 'Lifestyle habit shifts create steady, low-friction savings over time.',
  };

  return {
    projectedTotalKgCo2e,
    projectedCarbonScore,
    totalSavingsKgCo2e,
    projectedCategoryEmissions,
    strongestLever,
    narrative: narrativeMap[strongestLever],
  };
}

export function estimateMonthlySavings(currentProfile: CarbonProfile, targetReductionPercent: number) {
  const percent = clamp(targetReductionPercent, 0, 100) / 100;
  return roundToOneDecimal(currentProfile.totalKgCo2e * WEEKS_PER_MONTH * percent);
}

export function getAverageTrend(trend: WeeklyEmissionEntry[]) {
  return roundToOneDecimal(average(trend.map((entry) => entry.kgCo2e)));
}
