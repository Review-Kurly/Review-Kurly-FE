import React from 'react';
import styled from 'styled-components';
//npm install framer-motion
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';

export default function Modal({ isOpen, onClose, children }) {
  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: '-100%', transition: { duration: 0.1 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Backdrop
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <ModalContainer
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </ModalContainer>
        </Backdrop>
      )}
    </AnimatePresence>
  );
}

const Backdrop = styled(motion.div)`
  ${(props) => props.theme.FlexRow};
  position: fixed;
  z-index: 99999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
`;

const ModalContainer = styled(motion.div)`
  background-color: white;
  margin: auto; /* 추가 */
  border-radius: 1rem;
  /* filter: drop-shadow(rgba(0, 0, 0, 0.8) 2px 2px 20px); */
`;

export const CloseContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  border-top: 1px solid rgb(247, 247, 247);
  min-height: 56px;
  padding: ${(props) => props.padding};
  margin-top: 0px;
  align-items: center;
`;

export const ModalMsgContainer = styled.div`
  font-size: 16px;
  padding: 40px 30px;
  text-align: center;
  letter-spacing: -0.5px;
  white-space: pre-line;
  line-height: 21px;
  font-weight: bold;
  min-width: ${(props) => props.width};
  color: #333333;
`;

const CloseButtonContainer = styled.div`
  margin: 1rem;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
// 중복확인 커스텀 모달
export function DuplicateModal(props) {
  return (
    <>
      {/* <Button onClick={props.click}>{props.btnTitle}</Button> */}
      <Modal isOpen={props.isOpen} onClose={props.toggle}>
        <ModalMsgContainer>{props.children}</ModalMsgContainer>
        <CloseContainer>
          <Button onClick={props.onClose} closeModal type="button">
            확인
          </Button>
        </CloseContainer>
      </Modal>
    </>
  );
}

export function CommentModal(props) {
  return (
    <Modal isOpen={props.isOpen}>
      <ModalMsgContainer width={'600px'}>{props.children}</ModalMsgContainer>
      <CloseContainer>
        <CloseButtonContainer>
          <Button onClick={props.onClose} cancel type="button">
            취소
          </Button>
          <Button
            onClick={props.submit}
            addReview
            type="button"
            disabled={props.disabled}
          >
            작성
          </Button>
        </CloseButtonContainer>
      </CloseContainer>
    </Modal>
  );
}
