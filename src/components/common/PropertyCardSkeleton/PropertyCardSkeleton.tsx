import { Card, CardContent, Skeleton, Box, Stack } from '@mui/material';

export const PropertyCardSkeleton: React.FC = () => (
  <Card>
    <Skeleton variant="rectangular" height={200} animation="wave" />
    <CardContent>
      <Skeleton variant="text" width="80%" height={32} />
      <Skeleton variant="text" width="60%" height={24} />
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="circular" width={40} height={40} />
      </Stack>
      <Box sx={{ mt: 2 }}>
        <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 2 }} />
      </Box>
    </CardContent>
  </Card>
);

