import Cookies from 'js-cookie';
import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Spiner from '../../../elements/Spiner';
import Button from '../../../elements/Button';
import {
  getDetailReview,
  myLikeReview,
  removeReview,
} from '../../../modules/api/detailReviwApi';
import Comment from './Comment';
import { CenterLine } from './EditCommentInput';

export default function DetailInfoCard() {
  const token = Cookies.get('accessJWTToken');
  const params = useParams();
  const reviewId = params.id;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  //리뷰 삭제
  const deleteMustation = useMutation(removeReview, {
    onSuccess: (data) => {
      return data;
    },
    onError: () => {
      return;
    },
  });

  //리뷰 삭제 핸들러
  const deleteReviewHandler = (reviewId) => {
    const confirmText = window.confirm('정말로 삭제하시겠습니까?');
    if (confirmText) {
      deleteMustation.mutate({ reviewId, token });
      navigate('/');
    } else {
      return;
    }
  };

  const { isLoading, isError, data } = useQuery('getDetailReview', () =>
    getDetailReview({ token, reviewId })
  );

  const detailData = data?.data;
  const commentCnt = data?.data.commentCount;
  const isOwned = data?.data.owned;
  const isLiked = data?.data.liked;

  //좋아요 뮤테이션

  const likeCharMutation = useMutation(myLikeReview, {
    onSuccess: () => {
      queryClient.invalidateQueries('getDetailReview');
    },
    onError: () => {
      return;
    },
  });

  //좋아요 버튼 핸들러
  const likeChartBtnHandler = (reviewId) => {
    likeCharMutation.mutate({ token, reviewId });
  };

  const editReviewHandler = () => {
    navigate(`/edit-review/${reviewId}`);
  };

  if (isError) return;

  // 가격 1000단위 "," 표시
  const formattedPrice = detailData?.price.toLocaleString();

  return (
    <>
      {isLoading && <Spiner />}
      {detailData && (
        <DetailReviewContainer>
          <DetailReviewImageLabel>
            <DetailInfoImg src={detailData.imageUrl} alt="" />
          </DetailReviewImageLabel>
          <DetailReviewInfoContainer>
            <DetailTitleContainer>
              {/* 게시글 수정 및 삭제 */}
              {isOwned && (
                <ReviewEditAndDelete>
                  <Button
                    commentBtn
                    onClick={() => deleteReviewHandler(reviewId)}
                  >
                    삭제
                  </Button>
                  <CenterLine />
                  <Button commentBtn onClick={editReviewHandler}>
                    수정
                  </Button>
                </ReviewEditAndDelete>
              )}
              <DetailTitleLayout>
                {`[${detailData.market}]`} {detailData.title}
              </DetailTitleLayout>

              <DetailSubTitle>{detailData.description}</DetailSubTitle>
            </DetailTitleContainer>

            <DetailPriceLayout>{formattedPrice} 원</DetailPriceLayout>

            <DetailInfoLayout>
              <DetailInfoMiniBox>판매처</DetailInfoMiniBox>
              <DetailInfoDesc>{detailData.market}</DetailInfoDesc>
            </DetailInfoLayout>
            <DetailInfoLayout>
              <DetailInfoMiniBox>구매 링크</DetailInfoMiniBox>
              <DetailInfoDesc>
                <Link
                  to={detailData.purchaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {detailData.purchaseUrl}
                </Link>
              </DetailInfoDesc>
            </DetailInfoLayout>
            <DetailInfoLayout>
              <DetailInfoMiniBox>상세 리뷰</DetailInfoMiniBox>
              <DetailInfoDesc> {detailData?.content}</DetailInfoDesc>
            </DetailInfoLayout>
            <DetailLikeContainer>
              <Button likeChart onClick={() => likeChartBtnHandler(reviewId)}>
                <DetailLikeButtonSpan
                  className={isLiked === true ? 'liked' : 'unLiked'}
                />
              </Button>
            </DetailLikeContainer>
          </DetailReviewInfoContainer>
        </DetailReviewContainer>
      )}
      {/* 댓글 시작 */}
      <Comment detailData={detailData} comment={commentCnt} />
    </>
  );
}

const DetailReviewContainer = styled.div`
  width: 1050px;
  min-height: 600px;
  margin: auto;
  flex-wrap: wrap;
  margin: 30px 0px 20px 0px;
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const DetailReviewImageLabel = styled.div`
  width: 430px;
  height: 552px;
  margin-right: 20px;
  overflow: hidden;
`;

const DetailReviewInfoContainer = styled.div`
  width: 560px;
  margin-top: 1rem;
`;

const DetailTitleContainer = styled.div`
  width: 560px;
  min-height: 64px;
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

export const DetailSubTitle = styled.div`
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
  padding: 19px 0;
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
  color: rgb(102, 102, 102);
`;

const DetailInfoImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  object-fit: cover;
`;
const DetailLikeContainer = styled.div`
  ${(props) => props.theme.FlexRow};
  justify-content: flex-end;
`;

const DetailLikeButtonSpan = styled.span`
  display: inline-block;
  font-size: 16px;
  font-weight: 500;
  width: 32px;
  height: 32px;
  border: 0;
  vertical-align: top;
  &.liked {
    background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0yNS44MDcgNy44NjNhNS43NzcgNS43NzcgMCAwIDAtOC4xNzIgMEwxNiA5LjQ5N2wtMS42MzUtMS42MzRhNS43NzkgNS43NzkgMCAxIDAtOC4xNzMgOC4xNzJsMS42MzQgMS42MzQgNy40NjYgNy40NjdhMSAxIDAgMCAwIDEuNDE1IDBzMCAwIDAgMGw3LjQ2Ni03LjQ2N2gwbDEuNjM0LTEuNjM0YTUuNzc3IDUuNzc3IDAgMCAwIDAtOC4xNzJ6IiBmaWxsPSIjRkY1QTVBIiBzdHJva2U9IiNGRjVBNUEiIHN0cm9rZS13aWR0aD0iMS42IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K)
      center center no-repeat;
  }
  &.unLiked {
    background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0yNS44MDcgNy44NjNhNS43NzcgNS43NzcgMCAwIDAtOC4xNzIgMEwxNiA5LjQ5N2wtMS42MzUtMS42MzRhNS43NzkgNS43NzkgMCAxIDAtOC4xNzMgOC4xNzJsMS42MzQgMS42MzQgNy40NjYgNy40NjdhMSAxIDAgMCAwIDEuNDE1IDBzMCAwIDAgMGw3LjQ2Ni03LjQ2N2gwbDEuNjM0LTEuNjM0YTUuNzc3IDUuNzc3IDAgMCAwIDAtOC4xNzJ6IiBzdHJva2U9IiM1RjAwODAiIHN0cm9rZS13aWR0aD0iMS42IiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K)
      center center no-repeat;
  }
`;

const ReviewEditAndDelete = styled.div`
  ${(props) => props.theme.FlexRow}
  justify-content: flex-end;
  width: 100%;
`;
