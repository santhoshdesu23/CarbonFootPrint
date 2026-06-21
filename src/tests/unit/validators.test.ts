import { describe, expect, it } from 'vitest';
import { isNonNegativeNumber, isValidValue } from '../../utils/validators';

describe('isValidValue', () => {
  it('returns true for a number', () => {
    expect(isValidValue(0)).toBe(true);
  });

  it('returns true for a string', () => {
    expect(isValidValue('hello')).toBe(true);
  });

  it('returns true for an object', () => {
    expect(isValidValue({})).toBe(true);
  });

  it('returns false for null', () => {
    expect(isValidValue(null)).toBe(false);
  });

  it('returns false for undefined', () => {
    expect(isValidValue(undefined)).toBe(false);
  });
});

describe('isNonNegativeNumber', () => {
  it('returns true for zero', () => {
    expect(isNonNegativeNumber(0)).toBe(true);
  });

  it('returns true for a positive number', () => {
    expect(isNonNegativeNumber(42)).toBe(true);
  });

  it('returns true for a positive decimal', () => {
    expect(isNonNegativeNumber(3.14)).toBe(true);
  });

  it('returns false for a negative number', () => {
    expect(isNonNegativeNumber(-1)).toBe(false);
  });

  it('returns false for NaN', () => {
    expect(isNonNegativeNumber(NaN)).toBe(false);
  });

  it('returns false for Infinity', () => {
    expect(isNonNegativeNumber(Infinity)).toBe(false);
  });

  it('returns false for a string', () => {
    expect(isNonNegativeNumber('5')).toBe(false);
  });
});
