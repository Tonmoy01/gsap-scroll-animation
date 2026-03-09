'use client';

import { FadeInOnScroll, StaggerChildrenOnScroll } from 'react-scroll-motion-kit';

const features = [
  {
    icon: '🎞️',
    title: 'FadeInOnScroll',
    desc: 'Smooth opacity transition when elements enter the viewport.',
    code: '<FadeInOnScroll duration={0.8}>',
  },
  {
    icon: '➡️',
    title: 'SlideInOnScroll',
    desc: 'Slide from any direction — up, down, left, or right.',
    code: '<SlideInOnScroll direction="left">',
  },
  {
    icon: '🔍',
    title: 'ScaleInOnScroll',
    desc: 'Pop elements into view with a satisfying scale animation.',
    code: '<ScaleInOnScroll fromScale={0.7}>',
  },
  {
    icon: '🎴',
    title: 'StaggerChildrenOnScroll',
    desc: 'Cascade animations across a list or grid of children.',
    code: '<StaggerChildrenOnScroll stagger={0.12}>',
  },
  {
    icon: '🌊',
    title: 'ParallaxSection',
    desc: 'Depth-based scrolling for backgrounds and hero elements.',
    code: '<ParallaxSection speed={80}>',
  },
  {
    icon: '✍️',
    title: 'RevealTextOnScroll',
    desc: 'Word-by-word or character-by-character text reveal.',
    code: '<RevealTextOnScroll splitBy="words">',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features">
      <FadeInOnScroll>
        <span className="label">Components</span>
      </FadeInOnScroll>
      <FadeInOnScroll delay={0.1}>
        <h2 style={{ textAlign: 'center' }}>Everything you need</h2>
      </FadeInOnScroll>

      <StaggerChildrenOnScroll
        stagger={0.1}
        childAnimation="slide-up"
        distance={50}
        className="card-grid"
      >
        {features.map((f) => (
          <div key={f.title} className="card">
            <div className="feature-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>{f.desc}</p>
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
              }}
            >
              {f.code}
            </code>
          </div>
        ))}
      </StaggerChildrenOnScroll>
    </section>
  );
}
