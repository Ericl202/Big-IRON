import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/lib/store';

export const metadata: Metadata = {
  title: 'Big IRON — Firearm & Ammo Price Comparison',
  description: 'Compare prices across 4,200+ verified firearm dealers. State compliance filtering, local dealer stock, deal alerts, and financing options.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
