import React, { MouseEventHandler } from 'react';
import { List } from 'antd';
import styled from 'styled-components';
import { GeocodeResult } from '@googlemaps/google-maps-services-js';

import { currentPlaceSlice } from 'store/reducers/CurrentPlaceSlice';
import { IPlace, backendAPI } from 'services/BackendService';
import { useAppDispatch } from 'hooks/redux';
import { SearchResultItem } from './SearchResultItem';

interface SearchResultProps {
  data: IPlace[];
  isLoading: boolean;
  isHidden: boolean;
  onMouseEnter: MouseEventHandler;
  onMouseLeave: MouseEventHandler;
}

const SearchResult: React.FC<SearchResultProps> = ({ data, isLoading, isHidden, onMouseEnter, onMouseLeave }) => {
  const [createPlaceByAddress] = backendAPI.useCreatePlaceByAddressMutation();
  const dispatch = useAppDispatch();

  const handleAddToFavorite = async (place: GeocodeResult): Promise<void> => {
    await createPlaceByAddress({ address: place.formatted_address });
    dispatch(backendAPI.util.invalidateTags(['Place']));
  }

  const handleRemoveFromFavorite = (place: GeocodeResult): void => {
    console.log(place);
  }

  const handleClick = (place: IPlace): void => {
    dispatch(currentPlaceSlice.actions.setCurrentPlace(place));
  }

  return (
    <Wrapper isHidden={isHidden} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <List
        size="small"
        bordered
        loading={isLoading}
        dataSource={data}
        renderItem={(item): React.ReactElement =>
          <SearchResultItem 
            place={item}
            onClick={handleClick}
            onClickAddToFavorite={handleAddToFavorite}
            onClickRemoveFromFavorite={handleRemoveFromFavorite}
          />
        }
      />
    </Wrapper>
  );
};

interface WrapperProps {
  isHidden: boolean;
  onMouseEnter: MouseEventHandler;
  onMouseLeave: MouseEventHandler;
}

const Wrapper = styled.div<WrapperProps>`
  display: ${(props): string => props.isHidden ? 'none' : 'block'};
  position: absolute;
  top: 50px;
  z-index: 1000;
  width: 100%;
  background: white;
`;

export default SearchResult;