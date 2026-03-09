// ─── Components ───────────────────────────────────────────────────────────────
export {
  FadeInOnScroll,
  SlideInOnScroll,
  ScaleInOnScroll,
  StaggerChildrenOnScroll,
  ParallaxSection,
  RevealTextOnScroll,
  ScrollPin,
  ScrubReveal,
  ScrollImageReveal,
} from './components';

// ─── Hooks ────────────────────────────────────────────────────────────────────
export {
  useScrollReveal,
  useParallax,
  useScrollProgress,
  useScrollTrigger,
} from './hooks';

// ─── Types (re-exported for consumers) ────────────────────────────────────────
export type {
  // Base
  BaseScrollProps,
  EaseString,
  Direction,
  // Component props
  FadeInOnScrollProps,
  SlideInOnScrollProps,
  ScaleInOnScrollProps,
  StaggerChildrenOnScrollProps,
  ParallaxSectionProps,
  RevealTextOnScrollProps,
} from './types';

export type { ScrollPinProps } from './components/ScrollPin';
export type { ScrubRevealProps } from './components/ScrubReveal';
export type { ScrollImageRevealProps } from './components/ScrollImageReveal';
export type {
  UseScrollRevealOptions,
  UseScrollRevealReturn,
  UseParallaxOptions,
  UseParallaxReturn,
} from './types';
export type {
  UseScrollProgressOptions,
  UseScrollProgressReturn,
} from './hooks/useScrollProgress';
export type {
  UseScrollTriggerOptions,
  UseScrollTriggerReturn,
} from './hooks/useScrollTrigger';
