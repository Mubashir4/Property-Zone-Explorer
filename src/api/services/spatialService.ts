import { apiClient } from '../config/apiClient';
import { API_ENDPOINTS } from '../config/apiEndpoints';
import { GeocodeResult, DistanceResult } from '@/types/spatial.types';

export const spatialService = {
  async geocode(address: string): Promise<GeocodeResult> {
    return apiClient.get(API_ENDPOINTS.SPATIAL.GEOCODE, { params: { address } });
  },

  async reverseGeocode(lat: number, lng: number): Promise<GeocodeResult> {
    return apiClient.get(API_ENDPOINTS.SPATIAL.REVERSE_GEOCODE, {
      params: { lat, lng },
    });
  },

  async calculateDistance(
    from: { lat: number; lng: number },
    to: { lat: number; lng: number }
  ): Promise<DistanceResult> {
    return apiClient.post(API_ENDPOINTS.SPATIAL.DISTANCE, { from, to });
  },
};

