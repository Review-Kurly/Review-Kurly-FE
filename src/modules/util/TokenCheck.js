import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const TokenCheck = () => {
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
};

export default TokenCheck;

// 사용 방법
// import TokenCheck from '../modules/util/TokenCheck';
// TokenCheck();
