import { Box, Typography, Stack } from '@mui/material';
import { Warning } from '@mui/icons-material';
import { RiskLegend } from '../RiskLegend/RiskLegend';

export const RiskPanel: React.FC = () => {
  return (
    <Box sx={{ width: '100%', p: 2.5, height: '100%', overflow: 'auto' }}>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2.5 }}>
        <Warning color="warning" fontSize="small" />
        <Typography variant="subtitle1" fontWeight={600}>
          Risk Layers
        </Typography>
      </Stack>
      
      <Typography variant="caption" color="text.secondary" fontWeight={500} sx={{ mb: 2.5, display: 'block' }}>
        Toggle risk overlays on the map
      </Typography>
      
      <RiskLegend />
    </Box>
  );
};


