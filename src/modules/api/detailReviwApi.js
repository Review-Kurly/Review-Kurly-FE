import { api } from './axiosbase';

// *========== 상세 페이지 조회 ==========*
export const getDetailReview = async ({ token, reviewId }) => {
  const response = await api.get(`/api/reviews-details/${reviewId}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return response.data;
};

// *========== 상세 페이지 댓글 조회 ==========*

export const getDetailComment = async ({ token, reviewId }) => {
  const response = await api.get(`/api/comments/${reviewId}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return response.data;
};

// *========== 상세 페이지 등록 ==========*
export const addReview = async ({ token, data }) => {
  const response = await api.post(`/api/reviews-details/`, data, {
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// *========== 상세 페이지 수정 ==========*
export const editReview = async ({ token, data, reviewId }) => {
  const response = await api.put(`/api/reviews-details/${reviewId}`, data, {
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// *========== 상세 페이지 삭제 ==========*
export const removeReview = async ({ token, reviewId }) => {
  const response = await api.delete(`/api/reviews-details/${reviewId}`, {
    headers: {
      Authorization: `${token}`,
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
  const response = await api.delete(`/api/comments/${commentId}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return response.data;
};

// *========== 상세 페이지 댓글 수정 ==========*

export const editDetailComment = async ({ token, commentId, content }) => {
  const response = await api.put(
    `/api/comments/${commentId}`,
    { content },
    {
      headers: {
        Authorization: `${token}`,
      },
    }
  );
  return response.data;
};

// *========== 상세 페이지 댓글 좋아요 ==========*
export const commentLike = async ({ token, reviewId, commentId }) => {
  const response = await api.post(
    `/api/comments/likes/${reviewId}/${commentId}`,
    {},
    {
      headers: {
        Authorization: `${token}`,
      },
    }
  );
  return response.data;
};

// *========== 상세 페이지 좋아요 체크 ==========*
export const myLikeReview = async ({ token, reviewId }) => {
  console.log('reviewId', reviewId);
  const response = await api.post(
    `/api/reviews-details/likes/${reviewId}`,
    {},
    {
      headers: {
        Authorization: `${token}`,
      },
    }
  );
  return response.data;
};
