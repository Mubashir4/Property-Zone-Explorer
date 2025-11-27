import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Property } from '@/types/property.types';

interface ShortlistState {
  favorites: Property[];
}

const initialState: ShortlistState = {
  favorites: [],
};

const shortlistSlice = createSlice({
  name: 'shortlist',
  initialState,
  reducers: {
    addToShortlist: (state, action: PayloadAction<Property>) => {
      const exists = state.favorites.some((p) => p.id === action.payload.id);
      if (!exists) {
        state.favorites.push(action.payload);
      }
    },
    removeFromShortlist: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter((p) => p.id !== action.payload);
    },
    toggleShortlist: (state, action: PayloadAction<Property>) => {
      const index = state.favorites.findIndex((p) => p.id === action.payload.id);
      if (index >= 0) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(action.payload);
      }
    },
    clearShortlist: (state) => {
      state.favorites = [];
    },
  },
});

export const { addToShortlist, removeFromShortlist, toggleShortlist, clearShortlist } =
  shortlistSlice.actions;
export default shortlistSlice.reducer;

