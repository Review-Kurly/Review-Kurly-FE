import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: !!localStorage.getItem('userInfo'),
  // Local Storage에서 userInfo가 있는 경우에만 isLoggedIn을 true로 설정!
  // 새로고침 후에도 로그인 상태를 유지할 수 있다.
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state) => {
      state.isLoggedIn = true;
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;
