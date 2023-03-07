import React from 'react';
import styled from 'styled-components';
//npm install framer-motion
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../../components/Button';
import { CloseContainer, DuplicateModalMsg } from '../../../components/Modal';

export default function AlertModal({ onClose, children, onClick }) {
  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: '-100%' },
  };

  return (
    <AnimatePresence>
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
          <DuplicateModalMsg>{children}</DuplicateModalMsg>
          <CloseContainer>
            <Button onClick={onClick} closeModal>
              확인
            </Button>
          </CloseContainer>
        </ModalContainer>
      </Backdrop>
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
