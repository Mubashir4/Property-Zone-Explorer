import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { usePropertyDetails } from '@/api/hooks/useProperties';
import { PropertyDetail } from '@/components/property/PropertyDetail/PropertyDetail';
import { Loading } from '@/components/common/Loading/Loading';

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: property, isLoading, error } = usePropertyDetails(id || '');

  if (isLoading) {
    return <Loading fullScreen message="Loading property details..." />;
  }

  if (error || !property) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6">Property not found</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" sx={{ ml: 2 }}>
            Property Details
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <PropertyDetail property={property} />
      </Container>
    </Box>
  );
};

export default PropertyDetailPage;

