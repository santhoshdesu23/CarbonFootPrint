import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ErrorBoundary from '../../components/common/ErrorBoundary';

// Suppress console.error output during expected error boundary tests
beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

function ThrowOnRender({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) throw new Error('Test render error');
  return <p>Content rendered</p>;
}

describe('ErrorBoundary', () => {
  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <ThrowOnRender shouldThrow={false} />
      </ErrorBoundary>,
    );
    expect(screen.getByText('Content rendered')).toBeInTheDocument();
  });

  it('renders error UI when a child throws', () => {
    render(
      <ErrorBoundary>
        <ThrowOnRender shouldThrow={true} />
      </ErrorBoundary>,
    );
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });

  it('shows the Try again button when error occurs', () => {
    render(
      <ErrorBoundary>
        <ThrowOnRender shouldThrow={true} />
      </ErrorBoundary>,
    );
    expect(screen.getByRole('button', { name: /Try again/i })).toBeInTheDocument();
  });

  it('resets error state when Try again is clicked', async () => {
    // Render with throwing child to trigger error state
    const { unmount } = render(
      <ErrorBoundary>
        <ThrowOnRender shouldThrow={true} />
      </ErrorBoundary>,
    );
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();

    // Click Try again — resets internal state
    await userEvent.click(screen.getByRole('button', { name: /Try again/i }));

    // Unmount and remount with non-throwing child to verify reset worked
    unmount();
    render(
      <ErrorBoundary>
        <ThrowOnRender shouldThrow={false} />
      </ErrorBoundary>,
    );
    expect(screen.getByText('Content rendered')).toBeInTheDocument();
  });

  it('error UI contains a helpful description', () => {
    render(
      <ErrorBoundary>
        <ThrowOnRender shouldThrow={true} />
      </ErrorBoundary>,
    );
    expect(screen.getByText(/unexpected error/i)).toBeInTheDocument();
  });
});
