'use client';

import { useState } from 'react';
import { FadeInOnScroll } from 'react-scroll-motion-kit';
import { useScrollProgress, useScrollTrigger } from 'react-scroll-motion-kit';

function ProgressDemo() {
  const [percent, setPercent] = useState(0);
  const [active, setActive] = useState(false);

  const { ref } = useScrollProgress<HTMLDivElement>({
    start: 'top 70%',
    end: 'bottom 30%',
    onUpdate: (p) => setPercent(Math.round(p * 100)),
    onEnter: () => setActive(true),
    onLeave: () => setActive(false),
  });

  return (
    <div ref={ref} className="card" style={{ maxWidth: 560, width: '100%' }}>
      <span className="label">useScrollProgress</span>
      <h3 style={{ marginTop: '0.5rem' }}>Live scroll progress</h3>
      <p style={{ fontSize: '0.875rem', marginTop: '0.4rem', marginBottom: '1.25rem' }}>
        Scroll through this card to see progress update in real time.
      </p>

      {/* Progress bar */}
      <div
        style={{
          width: '100%',
          height: 8,
          background: 'rgba(255,255,255,0.08)',
          borderRadius: 999,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${percent}%`,
            background: 'linear-gradient(90deg, var(--accent), var(--accent-2))',
            borderRadius: 999,
            transition: 'width 50ms linear',
          }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '0.75rem',
        }}
      >
        <span
          style={{
            fontSize: '2rem',
            fontWeight: 900,
            background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {percent}%
        </span>
        <span
          style={{
            fontSize: '0.75rem',
            padding: '0.25rem 0.75rem',
            borderRadius: 999,
            background: active ? 'rgba(108,99,255,0.2)' : 'rgba(255,255,255,0.05)',
            color: active ? 'var(--accent-2)' : 'var(--muted)',
            transition: 'all 0.3s',
          }}
        >
          {active ? '● in viewport' : '○ out of viewport'}
        </span>
      </div>
    </div>
  );
}

function ToggleClassDemo() {
  const { ref } = useScrollTrigger<HTMLDivElement>({
    start: 'top 65%',
    end: 'bottom 35%',
    toggleActions: 'play none none reverse',
    onEnter: () => {
      // Example: could toggle a nav class, analytics event, etc.
      console.log('[useScrollTrigger] entered');
    },
    onLeave: () => {
      console.log('[useScrollTrigger] left');
    },
  });

  return (
    <div ref={ref} className="card" style={{ maxWidth: 560, width: '100%' }}>
      <span className="label">useScrollTrigger</span>
      <h3 style={{ marginTop: '0.5rem' }}>Raw ScrollTrigger access</h3>
      <p style={{ fontSize: '0.875rem', marginTop: '0.4rem' }}>
        Full access to every ScrollTrigger option — <code style={{ color: 'var(--accent-2)' }}>toggleClass</code>,{' '}
        <code style={{ color: 'var(--accent-2)' }}>snap</code>,{' '}
        <code style={{ color: 'var(--accent-2)' }}>onToggle</code>, custom callbacks and more.
        Check the browser console as you scroll this card in and out.
      </p>
      <code
        style={{
          display: 'block',
          marginTop: '1rem',
          fontSize: '0.72rem',
          color: 'var(--accent-2)',
          background: 'rgba(108,99,255,0.08)',
          padding: '0.6rem 0.85rem',
          borderRadius: '0.4rem',
          fontFamily: 'monospace',
          lineHeight: 1.6,
          whiteSpace: 'pre',
        }}
      >
{`const { ref } = useScrollTrigger({
  start: 'top 65%',
  onEnter: () => console.log('entered'),
  toggleClass: { targets: '.nav', className: 'scrolled' },
})`}
      </code>
    </div>
  );
}

export default function ScrollProgressSection() {
  return (
    <section>
      <FadeInOnScroll>
        <span className="label">ScrollTrigger Hooks</span>
      </FadeInOnScroll>
      <FadeInOnScroll delay={0.1}>
        <h2 style={{ textAlign: 'center' }}>Maximum control</h2>
      </FadeInOnScroll>
      <FadeInOnScroll delay={0.2}>
        <p style={{ textAlign: 'center', maxWidth: '52ch' }}>
          Need live scroll data or the raw GSAP ScrollTrigger API?
          These hooks give you direct access — no wrappers, no limits.
        </p>
      </FadeInOnScroll>

      <ProgressDemo />
      <ToggleClassDemo />
    </section>
  );
}
