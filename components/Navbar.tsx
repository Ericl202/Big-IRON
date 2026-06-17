'use client';

import React from 'react';
import { Target, Bell, RefreshCw } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="border-b border-zinc-200 bg-white sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
            <Target className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="font-semibold text-zinc-900 text-[15px] tracking-tight">Big IRON</span>
            <span className="hidden sm:inline text-zinc-400 text-xs ml-2 uppercase tracking-widest">
              4,200+ verified dealers
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-green-800 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
            Live inventory
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-500">
            <RefreshCw className="w-3 h-3" />
            Updated 2 min ago
          </div>
          <button className="flex items-center gap-1.5 text-sm border border-zinc-200 rounded-lg px-3 py-1.5 hover:bg-zinc-50 transition-colors">
            <Bell className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Alerts</span>
          </button>
        </div>
      </div>
    </header>
  );
}
