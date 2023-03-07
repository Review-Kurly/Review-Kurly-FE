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
      {isLogin() === true && <AddReview />}
      {isModalOpen && (
        <AlertModal onClose={handleModalClose}>
          <h2>로그인이 필요합니다</h2>
          <p>이 기능을 이용하시려면 로그인이 필요합니다.</p>
          <button onClick={handleModalClose}>확인</button>
        </AlertModal>
      )}
    </>
  );
}

export default AddReviewPg;
