'use client';

import { FadeInOnScroll, StaggerChildrenOnScroll } from 'react-scroll-motion-kit';
import { useScrollReveal, useParallax } from 'react-scroll-motion-kit';

function ScrollRevealDemo() {
  const { ref } = useScrollReveal<HTMLDivElement>({
    fromY: 60,
    fromOpacity: 0,
    duration: 1,
    ease: 'expo.out',
  });

  return (
    <div ref={ref} className="card" style={{ textAlign: 'center' }}>
      <div className="feature-icon" style={{ margin: '0 auto 1rem' }}>🪝</div>
      <span className="label">useScrollReveal</span>
      <h3 style={{ marginTop: '0.5rem' }}>Revealed via hook</h3>
      <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
        Attach the returned <code style={{ color: 'var(--accent-2)' }}>ref</code> to
        any DOM element for full imperative control.
      </p>
      <code
        style={{
          display: 'block',
          marginTop: '1rem',
          fontSize: '0.75rem',
          color: 'var(--accent-2)',
          background: 'rgba(108,99,255,0.08)',
          padding: '0.4rem 0.75rem',
          borderRadius: '0.4rem',
          fontFamily: 'monospace',
          textAlign: 'left',
        }}
      >
        {`const { ref } = useScrollReveal({ fromY: 60 })`}
      </code>
    </div>
  );
}

function ParallaxHookDemo() {
  const { ref } = useParallax<HTMLDivElement>({ speed: 50 });

  return (
    <div
      ref={ref}
      className="card"
      style={{
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(108,99,255,0.15), rgba(167,139,250,0.1))',
      }}
    >
      <div className="feature-icon" style={{ margin: '0 auto 1rem' }}>🌊</div>
      <span className="label">useParallax</span>
      <h3 style={{ marginTop: '0.5rem' }}>Floating on scroll</h3>
      <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
        This card shifts vertically at a different rate as you scroll —
        a subtle depth effect with one line of code.
      </p>
      <code
        style={{
          display: 'block',
          marginTop: '1rem',
          fontSize: '0.75rem',
          color: 'var(--accent-2)',
          background: 'rgba(108,99,255,0.08)',
          padding: '0.4rem 0.75rem',
          borderRadius: '0.4rem',
          fontFamily: 'monospace',
          textAlign: 'left',
        }}
      >
        {`const { ref } = useParallax({ speed: 50 })`}
      </code>
    </div>
  );
}

export default function HooksSection() {
  return (
    <section>
      <FadeInOnScroll>
        <span className="label">Imperative Hooks</span>
      </FadeInOnScroll>
      <FadeInOnScroll delay={0.1}>
        <h2 style={{ textAlign: 'center' }}>When you need full control</h2>
      </FadeInOnScroll>
      <FadeInOnScroll delay={0.2}>
        <p style={{ textAlign: 'center', maxWidth: '52ch' }}>
          Prefer hooks over wrapper components? Both{' '}
          <code style={{ color: 'var(--accent-2)', fontFamily: 'monospace' }}>useScrollReveal</code>{' '}
          and{' '}
          <code style={{ color: 'var(--accent-2)', fontFamily: 'monospace' }}>useParallax</code>{' '}
          expose a simple ref — attach it to any element.
        </p>
      </FadeInOnScroll>

      <StaggerChildrenOnScroll
        stagger={0.15}
        childAnimation="slide-up"
        className="card-grid"
        style={{ maxWidth: 780 }}
      >
        <ScrollRevealDemo />
        <ParallaxHookDemo />
      </StaggerChildrenOnScroll>
    </section>
  );
}
