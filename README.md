# react-scroll-motion-kit

> Production-ready scroll animation components and hooks for React, powered by GSAP ScrollTrigger.

[![npm version](https://img.shields.io/npm/v/react-scroll-motion-kit)](https://www.npmjs.com/package/react-scroll-motion-kit)
[![bundle size](https://img.shields.io/bundlephobia/minzip/react-scroll-motion-kit)](https://bundlephobia.com/package/react-scroll-motion-kit)
[![license](https://img.shields.io/npm/l/react-scroll-motion-kit)](./LICENSE)

---

## Overview

`react-scroll-motion-kit` gives you **drop-in React components and hooks** for common scroll-based animations without writing a single line of GSAP code yourself.

- **6 animation components** — Fade, Slide, Scale, Stagger, Parallax, Text reveal
- **2 imperative hooks** — `useScrollReveal`, `useParallax`
- **SSR-safe** — no `window` access during server rendering
- **Proper cleanup** — `gsap.context()` and `ScrollTrigger` instances are killed on unmount
- **Tree-shakeable** — ESM build, `sideEffects: false`
- **TypeScript-first** — full type definitions bundled

---

## Installation

```bash
npm install react-scroll-motion-kit
# peer dependencies (if not already installed)
npm install gsap react react-dom
```

> **Peer dependencies**: `react >=17`, `react-dom >=17`, `gsap >=3.12`

---

## Quick Start

```tsx
import {
  FadeInOnScroll,
  SlideInOnScroll,
  StaggerChildrenOnScroll,
} from 'react-scroll-motion-kit';

export default function Page() {
  return (
    <>
      <FadeInOnScroll>
        <h1>Hello, world</h1>
      </FadeInOnScroll>

      <SlideInOnScroll direction="left">
        <p>Slides in from the right side of the screen.</p>
      </SlideInOnScroll>

      <StaggerChildrenOnScroll stagger={0.12}>
        <div>Card 1</div>
        <div>Card 2</div>
        <div>Card 3</div>
      </StaggerChildrenOnScroll>
    </>
  );
}
```

---

## Components

### `<FadeInOnScroll>`

Fades children in when the element enters the viewport.

```tsx
<FadeInOnScroll
  duration={0.8}
  delay={0.1}
  ease="power2.out"
  fromOpacity={0}
  triggerOnce={true}
  start="top 85%"
  className="my-section"
  as="section"
>
  <p>Content</p>
</FadeInOnScroll>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `duration` | `number` | `0.8` | Animation duration in seconds |
| `delay` | `number` | `0` | Delay before animation in seconds |
| `ease` | `EaseString` | `"power2.out"` | GSAP ease |
| `fromOpacity` | `number` | `0` | Starting opacity |
| `triggerOnce` | `boolean` | `true` | Don't replay when scrolling back |
| `start` | `string` | `"top 85%"` | ScrollTrigger start position |
| `className` | `string` | — | CSS class on wrapper |
| `style` | `CSSProperties` | — | Inline styles |
| `as` | `keyof HTMLElementTagNameMap` | `"div"` | HTML tag for wrapper |
| `markers` | `boolean` | `false` | Show ScrollTrigger debug markers |

---

### `<SlideInOnScroll>`

Slides children in from a direction with a fade.

```tsx
<SlideInOnScroll
  direction="up"
  distance={60}
  duration={0.8}
  ease="power3.out"
>
  <Card />
</SlideInOnScroll>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `"up" \| "down" \| "left" \| "right"` | `"up"` | Slide origin direction |
| `distance` | `number` | `60` | Distance in pixels |
| *(+ all BaseScrollProps)* | | | |

---

### `<ScaleInOnScroll>`

Scales and fades children into view.

```tsx
<ScaleInOnScroll fromScale={0.7} ease="back.out(1.4)">
  <img src="poster.jpg" />
</ScaleInOnScroll>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fromScale` | `number` | `0.8` | Starting scale |
| `fromOpacity` | `number` | `0` | Starting opacity |
| *(+ all BaseScrollProps)* | | | |

---

### `<StaggerChildrenOnScroll>`

Staggers the entrance animation of every **direct child**.

```tsx
<StaggerChildrenOnScroll stagger={0.15} childAnimation="slide-up">
  <Card />
  <Card />
  <Card />
</StaggerChildrenOnScroll>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `stagger` | `number` | `0.15` | Interval between child animations |
| `childAnimation` | `"slide-up" \| "fade" \| "scale"` | `"slide-up"` | Per-child animation style |
| `distance` | `number` | `40` | Distance for `slide-up` |
| *(+ all BaseScrollProps)* | | | |

---

### `<ParallaxSection>`

Applies a continuous parallax offset as the user scrolls.

```tsx
<ParallaxSection speed={80} direction="vertical">
  <img src="hero-bg.jpg" className="parallax-img" />
</ParallaxSection>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `speed` | `number` | `50` | Pixel offset magnitude |
| `direction` | `"vertical" \| "horizontal"` | `"vertical"` | Axis of movement |
| `className` | `string` | — | |
| `style` | `CSSProperties` | — | |
| `as` | `keyof HTMLElementTagNameMap` | `"div"` | |

---

### `<RevealTextOnScroll>`

Splits text into words or characters and reveals them with a staggered slide-up.

```tsx
<RevealTextOnScroll
  text="Every word arrives on cue."
  splitBy="words"
  stagger={0.06}
  as="h2"
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | *required* | Plain text to animate |
| `splitBy` | `"words" \| "chars"` | `"words"` | Split granularity |
| `stagger` | `number` | `0.05` | Interval between segments |
| `duration` | `number` | `0.6` | Per-segment duration |
| `delay` | `number` | `0` | Delay before first segment |
| `ease` | `EaseString` | `"power3.out"` | GSAP ease |
| `triggerOnce` | `boolean` | `true` | |
| `start` | `string` | `"top 85%"` | |
| `as` | `keyof HTMLElementTagNameMap` | `"p"` | Wrapper element |
| `className` | `string` | — | |
| `style` | `CSSProperties` | — | |
| `markers` | `boolean` | `false` | |

---

## Hooks

### `useScrollReveal<T>`

Full-control scroll reveal for any element.

```tsx
import { useScrollReveal } from 'react-scroll-motion-kit';

function MyComponent() {
  const { ref } = useScrollReveal<HTMLDivElement>({
    fromY: 50,
    fromOpacity: 0,
    duration: 1,
    ease: 'expo.out',
    triggerOnce: true,
  });

  return <div ref={ref}>Animated on scroll</div>;
}
```

**Options:**

| Option | Type | Default |
|--------|------|---------|
| `duration` | `number` | `0.8` |
| `delay` | `number` | `0` |
| `ease` | `EaseString` | `"power3.out"` |
| `fromOpacity` | `number` | `0` |
| `fromY` | `number` | `40` |
| `fromX` | `number` | `0` |
| `fromScale` | `number` | `1` |
| `triggerOnce` | `boolean` | `true` |
| `start` | `string` | `"top 85%"` |
| `markers` | `boolean` | `false` |

**Returns:** `{ ref: React.RefObject<T> }`

---

### `useParallax<T>`

Imperative parallax for any element.

```tsx
import { useParallax } from 'react-scroll-motion-kit';

function BackgroundImage() {
  const { ref } = useParallax<HTMLImageElement>({ speed: 80 });
  return <img ref={ref} src="bg.jpg" />;
}
```

**Options:**

| Option | Type | Default |
|--------|------|---------|
| `speed` | `number` | `50` |
| `direction` | `"vertical" \| "horizontal"` | `"vertical"` |

**Returns:** `{ ref: React.RefObject<T> }`

---

## Local Development

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/react-scroll-motion-kit
cd react-scroll-motion-kit

# 2. Install dependencies
npm install

# 3. Build in watch mode
npm run dev

# 4. In another terminal, run the demo
cd examples/demo
npm install
npm run dev
```

### Running Tests

```bash
npm test              # run tests once
npm run test:watch    # run in watch mode
npm run test:coverage # with coverage report
```

### Type Checking

```bash
npm run type-check
```

---

## Build

```bash
npm run build
```

Output lands in `dist/`:
```
dist/
  index.js      (ESM)
  index.cjs     (CommonJS)
  index.d.ts    (types – ESM)
  index.d.cts   (types – CJS)
  index.js.map
  index.cjs.map
```

---

## Publishing to npm

```bash
# Ensure you are logged in
npm login

# Bump version (patch | minor | major)
npm version patch

# Build + publish
npm run release
```

The `prepublishOnly` script runs `type-check` then `build` automatically.

---

## Troubleshooting

**Animations not triggering**

- Confirm `gsap` is installed (`npm ls gsap`).
- The library registers `ScrollTrigger` once automatically — do **not** call `gsap.registerPlugin(ScrollTrigger)` again or it may conflict.

**Animations play on page load, not on scroll**

- Check your `start` prop — the default `"top 85%"` means the animation plays when the top of the element is 85% down the viewport. For elements already in view on load, use `start="top 60%"`.

**SSR / Next.js: "window is not defined"**

- All components guard against SSR. If you still see errors, ensure you are not importing from a path that bypasses the package entry point.

**Animations play twice in React 18 Strict Mode (dev only)**

- React 18 intentionally mounts/unmounts/remounts effects in development. The animations will behave correctly in production. You can disable `<StrictMode>` locally while debugging animations.

**Parallax causes layout shift**

- Wrap the element in a container with `overflow: hidden` and give it an explicit height. The parallax element should be slightly taller than the container.

---

## License

MIT © Tonmoy Khan
