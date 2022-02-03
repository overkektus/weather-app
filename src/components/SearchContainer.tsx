// import { Col, Row } from 'antd';
import React from 'react';
import styled from 'styled-components';

import Profile from './Profile';
import SearchBar from './SearchBar';

const SearchContainer: React.FC = () => {
  return (
    <Wrapper>
      <SearchBar />
      <Profile/>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export default SearchContainer;