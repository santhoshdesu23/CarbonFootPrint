import { describe, expect, it } from 'vitest';
import { formatPercent, formatSavings, formatScore } from '../../utils/formatters';

describe('formatScore', () => {
  it('formats a score with one decimal and unit', () => {
    expect(formatScore(150.0)).toBe('150.0 kg CO2e');
  });

  it('formats zero', () => {
    expect(formatScore(0)).toBe('0.0 kg CO2e');
  });

  it('rounds to one decimal', () => {
    expect(formatScore(99.95)).toBe('100.0 kg CO2e');
  });
});

describe('formatPercent', () => {
  it('formats a percentage without decimal', () => {
    expect(formatPercent(75)).toBe('75%');
  });

  it('rounds to nearest integer', () => {
    expect(formatPercent(33.6)).toBe('34%');
  });

  it('formats zero', () => {
    expect(formatPercent(0)).toBe('0%');
  });
});

describe('formatSavings', () => {
  it('formats savings with unit', () => {
    expect(formatSavings(12.5)).toBe('12.5 kg CO2e saved');
  });

  it('formats zero savings', () => {
    expect(formatSavings(0)).toBe('0.0 kg CO2e saved');
  });
});
