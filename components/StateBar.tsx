'use client';

import React from 'react';
import { MapPin, RefreshCw } from 'lucide-react';
import { useApp } from '@/lib/store';
import { STATE_DATA, LEVEL_LABELS } from '@/lib/states';
import { StateCode } from '@/lib/types';
import { LEVEL_COLORS } from '@/lib/utils';

const STATE_CODES = Object.keys(STATE_DATA) as StateCode[];

export default function StateBar() {
  const { state, setState } = useApp();
  const info = STATE_DATA[state];
  const colors = LEVEL_COLORS[info.level];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
      <div className="flex items-center gap-3 bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3">
        <MapPin className="w-4 h-4 text-zinc-400 shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs text-zinc-500 mb-0.5">Your state</p>
          <select
            value={state}
            onChange={(e) => setState(e.target.value as StateCode)}
            className="text-sm font-medium bg-transparent border-none outline-none text-zinc-900 cursor-pointer w-full"
          >
            {STATE_CODES.map((code) => (
              <option key={code} value={code}>
                {STATE_DATA[code].name} ({code})
              </option>
            ))}
          </select>
        </div>
        <span
          className={`shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}
        >
          {LEVEL_LABELS[info.level]}
        </span>
      </div>

      <div className="flex items-center gap-3 bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3">
        <RefreshCw className="w-4 h-4 text-zinc-400 shrink-0 animate-none" />
        <div>
          <p className="text-xs text-zinc-500 mb-0.5">Inventory updated</p>
          <p className="text-sm font-medium text-zinc-900">2 minutes ago</p>
          <p className="text-[10px] text-zinc-400">Refreshes every 15 min from 4,200+ dealers</p>
        </div>
      </div>
    </div>
  );
}
