import React from 'react';
import { homeData } from '../../mock/homeData';
import DetailContainer from '../../feature/detail/DetailContainer';

function NewReviewPg() {
  return (
    <>
      <DetailContainer data={homeData} title={'신규 리뷰'} />
    </>
  );
}

export default NewReviewPg;
