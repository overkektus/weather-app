import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { XCircleIcon } from '@heroicons/react/24/solid'

import { sunriseSunsetAPI } from 'services/SunriseSunsetService'
import { IconCode } from 'interfaces/IconCode.type'
import { useClock } from 'hooks/useClock'
import * as colors from 'assets/styled-components/colors'
import DeleteButton from './DeleteButton'

interface FavoriteCitiesItemProps {
  placeId: string
  cityName: string
  lat: number
  lng: number
  timeOffset: number
  imgName: string
  onDeleteClick: Function
  onClick: Function
}

const FavoriteCitiesItem: React.FC<FavoriteCitiesItemProps> = ({
  onClick,
  onDeleteClick,
  placeId,
  timeOffset,
  lat,
  lng,
  cityName,
  imgName,
}) => {
  const { data: sunsetSunrise } = sunriseSunsetAPI.useFetchSunriseSunsetQuery({
    lat,
    lon: lng,
  })
  const { currentTime } = useClock(timeOffset)

  const [iconCode, setIconCode] = useState<IconCode | null>(null)
  useEffect(() => {
    if (sunsetSunrise) {
      const {
        results: { sunrise, sunset },
      } = sunsetSunrise
      const sunriseDate = moment(sunrise)
      const sunsetDate = moment(sunset)
      if (sunriseDate < currentTime && currentTime < sunsetDate) {
        setIconCode('01d')
      } else {
        setIconCode('01n')
      }
    }
  }, [sunsetSunrise])

  const handleDeleteClick = (event: any): void => {
    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()
    onDeleteClick(placeId)
  }

  return (
    <Wrapper onClick={(): void => onClick(placeId)}>
      <Card backgroundImage={`${process.env.REACT_APP_API_URL}/${imgName}`}>
        <DeleteButton onClick={handleDeleteClick} icon={<StyledXIcon />} />
        <Info>
          <CurrentTime>{currentTime.format('HH:mm')}</CurrentTime>
          {iconCode && (
            <StyledIcon
              src={require(`/src/assets/img/icons/${iconCode}.png`)}
            />
          )}
        </Info>
      </Card>
      <CityName>{cityName}</CityName>
    </Wrapper>
  )
}

export default FavoriteCitiesItem

const StyledXIcon = styled(XCircleIcon)`
  width: 1.5rem;
`

const StyledIcon = styled.img`
  align-self: flex-start;
  width: 1.5rem;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  height: 210px;
  padding-top: 8px;
  transition: all 0.2s 0s ease, all 0.2s 0s ease;
  max-width: 250px;
  margin: 0 2rem;
  text-align: center;
  animation: add-element 0.2s;

  &:hover {
    transform: translate(0px, -8px);
    cursor: pointer;

    > p {
      color: ${colors.pramary};
    }
  }

  @keyframes add-element {
    from {
      opacity: 0;
      transform: scale(0);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`

interface CardProps {
  backgroundImage: string
}

const Card = styled.div<CardProps>`
  width: 250px;
  height: 150px;
  border-radius: 15px;
  margin-bottom: 20px;
  position: relative;
  background-image: url('${(props): string => props.backgroundImage}');
  background-size: cover;
  overflow: hidden;
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
`

const Info = styled.div`
  width: 5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: white;
  border-radius: 20px 0 0 0;
  position: absolute;
  right: 0;
  bottom: 0;
`

const CurrentTime = styled.p`
  display: block;
  margin-right: 0.2rem;
  font-size: 0.7rem;
  font-weight: bold;
`

const CityName = styled.p`
  transition: all 0.5s 0s ease, all 0.5s 0s ease;
`
