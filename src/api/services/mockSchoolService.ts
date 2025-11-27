import { School, SchoolSearchParams, CatchmentData, SchoolCatchment } from '@/types/school.types';
import { mockSchools, mockCatchmentData } from '@/data/mockSchools';
import { schoolCatchments } from '@/data/schoolCatchments';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockSchoolService = {
  async searchSchools(params: SchoolSearchParams): Promise<School[]> {
    await delay(300);
    
    let filtered = [...mockSchools];
    
    if (params.type) {
      filtered = filtered.filter((s) => s.type === params.type);
    }
    if (params.level) {
      filtered = filtered.filter((s) => s.level === params.level);
    }
    if (params.gender) {
      filtered = filtered.filter((s) => s.gender === params.gender);
    }
    
    return filtered;
  },

  async getSchoolById(id: string): Promise<School> {
    await delay(200);
    const school = mockSchools.find((s) => s.id === id);
    if (!school) {
      throw new Error('School not found');
    }
    return school;
  },

  async getSchoolCatchment(id: string): Promise<CatchmentData> {
    await delay(300);
    // Return mock catchment for any school (for demo purposes)
    return {
      ...mockCatchmentData,
      schoolId: id,
    };
  },

  async getSchoolsByType(type: 'primary' | 'secondary' | 'combined'): Promise<School[]> {
    await delay(300);
    return mockSchools.filter((s) => s.level === type);
  },

  async getPropertiesInCatchment(_schoolId: string) {
    await delay(300);
    // Would return properties, but that's handled by property service
    return [];
  },

  async getAllCatchments(): Promise<SchoolCatchment[]> {
    await delay(200);
    return schoolCatchments;
  },
};


