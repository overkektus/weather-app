import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import styled from 'styled-components'

import { backendAPI } from 'services/BackendService'
import { IPlace } from 'interfaces/Place.interface'
import { Units } from 'interfaces/Units.type'
import useLocalStorage from 'hooks/useLocalStorage'
import Spinner from 'components/common/Spinner'
import ForecastItem from './ForecastItem'

interface ForecastListProps {
  currentPlace: IPlace
}

const ForecastList: React.FC<ForecastListProps> = ({ currentPlace }) => {
  const [units] = useLocalStorage<Units>('units', 'metric')

  const { data, isLoading } = backendAPI.useGetForecastQuery({
    lat: currentPlace.lat,
    lng: currentPlace.lng,
    units,
  })

  return (
    <Wrapper>
      {isLoading && <Spinner />}
      {data && (
        <StyledSwiper slidesPerView={'auto'} spaceBetween={20}>
          {data.list.map((item, i) => {
            const {
              main: { temp_max, temp_min },
              dt,
              weather,
            } = item
            return (
              <StyledSwiperSlide key={i}>
                <ForecastItem
                  key={dt}
                  maxTemp={temp_max}
                  minTemp={temp_min}
                  timestamp={dt}
                  weatherIconCode={weather[0].icon}
                />
              </StyledSwiperSlide>
            )
          })}
        </StyledSwiper>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledSwiperSlide = styled(SwiperSlide)`
  width: fit-content;
  cursor: pointer;
`

const StyledSwiper = styled(Swiper)`
  box-shadow: inset -20px 0px 35px 0px rgba(255, 255, 255, 0.7);
`

export default ForecastList
