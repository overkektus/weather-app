import React from 'react';

import { useAppSelector } from '../hooks/redux';
import WeatherCard from './WeatherCard';

const WeatherContainer: React.FC = () => {
  const { place } = useAppSelector(state => state.currentPlaceSlice);

  return (
    <>
      {!place && <p>Choose </p>}
      {place && <WeatherCard currentPlace={place} />}
    </>
  );
};

export default WeatherContainer;