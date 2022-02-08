/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import styled from 'styled-components';
import { Select, Divider, Spin } from 'antd';
import { GeocodeResult } from '@googlemaps/google-maps-services-js';

import Chart from './Chart';
import * as colors from '../assets/styled-components/colors';
import { Units } from '../services/WeatherService';
import useLocalStorage from '../hooks/useLocalStorage';
import { weatherAPI } from '../services/WeatherService';
import { formateDateForForecastCard, formateTime } from '../utils';

const { Option: SelectOption } = Select;

interface WeatherChartProps {
  currentPlace: GeocodeResult;
}

const WeatherChart: React.FC<WeatherChartProps> = ({ currentPlace }) => {
  const [units, setUnits] = useLocalStorage<Units>('units', 'metric');

  const { data, isLoading } = weatherAPI.useFetchForecastQuery({
    lat: currentPlace.geometry.location.lat,
    lon: currentPlace.geometry.location.lng,
    units,
  });

  const labels = data?.list.map(item => `${formateDateForForecastCard(item.dt)}\n${formateTime(item.dt)}`);
  const chartData = data?.list.map(item => item.main.temp);

  const handleUnitChange = (value: Units) => {
    setUnits(value);
  }

  return (
    <Wrapper>
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
        {isLoading && <Spin tip="Loading..."></Spin>}
        {data && chartData && labels && <Chart labels={labels} data={chartData}/>}
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
  padding: 1rem 2rem;
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

export default WeatherChart;