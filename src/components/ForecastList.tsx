import React from 'react';
import styled from 'styled-components';
import { GeocodeResult } from '@googlemaps/google-maps-services-js';
import { ScrollingCarousel } from '@trendyol-js/react-carousel';
import { ChevronDoubleRightIcon } from '@heroicons/react/solid';

import ForecastItem from './ForecastItem';
import { weatherAPI } from '../services/WeatherService';
import * as colors from '../assets/styled-components/colors';

interface ForecastListProps {
  currentPlace: GeocodeResult;
}

const ForecastList: React.FC<ForecastListProps> = ({ currentPlace }) => {
  const { data, isLoading } = weatherAPI.useFetchForecastQuery({
    lat: currentPlace.geometry.location.lat,
    lon: currentPlace.geometry.location.lng,
    units: 'metric'
  });
  
  return (
    <Wrapper>
      {isLoading && 'Loading....'}
      {data &&
        <StyledScrollingCarousel rightIcon={<CarouselButton/>}>
          {data.list.map(item => {
            const { main: { temp_max, temp_min }, dt, weather } = item;
            return <ForecastItem key={dt} maxTemp={temp_max} minTemp={temp_min} timestamp={dt} weatherIconCode={weather[0].icon} />
          })}
        </StyledScrollingCarousel>
      }
    </Wrapper>
  );
};

const CarouselButton = (): React.ReactElement => <StyledButton>
  <StyledChevronDoubleRightIcon/>
</StyledButton>

const Wrapper = styled.div`
  display: flex;
`;

const StyledScrollingCarousel = styled(ScrollingCarousel)`
  padding: 10px 0;
  
  div[data-arrow="left"] {
    display: none;
  }

  div[data-arrow="right"] {
    position: absolute;
    right: 0;
    top: 52px;
    right: 20px;
  }
`;

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: ${colors.pramary};
  border-radius: 10px;
  padding: 20px 12px;
  cursor: pointer;
  box-shadow: 0px 0px 60px 90px rgb(255 255 255 / 95%);
`;

const StyledChevronDoubleRightIcon = styled(ChevronDoubleRightIcon)`
  color: white;
  width: 1rem;
`;

export default ForecastList;