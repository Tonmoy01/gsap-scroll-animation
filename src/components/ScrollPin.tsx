import React, { useRef, useEffect, createElement } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { registerGSAP, gsap, ScrollTrigger } from '../utils/gsap';
import { isBrowser } from '../utils/ssr';

export interface ScrollPinProps {
  /** Content to render inside the pinned section */
  children: ReactNode;
  /**
   * How long the pin lasts — as a ScrollTrigger `end` value.
   * e.g. "+=200%" means pin for 2x the viewport height.
   * Default: "+=100%"
   */
  pinDuration?: string;
  /** Where the pin starts. Default: "top top" */
  start?: string;
  /** Show ScrollTrigger debug markers */
  markers?: boolean;
  className?: string;
  style?: CSSProperties;
  as?: keyof HTMLElementTagNameMap;
  /**
   * Called every scroll tick with progress 0 → 1 while pinned.
   * Useful for driving child animations manually.
   */
  onProgress?: (progress: number) => void;
}

/**
 * Pins the section in place while the user scrolls through it.
 * The pinned duration is controlled by `pinDuration`.
 *
 * @example
 * <ScrollPin pinDuration="+=150%">
 *   <div>This section sticks while you scroll past it</div>
 * </ScrollPin>
 */
export function ScrollPin({
  children,
  pinDuration = '+=100%',
  start = 'top top',
  markers = false,
  className,
  style,
  as = 'div',
  onProgress,
}: ScrollPinProps) {
  const ref = useRef<HTMLElement>(null);
  // Keep callback ref stable so effect deps don't thrash
  const onProgressRef = useRef(onProgress);
  onProgressRef.current = onProgress;

  useEffect(() => {
    if (!isBrowser || !ref.current) return;

    registerGSAP();

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start,
        end: pinDuration,
        pin: true,
        pinSpacing: true,
        markers,
        onUpdate: (self) => {
          onProgressRef.current?.(self.progress);
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [pinDuration, start, markers]);

  return createElement(as, { ref, className, style }, children);
}
