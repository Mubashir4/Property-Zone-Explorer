import { GeoJSON as LeafletGeoJSON, Popup } from 'react-leaflet';
import { useAllCatchments } from '@/api/hooks/useSchools';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setHoveredCatchment, setSelectedCatchment } from '@/store/slices/schoolsSlice';
import { Box, Typography } from '@mui/material';
import { useMemo } from 'react';
import { isPointInPolygon } from '@/utils/spatial';
import { useSearchProperties } from '@/api/hooks/useProperties';

export const CatchmentOverlay: React.FC = () => {
  const dispatch = useAppDispatch();
  const visibleCatchments = useAppSelector((state) => state.schools.visibleCatchments);
  const hoveredCatchment = useAppSelector((state) => state.schools.hoveredCatchment);
  const selectedCatchment = useAppSelector((state) => state.schools.selectedCatchment);
  const { data: catchments = [], isLoading } = useAllCatchments();
  
  // Get all properties to calculate which ones are in each catchment
  const filters = useAppSelector((state) => state.search.filters);
  const { data: propertiesData } = useSearchProperties(filters);
  const allProperties = propertiesData?.properties || [];

  // Calculate property counts for each catchment
  const catchmentPropertyCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    catchments.forEach((catchment) => {
      counts[catchment.id] = allProperties.filter((property) =>
        isPointInPolygon(
          { lat: property.coordinates.lat, lng: property.coordinates.lng },
          catchment.geometry
        )
      ).length;
    });
    return counts;
  }, [catchments, allProperties]);

  if (!visibleCatchments || isLoading || catchments.length === 0) {
    return null;
  }

  return (
    <>
      {catchments.map((catchment) => {
        const isHovered = hoveredCatchment === catchment.id;
        const isSelected = selectedCatchment === catchment.id;
        const propertyCount = catchmentPropertyCounts[catchment.id] || 0;
        
        return (
          <LeafletGeoJSON
            key={catchment.id}
            data={catchment.geometry}
            style={{
              color: catchment.color,
              weight: isHovered || isSelected ? 3 : 2,
              fillColor: catchment.color,
              fillOpacity: isHovered || isSelected ? 0.3 : 0.2,
            }}
            eventHandlers={{
              mouseover: () => {
                dispatch(setHoveredCatchment(catchment.id));
              },
              mouseout: () => {
                dispatch(setHoveredCatchment(null));
              },
              click: () => {
                dispatch(setSelectedCatchment(catchment.id));
              },
            }}
          >
            <Popup>
              <Box sx={{ minWidth: 200 }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  {catchment.schoolName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {catchment.schoolType} - {catchment.catchmentLevel}
                </Typography>
                {propertyCount > 0 && (
                  <Typography variant="body2" color="primary" sx={{ mt: 0.5 }}>
                    {propertyCount} {propertyCount === 1 ? 'property' : 'properties'} in catchment
                  </Typography>
                )}
              </Box>
            </Popup>
          </LeafletGeoJSON>
        );
      })}
    </>
  );
};
