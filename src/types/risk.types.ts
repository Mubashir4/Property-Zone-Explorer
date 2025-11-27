export type RiskType = 'flood' | 'bushfire' | 'heritage' | 'zoning';

export interface RiskLayer {
  id: string;
  type: RiskType;
  name: string;
  data: GeoJSON.FeatureCollection;
  opacity: number;
  visible: boolean;
}

export interface RiskProfile {
  propertyId: string;
  flood: {
    level: 'low' | 'medium' | 'high' | 'none';
    description: string;
  };
  bushfire: {
    level: 'low' | 'medium' | 'high' | 'extreme' | 'none';
    balRating?: string;
    description: string;
  };
  heritage: {
    listed: boolean;
    zone?: string;
    description: string;
  };
  zoning: {
    zone: string;
    description: string;
  };
}

export interface RiskDataResponse {
  type: RiskType;
  data: GeoJSON.FeatureCollection;
}

