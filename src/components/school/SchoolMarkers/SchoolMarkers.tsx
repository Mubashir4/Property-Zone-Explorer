import { useAppSelector } from '@/store/hooks';
import { useSearchSchools } from '@/api/hooks/useSchools';
import { SchoolMarker } from '../SchoolMarker/SchoolMarker';
import { useAppDispatch } from '@/store/hooks';
import { setSelectedSchool, setSelectedCatchment } from '@/store/slices/schoolsSlice';

export const SchoolMarkers: React.FC = () => {
  const dispatch = useAppDispatch();
  const visibleSchools = useAppSelector((state) => state.schools.visibleSchools);
  const filters = useAppSelector((state) => state.schools.filters);
  const { data: schools = [] } = useSearchSchools(filters);

  if (!visibleSchools) {
    return null;
  }

  const handleSchoolClick = (school: { id: string }) => {
    dispatch(setSelectedSchool(school.id));
    dispatch(setSelectedCatchment(school.id));
  };

  return (
    <>
      {schools.map((school) => (
        <SchoolMarker key={school.id} school={school} onClick={handleSchoolClick} />
      ))}
    </>
  );
};


