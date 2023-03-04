import { api } from './axiosbase';
// import HandleToken from './HandelToken';

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
