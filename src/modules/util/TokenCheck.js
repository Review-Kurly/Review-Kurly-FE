import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { CustomModal } from '../../elements/Modal';
import { useModalState } from '../../feature/hooks/useModalState';
import isLogin from '../util/isLogin';

export default function TokenCheck() {
  const navigate = useNavigate();
  const location = useLocation();
  const getToken = Cookies.get('accessJWTToken');

  //로그인 페이지와 회원가입 페이지에서는 해당 훅이 발동하지 않도록
  const isLoginPage = location.pathname === '/login';
  const isSignupPage = location.pathname === '/sign-up';

  useEffect(() => {
    if (!isLoginPage && !isSignupPage && !getToken) {
      alert('로그인 시간이 만료되었습니다. 다시 로그인 해주세요');
      navigate('/');
    }
  }, [isLoginPage, isSignupPage, getToken, navigate]);

  return null;
}
// 사용 방법
// import TokenCheck from '../modules/util/TokenCheck';
// TokenCheck();

// 토큰이 없으면 접근을 못하게 (작성페이지, 마이페이지)

export function AccessToken() {
  const [modalAlert, toggleModal] = useModalState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin() === true) {
      toggleModal(true);
    }
  }, [toggleModal]);

  if (isLogin()) {
    return navigate('/');
  }

  return (
    <CustomModal isOpen={modalAlert} toggle={toggleModal}>
      로그인이 필요합니다!.
    </CustomModal>
  );
}

// 사용 방법
// import AccessToken from '../modules/util/AccessToken';
// import Modal from '../../elements/Modal';
