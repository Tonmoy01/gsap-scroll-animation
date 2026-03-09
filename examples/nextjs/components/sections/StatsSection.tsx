'use client';

import { FadeInOnScroll, StaggerChildrenOnScroll } from 'react-scroll-motion-kit';

const stats = [
  { number: '6',    label: 'Animation Components' },
  { number: '2',    label: 'Imperative Hooks' },
  { number: '~6kb', label: 'Minified + Gzipped' },
  { number: '0',    label: 'Config Required' },
];

export default function StatsSection() {
  return (
    <section>
      <FadeInOnScroll>
        <span className="label">By the numbers</span>
      </FadeInOnScroll>

      <StaggerChildrenOnScroll
        stagger={0.1}
        childAnimation="scale"
        className="stats-grid"
      >
        {stats.map((s) => (
          <div key={s.label} className="stat-card">
            <div className="stat-number">{s.number}</div>
            <p style={{ marginTop: '0.25rem', fontSize: '0.9rem' }}>{s.label}</p>
          </div>
        ))}
      </StaggerChildrenOnScroll>
    </section>
  );
}
