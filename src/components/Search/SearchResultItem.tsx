import React from 'react';
import { List, Button } from 'antd';
import styled from 'styled-components'

import { IPlace } from 'services/BackendService';

interface SearchResultItemProps {
  place: IPlace;
  onClick: Function;
  onClickAddToFavorite: Function;
  onClickRemoveFromFavorite: Function;
}

export const SearchResultItem: React.FC<SearchResultItemProps> = ({ onClick, onClickAddToFavorite, onClickRemoveFromFavorite, place }) => {

  return (
    <StyledListItem>
      <p onClick={(): void => onClick(place)}>
        {place.formatted_address}
      </p>
      <StyledButton type="primary" danger onClick={(): void => onClickRemoveFromFavorite(place)}>Remove from Favorite</StyledButton>
      <StyledButton onClick={(): void => onClickAddToFavorite(place)}>Add To Favorite</StyledButton>
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