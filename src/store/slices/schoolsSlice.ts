import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SchoolsState {
  selectedSchool: string | null;
  selectedCatchment: string | null;
  hoveredCatchment: string | null;
  visibleSchools: boolean;
  visibleCatchments: boolean;
  filters: {
    type?: string;
    level?: string;
    gender?: string;
  };
}

const initialState: SchoolsState = {
  selectedSchool: null,
  selectedCatchment: null,
  hoveredCatchment: null,
  visibleSchools: false,
  visibleCatchments: false,
  filters: {},
};

const schoolsSlice = createSlice({
  name: 'schools',
  initialState,
  reducers: {
    setSelectedSchool: (state, action: PayloadAction<string | null>) => {
      state.selectedSchool = action.payload;
    },
    setSelectedCatchment: (state, action: PayloadAction<string | null>) => {
      state.selectedCatchment = action.payload;
    },
    setHoveredCatchment: (state, action: PayloadAction<string | null>) => {
      state.hoveredCatchment = action.payload;
    },
    toggleSchoolsVisibility: (state) => {
      state.visibleSchools = !state.visibleSchools;
    },
    toggleCatchmentsVisibility: (state) => {
      state.visibleCatchments = !state.visibleCatchments;
    },
    setSchoolFilters: (
      state,
      action: PayloadAction<{ type?: string; level?: string; gender?: string }>
    ) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearSchoolFilters: (state) => {
      state.filters = {};
    },
  },
});

export const {
  setSelectedSchool,
  setSelectedCatchment,
  setHoveredCatchment,
  toggleSchoolsVisibility,
  toggleCatchmentsVisibility,
  setSchoolFilters,
  clearSchoolFilters,
} = schoolsSlice.actions;
export default schoolsSlice.reducer;

