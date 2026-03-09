import React, { useRef, useEffect, createElement } from 'react';
import type { SlideInOnScrollProps, Direction } from '../types';
import { registerGSAP, gsap, ScrollTrigger } from '../utils/gsap';
import { isBrowser } from '../utils/ssr';

function resolveFrom(direction: Direction, distance: number) {
  switch (direction) {
    case 'up':    return { y: distance,  x: 0 };
    case 'down':  return { y: -distance, x: 0 };
    case 'left':  return { x: distance,  y: 0 };
    case 'right': return { x: -distance, y: 0 };
  }
}

/**
 * Slides children in from a given direction when they enter the viewport.
 *
 * @example
 * <SlideInOnScroll direction="left" distance={80}>
 *   <Card />
 * </SlideInOnScroll>
 */
export function SlideInOnScroll({
  children,
  duration = 0.8,
  delay = 0,
  ease = 'power3.out',
  direction = 'up',
  distance = 60,
  triggerOnce = true,
  start = 'top 85%',
  className,
  style,
  as = 'div',
  markers = false,
}: SlideInOnScrollProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isBrowser || !ref.current) return;

    registerGSAP();

    const from = resolveFrom(direction, distance);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, ...from, willChange: 'transform, opacity' },
        {
          opacity: 1,
          x: 0,
          y: 0,
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
  }, [duration, delay, ease, direction, distance, triggerOnce, start, markers]);

  return createElement(as, { ref, className, style }, children);
}
