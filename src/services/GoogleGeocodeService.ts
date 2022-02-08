import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { GeocodeResponseData } from '@googlemaps/google-maps-services-js';

interface FetchGeocodeArgs {
  query: string;
}

interface FetchPlaceByCoordinatesArgs {
  lat: string;
  lon: string;
}

export const googleGeocodeAPI = createApi({
  reducerPath: 'googleGeocodeAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://maps.googleapis.com/maps/api/geocode' }),
  endpoints: (build) => ({
    fetchPlacesByAddress: build.query<GeocodeResponseData, FetchGeocodeArgs>({
      query: ({ query }) => ({
        url: '/json',
        params: {
          address: query,
          key: process.env.REACT_APP_GOOGLE_API_KEY
        }
      })
    }),
    fetchPlaceByCoordinates: build.query<GeocodeResponseData, FetchPlaceByCoordinatesArgs>({
      query: ({ lat, lon }) => ({
        url: '/json',
        params: {
          latlng: `${lat},${lon}`,
          key: process.env.REACT_APP_GOOGLE_API_KEY
        }
      })
    })
  })
});