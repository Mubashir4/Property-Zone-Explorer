import { useEffect, ReactNode } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
import { MAP_CONFIG, MAP_LAYERS } from '@/utils/constants';
import { useAppSelector } from '@/store/hooks';
import 'leaflet/dist/leaflet.css';

interface BaseMapProps {
  center?: [number, number];
  zoom?: number;
  children?: ReactNode;
  onMapReady?: (map: L.Map) => void;
}

const MapReadyHandler: React.FC<{ onReady?: (map: L.Map) => void }> = ({ onReady }) => {
  const map = useMap();

  useEffect(() => {
    if (onReady) {
      onReady(map);
    }
  }, [map, onReady]);

  return null;
};

const DynamicTileLayer: React.FC = () => {
  const activeLayer = useAppSelector((state) => state.map.activeLayer);
  const layer = MAP_LAYERS[activeLayer];

  return (
    <TileLayer
      key={activeLayer}
      url={layer.url}
      attribution={layer.attribution}
      maxZoom={layer.maxZoom}
      minZoom={layer.minZoom}
    />
  );
};

export const BaseMap: React.FC<BaseMapProps> = ({
  center = MAP_CONFIG.DEFAULT_CENTER,
  zoom = MAP_CONFIG.DEFAULT_ZOOM,
  children,
  onMapReady,
}) => {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ 
        height: '100%', 
        width: '100%', 
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
      }}
      zoomControl={false}
      minZoom={MAP_CONFIG.MIN_ZOOM}
      maxZoom={MAP_CONFIG.MAX_ZOOM}
    >
      <DynamicTileLayer />
      {children}
      <MapReadyHandler onReady={onMapReady} />
    </MapContainer>
  );
};

