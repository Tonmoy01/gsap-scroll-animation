import React, { useRef, useEffect, createElement } from 'react';
import type { StaggerChildrenOnScrollProps } from '../types';
import { registerGSAP, gsap, ScrollTrigger } from '../utils/gsap';
import { isBrowser } from '../utils/ssr';

function buildFromVars(animation: StaggerChildrenOnScrollProps['childAnimation'], distance: number) {
  switch (animation) {
    case 'fade':
      return { opacity: 0 };
    case 'scale':
      return { opacity: 0, scale: 0.85 };
    case 'slide-up':
    default:
      return { opacity: 0, y: distance };
  }
}

function buildToVars(animation: StaggerChildrenOnScrollProps['childAnimation']) {
  switch (animation) {
    case 'fade':
      return { opacity: 1 };
    case 'scale':
      return { opacity: 1, scale: 1 };
    case 'slide-up':
    default:
      return { opacity: 1, y: 0 };
  }
}

/**
 * Staggers the entrance animation of direct children when they scroll into view.
 *
 * @example
 * <StaggerChildrenOnScroll stagger={0.12} childAnimation="slide-up">
 *   <Card />
 *   <Card />
 *   <Card />
 * </StaggerChildrenOnScroll>
 */
export function StaggerChildrenOnScroll({
  children,
  duration = 0.7,
  delay = 0,
  ease = 'power3.out',
  stagger = 0.15,
  childAnimation = 'slide-up',
  distance = 40,
  triggerOnce = true,
  start = 'top 85%',
  className,
  style,
  as = 'div',
  markers = false,
}: StaggerChildrenOnScrollProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isBrowser || !ref.current) return;

    registerGSAP();

    const ctx = gsap.context(() => {
      const children = gsap.utils.toArray<HTMLElement>(
        ref.current!.children as unknown as HTMLElement[],
      );

      if (children.length === 0) return;

      gsap.fromTo(
        children,
        { ...buildFromVars(childAnimation, distance), willChange: 'transform, opacity' },
        {
          ...buildToVars(childAnimation),
          duration,
          delay,
          ease,
          stagger,
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
  }, [duration, delay, ease, stagger, childAnimation, distance, triggerOnce, start, markers]);

  return createElement(as, { ref, className, style }, children);
}
