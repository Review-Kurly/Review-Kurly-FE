import React from 'react';
import styled from 'styled-components';
import Input from '../../common/Input';

function AddReview() {
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
          <AddReviewInputLayout>
            <AddReviewMiniBox>상품명</AddReviewMiniBox>
            <Input />
          </AddReviewInputLayout>
          <AddReviewInputLayout>
            <AddReviewMiniBox>상품 간단 설명</AddReviewMiniBox>
            <Input />
          </AddReviewInputLayout>
          <AddReviewInputLayout>
            <AddReviewMiniBox>가격</AddReviewMiniBox>
            <Input />
          </AddReviewInputLayout>
          <AddReviewInputLayout>
            <AddReviewMiniBox>판매처</AddReviewMiniBox>
            <Input />
          </AddReviewInputLayout>
          <AddReviewInputLayout>
            <AddReviewMiniBox>구매 링크</AddReviewMiniBox>
            <Input />
          </AddReviewInputLayout>
        </AddReviewInputContainer>
        <AddReviewButtonContainer>버튼</AddReviewButtonContainer>
      </AddReviewContainer>
    </>
  );
}

export default AddReview;

const AddReviewContainer = styled.div`
  max-width: 1050px;
  border: 1px solid black;
  border-top: 2px solid black;
  height: 720px;
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
  height: 470px;

  border: 1px solid black;
`;

const AddReviewInputLayout = styled.div`
  width: 600px;
  height: 68px;
  padding: 10px 20px;
  /* border: 1px solid black; */
  ${(props) => props.theme.FlexRow}
`;

const AddReviewMiniBox = styled.div`
  width: 139px;
  height: 48px;
  padding: 12px 0px 0px;
  font-weight: 500;
  line-height: 20px;
  /* border: 1px solid black; */
`;

const AddReviewButtonContainer = styled.div`
  width: 970px;
  height: 56px;
  border: 1px solid black;
`;
