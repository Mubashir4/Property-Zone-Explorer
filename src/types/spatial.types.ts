export interface GeocodeResult {
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  suburb?: string;
  postcode?: string;
  state?: string;
}

export interface DistanceResult {
  distance: number;
  unit: 'meters' | 'kilometers';
}

export interface DrawingMode {
  type: 'none' | 'polygon' | 'circle' | 'rectangle';
  active: boolean;
}

export interface SavedSearchArea {
  id: string;
  name: string;
  geometry: GeoJSON.Polygon;
  createdAt: string;
}

