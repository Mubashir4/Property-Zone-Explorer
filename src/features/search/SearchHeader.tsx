import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
  useTheme,
  Box,
  Badge,
} from '@mui/material';
import { DarkMode, LightMode, Map, List, ViewModule, Favorite } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setViewMode, setShowShortlist } from '@/store/slices/searchSlice';
import { useColorMode } from '@/hooks/useColorMode';
import { Logo } from '@/components/common';

export const SearchHeader: React.FC = () => {
  const dispatch = useAppDispatch();
  const viewMode = useAppSelector((state) => state.search.viewMode);
  const showShortlist = useAppSelector((state) => state.search.showShortlist);
  const shortlistCount = useAppSelector((state) => state.shortlist.favorites.length);
  const { mode, setMode } = useColorMode();
  const theme = useTheme();

  const handleViewModeChange = (
    _: React.MouseEvent<HTMLElement>,
    newMode: 'map' | 'list' | 'split' | null
  ) => {
    if (newMode) {
      dispatch(setViewMode(newMode));
    }
  };

  const toggleColorMode = () => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  };

  const handleShortlistToggle = () => {
    dispatch(setShowShortlist(!showShortlist));
  };

  return (
    <AppBar 
      position="static" 
      elevation={0} 
      sx={{ 
        borderBottom: 1, 
        borderColor: 'divider',
        bgcolor: 'background.paper',
        color: 'text.primary',
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 56, sm: 64 }, px: { xs: 2, sm: 3 } }}>
        <Box sx={{ flexGrow: 1 }}>
          <Logo />
        </Box>

        <Stack direction="row" spacing={1.5} alignItems="center">
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={handleViewModeChange}
            size="small"
            sx={{ 
              display: { xs: 'none', md: 'flex' },
              '& .MuiToggleButton-root': {
                px: 1.5,
                py: 0.75,
                border: 1,
                borderColor: 'divider',
              },
            }}
          >
            <ToggleButton value="map">
              <Map fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="caption">Map</Typography>
            </ToggleButton>
            <ToggleButton value="split">
              <ViewModule fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="caption">Split</Typography>
            </ToggleButton>
            <ToggleButton value="list">
              <List fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="caption">List</Typography>
            </ToggleButton>
          </ToggleButtonGroup>

          <IconButton 
            onClick={handleShortlistToggle}
            sx={{ 
              border: 1,
              borderColor: 'divider',
              bgcolor: showShortlist ? 'primary.main' : 'transparent',
              color: showShortlist ? 'primary.contrastText' : 'inherit',
              '&:hover': {
                bgcolor: showShortlist ? 'primary.dark' : 'action.hover',
              },
            }}
          >
            <Badge badgeContent={shortlistCount} color="error" max={99}>
              <Favorite fontSize="small" />
            </Badge>
          </IconButton>

          <IconButton 
            onClick={toggleColorMode} 
            sx={{ 
              border: 1,
              borderColor: 'divider',
            }}
          >
            {theme.palette.mode === 'dark' ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

