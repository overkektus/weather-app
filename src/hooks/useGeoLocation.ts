/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEffect } from 'react';

export const useGeoLocation = () => {

  const onSuccess = (location: { coords: { latitude: any; longitude: any; }; }) => {
    return location;
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess);
  }, []);

  return location;
}