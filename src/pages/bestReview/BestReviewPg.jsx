import Cookies from 'js-cookie';
import React from 'react';
import { useQuery } from 'react-query';
import Spiner from '../../components/Spiner';
import DetailContainer from '../../feature/detail/DetailContainer';
import { getBestReview } from '../../modules/api/api';

function BestReviewPg() {
  const token = Cookies.get('accessJWTToken');
  const { isLoading, isError, data } = useQuery('getReviws', () =>
    getBestReview(token)
  );
  const getData = data?.data;
  console.log(getData);
  if (isError) return;

  return (
    <>
      {isLoading && <Spiner />}
      <DetailContainer getData={getData} />
    </>
  );
}

export default BestReviewPg;
