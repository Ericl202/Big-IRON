'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Category, SortOption, StateCode } from '@/lib/types';
import { PRODUCTS } from '@/lib/data';
import { Product } from '@/lib/types';
import { minPrice, hasFinancing, savingsPct } from '@/lib/utils';

interface Alert {
  productId: number;
  targetPrice: number;
  email: string;
}

interface AppState {
  state: StateCode;
  setState: (s: StateCode) => void;
  category: Category | 'all';
  setCategory: (c: Category | 'all') => void;
  query: string;
  setQuery: (q: string) => void;
  sortBy: SortOption;
  setSortBy: (s: SortOption) => void;
  financingOnly: boolean;
  toggleFinancing: () => void;
  zip: string;
  setZip: (z: string) => void;
  alerts: Alert[];
  addAlert: (a: Alert) => void;
  filteredProducts: Product[];
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StateCode>('MD');
  const [category, setCategory] = useState<Category | 'all'>('all');
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('price_asc');
  const [financingOnly, setFinancingOnly] = useState(false);
  const [zip, setZip] = useState('21201');
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const toggleFinancing = useCallback(() => setFinancingOnly((v) => !v), []);

  const addAlert = useCallback((a: Alert) => {
    setAlerts((prev) => {
      const filtered = prev.filter((x) => x.productId !== a.productId);
      return [...filtered, a];
    });
  }, []);

  const filteredProducts = React.useMemo(() => {
    let list = [...PRODUCTS];

    if (category !== 'all') list = list.filter((p) => p.cat === category);
    if (financingOnly) list = list.filter((p) => hasFinancing(p));
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.caliber.toLowerCase().includes(q) ||
          p.cat.includes(q)
      );
    }

    list.sort((a, b) => {
      if (sortBy === 'price_asc') return minPrice(a) - minPrice(b);
      if (sortBy === 'price_desc') return minPrice(b) - minPrice(a);
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'deal') {
        const diff = (b.hotDeal ? 1 : 0) - (a.hotDeal ? 1 : 0);
        return diff !== 0 ? diff : savingsPct(b) - savingsPct(a);
      }
      return 0;
    });

    return list;
  }, [category, financingOnly, query, sortBy]);

  return (
    <AppContext.Provider
      value={{
        state, setState,
        category, setCategory,
        query, setQuery,
        sortBy, setSortBy,
        financingOnly, toggleFinancing,
        zip, setZip,
        alerts, addAlert,
        filteredProducts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
