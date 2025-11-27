export interface School {
  id: string;
  name: string;
  type: 'public' | 'private' | 'catholic';
  level: 'primary' | 'secondary' | 'combined';
  gender: 'coed' | 'boys' | 'girls';
  coordinates: {
    lat: number;
    lng: number;
  };
  address: string;
  suburb: string;
  postcode: string;
  phone?: string;
  website?: string;
  rating?: number;
  studentCount?: number;
}

export interface SchoolSearchParams {
  type?: string;
  level?: string;
  gender?: string;
  bounds?: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
}

export interface CatchmentData {
  schoolId: string;
  boundary: GeoJSON.Polygon | GeoJSON.MultiPolygon;
  year?: number;
}

export interface SchoolCatchment {
  id: string;
  schoolName: string;
  schoolType: string;
  catchmentLevel: 'primary' | 'secondary';
  color: string;
  geometry: GeoJSON.Polygon;
}

