import React from 'react';
//npm i react-spinners --save
import { HashLoader } from 'react-spinners';
import styled from 'styled-components';

const Spiner = ({ loading }) => {
  return (
    <SpinerWrapper>
      <SpinerContainer>
        <HashLoader
          color={'#5f0080'}
          loading={loading}
          size={150}
          speedMultiplier={2}
        />
      </SpinerContainer>
    </SpinerWrapper>
  );
};

export default Spiner;

const SpinerWrapper = styled.div`
  ${(props) => props.theme.Flexrow}
  position: fixed;
  z-index: 99999;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.333);
  backdrop-filter: blur(2px);
`;

const SpinerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
