'use client';

import { useState } from 'react';
import { FadeInOnScroll, ScrollPin } from 'react-scroll-motion-kit';

export default function ScrollPinSection() {
  const [progress, setProgress] = useState(0);

  return (
    <section style={{ minHeight: 'auto', paddingBottom: 0 }}>
      <FadeInOnScroll>
        <span className="label">Scroll Pin</span>
      </FadeInOnScroll>
      <FadeInOnScroll delay={0.1}>
        <h2 style={{ textAlign: 'center' }}>Pin while scrolling</h2>
      </FadeInOnScroll>
      <FadeInOnScroll delay={0.2}>
        <p style={{ textAlign: 'center', maxWidth: '52ch', marginBottom: '3rem' }}>
          The card below stays fixed on screen while you scroll through it.
          The progress bar is driven by the{' '}
          <code style={{ color: 'var(--accent-2)', fontFamily: 'monospace' }}>
            onProgress
          </code>{' '}
          callback.
        </p>
      </FadeInOnScroll>

      <ScrollPin
        pinDuration="+=120%"
        start="top top"
        onProgress={(p) => setProgress(Math.round(p * 100))}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '6rem 2rem',
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(108,99,255,0.12) 0%, transparent 70%)',
        }}
      >
        <div
          className="card"
          style={{
            maxWidth: 520,
            width: '100%',
            textAlign: 'center',
            padding: '3rem 2.5rem',
          }}
        >
          <span className="label">ScrollPin</span>
          <h3 style={{ marginTop: '0.5rem', fontSize: '1.5rem' }}>
            Pinned Section
          </h3>
          <p style={{ fontSize: '0.9rem', marginTop: '0.75rem' }}>
            Keep scrolling — this card stays put. Use the{' '}
            <code style={{ color: 'var(--accent-2)' }}>pinDuration</code> prop
            to control how long it sticks.
          </p>

          {/* Progress ring */}
          <div style={{ margin: '2rem auto 0', position: 'relative', width: 100, height: 100 }}>
            <svg width="100" height="100" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="8" />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="url(#grad)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 42}`}
                strokeDashoffset={`${2 * Math.PI * 42 * (1 - progress / 100)}`}
                style={{ transition: 'stroke-dashoffset 80ms linear' }}
              />
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6c63ff" />
                  <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
              </defs>
            </svg>
            <span
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: '1.4rem',
                background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {progress}%
            </span>
          </div>
        </div>
      </ScrollPin>
    </section>
  );
}
