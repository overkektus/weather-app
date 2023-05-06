import { EnhancedStore, combineReducers, configureStore } from '@reduxjs/toolkit';

import { backendAPI } from 'services/BackendService';
import { sunriseSunsetAPI } from 'services/SunriseSunsetService';
import geocoordinatesSlice from './reducers/GeocoordintatesSlice';
import currentPlaceSlice from './reducers/CurrentPlaceSlice';

const rootReducer = combineReducers({
  geocoordinatesSlice,
  currentPlaceSlice,
  [backendAPI.reducerPath]: backendAPI.reducer,
  [sunriseSunsetAPI.reducerPath]: sunriseSunsetAPI.reducer,
})

export const setupStore = (): EnhancedStore => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sunriseSunsetAPI.middleware, backendAPI.middleware)
  });
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']