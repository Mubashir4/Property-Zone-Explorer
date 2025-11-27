import { Amenity, AmenitySearchParams, AmenityCategoryInfo } from '@/types/amenity.types';
import { mockAmenities, amenityCategoryInfo } from '@/data/mockAmenities';
import { calculateDistance } from '@/utils/spatial';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockAmenityService = {
  async searchAmenities(params: AmenitySearchParams): Promise<Amenity[]> {
    await delay(300);
    
    let filtered = [...mockAmenities];
    
    if (params.category) {
      filtered = filtered.filter((a) => a.category === params.category);
    }
    
    if (params.location && params.radius) {
      filtered = filtered.filter((a) => {
        const distance = calculateDistance(params.location!, a.coordinates);
        return distance <= params.radius!;
      });
    }
    
    return filtered;
  },

  async getAmenitiesByCategory(category: string): Promise<Amenity[]> {
    await delay(300);
    return mockAmenities.filter((a) => a.category === category);
  },

  async getAmenitiesByLocation(
    lat: number,
    lng: number,
    radius: number
  ): Promise<Amenity[]> {
    await delay(300);
    
    return mockAmenities.filter((a) => {
      const distance = calculateDistance({ lat, lng }, a.coordinates);
      return distance <= radius;
    });
  },

  async getCategories(): Promise<AmenityCategoryInfo[]> {
    await delay(100);
    return amenityCategoryInfo;
  },
};


