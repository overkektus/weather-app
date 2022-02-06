import React from 'react';

import { useAppSelector } from '../hooks/redux';
import ForecastList from './ForecastList';
import { Title, SectionWrapper } from './common';

const ForecastContainer: React.FC = () => {
  const { place } = useAppSelector(state => state.currentPlaceSlice);

  return (
    <SectionWrapper>
      {place && <Title>{place.formatted_address}</Title>}
      {place && <ForecastList currentPlace={place} />}
      {!place && <p>Choose city or provide access to your geolocation...</p>}
    </SectionWrapper>
  );
};

export default ForecastContainer;