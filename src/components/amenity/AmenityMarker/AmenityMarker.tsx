import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Amenity } from '@/types/amenity.types';
import { Box, Typography } from '@mui/material';

interface AmenityMarkerProps {
  amenity: Amenity;
  color?: string;
}

const createAmenityIcon = (color: string) => {
  return L.divIcon({
    className: 'amenity-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      "></div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

export const AmenityMarker: React.FC<AmenityMarkerProps> = ({ amenity, color = '#10b981' }) => {
  return (
    <Marker
      position={[amenity.coordinates.lat, amenity.coordinates.lng]}
      icon={createAmenityIcon(color)}
    >
      <Popup>
        <Box sx={{ minWidth: 150 }}>
          <Typography variant="subtitle2" fontWeight={600}>
            {amenity.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {amenity.category}
          </Typography>
          {amenity.address && (
            <Typography variant="body2" color="text.secondary">
              {amenity.address}
            </Typography>
          )}
        </Box>
      </Popup>
    </Marker>
  );
};

