export function add(a: number, b: number) {
  return a + b;
}

export function percentageChange(previousValue: number, nextValue: number) {
  if (previousValue === 0) {
    return 0;
  }

  return ((nextValue - previousValue) / previousValue) * 100;
}

export function average(values: number[]) {
  if (values.length === 0) {
    return 0;
  }

  return values.reduce((sum, value) => sum + value, 0) / values.length;
}
