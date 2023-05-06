import React from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';

import { IPlace, Units, backendAPI } from 'services/BackendService';
import useLocalStorage from 'hooks/useLocalStorage';
import { formateDateForWeatherCard, formateTime, formateTemperature, formateWindSpeed, getWindSpeedPercent } from 'utils';
import * as colors from 'assets/styled-components/colors';
import CircularProgressbar from './CircularProgressbar';

interface WeatherCardProps {
  currentPlace: IPlace;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ currentPlace }) => {
  const [units] = useLocalStorage<Units>('units', 'metric');
  const { data: currentWeather, isLoading: isWeatherLoading } = backendAPI.useGetCurrentWeatherQuery({
    lat: currentPlace.lat,
    lng: currentPlace.lng,
    units
  });

  return (
    <>
      {isWeatherLoading && <p>Loading...</p>}
      {currentWeather &&
        <>
          <TopSection>
            <StyledImg src={require(`/src/assets/img/icons/${currentWeather.weather[0].icon}.png`)}/>
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
            <City>{currentPlace.city}</City>
            <Country>{currentPlace.country}</Country>
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
        </>
      }
    </>
  );
};

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
  width: 100%;
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