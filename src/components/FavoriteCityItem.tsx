import React from 'react';
import styled from 'styled-components';

import * as colors from '../assets/styled-components/colors';

interface FavoriteCitiesItemProps {
  cityName: string;
  time: string;
  imgSrc?: string;
}

const FavoriteCitiesItem: React.FC<FavoriteCitiesItemProps> = ({ cityName, time, imgSrc = 'https://traveller-eu.ru/sites/default/files/ukrashenie-doma-niderlandy-gorod-amsterdam-vecherom-doma-kanala-fary-nochnaya-peyzazh-shelkovoy-tkan-800x533.jpg' }) => {
  return (
    <Wrapper>
      <Card backgroundImage={imgSrc}>
        <Info>
          <CurrentTime>{time}</CurrentTime>
        </Info>
      </Card>
      <CityName>{cityName}</CityName>
    </Wrapper>
  );
};

export default FavoriteCitiesItem;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  height: fit-content;
  transition: all 0.2s 0s ease, all 0.2s 0s ease;

  &:hover {
    transform: translate(0px, -8px);
    cursor: pointer;

    > p {
      color: ${colors.pramary};
    }
  }
`;

interface CardProps {
  backgroundImage: string;
}

const Card = styled.div<CardProps>`
  width: 250px;
  height: 150px;
  border-radius: 15px;
  margin-bottom: 20px;
  position: relative;
  background-image: url('${(props) => props.backgroundImage}');
  background-size: cover;
  overflow: hidden;
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
`;

const Info = styled.div`
  padding: 10px 15px;
  background-color: white;
  border-radius: 20px 0 0 0;
  position: absolute;
  right: 0;
  bottom: 0;
`

const CurrentTime = styled.p`

`;

const CityName = styled.p`
  transition: all 0.5s 0s ease, all 0.5s 0s ease;
`;