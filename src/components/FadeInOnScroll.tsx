import React, { useRef, useEffect, createElement } from 'react';
import type { FadeInOnScrollProps } from '../types';
import { registerGSAP, gsap, ScrollTrigger } from '../utils/gsap';
import { isBrowser } from '../utils/ssr';

/**
 * Fades children in when they enter the viewport.
 *
 * @example
 * <FadeInOnScroll duration={0.8} delay={0.1}>
 *   <h2>Hello world</h2>
 * </FadeInOnScroll>
 */
export function FadeInOnScroll({
  children,
  duration = 0.8,
  delay = 0,
  ease = 'power2.out',
  fromOpacity = 0,
  triggerOnce = true,
  start = 'top 85%',
  className,
  style,
  as = 'div',
  markers = false,
}: FadeInOnScrollProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isBrowser || !ref.current) return;

    registerGSAP();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: fromOpacity, willChange: 'opacity' },
        {
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
  }, [duration, delay, ease, fromOpacity, triggerOnce, start, markers]);

  return createElement(
    as,
    { ref, className, style },
    children,
  );
}
