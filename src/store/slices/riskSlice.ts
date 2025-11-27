import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RiskType } from '@/types/risk.types';

interface RiskLayerState {
  type: RiskType;
  visible: boolean;
  opacity: number;
}

interface RiskState {
  layers: Record<RiskType, RiskLayerState>;
}

const initialState: RiskState = {
  layers: {
    flood: { type: 'flood', visible: false, opacity: 0.5 },
    bushfire: { type: 'bushfire', visible: false, opacity: 0.5 },
    heritage: { type: 'heritage', visible: false, opacity: 0.5 },
    zoning: { type: 'zoning', visible: false, opacity: 0.5 },
  },
};

const riskSlice = createSlice({
  name: 'risk',
  initialState,
  reducers: {
    toggleLayerVisibility: (state, action: PayloadAction<RiskType>) => {
      state.layers[action.payload].visible = !state.layers[action.payload].visible;
    },
    setLayerOpacity: (state, action: PayloadAction<{ type: RiskType; opacity: number }>) => {
      state.layers[action.payload.type].opacity = action.payload.opacity;
    },
    hideAllLayers: (state) => {
      Object.keys(state.layers).forEach((key) => {
        state.layers[key as RiskType].visible = false;
      });
    },
  },
});

export const { toggleLayerVisibility, setLayerOpacity, hideAllLayers } = riskSlice.actions;
export default riskSlice.reducer;

