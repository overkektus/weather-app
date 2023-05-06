import React from 'react';
import styled from 'styled-components';

import { backendAPI } from 'services/BackendService';
import { currentPlaceSlice } from 'store/reducers/CurrentPlaceSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import useCurrentLocation from 'hooks/useCurrentLocation';
import Sidebar from 'components/Sidebar/Sidebar';
import SearchContainer from 'components/Search/SearchContainer';
import FavoriteCitiesContainer from 'components/Favorite/FavoriteCitiesContainer';
import ForecastContainer from 'components/Forecast/ForecastContainer';

function App(): JSX.Element {
  useCurrentLocation();
  const { coordinates } = useAppSelector(state => state.geocoordinatesSlice);
  
  const { data: place } = backendAPI.useGetPlaceByCoordinatesQuery({ lat: coordinates.lat, lng: coordinates.lon });

  const dispatch = useAppDispatch();

  if (place) {
    dispatch(currentPlaceSlice.actions.setCurrentPlace(place));
  }

  return (
    <Wrapper>
      <SidebarWrapper>
        <Sidebar/>
      </SidebarWrapper>
      <StyledContent>
        <SearchContainer/>
        <FavoriteCitiesContainer />
        <ForecastContainer />
      </StyledContent>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;

const SidebarWrapper = styled.div`
  width: 20%;
`;

const StyledContent = styled.div`
  width: 80%;
  padding: 2rem;
`;

export default App;
