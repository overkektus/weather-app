import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { ICurrentWeather } from '../models/ICurrentWeather';

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
          appid: '5cdde5f4677674de9c708cfd0cfea404'
        }
      })
    })
  })
});