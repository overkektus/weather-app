import React from 'react';
import { Col, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import styled from 'styled-components';

import Sidebar from './components/Sidebar';
import SearchContainer from './components/SearchContainer';
import FavoriteCitiesContainer from './components/FavoriteCitiesContainer';

function App() {
  return (
    <Row>
      <StyledSider>
        <Sidebar/>
      </StyledSider>
      <Col span={18}>
        <StyledContent>
          <SearchContainer/>
          <FavoriteCitiesContainer />
        </StyledContent>
      </Col>
    </Row>
  );
}

const StyledSider = styled(Sider)`
  width: 250px !important;
  max-width: 250px !important;
  flex: 0 0 250px !important;
`;

const StyledContent = styled(Content)`
  padding: 1.5rem;
`;

export default App;
