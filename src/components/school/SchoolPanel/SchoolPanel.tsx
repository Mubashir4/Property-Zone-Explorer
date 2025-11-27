import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItemText,
  ListItemButton,
  Chip,
  Stack,
  Divider,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { School as SchoolIcon } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSchoolFilters, setSelectedSchool, setSelectedCatchment, toggleSchoolsVisibility, toggleCatchmentsVisibility } from '@/store/slices/schoolsSlice';
import { setCenter, setZoom } from '@/store/slices/mapSlice';
import { useSearchSchools } from '@/api/hooks/useSchools';
import { School } from '@/types/school.types';

export const SchoolPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.schools.filters);
  const selectedSchool = useAppSelector((state) => state.schools.selectedSchool);
  const visibleSchools = useAppSelector((state) => state.schools.visibleSchools);
  const visibleCatchments = useAppSelector((state) => state.schools.visibleCatchments);

  const { data: schools = [], isLoading } = useSearchSchools(filters);

  const handleSchoolClick = (school: School) => {
    // Enable schools visibility if not already visible
    if (!visibleSchools) {
      dispatch(toggleSchoolsVisibility());
    }
    
    dispatch(setSelectedSchool(school.id));
    dispatch(setSelectedCatchment(school.id));
    // Center map on school
    dispatch(setCenter([school.coordinates.lat, school.coordinates.lng]));
    dispatch(setZoom(14));
  };

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2.5, borderBottom: 1, borderColor: 'divider' }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2.5 }}>
          <SchoolIcon color="primary" fontSize="small" />
          <Typography variant="subtitle1" fontWeight={600}>
            Schools
          </Typography>
        </Stack>

        <Box sx={{ mb: 2 }}>
          <Stack spacing={1.5}>
            <FormControlLabel
              control={
                <Switch
                  checked={visibleSchools}
                  onChange={() => dispatch(toggleSchoolsVisibility())}
                  size="small"
                />
              }
              label={
                <Typography variant="body2">
                  {visibleSchools ? 'Hide Schools' : 'Show Schools'}
                </Typography>
              }
            />
            <FormControlLabel
              control={
                <Switch
                  checked={visibleCatchments}
                  onChange={() => dispatch(toggleCatchmentsVisibility())}
                  size="small"
                />
              }
              label={
                <Typography variant="body2">
                  {visibleCatchments ? 'Hide Catchments' : 'Show Catchments'}
                </Typography>
              }
            />
          </Stack>
        </Box>

        <Stack spacing={2}>
          <FormControl fullWidth size="small">
            <InputLabel sx={{ fontSize: '0.875rem' }}>School Type</InputLabel>
            <Select
              value={filters.type || ''}
              label="School Type"
              onChange={(e) => dispatch(setSchoolFilters({ type: e.target.value }))}
            >
              <MenuItem value="">All Types</MenuItem>
              <MenuItem value="public">Public</MenuItem>
              <MenuItem value="private">Private</MenuItem>
              <MenuItem value="catholic">Catholic</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel sx={{ fontSize: '0.875rem' }}>Level</InputLabel>
            <Select
              value={filters.level || ''}
              label="Level"
              onChange={(e) => dispatch(setSchoolFilters({ level: e.target.value }))}
            >
              <MenuItem value="">All Levels</MenuItem>
              <MenuItem value="primary">Primary</MenuItem>
              <MenuItem value="secondary">Secondary</MenuItem>
              <MenuItem value="combined">Combined</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto', bgcolor: 'background.paper' }}>
        {isLoading ? (
          <Box sx={{ p: 2.5 }}>
            <Typography variant="body2" color="text.secondary">
              Loading schools...
            </Typography>
          </Box>
        ) : (
          <List dense disablePadding>
            {schools.map((school) => (
              <div key={school.id}>
                <ListItemButton
                  selected={selectedSchool === school.id}
                  onClick={() => handleSchoolClick(school)}
                  sx={{ py: 1.5 }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="body2" fontWeight={500}>
                        {school.name}
                      </Typography>
                    }
                    secondary={
                      <Stack direction="row" spacing={0.5} sx={{ mt: 0.5 }}>
                        <Chip
                          label={school.type}
                          size="small"
                          sx={{ 
                            textTransform: 'capitalize',
                            height: 20,
                            fontSize: '0.7rem',
                          }}
                        />
                        <Chip 
                          label={school.level} 
                          size="small"
                          sx={{ 
                            height: 20,
                            fontSize: '0.7rem',
                          }}
                        />
                      </Stack>
                    }
                  />
                </ListItemButton>
                <Divider />
              </div>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};

