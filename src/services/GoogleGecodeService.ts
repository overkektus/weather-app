import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { GeocodeResponseData } from '@googlemaps/google-maps-services-js';

interface fetchGeocodeArgs {
  query: string;
}

export const googleGecodeAPI = createApi({
  reducerPath: 'googleGecodeAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://maps.googleapis.com/maps/api/geocode' }),
  endpoints: (build) => ({
    fetchPlaces: build.query<GeocodeResponseData, fetchGeocodeArgs>({
      query: ({ query }) => ({
        url: '/json',
        params: {
          address: query,
          key: process.env.GOOGLE_API_KEY
        }
      })
    })
  })
});