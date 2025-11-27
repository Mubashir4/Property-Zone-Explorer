import { apiClient } from '../config/apiClient';
import { API_ENDPOINTS } from '../config/apiEndpoints';
import { Amenity, AmenitySearchParams, AmenityCategoryInfo } from '@/types/amenity.types';
import { mockAmenityService } from './mockAmenityService';

const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';

const realAmenityService = {
  async searchAmenities(params: AmenitySearchParams): Promise<Amenity[]> {
    return apiClient.get(API_ENDPOINTS.AMENITIES.SEARCH, { params });
  },

  async getAmenitiesByCategory(category: string): Promise<Amenity[]> {
    return apiClient.get(API_ENDPOINTS.AMENITIES.BY_CATEGORY, { params: { category } });
  },

  async getAmenitiesByLocation(
    lat: number,
    lng: number,
    radius: number
  ): Promise<Amenity[]> {
    return apiClient.get(API_ENDPOINTS.AMENITIES.BY_LOCATION, {
      params: { lat, lng, radius },
    });
  },

  async getCategories(): Promise<AmenityCategoryInfo[]> {
    return apiClient.get(API_ENDPOINTS.AMENITIES.CATEGORIES);
  },
};

export const amenityService = USE_MOCK_DATA ? mockAmenityService : realAmenityService;

