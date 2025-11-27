import { Box, Typography, Stack } from '@mui/material';
import { Bed, Bathtub, DirectionsCar } from '@mui/icons-material';
import { Property } from '@/types/property.types';
import { formatPrice } from '@/utils/formatters';

interface PropertyMarkerPopupProps {
  property: Property;
}

export const PropertyMarkerPopup: React.FC<PropertyMarkerPopupProps> = ({ property }) => {
  return (
    <Box sx={{ minWidth: 200 }}>
      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        {property.address}
      </Typography>
      <Typography variant="h6" color="primary" gutterBottom>
        {formatPrice(property.price)}
      </Typography>
      <Stack direction="row" spacing={2}>
        <Stack direction="row" spacing={0.5} alignItems="center">
          <Bed fontSize="small" />
          <Typography variant="body2">{property.bedrooms}</Typography>
        </Stack>
        <Stack direction="row" spacing={0.5} alignItems="center">
          <Bathtub fontSize="small" />
          <Typography variant="body2">{property.bathrooms}</Typography>
        </Stack>
        <Stack direction="row" spacing={0.5} alignItems="center">
          <DirectionsCar fontSize="small" />
          <Typography variant="body2">{property.parking}</Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

