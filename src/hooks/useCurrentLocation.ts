/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEffect } from 'react';
import { geocoordinatesSlice } from '../store/reducers/GeocoordintatesSlice';
import { useAppDispatch } from './redux';

const useCurrentLocation = () => {
  const dispatch = useAppDispatch();
  const onSuccess = (location: any) => {
    dispatch(
      geocoordinatesSlice.actions.setCoordinates({
        lat: location.coords.latitude,
        lon: location.coords.longitude
      })
    );
  };

  const onError = (error: any) => {
    dispatch(
      geocoordinatesSlice.actions.setError({
        code: error.code,
        message: error.message,
      })
    );
  };

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      onError({
        code: 0,
        message: 'Geolocation not supported',
      });
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);
};

export default useCurrentLocation;