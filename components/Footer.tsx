import React from 'react';
import { Target } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-100 mt-16 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-zinc-900 rounded flex items-center justify-center">
                <Target className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-semibold text-zinc-900 text-sm">Big IRON</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              The 2A industry&apos;s most compliance-aware firearm price search engine.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-3">Shop</p>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><a href="#" className="hover:text-zinc-700 transition-colors">Handguns</a></li>
              <li><a href="#" className="hover:text-zinc-700 transition-colors">Rifles</a></li>
              <li><a href="#" className="hover:text-zinc-700 transition-colors">Shotguns</a></li>
              <li><a href="#" className="hover:text-zinc-700 transition-colors">Ammo</a></li>
              <li><a href="#" className="hover:text-zinc-700 transition-colors">Parts & Accessories</a></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-3">Resources</p>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><a href="#" className="hover:text-zinc-700 transition-colors">State law guide</a></li>
              <li><a href="#" className="hover:text-zinc-700 transition-colors">FFL locator</a></li>
              <li><a href="#" className="hover:text-zinc-700 transition-colors">Giveaways</a></li>
              <li><a href="#" className="hover:text-zinc-700 transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-3">Business</p>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><a href="#" className="hover:text-zinc-700 transition-colors">List your store</a></li>
              <li><a href="#" className="hover:text-zinc-700 transition-colors">Manufacturer solutions</a></li>
              <li><a href="#" className="hover:text-zinc-700 transition-colors">Affiliate program</a></li>
              <li><a href="#" className="hover:text-zinc-700 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zinc-400">
            © 2026 Big IRON. All rights reserved. Not a licensed dealer. Prices from third-party retailers.
          </p>
          <div className="flex gap-4 text-xs text-zinc-400">
            <a href="#" className="hover:text-zinc-700 transition-colors">Privacy</a>
            <a href="#" className="hover:text-zinc-700 transition-colors">Terms</a>
            <a href="#" className="hover:text-zinc-700 transition-colors">Disclosures</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
