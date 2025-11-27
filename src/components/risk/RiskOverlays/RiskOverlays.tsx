import { RiskOverlay } from '../RiskOverlay/RiskOverlay';

export const RiskOverlays: React.FC = () => {
  return (
    <>
      <RiskOverlay type="flood" />
      <RiskOverlay type="bushfire" />
      <RiskOverlay type="heritage" />
      <RiskOverlay type="zoning" />
    </>
  );
};


