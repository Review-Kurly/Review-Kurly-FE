import React from 'react';

import HomeSlideImg from '../feature/components/home/HomeSlideImg';
import ReviewCards from '../feature/components/home/ReviewCards';

export default function Home() {
  return (
    <>
      <HomeSlideImg />
      {/* 카드 */}
      <ReviewCards />
    </>
  );
}
