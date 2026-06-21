// 1 kg CO2e = 2.20462 lbs CO2e
const KG_TO_LBS = 2.20462;

export type UnitPreference = 'metric' | 'imperial';

function convertWeight(kg: number, unit: UnitPreference): number {
  return unit === 'imperial' ? kg * KG_TO_LBS : kg;
}

function weightLabel(unit: UnitPreference): string {
  return unit === 'imperial' ? 'lbs CO2e' : 'kg CO2e';
}

export function formatScore(value: number, unit: UnitPreference = 'metric') {
  return `${convertWeight(value, unit).toFixed(1)} ${weightLabel(unit)}`;
}

export function formatPercent(value: number) {
  return `${value.toFixed(0)}%`;
}

export function formatSavings(value: number, unit: UnitPreference = 'metric') {
  return `${convertWeight(value, unit).toFixed(1)} ${weightLabel(unit)} saved`;
}

export function formatWeight(value: number, unit: UnitPreference = 'metric') {
  return `${convertWeight(value, unit).toFixed(1)} ${weightLabel(unit)}`;
}
