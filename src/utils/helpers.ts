export function formatValue(value: number) {
  return new Intl.NumberFormat('en-US').format(value);
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function roundToOneDecimal(value: number) {
  return Math.round(value * 10) / 10;
}

export function createId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}
