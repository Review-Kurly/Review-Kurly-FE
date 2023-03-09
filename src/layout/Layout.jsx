import React from 'react';
import styled from 'styled-components';
import Header from './Header';

const MainWrapper = styled.div`
  position: relative;
  width: calc(100%);
  height: 100%;
`;

const BodyWrapper = styled.div`
  height: 100%;
  padding: 0 0 5rem;
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
