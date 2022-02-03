import React from 'react';
import { List, Button } from 'antd';
import styled from 'styled-components'
import { GeocodeResult } from '@googlemaps/google-maps-services-js';

interface SearchResultItemProps {
  place: GeocodeResult;
  savedPlaces: GeocodeResult[] | undefined;
  onClickAddToFavorite: Function;
  onClickRemoveFromFavorite: Function;
}

export const SearchResultItem: React.FC<SearchResultItemProps> = ({ savedPlaces, onClickAddToFavorite, onClickRemoveFromFavorite, place }) => {
  const isPresentInDB = !!savedPlaces?.filter(savedPlace => savedPlace.place_id === place.place_id).length;
  
  const handleAddClick = () => {
    onClickAddToFavorite(place);
  }

  const handleRemoveClick = () => {
    onClickRemoveFromFavorite(place);
  }

  return (
    <StyledListItem>
      {place.formatted_address}
      {isPresentInDB ?
        <StyledButton onClick={handleRemoveClick}>Remove from Favorite</StyledButton>
        :
        <StyledButton onClick={handleAddClick}>Add To Favorite</StyledButton>
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