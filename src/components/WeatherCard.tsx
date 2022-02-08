import React from 'react';
import styled from 'styled-components';
import Spin from 'antd/lib/spin';
import { rgba } from 'polished';
import { GeocodeResult, PlaceType2 } from '@googlemaps/google-maps-services-js';

import * as colors from '../assets/styled-components/colors';
import { Units, weatherAPI } from '../services/WeatherService';
import { formateDateForWeatherCard, formateTime, formateTemperature, formateWindSpeed, getWindSpeedPercent } from '../utils';
import { useAppSelector } from '../hooks/redux';
import CircularProgressbar from './CircularProgressbar';
import useLocalStorage from '../hooks/useLocalStorage';

interface WeatherCardProps {
  currentPlace: GeocodeResult;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ currentPlace }) => {
  const [units] = useLocalStorage<Units>('units', 'metric');
  const { isLoading: isBrowserLocationLoading } = useAppSelector(state => state.geocoordinatesSlice);
  const { data: currentWeather, isLoading } = weatherAPI.useFetchCurrentWeatherQuery({
    lat: currentPlace.geometry.location.lat,
    lon: currentPlace.geometry.location.lng,
    units
  });

  const country = currentPlace.address_components.filter(component => component.types.includes(PlaceType2.country))[0];
  const city = currentPlace.address_components.filter(component => component.types.includes(PlaceType2.locality))[0];

  return (
    <Wrapper>
      <Card>
        {isLoading || isBrowserLocationLoading && <Spin tip="Loading..."></Spin>}
        {currentWeather &&
          <div>
            <TopSection>
              <StyledImg src={require(`../assets/img/icons/${currentWeather.weather[0].icon}.png`)}/>
              <DateTimeSection>
                <Today>Today</Today>
                <Time>{formateTime(currentWeather.dt)}</Time>
                <Date>{formateDateForWeatherCard(currentWeather.dt)}</Date>
              </DateTimeSection>
            </TopSection>
            <TemperatureSection>
              <Temperature>{formateTemperature(currentWeather.main.temp, units, 1)}</Temperature>
            </TemperatureSection>
            <PlaceSection>
              {city && <City>{city.long_name}</City>}
              {country && <Country>{country.long_name}</Country>}
            </PlaceSection>
            <HumiditySection>
              <ProgressInfo>
                <ProgressBarTitle>Humidity:</ProgressBarTitle>
                <Humidity>{currentWeather.main.humidity}%</Humidity>
              </ProgressInfo>
              <Progressbar value={currentWeather.main.humidity} max={100} />
            </HumiditySection>
            <WindSection>
              <WindTitle>Wind:</WindTitle>
              <CircularProgressbarWrapper>
                <CircularProgressbar value={getWindSpeedPercent(currentWeather.wind.speed, units)}/>
              </CircularProgressbarWrapper>
              <WindSpeed>{formateWindSpeed(currentWeather.wind.speed, units)}</WindSpeed>
            </WindSection>
          </div>
        }
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 20px;
  max-width: 300px;
`;

const Card = styled.div`
  display: flex;
  padding: 2.5rem;
  flex-direction: column;
  font-sieze: 12px;
  align-items: center;
  background-color: white;
  border-radius: 15px;
  color: ${colors.dartBlue}
`;

const TopSection = styled.div`
  display: flex;
`;

const StyledImg = styled.img`
  height: 4rem;
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
  display: flex;
  justify-content: center;
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
  line-height: 1em;
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
  width: 100%;
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

const WindSection = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const CircularProgressbarWrapper = styled.div`
  width: 3rem;
`;

const WindTitle = styled.p`
`;

const WindSpeed = styled.p`

`;

export default WeatherCard;