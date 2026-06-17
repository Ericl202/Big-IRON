'use client';

import React, { useRef } from 'react';
import { Search, CreditCard } from 'lucide-react';
import { useApp } from '@/lib/store';
import { Category } from '@/lib/types';
import { CAT_LABELS } from '@/lib/utils';

const CATS: Array<{ key: Category | 'all'; label: string }> = [
  { key: 'all', label: 'All' },
  { key: 'handgun', label: 'Handguns' },
  { key: 'rifle', label: 'Rifles' },
  { key: 'shotgun', label: 'Shotguns' },
  { key: 'ammo', label: 'Ammo' },
  { key: 'parts', label: 'Parts & Accessories' },
];

export default function SearchBar() {
  const { query, setQuery, category, setCategory, financingOnly, toggleFinancing } = useApp();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-3 mb-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search model, caliber, brand… e.g. Glock 19, .308, AR-15"
            className="w-full h-10 pl-9 pr-4 rounded-xl border border-zinc-200 bg-white text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition-all"
          />
        </div>
      </div>

      <div className="flex gap-2 flex-wrap items-center">
        <span className="text-xs text-zinc-400 mr-0.5 shrink-0">Category:</span>
        {CATS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setCategory(key)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
              category === key
                ? 'bg-zinc-900 text-white border-zinc-900'
                : 'bg-white text-zinc-500 border-zinc-200 hover:bg-zinc-50'
            }`}
          >
            {label}
          </button>
        ))}
        <button
          onClick={toggleFinancing}
          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-all ${
            financingOnly
              ? 'bg-amber-700 text-amber-50 border-amber-700'
              : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
          }`}
        >
          <CreditCard className="w-3 h-3" />
          Financing only
        </button>
      </div>
    </div>
  );
}
