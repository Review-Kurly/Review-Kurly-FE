import Cookies from 'js-cookie';
import React from 'react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Spiner from '../../../components/Spiner';
import { getDetailReview } from '../../../modules/api/api';

export default function DetailInfoCard() {
  const token = Cookies.get('accessJWTToken');
  const params = useParams();
  const reviewId = params.id;

  const { isLoading, isError, data } = useQuery('getDetailReview', () =>
    getDetailReview({ token, reviewId })
  );

  const detailData = data?.data;

  // 가격 1000단위 "," 표시
  const formattedPrice = detailData?.price.toLocaleString();

  return (
    <>
      {isLoading && <Spiner />}
      <DetailReviewContainer>
        <DetailReviewImageLabel>
          <DetailInfoImg src={detailData?.imageUrl} alt="" />
        </DetailReviewImageLabel>
        <DetailReviewInfoContainer>
          <DetailTitleContainer>
            <DetailTitleLayout>{detailData?.title}</DetailTitleLayout>

            <DetailSubTitle>{detailData?.description}</DetailSubTitle>
          </DetailTitleContainer>

          <DetailPriceLayout>{formattedPrice} 원</DetailPriceLayout>

          <DetailInfoLayout>
            <DetailInfoMiniBox>판매처</DetailInfoMiniBox>
            <DetailInfoDesc>{detailData?.market}</DetailInfoDesc>
          </DetailInfoLayout>
          <DetailInfoLayout>
            <DetailInfoMiniBox>구매 링크</DetailInfoMiniBox>
            <DetailInfoDesc>
              <Link
                to={detailData?.purchaseUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {detailData?.purchaseUrl}
              </Link>
            </DetailInfoDesc>
          </DetailInfoLayout>
          <DetailInfoLayout>
            <DetailInfoMiniBox>상세 리뷰</DetailInfoMiniBox>
            <DetailInfoDesc> {detailData?.content}</DetailInfoDesc>
          </DetailInfoLayout>
          <DetailLikeButton>
            <DetailLikeButtonSpan></DetailLikeButtonSpan>
          </DetailLikeButton>
        </DetailReviewInfoContainer>
      </DetailReviewContainer>
    </>
  );
}

const DetailReviewContainer = styled.div`
  width: 1050px;
  min-height: 700px;
  margin: auto;
  flex-wrap: wrap;
  margin: 30px 0px 20px 0px;
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const DetailReviewImageLabel = styled.div`
  width: 430;
  height: 552px;
  margin-right: 20px;
  overflow: hidden;
`;

const DetailReviewInfoContainer = styled.div`
  width: 560px;
`;

const DetailTitleContainer = styled.div`
  width: 560px;
  height: 64px;
  ${(props) => props.theme.FlexCol}
`;

const DetailTitleLayout = styled.div`
  width: 560px;
  font-weight: 500;
  font-size: 24px;
  color: rgb(51, 51, 51);
  line-height: 34px;
  letter-spacing: -0.5px;
  word-break: keep-all;
`;

const DetailSubTitle = styled.div`
  width: 560px;
  padding-top: 5px;
  font-size: 14px;
  font-weight: 400;
  color: rgb(181, 181, 181);
  line-height: 19px;
  letter-spacing: -0.5px;
`;

const DetailPriceLayout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding-top: 19px;
  font-weight: bold;
  font-size: 30px;
  line-height: 40px;
  letter-spacing: 0.5px;
`;

const DetailInfoLayout = styled.div`
  display: flex;
  flex: 1 1 0%;
  flex-direction: row;
  align-items: flex-start;
  overflow: hidden;
  width: 100%;
  padding: 17px 0px 18px;
  border-top: 1px solid rgb(244, 244, 244);
  font-size: 14px;
  letter-spacing: -0.5px;
`;

const DetailInfoMiniBox = styled.div`
  width: 128px;
  height: 100%;
  color: rgb(102, 102, 102);
  font-weight: 400;
  line-height: 20px;
  font-size: 15px;
`;

const DetailInfoDesc = styled.div`
  width: 432px;
  display: block;
  font-size: 20px;
  color: rgb(102, 102, 102);
  padding-top: 4px;
  line-height: 25px;
  white-space: pre-line;
`;

const DetailInfoImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DetailLikeButton = styled.button`
  display: block;
  padding: 0px 10px;
  text-align: center;
  overflow: hidden;
  width: 56px;
  height: 56px;
  border-radius: 3px;
  color: rgb(51, 51, 51);
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(221, 221, 221);
  cursor: pointer;
`;

const DetailLikeButtonSpan = styled.span`
  display: inline-block;
  font-size: 16px;
  font-weight: 500;
  width: 32px;
  height: 32px;
  border: 0;
  vertical-align: top;
  background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0yNS44MDcgNy44NjNhNS43NzcgNS43NzcgMCAwIDAtOC4xNzIgMEwxNiA5LjQ5N2wtMS42MzUtMS42MzRhNS43NzkgNS43NzkgMCAxIDAtOC4xNzMgOC4xNzJsMS42MzQgMS42MzQgNy40NjYgNy40NjdhMSAxIDAgMCAwIDEuNDE1IDBzMCAwIDAgMGw3LjQ2Ni03LjQ2N2gwbDEuNjM0LTEuNjM0YTUuNzc3IDUuNzc3IDAgMCAwIDAtOC4xNzJ6IiBzdHJva2U9IiM1RjAwODAiIHN0cm9rZS13aWR0aD0iMS42IiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K)
    center center no-repeat;
`;
