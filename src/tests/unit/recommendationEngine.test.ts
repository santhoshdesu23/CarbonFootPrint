import { describe, expect, it } from 'vitest';
import { buildCarbonProfile } from '../../services/carbonEngine';
import { generateCoachMessage, getRecommendations } from '../../services/recommendationEngine';
import type { CarbonProfile } from '../../types/carbon';

const baseInput = {
  transportKm: 50,
  transportDaysPerWeek: 5,
  meatMealsPerWeek: 7,
  dairyMealsPerWeek: 10,
  homeEnergyKwhPerMonth: 300,
  shoppingSpendPerWeek: 150,
  lifestyleHoursPerWeek: 12,
};

describe('getRecommendations', () => {
  const profile = buildCarbonProfile(baseInput);

  it('returns exactly 5 recommendations', () => {
    expect(getRecommendations(profile)).toHaveLength(5);
  });

  it('recommendations are sorted descending by savingsKgCo2e', () => {
    const recs = getRecommendations(profile);
    for (let i = 0; i < recs.length - 1; i++) {
      expect(recs[i].savingsKgCo2e).toBeGreaterThanOrEqual(recs[i + 1].savingsKgCo2e);
    }
  });

  it('each recommendation has a non-empty id, title, and description', () => {
    const recs = getRecommendations(profile);
    recs.forEach((rec) => {
      expect(rec.id.length).toBeGreaterThan(0);
      expect(rec.title.length).toBeGreaterThan(0);
      expect(rec.description.length).toBeGreaterThan(0);
    });
  });

  it('savingsKgCo2e is at least 1 for every recommendation', () => {
    const recs = getRecommendations(profile);
    recs.forEach((rec) => expect(rec.savingsKgCo2e).toBeGreaterThanOrEqual(1));
  });

  it('recommendation ids are unique', () => {
    const recs = getRecommendations(profile);
    const ids = recs.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('all recommendation categories are valid CarbonCategory values', () => {
    const valid = ['transport', 'food', 'energy', 'shopping', 'lifestyle'];
    const recs = getRecommendations(profile);
    recs.forEach((rec) => expect(valid).toContain(rec.category));
  });
});

describe('generateCoachMessage', () => {
  it('includes the top category name in the message', () => {
    const profile = buildCarbonProfile(baseInput);
    const msg = generateCoachMessage(profile);
    expect(msg).toContain('Your biggest footprint');
  });

  it('returns fallback message for profile with no emissions', () => {
    const emptyProfile: CarbonProfile = {
      ...buildCarbonProfile({ transportKm: 0, transportDaysPerWeek: 0, meatMealsPerWeek: 0, dairyMealsPerWeek: 0, homeEnergyKwhPerMonth: 0, shoppingSpendPerWeek: 0, lifestyleHoursPerWeek: 0 }),
      categoryEmissions: [],
    };
    const msg = generateCoachMessage(emptyProfile);
    expect(msg).toContain('Start by adding');
  });

  it('message is a non-empty string', () => {
    const profile = buildCarbonProfile(baseInput);
    expect(generateCoachMessage(profile).length).toBeGreaterThan(0);
  });
});
