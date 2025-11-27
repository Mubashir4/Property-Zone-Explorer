import { Paper, IconButton, Tooltip, Stack, Typography, Box } from '@mui/material';
import { Layers, Map as MapIcon, Satellite, Terrain, DarkMode, LightMode } from '@mui/icons-material';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setActiveLayer } from '@/store/slices/mapSlice';
import { MAP_LAYERS, MapLayerType } from '@/utils/constants';

export const LayerSwitcher: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeLayer = useAppSelector((state) => state.map.activeLayer);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLayerChange = (_: React.MouseEvent<HTMLElement>, newLayer: MapLayerType | null) => {
    if (newLayer) {
      dispatch(setActiveLayer(newLayer));
    }
  };

  const getLayerIcon = (layerId: MapLayerType) => {
    switch (layerId) {
      case 'streets':
        return <MapIcon fontSize="small" />;
      case 'satellite':
        return <Satellite fontSize="small" />;
      case 'terrain':
        return <Terrain fontSize="small" />;
      case 'dark':
        return <DarkMode fontSize="small" />;
      case 'light':
        return <LightMode fontSize="small" />;
      default:
        return <Layers fontSize="small" />;
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        position: 'absolute',
        bottom: 24,
        right: 24,
        zIndex: 1000,
        bgcolor: 'background.paper',
        overflow: 'hidden',
        transition: 'all 0.3s ease-in-out',
        width: isExpanded ? 280 : 48,
        height: isExpanded ? 'auto' : 48,
      }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 48,
          px: isExpanded ? 2 : 0,
        }}
      >
        {!isExpanded ? (
          <Tooltip title="Map Layers" placement="right">
            <IconButton size="small">
              <Layers fontSize="small" />
            </IconButton>
          </Tooltip>
        ) : (
          <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Layers fontSize="small" color="primary" />
              <Typography variant="subtitle2" fontWeight={600}>
                Map Layers
              </Typography>
            </Box>

            <Stack spacing={0.5}>
              {Object.values(MAP_LAYERS).map((layer) => (
                <Box
                  key={layer.id}
                  onClick={() => handleLayerChange(null as any, layer.id)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    p: 1.5,
                    borderRadius: 1,
                    cursor: 'pointer',
                    bgcolor: activeLayer === layer.id ? 'primary.main' : 'transparent',
                    color: activeLayer === layer.id ? 'white' : 'text.primary',
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: activeLayer === layer.id ? 'primary.dark' : 'action.hover',
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 32,
                      height: 32,
                      borderRadius: 1,
                      bgcolor: activeLayer === layer.id ? 'rgba(255,255,255,0.2)' : 'action.hover',
                    }}
                  >
                    {getLayerIcon(layer.id)}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight={500}>
                      {layer.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        opacity: 0.7,
                        fontSize: '0.7rem',
                      }}
                    >
                      {layer.id === 'streets' && 'Standard street map'}
                      {layer.id === 'satellite' && 'Aerial imagery'}
                      {layer.id === 'terrain' && 'Topographic view'}
                      {layer.id === 'dark' && 'Dark theme map'}
                      {layer.id === 'light' && 'Light theme map'}
                    </Typography>
                  </Box>
                  {activeLayer === layer.id && (
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: 'white',
                      }}
                    />
                  )}
                </Box>
              ))}
            </Stack>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

