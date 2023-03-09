import { useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import DetailContainer from '../../feature/detail/DetailContainer';
import styled from 'styled-components';
import { ReactComponent as SearchImage } from '../../styles/img/searchImage.svg';

export default function SearchView() {
  const searchResult = useSelector((state) => state.searchSlice.data);
  // const loading = useSelector((state) => state.searchSlice?.loading);
  // // const error = useSelector((state) => state.searchResult?.error);

  useEffect(() => {
    console.log('searchResult---->', searchResult?.data.length);
  }, [searchResult]);

  return (
    <>
      {/* 최대값, 최솟값 정렬 버튼 */}

      {/* 새로운 리뷰 목록 컴포넌트 리렌더링 */}
      {searchResult?.data.length !== 0 ? (
        <>
          <ReviewTitleLayout>검색 결과</ReviewTitleLayout>
          <DetailContainer getData={searchResult?.data} />
        </>
      ) : (
        <>
          <EmptyWrapper>
            <EmptyResult>
              <SearchImage />
              <div>검색 결과가 없습니다.</div>
            </EmptyResult>
          </EmptyWrapper>
        </>
      )}
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

const EmptyWrapper = styled.div`
  position: fixed;
  top: 50%;
  width: 100%;
`;
const EmptyResult = styled.div`
  ${(props) => props.theme.FlexCol}
  gap: 2rem;
`;
