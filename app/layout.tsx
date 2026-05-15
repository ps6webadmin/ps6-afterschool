import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'After School Programming | PS 6',
  description: 'Supplemental programming for grades PreK through 5 at PS 6, Lillie D. Blake School.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white">{children}</body>
    </html>
  );
}
