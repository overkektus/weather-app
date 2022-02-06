/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { MouseEventHandler, useEffect, useState } from 'react';
import { List } from 'antd';
import styled from 'styled-components';
import { GeocodeResult } from '@googlemaps/google-maps-services-js';
import { useLiveQuery } from 'dexie-react-hooks';

import { googleGeocodeAPI } from '../services/GoogleGeocodeService';
import { currentPlaceSlice } from '../store/reducers/CurrentPlaceSlice';
import { db } from '../models/db';
import { SearchResultItem } from './SearchResultItem';
import { useAppDispatch } from '../hooks/redux';

interface SearchResultProps {
  searchQuery: string;
  isHidden: boolean;
  onMouseEnter: MouseEventHandler;
  onMouseLeave: MouseEventHandler;
}

const SearchResult: React.FC<SearchResultProps> = ({ searchQuery, isHidden, onMouseEnter, onMouseLeave }) => {
  const [filteredSearchQuery, setFilteredSearchQuery] = useState(searchQuery);
  const { data, isLoading } = googleGeocodeAPI.useFetchPlacesByAddressQuery({ query: filteredSearchQuery });
  const places = data?.results.length ? data.results : [];

  const dispatch = useAppDispatch();

  const savedPlaces = useLiveQuery(
    () => db.placeItems.toArray()
  );

  const handleAddToFavorite = (place: GeocodeResult) => {
    db.placeItems.add(place)
  }

  const handleRemoveFromFavorite = (place: GeocodeResult) => {
    db.placeItems.where('place_id').equals(place.place_id).delete();
  }

  const handleClick = (place: GeocodeResult) => {
    dispatch(currentPlaceSlice.actions.setCurrentPlace(place));
  }

  useEffect(() => {
    if (searchQuery.length === 0 || searchQuery.length > 2) {
      setFilteredSearchQuery(searchQuery);
    }
  }, [searchQuery]);

  return (
    <Wrapper isHidden={isHidden} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <List
        size="small"
        bordered
        loading={isLoading}
        dataSource={places}
        renderItem={item =>
          <SearchResultItem 
            place={item}
            savedPlaces={savedPlaces}
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
  display: ${(props) => props.isHidden ? 'none' : 'block'};
  position: absolute;
  top: 50px;
  z-index: 1000;
  width: 100%;
  background: white;
`;

export default SearchResult;