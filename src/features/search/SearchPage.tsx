import {
  Box,
  Grid,
  Drawer,
  Tabs,
  Tab,
  Paper,
} from '@mui/material';
import { useState, useMemo } from 'react';
import { FilterList, School, Place, Warning } from '@mui/icons-material';
import { useAppSelector } from '@/store/hooks';
import { useDebounce } from '@/hooks/useDebounce';
import { useSearchProperties, usePropertiesByPolygon } from '@/api/hooks/useProperties';
import { SearchHeader } from './SearchHeader';
import { PropertyMap } from '@/components/map/PropertyMap/PropertyMap';
import { PropertyList } from '@/components/property/PropertyList/PropertyList';
import { PropertyFilters } from '@/components/property/PropertyFilters/PropertyFilters';
import { SchoolPanel } from '@/components/school/SchoolPanel/SchoolPanel';
import { AmenityPanel } from '@/components/amenity/AmenityPanel/AmenityPanel';
import { RiskPanel } from '@/components/risk/RiskPanel/RiskPanel';
import { BaseLayout } from '@/components/layout/BaseLayout';

const SearchPage: React.FC = () => {
  const { filters, viewMode, searchArea, enablePolygonFilter, showShortlist } = useAppSelector((state) => state.search);
  const shortlistProperties = useAppSelector((state) => state.shortlist.favorites);
  const [activeTab, setActiveTab] = useState(0);

  // Calculate tab indices based on enabled features
  const tabMapping = [
    { id: 'filters', enabled: true },
    { id: 'schools', enabled: import.meta.env.VITE_ENABLE_SCHOOLS === 'true' },
    { id: 'amenities', enabled: import.meta.env.VITE_ENABLE_AMENITIES === 'true' },
    { id: 'risk', enabled: import.meta.env.VITE_ENABLE_RISK_OVERLAYS === 'true' },
  ].filter((tab) => tab.enabled);

  const getTabContent = () => {
    const currentTab = tabMapping[activeTab]?.id;
    switch (currentTab) {
      case 'filters':
        return <PropertyFilters />;
      case 'schools':
        return <SchoolPanel />;
      case 'amenities':
        return <AmenityPanel />;
      case 'risk':
        return <RiskPanel />;
      default:
        return <PropertyFilters />;
    }
  };

  // Debounce filters to avoid excessive API calls
  const debouncedFilters = useDebounce(filters, 500);

  // Fetch properties - use polygon filter if zone is drawn and filtering is enabled, otherwise use regular search
  const { data: regularData, isLoading: regularLoading, error: regularError } = useSearchProperties(debouncedFilters);
  const shouldUsePolygonFilter = enablePolygonFilter && !!searchArea;
  const { data: polygonData, isLoading: polygonLoading } = usePropertiesByPolygon(searchArea, shouldUsePolygonFilter);

  // Map always shows all properties (not filtered by polygon) so users can see all markers while drawing
  // If showShortlist is true, show only shortlisted properties on map
  const mapProperties = useMemo(() => {
    if (showShortlist) {
      return shortlistProperties;
    }
    return regularData?.properties || [];
  }, [showShortlist, shortlistProperties, regularData]);

  // List shows filtered properties based on polygon filter setting
  // If showShortlist is true, show only shortlisted properties
  const listProperties = useMemo(() => {
    if (showShortlist) {
      return shortlistProperties;
    }
    if (shouldUsePolygonFilter && polygonData) {
      return polygonData;
    }
    return regularData?.properties || [];
  }, [showShortlist, shortlistProperties, shouldUsePolygonFilter, polygonData, regularData]);

  const isLoading = showShortlist ? false : (shouldUsePolygonFilter ? polygonLoading : regularLoading);
  const error = regularError;

  const showMap = viewMode === 'map' || viewMode === 'split';
  const showList = viewMode === 'list' || viewMode === 'split';

  return (
    <BaseLayout>
      <SearchHeader />

      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>
        {/* Left Sidebar with Tabs */}
        {(viewMode === 'split' || viewMode === 'list') && (
          <Drawer
            variant="permanent"
            sx={{
              width: 300,
              flexShrink: 0,
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              '& .MuiDrawer-paper': {
                width: 300,
                boxSizing: 'border-box',
                position: 'relative',
                borderRight: 1,
                borderColor: 'divider',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                bgcolor: 'background.default',
              },
            }}
          >
          <Paper 
            square 
            elevation={0} 
            sx={{ 
              borderBottom: 1, 
              borderColor: 'divider',
              bgcolor: 'background.paper',
            }}
          >
            <Tabs
              value={activeTab}
              onChange={(_, newValue) => setActiveTab(newValue)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ 
                minHeight: 56,
                '& .MuiTab-root': {
                  minHeight: 56,
                  minWidth: 72,
                  py: 1,
                  px: 1.5,
                  fontSize: '0.75rem',
                },
              }}
            >
              <Tab 
                icon={<FilterList fontSize="small" />} 
                label="Filters"
                iconPosition="start"
              />
              {import.meta.env.VITE_ENABLE_SCHOOLS === 'true' && (
                <Tab 
                  icon={<School fontSize="small" />} 
                  label="Schools"
                  iconPosition="start"
                />
              )}
              {import.meta.env.VITE_ENABLE_AMENITIES === 'true' && (
                <Tab 
                  icon={<Place fontSize="small" />} 
                  label="Amenities"
                  iconPosition="start"
                />
              )}
              {import.meta.env.VITE_ENABLE_RISK_OVERLAYS === 'true' && (
                <Tab 
                  icon={<Warning fontSize="small" />} 
                  label="Risk"
                  iconPosition="start"
                />
              )}
            </Tabs>
          </Paper>

          <Box sx={{ flex: 1, overflow: 'auto' }}>
            {getTabContent()}
          </Box>
          </Drawer>
        )}

        {/* Main Content Area */}
        <Box 
          sx={{ 
            flex: 1, 
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
            height: '100%',
            minHeight: 0,
          }}
        >
          <Grid 
            container 
            sx={{ 
              flex: 1,
              height: '100%',
              width: '100%',
              m: 0,
              minHeight: 0,
            }}
          >
            {/* Map View */}
            {showMap && (
              <Grid
                item
                xs={12}
                md={viewMode === 'split' ? 7 : 12}
                sx={{ 
                  height: '100%',
                  minHeight: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  p: 0,
                }}
              >
                <PropertyMap properties={mapProperties} />
              </Grid>
            )}

            {/* List View */}
            {showList && (
              <Grid
                item
                xs={12}
                md={viewMode === 'split' ? 5 : 12}
                sx={{
                  height: '100%',
                  minHeight: 0,
                  borderLeft: viewMode === 'split' ? 1 : 0,
                  borderColor: 'divider',
                  display: 'flex',
                  flexDirection: 'column',
                  p: 0,
                }}
              >
                <PropertyList
                  properties={listProperties}
                  isLoading={isLoading}
                  error={error}
                />
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>
    </BaseLayout>
  );
};

export default SearchPage;
