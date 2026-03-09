import { useRef, useEffect } from 'react';
import type { UseScrollRevealOptions, UseScrollRevealReturn } from '../types';
import { registerGSAP, gsap, ScrollTrigger } from '../utils/gsap';
import { isBrowser } from '../utils/ssr';

/**
 * Imperative hook for scroll-reveal animations.  Attach the returned `ref`
 * to any DOM element and it will animate in when the element enters the
 * viewport.
 *
 * @example
 * const { ref } = useScrollReveal<HTMLDivElement>({ fromY: 50, duration: 1 });
 * return <div ref={ref}>Animated</div>;
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  options: UseScrollRevealOptions = {},
): UseScrollRevealReturn<T> {
  const {
    duration = 0.8,
    delay = 0,
    ease = 'power3.out',
    fromOpacity = 0,
    fromY = 40,
    fromX = 0,
    fromScale = 1,
    triggerOnce = true,
    start = 'top 85%',
    markers = false,
  } = options;

  const ref = useRef<T>(null);

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
  }, [duration, delay, ease, fromOpacity, fromY, fromX, fromScale, triggerOnce, start, markers]);

  return { ref };
}
