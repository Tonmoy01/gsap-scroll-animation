'use client';

import { FadeInOnScroll } from 'react-scroll-motion-kit';

export default function Footer() {
  return (
    <FadeInOnScroll as="footer">
      <p>
        Built with{' '}
        <strong style={{ color: 'var(--accent-2)' }}>react-scroll-motion-kit</strong>
        {' '}by Tonmoy Khan
      </p>
      <p style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>
        MIT License · Powered by GSAP ScrollTrigger
      </p>
    </FadeInOnScroll>
  );
}
