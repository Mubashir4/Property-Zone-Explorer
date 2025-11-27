import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import rootReducer from './rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore GeoJSON and Date objects in Redux
        ignoredActions: ['map/addDrawnPolygon', 'search/setSearchArea'],
        ignoredPaths: ['map.drawnPolygons', 'search.searchArea'],
      },
    }),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

