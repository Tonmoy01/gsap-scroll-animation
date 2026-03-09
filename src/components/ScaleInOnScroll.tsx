import React, { useRef, useEffect, createElement } from 'react';
import type { ScaleInOnScrollProps } from '../types';
import { registerGSAP, gsap, ScrollTrigger } from '../utils/gsap';
import { isBrowser } from '../utils/ssr';

/**
 * Scales children in when they enter the viewport.
 *
 * @example
 * <ScaleInOnScroll fromScale={0.6} duration={1}>
 *   <img src="poster.jpg" />
 * </ScaleInOnScroll>
 */
export function ScaleInOnScroll({
  children,
  duration = 0.8,
  delay = 0,
  ease = 'back.out(1.4)',
  fromScale = 0.8,
  fromOpacity = 0,
  triggerOnce = true,
  start = 'top 85%',
  className,
  style,
  as = 'div',
  markers = false,
}: ScaleInOnScrollProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isBrowser || !ref.current) return;

    registerGSAP();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        {
          scale: fromScale,
          opacity: fromOpacity,
          willChange: 'transform, opacity',
        },
        {
          scale: 1,
          opacity: 1,
          duration,
          delay,
          ease,
          clearProps: 'willChange',
          scrollTrigger: {
            trigger: ref.current,
            start,
            toggleActions: triggerOnce
              ? 'play none none none'
              : 'play none none reverse',
            markers,
          },
        },
      );
    }, ref);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === ref.current) st.kill();
      });
    };
  }, [duration, delay, ease, fromScale, fromOpacity, triggerOnce, start, markers]);

  return createElement(as, { ref, className, style }, children);
}
