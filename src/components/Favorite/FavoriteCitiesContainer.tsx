import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from 'styled-components';

import { currentPlaceSlice } from '../../store/reducers/CurrentPlaceSlice';
import { Title } from '../common';
import FavoriteCitiesItem from './FavoriteCityItem';
import Spinner from 'components/common/Spinner';
import { db } from '../../models/db';
import { useAppDispatch } from '../../hooks/redux';
import { backendAPI } from '../../services/BackendService';

const FavoriteCitiesContainer: React.FC = () => {
  const dispatch = useAppDispatch();

  const { data: savedPlaces, isLoading } = backendAPI.useGetSavedPlacesQuery();
  const [deletePlaceById] = backendAPI.useDeletePlaceByIdMutation();

  const handleRemoveFromFavorite = async (placeId: string): Promise<void> => {
    await deletePlaceById({ placeId });
    dispatch(backendAPI.util.invalidateTags(['Place']));
  }

  const handleClick = async (placeId: string): Promise<void> => {
    const place = (await db.placeItems.where('place_id').equals(placeId).toArray())[0];
    dispatch(currentPlaceSlice.actions.setCurrentPlace(place));
  }

  return (
    <Wrapper>
      <Title>Favorite cities</Title>
      <Content>
        {savedPlaces && savedPlaces.length > 0 &&
          <Swiper
            slidesPerView={'auto'}
            spaceBetween={20}
          >
            {savedPlaces?.map(place => (
              <StyledSwiperSlide>
                <FavoriteCitiesItem key={place.place_id} timeOffset={place.timeOffset} lat={place.lat} lng={place.lng} placeId={place.place_id} onClick={handleClick} onDeleteClick={handleRemoveFromFavorite} cityName={place.formatted_address} />
              </StyledSwiperSlide>
            ))}
          </Swiper>
        }
        {savedPlaces?.length === 0 && 
          <EmptyPlaceholder>
            Here will be favorietis cities...
          </EmptyPlaceholder>
        }
        {isLoading && <Spinner/>}
      </Content>
    </Wrapper>
  );
};

const StyledSwiperSlide = styled(SwiperSlide)`
  width: fit-content;
  cursor: pointer;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 210px;
`;

const EmptyPlaceholder = styled.p`
  color: rgba(170, 170, 170, 0.6);
`;

const Wrapper = styled.div`
  margin-top: 2rem;
`;


export default FavoriteCitiesContainer;