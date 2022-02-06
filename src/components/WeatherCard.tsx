import React from 'react';
import styled from 'styled-components';
import Spin from 'antd/lib/spin';
import { rgba } from 'polished';
import { GeocodeResult } from '@googlemaps/google-maps-services-js';

import * as colors from '../assets/styled-components/colors';
import { weatherAPI } from '../services/WeatherService';
import { formateDateForWeatherCard } from '../utils';
import { useAppSelector } from '../hooks/redux';

interface WeatherCardProps {
  currentPlace: GeocodeResult;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ currentPlace }) => {
  const { isLoading: isBrowserLocationLoading } = useAppSelector(state => state.geocoordinatesSlice);
  const { data: currentWeather, isLoading } = weatherAPI.useFetchCurrentWeatherQuery({
    lat: currentPlace.geometry.location.lat,
    lon: currentPlace.geometry.location.lng,
    units: 'metric'
  });

  return (
    <Wrapper>
      <Card>
        {isLoading || isBrowserLocationLoading && <Spin tip="Loading..."></Spin>}
        {currentWeather &&
          <>
            <DateTimeSection>
              <Today>Today</Today>
              <Time>11:44</Time>
              <Date>{formateDateForWeatherCard(currentWeather?.dt)}</Date>
            </DateTimeSection>
            <TemperatureSection>
              <Temperature>+4&#176;C</Temperature>
            </TemperatureSection>
            <PlaceSection>
              <City>New York</City>
              <Country>United States</Country>
            </PlaceSection>
            <HumiditySection>
              <ProgressInfo>
                <ProgressBarTitle>Humidity:</ProgressBarTitle>
                <Humidity>70%</Humidity>
              </ProgressInfo>
              <Progressbar value={70} max={100} />
            </HumiditySection>
            <PrecipitationSection>
              <ProgressInfo>
                <ProgressBarTitle>Precipitation:</ProgressBarTitle>
                <Precipitation>25%</Precipitation>
              </ProgressInfo>
              <Progressbar value={25} max={100} />
            </PrecipitationSection>
            <WindSection></WindSection>
          </>
        }
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 20px;
`;

const Card = styled.div`
  display: flex;
  padding: 20px 15px;
  flex-direction: column;
  font-sieze: 12px;
  align-items: center;
  background-color: white;
  border-radius: 15px;
  color: ${colors.dartBlue}
`;

const ProgressInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DateTimeSection = styled.div`

`;

const Today = styled.p`
  font-size: 1.3em;
  font-weight: 500;
  margin-bottom: 5px;
`;

const Time = styled.p`
  font-weight: 600;
`;

const Date = styled.p`
  color: ${rgba(colors.dartBlue, 0.85)};
`;

const TemperatureSection = styled.div`
  margin-top: 2rem;
`;

const Temperature = styled.p`
  font-size: 4em;
  font-weight: 600;
`;

const PlaceSection = styled.div`
  text-align: center;
`;

const City = styled.p`
  font-size: 2.5em;
  font-weight: 500;
`;

const Country = styled.p`
  font-size: 1.3em;
  font-weight: 400;
`;

const HumiditySection = styled.div`
  margin: 0.6rem 0 0 0;
`;

const Humidity = styled.p`

`;

const ProgressBarTitle = styled.p`

`;

const Progressbar = styled.progress`
  border-radius: 7px;
  height: 4px;
  transform: translate(0px, -8px);
  box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.2);

  &::-webkit-progress-bar {
    background-color: ${colors.progressBar};
    border-radius: 7px;
  }

  &::-webkit-progress-value {
    background-color: ${colors.progressValue};
    border-radius: 7px;
  }
`;

const PrecipitationSection = styled.div`

`;

const Precipitation = styled.p`

`;

const WindSection = styled.div`

`;

export default WeatherCard;