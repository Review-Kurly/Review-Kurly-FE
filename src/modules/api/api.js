import { api } from './axiosbase';
// import HandleToken from './HandelToken';
import axios from 'axios';
import Cookies from 'js-cookie';

export const postRegister = async (data) => {
  const response = await api.post('api/users/signup', data);
  alert(response.data.message);
  console.log(response);
};

// export const postLogin = async (data) => {
//   try {
//     const response = await api.post('api/users/login', data);

//     localStorage.setItem(
//       'userInfo',
//       JSON.stringify({
//         id: `${response.data.data.id}`,
//         username: `${response.data.data.username}`,
//       })
//     );
//     HandleToken(response.headers.authorization);
//   } catch (e) {
//     console.log(e);
//   }
// };

export const postLogin = async (data) => {
  console.log('data', data);

  const response = await api.post('api/users/login', data);
  console.log(response.data.data);

  const token = response.data.token;

  const userInfo = response.data.data;

  //세션 스토리지에 유저 정보 저장
  sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
  console.log(sessionStorage.getItem('userInfo'));

  //토큰 헤더에 저장
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  Cookies.set('token', token, { expires: 7 }); // 7일 동안 유효한 쿠키 저장
  console.log('로그인 성공');
};
