import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

type Status = 'OK' | 'INVALID_REQUEST' | 'INVALID_DATE' | 'UNKNOWN_ERROR';

interface SunriseSunsetResponseData {
  results: Results
  status: Status
}

interface Results {
  sunrise: string
  sunset: string
  solar_noon: string
  day_length: number
  civil_twilight_begin: string
  civil_twilight_end: string
  nautical_twilight_begin: string
  nautical_twilight_end: string
  astronomical_twilight_begin: string
  astronomical_twilight_end: string
}

interface FetchSunriseSunsetArgs {
  lat: number;
  lon: number;
}

export const sunriseSunsetAPI: any = createApi({
  reducerPath: 'sunriseSunsetAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.sunrise-sunset.org/json' }),
  endpoints: (build) => ({
    fetchSunriseSunset: build.query<SunriseSunsetResponseData, FetchSunriseSunsetArgs>({
      query: ({ lat, lon }) => ({
        url: '',
        params: {
          lat,
          lng: lon,
          formatted: 0
        }
      })
    })
  })
})