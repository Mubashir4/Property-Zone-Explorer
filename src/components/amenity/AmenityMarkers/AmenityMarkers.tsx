import { useAppSelector } from '@/store/hooks';
import { useSearchAmenities } from '@/api/hooks/useAmenities';
import { AmenityMarker } from '../AmenityMarker/AmenityMarker';
import { amenityCategoryInfo } from '@/data/mockAmenities';

export const AmenityMarkers: React.FC = () => {
  const activeCategories = useAppSelector((state) => state.amenities.activeCategories);
  const { data: amenities = [] } = useSearchAmenities({});

  const filteredAmenities = amenities.filter((a) =>
    activeCategories.length === 0 ? false : activeCategories.includes(a.category)
  );

  const getCategoryColor = (category: string) => {
    return amenityCategoryInfo.find((c) => c.id === category)?.color || '#10b981';
  };

  return (
    <>
      {filteredAmenities.map((amenity) => (
        <AmenityMarker
          key={amenity.id}
          amenity={amenity}
          color={getCategoryColor(amenity.category)}
        />
      ))}
    </>
  );
};


