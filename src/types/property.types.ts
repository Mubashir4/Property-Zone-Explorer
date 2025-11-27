export interface Property {
  id: string;
  address: string;
  suburb: string;
  postcode: string;
  state: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  price: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  propertyType: 'house' | 'apartment' | 'townhouse' | 'land';
  landSize?: number;
  images: string[];
  floorplans?: string[];
  description: string;
  agent: {
    name: string;
    phone: string;
    email: string;
  };
  listingDate: string;
  features: string[];
}

export interface PropertySearchParams {
  priceMin?: number;
  priceMax?: number;
  bedrooms?: number;
  bathrooms?: number;
  propertyType?: string;
  suburb?: string;
  bounds?: BoundingBox;
  polygon?: GeoJSON.Polygon;
  schoolCatchment?: string;
  amenityRadius?: {
    amenityId: string;
    radius: number;
  };
}

export interface BoundingBox {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface PropertySearchResponse {
  properties: Property[];
  total: number;
  page: number;
  pageSize: number;
}

