import React from 'react';
import styled from 'styled-components'

import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import { SearchOutlined } from '@ant-design/icons';
import * as colors from '../assets/styled-components/colors';

const SearchBar: React.FC = () => { 
  return (
    <Wrapper>
      <StyledButton type="primary" icon={<SearchOutlined />} />
      <StyledInput type="text" placeholder='Search' />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
`

const StyledButton = styled(Button)`
  margin-right: 20px;
  width: 55px;
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

  &:focus {
    border-color: ${colors.pramary};
    box-shadow: none;
  }
`

export default SearchBar;