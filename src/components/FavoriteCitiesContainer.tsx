/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { ScrollingCarousel } from '@trendyol-js/react-carousel';
import styled from 'styled-components';
import { useLiveQuery } from 'dexie-react-hooks';
import { currentPlaceSlice } from '../store/reducers/CurrentPlaceSlice';

import { Title } from './common';
import FavoriteCitiesItem from './FavoriteCityItem';
import { db } from '../models/db';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { googleGeocodeAPI } from '../services/GoogleGeocodeService';

const FavoriteCitiesContainer: React.FC = () => {
  const { coordinates } = useAppSelector(state => state.geocoordinatesSlice);
  const dispatch = useAppDispatch();
  
  const { data: currentPlaces } = googleGeocodeAPI.useFetchPlaceByCoordinatesQuery({ lat: coordinates.lat, lon: coordinates.lon });
  
  const savedPlaces = useLiveQuery(
    () => db.placeItems.toArray()
  );

  const handleRemoveFromFavorite = async(placeId: string) => {
    const countPlaces = await db.placeItems.count();
    if (countPlaces === 1 && currentPlaces) {
      dispatch(currentPlaceSlice.actions.setCurrentPlace(currentPlaces.results[0]));
    }
    db.placeItems.where('place_id').equals(placeId).delete();
  }

  const handleClick = async (placeId: string) => {
    const place = (await db.placeItems.where('place_id').equals(placeId).toArray())[0];
    dispatch(currentPlaceSlice.actions.setCurrentPlace(place));
  }

  return (
    <Wrapper>
      <Title>Favorite cities</Title>
      {savedPlaces?.length ?
        <StyledScrollingCarousel>
          {savedPlaces?.map(place => <FavoriteCitiesItem key={place.place_id} placeId={place.place_id} onClick={handleClick} onDeleteClick={handleRemoveFromFavorite} cityName={place.formatted_address} time='12:51'/>)}
        </StyledScrollingCarousel>
        :
        <EmptyPlaceholder />
      }
    </Wrapper>
  );
};

const StyledScrollingCarousel = styled(ScrollingCarousel)`
  div[data-arrow="left"], div[data-arrow="right"] {
    display: none;
  }
`;

const EmptyPlaceholder = styled.div`

`;

const Wrapper = styled.div`
  margin-top: 2rem;
`;


export default FavoriteCitiesContainer;