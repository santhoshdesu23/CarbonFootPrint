import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AiCoach from '../../components/assistant/AiCoach';

describe('AiCoach', () => {
  it('renders the coach headline', () => {
    render(<AiCoach />);
    expect(screen.getByText(/AI Sustainability Coach/i)).toBeInTheDocument();
  });
});
