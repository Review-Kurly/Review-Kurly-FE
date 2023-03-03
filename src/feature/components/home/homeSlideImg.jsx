import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
//npm i react-slick
//npm install slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
function homeSlideImg() {
  return (
    <>
      <HomeImgWrapper>
        <Slider {...settings}>
          <div>
            <img
              src="https://product-image.kurly.com/cdn-cgi/image/quality=85/banner/main/pc/img/fbeaa97b-138f-4944-9c4d-2fce0bdf9d03.jpg"
              alt="메인 이미지"
            />
          </div>
          <div>
            <img
              src="https://product-image.kurly.com/cdn-cgi/image/quality=85/banner/main/pc/img/edc9e6db-ee42-47ab-9157-552fce0b3fbc.jpg"
              alt="image2"
            />
          </div>
          <div>
            <img
              src="https://product-image.kurly.com/cdn-cgi/image/quality=85/banner/main/pc/img/9cef1d54-72cc-4f02-b63e-495170a02d5d.jpg"
              alt="image3"
            />
          </div>
        </Slider>
      </HomeImgWrapper>
    </>
  );
}

//이미지 슬라이드

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true, // 자동 슬라이드 기능 활성화
  autoplaySpeed: 3000, // 자동 슬라이드 시간 설정 (3초)
};

const HomeImgWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 370px;
`;

export default homeSlideImg;
