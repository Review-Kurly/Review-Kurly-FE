import React from 'react';
import styled from 'styled-components';
import Header from './Header';

const MainWrapper = styled.div`
  width: calc(100%);
  height: calc(100vh - 250px);
`;

const BodyWrapper = styled.div`
  height: 100%;
`;

function Layout({ children }) {
  return (
    <BodyWrapper>
      <Header />
      <MainWrapper>{children}</MainWrapper>
    </BodyWrapper>
  );
}

export default Layout;
