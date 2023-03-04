// 인자로 전달받은 token 값을 access_token 이름의 쿠키로 설정
// access_token이라는 이름으로 쿠키를 설정하고, 그 값을 전달받은 token으로 설정
const HandleToken = (token) => {
  document.cookie = `access_token=${token}; path=/`;
};

export default HandleToken;
