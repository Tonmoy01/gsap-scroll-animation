'use client';

import { useState } from 'react';
import { FadeInOnScroll, RevealTextOnScroll } from 'react-scroll-motion-kit';

const NPM_CMD = 'npm install react-scroll-motion-kit';

export default function HeroSection() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(NPM_CMD).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

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
        </div>
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.85}>
        <button className="npm-copy" onClick={handleCopy} aria-label="Copy install command">
          <span className="npm-cmd">{NPM_CMD}</span>
          <span className="npm-copy-icon">
            {copied ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            )}
          </span>
        </button>
      </FadeInOnScroll>
    </section>
  );
}
