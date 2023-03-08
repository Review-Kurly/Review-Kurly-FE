import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import isLogin from '../../modules/util/isLogin';
import AlertModal from '../logIn/components/AlertModal';
import AddReview from './components/AddReview';

function AddReviewPg() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isLogin() === false) {
      setIsModalOpen(true);
    }
  }, []);

  const handleModalClose = () => {
    setIsModalOpen(false);
    navigate('/login');
  };

  return (
    <>
      {isLogin() && <AddReview />}
      {isModalOpen && (
        <AlertModal onClose={handleModalClose} onClick={handleModalClose}>
          로그인하셔야 본 서비스를 이용하실 수 있습니다.
        </AlertModal>
      )}
    </>
  );
}

export default AddReviewPg;
