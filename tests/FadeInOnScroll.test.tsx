import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FadeInOnScroll } from '../src/components/FadeInOnScroll';

vi.mock('gsap', () => ({
  gsap: {
    registerPlugin: vi.fn(),
    context: vi.fn(() => ({ revert: vi.fn() })),
    fromTo: vi.fn(),
  },
}));
vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: { getAll: vi.fn(() => []) },
}));

describe('FadeInOnScroll', () => {
  it('renders children', () => {
    render(
      <FadeInOnScroll>
        <p>Animated content</p>
      </FadeInOnScroll>,
    );
    expect(screen.getByText('Animated content')).toBeInTheDocument();
  });

  it('applies className', () => {
    const { container } = render(
      <FadeInOnScroll className="my-class">
        <span>text</span>
      </FadeInOnScroll>,
    );
    expect(container.firstChild).toHaveClass('my-class');
  });

  it('renders as a custom element', () => {
    const { container } = render(
      <FadeInOnScroll as="section">
        <span>text</span>
      </FadeInOnScroll>,
    );
    expect(container.firstChild?.nodeName).toBe('SECTION');
  });
});
