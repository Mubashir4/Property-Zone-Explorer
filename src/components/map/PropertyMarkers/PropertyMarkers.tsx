import { Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import { Property } from '@/types/property.types';
import { PropertyMarkerPopup } from './PropertyMarkerPopup';

interface PropertyMarkersProps {
  properties: Property[];
  onPropertyClick?: (property: Property) => void;
  selectedPropertyId?: string | null;
  hoveredPropertyId?: string | null;
}

const createMarkerIcon = (isSelected: boolean, isHovered: boolean) => {
  let color = '#f97316'; // default orange
  let size = 28;
  
  if (isSelected) {
    color = '#2563eb'; // blue for selected
    size = 32;
  } else if (isHovered) {
    color = '#10b981'; // green for hovered
    size = 32;
  }
  
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${color};
        width: ${size}px;
        height: ${size}px;
        border-radius: 50% 50% 50% 0;
        border: 3px solid white;
        transform: rotate(-45deg);
        box-shadow: 0 3px 8px rgba(0,0,0,0.3);
        transition: all 0.2s ease;
      "></div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
  });
};

export const PropertyMarkers: React.FC<PropertyMarkersProps> = ({
  properties,
  onPropertyClick,
  selectedPropertyId,
  hoveredPropertyId,
}) => {
  return (
    <MarkerClusterGroup
      chunkedLoading
      maxClusterRadius={60}
      spiderfyOnMaxZoom
      showCoverageOnHover={false}
    >
      {properties.map((property) => {
        const isSelected = property.id === selectedPropertyId;
        const isHovered = property.id === hoveredPropertyId && !isSelected;
        
        return (
          <Marker
            key={property.id}
            position={[property.coordinates.lat, property.coordinates.lng]}
            icon={createMarkerIcon(isSelected, isHovered)}
            eventHandlers={{
              click: () => onPropertyClick?.(property),
            }}
          >
            <Popup>
              <PropertyMarkerPopup property={property} />
            </Popup>
          </Marker>
        );
      })}
    </MarkerClusterGroup>
  );
};

