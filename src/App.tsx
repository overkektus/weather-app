import React from 'react';
import { Col, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import styled from 'styled-components';

import { googleGeocodeAPI } from './services/GoogleGeocodeService';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { currentPlaceSlice } from './store/reducers/CurrentPlaceSlice';
import useCurrentLocation from './hooks/useCurrentLocation';
import Sidebar from './components/Sidebar';
import SearchContainer from './components/SearchContainer';
import FavoriteCitiesContainer from './components/FavoriteCitiesContainer';
import ForecastContainer from './components/ForecastContainer';
import WeatherChartContainer from './components/WeatherChartContainer';

function App() {
  useCurrentLocation();
  const { coordinates } = useAppSelector(state => state.geocoordinatesSlice);
  
  const { data: places } = googleGeocodeAPI.useFetchPlaceByCoordinatesQuery({ lat: coordinates.lat, lon: coordinates.lon });
  const dispatch = useAppDispatch();

  if (places) {
    dispatch(currentPlaceSlice.actions.setCurrentPlace(places.results[0]));
  }

  return (
    <Row wrap={false}>
      <Col flex="300px">
        <Sidebar/>
      </Col>
      <Col flex="auto">
        <StyledContent>
          <SearchContainer/>
          <FavoriteCitiesContainer />
          <ForecastContainer />
          <WeatherChartContainer />
        </StyledContent>
      </Col>
    </Row>
  );
}

const StyledContent = styled(Content)`
  padding: 1.5rem;
`;

export default App;
