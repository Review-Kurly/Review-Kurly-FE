import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import DetailContainer from '../../feature/detail/DetailContainer';
import Spiner from '../../components/Spiner';
import { getBestReview } from '../../modules/api/bestReviewApi';
import {
  ReviewSortButtonContainer,
  ReviewSortButtonLayout,
  ReviewTitleLayout,
} from '../newReview/NewReviewPg';
import Button from '../../components/Button';

export default function BestReviewPg() {
  const token = Cookies.get('accessJWTToken');
  const [sortActive, setSortActive] = useState('default');

  const [sort, setSort] = useState(''); // sort의 상태를 저장하려고 state 사용
  const { isLoading, isError, data } = useQuery(['getBestReview', sort], () =>
    getBestReview(token, sort)
  );
  const getData = data?.data;
  if (isError) return;

  const handleSortChange = (newSort) => setSort(newSort); //정렬 상태 함수
  //최대값, 최솟값순 정렬 클릭 이벤트
  const handleNewReviewSort = () => {
    setSortActive('default');
    handleSortChange('');
  };
  const handleExpensiveSort = () => {
    setSortActive('expensive');
    handleSortChange('expensive');
  };
  const handleCheapSort = () => {
    setSortActive('cheap');
    handleSortChange('cheap');
  };

  return (
    <>
      {isLoading && <Spiner />}

      <ReviewTitleLayout>베스트 리뷰</ReviewTitleLayout>
      {/* 최대값, 최솟값 정렬 버튼 */}

      <ReviewSortButtonContainer>
        {/* TODO: 컴포넌트 말고 Map으로 반복되는 부분 구현해보기 */}
        <ReviewSortButtonLayout>
          <Button
            sort
            onClick={handleNewReviewSort}
            className={sortActive === 'default' ? 'active' : ''}
          >
            베스트 리뷰순
          </Button>
        </ReviewSortButtonLayout>

        <ReviewSortButtonLayout>
          <Button
            sort
            onClick={handleCheapSort}
            className={sortActive === 'cheap' ? 'active' : ''}
          >
            낮은 가격순
          </Button>
        </ReviewSortButtonLayout>
        <ReviewSortButtonLayout>
          <Button
            sort
            onClick={handleExpensiveSort}
            className={sortActive === 'expensive' ? 'active' : ''}
          >
            높은 가격순
          </Button>
        </ReviewSortButtonLayout>
      </ReviewSortButtonContainer>

      {/* 새로운 리뷰 목록 컴포넌트 리렌더링 */}
      <DetailContainer key={sort} getData={getData} />
    </>
  );
}

/*
const sortCategory = [
{type: 'default', value: '베스트 리뷰순'},
{type: 'cheap', value: '낮은 가격순'},
{type: 'expensive', value: '높은 가격순'}
]
*/
