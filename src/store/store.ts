/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { weatherAPI } from '../services/WeatherService';
import { googleGecodeAPI } from '../services/GoogleGecodeService';

const rootReducer = combineReducers({
  [weatherAPI.reducerPath]: weatherAPI.reducer,
  [googleGecodeAPI.reducerPath]: googleGecodeAPI.reducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(weatherAPI.middleware, googleGecodeAPI.middleware)
  });
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']