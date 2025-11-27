import {
  Box,
  Typography,
  Stack,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Chip,
  Divider,
} from '@mui/material';
import { Place } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleCategory } from '@/store/slices/amenitiesSlice';
import { useAmenityCategories, useSearchAmenities } from '@/api/hooks/useAmenities';
import { AmenityCategory } from '@/types/amenity.types';

export const AmenityPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeCategories = useAppSelector((state) => state.amenities.activeCategories);

  const { data: categories = [] } = useAmenityCategories();
  const { data: amenities = [] } = useSearchAmenities({
    category: activeCategories[0],
  });

  const handleCategoryToggle = (categoryId: AmenityCategory) => {
    dispatch(toggleCategory(categoryId));
  };

  const filteredAmenities = amenities.filter((a) =>
    activeCategories.length === 0 ? true : activeCategories.includes(a.category)
  );

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2.5, borderBottom: 1, borderColor: 'divider' }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2.5 }}>
          <Place color="primary" fontSize="small" />
          <Typography variant="subtitle1" fontWeight={600}>
            Amenities
          </Typography>
        </Stack>

        <Typography variant="caption" color="text.secondary" fontWeight={500} sx={{ mb: 1.5, display: 'block' }}>
          Select categories to display:
        </Typography>

        <Box sx={{ maxHeight: 300, overflow: 'auto', pr: 0.5 }}>
          <Stack spacing={0.25}>
            {categories.map((cat) => (
              <FormControlLabel
                key={cat.id}
                control={
                  <Checkbox
                    checked={activeCategories.includes(cat.id)}
                    onChange={() => handleCategoryToggle(cat.id)}
                    size="small"
                  />
                }
                label={
                  <Stack direction="row" spacing={0.75} alignItems="center">
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        bgcolor: cat.color,
                        borderRadius: '50%',
                      }}
                    />
                    <Typography variant="body2" fontSize="0.8125rem">
                      {cat.name}
                    </Typography>
                  </Stack>
                }
                sx={{ 
                  mx: 0,
                  '& .MuiFormControlLabel-label': {
                    fontSize: '0.8125rem',
                  },
                }}
              />
            ))}
          </Stack>
        </Box>
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto', bgcolor: 'background.paper' }}>
        <List dense>
          {filteredAmenities.map((amenity) => (
            <div key={amenity.id}>
              <ListItem>
                <ListItemText
                  primary={amenity.name}
                  secondary={
                    <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                      <Chip
                        label={amenity.category}
                        size="small"
                        sx={{ textTransform: 'capitalize' }}
                      />
                      {amenity.rating && (
                        <Chip label={`⭐ ${amenity.rating}`} size="small" />
                      )}
                    </Stack>
                  }
                />
              </ListItem>
              <Divider />
            </div>
          ))}
          {filteredAmenities.length === 0 && (
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Select categories to see amenities
              </Typography>
            </Box>
          )}
        </List>
      </Box>
    </Box>
  );
};


