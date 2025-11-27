import {
  Property,
  PropertySearchParams,
  PropertySearchResponse,
  BoundingBox,
} from '@/types/property.types';
import { mockProperties } from '@/data/mockProperties';
import { isPointInPolygon } from '@/utils/spatial';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockPropertyService = {
  async searchProperties(params: PropertySearchParams): Promise<PropertySearchResponse> {
    await delay(500);

    let filtered = [...mockProperties];

    if (params.priceMin) {
      filtered = filtered.filter((p) => p.price >= params.priceMin!);
    }
    if (params.priceMax) {
      filtered = filtered.filter((p) => p.price <= params.priceMax!);
    }
    if (params.bedrooms) {
      filtered = filtered.filter((p) => p.bedrooms >= params.bedrooms!);
    }
    if (params.propertyType) {
      filtered = filtered.filter((p) => p.propertyType === params.propertyType);
    }
    if (params.suburb) {
      filtered = filtered.filter((p) =>
        p.suburb.toLowerCase().includes(params.suburb!.toLowerCase())
      );
    }

    return {
      properties: filtered,
      total: filtered.length,
      page: 1,
      pageSize: 20,
    };
  },

  async getPropertyById(id: string): Promise<Property> {
    await delay(300);
    const property = mockProperties.find((p) => p.id === id);
    if (!property) {
      throw new Error('Property not found');
    }
    return property;
  },

  async getPropertiesByBounds(_bounds: BoundingBox): Promise<Property[]> {
    await delay(400);
    return mockProperties;
  },

  async getPropertiesByPolygon(polygon: GeoJSON.Polygon): Promise<Property[]> {
    await delay(400);
    
    // Filter properties that are inside the polygon
    const filtered = mockProperties.filter((property) => {
      return isPointInPolygon(
        { lng: property.coordinates.lng, lat: property.coordinates.lat },
        polygon
      );
    });
    
    return filtered;
  },

  async getNearbyProperties(_id: string, _radius: number): Promise<Property[]> {
    await delay(300);
    return mockProperties.slice(0, 3);
  },
};

