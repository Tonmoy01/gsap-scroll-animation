import '@testing-library/jest-dom';

// Mock GSAP entirely in tests — we only care about React integration,
// not the animation internals.
vi.mock('gsap', () => ({
  gsap: {
    registerPlugin: vi.fn(),
    context: vi.fn(() => ({
      revert: vi.fn(),
    })),
    fromTo: vi.fn(),
    utils: { toArray: vi.fn((x: unknown) => Array.isArray(x) ? x : []) },
  },
}));

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    getAll: vi.fn(() => []),
  },
}));
