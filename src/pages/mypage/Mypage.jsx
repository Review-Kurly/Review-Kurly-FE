import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaRegCommentAlt } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import AlertModal from '../logIn/components/AlertModal';
import isLogin from '../../modules/util/isLogin';
import Cookies from 'js-cookie';
import { getLikeReview } from '../../modules/api/reviewDataApi';
import Spiner from '../../elements/Spiner';
import {
  CardBoxItems,
  CardBoxItemWrapper,
  CardBoxTitle,
  HomeCardBoxWrapper,
  InfoCommentContainer,
  InfoCommentWrapper,
  InfoPriceContainer,
  InfoTitle,
  ItemsImgContainer,
  ItemsInfoContainer,
} from '../home/components/ReviewCards';

export default function Mypage({ infinite }) {
  const [showNextArrow, setShowNextArrow] = useState(true);
  const [showPrevArrow, setShowPrevArrow] = useState(false);

  const settings = {
    dots: false,
    infinite: infinite,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    rows: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: showPrevArrow ? <Pre></Pre> : null,
    nextArrow: showNextArrow ? <NextTo></NextTo> : null,
    afterChange: (currentSlide) => {
      const totalSlides = getData.length;
      if (currentSlide === 0) {
        setShowPrevArrow(false);
      } else {
        setShowPrevArrow(true);
      }
      if (currentSlide === totalSlides - 4) {
        setShowNextArrow(false);
      } else {
        setShowNextArrow(true);
      }
    },
  };

  const token = Cookies.get('accessJWTToken');

  const { isLoding, isError, data } = useQuery('MyLikeReview', () =>
    getLikeReview(token)
  );

  const getData = data?.data;
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isLogin() === false) {
      setIsModalOpen(true);
    }
  }, []);

  const handleModalClose = () => {
    setIsModalOpen(false);
    navigate('/login');
  };

  if (isError) return;

  return (
    <>
      {isLoding && <Spiner />}
      {isLogin() === true && (
        <>
          <HomeCardBoxWrapper>
            <CardBoxTitle>좋아요 리뷰</CardBoxTitle>
            <CardBoxContatainer>
              <CardBoxItemWrapper>
                <StyledSlider {...settings}>
                  {getData &&
                    getData.map((item) => (
                      <CardBoxItems to={`/detail/${item.id}`} key={item.id}>
                        <ItemsImgContainer>
                          <img src={item.imageUrl} alt="" />
                        </ItemsImgContainer>
                        <ItemsInfoContainer>
                          <InfoTitle>{item.title}</InfoTitle>
                          <InfoPriceContainer>
                            {item.price.toLocaleString()}원
                          </InfoPriceContainer>
                          <InfoCommentWrapper>
                            <InfoCommentContainer>
                              <FaRegCommentAlt />
                            </InfoCommentContainer>
                            <span>
                              후기
                              {item.commentCount >= 5
                                ? ` ${item.commentCount} +`
                                : ` ${item.commentCount}`}
                            </span>
                          </InfoCommentWrapper>
                        </ItemsInfoContainer>
                      </CardBoxItems>
                    ))}
                </StyledSlider>
              </CardBoxItemWrapper>
            </CardBoxContatainer>
          </HomeCardBoxWrapper>
        </>
      )}
      {isModalOpen && (
        <AlertModal onClose={handleModalClose} onClick={handleModalClose}>
          로그인하셔야 본 서비스를 이용하실 수 있습니다.
        </AlertModal>
      )}
    </>
  );
}

const CardBoxContatainer = styled.div`
  ${(props) => props.theme.FlexRow}
  margin-bottom: 27px;
`;

//슬라이드 관련
const StyledSlider = styled(Slider)`
  height: 100%;
  width: 100%;
  position: relative;
  .slick-list {
    margin-right: -20px;
  }

  .slick-slide {
    padding-right: 20px;
  }
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
`;

const SlickBtn = styled.div`
  position: absolute;
  z-index: 100;
  border: 0px;
  outline: 0px;
  width: 60px;
  height: 60px;
  transition: background 0.5s ease 0s;
  top: calc(50% - 50px);
  background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPGRlZnM+CiAgICAgICAgPGZpbHRlciB4PSItMTQlIiB5PSItMTQlIiB3aWR0aD0iMTI4JSIgaGVpZ2h0PSIxMjglIiBmaWx0ZXJVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIGlkPSJhIj4KICAgICAgICAgICAgPGZlT2Zmc2V0IGluPSJTb3VyY2VBbHBoYSIgcmVzdWx0PSJzaGFkb3dPZmZzZXRPdXRlcjEiLz4KICAgICAgICAgICAgPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMiIgaW49InNoYWRvd09mZnNldE91dGVyMSIgcmVzdWx0PSJzaGFkb3dCbHVyT3V0ZXIxIi8+CiAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4wOCAwIiBpbj0ic2hhZG93Qmx1ck91dGVyMSIgcmVzdWx0PSJzaGFkb3dNYXRyaXhPdXRlcjEiLz4KICAgICAgICAgICAgPGZlT2Zmc2V0IGR5PSIxIiBpbj0iU291cmNlQWxwaGEiIHJlc3VsdD0ic2hhZG93T2Zmc2V0T3V0ZXIyIi8+CiAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4wMyAwIiBpbj0ic2hhZG93T2Zmc2V0T3V0ZXIyIiByZXN1bHQ9InNoYWRvd01hdHJpeE91dGVyMiIvPgogICAgICAgICAgICA8ZmVNb3JwaG9sb2d5IHJhZGl1cz0iLjUiIG9wZXJhdG9yPSJkaWxhdGUiIGluPSJTb3VyY2VBbHBoYSIgcmVzdWx0PSJzaGFkb3dTcHJlYWRPdXRlcjMiLz4KICAgICAgICAgICAgPGZlT2Zmc2V0IGluPSJzaGFkb3dTcHJlYWRPdXRlcjMiIHJlc3VsdD0ic2hhZG93T2Zmc2V0T3V0ZXIzIi8+CiAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4wMiAwIiBpbj0ic2hhZG93T2Zmc2V0T3V0ZXIzIiByZXN1bHQ9InNoYWRvd01hdHJpeE91dGVyMyIvPgogICAgICAgICAgICA8ZmVNZXJnZT4KICAgICAgICAgICAgICAgIDxmZU1lcmdlTm9kZSBpbj0ic2hhZG93TWF0cml4T3V0ZXIxIi8+CiAgICAgICAgICAgICAgICA8ZmVNZXJnZU5vZGUgaW49InNoYWRvd01hdHJpeE91dGVyMiIvPgogICAgICAgICAgICAgICAgPGZlTWVyZ2VOb2RlIGluPSJzaGFkb3dNYXRyaXhPdXRlcjMiLz4KICAgICAgICAgICAgPC9mZU1lcmdlPgogICAgICAgIDwvZmlsdGVyPgogICAgICAgIDxjaXJjbGUgaWQ9ImIiIGN4PSIyNSIgY3k9IjI1IiByPSIyNSIvPgogICAgPC9kZWZzPgogICAgPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyB0cmFuc2Zvcm09Im1hdHJpeCgtMSAwIDAgMSA1NSA1KSI+CiAgICAgICAgICAgIDx1c2UgZmlsbD0iIzAwMCIgZmlsdGVyPSJ1cmwoI2EpIiB4bGluazpocmVmPSIjYiIvPgogICAgICAgICAgICA8dXNlIGZpbGw9IiNGRkYiIHhsaW5rOmhyZWY9IiNiIi8+CiAgICAgICAgPC9nPgogICAgICAgIDxwYXRoIGQ9Ik0zMi43MTUgMzguNjk5YTEgMSAwIDAgMS0xLjMxOS4wOThsLS4wOTUtLjA4Mi04LTcuODE3YTEgMSAwIDAgMS0uMTA4LTEuMzA2bC4wOC0uMDk2IDcuNzIzLTguMTgyYTEgMSAwIDAgMSAxLjUzNSAxLjI3NmwtLjA4LjA5Ni03LjA0OSA3LjQ2OSA3LjI5NyA3LjEzYTEgMSAwIDAgMSAuMDk4IDEuMzE5bC0uMDgyLjA5NXoiIGZpbGw9IiMzMzMiIGZpbGwtcnVsZT0ibm9uemVybyIvPgogICAgPC9nPgo8L3N2Zz4K)
    50% 50% no-repeat !important;
`;

const NextTo = styled(SlickBtn.withComponent('div'))`
  right: 0px;
  transform: translate(50%, -50%) rotate(180deg);
`;

const Pre = styled(SlickBtn.withComponent('div'))`
  transition: background 0.5s ease 0s;
  left: 0px;
  transform: translate(-50%, -50%);
`;
