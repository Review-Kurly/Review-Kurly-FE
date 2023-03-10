import React, { useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { Input, InputLayout, MiniBox } from '../../../elements/Input';
import Button from '../../../elements/Button';
//npm i browser-image-compression
import imageCompression from 'browser-image-compression';
import { useQueryClient, useMutation, useQuery } from 'react-query';
import useInputOnChange from '../../../feature/hooks/useInputOnChange';
import Cookies from 'js-cookie';
import Spiner from '../../../elements/Spiner';
import { useNavigate, useParams } from 'react-router-dom';
import uploadImg from '../../../styles/img/uploadImg.svg';
import {
  editReview,
  getDetailReview,
} from '../../../modules/api/detailReviwApi';

export default function EditReview() {
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const token = Cookies.get('accessJWTToken');
  const params = useParams();
  const reviewId = params.id;

  const { isLoading, isError, data } = useQuery('getDetailReview', () =>
    getDetailReview({ token, reviewId })
  );

  const getDetailData = data?.data;

  const [{ description, title, price, market, purchaseUrl }, reviewsOnChange] =
    useInputOnChange({
      title: getDetailData?.title,
      price: getDetailData?.price,
      market: getDetailData?.market,
      purchaseUrl: getDetailData?.purchaseUrl,
      description: getDetailData?.description,
    });

  // textarea 자동 높이 조절
  const ref = useRef(null);
  const [content, setContent] = useState(getDetailData?.content);
  const handleResizeHeight = useCallback((e) => {
    setContent(e.target.value);
    // ref 변수가 null인 경우 함수 종료
    if (ref === null || ref.current === null) return;
    // textarea 요소의 높이를 조절하기 위해 초기 높이값은 '38px'으로 지정
    // textarea 요소의 scrollHeight 값을 이용하여 자동으로 높이 조절
    ref.current.style.height = '38px';
    ref.current.style.height = ref.current.scrollHeight + 'px';
  }, []);

  // 이미지 파일 데이터를 포함하는 FormData 객체 생성
  const [formImage, setFormImage] = useState(new FormData());
  // 데이터 전송 중인지 여부를 나타내는 상태 값
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState({
    imageFile: '',
    viewUrl: '',
  }); // 이미지 파일(imageFile)과 미리보기 이미지(viewUrl) URL을 포함하는 상태 값

  // 이미지 파일 업로드 시 호출
  const onChangeUploadHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // 로딩 상태
    const imageFile = e.target.files[0]; // 파일 선택 창에서 선택한 첫 번째 이미지 파일을 가져옴
    if (!imageFile) {
      //파일이 올라가있는데 취소 누르면 로딩 안뜨게
      setLoading(false);
      return;
    }
    console.log('Before Compression: ', imageFile.size); //압축 전

    const options = {
      maxSizeMB: 1, // 이미지 파일 최대 크기
      maxWidthOrHeight: 1920, // 이미지 파일 최대 폭 또는 높이
      useWebWorker: true, // 웹 워커 사용 여부
    };

    try {
      const compressedFile = await imageCompression(imageFile, options); // 이미지 압축 수행
      const formImg = new FormData(); // FormData 객체 생성
      formImg.append('imageFile', compressedFile); // 압축된 이미지 파일을 FormData 객체에 추가
      setFormImage(formImg); // state 값을 변경하여 FormData 객체를 업데이트
      console.log('After Compression: ', compressedFile.size); //압축 후

      const fileReader = new FileReader(); // FileReader 객체 생성
      console.log(compressedFile);
      fileReader.readAsDataURL(compressedFile); // 압축된 이미지 파일을 읽기 위해 FileReader 객체 사용
      // 미리보기 이미지 URL을 'imageFile' state 값으로 업데이트
      fileReader.onload = () =>
        setImageFile({ viewUrl: String(fileReader.result) });
      setIsEdit(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const editReviews = useMutation(editReview, {
    onSuccess: (data) => {
      navigate(`/detail/${params.id}`);
      queryClient.invalidateQueries('getDetailReview');
    },
    onError: (e) => {
      return e;
    },
  });

  const stringToNumPrice =
    typeof price === 'string' ? Number(price.replace(/,/g, '')) : price;

  const submitEditReviewContent = (event) => {
    event.preventDefault();
    const formData = new FormData(); // FormData 객체 생성 (key:value)
    formData.append('token', token); //해당 key와 value를 FormData에 추가
    formData.append('title', title);
    formData.append('price', stringToNumPrice);
    formData.append('market', market);
    formData.append('purchaseUrl', purchaseUrl);
    formData.append('content', content);
    formData.append('description', description);
    for (const keyValue of formImage) {
      // 압축된 이미지 추가 (이미지 파일의 경로와 함께 저장되어 있는 객체)
      formData.append(keyValue[0], keyValue[1]);
    }

    editReviews.mutate({ token, data: formData, reviewId }); // 리뷰 데이터를 서버로 전송
  };

  //이미지 수정 버튼
  const inputRef = useRef(null);
  const editImgBtnHandler = () => inputRef.current.click();

  const deletePreviewImg = () => {
    setImageFile({ imageFile: '', viewUrl: '' });
    document.querySelector('#inputReviewImg').value = '';
    setIsEdit(true);
  };

  if (isError) return;

  return (
    <>
      {isLoading && <Spiner />}
      {loading && <Spiner />}
      {editReviews.isLoading && <Spiner />}
      <AddReviewTitle>상품 리뷰 수정</AddReviewTitle>
      <AddReviewForm onSubmit={submitEditReviewContent}>
        {/* 이미지 미리보기 label */}
        <AddReviewImageWrapper>
          <AddReviewImageLabel htmlFor="inputReviewImg">
            {getDetailData?.imageUrl &&
              (isEdit ? (
                imageFile.imageFile === '' ? (
                  <UploadInputWrapper>
                    <UploadImgContainer>
                      <UploadImg src={uploadImg} alt="" />
                    </UploadImgContainer>
                    <UploadImgDesc>
                      <label htmlFor="inputReviewImg">
                        이곳을 클릭해 <br />
                        <span>파일을 업로드</span> 하세요.
                      </label>
                    </UploadImgDesc>
                  </UploadInputWrapper>
                ) : (
                  <ImgPreview src={imageFile.viewUrl} alt="" />
                )
              ) : (
                <ImgPreview src={getDetailData?.imageUrl} alt="" />
              ))}
          </AddReviewImageLabel>
          <AddReviewImageBtnWrapper>
            <Button commentCancle type="button" onClick={deletePreviewImg}>
              삭제
            </Button>
            <Button comment type="button" onClick={editImgBtnHandler}>
              이미지 등록
            </Button>
          </AddReviewImageBtnWrapper>
        </AddReviewImageWrapper>

        <input
          ref={inputRef}
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
              placeholder="상품명을 입력해 주세요"
              maxLength={30}
              required
            />
          </InputLayout>
          <InputLayout>
            <MiniBox>상품 간단 설명</MiniBox>
            <Input
              name="description"
              value={description}
              onChange={reviewsOnChange}
              placeholder="상품을 간단히 설명해 주세요"
              maxLength={40}
              required
            />
          </InputLayout>
          <InputLayout>
            <MiniBox>가격</MiniBox>
            <Input
              name="price"
              value={price}
              onChange={reviewsOnChange}
              required
              placeholder="가격을 입력해 주세요"
            />
          </InputLayout>
          <InputLayout>
            <MiniBox>판매처</MiniBox>
            <Input
              name="market"
              value={market}
              onChange={reviewsOnChange}
              required
              placeholder="판매처를 입력해 주세요"
            />
          </InputLayout>
          <InputLayout>
            <MiniBox>구매 링크</MiniBox>

            <Input
              name="purchaseUrl"
              value={purchaseUrl}
              onChange={reviewsOnChange}
              required
              placeholder="구매 링크를 입력해 주세요"
            />
          </InputLayout>
          <InputLayout inputLayout>
            <MiniBox inputMiniBox>상세 리뷰</MiniBox>

            <textarea
              value={content}
              ref={ref}
              style={{ height: '38px' }}
              onChange={handleResizeHeight}
              placeholder="상세 리뷰를 입력해 주세요"
              required
              maxLength="1500"
            />
          </InputLayout>
        </AddReviewInputContainer>
        <AddReviewButtonContainer>
          <Button cancel type="button" onClick={() => navigate(-1)}>
            취소
          </Button>
          <Button addReview type="submit">
            수정하기
          </Button>
        </AddReviewButtonContainer>
      </AddReviewForm>
    </>
  );
}

const AddReviewForm = styled.form`
  ${(props) => props.theme.FlexRow}
  align-items: flex-start;
  max-width: 1050px;
  border-top: 2px solid black;
  min-height: 700px;
  padding: 1rem 0;
  margin: auto;
  flex-wrap: wrap;
`;

const AddReviewTitle = styled.div`
  max-width: 1050px;
  margin: 50px auto 50px auto;
  font-size: 28px;
  ${(props) => props.theme.FlexCol};
`;

const AddReviewImageLabel = styled.label`
  position: relative;
  width: 350px;
  height: 470px;
  border: 1px solid rgb(221, 221, 221);
  border-radius: 1rem;
  overflow: hidden;
`;

const AddReviewInputContainer = styled.div`
  margin-bottom: 2rem;
`;
const AddReviewButtonContainer = styled.div`
  width: 970px;
  height: 56px;
  ${(props) => props.theme.FlexRow}
`;

const ImgPreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const UploadInputWrapper = styled.div`
  ${(props) => props.theme.FlexCol};
  width: 100%;
  height: 100%;
`;

const UploadImgContainer = styled.div`
  margin-bottom: 5px;
  width: 90px;
  height: auto;
`;

const UploadImg = styled.img`
  width: 100%;
  height: 100%;
  padding-bottom: 1rem;
`;

const UploadImgDesc = styled.div`
  ${(props) => props.theme.FlexCol};
  text-align: center;
  label {
    cursor: pointer;
  }
  span {
    color: ${(props) => props.theme.CL.brandColor};
    font-weight: bold;
  }
`;

const AddReviewImageWrapper = styled.div`
  ${(props) => props.theme.FlexCol}
  margin-right: 20px;
`;

const AddReviewImageBtnWrapper = styled.div`
  ${(props) => props.theme.FlexRow}
  margin: 1rem 0;
`;
