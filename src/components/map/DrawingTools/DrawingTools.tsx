import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
import { useAppDispatch } from '@/store/hooks';
import { addDrawnPolygon, clearDrawnPolygons } from '@/store/slices/mapSlice';
import { setSearchArea, setEnablePolygonFilter } from '@/store/slices/searchSlice';

/**
 * Advanced drawing tools using Leaflet-Geoman
 * Provides polygon, rectangle, circle drawing with full edit/delete capabilities
 */
export const DrawingTools: React.FC = () => {
  const map = useMap();
  const dispatch = useAppDispatch();
  const initRef = useRef(false);

  useEffect(() => {
    // Prevent double initialization
    if (initRef.current) return;

    // Wait for map to be ready and ensure pm is available
    const initTimeout = setTimeout(() => {
      const mapAny = map as any;
      if (!mapAny.pm) {
        console.error('Geoman not available on map');
        return;
      }

      initRef.current = true;

      try {
        // Add Geoman controls to the map
        mapAny.pm.addControls({
          position: 'topleft',
          drawMarker: false,
          drawPolyline: false,
          drawCircleMarker: false,
          drawText: false,
          cutPolygon: false,
          rotateMode: false,
          drawPolygon: true,
          drawRectangle: true,
          drawCircle: true,
          editMode: true,
          dragMode: true,
          removalMode: true,
        });

        // Customize the styling
        map.pm.setGlobalOptions({
          pathOptions: {
            color: '#2563eb',
            fillColor: '#3b82f6',
            fillOpacity: 0.2,
            weight: 3,
          },
          continueDrawing: false,
          editable: true,
          draggable: true,
          snapDistance: 20,
        });

        /**
         * Convert layer to GeoJSON polygon
         */
        const layerToGeoJSON = (layer: any): GeoJSON.Polygon | null => {
          try {
            // For circles, convert to polygon approximation
            if (layer instanceof L.Circle) {
              const center = layer.getLatLng();
              const radius = layer.getRadius();
              const segments = 64;
              const coordinates: number[][] = [];

              for (let i = 0; i < segments; i++) {
                const angle = (i / segments) * 2 * Math.PI;
                const lat = center.lat + (radius / 111320) * Math.cos(angle);
                const lng =
                  center.lng +
                  (radius / (111320 * Math.cos((center.lat * Math.PI) / 180))) * Math.sin(angle);
                coordinates.push([lng, lat]);
              }
              coordinates.push(coordinates[0]); // Close the polygon

              return {
                type: 'Polygon',
                coordinates: [coordinates],
              };
            }

            // For polygons and rectangles
            const geoJSON = layer.toGeoJSON();
            if (geoJSON.geometry.type === 'Polygon') {
              return geoJSON.geometry as GeoJSON.Polygon;
            }
          } catch (error) {
            console.error('Error converting layer to GeoJSON:', error);
          }
          return null;
        };

        /**
         * Update Redux with all drawn polygons
         */
        const updateDrawnPolygons = () => {
          const layers = map.pm.getGeomanLayers();
          dispatch(clearDrawnPolygons());

          if (layers.length === 0) {
            // When all shapes are deleted, clear search area and disable polygon filter
            dispatch(setSearchArea(null));
            dispatch(setEnablePolygonFilter(false));
            return;
          }

          layers.forEach((layer: any) => {
            const polygon = layerToGeoJSON(layer);
            if (polygon) {
              dispatch(addDrawnPolygon(polygon));
              // Set the last polygon as search area
              dispatch(setSearchArea(polygon));
            }
          });
        };

        // Event: Shape created
        map.on('pm:create', (e: any) => {
          const layer = e.layer;

          // Add hover effects
          if (layer.setStyle) {
            layer.on('mouseover', function (this: any) {
              this.setStyle({
                fillOpacity: 0.35,
                weight: 4,
              });
            });

            layer.on('mouseout', function (this: any) {
              this.setStyle({
                fillOpacity: 0.2,
                weight: 3,
              });
            });
          }

          updateDrawnPolygons();
        });

        // Event: Shape edited
        map.on('pm:edit', () => {
          updateDrawnPolygons();
        });

        // Event: Shape removed
        map.on('pm:remove', () => {
          updateDrawnPolygons();
        });

        // Event: Layer dragged
        map.on('pm:drag', () => {
          updateDrawnPolygons();
        });

        console.log('✓ Advanced Geoman drawing tools initialized');
      } catch (error) {
        console.error('Error initializing Geoman:', error);
        initRef.current = false;
      }
    }, 100);

    // Cleanup
    return () => {
      clearTimeout(initTimeout);
      try {
        if (map.pm && initRef.current) {
          map.pm.removeControls();
          map.off('pm:create');
          map.off('pm:edit');
          map.off('pm:remove');
          map.off('pm:drag');
        }
        initRef.current = false;
      } catch (error) {
        console.error('Error cleaning up drawing tools:', error);
      }
    };
  }, [map, dispatch]);

  return null;
};
