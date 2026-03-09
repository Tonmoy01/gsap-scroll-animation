'use client';

import { FadeInOnScroll, RevealTextOnScroll } from 'react-scroll-motion-kit';

export default function HeroSection() {
  return (
    <section className="hero-gradient" style={{ minHeight: '100vh' }}>
      <FadeInOnScroll delay={0} duration={0.7}>
        <span className="badge">✦ react-scroll-motion-kit</span>
      </FadeInOnScroll>

      <div className="hero-text">
        <RevealTextOnScroll
          text="Scroll Animations. Zero Boilerplate."
          splitBy="words"
          stagger={0.08}
          duration={0.75}
          ease="expo.out"
          as="h1"
          style={{ textAlign: 'center' }}
        />
      </div>

      <FadeInOnScroll delay={0.5} duration={0.9}>
        <p style={{ textAlign: 'center', maxWidth: '55ch', fontSize: '1.15rem' }}>
          Drop-in React components and hooks powered by GSAP ScrollTrigger.
          Fade, slide, scale, parallax, stagger, and text reveal — all SSR-safe,
          fully typed, tree-shakeable.
        </p>
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.7}>
        <div className="hero-cta">
          <a href="#features" className="btn btn-primary">Explore Features ↓</a>
          <a
            href="https://github.com/yourusername/react-scroll-motion-kit"
            className="btn btn-ghost"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
        </div>
      </FadeInOnScroll>
    </section>
  );
}
