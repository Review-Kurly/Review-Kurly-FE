import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import styled from 'styled-components';
import {
  getDetailComment,
  postDetailComment,
} from '../../../modules/api/detailReviwApi';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import useInputOnChange from '../../../feature/hooks/useInputOnChange';
import Spiner from '../../../components/Spiner';

export default function Comment({ detailTitle }) {
  const token = Cookies.get('accessJWTToken');
  const params = useParams();
  const reviewId = params.id;
  const queryClient = useQueryClient();

  const { isLoading, isError, data } = useQuery('DetailComment', () =>
    getDetailComment({ token, reviewId })
  );

  const commentData = data?.data;

  //날짜 수정 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR');
  };

  const addContent = useMutation(
    () => postDetailComment({ token, reviewId, content }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('DetailComment');
      },
    }
  );

  const [{ content }, handleComment, reset] = useInputOnChange({ content: '' });

  const submitComment = () => {
    addContent.mutate(content);
    reset();
  };

  if (isError) return;

  return (
    <>
      {isLoading && <Spiner />}
      <div>
        <textarea
          name="content"
          type="text"
          value={content}
          onChange={handleComment}
        />
        <button onClick={submitComment}>댓글 작성</button>
      </div>
      <CommentTopLayout>
        <span>총 72,496개</span>
        <div>
          <LikestButton>추천순</LikestButton>
          <LatestButton>최근등록순</LatestButton>
        </div>
      </CommentTopLayout>
      {commentData?.map((item) => {
        return (
          <CommentBox key={item?.id}>
            <CommentNameBox>{item?.nickname}</CommentNameBox>
            <CommentLayout>
              <CommentTitleBox>{detailTitle}</CommentTitleBox>
              <Comments>
                <CommentP>{item?.content}</CommentP>
              </Comments>
              <CommetDate>
                <div>
                  <span>{formatDate(item?.createAt)}</span>
                </div>
                <CommentThanksButton>
                  <CommentGood></CommentGood>
                  <span>도움돼요</span>
                </CommentThanksButton>
              </CommetDate>
            </CommentLayout>
          </CommentBox>
        );
      })}
    </>
  );
}

const CommentBox = styled.div`
  width: 1050px;
  display: flex;
  padding: 30px 0px 19px 20px;
  border-bottom: 1px solid rgb(244, 244, 244);
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  margin: auto;
`;

const CommentTopLayout = styled.div`
  width: 1050px;
  height: 16px;
  font-size: 12px;
  line-height: 16px;
  padding-bottom: 20px;
  margin: auto;
  border-bottom: 2px solid black;

  ${(props) => props.theme.FlexRowBetween}
`;

const CommentNameBox = styled.div`
  width: 230px;
  display: block;
`;

const CommentLayout = styled.div`
  width: 800px;
`;
const CommentTitleBox = styled.div`
  width: 800px;
  box-sizing: border-box;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  gap: 5px;
  height: 19px;
  padding-right: 20px;
  color: rgb(153, 153, 153);
`;

const Comments = styled.div`
  padding-top: 12px;
  word-break: break-word;
  white-space: pre-line;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: rgb(51, 51, 51);
  padding-right: 20px;
`;

const CommentP = styled.p`
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
`;

const CommetDate = styled.div`
  width: 800px;
  height: 51px;
  padding: 19px 20px 0px 0px;
  color: rgb(153, 153, 153);
  ${(props) => props.theme.FlexRowBetween};
`;

const LatestButton = styled.button`
  position: relative;
  font-weight: 400;
  font-size: 12px;
  color: #999;
  overflow: visible;
  background-color: transparent;
  border: none;
  margin-left: 8px;
  margin-right: 8px;
  cursor: pointer;
`;

const LikestButton = styled.button`
  position: relative;
  font-weight: 400;
  font-size: 12px;
  color: #999;
  overflow: visible;
  background-color: transparent;
  border: none;
  margin-left: 8px;
  margin-right: 8px;
  cursor: pointer;
`;

const CommentGood = styled.span`
  width: 15px;
  height: 15px;
  margin-right: 4px;
  background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNCAxNCIgZmlsbD0ibm9uZSIKICAgICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxwYXRoCiAgICBkPSJNNC4wNDgzNyAxMi45OTk4SDIuMjE5MzVDMS41NDU5MiAxMi45OTk4IDEgMTIuNDYyNiAxIDExLjc5OTlWNy41OTk5MkMxIDYuOTM3MTggMS41NDU5MiA2LjM5OTkzIDIuMjE5MzUgNi4zOTk5M0g0LjA0ODM3TTguMzE2MDggNS4xOTk5NVYyLjc5OTk4QzguMzE2MDggMS44MDU4OCA3LjQ5NzIgMSA2LjQ4NzA2IDFMNC4wNDgzNyA2LjM5OTkzVjEyLjk5OTlIMTAuOTI1NUMxMS41MzM1IDEzLjAwNjYgMTIuMDUzNyAxMi41NzE1IDEyLjE0NDggMTEuOTc5OUwxMi45ODYyIDYuNTc5OTNDMTMuMDM5OSA2LjIzMTg1IDEyLjkzNTUgNS44NzgxMiAxMi43MDA4IDUuNjEyNDVDMTIuNDY2IDUuMzQ2NzggMTIuMTI0NiA1LjE5NTk2IDExLjc2NjggNS4xOTk5NUg4LjMxNjA4WiIKICAgIHN0cm9rZT0iIzk5OTk5OSIgc3Ryb2tlLXdpZHRoPSIxLjEiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIKICAgIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==)
    center center no-repeat;
`;

const CommentThanksButton = styled.button`
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  min-width: 88px;
  height: 32px;
  padding: 0px 13px 0px 11px;
  border: 1px solid rgb(226, 226, 226);
  border-radius: 20px;
  font-size: 12px;
  line-height: 20px;
  color: rgb(153, 153, 153);
  overflow: visible;
  background-color: transparent;
  cursor: pointer;
  :hover {
    color: ${(props) => props.theme.CL.brandColor};
  }
`;
