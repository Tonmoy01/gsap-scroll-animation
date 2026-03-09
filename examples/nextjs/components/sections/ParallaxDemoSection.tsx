'use client';

import { FadeInOnScroll, ParallaxSection } from 'react-scroll-motion-kit';

export default function ParallaxDemoSection() {
  return (
    <section>
      <FadeInOnScroll>
        <span className="label">Parallax</span>
      </FadeInOnScroll>
      <FadeInOnScroll delay={0.1}>
        <h2>Depth on scroll</h2>
      </FadeInOnScroll>
      <FadeInOnScroll delay={0.2}>
        <p style={{ textAlign: 'center', maxWidth: '50ch' }}>
          Wrap any element with{' '}
          <code style={{ color: 'var(--accent-2)', fontFamily: 'monospace' }}>
            &lt;ParallaxSection&gt;
          </code>{' '}
          and it moves at a different rate than the rest of the page.
        </p>
      </FadeInOnScroll>

      {/* Outer clips the parallax overflow */}
      <div className="parallax-container">
        <ParallaxSection speed={90}>
          <div className="parallax-inner">
            <span style={{ fontSize: '3rem' }}>🌊</span>
            <h3 style={{ textAlign: 'center' }}>I move slower than scroll</h3>
            <p style={{ textAlign: 'center', maxWidth: '36ch', fontSize: '0.9rem' }}>
              speed=&#123;90&#125; — shifts 90 px over the element&apos;s scroll range.
              Use a negative value to invert the effect.
            </p>
          </div>
        </ParallaxSection>
      </div>

      {/* Horizontal parallax example */}
      <FadeInOnScroll delay={0.1}>
        <h3 style={{ opacity: 0.6, fontWeight: 400, marginTop: '1rem' }}>
          Horizontal variant
        </h3>
      </FadeInOnScroll>

      <div
        style={{
          overflow: 'hidden',
          borderRadius: 'var(--radius)',
          width: '100%',
          maxWidth: 900,
          height: 200,
          background: 'var(--surface-2)',
          border: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ParallaxSection speed={60} direction="horizontal">
          <div
            style={{
              padding: '1.5rem 3rem',
              borderRadius: 'var(--radius)',
              background: 'linear-gradient(90deg, var(--accent), var(--accent-2))',
              fontWeight: 700,
              fontSize: '1.2rem',
              whiteSpace: 'nowrap',
            }}
          >
            direction=&quot;horizontal&quot; — shifts left/right on scroll
          </div>
        </ParallaxSection>
      </div>
    </section>
  );
}
