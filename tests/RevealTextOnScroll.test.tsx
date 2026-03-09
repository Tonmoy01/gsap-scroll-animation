import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { RevealTextOnScroll } from '../src/components/RevealTextOnScroll';

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

describe('RevealTextOnScroll', () => {
  it('renders the text content', () => {
    const { container } = render(
      <RevealTextOnScroll text="Hello world" splitBy="words" />,
    );
    expect(container.textContent?.replace(/\s+/g, ' ').trim()).toContain('Hello');
    expect(container.textContent?.replace(/\s+/g, ' ').trim()).toContain('world');
  });

  it('splits into chars when splitBy=chars', () => {
    const { container } = render(
      <RevealTextOnScroll text="Hi" splitBy="chars" />,
    );
    const spans = container.querySelectorAll('[data-rsmk-segment]');
    expect(spans.length).toBe(2); // 'H' and 'i'
  });

  it('renders as a custom element', () => {
    const { container } = render(
      <RevealTextOnScroll text="Hey" as="h2" />,
    );
    expect(container.firstChild?.nodeName).toBe('H2');
  });
});
