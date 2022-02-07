/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import styled from 'styled-components';
import { Select, Divider } from 'antd';

import WeatherChart from './WeatherChart';
import { Title } from './common';
import * as colors from '../assets/styled-components/colors';
import { Units } from '../services/WeatherService';
import useLocalStorage from '../hooks/useLocalStorage';

const { Option: SelectOption } = Select;

const WeatherChartContainer: React.FC = () => {
  const [units, setUnits] = useLocalStorage<Units>('units', 'metric');

  const handleUnitChange = (value: Units) => {
    setUnits(value);
  }

  return (
    <Wrapper>
      <Title>Weather Graph</Title>
      <ChartWrapper>
        <ChartSettings>
          <PeriodWrapper>
            <Period>Day</Period>
            <StyledDivider type="vertical" />
            <Period>5 Day</Period>
          </PeriodWrapper>
          <Select defaultValue={units} onChange={handleUnitChange}>
            <SelectOption value="metric">metric</SelectOption>
            <SelectOption value="imperial">imperial</SelectOption>
          </Select>
        </ChartSettings>
        <WeatherChart/>
      </ChartWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.chartBackground};
  border-radius: 15px;
`;

const ChartSettings = styled.div`
  display: flex;
  padding: 2rem;
  justify-content: space-between;
`;

const Period = styled.p`

`;

const PeriodWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledDivider = styled(Divider)`

`;

export default WeatherChartContainer;