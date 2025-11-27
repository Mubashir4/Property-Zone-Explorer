import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoundingBox } from '@/types/property.types';
import { MapLayerType } from '@/utils/constants';

interface MapState {
  center: [number, number];
  zoom: number;
  bounds: BoundingBox | null;
  drawnPolygons: GeoJSON.Polygon[];
  drawingMode: 'none' | 'polygon' | 'circle' | 'rectangle';
  activeLayer: MapLayerType;
}

const initialState: MapState = {
  center: [
    Number(import.meta.env.VITE_MAP_DEFAULT_LAT) || -33.8688,
    Number(import.meta.env.VITE_MAP_DEFAULT_LNG) || 151.2093,
  ],
  zoom: Number(import.meta.env.VITE_MAP_DEFAULT_ZOOM) || 12,
  bounds: null,
  drawnPolygons: [],
  drawingMode: 'none',
  activeLayer: 'streets',
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setCenter: (state, action: PayloadAction<[number, number]>) => {
      state.center = action.payload;
    },
    setZoom: (state, action: PayloadAction<number>) => {
      state.zoom = action.payload;
    },
    setBounds: (state, action: PayloadAction<BoundingBox | null>) => {
      state.bounds = action.payload;
    },
    addDrawnPolygon: (state, action: PayloadAction<GeoJSON.Polygon>) => {
      state.drawnPolygons.push(action.payload);
    },
    removeDrawnPolygon: (state, action: PayloadAction<number>) => {
      state.drawnPolygons.splice(action.payload, 1);
    },
    clearDrawnPolygons: (state) => {
      state.drawnPolygons = [];
    },
    setDrawingMode: (
      state,
      action: PayloadAction<'none' | 'polygon' | 'circle' | 'rectangle'>
    ) => {
      state.drawingMode = action.payload;
    },
    setActiveLayer: (state, action: PayloadAction<MapLayerType>) => {
      state.activeLayer = action.payload;
    },
  },
});

export const {
  setCenter,
  setZoom,
  setBounds,
  addDrawnPolygon,
  removeDrawnPolygon,
  clearDrawnPolygons,
  setDrawingMode,
  setActiveLayer,
} = mapSlice.actions;
export default mapSlice.reducer;

