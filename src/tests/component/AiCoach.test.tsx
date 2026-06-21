import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import AiCoach from '../../components/assistant/AiCoach';
import { useAssistantStore } from '../../store/assistantStore';

beforeEach(() => {
  useAssistantStore.setState({ messages: [] });
});

describe('AiCoach', () => {
  it('renders the coach section label', () => {
    render(<AiCoach />);
    expect(screen.getByText(/AI Sustainability Coach/i)).toBeInTheDocument();
  });

  it('renders the headline copy', () => {
    render(<AiCoach />);
    expect(screen.getByText(/Local recommendations, tuned to your footprint/i)).toBeInTheDocument();
  });

  it('renders the Score stat block', () => {
    render(<AiCoach />);
    expect(screen.getByText(/Score/i)).toBeInTheDocument();
  });

  it('renders the Seed coach button', () => {
    render(<AiCoach />);
    expect(screen.getByRole('button', { name: /Seed coach conversation/i })).toBeInTheDocument();
  });

  it('calls seedAssistant when button is clicked', async () => {
    const seedSpy = vi.spyOn(useAssistantStore.getState(), 'seedAssistant');
    render(<AiCoach />);
    await userEvent.click(screen.getByRole('button', { name: /Seed coach conversation/i }));
    expect(seedSpy).toHaveBeenCalledOnce();
  });

  it('renders at most 2 recommendation cards', () => {
    render(<AiCoach />);
    // Each RecommendationCard renders an h3 with the recommendation title
    // AiCoach slices recommendations to 2
    const headings = screen.queryAllByRole('heading', { level: 3 });
    expect(headings.length).toBeLessThanOrEqual(2);
  });
});
