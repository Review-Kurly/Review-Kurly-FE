import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const images = [
  {
    src: 'https://product-image.kurly.com/cdn-cgi/image/quality=85/banner/main/pc/img/fbeaa97b-138f-4944-9c4d-2fce0bdf9d03.jpg',
    alt: '메인 이미지1',
  },
  {
    src: 'https://product-image.kurly.com/cdn-cgi/image/quality=85/banner/main/pc/img/edc9e6db-ee42-47ab-9157-552fce0b3fbc.jpg',
    alt: '메인 이미지2',
  },
  {
    src: 'https://product-image.kurly.com/cdn-cgi/image/quality=85/banner/main/pc/img/9cef1d54-72cc-4f02-b63e-495170a02d5d.jpg',
    alt: '메인 이미지3',
  },
];

export default function HomeSlideImg() {
  return (
    <>
      <HomeImgWrapper>
        <StyledSlider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <img src={image.src} alt={image.alt} />
            </div>
          ))}
        </StyledSlider>
      </HomeImgWrapper>
    </>
  );
}

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

const StyledSlider = styled(Slider)`
  .slick-track,
  .slick-list {
    transform: translate3d(0, 0, 0);
    transition-delay: 10ms;
  }
`;
const HomeImgWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 370px;
`;
