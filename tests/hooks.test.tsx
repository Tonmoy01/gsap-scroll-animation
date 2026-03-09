import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { useScrollReveal } from '../src/hooks/useScrollReveal';
import { useParallax } from '../src/hooks/useParallax';

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

// ── useScrollReveal ───────────────────────────────────────────────────────────

function ScrollRevealDemo() {
  const { ref } = useScrollReveal<HTMLDivElement>({ fromY: 30 });
  return <div ref={ref} data-testid="reveal">content</div>;
}

describe('useScrollReveal', () => {
  it('attaches ref to the DOM element without throwing', () => {
    const { getByTestId } = render(<ScrollRevealDemo />);
    expect(getByTestId('reveal')).toBeInTheDocument();
  });
});

// ── useParallax ───────────────────────────────────────────────────────────────

function ParallaxDemo() {
  const { ref } = useParallax<HTMLDivElement>({ speed: 80 });
  return <div ref={ref} data-testid="parallax">bg</div>;
}

describe('useParallax', () => {
  it('attaches ref to the DOM element without throwing', () => {
    const { getByTestId } = render(<ParallaxDemo />);
    expect(getByTestId('parallax')).toBeInTheDocument();
  });
});
