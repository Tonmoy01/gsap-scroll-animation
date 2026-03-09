import type { CSSProperties, ReactNode } from 'react';

// ─── Shared primitives ────────────────────────────────────────────────────────

export type EaseString =
  | 'none'
  | 'power1.in'
  | 'power1.out'
  | 'power1.inOut'
  | 'power2.in'
  | 'power2.out'
  | 'power2.inOut'
  | 'power3.in'
  | 'power3.out'
  | 'power3.inOut'
  | 'power4.in'
  | 'power4.out'
  | 'power4.inOut'
  | 'back.in'
  | 'back.out'
  | 'back.inOut'
  | 'elastic.in'
  | 'elastic.out'
  | 'elastic.inOut'
  | 'bounce.in'
  | 'bounce.out'
  | 'bounce.inOut'
  | 'circ.in'
  | 'circ.out'
  | 'circ.inOut'
  | 'expo.in'
  | 'expo.out'
  | 'expo.inOut'
  | 'sine.in'
  | 'sine.out'
  | 'sine.inOut'
  | (string & Record<never, never>); // allow any other GSAP ease string

export type Direction = 'up' | 'down' | 'left' | 'right';

// ─── Base scroll animation props ─────────────────────────────────────────────

export interface BaseScrollProps {
  /** Content to animate */
  children: ReactNode;
  /** Animation duration in seconds */
  duration?: number;
  /** Delay before animation starts (seconds) */
  delay?: number;
  /** GSAP ease string */
  ease?: EaseString;
  /** Only trigger animation once (default: true) */
  triggerOnce?: boolean;
  /** ScrollTrigger start position, e.g. "top 80%" */
  start?: string;
  /** Additional CSS class */
  className?: string;
  /** Inline styles applied to the wrapper */
  style?: CSSProperties;
  /** HTML tag to use for the wrapper element */
  as?: keyof HTMLElementTagNameMap;
  /** Marker display for debugging (ScrollTrigger markers) */
  markers?: boolean;
}

// ─── Component-specific props ─────────────────────────────────────────────────

export interface FadeInOnScrollProps extends BaseScrollProps {
  /** Starting opacity (default: 0) */
  fromOpacity?: number;
}

export interface SlideInOnScrollProps extends BaseScrollProps {
  /** Slide direction (default: "up") */
  direction?: Direction;
  /** Distance to slide from in px (default: 60) */
  distance?: number;
}

export interface ScaleInOnScrollProps extends BaseScrollProps {
  /** Starting scale (default: 0.8) */
  fromScale?: number;
  /** Starting opacity (default: 0) */
  fromOpacity?: number;
}

export interface StaggerChildrenOnScrollProps
  extends Omit<BaseScrollProps, 'children'> {
  children: ReactNode;
  /** Stagger interval between children in seconds (default: 0.15) */
  stagger?: number;
  /** Child animation: slide-up (default), fade, or scale */
  childAnimation?: 'slide-up' | 'fade' | 'scale';
  /** Distance for slide-up animation (default: 40) */
  distance?: number;
}

export interface ParallaxSectionProps {
  children: ReactNode;
  /** Parallax intensity — how much the element shifts (default: 50) */
  speed?: number;
  /** Direction of parallax movement (default: "vertical") */
  direction?: 'vertical' | 'horizontal';
  className?: string;
  style?: CSSProperties;
  as?: keyof HTMLElementTagNameMap;
}

export interface RevealTextOnScrollProps {
  /** Plain text or array of words/lines to animate */
  text: string;
  /** Reveal by "words" or "chars" (default: "words") */
  splitBy?: 'words' | 'chars';
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: EaseString;
  triggerOnce?: boolean;
  start?: string;
  className?: string;
  style?: CSSProperties;
  /** HTML tag for the text wrapper (default: "p") */
  as?: keyof HTMLElementTagNameMap;
  markers?: boolean;
}

// ─── Hook return types ────────────────────────────────────────────────────────

export interface UseScrollRevealOptions {
  duration?: number;
  delay?: number;
  ease?: EaseString;
  fromOpacity?: number;
  fromY?: number;
  fromX?: number;
  fromScale?: number;
  triggerOnce?: boolean;
  start?: string;
  markers?: boolean;
}

export interface UseScrollRevealReturn<T extends HTMLElement = HTMLElement> {
  ref: React.RefObject<T>;
}

export interface UseParallaxOptions {
  speed?: number;
  direction?: 'vertical' | 'horizontal';
}

export interface UseParallaxReturn<T extends HTMLElement = HTMLElement> {
  ref: React.RefObject<T>;
}
