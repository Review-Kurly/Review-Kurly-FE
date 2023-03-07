import { api } from './axiosbase';
// import HandleToken from './HandelToken';
import Cookies from 'js-cookie';

// *========== 회원가입 ==========*
export const postRegister = async (data) => {
  await api.post('api/users/signup', data);
};

// *========== 로그인 ==========*
export const kurlyLogin = async (data) => {
  // console.log('data', data); //로그인 할때 정보 콘솔 확인
  const response = await api.post('api/users/login', data);
  console.log(response.data.data);
  const Token = response.headers.authorization;
  const userInfo = response.data.data;

  //로컬 스토리지에 유저 정보 저장
  api.defaults.headers.common['Authorization'] = Token;

  localStorage.setItem('userInfo', JSON.stringify(userInfo));
  console.log('localStroage---->', localStorage.getItem('userInfo'));
  // 토큰 만료 시간
  const expiryDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
  Cookies.set('accessJWTToken', Token, { expires: expiryDate });
  console.log('로그인 성공');
};

// *========== 상세 페이지 등록 ==========*
export const addReview = async ({ token, data }) => {
  console.log('data--->', data);
  const response = await api.post(`/api/reviews-details/`, data, {
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// *========== 메인 페이지 조회 ==========*
export const getReviewMainpg = async () => {
  const response = await api.get('/api/reviews/');
  return response.data;
};

// *========== 아이디 중복 확인 체크 ==========*
export const duplicateId = async (username) => {
  const response = await api.get(`/api/users/uniqueness/username/${username}`);
  return response.data;
};

// *========== 닉네임 중복 확인 체크 ==========*
export const duplicateNickname = async (nickname) => {
  const response = await api.get(`/api/users/uniqueness/nickname/${nickname}`);
  return response.data;
};

// *========== 아이디 중복 확인 체크 ==========*
export const duplicateEmail = async (email) => {
  const response = await api.get(`/api/users/uniqueness/email/${email}`);
  return response.data;
};

// *========== 상세 페이지 조회 ==========*
export const getDetailReview = async ({ token, reviewId }) => {
  const response = await api.get(`/api/reviews-details/${reviewId}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return response.data;
};
