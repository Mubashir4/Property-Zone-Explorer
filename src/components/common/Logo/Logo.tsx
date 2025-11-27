import { Box, Typography } from '@mui/material';
import { MapOutlined } from '@mui/icons-material';

export const Logo: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        cursor: 'default',
      }}
    >
      {/* Icon Container with gradient background */}
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 44,
          height: 44,
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #60a5fa 100%)',
          boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            borderRadius: '12px',
            padding: '2px',
            background: 'linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            opacity: 0.5,
          },
        }}
      >
        <MapOutlined
          sx={{
            fontSize: 28,
            color: 'white',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
          }}
        />
      </Box>

      {/* Text Logo */}
      <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <Typography
          variant="h5"
          component="div"
          fontWeight={800}
          letterSpacing={-0.5}
          sx={{
            background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 60%, #60a5fa 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 1px rgba(37, 99, 235, 0.1)',
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          }}
        >
          Banner17
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            fontSize: '0.65rem',
            fontWeight: 600,
            letterSpacing: 2,
            textTransform: 'uppercase',
            mt: 0.25,
            opacity: 0.7,
          }}
        >
          Property Search
        </Typography>
      </Box>
    </Box>
  );
};

