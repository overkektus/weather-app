import React, { useState } from 'react';
import styled from 'styled-components'

import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import { SearchOutlined } from '@ant-design/icons';
import * as colors from '../assets/styled-components/colors';
import SearchResult from './SearchResult';
import { useDebounce } from '../hooks/useDebounce';

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
      <StyledButton type="primary" icon={<SearchOutlined />} />
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

const StyledButton = styled(Button)`
  margin-right: 20px;
  width: 60px;
  height: 50px;
  border: none;
  border-radius: 15px;
  background-color: ${colors.lightGray};

  &:hover, &:focus  {
    background-color: ${colors.pramary};

    > span > svg {
      color: ${colors.lightGray};
    }
  }

  &:active, &:focus {
    background-color: ${colors.pramary};
  }

  > span > svg {
    width: 20px;
    height: 20px;
    color: ${colors.pramary};
  }
`

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