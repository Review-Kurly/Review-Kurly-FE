import React from 'react';
import { homeData } from '../example/homeData';
import DetailContainer from '../feature/components/detail/DetailContainer';

function NewReviewPg() {
  return (
    <>
      <DetailContainer data={homeData} title={'신규 리뷰'} />
    </>
  );
}

export default NewReviewPg;
