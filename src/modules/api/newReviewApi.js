import { api } from './axiosbase';

export const getNewReview = async (token, sort = '') => {
  const response = await api.get(
    `/api/reviews/new-reviews${sort ? `?sort=${sort}` : ''}`,
    {
      headers: {
        Authorization: `${token}`,
      },
    }
  );
  return response.data;
};
