export function formatScore(value: number) {
  return `${value.toFixed(1)} kg CO2e`;
}

export function formatPercent(value: number) {
  return `${value.toFixed(0)}%`;
}

export function formatSavings(value: number) {
  return `${value.toFixed(1)} kg CO2e saved`;
}
