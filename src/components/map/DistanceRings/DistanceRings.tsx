import { Circle } from 'react-leaflet';
import { useAppSelector } from '@/store/hooks';

export const DistanceRings: React.FC = () => {
  const selectedProperty = useAppSelector((state) => state.search.selectedProperty);
  
  // For now, we'll show distance rings when a property is selected
  // In full implementation, this would be toggleable
  if (!selectedProperty) {
    return null;
  }

  // This is a placeholder - you'd get actual property coordinates
  const center: [number, number] = [-33.8688, 151.2093];
  const rings = [1000, 2000, 5000]; // 1km, 2km, 5km

  return (
    <>
      {rings.map((radius) => (
        <Circle
          key={radius}
          center={center}
          radius={radius}
          pathOptions={{
            color: '#2563eb',
            weight: 1,
            fillOpacity: 0,
            dashArray: '5, 5',
          }}
        />
      ))}
    </>
  );
};

