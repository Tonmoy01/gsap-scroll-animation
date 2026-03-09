import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SlideInOnScroll } from '../src/components/SlideInOnScroll';

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

describe('SlideInOnScroll', () => {
  it('renders children', () => {
    render(
      <SlideInOnScroll direction="left">
        <p>Slide me</p>
      </SlideInOnScroll>,
    );
    expect(screen.getByText('Slide me')).toBeInTheDocument();
  });

  it('accepts all direction values without crashing', () => {
    const directions = ['up', 'down', 'left', 'right'] as const;
    directions.forEach((dir) => {
      const { unmount } = render(
        <SlideInOnScroll direction={dir}>
          <span>{dir}</span>
        </SlideInOnScroll>,
      );
      expect(screen.getByText(dir)).toBeInTheDocument();
      unmount();
    });
  });
});
