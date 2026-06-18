import { buildScenarioProjection, getCarbonScenarioPreset } from './carbonEngine';
import type { CarbonProfile } from '../types/carbon';

export type ImpactSummary = {
  monthlySavingsKgCo2e: number;
  annualSavingsKgCo2e: number;
  treeEquivalent: number;
  carMilesAvoided: number;
  communityHouseholds: number;
  communityAnnualKgCo2e: number;
  communityAnnualTonsCo2e: number;
  estimatedMoneySavedUsd: number;
  headline: string;
};

const KG_CO2E_PER_TREE_PER_YEAR = 22;
const KG_CO2E_PER_CAR_MILE = 0.404;

export function buildImpactSummary(profile: CarbonProfile): ImpactSummary {
  const commuter = getCarbonScenarioPreset('commuter');
  const foodFirst = getCarbonScenarioPreset('food-first');
  const homeEnergy = getCarbonScenarioPreset('home-energy');

  const bestPossibleProjection = buildScenarioProjection(profile, {
    transportReductionPercent: Math.max(commuter.transportReductionPercent, foodFirst.transportReductionPercent, homeEnergy.transportReductionPercent),
    foodReductionPercent: Math.max(commuter.foodReductionPercent, foodFirst.foodReductionPercent, homeEnergy.foodReductionPercent),
    energyReductionPercent: Math.max(commuter.energyReductionPercent, foodFirst.energyReductionPercent, homeEnergy.energyReductionPercent),
    shoppingReductionPercent: Math.max(commuter.shoppingReductionPercent, foodFirst.shoppingReductionPercent, homeEnergy.shoppingReductionPercent),
    lifestyleReductionPercent: Math.max(commuter.lifestyleReductionPercent, foodFirst.lifestyleReductionPercent, homeEnergy.lifestyleReductionPercent),
  });

  const monthlySavingsKgCo2e = bestPossibleProjection.totalSavingsKgCo2e;
  const annualSavingsKgCo2e = monthlySavingsKgCo2e * 12;
  const treeEquivalent = Math.max(1, Math.round(annualSavingsKgCo2e / KG_CO2E_PER_TREE_PER_YEAR));
  const carMilesAvoided = Math.max(1, Math.round(annualSavingsKgCo2e / KG_CO2E_PER_CAR_MILE));
  const estimatedMoneySavedUsd = Math.max(0, Math.round((profile.categoryEmissions.find((entry) => entry.category === 'transport')?.kgCo2e ?? 0) * 0.15 + (profile.categoryEmissions.find((entry) => entry.category === 'energy')?.kgCo2e ?? 0) * 0.18));
  const communityHouseholds = 250;
  const communityAnnualKgCo2e = annualSavingsKgCo2e * communityHouseholds;
  const communityAnnualTonsCo2e = communityAnnualKgCo2e / 1000;

  const headline = annualSavingsKgCo2e >= 1000
    ? 'At scale, this profile can unlock measurable climate action across an entire community.'
    : 'This profile has enough reduction potential to drive visible household and neighborhood climate wins.';

  return {
    monthlySavingsKgCo2e,
    annualSavingsKgCo2e,
    treeEquivalent,
    carMilesAvoided,
    communityHouseholds,
    communityAnnualKgCo2e,
    communityAnnualTonsCo2e,
    estimatedMoneySavedUsd,
    headline,
  };
}