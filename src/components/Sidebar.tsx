import React from 'react';
import { HomeIcon, ChartBarIcon, MapIcon, CalendarIcon, CogIcon } from '@heroicons/react/24/outline';
import { Divider } from 'antd';
import styled from 'styled-components';

import * as colors from '../assets/styled-components/colors';
import logo from '../assets/img/logo.png';
import WeatherContainer from './WeatherContainer';
import MenuItem from './MenuItem';

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
      <Menu>
        {menuItems.map(item => 
          <MenuItem key={item.title} text={item.title} icon={item.icon} />
        )}
      </Menu>
      <WeatherCardWrapper>
        <WeatherContainer />
      </WeatherCardWrapper>
    </SideBar>
  );
};

const WeatherCardWrapper = styled.div`
  flex-grow: 1;
`;

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
  height: 100%;
  width: 300px;
  flex-direction: column;
  justify-content: flex-start;
  background-color: ${colors.pramary};
`

const StyledDivider = styled(Divider)`
  border-top: 1px solid ${colors.second};
  margin: 0;
`

const Menu = styled.ul`
  
`;

export default Sidebar;