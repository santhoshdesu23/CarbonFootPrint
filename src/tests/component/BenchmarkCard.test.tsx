import { act, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import BenchmarkCard from '../../components/dashboard/BenchmarkCard';
import { useCarbonStore } from '../../store/carbonStore';
import { useUserStore } from '../../store/userStore';

beforeEach(() => {
  useCarbonStore.getState().resetProfile();
  act(() => {
    useUserStore.setState({ user: { ...useUserStore.getState().user, preferredUnit: 'metric' } });
  });
});

describe('BenchmarkCard', () => {
  it('renders the Benchmark Comparison heading', () => {
    render(<BenchmarkCard />);
    expect(screen.getByText(/Benchmark Comparison/i)).toBeInTheDocument();
  });

  it('renders "You" and "Benchmark" labels', () => {
    render(<BenchmarkCard />);
    expect(screen.getByText('You')).toBeInTheDocument();
    expect(screen.getByText('Benchmark')).toBeInTheDocument();
  });

  it('shows kg CO2e unit label in metric mode', () => {
    render(<BenchmarkCard />);
    const labels = screen.getAllByText('kg CO2e');
    expect(labels.length).toBeGreaterThanOrEqual(1);
  });

  it('shows lbs CO2e unit label in imperial mode', () => {
    act(() => {
      useUserStore.setState({ user: { ...useUserStore.getState().user, preferredUnit: 'imperial' } });
    });
    render(<BenchmarkCard />);
    const labels = screen.getAllByText('lbs CO2e');
    expect(labels.length).toBeGreaterThanOrEqual(1);
  });

  it('renders two numeric value cells', () => {
    render(<BenchmarkCard />);
    // Both "You" and "Benchmark" entries have a numeric value
    const you = useCarbonStore.getState().profile.totalKgCo2e;
    expect(screen.getByText(you.toFixed(1))).toBeInTheDocument();
    expect(screen.getByText((1200).toFixed(1))).toBeInTheDocument();
  });
});
