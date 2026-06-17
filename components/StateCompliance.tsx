'use client';

import React from 'react';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { Product } from '@/lib/types';
import { StateCode } from '@/lib/types';
import { STATE_DATA } from '@/lib/states';

export default function StateCompliance({
  product,
  stateCode,
}: {
  product: Product;
  stateCode: StateCode;
}) {
  const restriction = product.restrictions[stateCode];
  const stateInfo = STATE_DATA[stateCode];

  if (restriction) {
    return (
      <div className="flex items-start gap-2 mt-2 text-xs bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-amber-900">
        <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-600" />
        <span>
          <strong>{stateCode}:</strong> {restriction}
        </span>
      </div>
    );
  }

  if (stateInfo.level === 'restricted' || stateInfo.level === 'regulated') {
    return (
      <div className="flex items-start gap-2 mt-2 text-xs bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 text-blue-800">
        <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-blue-500" />
        <span>
          Legal in {stateCode} — but verify state-specific rules before purchase.{' '}
          {stateInfo.notes[0]}.
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 mt-1.5 text-xs text-green-800">
      <CheckCircle className="w-3.5 h-3.5 text-green-600" />
      <span>Legal in {stateCode}</span>
    </div>
  );
}
