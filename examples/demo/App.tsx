import React from 'react';
import {
  FadeInOnScroll,
  SlideInOnScroll,
  ScaleInOnScroll,
  StaggerChildrenOnScroll,
  ParallaxSection,
  RevealTextOnScroll,
  useScrollReveal,
  useParallax,
} from 'react-scroll-motion-kit';

// ─── Hook demos ───────────────────────────────────────────────────────────────

function HookRevealDemo() {
  const { ref } = useScrollReveal<HTMLDivElement>({
    fromY: 60,
    duration: 1,
    ease: 'expo.out',
  });
  return (
    <div
      ref={ref}
      style={{
        background: '#1a1a2e',
        padding: '2rem',
        borderRadius: '1rem',
        width: '100%',
        maxWidth: 500,
        textAlign: 'center',
      }}
    >
      <span className="label">useScrollReveal hook</span>
      <h3 style={{ marginTop: '0.5rem' }}>Revealed via hook!</h3>
    </div>
  );
}

function HookParallaxDemo() {
  const { ref } = useParallax<HTMLDivElement>({ speed: 60 });
  return (
    <div
      ref={ref}
      style={{
        background: 'linear-gradient(135deg, #5a4fcf, #8b5cf6)',
        padding: '3rem 2rem',
        borderRadius: '1rem',
        width: '100%',
        maxWidth: 500,
        textAlign: 'center',
      }}
    >
      <span className="label">useParallax hook</span>
      <h3 style={{ marginTop: '0.5rem' }}>Floating on scroll</h3>
    </div>
  );
}

// ─── Main app ─────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <main>
      {/* Hero */}
      <section>
        <FadeInOnScroll duration={1.2} ease="expo.out">
          <span className="label">react-scroll-motion-kit</span>
        </FadeInOnScroll>
        <FadeInOnScroll delay={0.2} duration={1}>
          <h1>Scroll-Powered Animations</h1>
        </FadeInOnScroll>
        <FadeInOnScroll delay={0.4} duration={0.9}>
          <p>
            A production-ready React component library powered by GSAP
            ScrollTrigger. Drop in fade, slide, scale, parallax, stagger, and
            text reveal animations with zero configuration.
          </p>
        </FadeInOnScroll>
      </section>

      <hr />

      {/* Slide in from all directions */}
      <section>
        <FadeInOnScroll><h2>Slide In</h2></FadeInOnScroll>
        <div className="card-grid">
          <SlideInOnScroll direction="up">
            <div className="card">
              <div className="pill">↑ up</div>
              <h3>Slide from bottom</h3>
            </div>
          </SlideInOnScroll>
          <SlideInOnScroll direction="down" delay={0.1}>
            <div className="card">
              <div className="pill">↓ down</div>
              <h3>Slide from top</h3>
            </div>
          </SlideInOnScroll>
          <SlideInOnScroll direction="left" delay={0.2}>
            <div className="card">
              <div className="pill">← left</div>
              <h3>Slide from right</h3>
            </div>
          </SlideInOnScroll>
          <SlideInOnScroll direction="right" delay={0.3}>
            <div className="card">
              <div className="pill">→ right</div>
              <h3>Slide from left</h3>
            </div>
          </SlideInOnScroll>
        </div>
      </section>

      <hr />

      {/* Scale in */}
      <section>
        <FadeInOnScroll><h2>Scale In</h2></FadeInOnScroll>
        <div className="card-grid">
          <ScaleInOnScroll fromScale={0.5}>
            <div className="card">
              <h3>Scale 0.5 → 1</h3>
            </div>
          </ScaleInOnScroll>
          <ScaleInOnScroll fromScale={0.8} ease="back.out(2)" delay={0.15}>
            <div className="card">
              <h3>Scale + bounce</h3>
            </div>
          </ScaleInOnScroll>
          <ScaleInOnScroll fromScale={1.3} delay={0.3}>
            <div className="card">
              <h3>Scale down 1.3 → 1</h3>
            </div>
          </ScaleInOnScroll>
        </div>
      </section>

      <hr />

      {/* Stagger */}
      <section>
        <FadeInOnScroll><h2>Stagger Children</h2></FadeInOnScroll>
        <StaggerChildrenOnScroll
          stagger={0.12}
          childAnimation="slide-up"
          className="card-grid"
          style={{ width: '100%', maxWidth: 900 }}
        >
          {['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta'].map((name) => (
            <div key={name} className="card">
              <h3>{name}</h3>
              <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                Staggered child
              </p>
            </div>
          ))}
        </StaggerChildrenOnScroll>
      </section>

      <hr />

      {/* Text reveal */}
      <section>
        <FadeInOnScroll><h2>Text Reveal</h2></FadeInOnScroll>
        <RevealTextOnScroll
          text="Every word reveals itself exactly when you need it."
          splitBy="words"
          stagger={0.07}
          duration={0.7}
          ease="power3.out"
          as="h2"
          style={{ textAlign: 'center', maxWidth: '16ch', lineHeight: 1.2 }}
        />
        <RevealTextOnScroll
          text="GSAP"
          splitBy="chars"
          stagger={0.1}
          duration={0.8}
          ease="back.out(2)"
          as="h1"
          style={{ letterSpacing: '0.15em', fontSize: '6rem' }}
        />
      </section>

      <hr />

      {/* Parallax */}
      <section className="hero-bg">
        <FadeInOnScroll><h2>Parallax Section</h2></FadeInOnScroll>
        <ParallaxSection speed={80}>
          <div
            style={{
              width: 600,
              height: 300,
              borderRadius: '1rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <p style={{ color: '#fff', fontWeight: 700, fontSize: '1.5rem' }}>
              I move slower than scroll
            </p>
          </div>
        </ParallaxSection>
      </section>

      <hr />

      {/* Hooks */}
      <section>
        <FadeInOnScroll><h2>Imperative Hooks</h2></FadeInOnScroll>
        <HookRevealDemo />
        <HookParallaxDemo />
      </section>

      {/* Footer padding */}
      <section style={{ minHeight: '30vh' }} />
    </main>
  );
}
