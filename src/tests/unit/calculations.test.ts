import { describe, expect, it } from 'vitest';
import { add, average, percentageChange } from '../../utils/calculations';

describe('add', () => {
  it('adds two positive numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  it('adds negative numbers', () => {
    expect(add(-1, -2)).toBe(-3);
  });

  it('adds zero', () => {
    expect(add(5, 0)).toBe(5);
  });
});

describe('average', () => {
  it('returns the mean of a list', () => {
    expect(average([10, 20, 30])).toBe(20);
  });

  it('returns 0 for an empty list', () => {
    expect(average([])).toBe(0);
  });

  it('handles a single value', () => {
    expect(average([42])).toBe(42);
  });

  it('handles decimal values', () => {
    expect(average([1, 2])).toBeCloseTo(1.5);
  });
});

describe('percentageChange', () => {
  it('calculates increase correctly', () => {
    expect(percentageChange(100, 150)).toBe(50);
  });

  it('calculates decrease correctly', () => {
    expect(percentageChange(200, 100)).toBe(-50);
  });

  it('returns 0 when previous is 0', () => {
    expect(percentageChange(0, 100)).toBe(0);
  });

  it('returns 0 for no change', () => {
    expect(percentageChange(100, 100)).toBe(0);
  });
});
