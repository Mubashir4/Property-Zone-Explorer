export const PROPERTY_TYPES = [
  { value: 'house', label: 'House' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'townhouse', label: 'Townhouse' },
  { value: 'land', label: 'Land' },
];

export const BEDROOM_OPTIONS = [1, 2, 3, 4, 5];

export const BATHROOM_OPTIONS = [1, 2, 3, 4];

export const SCHOOL_TYPES = [
  { value: 'public', label: 'Public' },
  { value: 'private', label: 'Private' },
  { value: 'catholic', label: 'Catholic' },
];

export const SCHOOL_LEVELS = [
  { value: 'primary', label: 'Primary' },
  { value: 'secondary', label: 'Secondary' },
  { value: 'combined', label: 'Combined' },
];

export const AMENITY_CATEGORIES = [
  { id: 'schools', name: 'Schools', icon: 'School', color: '#2563eb' },
  { id: 'universities', name: 'Universities', icon: 'AccountBalance', color: '#7c3aed' },
  { id: 'libraries', name: 'Libraries', icon: 'LocalLibrary', color: '#0891b2' },
  { id: 'hospitals', name: 'Hospitals', icon: 'LocalHospital', color: '#dc2626' },
  { id: 'shopping', name: 'Shopping', icon: 'ShoppingCart', color: '#ea580c' },
  { id: 'attractions', name: 'Attractions', icon: 'Attractions', color: '#84cc16' },
  { id: 'beaches', name: 'Beaches', icon: 'Beach', color: '#06b6d4' },
  { id: 'sports', name: 'Sports', icon: 'FitnessCenter', color: '#10b981' },
  { id: 'transport', name: 'Transport', icon: 'Train', color: '#6366f1' },
];

export const PRICE_RANGES = [
  { label: 'Under $500k', min: 0, max: 500000 },
  { label: '$500k - $750k', min: 500000, max: 750000 },
  { label: '$750k - $1M', min: 750000, max: 1000000 },
  { label: '$1M - $1.5M', min: 1000000, max: 1500000 },
  { label: '$1.5M - $2M', min: 1500000, max: 2000000 },
  { label: 'Over $2M', min: 2000000, max: 10000000 },
];

export const SEARCH_RADIUS_OPTIONS = [
  { value: 500, label: '500m' },
  { value: 1000, label: '1km' },
  { value: 2000, label: '2km' },
  { value: 5000, label: '5km' },
];

export const MAP_CONFIG = {
  DEFAULT_CENTER: [
    Number(import.meta.env.VITE_MAP_DEFAULT_LAT) || -33.8688,
    Number(import.meta.env.VITE_MAP_DEFAULT_LNG) || 151.2093,
  ] as [number, number],
  DEFAULT_ZOOM: Number(import.meta.env.VITE_MAP_DEFAULT_ZOOM) || 12,
  MIN_ZOOM: 8,
  MAX_ZOOM: 18,
  TILE_URL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
};

export type MapLayerType = 'streets' | 'satellite' | 'terrain' | 'dark' | 'light';

export interface MapLayer {
  id: MapLayerType;
  name: string;
  url: string;
  attribution: string;
  maxZoom: number;
  minZoom?: number;
}

export const MAP_LAYERS: Record<MapLayerType, MapLayer> = {
  streets: {
    id: 'streets',
    name: 'Streets',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  },
  satellite: {
    id: 'satellite',
    name: 'Satellite',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; <a href="https://www.esri.com/">Esri</a>, Maxar, Earthstar Geographics',
    maxZoom: 19,
  },
  terrain: {
    id: 'terrain',
    name: 'Terrain',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="https://opentopomap.org">OpenTopoMap</a>',
    maxZoom: 17,
  },
  dark: {
    id: 'dark',
    name: 'Dark',
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 19,
  },
  light: {
    id: 'light',
    name: 'Light',
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 19,
  },
};

