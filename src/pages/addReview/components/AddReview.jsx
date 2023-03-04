import React from 'react';
import styled from 'styled-components';
import { Input, InputLayout, MiniBox } from '../../../components/Input';

import Button from '../../../components/Button';

export default function AddReview() {
  return (
    <>
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
          <InputLayout>
            <MiniBox>상품명</MiniBox>
            <Input type="text" placeholder="상품명을 입력해 주세요" />
          </InputLayout>
          <InputLayout>
            <MiniBox>상품 간단 설명</MiniBox>
            <Input type="text" placeholder="상품을 간단히 설명해 주세요" />
          </InputLayout>
          <InputLayout>
            <MiniBox>가격</MiniBox>
            <Input type="text" placeholder="가격을 입력해 주세요" />
          </InputLayout>
          <InputLayout>
            <MiniBox>판매처</MiniBox>
            <Input type="text" placeholder="판매처를 입력해 주세요" />
          </InputLayout>
          <InputLayout>
            <MiniBox>구매 링크</MiniBox>

            <Input type="text" placeholder="구매 링크를 입력해 주세요" />
          </InputLayout>
          <InputLayout inputLayout>
            <MiniBox inputMiniBox>상세 리뷰</MiniBox>
            <Input
              reviewInput
              type="textarea"
              placeholder="상세 리뷰를 입력해 주세요"
              reveiwInput
            />
          </InputLayout>
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
  margin-right: 20px;
  border: 1px solid rgb(221, 221, 221);
`;

const AddReviewInputContainer = styled.div`
  width: 640px;
  height: 550px;
`;
const AddReviewButtonContainer = styled.div`
  width: 970px;
  height: 56px;
  ${(props) => props.theme.FlexRow}
`;
