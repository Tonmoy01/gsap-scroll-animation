'use client';

import { FadeInOnScroll, RevealTextOnScroll } from 'react-scroll-motion-kit';

export default function TextRevealSection() {
  return (
    <section>
      <FadeInOnScroll>
        <span className="label">Text Reveal</span>
      </FadeInOnScroll>

      {/* Word split */}
      <RevealTextOnScroll
        text="Words that arrive exactly when you need them."
        splitBy="words"
        stagger={0.07}
        duration={0.7}
        ease="power3.out"
        as="h2"
        style={{
          textAlign: 'center',
          maxWidth: '18ch',
          lineHeight: 1.2,
        }}
      />

      <FadeInOnScroll delay={0.2}>
        <p style={{ textAlign: 'center', maxWidth: '50ch' }}>
          <code
            style={{
              color: 'var(--accent-2)',
              fontFamily: 'monospace',
              fontSize: '0.9em',
            }}
          >
            splitBy=&quot;words&quot;
          </code>{' '}
          — each word slides up and fades in sequentially.
        </p>
      </FadeInOnScroll>

      {/* Char split */}
      <RevealTextOnScroll
        text="GSAP"
        splitBy="chars"
        stagger={0.12}
        duration={0.9}
        ease="back.out(2)"
        as="h1"
        style={{
          letterSpacing: '0.2em',
          fontSize: 'clamp(4rem, 12vw, 8rem)',
          background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      />

      <FadeInOnScroll delay={0.2}>
        <p style={{ textAlign: 'center', maxWidth: '50ch' }}>
          <code
            style={{
              color: 'var(--accent-2)',
              fontFamily: 'monospace',
              fontSize: '0.9em',
            }}
          >
            splitBy=&quot;chars&quot;
          </code>{' '}
          — each character bounces in individually.
        </p>
      </FadeInOnScroll>
    </section>
  );
}
