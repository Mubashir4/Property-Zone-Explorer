import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
  InputAdornment,
  FormControlLabel,
  Switch,
  Divider,
  Typography,
  Chip,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setFilters, clearFilters, setEnablePolygonFilter } from '@/store/slices/searchSlice';
import { PROPERTY_TYPES, BEDROOM_OPTIONS } from '@/utils/constants';
import { useSearchProperties, usePropertiesByPolygon } from '@/api/hooks/useProperties';
import { useDebounce } from '@/hooks/useDebounce';
import { useMemo } from 'react';

export const PropertyFilters: React.FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.search.filters);
  const { searchArea, enablePolygonFilter } = useAppSelector((state) => state.search);
  
  // Debounce filters to avoid excessive API calls
  const debouncedFilters = useDebounce(filters, 500);
  
  // Fetch properties to get count
  const { data: regularData } = useSearchProperties(debouncedFilters);
  const shouldUsePolygonFilter = enablePolygonFilter && !!searchArea;
  const { data: polygonData } = usePropertiesByPolygon(searchArea, shouldUsePolygonFilter);
  
  // Calculate property count
  const propertyCount = useMemo(() => {
    if (shouldUsePolygonFilter && polygonData) {
      return polygonData.length;
    }
    return regularData?.total || 0;
  }, [shouldUsePolygonFilter, polygonData, regularData]);

  const handlePriceChange = (field: 'priceMin' | 'priceMax', value: string) => {
    const numValue = value ? Number(value) : undefined;
    dispatch(setFilters({ [field]: numValue }));
  };

  const handleBedroomsChange = (_: React.MouseEvent<HTMLElement>, value: number | null) => {
    dispatch(setFilters({ bedrooms: value || undefined }));
  };

  const handlePropertyTypeChange = (value: string) => {
    dispatch(setFilters({ propertyType: value || undefined }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  return (
    <Box sx={{ p: 2.5, height: '100%', overflow: 'auto' }}>
      <Stack spacing={2.5}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Matching Properties
          </Typography>
          <Chip 
            label={propertyCount} 
            color="primary" 
            size="small"
            sx={{ fontWeight: 600 }}
          />
        </Box>
        
        <Divider />
        <TextField
          label="Min Price"
          type="number"
          value={filters.priceMin || ''}
          onChange={(e) => handlePriceChange('priceMin', e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          fullWidth
        />

        <TextField
          label="Max Price"
          type="number"
          value={filters.priceMax || ''}
          onChange={(e) => handlePriceChange('priceMax', e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          fullWidth
        />

        <Box>
          <InputLabel sx={{ mb: 1, fontSize: '0.875rem', fontWeight: 600 }}>
            Bedrooms
          </InputLabel>
          <ToggleButtonGroup
            value={filters.bedrooms}
            exclusive
            onChange={handleBedroomsChange}
            fullWidth
            size="small"
            sx={{
              '& .MuiToggleButton-root': {
                py: 0.75,
                fontSize: '0.875rem',
              },
            }}
          >
            {BEDROOM_OPTIONS.map((num) => (
              <ToggleButton key={num} value={num}>
                {num}+
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        <FormControl fullWidth>
          <InputLabel>Property Type</InputLabel>
          <Select
            value={filters.propertyType || ''}
            label="Property Type"
            onChange={(e) => handlePropertyTypeChange(e.target.value)}
          >
            <MenuItem value="">All Types</MenuItem>
            {PROPERTY_TYPES.map((type) => (
              <MenuItem key={type.value} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Suburb"
          value={filters.suburb || ''}
          onChange={(e) => dispatch(setFilters({ suburb: e.target.value || undefined }))}
          fullWidth
        />

        {searchArea && (
          <>
            <Divider sx={{ my: 1 }} />
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Drawn Area Filter
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={enablePolygonFilter}
                    onChange={(e) => dispatch(setEnablePolygonFilter(e.target.checked))}
                    size="small"
                  />
                }
                label={
                  <Typography variant="body2">
                    {enablePolygonFilter ? 'Show only properties in drawn area' : 'Show all properties'}
                  </Typography>
                }
              />
            </Box>
          </>
        )}

        <Button variant="outlined" onClick={handleClearFilters} fullWidth>
          Clear Filters
        </Button>
      </Stack>
    </Box>
  );
};

