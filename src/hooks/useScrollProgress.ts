import { useRef, useEffect } from 'react';
import { registerGSAP, ScrollTrigger } from '../utils/gsap';
import { isBrowser } from '../utils/ssr';

export interface UseScrollProgressOptions {
  /** Where tracking begins. Default: "top bottom" */
  start?: string;
  /** Where tracking ends. Default: "bottom top" */
  end?: string;
  /** Called on every scroll tick with progress 0 → 1 */
  onUpdate?: (progress: number) => void;
  /** Called once when progress reaches 1 */
  onComplete?: () => void;
  /** Called once when the trigger enters the viewport */
  onEnter?: () => void;
  /** Called once when the trigger leaves the viewport */
  onLeave?: () => void;
  markers?: boolean;
}

export interface UseScrollProgressReturn<T extends HTMLElement = HTMLElement> {
  /** Attach to the element you want to track */
  ref: React.RefObject<T>;
  /**
   * Mutable ref holding the latest progress value (0–1).
   * Reading `.current` is always up-to-date without causing re-renders.
   */
  progressRef: React.MutableRefObject<number>;
}

/**
 * Tracks the scroll progress of an element between `start` and `end`.
 * Returns a stable `progressRef.current` (0–1) and fires optional
 * lifecycle callbacks — all without triggering React re-renders.
 *
 * For UI that needs to re-render based on progress (e.g. a counter),
 * call `setState` inside `onUpdate`.
 *
 * @example
 * const { ref, progressRef } = useScrollProgress({
 *   onUpdate: (p) => setPercent(Math.round(p * 100)),
 * });
 * return <section ref={ref}>...</section>;
 */
export function useScrollProgress<T extends HTMLElement = HTMLElement>(
  options: UseScrollProgressOptions = {},
): UseScrollProgressReturn<T> {
  const {
    start = 'top bottom',
    end = 'bottom top',
    markers = false,
  } = options;

  const ref = useRef<T>(null);
  const progressRef = useRef<number>(0);

  // Stable callback refs — no need to re-run the effect when they change
  const onUpdateRef   = useRef(options.onUpdate);
  const onCompleteRef = useRef(options.onComplete);
  const onEnterRef    = useRef(options.onEnter);
  const onLeaveRef    = useRef(options.onLeave);
  onUpdateRef.current   = options.onUpdate;
  onCompleteRef.current = options.onComplete;
  onEnterRef.current    = options.onEnter;
  onLeaveRef.current    = options.onLeave;

  useEffect(() => {
    if (!isBrowser || !ref.current) return;

    registerGSAP();

    const st = ScrollTrigger.create({
      trigger: ref.current,
      start,
      end,
      markers,
      onUpdate(self) {
        progressRef.current = self.progress;
        onUpdateRef.current?.(self.progress);
      },
      onEnter()    { onEnterRef.current?.(); },
      onLeave()    { onLeaveRef.current?.(); onCompleteRef.current?.(); },
    });

    return () => st.kill();
  }, [start, end, markers]);

  return { ref, progressRef };
}
