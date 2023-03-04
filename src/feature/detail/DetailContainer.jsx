import React from 'react';
import styled from 'styled-components';
import {
  CardBoxTitle,
  HomeCardBoxWrapper,
} from '../../pages/home/components/ReviewCards';
import DetailCards from './DetailCards';

export default function DetailContainer(props) {
  return (
    <>
      <HomeCardBoxWrapper>
        <CardBoxTitle>{props.title}</CardBoxTitle>
        <CardBoxContatainer>
          {props.data.map((item) => (
            <DetailCards item={item} />
          ))}
        </CardBoxContatainer>
      </HomeCardBoxWrapper>
    </>
  );
}

const CardBoxContatainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 249px);
  gap: 31px 18px;
  width: 100%;
`;
