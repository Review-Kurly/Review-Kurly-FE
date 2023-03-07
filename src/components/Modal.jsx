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
            <CloseContainer>
              <Button onClick={onClose} closeModal type="button">
                확인
              </Button>
            </CloseContainer>
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
  height: 56px;
  padding: 0px;
  margin-top: 0px;
`;

export const DuplicateModalMsg = styled.div`
  font-size: 16px;
  padding: 40px 30px;
  text-align: center;
  letter-spacing: -0.5px;
  white-space: pre-line;
  line-height: 21px;
  font-weight: bold;
  color: #333333;
`;

// 커스텀 모달 Children
export function CustomModal(props) {
  return (
    <>
      {/* <Button onClick={props.click}>{props.btnTitle}</Button> */}
      <Modal isOpen={props.isOpen} onClose={props.toggle}>
        <DuplicateModalMsg>{props.children}</DuplicateModalMsg>
      </Modal>
    </>
  );
}
