/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { weatherAPI } from '../services/WeatherService';
import { googleGeocodeAPI } from '../services/GoogleGeocodeService';
import geocoordinatesSlice from './reducers/GeocoordintatesSlice';
import currentPlaceSlice from './reducers/CurrentPlaceSlice';

const rootReducer = combineReducers({
  geocoordinatesSlice,
  currentPlaceSlice,
  [weatherAPI.reducerPath]: weatherAPI.reducer,
  [googleGeocodeAPI.reducerPath]: googleGeocodeAPI.reducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(weatherAPI.middleware, googleGeocodeAPI.middleware)
  });
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']