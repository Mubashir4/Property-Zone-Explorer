import { apiClient } from '../config/apiClient';
import { API_ENDPOINTS } from '../config/apiEndpoints';
import { School, SchoolSearchParams, CatchmentData, SchoolCatchment } from '@/types/school.types';
import { Property } from '@/types/property.types';
import { mockSchoolService } from './mockSchoolService';

const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';

const realSchoolService = {
  async searchSchools(params: SchoolSearchParams): Promise<School[]> {
    return apiClient.get(API_ENDPOINTS.SCHOOLS.SEARCH, { params });
  },

  async getSchoolById(id: string): Promise<School> {
    return apiClient.get(API_ENDPOINTS.SCHOOLS.BY_ID(id));
  },

  async getSchoolCatchment(id: string): Promise<CatchmentData> {
    return apiClient.get(API_ENDPOINTS.SCHOOLS.CATCHMENT(id));
  },

  async getSchoolsByType(type: 'primary' | 'secondary' | 'combined'): Promise<School[]> {
    return apiClient.get(API_ENDPOINTS.SCHOOLS.BY_TYPE, { params: { type } });
  },

  async getPropertiesInCatchment(schoolId: string): Promise<Property[]> {
    return apiClient.get(API_ENDPOINTS.SCHOOLS.NEARBY_PROPERTIES(schoolId));
  },

  async getAllCatchments(): Promise<SchoolCatchment[]> {
    // For real API, this would fetch from an endpoint
    // For now, return empty array as this is typically a mock feature
    return [];
  },
};

export const schoolService = USE_MOCK_DATA ? mockSchoolService : realSchoolService;

