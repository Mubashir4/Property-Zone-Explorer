import { RiskProfile, RiskDataResponse, RiskType } from '@/types/risk.types';
import {
  mockFloodData,
  mockBushfireData,
  mockHeritageData,
  mockZoningData,
} from '@/data/mockRiskData';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockRiskService = {
  async getFloodData(): Promise<RiskDataResponse> {
    await delay(400);
    return mockFloodData;
  },

  async getBushfireData(): Promise<RiskDataResponse> {
    await delay(400);
    return mockBushfireData;
  },

  async getHeritageData(): Promise<RiskDataResponse> {
    await delay(400);
    return mockHeritageData;
  },

  async getZoningData(): Promise<RiskDataResponse> {
    await delay(400);
    return mockZoningData;
  },

  async getRiskByType(type: RiskType): Promise<RiskDataResponse> {
    const services = {
      flood: this.getFloodData,
      bushfire: this.getBushfireData,
      heritage: this.getHeritageData,
      zoning: this.getZoningData,
    };
    return services[type]();
  },

  async getPropertyRiskProfile(propertyId: string): Promise<RiskProfile> {
    await delay(300);
    
    // Mock risk profile for any property
    return {
      propertyId,
      flood: {
        level: 'low',
        description: 'This property is in a low flood risk zone based on historical data.',
      },
      bushfire: {
        level: 'medium',
        balRating: 'BAL-12.5',
        description: 'Moderate bushfire risk. BAL-12.5 construction standards apply.',
      },
      heritage: {
        listed: false,
        description: 'This property is not heritage listed.',
      },
      zoning: {
        zone: 'R2 - Low Density Residential',
        description: 'Low density residential zoning with minimum 600sqm lots.',
      },
    };
  },
};


