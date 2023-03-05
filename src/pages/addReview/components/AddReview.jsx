import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, InputLayout, MiniBox } from '../../../components/Input';
import Button from '../../../components/Button';
//npm i browser-image-compression
import imageCompression from 'browser-image-compression';
import { useMutation } from 'react-query';
import useInputOnChange from '../../../feature/hooks/useInputOnChange';
import Cookies from 'js-cookie';
import { addReview } from '../../../modules/api/api';
import Spiner from '../../../components/Spiner';

export default function AddReview() {
  const [{ id, title, price, market, purchaseUrl, content }, reviewsOnChange] =
    useInputOnChange({
      title: '',
      price: '',
      market: '',
      purchaseUrl: '',
      content: '',
      id: '',
    });

  //imagePreview --> 업로드한 이미지를 미리보기
  const [imagePreview, setImagePreview] = useState('');
  // formImage --> FormData() 객체로, 이미지를 서버에 전송
  const [formImage, setFormImage] = useState(new FormData());
  const token = Cookies.get('accessJWTToken');

  const onChangeUploadHandler = async (e) => {
    e.preventDefault();
    const imageFile = e.target.files[0];
    console.log('Before Compression: ', imageFile.size);
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      const formImg = new FormData();
      formImg.append('imageUrl', compressedFile);
      setFormImage(formImg);

      console.log('After Compression: ', compressedFile.size);

      const fileReader = new FileReader();
      fileReader.readAsDataURL(compressedFile);

      fileReader.onload = () => {
        setImagePreview(String(fileReader.result));
      };
    } catch (error) {
      console.log(error);
    }
  };

  const postReviews = useMutation(addReview, {
    onSuccess: (data) => {
      console.log('addreview data --->', data);
    },
    onError: (e) => {
      console.log('addReview Error --->', e);
    },
  });

  const submitReviewContent = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('token', token);
    formData.append('title', title);
    formData.append('price', price);
    formData.append('market', market);
    formData.append('purchaseUrl', purchaseUrl);
    formData.append('content', content);
    formData.append('id', id);
    for (const keyValue of formImage) {
      formData.append(keyValue[0], keyValue[1]);
    }

    for (let value of formData) {
      console.log(value);
    }

    postReviews.mutate({ token, data: formData });
  };

  return (
    <>
      {postReviews.isLoading && <Spiner />}
      <AddReviewTitle>상품 리뷰 등록</AddReviewTitle>
      <AddReviewForm onSubmit={submitReviewContent}>
        <AddReviewImageLabel htmlFor="inputReviewImg">
          <img src={imagePreview} alt="" />
        </AddReviewImageLabel>
        <input
          id="inputReviewImg"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={onChangeUploadHandler}
        ></input>

        <AddReviewInputContainer>
          <InputLayout>
            <MiniBox>상품명</MiniBox>
            <Input
              name="title"
              value={title}
              onChange={reviewsOnChange}
              type="text"
              placeholder="상품명을 입력해 주세요"
            />
          </InputLayout>
          <InputLayout>
            <MiniBox>상품 간단 설명</MiniBox>
            <Input
              // value={reviews.content}
              // onChange={reviewsOnchange}
              type="text"
              placeholder="상품을 간단히 설명해 주세요"
            />
          </InputLayout>
          <InputLayout>
            <MiniBox>가격</MiniBox>
            <Input
              name="price"
              value={price}
              onChange={reviewsOnChange}
              type="text"
              placeholder="가격을 입력해 주세요"
            />
          </InputLayout>
          <InputLayout>
            <MiniBox>판매처</MiniBox>
            <Input
              name="market"
              value={market}
              onChange={reviewsOnChange}
              type="text"
              placeholder="판매처를 입력해 주세요"
            />
          </InputLayout>
          <InputLayout>
            <MiniBox>구매 링크</MiniBox>

            <Input
              name="purchaseUrl"
              value={purchaseUrl}
              onChange={reviewsOnChange}
              type="text"
              placeholder="구매 링크를 입력해 주세요"
            />
          </InputLayout>
          <InputLayout inputLayout>
            <MiniBox inputMiniBox>상세 리뷰</MiniBox>
            <Input
              name="content"
              value={content}
              onChange={reviewsOnChange}
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
      </AddReviewForm>
    </>
  );
}

const AddReviewForm = styled.form`
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
