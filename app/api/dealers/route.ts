import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY || '';

// Search terms that cover gun shops + major sporting goods chains that sell firearms
const SEARCH_QUERIES = [
  'gun shop firearms',
  'gun store ammo',
  "Cabela's",
  'Bass Pro Shops',
  'Sportsman\'s Warehouse',
  'Academy Sports',
  'Rural King guns',
];

export interface PlaceResult {
  place_id: string;
  name: string;
  address: string;
  rating?: number;
  user_ratings_total?: number;
  open_now?: boolean;
  lat: number;
  lng: number;
  types: string[];
  distance_miles: number;
  maps_url: string;
}

async function searchNearCoords(query: string, lat: number, lng: number): Promise<PlaceResult[]> {
  const url = new URL('https://maps.googleapis.com/maps/api/place/nearbysearch/json');
  url.searchParams.set('location', `${lat},${lng}`);
  url.searchParams.set('radius', '40233'); // 25 miles in meters
  url.searchParams.set('keyword', query);
  url.searchParams.set('key', GOOGLE_API_KEY);

  const res = await fetch(url.toString(), { next: { revalidate: 3600 } }); // cache 1hr
  const data = await res.json();

  if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
    console.error('Places API error:', data.status, data.error_message);
    return [];
  }

  return (data.results || []).slice(0, 8).map((p: any) => ({
    place_id: p.place_id,
    name: p.name,
    address: p.vicinity,
    rating: p.rating,
    user_ratings_total: p.user_ratings_total,
    open_now: p.opening_hours?.open_now,
    lat: p.geometry.location.lat,
    lng: p.geometry.location.lng,
    types: p.types || [],
    distance_miles: 0, // calculated after
    maps_url: `https://www.google.com/maps/place/?q=place_id:${p.place_id}`,
  }));
}

async function geocodeZip(zip: string): Promise<{ lat: number; lng: number } | null> {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&components=country:US&key=${GOOGLE_API_KEY}`;
  const res = await fetch(url, { next: { revalidate: 86400 } }); // cache 24hr
  const data = await res.json();
  if (data.status !== 'OK') return null;
  const loc = data.results[0]?.geometry?.location;
  return loc ? { lat: loc.lat, lng: loc.lng } : null;
}

function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3958.8;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Filter out places that are clearly not gun-related
const EXCLUDE_KEYWORDS = ['pawn', 'toy', 'water gun', 'paintball', 'airsoft only', 'nail', 'tattoo'];
function isRelevant(name: string): boolean {
  const lower = name.toLowerCase();
  return !EXCLUDE_KEYWORDS.some((k) => lower.includes(k));
}

export async function GET(req: NextRequest) {
  const zip = req.nextUrl.searchParams.get('zip');
  if (!zip || !/^\d{5}$/.test(zip)) {
    return NextResponse.json({ error: 'Invalid ZIP code' }, { status: 400 });
  }

  if (!GOOGLE_API_KEY) {
    return NextResponse.json(
      { error: 'GOOGLE_PLACES_API_KEY is not configured. Add it to your .env.local file.' },
      { status: 500 }
    );
  }

  const coords = await geocodeZip(zip);
  if (!coords) {
    return NextResponse.json({ error: 'ZIP code not found' }, { status: 404 });
  }

  // Run all queries in parallel
  const batches = await Promise.all(
    SEARCH_QUERIES.map((q) => searchNearCoords(q, coords.lat, coords.lng))
  );

  // Deduplicate by place_id, compute distance, sort
  const seen = new Set<string>();
  const dealers: PlaceResult[] = [];

  for (const batch of batches) {
    for (const place of batch) {
      if (!seen.has(place.place_id) && isRelevant(place.name)) {
        seen.add(place.place_id);
        dealers.push({
          ...place,
          distance_miles: Math.round(haversine(coords.lat, coords.lng, place.lat, place.lng) * 10) / 10,
        });
      }
    }
  }

  dealers.sort((a, b) => a.distance_miles - b.distance_miles);

  return NextResponse.json({
    zip,
    coords,
    dealers: dealers.slice(0, 25),
  });
}
