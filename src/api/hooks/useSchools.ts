import { useQuery } from '@tanstack/react-query';
import { schoolService } from '../services/schoolService';
import { SchoolSearchParams } from '@/types/school.types';

export const schoolKeys = {
  all: ['schools'] as const,
  lists: () => [...schoolKeys.all, 'list'] as const,
  list: (params: SchoolSearchParams) => [...schoolKeys.lists(), params] as const,
  details: () => [...schoolKeys.all, 'detail'] as const,
  detail: (id: string) => [...schoolKeys.details(), id] as const,
  catchment: (id: string) => [...schoolKeys.all, 'catchment', id] as const,
  allCatchments: () => [...schoolKeys.all, 'allCatchments'] as const,
};

export const useSearchSchools = (params: SchoolSearchParams) => {
  return useQuery({
    queryKey: schoolKeys.list(params),
    queryFn: () => schoolService.searchSchools(params),
    staleTime: 10 * 60 * 1000,
  });
};

export const useSchoolDetails = (id: string) => {
  return useQuery({
    queryKey: schoolKeys.detail(id),
    queryFn: () => schoolService.getSchoolById(id),
    staleTime: 10 * 60 * 1000,
    enabled: !!id,
  });
};

export const useSchoolCatchment = (id: string | null) => {
  return useQuery({
    queryKey: schoolKeys.catchment(id!),
    queryFn: () => schoolService.getSchoolCatchment(id!),
    staleTime: 30 * 60 * 1000,
    enabled: !!id,
  });
};

export const useAllCatchments = () => {
  return useQuery({
    queryKey: schoolKeys.allCatchments(),
    queryFn: () => schoolService.getAllCatchments(),
    staleTime: 30 * 60 * 1000,
  });
};

