'use client';

import React from 'react';
import { ExternalLink, CheckCircle, AlertCircle, XCircle, CreditCard } from 'lucide-react';
import { RetailerListing, StockStatus } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

function StockBadge({ status }: { status: StockStatus }) {
  if (status === 'in')
    return (
      <span className="flex items-center gap-1 text-xs text-green-700">
        <CheckCircle className="w-3 h-3" /> In stock
      </span>
    );
  if (status === 'low')
    return (
      <span className="flex items-center gap-1 text-xs text-amber-700">
        <AlertCircle className="w-3 h-3" /> Low stock
      </span>
    );
  return (
    <span className="flex items-center gap-1 text-xs text-red-600">
      <XCircle className="w-3 h-3" /> Out of stock
    </span>
  );
}

export default function OnlineListings({
  listings,
}: {
  listings: RetailerListing[];
}) {
  const sorted = [...listings].sort((a, b) => a.price - b.price);
  const bestPrice = sorted[0]?.price;
  const hasAnyFinancing = sorted.some((l) => l.financing);

  return (
    <div>
      <div className="divide-y divide-zinc-100">
        {sorted.map((l, i) => (
          <div key={i} className="flex items-center gap-3 py-2.5">
            <span className="text-sm font-medium text-zinc-900 flex-1 min-w-0 truncate">
              {l.retailer}
              {l.financing && (
                <span className="ml-1.5 inline-flex items-center gap-0.5 text-[10px] text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded-full">
                  <CreditCard className="w-2.5 h-2.5" /> financing
                </span>
              )}
            </span>
            <StockBadge status={l.stock} />
            <span
              className={`text-sm font-semibold min-w-[56px] text-right ${
                l.price === bestPrice ? 'text-blue-700' : 'text-zinc-900'
              }`}
            >
              {formatPrice(l.price)}
            </span>
            <a
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 flex items-center gap-1 text-xs text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg hover:bg-blue-100 transition-colors"
            >
              Buy <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        ))}
      </div>

      {hasAnyFinancing && (
        <p className="mt-3 text-[11px] text-zinc-400 flex items-center gap-1">
          <CreditCard className="w-3 h-3" />
          Financing via Credova or Sezzle at participating retailers. Subject to credit approval.
        </p>
      )}
    </div>
  );
}
