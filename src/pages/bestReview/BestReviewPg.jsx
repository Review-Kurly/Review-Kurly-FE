import React from 'react';
import DetailContainer from '../../feature/detail/DetailContainer';
import { homeData } from '../../mock/homeData';

function BestReviewPg() {
  return (
    <>
      <DetailContainer data={homeData} title={'베스트 리뷰'} />
    </>
  );
}

export default BestReviewPg;
