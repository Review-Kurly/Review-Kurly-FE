import React from 'react';
import styled from 'styled-components';
import { CardBoxTitle } from '../../pages/home/components/ReviewCards';
import DetailCards from './DetailCards';

export default function DetailContainer(props) {
  return (
    <>
      <ReviewCardBoxWrapper>
        <CardBoxTitle>{props.getData?.title}</CardBoxTitle>
        <CardBoxContatainer>
          {props.getData?.map((item) => (
            <DetailCards key={item.id} item={item} />
          ))}
        </CardBoxContatainer>
      </ReviewCardBoxWrapper>
    </>
  );
}

const ReviewCardBoxWrapper = styled.div`
  width: 1050px;
  margin: 0px auto;
  padding: 0px;
`;

const CardBoxContatainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 249px);
  gap: 31px 18px;
  width: 100%;
`;
