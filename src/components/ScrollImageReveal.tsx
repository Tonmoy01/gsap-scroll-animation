import React, { useRef, useEffect, type CSSProperties, type ReactNode } from 'react';
import { registerGSAP, gsap, ScrollTrigger } from '../utils/gsap';
import { isBrowser } from '../utils/ssr';

export interface ScrollImageRevealProps {
  /** Image source URL */
  src: string;
  /** Image alt text */
  alt?: string;
  /** Title revealed on the fullscreen image */
  title?: string;
  /** Subtitle revealed on the fullscreen image */
  subtitle?: string;
  /**
   * Content that slides up from below as a "drawer" after the image
   * has fully expanded. Wrap in any elements you like.
   */
  children?: ReactNode;
  /**
   * Total scroll distance for the pinned animation as a CSS scroll value.
   * Larger = slower / more room to scrub. Default: "+=220%"
   */
  pinDuration?: string;
  /**
   * Parallax speed on the inner image during the expand phase.
   * Higher = more movement. Default: 80
   */
  parallaxSpeed?: number;
  /**
   * Starting size of the image frame before expansion.
   * Default: { width: '62%', height: '62vh' }
   */
  initialFrame?: { width: string; height: string };
  /** Scrub lag in seconds (default: 1.2 — silky smooth) */
  scrub?: number;
  /** Background color / gradient behind the image frame */
  sectionBackground?: string;
  /** Overlay tint on the fullscreen image. Default: rgba(0,0,0,0.45) */
  overlayColor?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * A three-phase scroll-driven cinematic reveal:
 *
 * 1. **Expand** — the image frame grows from a contained card to full-screen,
 *    border-radius collapses to 0, image inside parallaxes for depth.
 * 2. **Overlay** — title + subtitle fade in on top of the fullscreen image.
 * 3. **Drawer** — a content panel slides up from the bottom, revealing
 *    children while partially covering the image.
 *
 * The whole sequence is pinned and scrubbed to the user's scroll position.
 *
 * @example
 * <ScrollImageReveal
 *   src="/hero.jpg"
 *   title="Crafted with intention"
 *   subtitle="Scroll to explore"
 *   pinDuration="+=240%"
 * >
 *   <h2>Below the fold</h2>
 *   <p>This content slides up after the image fills the screen.</p>
 * </ScrollImageReveal>
 */
export function ScrollImageReveal({
  src,
  alt = '',
  title,
  subtitle,
  children,
  pinDuration = '+=220%',
  parallaxSpeed = 80,
  initialFrame = { width: '62%', height: '62vh' },
  scrub = 1.2,
  sectionBackground = '#07070e',
  overlayColor = 'rgba(0, 0, 0, 0.45)',
  className,
  style,
}: ScrollImageRevealProps) {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const frameRef    = useRef<HTMLDivElement>(null);
  const imageRef    = useRef<HTMLImageElement>(null);
  const overlayRef  = useRef<HTMLDivElement>(null);
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const drawerRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isBrowser) return;
    const els = [sectionRef, frameRef, imageRef, overlayRef, drawerRef];
    if (els.some((r) => !r.current)) return;

    registerGSAP();

    const ctx = gsap.context(() => {
      // ── Master timeline, scrubbed to scroll ──────────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: pinDuration,
          pin: true,
          pinSpacing: true,
          scrub,
          anticipatePin: 1,
        },
      });

      // ── Phase 1 (0 → 0.45): frame expands to fullscreen ──────────────────
      tl.fromTo(
        frameRef.current,
        {
          width: initialFrame.width,
          height: initialFrame.height,
          borderRadius: '1.25rem',
        },
        {
          width: '100%',
          height: '100vh',
          borderRadius: 0,
          ease: 'power2.inOut',
          duration: 0.45,
        },
        0,
      );

      // ── Phase 1 (parallel): image parallaxes inside the frame ─────────────
      // Image is slightly oversized (scale > 1) so it always fills the frame.
      tl.fromTo(
        imageRef.current,
        { scale: 1.18, y: -parallaxSpeed / 2 },
        {
          scale: 1.05,
          y: parallaxSpeed / 2,
          ease: 'none',
          duration: 0.45,
        },
        0,
      );

      // ── Phase 1→2: overlay fades in ──────────────────────────────────────
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, ease: 'power1.inOut', duration: 0.2 },
        0.3,
      );

      // ── Phase 2 (0.45 → 0.72): title + subtitle stagger in ───────────────
      const textTargets = [titleRef.current, subtitleRef.current].filter(Boolean);
      if (textTargets.length) {
        tl.fromTo(
          textTargets,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            ease: 'power3.out',
            stagger: 0.08,
            duration: 0.22,
          },
          0.48,
        );
      }

      // ── Phase 3 (0.72 → 1.0): drawer slides up ───────────────────────────
      if (drawerRef.current && children) {
        tl.fromTo(
          drawerRef.current,
          { y: '100%' },
          {
            y: '0%',
            ease: 'power3.inOut',
            duration: 0.28,
          },
          0.72,
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [pinDuration, parallaxSpeed, initialFrame.width, initialFrame.height, scrub, children]);

  return (
    <div
      ref={sectionRef}
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: sectionBackground,
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* ── Image frame (expands) ── */}
      <div
        ref={frameRef}
        style={{
          position: 'relative',
          overflow: 'hidden',
          flexShrink: 0,
          // initial values set by GSAP fromTo, these are fallback
          width: initialFrame.width,
          height: initialFrame.height,
          borderRadius: '1.25rem',
        }}
      >
        {/* The actual image with parallax */}
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            // will-change is set/cleared by GSAP
          }}
        />

        {/* Dark overlay */}
        <div
          ref={overlayRef}
          style={{
            position: 'absolute',
            inset: 0,
            background: overlayColor,
            opacity: 0,
          }}
        />

        {/* Overlay text */}
        {(title || subtitle) && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              padding: '2rem',
              textAlign: 'center',
              color: '#fff',
              zIndex: 2,
            }}
          >
            {title && (
              <h2
                ref={titleRef}
                style={{
                  fontSize: 'clamp(2rem, 5vw, 4.5rem)',
                  fontWeight: 900,
                  lineHeight: 1.1,
                  opacity: 0,
                  maxWidth: '16ch',
                  textShadow: '0 2px 24px rgba(0,0,0,0.4)',
                }}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                ref={subtitleRef}
                style={{
                  fontSize: 'clamp(1rem, 2vw, 1.35rem)',
                  opacity: 0,
                  maxWidth: '48ch',
                  lineHeight: 1.6,
                  color: 'rgba(255,255,255,0.85)',
                  textShadow: '0 1px 12px rgba(0,0,0,0.5)',
                }}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* ── Drawer: slides up from bottom of the frame ── */}
        {children && (
          <div
            ref={drawerRef}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              // Translate starts at 100% (off-screen below), animated to 0%
              transform: 'translateY(100%)',
              background: 'rgba(7, 7, 14, 0.96)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              padding: 'clamp(2rem, 5vw, 4rem)',
              zIndex: 3,
              maxHeight: '55%',
              overflowY: 'auto',
            }}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
