import { describe, expect, it } from 'vitest';
import { formatPercent, formatSavings, formatScore, formatWeight } from '../../utils/formatters';

describe('formatScore', () => {
  it('formats metric by default', () => {
    expect(formatScore(150.0)).toBe('150.0 kg CO2e');
  });

  it('formats in imperial when unit is imperial', () => {
    const result = formatScore(100, 'imperial');
    expect(result).toContain('lbs CO2e');
    expect(result).toContain('220.5'); // 100 * 2.20462
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
  it('formats savings in metric', () => {
    expect(formatSavings(12.5)).toBe('12.5 kg CO2e saved');
  });

  it('formats savings in imperial', () => {
    const result = formatSavings(10, 'imperial');
    expect(result).toContain('lbs CO2e saved');
  });

  it('formats zero savings', () => {
    expect(formatSavings(0)).toBe('0.0 kg CO2e saved');
  });
});

describe('formatWeight', () => {
  it('formats in metric', () => {
    expect(formatWeight(50)).toBe('50.0 kg CO2e');
  });

  it('formats in imperial', () => {
    const result = formatWeight(50, 'imperial');
    expect(result).toContain('lbs CO2e');
  });
});
