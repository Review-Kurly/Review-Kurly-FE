import { api } from './axiosbase';
// import HandleToken from './HandelToken';

// *========== 메인 페이지 조회 ==========*
export const getReviewMainpg = async () => {
  const response = await api.get('/api/reviews/');
  return response.data;
};

// *========== 새로운 리뷰 정렬 조회 ==========*

export const getNewReview = async (sort = '') => {
  const response = await api.get(
    `/api/reviews/new-reviews${sort ? `?sort=${sort}` : ''}`
  );
  return response.data;
};

// *========== 베스트 리뷰 정렬 조회 ==========*

export const getBestReview = async (sort = '') => {
  const response = await api.get(
    `/api/reviews/best-reviews${sort ? `?sort=${sort}` : ''}`
  );
  return response.data;
};

// *========== 좋아요 한 리뷰 조회 ==========*

export const getLikeReview = async (token) => {
  const response = await api.get(`/api/reviews/liked-reviews`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return response.data;
};
