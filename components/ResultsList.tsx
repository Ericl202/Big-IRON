'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import ProductCard from './ProductCard';
import { SortOption } from '@/lib/types';
import { Search } from 'lucide-react';

const SORT_OPTIONS: Array<{ value: SortOption; label: string }> = [
  { value: 'price_asc', label: 'Price: low to high' },
  { value: 'price_desc', label: 'Price: high to low' },
  { value: 'name', label: 'Name A–Z' },
  { value: 'deal', label: 'Best deals first' },
];

export default function ResultsList() {
  const { filteredProducts, sortBy, setSortBy } = useApp();

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-zinc-400">
          {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''}
        </p>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="text-xs border border-zinc-200 rounded-lg bg-white text-zinc-700 px-2.5 py-1.5 focus:outline-none cursor-pointer"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 text-zinc-400">
          <Search className="w-8 h-8 mx-auto mb-3 opacity-40" />
          <p className="text-sm">No results found.</p>
          <p className="text-xs mt-1">Try a different search term or category.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
