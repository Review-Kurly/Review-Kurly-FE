import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import {
  CardBoxTitle,
  HomeCardBoxWrapper,
} from '../../pages/home/components/ReviewCards';
import DetailCards from './DetailCards';
import { getNewReview } from '../../modules/api/api';
import Cookies from 'js-cookie';
import Spiner from '../../components/Spiner';

export default function DetailContainer() {
  const token = Cookies.get('accessJWTToken');
  const { isLoading, isError, data } = useQuery('getNewReview', () =>
    getNewReview(token)
  );
  const newData = data?.data;

  return (
    <>
      {isLoading && <Spiner />}
      <HomeCardBoxWrapper>
        <CardBoxTitle>{newData?.title}</CardBoxTitle>
        <CardBoxContatainer>
          {newData?.map((item) => (
            <DetailCards key={item.id} item={item} />
          ))}
        </CardBoxContatainer>
      </HomeCardBoxWrapper>
    </>
  );
}

const CardBoxContatainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 249px);
  gap: 31px 18px;
  width: 100%;
`;
