'use client';

import React, { useState, useCallback } from 'react';
import { MapPin, Store, Star, ExternalLink, Phone, Loader2, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { useApp } from '@/lib/store';

interface Dealer {
  place_id: string;
  name: string;
  address: string;
  rating?: number;
  user_ratings_total?: number;
  open_now?: boolean;
  distance_miles: number;
  maps_url: string;
  types: string[];
}

// Known major chains that carry firearms
const CHAIN_CONTEXT: Record<string, string> = {
  "cabela's": 'Full firearms dept.',
  'bass pro': 'Full firearms dept.',
  "sportsman's warehouse": 'Full firearms dept.',
  'academy sports': 'Full firearms dept.',
  'rural king': 'Guns & ammo',
  'big 5': 'Sporting goods / guns',
  "dick's sporting goods": 'Limited — varies by location',
  'walmart': 'Ammo & some long guns',
};

function getChainNote(name: string): string | null {
  const lower = name.toLowerCase();
  for (const [key, note] of Object.entries(CHAIN_CONTEXT)) {
    if (lower.includes(key)) return note;
  }
  return null;
}

function OpenBadge({ open_now }: { open_now?: boolean }) {
  if (open_now === undefined) return null;
  return open_now ? (
    <span className="flex items-center gap-1 text-[10px] text-green-700 font-medium">
      <CheckCircle className="w-3 h-3" /> Open now
    </span>
  ) : (
    <span className="flex items-center gap-1 text-[10px] text-red-600 font-medium">
      <XCircle className="w-3 h-3" /> Closed
    </span>
  );
}

export default function LocalDealers() {
  const { zip, setZip } = useApp();
  const [inputZip, setInputZip] = useState(zip);
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const search = useCallback(async (searchZip: string) => {
    if (!/^\d{5}$/.test(searchZip)) {
      setError('Enter a valid 5-digit ZIP code.');
      return;
    }
    setLoading(true);
    setError('');
    setSearched(true);

    try {
      const res = await fetch(`/api/dealers?zip=${searchZip}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong.');
        setDealers([]);
        return;
      }

      setDealers(data.dealers || []);
      setZip(searchZip);
      if ((data.dealers || []).length === 0) {
        setError('No dealers found near this ZIP. Try expanding your search radius.');
      }
    } catch {
      setError('Network error — check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, [setZip]);

  const handleSearch = () => search(inputZip);

  return (
    <div>
      {/* ZIP search */}
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-4 h-4 text-zinc-400 shrink-0" />
        <input
          type="text"
          inputMode="numeric"
          maxLength={5}
          value={inputZip}
          onChange={(e) => setInputZip(e.target.value.replace(/\D/g, ''))}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Enter ZIP code"
          className="w-28 h-8 px-2.5 text-sm border border-zinc-200 rounded-lg bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="h-8 px-3 text-xs font-medium bg-zinc-900 text-white rounded-lg hover:bg-zinc-700 disabled:opacity-50 transition-colors flex items-center gap-1.5"
        >
          {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
          {loading ? 'Searching…' : 'Search'}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-3">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Initial prompt */}
      {!searched && !loading && (
        <div className="text-center py-8 text-zinc-400">
          <Store className="w-8 h-8 mx-auto mb-2 opacity-40" />
          <p className="text-sm">Enter your ZIP code to find gun shops,</p>
          <p className="text-sm">sporting goods stores, and big-box retailers near you.</p>
          <p className="text-xs mt-2 opacity-70">Covers 65,000+ FFL dealers + Cabela's, Bass Pro, Walmart, and more</p>
        </div>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3 py-3 animate-pulse">
              <div className="w-8 h-8 bg-zinc-100 rounded-lg shrink-0" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3 bg-zinc-100 rounded w-2/3" />
                <div className="h-2.5 bg-zinc-100 rounded w-1/2" />
              </div>
              <div className="h-3 bg-zinc-100 rounded w-12" />
            </div>
          ))}
        </div>
      )}

      {/* Results */}
      {!loading && dealers.length > 0 && (
        <>
          <p className="text-xs text-zinc-400 mb-3">
            {dealers.length} dealers within 25 miles of {zip}
          </p>
          <div className="divide-y divide-zinc-100">
            {dealers.map((d) => {
              const chainNote = getChainNote(d.name);
              return (
                <div key={d.place_id} className="py-3 flex items-start gap-3">
                  <div className="w-8 h-8 bg-zinc-50 border border-zinc-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <Store className="w-4 h-4 text-zinc-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-zinc-900 truncate">{d.name}</p>
                    <p className="text-xs text-zinc-400 truncate">{d.address}</p>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <OpenBadge open_now={d.open_now} />
                      {d.rating && (
                        <span className="flex items-center gap-0.5 text-[10px] text-zinc-500">
                          <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                          {d.rating} ({d.user_ratings_total?.toLocaleString()})
                        </span>
                      )}
                      {chainNote && (
                        <span className="text-[10px] text-blue-700 bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded-full">
                          {chainNote}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right shrink-0 space-y-1.5">
                    <p className="text-xs font-medium text-zinc-900">{d.distance_miles} mi</p>
                    <a
                      href={d.maps_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[10px] text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-lg hover:bg-blue-100 transition-colors whitespace-nowrap"
                    >
                      <ExternalLink className="w-2.5 h-2.5" /> Directions
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Footer note */}
      {searched && !loading && dealers.length > 0 && (
        <div className="mt-3 pt-3 border-t border-zinc-100 space-y-1 text-[11px] text-zinc-400">
          <p>Online purchases must be shipped to an FFL dealer. Transfer fee typically $25–$50.</p>
          <p>Call ahead to confirm firearm inventory and transfer acceptance before visiting.</p>
          <p>Data via Google Places · ~65,000 ATF-licensed dealers indexed.</p>
        </div>
      )}
    </div>
  );
}
