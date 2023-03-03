import React from 'react';
import styled from 'styled-components';
import {
  Input,
  AddReviewInputLayout,
  AddReviewMiniBox,
} from '../../common/Input';
import Button from '../../common/Button';

export default function AddReview() {
  const item = [
    {
      id: 1,
      imageUrl: 'string',
      title: 'string',
      price: 0,
      place: 'string',
      purchaseUrl: 'string',
      userReview: 'string',
      likeCount: 0,
    },
    {
      id: 2,
      imageUrl: 'string',
      title: 'string',
      price: 0,
      place: 'string',
      purchaseUrl: 'string',
      userReview: 'string',
      likeCount: 0,
    },
    {
      id: 3,
      imageUrl: 'string',
      title: 'string',
      price: 0,
      place: 'string',
      purchaseUrl: 'string',
      userReview: 'string',
      likeCount: 0,
    },
  ];

  return (
    <>
      {item.map((item) => {
        console.log(item);
      })}
      <AddReviewTitle>상품 리뷰 등록</AddReviewTitle>
      <AddReviewContainer>
        <AddReviewImageLabel htmlFor="inputReviewImg">
          이미지
        </AddReviewImageLabel>
        <input
          id="inputReviewImg"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={() => {}}
        ></input>

        <AddReviewInputContainer>
          <AddReviewInputLayout>
            <AddReviewMiniBox>상품명</AddReviewMiniBox>
            <Input type="text" placeholder="상품명을 입력해 주세요" />
          </AddReviewInputLayout>
          <AddReviewInputLayout>
            <AddReviewMiniBox>상품 간단 설명</AddReviewMiniBox>
            <Input type="text" placeholder="상품을 간단히 설명해 주세요" />
          </AddReviewInputLayout>
          <AddReviewInputLayout>
            <AddReviewMiniBox>가격</AddReviewMiniBox>
            <Input type="text" placeholder="가격을 입력해 주세요" />
          </AddReviewInputLayout>
          <AddReviewInputLayout>
            <AddReviewMiniBox>판매처</AddReviewMiniBox>
            <Input type="text" placeholder="판매처를 입력해 주세요" />
          </AddReviewInputLayout>
          <AddReviewInputLayout>
            <AddReviewMiniBox>구매 링크</AddReviewMiniBox>

            <Input type="text" placeholder="구매 링크를 입력해 주세요" />
          </AddReviewInputLayout>
          <AddReviewInputLayout inputLayout>
            <AddReviewMiniBox inputMiniBox>상세 리뷰</AddReviewMiniBox>
            <Input
              reviewInput
              type="textarea"
              placeholder="상세 리뷰를 입력해 주세요"
              reveiwInput
            />
          </AddReviewInputLayout>
        </AddReviewInputContainer>
        <AddReviewButtonContainer>
          <Button cancel>취소</Button>
          <Button addReview>등록하기</Button>
        </AddReviewButtonContainer>
      </AddReviewContainer>
    </>
  );
}

const AddReviewContainer = styled.div`
  max-width: 1050px;
  border-top: 2px solid black;
  min-height: 700px;
  margin: auto;
  flex-wrap: wrap;

  ${(props) => props.theme.FlexRow}
`;

const AddReviewTitle = styled.div`
  max-width: 1050px;
  margin: 50px auto 50px auto;
  font-size: 28px;
  ${(props) => props.theme.FlexCol};
`;

const AddReviewImageLabel = styled.label`
  width: 350px;
  height: 470px;
  border: 1px solid black;
  margin-right: 20px;
  border: 1px solid rgb(221, 221, 221);
`;

const AddReviewInputContainer = styled.div`
  width: 600px;
  height: 550px;
`;
const AddReviewButtonContainer = styled.div`
  width: 970px;
  height: 56px;
  ${(props) => props.theme.FlexRow}
`;
