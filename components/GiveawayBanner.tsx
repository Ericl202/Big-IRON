'use client';

import React, { useState } from 'react';
import { Gift, X } from 'lucide-react';
import { GIVEAWAYS } from '@/lib/data';

export default function GiveawayBanner() {
  const [dismissed, setDismissed] = useState(false);
  const giveaway = GIVEAWAYS[0];

  if (dismissed || !giveaway) return null;

  const daysLeft = Math.ceil(
    (new Date(giveaway.endsAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-center gap-3 mb-4">
      <Gift className="w-5 h-5 text-amber-700 shrink-0" />
      <div className="flex-1 min-w-0">
        <span className="text-sm text-amber-900">
          <span className="font-medium">Active giveaway:</span>{' '}
          {giveaway.prize} — ends in {daysLeft} days. Free to enter.
        </span>
      </div>
      <a
        href={giveaway.entryUrl}
        className="shrink-0 text-xs font-medium bg-amber-700 text-amber-50 px-3 py-1.5 rounded-lg hover:bg-amber-800 transition-colors"
      >
        Enter free
      </a>
      <button
        onClick={() => setDismissed(true)}
        className="shrink-0 text-amber-600 hover:text-amber-800 transition-colors"
        aria-label="Dismiss giveaway banner"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
