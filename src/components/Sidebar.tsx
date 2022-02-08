import React from 'react';
import { HomeIcon, ChartBarIcon, MapIcon, CalendarIcon, CogIcon } from '@heroicons/react/outline';
import { Divider, Menu } from 'antd';
import styled from 'styled-components';

import * as colors from '../assets/styled-components/colors';
import logo from '../assets/img/logo.png';
import WeatherContainer from './WeatherContainer';

const menuItems = [
  {
    title: 'Dashboard',
    icon: <HomeIcon/>
  },
  {
    title: 'Statistics',
    icon: <ChartBarIcon/>
  },
  {
    title: 'Map',
    icon: <MapIcon/>
  },
  {
    title: 'Calendar',
    icon: <CalendarIcon/>
  },
  {
    title: 'Setting',
    icon: <CogIcon/>
  }
];

const Sidebar: React.FC = () => {
  return (
    <SideBar>
      <LogoWrapper>
        <Logo src={logo}/>
        <AppName>
          meteorolog
        </AppName>
      </LogoWrapper>
      <StyledDivider />
      <StyledMenu>
        {menuItems.map(item =>
          <StyledMenuItem key={item.title}>
            <Icon>{item.icon}</Icon>
            <p>{item.title}</p>
          </StyledMenuItem>  
        )}
      </StyledMenu>
      <WeatherContainer />
    </SideBar>
  );
};

const Logo = styled.img`
  width: 2.5rem;
`;

const AppName = styled.h1`
  color: ${colors.lightWhite};
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1.2rem;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 1rem 1.5rem;
`;

const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: ${colors.pramary};
  min-height: 100%;
`

const StyledDivider = styled(Divider)`
  border-top: 1px solid ${colors.second}
  margin: 0;
`

const StyledMenu = styled(Menu)`
  background-color: ${colors.pramary};
  border: none;
`

const StyledMenuItem = styled(Menu.Item)`
  background-color: ${colors.pramary};
  border-left: 2px solid transparent;
  color: ${colors.lightWhite};
  &:hover {
    color: white !important;
    border-left: 2px solid white;
  }

  > span {
    display: flex;
    align-items: center;
  }
`

const Icon = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`

export default Sidebar;