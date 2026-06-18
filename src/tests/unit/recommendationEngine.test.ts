import { describe, expect, it } from 'vitest';
import { buildCarbonProfile } from '../../services/carbonEngine';
import { getRecommendations, generateCoachMessage } from '../../services/recommendationEngine';

describe('recommendationEngine', () => {
  const profile = buildCarbonProfile({
    transportKm: 50,
    transportDaysPerWeek: 5,
    meatMealsPerWeek: 7,
    dairyMealsPerWeek: 10,
    homeEnergyKwhPerMonth: 300,
    shoppingSpendPerWeek: 150,
    lifestyleHoursPerWeek: 12,
  });

  it('returns ranked recommendations', () => {
    const recommendations = getRecommendations(profile);
    expect(recommendations).toHaveLength(5);
    expect(recommendations[0].savingsKgCo2e).toBeGreaterThanOrEqual(recommendations[1].savingsKgCo2e);
  });

  it('generates a coach message', () => {
    expect(generateCoachMessage(profile)).toContain('Your biggest footprint');
  });
});
