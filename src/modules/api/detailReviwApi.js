import { api } from './axiosbase';

// *========== 상세 페이지 조회 ==========*
export const getDetailReview = async ({ token, reviewId }) => {
  const response = await api.get(`/api/reviews-details/${reviewId}`);
  return response.data;
};

// *========== 상세 페이지 댓글 조회 ==========*

export const getDetailComment = async (reviewId) => {
  const response = await api.get(`/api/comments/${reviewId}`);
  return response.data;
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

// *========== 상세 페이지 댓글 추가 ==========*

export const postDetailComment = async ({ token, reviewId, content }) => {
  const response = await api.post(
    `/api/comments/${reviewId}`,
    { content },
    {
      headers: {
        Authorization: `${token}`,
      },
    }
  );
  return response.data;
};

// *========== 상세 페이지 댓글 삭제 ==========*

export const deleteDetailComment = async ({ token, commentId }) => {
  console.log('commentId', commentId);
  const response = await api.delete(`/api/comments/${commentId}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return response.data;
};
