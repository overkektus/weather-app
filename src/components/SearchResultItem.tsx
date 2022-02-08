/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { List, Button } from 'antd';
import styled from 'styled-components'
import { GeocodeResult } from '@googlemaps/google-maps-services-js';

interface SearchResultItemProps {
  place: GeocodeResult;
  savedPlaces: GeocodeResult[] | undefined;
  onClick: Function;
  onClickAddToFavorite: Function;
  onClickRemoveFromFavorite: Function;
}

export const SearchResultItem: React.FC<SearchResultItemProps> = ({ savedPlaces, onClick, onClickAddToFavorite, onClickRemoveFromFavorite, place }) => {
  const isPresentInDB = !!savedPlaces?.filter(savedPlace => savedPlace.place_id === place.place_id).length;

  return (
    <StyledListItem>
      <p onClick={() => onClick(place)}>
        {place.formatted_address}
      </p>
      {isPresentInDB ?
        <StyledButton type="primary" danger onClick={() => onClickRemoveFromFavorite(place)}>Remove from Favorite</StyledButton>
        :
        <StyledButton onClick={() => onClickAddToFavorite(place)}>Add To Favorite</StyledButton>
      }
    </StyledListItem>
  );
};

const { Item: ListItem } = List;

const StyledListItem = styled(ListItem)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledButton = styled(Button)`
  margin: 0 1rem;
`;