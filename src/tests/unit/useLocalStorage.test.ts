import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { useLocalStorage } from '../../hooks/useLocalStorage';

beforeEach(() => {
  localStorage.clear();
});

describe('useLocalStorage', () => {
  it('returns the initial value when nothing is stored', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 42));
    expect(result.current[0]).toBe(42);
  });

  it('returns stored value if key already exists', () => {
    localStorage.setItem('test-key', JSON.stringify(99));
    const { result } = renderHook(() => useLocalStorage('test-key', 0));
    expect(result.current[0]).toBe(99);
  });

  it('falls back to initialValue on invalid JSON', () => {
    localStorage.setItem('bad-key', '{invalid}');
    const { result } = renderHook(() => useLocalStorage('bad-key', 'fallback'));
    expect(result.current[0]).toBe('fallback');
  });

  it('updates value when setter is called', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 0));
    act(() => { result.current[1](100); });
    expect(result.current[0]).toBe(100);
  });

  it('persists updated value to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('persist-key', 'initial'));
    act(() => { result.current[1]('updated'); });
    expect(JSON.parse(localStorage.getItem('persist-key') ?? 'null')).toBe('updated');
  });

  it('works with object values', () => {
    const { result } = renderHook(() => useLocalStorage<{ name: string }>('obj-key', { name: 'default' }));
    act(() => { result.current[1]({ name: 'Alice' }); });
    expect(result.current[0].name).toBe('Alice');
  });

  it('works with array values', () => {
    const { result } = renderHook(() => useLocalStorage<number[]>('arr-key', []));
    act(() => { result.current[1]([1, 2, 3]); });
    expect(result.current[0]).toEqual([1, 2, 3]);
  });
});
