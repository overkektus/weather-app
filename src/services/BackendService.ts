import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { ICurrentWeather } from 'models/ICurrentWeather';
import { IForecast } from 'models/IForecast';

interface GetPlaceByAddress {
  address: string;
}

interface GetPlaceByCoordinates {
  lat: string;
  lng: string;
}

interface CreatePlaceByAddress {
  address: string;
}

interface DeletePlaceByPlaceId {
  placeId: string;
}

export type Units = 'metric' | 'imperial'

interface FetchWeatherArgs {
  lng: number;
  lat: number;
  units: Units;
}

export interface IPlace {
  readonly place_id: string;

  readonly formatted_address: string;
  
  readonly country: string;

  readonly city: string;

  readonly lat: number;

  readonly lng: number;

  readonly timeOffset: number;

  readonly imgName: string;
}

export const backendAPI = createApi({
  reducerPath: 'backendAPI',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_URL}/api` }),
  tagTypes: ['Place'],
  endpoints: (build) => ({
    getPlaceByAddress: build.query<IPlace, GetPlaceByAddress>({
      query: ({ address }) => ({
        url: '/google-maps/address',
        params: {
          address
        }
      })
    }),
    getPlaceByCoordinates: build.query<IPlace, GetPlaceByCoordinates>({
      query: ({ lat, lng }) => ({
        url: '/google-maps/coordinates',
        params: {
          lat,
          lng
        }
      })
    }),
    getSavedPlaces: build.query<IPlace[], void>({
      query: () => ({
        url: '/favorite-place',
      }),
      providesTags: ['Place']
    }),
    createPlaceByAddress: build.mutation<any, CreatePlaceByAddress>({
      query: (payload) => ({
        url: '/favorite-place/address',
        method: 'POST',
        body: payload,
      }),
    }),
    deletePlaceById: build.mutation<IPlace, DeletePlaceByPlaceId>({
      query: ({ placeId }) => ({
        url: '/favorite-place',
        method: 'DELETE',
        params: {
          placeId,
        },
      }),
    }),
    getCurrentWeather: build.query<ICurrentWeather, FetchWeatherArgs>({
      query: ({ lng, lat, units = 'metric' }) => ({
        url: '/weather/current',
        params: {
          lat,
          lng,
          units,
          appid: process.env.REACT_APP_OPENWEATHERMAP_API_KEY
        }
      })
    }),
    getForecast: build.query<IForecast, FetchWeatherArgs>({
      query: ({ lng, lat, units = 'metric' }) => ({
        url: '/weather/forecast',
        params: {
          lat,
          lng,
          units,
          appid: process.env.REACT_APP_OPENWEATHERMAP_API_KEY,
        }
      })
    })
  })
})
