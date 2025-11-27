import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PropertySearchParams } from '@/types/property.types';

interface SearchState {
  filters: PropertySearchParams;
  selectedProperty: string | null;
  hoveredProperty: string | null;
  viewMode: 'map' | 'list' | 'split';
  searchArea: GeoJSON.Polygon | null;
  enablePolygonFilter: boolean;
  showShortlist: boolean;
}

const initialState: SearchState = {
  filters: {
    priceMin: undefined,
    priceMax: undefined,
    bedrooms: undefined,
    bathrooms: undefined,
    propertyType: undefined,
    suburb: undefined,
  },
  selectedProperty: null,
  hoveredProperty: null,
  viewMode: 'split',
  searchArea: null,
  enablePolygonFilter: true,
  showShortlist: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<PropertySearchParams>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    setSelectedProperty: (state, action: PayloadAction<string | null>) => {
      state.selectedProperty = action.payload;
    },
    setHoveredProperty: (state, action: PayloadAction<string | null>) => {
      state.hoveredProperty = action.payload;
    },
    setViewMode: (state, action: PayloadAction<'map' | 'list' | 'split'>) => {
      state.viewMode = action.payload;
    },
    setSearchArea: (state, action: PayloadAction<GeoJSON.Polygon | null>) => {
      state.searchArea = action.payload;
    },
    setEnablePolygonFilter: (state, action: PayloadAction<boolean>) => {
      state.enablePolygonFilter = action.payload;
    },
    setShowShortlist: (state, action: PayloadAction<boolean>) => {
      state.showShortlist = action.payload;
    },
  },
});

export const { setFilters, clearFilters, setSelectedProperty, setHoveredProperty, setViewMode, setSearchArea, setEnablePolygonFilter, setShowShortlist } =
  searchSlice.actions;
export default searchSlice.reducer;

