/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState } from 'react';
import styled from 'styled-components'

import Input from 'antd/lib/input';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import * as colors from '../assets/styled-components/colors';
import SearchResult from './SearchResult';
import { useDebounce } from '../hooks/useDebounce';
import SearchButton from './SearchButton';

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setFocused] = useState(false);
  const [isMouseOver, setMouseOver] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);

  const handleMouseEnter = () => setMouseOver(true);
  const handleMouseLeave = () => setMouseOver(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  return (
    <Wrapper>
      <SearchButton icon={<MagnifyingGlassIcon />} />
      <SearchWrapper>
        <StyledInput value={searchQuery} type="text" placeholder='Search' onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange}/>
        <SearchResult searchQuery={debouncedSearchQuery} isHidden={!(isFocused || isMouseOver)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
      </SearchWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin-right: 5rem;
  position: relative;
`;

const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledInput = styled(Input)`
  border: none;
  border-bottom: 1px solid ${colors.lightGray};
  border-radius: 0;
  min-height: 50px;

  &:focus {
    border-color: ${colors.pramary};
    box-shadow: none;
  }
`

export default SearchBar;