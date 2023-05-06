import React from 'react';
import styled from 'styled-components';

import { useAppSelector } from 'hooks/redux';
import * as colors from 'assets/styled-components/colors';
import WeatherCard from './WeatherCard';

const WeatherContainer: React.FC = () => {
  const { place } = useAppSelector(state => state.currentPlaceSlice);

  return (
    <Wrapper>
      <Card>
        {!place && <PlaceHolder>To display the current weather, please, provide access to your location or select a city.</PlaceHolder>}
        {place && <WeatherCard currentPlace={place} />}
      </Card>
    </Wrapper>
  );
};

const PlaceHolder = styled.p`
  
`;

const Wrapper = styled.div`
  position: sticky;
  top: 0;
  padding: 20px;
  min-height: 300px;
  max-width: 300px;
`;

const Card = styled.div`
  height: 100%;
  display: flex;
  padding: 2.5rem;
  flex-direction: column;
  font-size: 12px;
  align-items: center;
  background-color: white;
  border-radius: 15px;
  color: ${colors.dartBlue};
`;

export default WeatherContainer;