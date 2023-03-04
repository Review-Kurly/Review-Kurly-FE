import { api } from './axiosbase';
// import HandleToken from './HandelToken';
import Cookies from 'js-cookie';

export const postRegister = async (data) => {
  const response = await api.post('api/users/signup', data);
  alert(response.data.message);
  console.log(response);
};

export const postLogin = async (data) => {
  console.log('data', data);

  const response = await api.post('api/users/login', data);
  console.log(response.data.data);
  const { token } = response.data;
  const Token = response.headers.authorization;
  const userInfo = response.data.data;

  console.log('token --->', token);
  //세션 스토리지에 유저 정보 저장
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
  console.log('localStroage---->', localStorage.getItem('userInfo'));
  // 토큰 만료 시간
  const expiryDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
  Cookies.set('accessJWTToken', Token, { expires: expiryDate });
  console.log('로그인 성공');
};
