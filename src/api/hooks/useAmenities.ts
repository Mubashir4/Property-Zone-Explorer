import { useQuery } from '@tanstack/react-query';
import { amenityService } from '../services/amenityService';
import { AmenitySearchParams } from '@/types/amenity.types';

export const amenityKeys = {
  all: ['amenities'] as const,
  lists: () => [...amenityKeys.all, 'list'] as const,
  list: (params: AmenitySearchParams) => [...amenityKeys.lists(), params] as const,
  categories: () => [...amenityKeys.all, 'categories'] as const,
};

export const useSearchAmenities = (params: AmenitySearchParams) => {
  return useQuery({
    queryKey: amenityKeys.list(params),
    queryFn: () => amenityService.searchAmenities(params),
    staleTime: 10 * 60 * 1000,
  });
};

export const useAmenitiesByLocation = (
  lat: number | null,
  lng: number | null,
  radius: number
) => {
  return useQuery({
    queryKey: [...amenityKeys.all, 'location', lat, lng, radius],
    queryFn: () => amenityService.getAmenitiesByLocation(lat!, lng!, radius),
    staleTime: 10 * 60 * 1000,
    enabled: lat !== null && lng !== null,
  });
};

export const useAmenityCategories = () => {
  return useQuery({
    queryKey: amenityKeys.categories(),
    queryFn: () => amenityService.getCategories(),
    staleTime: Infinity,
  });
};

