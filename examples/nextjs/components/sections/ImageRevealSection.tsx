'use client';

import { ScrollImageReveal } from 'react-scroll-motion-kit';

/**
 * Demonstrates ScrollImageReveal — a three-phase cinematic sequence:
 *   1. Image frame expands from card → fullscreen (with inner parallax)
 *   2. Overlay title + subtitle fade in
 *   3. Content drawer slides up from the bottom
 */
export default function ImageRevealSection() {
  return (
    <>
      {/* Label above the pinned section (not inside it so it isn't clipped) */}
      <section style={{ minHeight: 'auto', padding: '5rem 2rem 3rem' }}>
        <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
          <span className="label">ScrollImageReveal</span>
          <h2 style={{ marginTop: '0.75rem' }}>Cinematic image expand</h2>
          <p style={{ marginTop: '1rem', maxWidth: '52ch', margin: '1rem auto 0' }}>
            Scroll down to watch the image grow from a contained card to full
            screen, with a parallax effect on the image itself, then a content
            drawer that slides up from the bottom.
          </p>
        </div>
      </section>

      <ScrollImageReveal
        /* High-res landscape from Unsplash (loads remotely).
           Swap with any local /public image path like "/hero.jpg" */
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&q=80"
        alt="Scenic mountain landscape"
        title="Where stories begin"
        subtitle="A single component. Three phases. One seamless scroll."
        pinDuration="+=240%"
        parallaxSpeed={90}
        scrub={1.3}
        overlayColor="rgba(4, 4, 18, 0.52)"
        sectionBackground="#07070e"
      >
        {/* ── Drawer content ─────────────────────────────────────────────── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            maxWidth: 860,
            margin: '0 auto',
          }}
        >
          <div>
            <span className="label">Phase 1</span>
            <h3 style={{ marginTop: '0.5rem', color: '#f0f0f8' }}>Image Expand</h3>
            <p style={{ fontSize: '0.875rem', marginTop: '0.4rem' }}>
              The frame grows from{' '}
              <code style={{ color: 'var(--accent-2)' }}>62% × 62vh</code> to{' '}
              <code style={{ color: 'var(--accent-2)' }}>100vw × 100vh</code>.
              Border-radius collapses as it fills the screen.
            </p>
          </div>

          <div>
            <span className="label">Phase 2</span>
            <h3 style={{ marginTop: '0.5rem', color: '#f0f0f8' }}>Parallax + Text</h3>
            <p style={{ fontSize: '0.875rem', marginTop: '0.4rem' }}>
              The image inside moves at a different rate than the frame —
              creating real depth. Title and subtitle stagger in over the overlay.
            </p>
          </div>

          <div>
            <span className="label">Phase 3</span>
            <h3 style={{ marginTop: '0.5rem', color: '#f0f0f8' }}>Drawer Reveal</h3>
            <p style={{ fontSize: '0.875rem', marginTop: '0.4rem' }}>
              This panel slides up from the bottom of the fullscreen image.
              Pass any JSX as <code style={{ color: 'var(--accent-2)' }}>children</code>.
            </p>
          </div>
        </div>

        <div
          style={{
            marginTop: '2rem',
            maxWidth: 860,
            margin: '2rem auto 0',
            background: 'rgba(108,99,255,0.08)',
            border: '1px solid rgba(108,99,255,0.2)',
            borderRadius: '0.75rem',
            padding: '1rem 1.25rem',
            fontFamily: 'monospace',
            fontSize: '0.78rem',
            color: 'var(--accent-2)',
            lineHeight: 1.7,
            whiteSpace: 'pre',
          }}
        >
{`<ScrollImageReveal
  src="/hero.jpg"
  title="Where stories begin"
  subtitle="One seamless scroll."
  pinDuration="+=240%"
  parallaxSpeed={90}
  scrub={1.3}
>
  <p>This slides up as a drawer.</p>
</ScrollImageReveal>`}
        </div>
      </ScrollImageReveal>
    </>
  );
}
