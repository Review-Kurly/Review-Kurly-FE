import React from 'react';
import styled from 'styled-components';
//npm install framer-motion
import { motion, AnimatePresence } from 'framer-motion';

export default function Modal({ isOpen, onClose, children }) {
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
            <CloseButton onClick={onClose}>x</CloseButton>
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
  background-color: #1b1b1be2;
  backdrop-filter: blur(2px);
`;

const ModalContainer = styled(motion.div)`
  background-color: white;
  margin: auto; /* 추가 */
  padding: 2.25rem;
  border-radius: 1rem;
  filter: drop-shadow(rgba(0, 0, 0, 0.8) 2px 2px 20px);
`;

const CloseButton = styled.span`
  position: absolute;
  top: 0;
  right: 10px;
  font-size: 1.5rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: 0.3s ease all;
  &:hover {
    opacity: 0.8;
  }
`;
