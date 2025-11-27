import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface BaseLayoutProps {
  children: ReactNode;
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {children}
    </Box>
  );
};

