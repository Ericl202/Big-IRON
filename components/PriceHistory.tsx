'use client';

import React from 'react';
import { TrendingDown } from 'lucide-react';
import { Product } from '@/lib/types';
import { minPrice, formatPrice, isAtAllTimeLow } from '@/lib/utils';

const WEEK_LABELS = ['6w ago', '5w', '4w', '3w', '2w', '1w', 'Now'];

export default function PriceHistory({ product }: { product: Product }) {
  const hist = product.priceHistory;
  const lo = minPrice(product);
  const histMax = Math.max(...hist);
  const histMin = Math.min(...hist);
  const range = histMax - histMin || 1;
  const atLow = isAtAllTimeLow(product);

  return (
    <div>
      <div className="flex items-center justify-between mb-3 text-xs text-zinc-500">
        <span>Price trend — 7 weeks</span>
        <span>
          All-time low:{' '}
          <strong className="text-zinc-900">{formatPrice(product.allTimeLow)}</strong>
          {' · '}
          Current:{' '}
          <strong className="text-blue-700">{formatPrice(lo)}</strong>
        </span>
      </div>

      <div className="flex items-end gap-1 h-16">
        {hist.map((v, i) => {
          const pct = Math.round(((v - histMin) / range) * 75 + 20);
          const isCurrent = i === hist.length - 1;
          const isLowest = v === histMin;
          return (
            <div
              key={i}
              title={formatPrice(v)}
              className={`flex-1 rounded-t transition-colors ${
                isCurrent
                  ? 'bg-blue-600 border border-blue-700'
                  : isLowest
                  ? 'bg-green-700 border border-green-800'
                  : 'bg-zinc-100 border border-zinc-200'
              }`}
              style={{ height: `${pct}%`, minHeight: '4px' }}
            />
          );
        })}
      </div>

      <div className="flex justify-between mt-1.5">
        {WEEK_LABELS.map((w) => (
          <span key={w} className="text-[10px] text-zinc-400 flex-1 text-center">
            {w}
          </span>
        ))}
      </div>

      {atLow && (
        <div className="mt-3 flex items-center gap-1.5 text-xs text-green-800 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
          <TrendingDown className="w-3.5 h-3.5 shrink-0" />
          This is the lowest price we&apos;ve tracked. Good time to buy.
        </div>
      )}
    </div>
  );
}
