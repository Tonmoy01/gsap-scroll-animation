'use client';

import { FadeInOnScroll, ScrubReveal } from 'react-scroll-motion-kit';

export default function ScrubSection() {
  return (
    <section>
      <FadeInOnScroll>
        <span className="label">Scrub Reveal</span>
      </FadeInOnScroll>
      <FadeInOnScroll delay={0.1}>
        <h2 style={{ textAlign: 'center' }}>Tied to your scroll</h2>
      </FadeInOnScroll>
      <FadeInOnScroll delay={0.2}>
        <p style={{ textAlign: 'center', maxWidth: '52ch' }}>
          Unlike triggered animations, scrub animations play forward and
          backward as you scroll — perfectly synced to your finger or wheel.
        </p>
      </FadeInOnScroll>

      {/* Slow smooth scrub */}
      <ScrubReveal
        fromY={120}
        fromOpacity={0}
        fromScale={0.9}
        scrub={1.5}
        start="top 90%"
        end="center 40%"
      >
        <div
          className="card"
          style={{
            maxWidth: 600,
            width: '100%',
            textAlign: 'center',
            borderColor: 'rgba(108,99,255,0.3)',
          }}
        >
          <span className="label">scrub=&#123;1.5&#125;</span>
          <h3 style={{ marginTop: '0.5rem' }}>Smooth lag scrub</h3>
          <p style={{ fontSize: '0.875rem', marginTop: '0.4rem' }}>
            1.5 second lag behind scroll — silky smooth entrance.
          </p>
        </div>
      </ScrubReveal>

      {/* Instant scrub */}
      <ScrubReveal
        fromY={0}
        fromX={-100}
        fromOpacity={0}
        fromScale={1}
        scrub={true}
        start="top 85%"
        end="center 50%"
      >
        <div
          className="card"
          style={{
            maxWidth: 600,
            width: '100%',
            textAlign: 'center',
            borderColor: 'rgba(167,139,250,0.3)',
          }}
        >
          <span className="label">scrub=&#123;true&#125;</span>
          <h3 style={{ marginTop: '0.5rem' }}>Instant scrub</h3>
          <p style={{ fontSize: '0.875rem', marginTop: '0.4rem' }}>
            Locks 1:1 to scroll — slides in from the left.
          </p>
        </div>
      </ScrubReveal>
    </section>
  );
}
