import React from 'react';

import { useAppSelector } from '../hooks/redux';
import { SectionWrapper, Title } from './common';
import WeatherChartContainer from './WeatherChart';

const WeatherChart: React.FC = () => {
  const { place } = useAppSelector(state => state.currentPlaceSlice);
  return (
    <SectionWrapper>
      {place && <Title>Weather Graph</Title>}
      {place && <WeatherChartContainer currentPlace={place} />}
    </SectionWrapper>
  );
};

export default WeatherChart;