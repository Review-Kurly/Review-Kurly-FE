import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../modules/api/axiosbase';

// 검색 결과를 가져오는 비동기 액션 생성자
export const getSearchSlice = createAsyncThunk(
  'search/getSearchResult',
  async (search, thunkAPI) => {
    try {
      const response = await api.get(
        `/api/reviews/keyword-reviews?keyword=${search}`
      );
      return response.data; // 비동기 액션 처리 결과로 응답 데이터 반환
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // 비동기 액션 처리 실패 시 오류 메시지 반환
    }
  }
);

// searchSlice 리듀서 생성
const searchSlice = createSlice({
  name: 'search',
  initialState: {
    data: null, // 검색 결과 데이터
    loading: false, // 로딩 중인지 여부
    error: null, // 오류 발생 시 오류 메시지
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSearchSlice.pending, (state) => {
        // 비동기 액션이 실행 중임을 나타냄
        state.loading = true;
        state.error = null;
      })
      .addCase(getSearchSlice.fulfilled, (state, action) => {
        // 비동기 액션이 성공적으로 처리된 경우
        state.loading = false;
        state.data = action.payload; // 검색 결과 데이터를 state에 저장
      })
      .addCase(getSearchSlice.rejected, (state, action) => {
        // 비동기 액션이 실패한 경우
        state.loading = false;
        state.error = action.payload; // 오류 메시지를 state에 저장
      });
  },
});

export default searchSlice.reducer;
