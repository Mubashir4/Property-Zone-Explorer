import { Box, Typography, Grid, Paper, Chip, Stack, Divider } from '@mui/material';
import { Bed, Bathtub, DirectionsCar, CalendarToday, Person } from '@mui/icons-material';
import { Property } from '@/types/property.types';
import { formatPrice, formatDate, formatPhoneNumber } from '@/utils/formatters';

interface PropertyDetailProps {
  property: Property;
}

export const PropertyDetail: React.FC<PropertyDetailProps> = ({ property }) => {
  return (
    <Box>
      {/* Image Gallery */}
      <Box
        component="img"
        src={property.images[0] || '/placeholder-property.jpg'}
        alt={property.address}
        sx={{
          width: '100%',
          height: 400,
          objectFit: 'cover',
          borderRadius: 2,
          mb: 3,
        }}
      />

      {/* Price and Address */}
      <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
        {formatPrice(property.price)}
      </Typography>
      <Typography variant="h5" gutterBottom>
        {property.address}
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        {property.suburb}, {property.state} {property.postcode}
      </Typography>

      {/* Key Features */}
      <Stack direction="row" spacing={3} sx={{ my: 3 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Bed color="action" />
          <Typography variant="body1">{property.bedrooms} Bedrooms</Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <Bathtub color="action" />
          <Typography variant="body1">{property.bathrooms} Bathrooms</Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <DirectionsCar color="action" />
          <Typography variant="body1">{property.parking} Parking</Typography>
        </Stack>
      </Stack>

      <Divider sx={{ my: 3 }} />

      {/* Description */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Description
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
          {property.description}
        </Typography>
      </Box>

      {/* Features */}
      {property.features.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Features
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {property.features.map((feature, index) => (
              <Chip key={index} label={feature} size="small" />
            ))}
          </Stack>
        </Box>
      )}

      <Divider sx={{ my: 3 }} />

      {/* Agent Information */}
      <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.default' }}>
        <Typography variant="h6" gutterBottom>
          Contact Agent
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Person />
              <Typography>{property.agent.name}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              Phone: {formatPhoneNumber(property.agent.phone)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              Email: {property.agent.email}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" spacing={1} alignItems="center">
              <CalendarToday fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                Listed {formatDate(property.listingDate)}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

