import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'react-scroll-motion-kit | Demo',
  description:
    'Production-ready scroll animation components for React, powered by GSAP ScrollTrigger.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
