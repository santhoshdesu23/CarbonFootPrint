import { beforeEach, describe, expect, it } from 'vitest';
import { readStorage, removeStorage, writeStorage } from '../../services/storageService';

beforeEach(() => {
  localStorage.clear();
});

describe('writeStorage', () => {
  it('returns true on success', () => {
    expect(writeStorage('test-key', { value: 42 })).toBe(true);
  });

  it('persists the value so readStorage can retrieve it', () => {
    writeStorage('test-key', { name: 'Alex' });
    expect(readStorage('test-key', null)).toEqual({ name: 'Alex' });
  });

  it('overwrites an existing value', () => {
    writeStorage('test-key', 'first');
    writeStorage('test-key', 'second');
    expect(readStorage('test-key', '')).toBe('second');
  });
});

describe('readStorage', () => {
  it('returns the fallback when key does not exist', () => {
    expect(readStorage('missing', 'default')).toBe('default');
  });

  it('returns the fallback on invalid JSON', () => {
    localStorage.setItem('bad-json', '{invalid}');
    expect(readStorage('bad-json', 99)).toBe(99);
  });

  it('reads an array correctly', () => {
    writeStorage('arr', [1, 2, 3]);
    expect(readStorage('arr', [])).toEqual([1, 2, 3]);
  });

  it('reads a number correctly', () => {
    writeStorage('num', 3.14);
    expect(readStorage('num', 0)).toBe(3.14);
  });
});

describe('removeStorage', () => {
  it('removes a stored key', () => {
    writeStorage('to-remove', 'value');
    removeStorage('to-remove');
    expect(readStorage('to-remove', 'fallback')).toBe('fallback');
  });

  it('does not throw when key does not exist', () => {
    expect(() => removeStorage('nonexistent')).not.toThrow();
  });
});
