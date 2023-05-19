import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import styled from 'styled-components'

import { backendAPI } from 'services/BackendService'
import { currentPlaceSlice } from 'store/reducers/CurrentPlaceSlice'
import { useAppDispatch } from 'hooks/redux'
import { Title } from 'components/common/Primitives'
import Spinner from 'components/common/Spinner'
import FavoriteCitiesItem from './FavoriteCityItem'

const FavoriteCitiesContainer: React.FC = () => {
  const dispatch = useAppDispatch()

  const { data: savedPlaces, isLoading } = backendAPI.useGetSavedPlacesQuery()
  const [deletePlaceById] = backendAPI.useDeletePlaceByIdMutation()

  const handleRemoveFromFavorite = async (placeId: string): Promise<void> => {
    await deletePlaceById({ placeId })
    dispatch(backendAPI.util.invalidateTags(['Place']))
  }

  const handleClick = async (placeId: string): Promise<void> => {
    const place = savedPlaces?.filter((place) => place.place_id === placeId)[0]
    dispatch(currentPlaceSlice.actions.setCurrentPlace(place!))
  }

  return (
    <Wrapper>
      <Title>Favorite cities</Title>
      <Content>
        {savedPlaces && savedPlaces.length > 0 && (
          <Swiper slidesPerView={'auto'} spaceBetween={20}>
            {savedPlaces?.map((place) => (
              <StyledSwiperSlide key={place.place_id}>
                <FavoriteCitiesItem
                  timeOffset={place.timeOffset}
                  lat={place.lat}
                  lng={place.lng}
                  placeId={place.place_id}
                  onClick={handleClick}
                  onDeleteClick={handleRemoveFromFavorite}
                  cityName={place.formatted_address}
                  imgName={place.imgName}
                />
              </StyledSwiperSlide>
            ))}
          </Swiper>
        )}
        {savedPlaces?.length === 0 && (
          <EmptyPlaceholder>Here will be favorietis cities...</EmptyPlaceholder>
        )}
        {isLoading && <Spinner />}
      </Content>
    </Wrapper>
  )
}

const StyledSwiperSlide = styled(SwiperSlide)`
  width: fit-content;
  cursor: pointer;
`

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 210px;
`

const EmptyPlaceholder = styled.p`
  color: rgba(170, 170, 170, 0.6);
`

const Wrapper = styled.div`
  margin-top: 2rem;
`

export default FavoriteCitiesContainer
