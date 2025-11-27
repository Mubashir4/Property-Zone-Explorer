import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AmenityCategory } from '@/types/amenity.types';

interface AmenitiesState {
  activeCategories: AmenityCategory[];
  selectedAmenity: string | null;
  searchRadius: number;
  centerLocation: { lat: number; lng: number } | null;
}

const initialState: AmenitiesState = {
  activeCategories: [],
  selectedAmenity: null,
  searchRadius: 2000,
  centerLocation: null,
};

const amenitiesSlice = createSlice({
  name: 'amenities',
  initialState,
  reducers: {
    toggleCategory: (state, action: PayloadAction<AmenityCategory>) => {
      const index = state.activeCategories.indexOf(action.payload);
      if (index > -1) {
        state.activeCategories.splice(index, 1);
      } else {
        state.activeCategories.push(action.payload);
      }
    },
    setActiveCategories: (state, action: PayloadAction<AmenityCategory[]>) => {
      state.activeCategories = action.payload;
    },
    setSelectedAmenity: (state, action: PayloadAction<string | null>) => {
      state.selectedAmenity = action.payload;
    },
    setSearchRadius: (state, action: PayloadAction<number>) => {
      state.searchRadius = action.payload;
    },
    setCenterLocation: (
      state,
      action: PayloadAction<{ lat: number; lng: number } | null>
    ) => {
      state.centerLocation = action.payload;
    },
  },
});

export const {
  toggleCategory,
  setActiveCategories,
  setSelectedAmenity,
  setSearchRadius,
  setCenterLocation,
} = amenitiesSlice.actions;
export default amenitiesSlice.reducer;

