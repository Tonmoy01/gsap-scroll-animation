/**
 * GSAP registration utility.
 *
 * Centralises plugin registration so it happens exactly once regardless
 * of how many components are mounted.  Import `registerGSAP` at the top
 * of any component/hook that needs ScrollTrigger.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

export function registerGSAP(): void {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export { gsap, ScrollTrigger };
