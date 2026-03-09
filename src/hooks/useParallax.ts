import { useRef, useEffect } from 'react';
import type { UseParallaxOptions, UseParallaxReturn } from '../types';
import { registerGSAP, gsap } from '../utils/gsap';
import { isBrowser } from '../utils/ssr';

/**
 * Hook version of `ParallaxSection`.  Attach `ref` to any element to make
 * it shift at a different rate than the normal scroll speed.
 *
 * @example
 * const { ref } = useParallax<HTMLImageElement>({ speed: 60 });
 * return <img ref={ref} src="bg.jpg" />;
 */
export function useParallax<T extends HTMLElement = HTMLElement>(
  options: UseParallaxOptions = {},
): UseParallaxReturn<T> {
  const { speed = 50, direction = 'vertical' } = options;

  const ref = useRef<T>(null);

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

  return { ref };
}
