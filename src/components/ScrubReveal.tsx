import React, { useRef, useEffect, createElement } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import type { EaseString } from '../types';
import { registerGSAP, gsap, ScrollTrigger } from '../utils/gsap';
import { isBrowser } from '../utils/ssr';

export interface ScrubRevealProps {
  children: ReactNode;
  /** How tightly scrub follows scroll. true = instant, number = seconds lag. Default: 1 */
  scrub?: boolean | number;
  /** Where the animation starts. Default: "top 80%" */
  start?: string;
  /** Where the animation ends. Default: "bottom 20%" */
  end?: string;
  /** Starting opacity. Default: 0 */
  fromOpacity?: number;
  /** Starting Y offset in px. Default: 80 */
  fromY?: number;
  /** Starting X offset in px. Default: 0 */
  fromX?: number;
  /** Starting scale. Default: 0.85 */
  fromScale?: number;
  /** GSAP ease (applies to the tween, scrub overrides timeline). Default: "none" */
  ease?: EaseString;
  markers?: boolean;
  className?: string;
  style?: CSSProperties;
  as?: keyof HTMLElementTagNameMap;
}

/**
 * Ties the animation progress directly to the scroll position.
 * Unlike event-triggered animations, scrub animations play forward
 * and backward as the user scrolls up and down.
 *
 * @example
 * <ScrubReveal fromY={120} scrub={1.5}>
 *   <h2>I animate exactly with your scroll</h2>
 * </ScrubReveal>
 */
export function ScrubReveal({
  children,
  scrub = 1,
  start = 'top 80%',
  end = 'bottom 20%',
  fromOpacity = 0,
  fromY = 80,
  fromX = 0,
  fromScale = 0.85,
  ease = 'none',
  markers = false,
  className,
  style,
  as = 'div',
}: ScrubRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isBrowser || !ref.current) return;

    registerGSAP();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        {
          opacity: fromOpacity,
          y: fromY,
          x: fromX,
          scale: fromScale,
          willChange: 'transform, opacity',
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          ease,
          clearProps: 'willChange',
          scrollTrigger: {
            trigger: ref.current,
            start,
            end,
            scrub,
            markers,
          },
        },
      );
    }, ref);

    return () => ctx.revert();
  }, [scrub, start, end, fromOpacity, fromY, fromX, fromScale, ease, markers]);

  return createElement(as, { ref, className, style }, children);
}
