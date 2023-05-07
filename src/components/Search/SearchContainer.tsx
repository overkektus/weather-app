import React from 'react'
import styled from 'styled-components'

import SearchBar from './SearchBar'

const SearchContainer: React.FC = () => {
  return (
    <Wrapper>
      <SearchBar />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`

export default SearchContainer
