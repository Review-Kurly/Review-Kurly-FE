import React from 'react';
import styled from 'styled-components';
import { FaRegCommentAlt } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { homeData } from '../../../mock/homeData';

export default function ReviewCards() {
  return (
    <>
      <HomeCardBoxWrapper>
        <CardBoxTitle>이 리뷰 어때요?</CardBoxTitle>
        <CardBoxContatainer>
          <CardBoxItemWrapper>
            <StyledSlider {...settings}>
              {homeData.map((item) => (
                <CardBoxItems key={item.id}>
                  <ItemsImgContainer>
                    <img src={item.imageUrl} alt="" />
                  </ItemsImgContainer>
                  <ItemsInfoContainer>
                    <InfoTitle>{item.title}</InfoTitle>
                    <InfoPriceContainer>{item.price}</InfoPriceContainer>
                    <InfoCommentWrapper>
                      <InfoCommentContainer>
                        <FaRegCommentAlt />
                      </InfoCommentContainer>
                      <span>후기 {item.comment} +</span>
                    </InfoCommentWrapper>
                  </ItemsInfoContainer>
                </CardBoxItems>
              ))}
            </StyledSlider>
          </CardBoxItemWrapper>
        </CardBoxContatainer>
      </HomeCardBoxWrapper>
    </>
  );
}

export const HomeCardBoxWrapper = styled.div`
  width: 1050px;
  margin: 0px auto;
  padding: 3.5rem 0px;
`;

const CardBoxContatainer = styled.div`
  ${(props) => props.theme.FlexRow}
  margin-bottom: 27px;
`;

export const CardBoxTitle = styled.h1`
  ${(props) => props.theme.FlexRow}
  position: relative;
  display: flex;
  padding: 8px 0px 8px 8px;
  font-size: 1.75rem;
  color: rgb(51, 51, 51);
  line-height: 1.15;
  letter-spacing: -0.26px;
  font-weight: bold;
  margin-bottom: 27px;
`;

export const CardBoxItemWrapper = styled.div`
  ${(props) => props.theme.FlexRow}
  align-items: flex-start;
  position: relative;
  width: 1050px;
  margin: 0px auto;
`;

export const CardBoxItems = styled.div`
  flex-direction: column;
  color: rgb(51, 51, 51);
  cursor: pointer;
  width: 249px;
`;

export const ItemsImgContainer = styled.div`
  height: 320px;
  overflow: hidden;
  position: relative;
  background-color: #f5f5f5;
  > img {
    position: static; // position 수정
    width: 100%;
    height: 100%;
    margin: auto;
    object-fit: cover;
    background-color: #f5f5f5;
    transition: all 0.5s ease-in-out 0s;
  }
`;

export const ItemsInfoContainer = styled.div`
  position: relative;
  padding: 14px 10px 0px 0px;
`;

export const InfoTitle = styled.h3`
  font-size: 16px;
  line-height: 1.45;
  font-weight: 400;
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  letter-spacing: normal;
  word-break: break-word;
  overflow-wrap: break-word;
`;

export const InfoPriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const InfoCommentWrapper = styled.div`
  display: flex;
  color: rgb(153, 153, 153);
  padding-top: 8px;
  font-weight: 500;
  font-size: 12px;
  line-height: 17px;
`;
export const InfoCommentContainer = styled.div`
  width: 15px;
  height: 15px;
  margin: 1px 2px 0px 0px;
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

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  autoplay: false, // 자동 슬라이드 기능 활성화
  autoplaySpeed: 3000, // 자동 슬라이드 시간 설정 (3초)
  nextArrow: <NextTo></NextTo>,
  prevArrow: <Pre></Pre>,
};
