import { useRef, useEffect } from 'react';
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger';
import { registerGSAP, ScrollTrigger } from '../utils/gsap';
import { isBrowser } from '../utils/ssr';

// Pull the vars type from GSAP's own types
type ScrollTriggerVars = ConstructorParameters<typeof ScrollTriggerType>[0];

export interface UseScrollTriggerOptions
  extends Omit<ScrollTriggerVars, 'trigger'> {
  /**
   * Disable the ScrollTrigger without unmounting the component.
   * Useful for conditional animations.
   */
  enabled?: boolean;
}

export interface UseScrollTriggerReturn<T extends HTMLElement = HTMLElement> {
  /** Attach to the element that acts as the ScrollTrigger trigger */
  ref: React.RefObject<T>;
  /** The live ScrollTrigger instance (null before mount / after unmount) */
  instanceRef: React.MutableRefObject<ScrollTriggerType | null>;
}

/**
 * Low-level hook that creates a raw ScrollTrigger instance on an element.
 * Useful when you need capabilities not covered by the higher-level
 * components/hooks — e.g. `toggleClass`, `snap`, custom `onToggle`, etc.
 *
 * @example
 * const { ref } = useScrollTrigger({
 *   start: 'top 60%',
 *   end: 'bottom 40%',
 *   toggleClass: { targets: '.nav', className: 'active' },
 *   onEnter: () => console.log('entered'),
 * });
 * return <section ref={ref}>...</section>;
 */
export function useScrollTrigger<T extends HTMLElement = HTMLElement>(
  options: UseScrollTriggerOptions = {},
): UseScrollTriggerReturn<T> {
  const { enabled = true, ...vars } = options;

  const ref         = useRef<T>(null);
  const instanceRef = useRef<ScrollTriggerType | null>(null);

  // Keep the vars ref up-to-date without re-running the effect on every render
  const varsRef = useRef(vars);
  varsRef.current = vars;

  useEffect(() => {
    if (!isBrowser || !ref.current || !enabled) return;

    registerGSAP();

    const st = ScrollTrigger.create({
      trigger: ref.current,
      ...varsRef.current,
    });

    instanceRef.current = st;

    return () => {
      st.kill();
      instanceRef.current = null;
    };
  }, [enabled]);

  return { ref, instanceRef };
}
