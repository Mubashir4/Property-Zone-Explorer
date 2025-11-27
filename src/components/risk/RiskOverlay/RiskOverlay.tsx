import { GeoJSON } from 'react-leaflet';
import { RiskType } from '@/types/risk.types';
import { useRiskLayer } from '@/api/hooks/useRiskData';
import { useAppSelector } from '@/store/hooks';

interface RiskOverlayProps {
  type: RiskType;
}

const getRiskStyle = (type: RiskType, opacity: number) => {
  const styles = {
    flood: {
      fillColor: '#3b82f6',
      color: '#1e40af',
      weight: 1,
      fillOpacity: opacity,
    },
    bushfire: {
      fillColor: '#ef4444',
      color: '#991b1b',
      weight: 1,
      fillOpacity: opacity,
    },
    heritage: {
      fillColor: '#a855f7',
      color: '#6b21a8',
      weight: 1,
      fillOpacity: opacity,
    },
    zoning: {
      fillColor: '#10b981',
      color: '#047857',
      weight: 1,
      fillOpacity: opacity,
    },
  };
  return styles[type];
};

export const RiskOverlay: React.FC<RiskOverlayProps> = ({ type }) => {
  const layerState = useAppSelector((state) => state.risk.layers[type]);
  const { data, isLoading } = useRiskLayer(type, layerState.visible);

  if (!layerState.visible || isLoading || !data?.data) {
    return null;
  }

  return (
    <GeoJSON
      data={data.data}
      style={getRiskStyle(type, layerState.opacity)}
    />
  );
};

