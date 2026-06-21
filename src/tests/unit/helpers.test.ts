import { describe, expect, it } from 'vitest';
import { clamp, createId, formatValue, roundToOneDecimal } from '../../utils/helpers';

describe('clamp', () => {
  it('returns value within range unchanged', () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it('clamps to min', () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  it('clamps to max', () => {
    expect(clamp(15, 0, 10)).toBe(10);
  });

  it('returns min when value equals min', () => {
    expect(clamp(0, 0, 10)).toBe(0);
  });

  it('returns max when value equals max', () => {
    expect(clamp(10, 0, 10)).toBe(10);
  });
});

describe('roundToOneDecimal', () => {
  it('rounds up correctly', () => {
    expect(roundToOneDecimal(1.25)).toBe(1.3);
  });

  it('rounds down correctly', () => {
    expect(roundToOneDecimal(1.24)).toBe(1.2);
  });

  it('leaves integer unchanged', () => {
    expect(roundToOneDecimal(5)).toBe(5);
  });

  it('handles zero', () => {
    expect(roundToOneDecimal(0)).toBe(0);
  });
});

describe('createId', () => {
  it('starts with the given prefix', () => {
    expect(createId('goal').startsWith('goal-')).toBe(true);
  });

  it('generates unique ids', () => {
    const ids = Array.from({ length: 20 }, () => createId('x'));
    expect(new Set(ids).size).toBe(20);
  });

  it('returns a non-empty string', () => {
    expect(createId('test').length).toBeGreaterThan(0);
  });
});

describe('formatValue', () => {
  it('formats a number with locale separators', () => {
    expect(formatValue(1000)).toBe('1,000');
  });

  it('formats zero', () => {
    expect(formatValue(0)).toBe('0');
  });

  it('formats a decimal number', () => {
    expect(formatValue(3.5)).toBe('3.5');
  });
});
