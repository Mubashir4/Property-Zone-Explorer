import { apiClient } from '../config/apiClient';
import { API_ENDPOINTS } from '../config/apiEndpoints';
import {
  Property,
  PropertySearchParams,
  PropertySearchResponse,
  BoundingBox,
} from '@/types/property.types';
import { mockPropertyService } from './mockPropertyService';

const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';

const realPropertyService = {
  async searchProperties(params: PropertySearchParams): Promise<PropertySearchResponse> {
    return apiClient.get(API_ENDPOINTS.PROPERTIES.SEARCH, { params });
  },

  async getPropertyById(id: string): Promise<Property> {
    return apiClient.get(API_ENDPOINTS.PROPERTIES.BY_ID(id));
  },

  async getPropertiesByBounds(bounds: BoundingBox): Promise<Property[]> {
    return apiClient.post(API_ENDPOINTS.PROPERTIES.BY_BOUNDS, bounds);
  },

  async getPropertiesByPolygon(polygon: GeoJSON.Polygon): Promise<Property[]> {
    return apiClient.post(API_ENDPOINTS.PROPERTIES.BY_POLYGON, { polygon });
  },

  async getNearbyProperties(id: string, radius: number): Promise<Property[]> {
    return apiClient.get(API_ENDPOINTS.PROPERTIES.NEARBY(id), {
      params: { radius },
    });
  },
};

export const propertyService = USE_MOCK_DATA ? mockPropertyService : realPropertyService;

