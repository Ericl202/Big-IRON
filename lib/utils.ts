import { Product, RetailerListing, StateRestrictionLevel } from './types';

export function minPrice(p: Product): number {
  return Math.min(...p.listings.map((l) => l.price));
}

export function hasFinancing(p: Product): boolean {
  return p.listings.some((l) => l.financing);
}

export function savingsPct(p: Product): number {
  const lo = minPrice(p);
  const peak = Math.max(...p.priceHistory);
  if (peak <= lo) return 0;
  return Math.round(((peak - lo) / peak) * 100);
}

export function isAtAllTimeLow(p: Product): boolean {
  return minPrice(p) <= p.allTimeLow;
}

export function formatPrice(n: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

export function bestListing(p: Product): RetailerListing {
  return [...p.listings].sort((a, b) => a.price - b.price)[0];
}

export const LEVEL_COLORS: Record<StateRestrictionLevel, { bg: string; text: string; border: string }> = {
  permissive: { bg: 'bg-green-50', text: 'text-green-900', border: 'border-green-200' },
  standard: { bg: 'bg-blue-50', text: 'text-blue-900', border: 'border-blue-200' },
  regulated: { bg: 'bg-amber-50', text: 'text-amber-900', border: 'border-amber-200' },
  restricted: { bg: 'bg-red-50', text: 'text-red-900', border: 'border-red-200' },
};

export const CAT_LABELS: Record<string, string> = {
  handgun: 'Handguns',
  rifle: 'Rifles',
  shotgun: 'Shotguns',
  ammo: 'Ammo',
  parts: 'Parts & Accessories',
};
