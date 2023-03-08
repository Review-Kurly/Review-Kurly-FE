import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import Button from '../../../elements/Button';
import {
  commentLike,
  editDetailComment,
} from '../../../modules/api/detailReviwApi';
import Cookies from 'js-cookie';
import useAutoHeight from '../../../feature/hooks/useAutoHeight';
import { useParams } from 'react-router-dom';

export default function EditCommentInput(props) {
  //댓글 수정 토글
  const [display, setDisplay] = useState(false);
  const token = Cookies.get('accessJWTToken');
  const queryClient = useQueryClient();
  const params = useParams();
  const reviewId = params.id;

  const editCommentHandler = () => {
    setDisplay(!display);
  };

  const editContent = useMutation(editDetailComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('DetailComment');
    },
  });

  // 댓글 좋아요

  // 댓글 좋아요
  const commentLikes = useMutation(commentLike, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('DetailComment');
      return data;
    },
    onError: (error) => error,
  });

  const likedMutate = (commentId) => {
    commentLikes.mutate({ token, commentId, reviewId });
  };

  const likedBtnHandler = (e) => {
    e.preventDefault();
    likedMutate(props.id);
    queryClient.invalidateQueries('DetailComment');
  };

  const isLiked = commentLikes.data?.data.liked;
  const likeCount = commentLikes.data?.data.likeCount;

  console.log('isLiked ---->', isLiked, 'likeCount--->', likeCount);

  //input 높이 자동 조절 훅
  const { ref, content, setContent, handleResizeHeight } = useAutoHeight(
    props.content
  );

  const editComment = (commentId) => {
    if (content !== '') {
      editContent.mutate({
        token,
        commentId,
        content: content,
      });
      setContent('');
      setDisplay(!display);
    }
  };

  return (
    <CommentBox>
      <CommentNameBox>{props.nickname}</CommentNameBox>
      <CommentLayout>
        <CommentTitleBox>
          {`[${props.market}]`} {props.title}
          {props.owned === true && (
            <CommentBtnLayout>
              <Button commentBtn onClick={props.delete}>
                삭제
              </Button>
              <CenterLine />
              <Button commentBtn onClick={editCommentHandler}>
                수정
              </Button>
            </CommentBtnLayout>
          )}
        </CommentTitleBox>
        <Comments>
          {display === false && <CommentP>{props.content}</CommentP>}

          {/* 수정 박스 */}
          <EditCommnetInputContainer isShow={display}>
            <CommentEditTextArea
              type="text"
              ref={ref}
              value={content}
              onChange={handleResizeHeight}
            />
            <CommentBtnLayout>
              <Button commentBtn onClick={editCommentHandler}>
                취소
              </Button>
              <CenterLine />
              <Button commentBtn onClick={() => editComment(props.edit)}>
                수정완료
              </Button>
            </CommentBtnLayout>
          </EditCommnetInputContainer>
        </Comments>
        <CommetDate>
          <div>
            <span>{props.date}</span>
          </div>

          <CommentThanksButton
            onClick={likedBtnHandler}
            className={props.isLiked === true ? 'liked' : ''}
          >
            <CommentGood
              className={props.isLiked === true ? 'liked' : 'unLiked'}
            />
            <CommentCount>
              도움돼요
              <div className={props.likeCount === 0 ? 'none' : ''}>
                {props.likeCount === 0 ? '' : props.likeCount}
              </div>
            </CommentCount>
          </CommentThanksButton>
        </CommetDate>
      </CommentLayout>
    </CommentBox>
  );
}

export const CommentBtnLayout = styled.div`
  ${(props) => props.theme.FlexRow}
`;

export const CenterLine = styled.div`
  width: 0.0625rem;
  height: 0.8125rem;
  margin: 0rem 0.3125rem;
  background-color: rgb(217, 217, 217);
`;

const CommentBox = styled.div`
  width: 65.625rem;
  display: flex;
  padding: 1.875rem 0rem 1.1875rem 1.25rem;
  border-bottom: 0.0625rem solid rgb(244, 244, 244);
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.1875rem;
  margin: auto;
`;

const CommentNameBox = styled.div`
  width: 14.375rem;
  display: block;
`;

const CommentLayout = styled.div`
  width: 50rem;
`;
const CommentTitleBox = styled.div`
  width: 50rem;
  box-sizing: border-box;
  -webkit-box-align: center;
  gap: 0.3125rem;
  height: 1.1875rem;
  padding-right: 1.25rem;
  color: rgb(153, 153, 153);
  ${(props) => props.theme.FlexRowBetween}
`;

const Comments = styled.div`
  padding-top: 0.75rem;
  word-break: break-word;
  white-space: pre-line;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.1875rem;
  color: rgb(51, 51, 51);
  padding-right: 1.25rem;
`;

const CommentP = styled.p`
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0rem;
  margin-inline-end: 0rem;
`;

const CommetDate = styled.div`
  width: 50rem;
  height: 3.1875rem;
  padding: 1.1875rem 1.25rem 0rem 0rem;
  color: rgb(153, 153, 153);
  ${(props) => props.theme.FlexRowBetween};
`;

const CommentGood = styled.span`
  width: 0.9375rem;
  height: 0.9375rem;
  margin-right: 0.25rem;
  &.liked {
    background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNCAxNCIgZmlsbD0ibm9uZSIKICAgICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxwYXRoCiAgICBkPSJNNC4wNDgzNyAxMi45OTk4SDIuMjE5MzVDMS41NDU5MiAxMi45OTk4IDEgMTIuNDYyNiAxIDExLjc5OTlWNy41OTk5MkMxIDYuOTM3MTggMS41NDU5MiA2LjM5OTkzIDIuMjE5MzUgNi4zOTk5M0g0LjA0ODM3TTguMzE2MDggNS4xOTk5NVYyLjc5OTk4QzguMzE2MDggMS44MDU4OCA3LjQ5NzIgMSA2LjQ4NzA2IDFMNC4wNDgzNyA2LjM5OTkzVjEyLjk5OTlIMTAuOTI1NUMxMS41MzM1IDEzLjAwNjYgMTIuMDUzNyAxMi41NzE1IDEyLjE0NDggMTEuOTc5OUwxMi45ODYyIDYuNTc5OTNDMTMuMDM5OSA2LjIzMTg1IDEyLjkzNTUgNS44NzgxMiAxMi43MDA4IDUuNjEyNDVDMTIuNDY2IDUuMzQ2NzggMTIuMTI0NiA1LjE5NTk2IDExLjc2NjggNS4xOTk5NUg4LjMxNjA4WiIKICAgIHN0cm9rZT0iIzVmMDA4MCIgc3Ryb2tlLXdpZHRoPSIxLjEiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIKICAgIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==)
      center center no-repeat;
  }
  &.unLiked {
    background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNCAxNCIgZmlsbD0ibm9uZSIKICAgICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxwYXRoCiAgICBkPSJNNC4wNDgzNyAxMi45OTk4SDIuMjE5MzVDMS41NDU5MiAxMi45OTk4IDEgMTIuNDYyNiAxIDExLjc5OTlWNy41OTk5MkMxIDYuOTM3MTggMS41NDU5MiA2LjM5OTkzIDIuMjE5MzUgNi4zOTk5M0g0LjA0ODM3TTguMzE2MDggNS4xOTk5NVYyLjc5OTk4QzguMzE2MDggMS44MDU4OCA3LjQ5NzIgMSA2LjQ4NzA2IDFMNC4wNDgzNyA2LjM5OTkzVjEyLjk5OTlIMTAuOTI1NUMxMS41MzM1IDEzLjAwNjYgMTIuMDUzNyAxMi41NzE1IDEyLjE0NDggMTEuOTc5OUwxMi45ODYyIDYuNTc5OTNDMTMuMDM5OSA2LjIzMTg1IDEyLjkzNTUgNS44NzgxMiAxMi43MDA4IDUuNjEyNDVDMTIuNDY2IDUuMzQ2NzggMTIuMTI0NiA1LjE5NTk2IDExLjc2NjggNS4xOTk5NUg4LjMxNjA4WiIKICAgIHN0cm9rZT0iIzk5OTk5OSIgc3Ryb2tlLXdpZHRoPSIxLjEiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIKICAgIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==)
      center center no-repeat;
  }
`;

const CommentCount = styled.div`
  display: flex;
  > div {
    padding: 0 0.2rem;
    &.none {
      padding: 0;
    }
  }
`;

const CommentThanksButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 5.5rem;
  height: 2rem;
  padding: 0rem 0.8125rem 0rem 0.6875rem;
  border: 0.0625rem solid rgb(226, 226, 226);
  border-radius: 1.25rem;
  font-size: 0.75rem;
  line-height: 1.25rem;
  color: rgb(153, 153, 153);
  overflow: visible;
  background-color: transparent;
  cursor: pointer;
  &.liked {
    color: ${(props) => props.theme.CL.brandColor};
  }
`;

const EditCommnetInputContainer = styled.div`
  display: ${(props) => (props.isShow === true ? 'block' : 'none')};
`;

const CommentEditTextArea = styled.textarea`
  font-size: 0.875rem;
  width: 100%;
  min-height: 6.25rem;
  overflow-y: hidden;
  padding: 0.9375rem 1rem;
  line-height: 1.3125rem;
  word-break: break-all;
  z-index: 1;
  background: none;
  border-radius: 0.25rem;
  color: rgb(51, 51, 51);
  outline: none;
  resize: none;
  border: 0.0625rem solid rgb(226, 226, 226);
`;
