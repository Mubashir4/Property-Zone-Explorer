import { apiClient } from '../config/apiClient';
import { API_ENDPOINTS } from '../config/apiEndpoints';
import { RiskProfile, RiskDataResponse, RiskType } from '@/types/risk.types';
import { mockRiskService } from './mockRiskService';

const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';

const realRiskService = {
  async getFloodData(): Promise<RiskDataResponse> {
    return apiClient.get(API_ENDPOINTS.RISK.FLOOD);
  },

  async getBushfireData(): Promise<RiskDataResponse> {
    return apiClient.get(API_ENDPOINTS.RISK.BUSHFIRE);
  },

  async getHeritageData(): Promise<RiskDataResponse> {
    return apiClient.get(API_ENDPOINTS.RISK.HERITAGE);
  },

  async getZoningData(): Promise<RiskDataResponse> {
    return apiClient.get(API_ENDPOINTS.RISK.ZONING);
  },

  async getRiskByType(type: RiskType): Promise<RiskDataResponse> {
    const endpoints = {
      flood: this.getFloodData,
      bushfire: this.getBushfireData,
      heritage: this.getHeritageData,
      zoning: this.getZoningData,
    };
    return endpoints[type]();
  },

  async getPropertyRiskProfile(propertyId: string): Promise<RiskProfile> {
    return apiClient.get(API_ENDPOINTS.RISK.BY_PROPERTY(propertyId));
  },
};

export const riskService = USE_MOCK_DATA ? mockRiskService : realRiskService;

