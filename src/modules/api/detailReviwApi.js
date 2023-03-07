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

  console.log(response);
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
