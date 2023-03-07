import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import DetailContainer from '../../feature/detail/DetailContainer';
import Spiner from '../../components/Spiner';
import { getNewReview } from '../../modules/api/newReviewApi';

function NewReviewPg() {
  const token = Cookies.get('accessJWTToken');
  const [sort, setSort] = useState(''); // sort의 상태를 저장하려고 state 사용
  const { isLoading, isError, data } = useQuery(['getNewReview', sort], () =>
    getNewReview(token, sort)
  );
  const getData = data?.data;
  if (isError) return;

  const handleSortChange = (newSort) => setSort(newSort); //정렬 상태 함수
  //최대값, 최솟값순 정렬 클릭 이벤트
  const handleNewReviewSort = () => handleSortChange('');
  const handleExpensiveSort = () => handleSortChange('expensive');
  const handleCheapSort = () => handleSortChange('cheap');

  return (
    <>
      {isLoading && <Spiner />}
      {/* 최대값, 최솟값 정렬 버튼 */}
      <button onClick={handleNewReviewSort}>신상품순</button>
      <button onClick={handleCheapSort}>낮은 가격순</button>
      <button onClick={handleExpensiveSort}>높은 가격순</button>
      {/* 새로운 리뷰 목록 컴포넌트 리렌더링 */}
      <DetailContainer key={sort} getData={getData} />
    </>
  );
}

export default NewReviewPg;
