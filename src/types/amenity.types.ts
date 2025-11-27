export interface Amenity {
  id: string;
  name: string;
  category: AmenityCategory;
  coordinates: {
    lat: number;
    lng: number;
  };
  address?: string;
  suburb?: string;
  description?: string;
  rating?: number;
  phone?: string;
  website?: string;
}

export type AmenityCategory =
  | 'schools'
  | 'universities'
  | 'libraries'
  | 'hospitals'
  | 'shopping'
  | 'attractions'
  | 'beaches'
  | 'sports'
  | 'transport';

export interface AmenitySearchParams {
  category?: AmenityCategory;
  location?: {
    lat: number;
    lng: number;
  };
  radius?: number;
  bounds?: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
}

export interface AmenityCategoryInfo {
  id: AmenityCategory;
  name: string;
  icon: string;
  color: string;
}

