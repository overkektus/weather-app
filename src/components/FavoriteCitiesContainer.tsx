/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { ScrollingCarousel } from '@trendyol-js/react-carousel';
import styled from 'styled-components';
import { useLiveQuery } from 'dexie-react-hooks';

import { Title } from './common';
import FavoriteCitiesItem from './FavoriteCityItem';
import { db } from '../models/db';

const FavoriteCitiesContainer: React.FC = () => {
  const savedPlaces = useLiveQuery(
    () => db.placeItems.toArray()
  );

  const handleRemoveFromFavorite = (placeId: string) => {
    db.placeItems.where('place_id').equals(placeId).delete();
  }

  return (
    <Wrapper>
      <Title>Favorite cities</Title>
      {savedPlaces?.length ?
        <StyledScrollingCarousel>
          {savedPlaces?.map(place => <FavoriteCitiesItem key={place.place_id} placeId={place.place_id} onDeleteClick={handleRemoveFromFavorite} cityName={place.formatted_address} time='12:51'/>)}
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