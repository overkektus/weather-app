import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { ICurrentWeather } from '../models/ICurrentWeather';
import { IForecast } from '../models/IForecast';

export type Units = 'metric' | 'imperial'

interface FetchWeatherArgs {
  lon: number;
  lat: number;
  units: Units;
}

export const weatherAPI = createApi({
  reducerPath: 'weatherAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.openweathermap.org/data/2.5' }),
  endpoints: (build) => ({
    fetchCurrentWeather: build.query<ICurrentWeather, FetchWeatherArgs>({
      query: ({ lon, lat, units = 'metric' }) => ({
        url: '/weather',
        params: {
          lat,
          lon,
          units,
          appid: process.env.REACT_APP_OPENWEATHERMAP_API_KEY
        }
      })
    }),
    fetchForecast: build.query<IForecast, FetchWeatherArgs>({
      query: ({ lon, lat, units = 'metric' }) => ({
        url: '/forecast',
        params: {
          lat,
          lon,
          units,
          appid: process.env.REACT_APP_OPENWEATHERMAP_API_KEY,
        }
      })
    })
  })
});