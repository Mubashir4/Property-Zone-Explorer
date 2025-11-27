import { useCallback, useEffect, useRef, Suspense, lazy } from 'react';
import { Box } from '@mui/material';
import L from 'leaflet';
import { useMap } from 'react-leaflet';
import { BaseMap } from '../BaseMap/BaseMap';
import { PropertyMarkers } from '../PropertyMarkers/PropertyMarkers';
import { MapToolbar } from '../MapToolbar/MapToolbar';
import { Property } from '@/types/property.types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setBounds } from '@/store/slices/mapSlice';
import { setSelectedProperty } from '@/store/slices/searchSlice';

// Lazy load heavy components
const DrawingTools = lazy(() =>
  import('../DrawingTools/DrawingTools').then((m) => ({ default: m.DrawingTools }))
);
const SchoolMarkers = lazy(() =>
  import('@/components/school/SchoolMarkers/SchoolMarkers').then((m) => ({ default: m.SchoolMarkers }))
);
const AmenityMarkers = lazy(() =>
  import('@/components/amenity/AmenityMarkers/AmenityMarkers').then((m) => ({ default: m.AmenityMarkers }))
);
const CatchmentOverlay = lazy(() =>
  import('@/components/school/CatchmentOverlay/CatchmentOverlay').then((m) => ({ default: m.CatchmentOverlay }))
);
const RiskOverlays = lazy(() =>
  import('@/components/risk/RiskOverlays/RiskOverlays').then((m) => ({ default: m.RiskOverlays }))
);
const LayerSwitcher = lazy(() =>
  import('../LayerSwitcher/LayerSwitcher').then((m) => ({ default: m.LayerSwitcher }))
);

interface PropertyMapProps {
  properties: Property[];
}

const MapBoundsHandler: React.FC = () => {
  const map = useMap();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const updateBounds = () => {
      const bounds = map.getBounds();
      dispatch(
        setBounds({
          north: bounds.getNorth(),
          south: bounds.getSouth(),
          east: bounds.getEast(),
          west: bounds.getWest(),
        })
      );
    };

    map.on('moveend', updateBounds);
    updateBounds();

    return () => {
      map.off('moveend', updateBounds);
    };
  }, [map, dispatch]);

  return null;
};

export const PropertyMap: React.FC<PropertyMapProps> = ({ properties }) => {
  const dispatch = useAppDispatch();
  const selectedPropertyId = useAppSelector((state) => state.search.selectedProperty);
  const hoveredPropertyId = useAppSelector((state) => state.search.hoveredProperty);
  const viewMode = useAppSelector((state) => state.search.viewMode);
  const mapCenter = useAppSelector((state) => state.map.center);
  const mapZoom = useAppSelector((state) => state.map.zoom);
  const mapRef = useRef<L.Map | null>(null);

  const handlePropertyClick = useCallback(
    (property: Property) => {
      dispatch(setSelectedProperty(property.id));
    },
    [dispatch]
  );

  const handleMapReady = (map: L.Map) => {
    mapRef.current = map;
  };

  // Center map on selected property
  useEffect(() => {
    if (selectedPropertyId && mapRef.current) {
      const property = properties.find((p) => p.id === selectedPropertyId);
      if (property) {
        mapRef.current.flyTo([property.coordinates.lat, property.coordinates.lng], 15, {
          duration: 1,
        });
      }
    }
  }, [selectedPropertyId, properties]);

  // Trigger map resize when view mode, zoom, or center changes
  useEffect(() => {
    if (mapRef.current) {
      // Use a small delay to ensure DOM has updated
      const timeoutId = setTimeout(() => {
        mapRef.current?.invalidateSize();
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [viewMode, mapZoom, mapCenter]); // Rerun when view mode or map parameters change

  // Watch for map container size changes
  useEffect(() => {
    if (mapRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        mapRef.current?.invalidateSize();
      });
      
      const container = mapRef.current.getContainer();
      resizeObserver.observe(container);
      
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, []);

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%', minHeight: 0, flex: 1 }}>
      <BaseMap center={mapCenter} zoom={mapZoom} onMapReady={handleMapReady}>
        <MapBoundsHandler />
        <MapToolbar />
        
        <PropertyMarkers
          properties={properties}
          onPropertyClick={handlePropertyClick}
          selectedPropertyId={selectedPropertyId}
          hoveredPropertyId={hoveredPropertyId}
        />

        {/* Lazy loaded features */}
        <Suspense fallback={null}>
          {(import.meta.env.VITE_ENABLE_DRAWING_TOOLS === 'true' || import.meta.env.VITE_ENABLE_DRAWING_TOOLS === undefined) && (
            <DrawingTools />
          )}
        </Suspense>

        <Suspense fallback={null}>
          {(import.meta.env.VITE_ENABLE_SCHOOLS === 'true' || import.meta.env.VITE_ENABLE_SCHOOLS === undefined) && (
            <>
              <SchoolMarkers />
              <CatchmentOverlay />
            </>
          )}
        </Suspense>

        <Suspense fallback={null}>
          {(import.meta.env.VITE_ENABLE_AMENITIES === 'true' || import.meta.env.VITE_ENABLE_AMENITIES === undefined) && <AmenityMarkers />}
        </Suspense>

        <Suspense fallback={null}>
          {(import.meta.env.VITE_ENABLE_RISK_OVERLAYS === 'true' || import.meta.env.VITE_ENABLE_RISK_OVERLAYS === undefined) && <RiskOverlays />}
        </Suspense>
      </BaseMap>

      {/* Layer Switcher - Outside map container but within relative box */}
      <Suspense fallback={null}>
        <LayerSwitcher />
      </Suspense>
    </Box>
  );
};
