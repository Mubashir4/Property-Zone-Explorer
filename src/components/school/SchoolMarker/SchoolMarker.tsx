import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { School } from '@/types/school.types';
import { Box, Typography } from '@mui/material';
import { useAppDispatch } from '@/store/hooks';
import { setHoveredCatchment } from '@/store/slices/schoolsSlice';

interface SchoolMarkerProps {
  school: School;
  onClick?: (school: School) => void;
}

const createSchoolIcon = (type: string) => {
  const colors = {
    public: '#2563eb',
    private: '#7c3aed',
    catholic: '#dc2626',
  };
  const color = colors[type as keyof typeof colors] || '#6b7280';

  return L.divIcon({
    className: 'school-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      "></div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

export const SchoolMarker: React.FC<SchoolMarkerProps> = ({ school, onClick }) => {
  const dispatch = useAppDispatch();

  return (
    <Marker
      position={[school.coordinates.lat, school.coordinates.lng]}
      icon={createSchoolIcon(school.type)}
      eventHandlers={{
        click: () => onClick?.(school),
        mouseover: () => {
          dispatch(setHoveredCatchment(school.id));
        },
        mouseout: () => {
          dispatch(setHoveredCatchment(null));
        },
      }}
    >
      <Popup>
        <Box sx={{ minWidth: 180 }}>
          <Typography variant="subtitle2" fontWeight={600}>
            {school.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {school.type} - {school.level}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {school.address}
          </Typography>
        </Box>
      </Popup>
    </Marker>
  );
};

