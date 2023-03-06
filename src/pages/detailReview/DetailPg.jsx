import React from 'react';
import styled from 'styled-components';
import Comment from './components/Comment';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import { useModalState } from '../../feature/hooks/useModalState';
import DetailInfoCard from './components/DetailInfoCard';
import useScrollToTop from '../../feature/hooks/useScrollToTop';

export default function DetailPg() {
  const [modalOne, toggleModalOne] = useModalState(false);
  const [modalTwo, toggleModalTwo] = useModalState(false);
  const [modalThree, toggleModalThree] = useModalState(false);
  // scroll to top 훅
  const topRef = useScrollToTop();
  return (
    <>
      <DetailReviewWrapper ref={topRef}>
        <DetailInfoCard />
        <Comment />
        <div>
          <Button onClick={toggleModalOne}>권구민</Button>
          <Modal isOpen={modalOne} onClose={toggleModalOne}>
            <h1>권구민</h1>
            <p>권구민씨?</p>
          </Modal>
        </div>
        <div>
          <Button onClick={toggleModalTwo}>음지훈</Button>
          <Modal isOpen={modalTwo} onClose={toggleModalTwo}>
            <h1>음지훈</h1>
            <p>음지훈씨?</p>
          </Modal>
        </div>
        <div>
          <Button onClick={toggleModalThree}>이현동</Button>
          <Modal isOpen={modalThree} onClose={toggleModalThree}>
            <h1>이현동</h1>
            <p>이현동씨?</p>
          </Modal>
        </div>
      </DetailReviewWrapper>
    </>
  );
}

const DetailReviewWrapper = styled.div`
  max-width: 1050px;
  border-top: 2px solid black;
  min-height: 700px;
  margin: auto;
  flex-wrap: wrap;
  ${(props) => props.theme.FlexRow}
`;
