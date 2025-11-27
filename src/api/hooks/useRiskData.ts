import { useQuery } from '@tanstack/react-query';
import { riskService } from '../services/riskService';
import { RiskType } from '@/types/risk.types';

export const riskKeys = {
  all: ['risk'] as const,
  layer: (type: RiskType) => [...riskKeys.all, 'layer', type] as const,
  profile: (propertyId: string) => [...riskKeys.all, 'profile', propertyId] as const,
};

export const useRiskLayer = (type: RiskType, enabled = true) => {
  return useQuery({
    queryKey: riskKeys.layer(type),
    queryFn: () => riskService.getRiskByType(type),
    staleTime: Infinity,
    enabled,
  });
};

export const usePropertyRiskProfile = (propertyId: string | null) => {
  return useQuery({
    queryKey: riskKeys.profile(propertyId!),
    queryFn: () => riskService.getPropertyRiskProfile(propertyId!),
    staleTime: 10 * 60 * 1000,
    enabled: !!propertyId,
  });
};

