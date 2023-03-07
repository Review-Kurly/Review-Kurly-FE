import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import DetailContainer from '../../feature/detail/DetailContainer';
import Spiner from '../../components/Spiner';
import { getNewReview } from '../../modules/api/newReviewApi';
import styled from 'styled-components';
import Button from '../../components/Button';

export default function NewReviewPg() {
  const token = Cookies.get('accessJWTToken');

  const [sortActive, setSortActive] = useState('default');

  const [sort, setSort] = useState(''); // sort의 상태를 저장하려고 state 사용
  const { isLoading, isError, data } = useQuery(['getNewReview', sort], () =>
    getNewReview(token, sort)
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

      <ReviewTitleLayout>신규 리뷰</ReviewTitleLayout>
      {/* 최대값, 최솟값 정렬 버튼 */}

      <ReviewSortButtonContainer>
        <ReviewSortButtonLayout>
          <Button
            sort
            onClick={handleNewReviewSort}
            className={sortActive === 'default' ? 'active' : ''}
          >
            신상품순
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

export const ReviewTitleLayout = styled.div`
  width: 1050px;
  height: 35px;
  font-weight: 500;
  font-size: 28px;
  color: rgb(51, 51, 51);
  line-height: 35px;
  letter-spacing: -1px;
  text-align: center;
  margin: 50px auto 30px auto;
`;

export const ReviewSortButtonContainer = styled.div`
  width: 1050px;
  height: 40px;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const ReviewSortButtonLayout = styled.div`
  min-width: 100px;
  height: 20px;
  color: rgb(153, 153, 153);
  display: flex;
  align-items: center;
  font-size: 14px;

  &::before {
    content: '';
    width: 1px;
    height: 10px;
    margin-right: 8px;
    background-color: rgb(226, 226, 226);
  }
`;
