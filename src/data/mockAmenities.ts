import { Amenity, AmenityCategoryInfo } from '@/types/amenity.types';

export const mockAmenities: Amenity[] = [
  // Schools
  {
    id: 'a1',
    name: 'Mosman Public School',
    category: 'schools',
    coordinates: { lat: -33.8285, lng: 151.2415 },
    address: '14 Belmont Road, Mosman',
    suburb: 'Mosman',
    rating: 4.5,
  },
  {
    id: 'a2',
    name: 'Neutral Bay Public School',
    category: 'schools',
    coordinates: { lat: -33.8315, lng: 151.2195 },
    address: 'Hayes Street, Neutral Bay',
    suburb: 'Neutral Bay',
    rating: 4.6,
  },
  // Universities
  {
    id: 'a3',
    name: 'Australian Catholic University',
    category: 'universities',
    coordinates: { lat: -33.8385, lng: 151.2098 },
    address: '33 Berry Street, North Sydney',
    suburb: 'North Sydney',
    rating: 4.3,
  },
  // Libraries
  {
    id: 'a4',
    name: 'Mosman Library',
    category: 'libraries',
    coordinates: { lat: -33.8282, lng: 151.2428 },
    address: '573 Military Road, Mosman',
    suburb: 'Mosman',
    rating: 4.7,
  },
  {
    id: 'a5',
    name: 'Neutral Bay Library',
    category: 'libraries',
    coordinates: { lat: -33.8308, lng: 151.2205 },
    address: 'Neutral Street, Neutral Bay',
    suburb: 'Neutral Bay',
    rating: 4.5,
  },
  // Hospitals
  {
    id: 'a6',
    name: 'Royal North Shore Hospital',
    category: 'hospitals',
    coordinates: { lat: -33.8235, lng: 151.1865 },
    address: 'Reserve Road, St Leonards',
    suburb: 'St Leonards',
    rating: 4.4,
  },
  {
    id: 'a7',
    name: 'Mater Hospital',
    category: 'hospitals',
    coordinates: { lat: -33.8368, lng: 151.2145 },
    address: 'Rocklands Road, North Sydney',
    suburb: 'North Sydney',
    rating: 4.6,
  },
  // Shopping
  {
    id: 'a8',
    name: 'Mosman Village',
    category: 'shopping',
    coordinates: { lat: -33.8288, lng: 151.2445 },
    address: 'Military Road, Mosman',
    suburb: 'Mosman',
    rating: 4.2,
  },
  {
    id: 'a9',
    name: 'Neutral Bay Junction',
    category: 'shopping',
    coordinates: { lat: -33.8318, lng: 151.2212 },
    address: 'Military Road, Neutral Bay',
    suburb: 'Neutral Bay',
    rating: 4.3,
  },
  // Beaches
  {
    id: 'a10',
    name: 'Balmoral Beach',
    category: 'beaches',
    coordinates: { lat: -33.8265, lng: 151.2550 },
    address: 'The Esplanade, Balmoral',
    suburb: 'Mosman',
    rating: 4.8,
  },
  {
    id: 'a11',
    name: 'Chinamans Beach',
    category: 'beaches',
    coordinates: { lat: -33.8235, lng: 151.2485 },
    address: 'Chinamans Beach Reserve, Mosman',
    suburb: 'Mosman',
    rating: 4.7,
  },
  // Sports
  {
    id: 'a12',
    name: 'Mosman Swim Centre',
    category: 'sports',
    coordinates: { lat: -33.8298, lng: 151.2405 },
    address: 'Old Cremorne Road, Cremorne',
    suburb: 'Cremorne',
    rating: 4.5,
  },
  {
    id: 'a13',
    name: 'North Sydney Olympic Pool',
    category: 'sports',
    coordinates: { lat: -33.8442, lng: 151.2075 },
    address: '4 Alfred Street South, Milsons Point',
    suburb: 'Milsons Point',
    rating: 4.9,
  },
  // Attractions
  {
    id: 'a14',
    name: 'Taronga Zoo',
    category: 'attractions',
    coordinates: { lat: -33.8432, lng: 151.2415 },
    address: 'Bradleys Head Road, Mosman',
    suburb: 'Mosman',
    rating: 4.8,
  },
  {
    id: 'a15',
    name: 'Luna Park',
    category: 'attractions',
    coordinates: { lat: -33.8475, lng: 151.2105 },
    address: '1 Olympic Drive, Milsons Point',
    suburb: 'Milsons Point',
    rating: 4.6,
  },
  // Transport
  {
    id: 'a16',
    name: 'Milsons Point Station',
    category: 'transport',
    coordinates: { lat: -33.8468, lng: 151.2118 },
    address: 'Ennis Road, Milsons Point',
    suburb: 'Milsons Point',
  },
  {
    id: 'a17',
    name: 'North Sydney Station',
    category: 'transport',
    coordinates: { lat: -33.8398, lng: 151.2065 },
    address: 'Blue Street, North Sydney',
    suburb: 'North Sydney',
  },
];

export const amenityCategoryInfo: AmenityCategoryInfo[] = [
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


