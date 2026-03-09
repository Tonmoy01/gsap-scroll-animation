/**
 * SSR safety helpers.
 *
 * GSAP's ScrollTrigger requires a real browser DOM.  These helpers let
 * components detect whether they are running in a browser before
 * touching any browser-only APIs.
 */

export const isBrowser = typeof window !== 'undefined';

/**
 * Run `fn` only when executed inside a browser context.
 * Does nothing during SSR / Node.js rendering.
 */
export function browserOnly(fn: () => void): void {
  if (isBrowser) fn();
}
