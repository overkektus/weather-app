import React from 'react'
import { List, Button } from 'antd'
import styled from 'styled-components'

import { IPlace } from 'interfaces/Place.interface'

interface SearchResultItemProps {
  place: IPlace
  onClick: Function
  onClickAddToFavorite: Function
}

export const SearchResultItem: React.FC<SearchResultItemProps> = ({
  onClick,
  onClickAddToFavorite,
  place,
}) => {
  return (
    <StyledListItem>
      <p onClick={(): void => onClick(place)}>{place.formatted_address}</p>
      <StyledButton onClick={(): void => onClickAddToFavorite(place)}>
        Add To Favorite
      </StyledButton>
    </StyledListItem>
  )
}

const { Item: ListItem } = List

const StyledListItem = styled(ListItem)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const StyledButton = styled(Button)`
  margin: 0 1rem;
`
