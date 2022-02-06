import React from 'react';

import { useAppSelector } from '../hooks/redux';
import WeatherCard from './WeatherCard';

const WeatherContainer: React.FC = () => {
  const { place } = useAppSelector(state => state.currentPlaceSlice);

  return (
    <>
      {place && <WeatherCard currentPlace={place} />}
    </>
  );
};

export default WeatherContainer;