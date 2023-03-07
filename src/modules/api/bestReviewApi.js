import { api } from './axiosbase';

export const getBestReview = async (token, sort = '') => {
  const response = await api.get(
    `/api/reviews/best-reviews${sort ? `?sort=${sort}` : ''}`,
    {
      headers: {
        Authorization: `${token}`,
      },
    }
  );
  return response.data;
};
