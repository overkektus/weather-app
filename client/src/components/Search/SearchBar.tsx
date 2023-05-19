import React, { useState } from 'react'
import styled from 'styled-components'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

import * as colors from 'assets/styled-components/colors'
import { useDebounce } from 'hooks/useDebounce'
import { backendAPI } from 'services/BackendService'
import SearchResult from './SearchResult'
import SearchButton from './SearchButton'

function SearchBar(): React.ReactElement {
  const [searchQuery, setSearchQuery] = useState('')
  const [isFocused, setFocused] = useState(false)
  const [isMouseOver, setMouseOver] = useState(false)
  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  const { data: place, isLoading } = backendAPI.useGetPlaceByAddressQuery(
    { address: debouncedSearchQuery },
    { skip: debouncedSearchQuery.length < 3 }
  )

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(event.target.value)
  }
  const handleFocus = (): void => setFocused(true)
  const handleBlur = (): void => setFocused(false)

  const handleMouseEnter = (): void => setMouseOver(true)
  const handleMouseLeave = (): void => setMouseOver(false)

  return (
    <Wrapper>
      <SearchButton icon={<MagnifyingGlassIcon />} />
      <SearchWrapper>
        <StyledInput
          value={searchQuery}
          type="text"
          placeholder="Search"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {place && (
          <SearchResult
            data={[place]}
            isLoading={isLoading}
            isHidden={!(isFocused || isMouseOver)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        )}
      </SearchWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin-right: 5rem;
  position: relative;
`

const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 0 1.5rem;
`

const StyledInput = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid ${colors.lightGray};
  border-radius: 0;
  min-height: 50px;
  outline: none;

  &:focus {
    border-color: ${colors.pramary};
    box-shadow: none;
  }
`

export default SearchBar
