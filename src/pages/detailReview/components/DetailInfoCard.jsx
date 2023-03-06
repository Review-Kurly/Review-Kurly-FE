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
  console.log(detailData);

  return (
    <>
      {isLoading && <Spiner />}
      <DetailReviewContainer>
        <DetailReviewImageLabel>
          <DetailInfoImg src={detailData?.imageUrl} alt="" />
        </DetailReviewImageLabel>
        <DetailReviewInfoContainer>
          <DetailInfoLayout>
            <DetailInfoMiniBox>상품명</DetailInfoMiniBox>
            <DetailInfoDesc>{detailData?.title}</DetailInfoDesc>
          </DetailInfoLayout>
          <DetailInfoLayout>
            <DetailInfoMiniBox>상품간단설명</DetailInfoMiniBox>
            <DetailInfoDesc>{detailData?.content}</DetailInfoDesc>
          </DetailInfoLayout>
          <DetailInfoLayout>
            <DetailInfoMiniBox>상품가격</DetailInfoMiniBox>
            <DetailInfoDesc>{detailData?.price}</DetailInfoDesc>
          </DetailInfoLayout>
          <DetailInfoLayout>
            <DetailInfoMiniBox>판매처</DetailInfoMiniBox>
            <DetailInfoDesc>{detailData?.market}</DetailInfoDesc>
          </DetailInfoLayout>
          <DetailInfoLayout>
            <DetailInfoMiniBox>구매 링크</DetailInfoMiniBox>
            <DetailInfoDesc>
              <Link
                href={detailData?.purchaseUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {detailData?.purchaseUrl}
              </Link>
            </DetailInfoDesc>
          </DetailInfoLayout>
        </DetailReviewInfoContainer>
        <DetailInfoLayout>
          <DetailInfoMiniBox>상세 리뷰</DetailInfoMiniBox>
          <DetailInfoDesc>{detailData?.description}</DetailInfoDesc>
        </DetailInfoLayout>
      </DetailReviewContainer>
    </>
  );
}

const DetailReviewContainer = styled.div`
  width: 1050px;
  min-height: 700px;
  margin: auto;
  flex-wrap: wrap;
  margin-bottom: 20px;

  border: 1px solid black;
  ${(props) => props.theme.FlexRow}
`;

const DetailReviewImageLabel = styled.div`
  width: 350px;
  height: 470px;
  margin-right: 20px;
  border: 1px solid black;
  border-radius: 1rem;
  overflow: hidden;
`;

const DetailReviewInfoContainer = styled.div`
  width: 640px;
  height: 550px;
  border: 1px solid black;
`;

const DetailInfoLayout = styled.div`
  width: 640px;
  min-height: 68px;
  border: 1px solid black;
  ${(props) => props.theme.FlexRow}
`;

const DetailInfoMiniBox = styled.div`
  width: 140px;
  height: 48px;
  padding: 12px 0px 0px;
  font-weight: 500;
  line-height: 20px;
  border: 1px solid black;
`;

const DetailInfoDesc = styled.div`
  width: 450px;
  height: 46px;
  padding: 0px 11px 1px 15px;
  border-right: 4px;
  border: 1px solid black;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  color: rgb(51, 51, 51);
`;

const DetailInfoImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
