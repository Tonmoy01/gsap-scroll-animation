import React, { useRef, useEffect, createElement } from 'react';
import type { ParallaxSectionProps } from '../types';
import { registerGSAP, gsap, ScrollTrigger } from '../utils/gsap';
import { isBrowser } from '../utils/ssr';

/**
 * Applies a smooth parallax offset to its children as the user scrolls.
 * The `speed` prop controls how many pixels the element shifts per viewport
 * height scrolled.  Positive values move the element slower than scroll
 * (background feel); negative values move it faster.
 *
 * @example
 * <ParallaxSection speed={80}>
 *   <img src="hero-bg.jpg" />
 * </ParallaxSection>
 */
export function ParallaxSection({
  children,
  speed = 50,
  direction = 'vertical',
  className,
  style,
  as = 'div',
}: ParallaxSectionProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isBrowser || !ref.current) return;

    registerGSAP();

    const axis = direction === 'vertical' ? 'y' : 'x';

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { [axis]: -speed / 2 },
        {
          [axis]: speed / 2,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );
    }, ref);

    return () => ctx.revert();
  }, [speed, direction]);

  return createElement(as, { ref, className, style }, children);
}
