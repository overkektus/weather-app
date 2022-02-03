import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { ICurrentWeather } from '../models/ICurrentWeather';
import { IForecast } from '../models/IForecast';

interface fetchCurrentWeatherArgs {
  lon: number;
  lat: number;
}

export const weatherAPI = createApi({
  reducerPath: 'weatherAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.openweathermap.org/data/2.5' }),
  endpoints: (build) => ({
    fetchCurrentWeather: build.query<ICurrentWeather, fetchCurrentWeatherArgs>({
      query: ({ lon, lat }) => ({
        url: '/weather',
        params: {
          lat,
          lon,
          appid: process.env.OPENWEATHERMAP_API_KEY
        }
      })
    }),
    fetchForecast: build.query<IForecast, fetchCurrentWeatherArgs>({
      query: ({ lon, lat }) => ({
        url: '/forecast',
        params: {
          lat,
          lon,
          appid: process.env.OPENWEATHERMAP_API_KEY
        }
      })
    })
  })
});