'use client';

import React, { useState } from 'react';
import { Flame, CreditCard, Store, LineChart, Bell, ChevronDown, ChevronUp } from 'lucide-react';
import { Product } from '@/lib/types';
import { TabId } from '@/lib/types';
import { minPrice, formatPrice, hasFinancing, savingsPct, isAtAllTimeLow } from '@/lib/utils';
import { useApp } from '@/lib/store';
import StateCompliance from './StateCompliance';
import OnlineListings from './OnlineListings';
import LocalDealers from './LocalDealers';
import PriceHistory from './PriceHistory';
import AlertTab from './AlertTab';

const CAT_ICONS: Record<string, string> = {
  handgun: '🔫',
  rifle: '🎯',
  shotgun: '💥',
  ammo: '⚙️',
  parts: '🔧',
};

const TABS: Array<{ id: TabId; label: string; Icon: React.ElementType }> = [
  { id: 'online', label: 'Online', Icon: Store },
  { id: 'local', label: 'Local', Icon: MapPinIcon },
  { id: 'history', label: 'History', Icon: LineChart },
  { id: 'alert', label: 'Alert', Icon: Bell },
];

function MapPinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
      <circle cx="12" cy="9" r="2.5"/>
    </svg>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const { state, alerts } = useApp();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<TabId>('online');

  const lo = minPrice(product);
  const savings = savingsPct(product);
  const hasAlert = alerts.some((a) => a.productId === product.id);

  return (
    <div
      className={`bg-white border rounded-2xl overflow-hidden transition-all ${
        open ? 'border-zinc-300' : 'border-zinc-100 hover:border-zinc-200'
      }`}
    >
      <button
        className="w-full text-left"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <div className="flex items-center gap-3 px-4 py-3.5">
          <div className="w-12 h-12 bg-zinc-50 border border-zinc-100 rounded-xl flex items-center justify-center text-xl shrink-0">
            {CAT_ICONS[product.cat] ?? '🔫'}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-0.5">
              {product.hotDeal && (
                <span className="inline-flex items-center gap-1 text-[10px] font-medium text-red-700 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded-full">
                  <Flame className="w-2.5 h-2.5" /> Hot deal
                </span>
              )}
              {isAtAllTimeLow(product) && (
                <span className="inline-flex items-center gap-1 text-[10px] font-medium text-green-700 bg-green-50 border border-green-200 px-1.5 py-0.5 rounded-full">
                  All-time low
                </span>
              )}
            </div>

            <p className="text-sm font-semibold text-zinc-900 leading-snug truncate">{product.name}</p>

            <div className="flex items-center gap-3 mt-0.5 text-xs text-zinc-400 flex-wrap">
              <span>{product.brand}</span>
              <span className="text-zinc-200">·</span>
              <span>{product.caliber}</span>
              <span className="text-zinc-200">·</span>
              <span>{product.capacity}</span>
            </div>

            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              {hasFinancing(product) && (
                <span className="inline-flex items-center gap-1 text-[10px] text-blue-700 bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded-full">
                  <CreditCard className="w-2.5 h-2.5" /> Financing
                </span>
              )}
              {savings >= 8 && (
                <span className="text-[10px] text-red-700 bg-red-50 border border-red-100 px-1.5 py-0.5 rounded-full">
                  -{savings}% from peak
                </span>
              )}
            </div>

            <StateCompliance product={product} stateCode={state} />
          </div>

          <div className="text-right shrink-0 pl-2">
            <p className="text-[10px] text-zinc-400">from</p>
            <p className="text-xl font-bold text-zinc-900">{formatPrice(lo)}</p>
            <p className="text-[11px] text-zinc-400">
              {product.listings.length} retailers{' '}
              {open ? (
                <ChevronUp className="w-3 h-3 inline" />
              ) : (
                <ChevronDown className="w-3 h-3 inline" />
              )}
            </p>
          </div>
        </div>
      </button>

      {open && (
        <div className="border-t border-zinc-100">
          <div className="flex border-b border-zinc-100">
            {TABS.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium transition-colors border-b-2 -mb-px ${
                  tab === id
                    ? 'text-zinc-900 border-zinc-900'
                    : 'text-zinc-400 border-transparent hover:text-zinc-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
                {id === 'alert' && hasAlert && (
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 ml-0.5" />
                )}
              </button>
            ))}
          </div>

          <div className="px-4 py-4">
            {tab === 'online' && <OnlineListings listings={product.listings} />}
            {tab === 'local' && <LocalDealers dealers={product.localDealers} />}
            {tab === 'history' && <PriceHistory product={product} />}
            {tab === 'alert' && <AlertTab product={product} />}
          </div>
        </div>
      )}
    </div>
  );
}
