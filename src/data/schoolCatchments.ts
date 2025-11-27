import { SchoolCatchment } from '@/types/school.types';
import schoolCatchmentsData from '../../candidate-coding-test-01/sample-data/school-catchments.json';

// Transform the JSON data to match our SchoolCatchment interface
export const schoolCatchments: SchoolCatchment[] = schoolCatchmentsData.catchments.map((catchment) => ({
  id: catchment.id,
  schoolName: catchment.schoolName,
  schoolType: catchment.schoolType,
  catchmentLevel: catchment.catchmentLevel as 'primary' | 'secondary',
  color: catchment.color,
  geometry: catchment.geometry as GeoJSON.Polygon,
}));

