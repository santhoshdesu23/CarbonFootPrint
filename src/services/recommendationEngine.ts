import { createId } from '../utils/helpers';
import type { CarbonProfile, Recommendation } from '../types/carbon';

const RECOMMENDATION_LIBRARY: Array<Omit<Recommendation, 'id' | 'savingsKgCo2e'>> = [
  {
    title: 'Shift two weekly car trips to transit',
    description: 'Replacing just a pair of short commutes with transit or shared rides creates immediate transport savings.',
    impactLabel: 'High transport impact',
    category: 'transport',
  },
  {
    title: 'Swap one meat-heavy meal for a plant-based meal',
    description: 'A single weekly plant-based dinner reduces food emissions while keeping the change easy to sustain.',
    impactLabel: 'Fast food win',
    category: 'food',
  },
  {
    title: 'Reduce standby energy draw at home',
    description: 'Switching off idle chargers and standby devices keeps your energy load lower without any lifestyle friction.',
    impactLabel: 'Low-effort savings',
    category: 'energy',
  },
  {
    title: 'Pause one discretionary purchase each week',
    description: 'A short cooling-off period for shopping decisions lowers the embedded footprint of new items.',
    impactLabel: 'Shopping discipline',
    category: 'shopping',
  },
  {
    title: 'Add a walking block to your routine',
    description: 'A regular walk replaces short car trips and supports an active, lower-carbon weekly rhythm.',
    impactLabel: 'Lifestyle improvement',
    category: 'lifestyle',
  },
];

export function getRecommendations(profile: CarbonProfile): Recommendation[] {
  const rankedCategories = [...profile.categoryEmissions]
    .sort((a, b) => b.kgCo2e - a.kgCo2e)
    .map((entry) => entry.category);

  return RECOMMENDATION_LIBRARY.map((item, index) => ({
    id: createId(`rec-${index}`),
    ...item,
    savingsKgCo2e: Math.max(1, Math.round(profile.totalKgCo2e * (0.05 + index * 0.01))),
    category: rankedCategories[index] ?? item.category,
  })).sort((a, b) => b.savingsKgCo2e - a.savingsKgCo2e);
}

export function generateCoachMessage(profile: CarbonProfile) {
  const topCategory = [...profile.categoryEmissions].sort((a, b) => b.kgCo2e - a.kgCo2e)[0];

  if (!topCategory) {
    return 'Start by adding your daily habits so I can generate personalized sustainability guidance.';
  }

  return `Your biggest footprint is in ${topCategory.category}. Focus there first for the fastest carbon savings.`;
}
