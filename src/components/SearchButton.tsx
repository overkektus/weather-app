import React from 'react';
import styled from 'styled-components';

import * as colors from '../assets/styled-components/colors';

interface SearchButtonProps {
  icon: JSX.Element;
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const SearchButton: React.FC<SearchButtonProps> = ({ icon, onClick }) => {
  return (
    <StyledButton onClick={onClick}>
      {icon}
    </StyledButton>
  )
}

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 15px;
  background-color: ${colors.lightGray};
  transition: background-color 0.3s ease; 

  > svg {
    width: 25px;
    height: 25px;
    color: ${colors.pramary};
    transition: color 0.3s ease; 
  }

  &:hover, &:focus  {
    background-color: ${colors.pramary};

    > svg {
      color: ${colors.lightGray};
    }
  }

  &:active, &:focus {
    background-color: ${colors.pramary};
  }
`;

export default SearchButton;