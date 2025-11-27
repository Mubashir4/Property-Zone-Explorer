import { combineReducers } from '@reduxjs/toolkit';
import searchReducer from './slices/searchSlice';
import mapReducer from './slices/mapSlice';
import schoolsReducer from './slices/schoolsSlice';
import amenitiesReducer from './slices/amenitiesSlice';
import riskReducer from './slices/riskSlice';
import themeReducer from './slices/themeSlice';
import shortlistReducer from './slices/shortlistSlice';

const rootReducer = combineReducers({
  search: searchReducer,
  map: mapReducer,
  schools: schoolsReducer,
  amenities: amenitiesReducer,
  risk: riskReducer,
  theme: themeReducer,
  shortlist: shortlistReducer,
});

export default rootReducer;

