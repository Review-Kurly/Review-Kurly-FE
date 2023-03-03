import React from 'react';
import { homeData } from '../example/homeData';
import DetailContainer from '../feature/components/detail/DetailContainer';

function BestReviewPg() {
  return (
    <>
      <DetailContainer data={homeData} title={'베스트 리뷰'} />
    </>
  );
}

export default BestReviewPg;
