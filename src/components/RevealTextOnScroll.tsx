import React, { useRef, useEffect, createElement } from 'react';
import type { RevealTextOnScrollProps } from '../types';
import { registerGSAP, gsap, ScrollTrigger } from '../utils/gsap';
import { isBrowser } from '../utils/ssr';

/**
 * Splits text into words or characters and reveals them staggered on scroll.
 * Each segment is wrapped in a `<span>` with `display: inline-block` so
 * individual transforms work correctly.
 *
 * @example
 * <RevealTextOnScroll
 *   text="Welcome to the future of scroll animation."
 *   splitBy="words"
 *   stagger={0.06}
 * />
 */
export function RevealTextOnScroll({
  text,
  splitBy = 'words',
  duration = 0.6,
  delay = 0,
  stagger = 0.05,
  ease = 'power3.out',
  triggerOnce = true,
  start = 'top 85%',
  className,
  style,
  as = 'p',
  markers = false,
}: RevealTextOnScrollProps) {
  const ref = useRef<HTMLElement>(null);

  const segments = splitBy === 'chars'
    ? text.split('')
    : text.split(/\s+/);

  useEffect(() => {
    if (!isBrowser || !ref.current) return;

    registerGSAP();

    const spans = Array.from(
      ref.current.querySelectorAll<HTMLSpanElement>('[data-rsmk-segment]'),
    );

    if (spans.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        spans,
        { opacity: 0, y: 24, willChange: 'transform, opacity' },
        {
          opacity: 1,
          y: 0,
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
  }, [text, splitBy, duration, delay, stagger, ease, triggerOnce, start, markers]);

  const content = segments.map((seg, i) => (
    <span
      key={i}
      data-rsmk-segment
      style={{ display: 'inline-block', whiteSpace: splitBy === 'chars' ? 'pre' : 'normal' }}
    >
      {seg}
      {splitBy === 'words' && i < segments.length - 1 ? '\u00a0' : ''}
    </span>
  ));

  return createElement(as, { ref, className, style }, content);
}
