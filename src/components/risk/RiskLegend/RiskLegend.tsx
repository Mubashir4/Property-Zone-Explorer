import { Typography, Stack, Box, Slider, Switch, FormControlLabel } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleLayerVisibility, setLayerOpacity } from '@/store/slices/riskSlice';
import { RiskType } from '@/types/risk.types';

const riskLayerInfo = [
  { type: 'flood' as RiskType, label: 'Flood Risk', color: '#3b82f6' },
  { type: 'bushfire' as RiskType, label: 'Bushfire Risk', color: '#ef4444' },
  { type: 'heritage' as RiskType, label: 'Heritage Zones', color: '#a855f7' },
  { type: 'zoning' as RiskType, label: 'Zoning', color: '#10b981' },
];

export const RiskLegend: React.FC = () => {
  const dispatch = useAppDispatch();
  const layers = useAppSelector((state) => state.risk.layers);

  return (
    <Stack spacing={2}>
      {riskLayerInfo.map((info) => (
        <Box key={info.type}>
          <FormControlLabel
            control={
              <Switch
                checked={layers[info.type].visible}
                onChange={() => dispatch(toggleLayerVisibility(info.type))}
                size="small"
              />
            }
            label={
              <Stack direction="row" spacing={1} alignItems="center">
                <Box
                  sx={{
                    width: 16,
                    height: 16,
                    bgcolor: info.color,
                    borderRadius: '50%',
                  }}
                />
                <Typography variant="body2">{info.label}</Typography>
              </Stack>
            }
          />
          {layers[info.type].visible && (
            <Box sx={{ pl: 2, pr: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Opacity
              </Typography>
              <Slider
                value={layers[info.type].opacity}
                onChange={(_, value) =>
                  dispatch(setLayerOpacity({ type: info.type, opacity: value as number }))
                }
                min={0}
                max={1}
                step={0.1}
                size="small"
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${Math.round(value * 100)}%`}
              />
            </Box>
          )}
        </Box>
      ))}
    </Stack>
  );
};

