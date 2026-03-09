'use client';

import { FadeInOnScroll, SlideInOnScroll, ScaleInOnScroll } from 'react-scroll-motion-kit';

export default function SlideSection() {
  return (
    <section>
      <FadeInOnScroll>
        <span className="label">Slide & Scale</span>
      </FadeInOnScroll>
      <FadeInOnScroll delay={0.1}>
        <h2>Directional Entrances</h2>
      </FadeInOnScroll>

      <div className="card-grid" style={{ maxWidth: 960 }}>
        <SlideInOnScroll direction="up" distance={70}>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>↑</div>
            <h3>From Bottom</h3>
            <p style={{ fontSize: '0.85rem', marginTop: '0.4rem' }}>direction=&quot;up&quot;</p>
          </div>
        </SlideInOnScroll>

        <SlideInOnScroll direction="left" distance={70} delay={0.1}>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>←</div>
            <h3>From Right</h3>
            <p style={{ fontSize: '0.85rem', marginTop: '0.4rem' }}>direction=&quot;left&quot;</p>
          </div>
        </SlideInOnScroll>

        <SlideInOnScroll direction="right" distance={70} delay={0.2}>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>→</div>
            <h3>From Left</h3>
            <p style={{ fontSize: '0.85rem', marginTop: '0.4rem' }}>direction=&quot;right&quot;</p>
          </div>
        </SlideInOnScroll>

        <SlideInOnScroll direction="down" distance={70} delay={0.3}>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>↓</div>
            <h3>From Top</h3>
            <p style={{ fontSize: '0.85rem', marginTop: '0.4rem' }}>direction=&quot;down&quot;</p>
          </div>
        </SlideInOnScroll>
      </div>

      {/* Scale row */}
      <FadeInOnScroll delay={0.1} style={{ width: '100%', maxWidth: 960 }}>
        <h3 style={{ marginBottom: '1rem', opacity: 0.5, fontWeight: 400 }}>Scale variants</h3>
      </FadeInOnScroll>
      <div className="card-grid" style={{ maxWidth: 960 }}>
        <ScaleInOnScroll fromScale={0.5}>
          <div className="card" style={{ textAlign: 'center' }}>
            <h3>Scale 0.5 → 1</h3>
            <p style={{ fontSize: '0.85rem' }}>fromScale=&#123;0.5&#125;</p>
          </div>
        </ScaleInOnScroll>

        <ScaleInOnScroll fromScale={0.8} ease="back.out(2)" delay={0.12}>
          <div className="card" style={{ textAlign: 'center' }}>
            <h3>Bounce ease</h3>
            <p style={{ fontSize: '0.85rem' }}>ease=&quot;back.out(2)&quot;</p>
          </div>
        </ScaleInOnScroll>

        <ScaleInOnScroll fromScale={1.25} delay={0.24}>
          <div className="card" style={{ textAlign: 'center' }}>
            <h3>Scale down</h3>
            <p style={{ fontSize: '0.85rem' }}>fromScale=&#123;1.25&#125;</p>
          </div>
        </ScaleInOnScroll>
      </div>
    </section>
  );
}
