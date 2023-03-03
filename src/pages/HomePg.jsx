import React from 'react';
import styled from 'styled-components';
import HomeSlideImg from '../feature/components/home/homeSlideImg';
import { FlexRow } from '../styles/theme/Theme';

function Home() {
  return (
    <>
      <HomeSlideImg />

      <HomeCardBoxWrapper>
        <CardBoxConatainer>
          <HomeTitle>이 리뷰 어때요?</HomeTitle>
        </CardBoxConatainer>
      </HomeCardBoxWrapper>
    </>
  );
}

const HomeCardBoxWrapper = styled.div`
  width: 1050px;
  margin: 0px auto;
  padding: 3.5rem 0px;
`;

const CardBoxConatainer = styled.div`
  ${(props) => props.theme.FlexRow}
  margin-bottom: 27px;
`;

const HomeTitle = styled.h1`
  position: relative;
  display: flex;
  padding: 8px 0px 8px 8px;
  font-size: 1.75rem;
  color: rgb(51, 51, 51);
  line-height: 1.15;
  letter-spacing: -0.26px;
  font-weight: bold;
`;

export default Home;
