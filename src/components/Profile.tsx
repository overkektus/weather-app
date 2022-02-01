import React from 'react';
import styled from 'styled-components';
import { BellIcon } from '@heroicons/react/solid';
import * as colors from '../assets/styled-components/colors';
import { Avatar } from 'antd';

const Profile: React.FC = () => {
  return (
    <Wrapper>
      <StyledBellIcon/>
      <Devider/>
      <StyledAvatar src="https://joeschmoe.io/api/v1/random" />
      <p>William Jacobson</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border: 1px solid ${colors.lightGray};
  border-radius: 15px;
  width: fit-content;
`;

const Devider = styled.div`
  height: 25px;
  border-left: 1px solid ${colors.lightGray};
`;

const StyledBellIcon = styled(BellIcon)`
  margin-right: 10px;
  width: 22px;
  height: 22px;
  color: ${colors.lightGray};
`;

const StyledAvatar = styled(Avatar)`
  margin: 0 15px;
  width: 35px;
  height: 35px;
`

export default Profile;