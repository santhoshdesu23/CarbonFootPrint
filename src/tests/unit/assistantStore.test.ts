import { act } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { useAssistantStore } from '../../store/assistantStore';
import type { CarbonInput } from '../../types/carbon';

const baseInput: CarbonInput = {
  transportKm: 40,
  transportDaysPerWeek: 5,
  meatMealsPerWeek: 5,
  dairyMealsPerWeek: 8,
  homeEnergyKwhPerMonth: 280,
  shoppingSpendPerWeek: 120,
  lifestyleHoursPerWeek: 10,
};

beforeEach(() => {
  act(() => {
    useAssistantStore.setState({ messages: [] });
  });
});

describe('assistantStore — sendMessage', () => {
  it('adds a user message', () => {
    act(() => { useAssistantStore.getState().sendMessage('Hello coach'); });
    const { messages } = useAssistantStore.getState();
    expect(messages.some((m) => m.role === 'user' && m.content === 'Hello coach')).toBe(true);
  });

  it('adds an assistant reply after user message', () => {
    act(() => { useAssistantStore.getState().sendMessage('How do I reduce transport?'); });
    const { messages } = useAssistantStore.getState();
    expect(messages.some((m) => m.role === 'assistant')).toBe(true);
  });

  it('reply contains transport guidance for transport-related message', () => {
    act(() => { useAssistantStore.getState().sendMessage('I want to reduce my car commute'); });
    const reply = useAssistantStore.getState().messages.find((m) => m.role === 'assistant');
    expect(reply?.content.toLowerCase()).toContain('transport');
  });

  it('reply contains food guidance for food-related message', () => {
    act(() => { useAssistantStore.getState().sendMessage('How does my diet affect emissions?'); });
    const reply = useAssistantStore.getState().messages.find((m) => m.role === 'assistant');
    expect(reply?.content.toLowerCase()).toContain('food');
  });

  it('ignores empty or whitespace-only messages', () => {
    act(() => { useAssistantStore.getState().sendMessage('   '); });
    expect(useAssistantStore.getState().messages).toHaveLength(0);
  });

  it('each message has an id and createdAt', () => {
    act(() => { useAssistantStore.getState().sendMessage('Test'); });
    useAssistantStore.getState().messages.forEach((m) => {
      expect(m.id.length).toBeGreaterThan(0);
      expect(m.createdAt.length).toBeGreaterThan(0);
    });
  });
});

describe('assistantStore — seedAssistant', () => {
  it('populates messages with assistant content', () => {
    act(() => { useAssistantStore.getState().seedAssistant(baseInput); });
    const { messages } = useAssistantStore.getState();
    expect(messages.length).toBeGreaterThan(0);
    expect(messages.every((m) => m.role === 'assistant')).toBe(true);
  });

  it('seeds at most 3 messages (1 coach + 2 recs)', () => {
    act(() => { useAssistantStore.getState().seedAssistant(baseInput); });
    expect(useAssistantStore.getState().messages.length).toBeLessThanOrEqual(3);
  });

  it('replaces prior messages on re-seed', () => {
    act(() => { useAssistantStore.getState().sendMessage('prior message'); });
    act(() => { useAssistantStore.getState().seedAssistant(baseInput); });
    const { messages } = useAssistantStore.getState();
    expect(messages.some((m) => m.content === 'prior message')).toBe(false);
  });
});

describe('assistantStore — clearMessages', () => {
  it('empties the messages array', () => {
    act(() => { useAssistantStore.getState().sendMessage('test'); });
    act(() => { useAssistantStore.getState().clearMessages(); });
    expect(useAssistantStore.getState().messages).toHaveLength(0);
  });
});
