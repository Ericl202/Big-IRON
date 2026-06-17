'use client';

import React from 'react';
import { MapPin, Store, Phone } from 'lucide-react';
import { LocalDealer } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { useApp } from '@/lib/store';

export default function LocalDealers({ dealers }: { dealers: LocalDealer[] }) {
  const { zip, setZip } = useApp();
  const [inputZip, setInputZip] = React.useState(zip);

  const handleZip = () => {
    if (/^\d{5}$/.test(inputZip)) setZip(inputZip);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-4 h-4 text-zinc-400 shrink-0" />
        <input
          type="text"
          maxLength={5}
          value={inputZip}
          onChange={(e) => setInputZip(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleZip()}
          placeholder="ZIP code"
          className="w-24 h-8 px-2.5 text-sm border border-zinc-200 rounded-lg bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
        />
        <button
          onClick={handleZip}
          className="h-8 px-3 text-xs border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors"
        >
          Update
        </button>
        <span className="text-xs text-zinc-400">Dealers near {zip}</span>
      </div>

      {dealers.length === 0 ? (
        <p className="text-sm text-zinc-400 py-4 text-center">
          No local dealers found for this ZIP. Try a different code.
        </p>
      ) : (
        <div className="divide-y divide-zinc-100">
          {dealers.map((d, i) => (
            <div key={i} className="py-3 flex items-center gap-3">
              <Store className="w-4 h-4 text-zinc-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-zinc-900 truncate">{d.name}</p>
                <p className="text-xs text-zinc-400">{d.address}</p>
              </div>
              <div className="text-right shrink-0">
                <p
                  className={`text-xs font-medium ${
                    d.stock === 'In stock' ? 'text-green-700' : 'text-amber-700'
                  }`}
                >
                  {d.stock}
                </p>
                <p className="text-sm font-semibold text-zinc-900">
                  {d.price ? formatPrice(d.price) : 'Call'}
                </p>
              </div>
              <span className="text-xs text-zinc-400 shrink-0">{d.distance}</span>
              {d.phone && (
                <a
                  href={`tel:${d.phone}`}
                  className="shrink-0 flex items-center gap-1 text-xs border border-zinc-200 px-2.5 py-1 rounded-lg hover:bg-zinc-50 transition-colors"
                  aria-label={`Call ${d.name}`}
                >
                  <Phone className="w-3 h-3" />
                  <span className="hidden sm:inline">Call</span>
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-3 pt-3 border-t border-zinc-100 text-[11px] text-zinc-400 space-y-0.5">
        <p>Online purchases ship to a local FFL dealer. Transfer fee typically $25–$50 per firearm.</p>
        <p>Call the dealer ahead to confirm stock and transfer acceptance before visiting.</p>
      </div>
    </div>
  );
}
