import { Box, Typography, Alert } from '@mui/material';
import { Property } from '@/types/property.types';
import { PropertyCard } from '@/components/common/PropertyCard/PropertyCard';
import { PropertyCardSkeleton } from '@/components/common/PropertyCardSkeleton/PropertyCardSkeleton';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSelectedProperty } from '@/store/slices/searchSlice';

interface PropertyListProps {
  properties: Property[];
  isLoading: boolean;
  error?: Error | null;
}

export const PropertyList: React.FC<PropertyListProps> = ({ properties, isLoading, error }) => {
  const dispatch = useAppDispatch();
  const showShortlist = useAppSelector((state) => state.search.showShortlist);

  const handlePropertySelect = (property: Property) => {
    dispatch(setSelectedProperty(property.id));
  };

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">Failed to load properties. Please try again.</Alert>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box
        sx={{
          p: 2,
          height: '100%',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <PropertyCardSkeleton key={i} />
        ))}
      </Box>
    );
  }

  if (properties.length === 0) {
    return (
      <Box
        sx={{
          p: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <Typography variant="body1" color="text.secondary">
          {showShortlist 
            ? 'Your shortlist is empty. Add properties to your shortlist by clicking the heart icon.'
            : 'No properties found. Try adjusting your search criteria.'}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 2,
        height: '100%',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        {showShortlist 
          ? `${properties.length} ${properties.length === 1 ? 'property' : 'properties'} in your shortlist`
          : `${properties.length} ${properties.length === 1 ? 'property' : 'properties'} found`}
      </Typography>
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          onSelect={handlePropertySelect}
        />
      ))}
    </Box>
  );
};

