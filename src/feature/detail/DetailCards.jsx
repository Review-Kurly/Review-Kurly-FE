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
} from '../../pages/home/components/ReviewCards';

export default function DetailCards(props) {
  const formattedPrice = props.item.price?.toLocaleString();
  return (
    <>
      <CardBoxItems to={`/detail/${props.item.id}`}>
        <ItemsImgContainer>
          <img src={props.item.imageUrl} alt="" />
        </ItemsImgContainer>
        <ItemsInfoContainer>
          <InfoTitle>{props.item.title}</InfoTitle>
          <InfoPriceContainer>{formattedPrice}</InfoPriceContainer>
          <InfoCommentWrapper>
            <InfoCommentContainer>
              <FaRegCommentAlt />
            </InfoCommentContainer>
            <span>
              후기
              {props.item.commentCount >= 5
                ? ` ${props.item.commentCount} +`
                : ` ${props.item.commentCount}`}
            </span>
          </InfoCommentWrapper>
        </ItemsInfoContainer>
      </CardBoxItems>
    </>
  );
}
