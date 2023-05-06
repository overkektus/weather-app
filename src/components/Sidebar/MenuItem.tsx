import React from 'react';
import styled from 'styled-components';

interface MenuItemProps {
  text: String;
  icon: JSX.Element;
}

const MenuItem: React.FC<MenuItemProps> = ({ text, icon }) => {
  return (
    <LI>
      <IconWrapper>{icon}</IconWrapper>
      <Title>{text}</Title>
    </LI>
  )
}

const LI = styled.li`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  border-left: 2px solid transparent;

  &:hover {
    cursor: pointer;
    color: white;
    border-left: 2px solid white;
    background: linear-gradient(90deg, rgba(255,255,255,0.2) 10%, transparent 100%);

    & div, p {
      color: white;
    }
  }
`;

const Title = styled.p`
  color: #e4e4e4;
`;

const IconWrapper = styled.div`
  margin-right: 0.5rem;
  width: 2rem;
  color: #cbcbcb;
`;

export default MenuItem;