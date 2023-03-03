import React from 'react';
import { FaRegCommentAlt } from 'react-icons/fa';

import {
  CardBoxItems,
  InfoCommentContainer,
  InfoCommentWrapper,
  InfoPriceContainer,
  InfoTitle,
  ItemsImgContainer,
  ItemsInfoContainer,
} from '../home/ReviewCards';

export default function DetailCards(props) {
  return (
    <>
      <CardBoxItems>
        <ItemsImgContainer>
          <img src={props.item.imageUrl} alt="" />
        </ItemsImgContainer>
        <ItemsInfoContainer>
          <InfoTitle>{props.item.title}</InfoTitle>
          <InfoPriceContainer>{props.item.price}</InfoPriceContainer>
          <InfoCommentWrapper>
            <InfoCommentContainer>
              <FaRegCommentAlt />
            </InfoCommentContainer>
            <span>후기 {props.item.comment} +</span>
          </InfoCommentWrapper>
        </ItemsInfoContainer>
      </CardBoxItems>
    </>
  );
}
