import { Paper, IconButton, Tooltip, Stack, Divider } from '@mui/material';
import {
  MyLocation,
  School,
  ZoomIn,
  ZoomOut,
} from '@mui/icons-material';
import { useMap } from 'react-leaflet';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleSchoolsVisibility } from '@/store/slices/schoolsSlice';

export const MapToolbar: React.FC = () => {
  const map = useMap();
  const dispatch = useAppDispatch();
  const schoolsVisible = useAppSelector((state) => state.schools.visibleSchools);

  const handleZoomIn = () => {
    map.zoomIn();
  };

  const handleZoomOut = () => {
    map.zoomOut();
  };

  const handleFindMe = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        map.flyTo([position.coords.latitude, position.coords.longitude], 14);
      },
      (error) => {
        console.error('Geolocation error:', error);
      }
    );
  };

  const handleToggleSchools = () => {
    dispatch(toggleSchoolsVisibility());
  };

  return (
    <Paper
      elevation={2}
      sx={{
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 1000,
      }}
    >
      <Stack divider={<Divider />}>
        <Tooltip title="Zoom In" placement="right">
          <IconButton onClick={handleZoomIn} size="small">
            <ZoomIn />
          </IconButton>
        </Tooltip>

        <Tooltip title="Zoom Out" placement="right">
          <IconButton onClick={handleZoomOut} size="small">
            <ZoomOut />
          </IconButton>
        </Tooltip>

        <Tooltip title="Find My Location" placement="right">
          <IconButton onClick={handleFindMe} size="small">
            <MyLocation />
          </IconButton>
        </Tooltip>

        <Tooltip title="Toggle Schools" placement="right">
          <IconButton
            onClick={handleToggleSchools}
            size="small"
            color={schoolsVisible ? 'primary' : 'default'}
          >
            <School />
          </IconButton>
        </Tooltip>
      </Stack>
    </Paper>
  );
};

