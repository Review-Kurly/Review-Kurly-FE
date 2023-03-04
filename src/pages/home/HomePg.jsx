import React from 'react';

import HomeSlideImg from './components/HomeSlideImg';
import ReviewCards from './components/ReviewCards';

export default function Home() {
  return (
    <>
      <HomeSlideImg />
      {/* 카드 */}
      <ReviewCards />
    </>
  );
}
