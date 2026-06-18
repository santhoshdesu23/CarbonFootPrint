export function isValidValue(value: unknown) {
  return value !== null && value !== undefined;
}

export function isNonNegativeNumber(value: unknown) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0;
}
