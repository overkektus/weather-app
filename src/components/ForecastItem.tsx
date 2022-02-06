import React from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';

import { formateTemperature, formateDateForForecastCard, formateTime } from '../utils';
import * as colors from '../assets/styled-components/colors';

type IconCode = '01d' | '01n' | '02d' | '02n' | '03d' | '03n' | '04d' | '04n' | '09d' | '09n' | '10d' | '10n' | '11d' | '11n' | '13d' | '13n' | '50d' | '50n'; 

interface ForecastItemProps {
  weatherIconCode: IconCode;
  minTemp: number;
  maxTemp: number;
  timestamp: number;
}

const ForecastItem: React.FC<ForecastItemProps> = ({ weatherIconCode, minTemp, maxTemp, timestamp }) => {
  return (
    <Wrapper>
      <StyledImg src={require(`../assets/img/icons/${weatherIconCode}.png`)}/>
      <TemperatureRange>{formateTemperature(minTemp)}/{formateTemperature(maxTemp)}</TemperatureRange>
      <DateTime>
        <Day>{formateDateForForecastCard(timestamp)}</Day>
        <Time>{formateTime(timestamp)}</Time>
      </DateTime>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${rgba(colors.lightGray, 0.5)};
  border-radius: 20px;
  width: 7rem;
  padding: 0.7rem 0.5rem;
  margin: 10px;
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  background: #FCFCFC;
`;

const StyledImg = styled.img`
  max-width: 2.3rem;
`;

const TemperatureRange = styled.p`
  font-size: 1rem;
  color: ${colors.dartBlue};
`;

const DateTime = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${colors.darkGray};
`;

const Day = styled.p``;

const Time = styled.p``;

export default ForecastItem;