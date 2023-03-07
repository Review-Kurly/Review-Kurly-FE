import React from 'react';
import styled from 'styled-components';
import DetailInfoCard from './components/DetailInfoCard';

export default function DetailPg() {
  return (
    <>
      <DetailReviewWrapper>
        <DetailInfoCard />
      </DetailReviewWrapper>
    </>
  );
}

const DetailReviewWrapper = styled.div`
  max-width: 1050px;
  min-height: 700px;
  margin: auto;
  flex-wrap: wrap;
  ${(props) => props.theme.FlexRow}
`;
