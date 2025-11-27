import { useQuery } from '@tanstack/react-query';
import { propertyService } from '../services/propertyService';
import { PropertySearchParams, BoundingBox } from '@/types/property.types';

// Query Keys - Centralized for cache management
export const propertyKeys = {
  all: ['properties'] as const,
  lists: () => [...propertyKeys.all, 'list'] as const,
  list: (params: PropertySearchParams) => [...propertyKeys.lists(), params] as const,
  details: () => [...propertyKeys.all, 'detail'] as const,
  detail: (id: string) => [...propertyKeys.details(), id] as const,
  bounds: (bounds: BoundingBox) => [...propertyKeys.all, 'bounds', bounds] as const,
  polygon: (polygon: GeoJSON.Polygon) => [...propertyKeys.all, 'polygon', polygon] as const,
};

export const useSearchProperties = (params: PropertySearchParams) => {
  return useQuery({
    queryKey: propertyKeys.list(params),
    queryFn: () => propertyService.searchProperties(params),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    // Always enabled - filters can be empty for "all properties"
  });
};

export const usePropertyDetails = (id: string) => {
  return useQuery({
    queryKey: propertyKeys.detail(id),
    queryFn: () => propertyService.getPropertyById(id),
    staleTime: 10 * 60 * 1000,
    enabled: !!id,
  });
};

export const usePropertiesByBounds = (bounds: BoundingBox | null, enabled = true) => {
  return useQuery({
    queryKey: propertyKeys.bounds(bounds!),
    queryFn: () => propertyService.getPropertiesByBounds(bounds!),
    staleTime: 2 * 60 * 1000,
    enabled: enabled && !!bounds,
  });
};

export const usePropertiesByPolygon = (polygon: GeoJSON.Polygon | null, enabled = true) => {
  return useQuery({
    queryKey: propertyKeys.polygon(polygon!),
    queryFn: () => propertyService.getPropertiesByPolygon(polygon!),
    staleTime: 2 * 60 * 1000,
    enabled: enabled && !!polygon,
  });
};

