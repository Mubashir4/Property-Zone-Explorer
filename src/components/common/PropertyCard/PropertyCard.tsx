import { memo } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Stack,
} from '@mui/material';
import { Favorite, Share, Bed, Bathtub, DirectionsCar, Place } from '@mui/icons-material';
import { Property } from '@/types/property.types';
import { formatPrice } from '@/utils/formatters';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setHoveredProperty } from '@/store/slices/searchSlice';
import { toggleShortlist } from '@/store/slices/shortlistSlice';
import { isPointInPolygon } from '@/utils/spatial';

interface PropertyCardProps {
  property: Property;
  onSelect?: (property: Property) => void;
  selected?: boolean;
}

export const PropertyCard = memo<PropertyCardProps>(
  ({ property, onSelect, selected = false }) => {
    const dispatch = useAppDispatch();
    const searchArea = useAppSelector((state) => state.search.searchArea);
    const isFavorite = useAppSelector((state) =>
      state.shortlist.favorites.some((p) => p.id === property.id)
    );
    
    const handleClick = () => {
      onSelect?.(property);
    };

    const handleMouseEnter = () => {
      dispatch(setHoveredProperty(property.id));
    };

    const handleMouseLeave = () => {
      dispatch(setHoveredProperty(null));
    };

    const handleFavoriteClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      dispatch(toggleShortlist(property));
    };

    // Check if property is in the drawn zone
    const isInZone = searchArea ? isPointInPolygon(
      { lng: property.coordinates.lng, lat: property.coordinates.lat },
      searchArea
    ) : false;

    return (
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Card
          onClick={handleClick}
          sx={{
            cursor: 'pointer',
            position: 'relative',
            border: selected ? 2 : 0,
            borderColor: 'primary.main',
          }}
        >
          <Box sx={{ position: 'relative' }}>
            <CardMedia
              component="img"
              height="200"
              image={property.images[0] || '/placeholder-property.jpg'}
              alt={property.address}
            />

            <Chip
              label={formatPrice(property.price)}
              sx={{
                position: 'absolute',
                top: 12,
                left: 12,
                bgcolor: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(10px)',
                fontWeight: 700,
              }}
            />

            <Stack
              direction="row"
              spacing={1}
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
              }}
            >
              <IconButton
                size="small"
                onClick={handleFavoriteClick}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.95)',
                  '&:hover': { bgcolor: 'white' },
                  color: isFavorite ? 'error.main' : 'inherit',
                }}
              >
                <Favorite fontSize="small" color={isFavorite ? 'error' : 'inherit'} />
              </IconButton>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.95)',
                  '&:hover': { bgcolor: 'white' },
                }}
              >
                <Share fontSize="small" />
              </IconButton>
            </Stack>
          </Box>

          <CardContent>
            <Typography variant="h6" fontWeight={600} gutterBottom noWrap>
              {property.address}
            </Typography>

            <Typography variant="body2" color="text.secondary" gutterBottom>
              {property.suburb}, {property.state} {property.postcode}
            </Typography>

            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Bed fontSize="small" color="action" />
                <Typography variant="body2">{property.bedrooms}</Typography>
              </Stack>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Bathtub fontSize="small" color="action" />
                <Typography variant="body2">{property.bathrooms}</Typography>
              </Stack>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <DirectionsCar fontSize="small" color="action" />
                <Typography variant="body2">{property.parking}</Typography>
              </Stack>
            </Stack>

            <Box sx={{ mt: 1 }}>
              <Chip
                label={property.propertyType}
                size="small"
                sx={{ textTransform: 'capitalize' }}
              />
              {isInZone && (
                <Chip
                  icon={<Place fontSize="small" />}
                  label="In Zone"
                  size="small"
                  color="primary"
                  sx={{ ml: 0.5 }}
                />
              )}
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    );
  },
  (prev, next) => prev.property.id === next.property.id && prev.selected === next.selected
);

PropertyCard.displayName = 'PropertyCard';

