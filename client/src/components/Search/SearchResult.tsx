import React, { MouseEventHandler } from 'react'
import { List } from 'antd'
import styled from 'styled-components'

import { currentPlaceSlice } from 'store/reducers/CurrentPlaceSlice'
import { backendAPI } from 'services/BackendService'
import { IPlace } from 'interfaces/Place.interface'
import { useAppDispatch } from 'hooks/redux'
import { SearchResultItem } from './SearchResultItem'

interface SearchResultProps {
  data: IPlace[]
  isLoading: boolean
  isHidden: boolean
  onMouseEnter: MouseEventHandler
  onMouseLeave: MouseEventHandler
}

const SearchResult: React.FC<SearchResultProps> = ({
  data,
  isLoading,
  isHidden,
  onMouseEnter,
  onMouseLeave,
}) => {
  const [createPlaceByAddress] = backendAPI.useCreatePlaceByAddressMutation()
  const dispatch = useAppDispatch()

  const handleAddToFavorite = async (place: IPlace): Promise<void> => {
    await createPlaceByAddress({ address: place.formatted_address })
    dispatch(backendAPI.util.invalidateTags(['Place']))
  }

  const handleClick = (place: IPlace): void => {
    dispatch(currentPlaceSlice.actions.setCurrentPlace(place))
  }

  return (
    <Wrapper
      isHidden={isHidden}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <List
        size="small"
        bordered
        loading={isLoading}
        dataSource={data}
        renderItem={(item): React.ReactElement => (
          <SearchResultItem
            place={item}
            onClick={handleClick}
            onClickAddToFavorite={handleAddToFavorite}
          />
        )}
      />
    </Wrapper>
  )
}

interface WrapperProps {
  isHidden: boolean
  onMouseEnter: MouseEventHandler
  onMouseLeave: MouseEventHandler
}

const Wrapper = styled.div<WrapperProps>`
  display: ${(props): string => (props.isHidden ? 'none' : 'block')};
  position: absolute;
  top: 50px;
  z-index: 1000;
  width: 100%;
  background: white;
`

export default SearchResult
