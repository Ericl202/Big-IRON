'use client';

import React, { useState } from 'react';
import { Bell, CheckCircle } from 'lucide-react';
import { useApp } from '@/lib/store';
import { formatPrice, minPrice } from '@/lib/utils';
import { Product } from '@/lib/types';

export default function AlertTab({ product }: { product: Product }) {
  const { alerts, addAlert } = useApp();
  const existing = alerts.find((a) => a.productId === product.id);

  const [targetPrice, setTargetPrice] = useState(existing?.targetPrice?.toString() ?? '');
  const [email, setEmail] = useState(existing?.email ?? '');
  const [saved, setSaved] = useState(!!existing);
  const [error, setError] = useState('');

  const current = minPrice(product);

  const handleSave = () => {
    const price = parseFloat(targetPrice);
    if (!price || price <= 0) { setError('Enter a valid price.'); return; }
    if (!email.includes('@')) { setError('Enter a valid email address.'); return; }
    setError('');
    addAlert({ productId: product.id, targetPrice: price, email });
    setSaved(true);
  };

  return (
    <div>
      <div className="bg-zinc-50 border border-zinc-100 rounded-xl p-4">
        <p className="text-xs text-zinc-500 mb-3">
          Get notified when this price drops below your target. Current price:{' '}
          <strong className="text-zinc-900">{formatPrice(current)}</strong>
        </p>

        <div className="flex flex-col sm:flex-row gap-2 mb-3">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400">$</span>
            <input
              type="number"
              value={targetPrice}
              onChange={(e) => { setTargetPrice(e.target.value); setSaved(false); }}
              placeholder="Target price"
              className="h-9 pl-6 pr-3 w-full sm:w-36 text-sm border border-zinc-200 rounded-lg bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
            />
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setSaved(false); }}
            placeholder="your@email.com"
            className="h-9 px-3 flex-1 text-sm border border-zinc-200 rounded-lg bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
          />
          <button
            onClick={handleSave}
            className="h-9 px-4 bg-zinc-900 text-white text-sm font-medium rounded-lg hover:bg-zinc-700 transition-colors whitespace-nowrap"
          >
            Set alert
          </button>
        </div>

        {error && <p className="text-xs text-red-600 mb-2">{error}</p>}

        {saved && (
          <div className="flex items-center gap-2 text-sm text-green-800 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
            <CheckCircle className="w-4 h-4 shrink-0" />
            Alert set for {formatPrice(parseFloat(targetPrice))}. We&apos;ll email you when the price drops.
          </div>
        )}
      </div>

      <p className="mt-3 text-[11px] text-zinc-400">
        Alerts are checked every 15 minutes. You can set one alert per product. Unsubscribe anytime.
      </p>
    </div>
  );
}
