export type Category = 'handgun' | 'rifle' | 'shotgun' | 'ammo' | 'parts';
export type StockStatus = 'in' | 'low' | 'oos';

export interface RetailerListing {
  retailer: string;
  price: number;
  stock: StockStatus;
  financing: boolean;
  url: string;
  logo?: string;
}

export interface LocalDealer {
  name: string;
  distance: string;
  stock: string;
  price: number | null;
  phone?: string;
  address?: string;
}

export interface Product {
  id: number;
  cat: Category;
  name: string;
  brand: string;
  caliber: string;
  capacity: string;
  upc?: string;
  imageUrl?: string;
  restrictions: Record<string, string>;
  listings: RetailerListing[];
  localDealers: LocalDealer[];
  priceHistory: number[];
  allTimeLow: number;
  hotDeal: boolean;
  tags?: string[];
}

export interface Giveaway {
  id: number;
  title: string;
  prize: string;
  endsAt: string;
  entryUrl: string;
}

export type StateCode =
  | 'AL' | 'AK' | 'AZ' | 'AR' | 'CA' | 'CO' | 'CT' | 'DE' | 'FL' | 'GA'
  | 'HI' | 'ID' | 'IL' | 'IN' | 'IA' | 'KS' | 'KY' | 'LA' | 'ME' | 'MD'
  | 'MA' | 'MI' | 'MN' | 'MS' | 'MO' | 'MT' | 'NE' | 'NV' | 'NH' | 'NJ'
  | 'NM' | 'NY' | 'NC' | 'ND' | 'OH' | 'OK' | 'OR' | 'PA' | 'RI' | 'SC'
  | 'SD' | 'TN' | 'TX' | 'UT' | 'VT' | 'VA' | 'WA' | 'WV' | 'WI' | 'WY';

export type StateRestrictionLevel = 'permissive' | 'standard' | 'regulated' | 'restricted';

export interface StateInfo {
  name: string;
  level: StateRestrictionLevel;
  notes: string[];
}

export type SortOption = 'price_asc' | 'price_desc' | 'name' | 'deal';
export type TabId = 'online' | 'local' | 'history' | 'alert';
