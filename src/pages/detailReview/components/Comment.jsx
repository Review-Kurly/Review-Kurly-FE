import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AiFillAlert } from 'react-icons/ai';
import { RiErrorWarningFill } from 'react-icons/ri';
import styled from 'styled-components';
import {
  getDetailComment,
  postDetailComment,
} from '../../../modules/api/detailReviwApi';
import Cookies from 'js-cookie';
import { useParams, useNavigate } from 'react-router-dom';
import Spiner from '../../../components/Spiner';
import { CommentModal } from '../../../components/Modal';
import { useModalState } from '../../../feature/hooks/useModalState';
import Button from '../../../components/Button';
import isLogin from '../../../modules/util/isLogin';
import AlertModal from '../../logIn/components/AlertModal';

export default function Comment({ comment, detailData }) {
  const navigate = useNavigate();
  const token = Cookies.get('accessJWTToken');
  const params = useParams();
  const reviewId = params.id;
  const queryClient = useQueryClient();

  //유저 정보 가져옴
  const saveUserInfo = JSON.parse(localStorage.getItem('userInfo'));

  const { isLoading, isError, data } = useQuery('DetailComment', () =>
    getDetailComment({ token, reviewId })
  );
  const commentData = data?.data;

  //날짜 수정 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR');
  };

  //TODO: GET과 POST 리팩터링 해볼 예정
  const addContent = useMutation(
    () => postDetailComment({ token, reviewId, content }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('DetailComment');
      },
    }
  );

  // Textarea 모달 및 로그인 확인
  const [commentModal, toggleModal] = useModalState(false);
  const [content, setContent] = useState('');
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);
  const handleComment = (e) => {
    setContent(e.target.value);
  };
  // Textarea의 placeholder를 보여주고 숨김
  const isDisabled = content.length <= 5;
  const handleFocus = () => setIsPlaceholderVisible(false);
  const handleBlur = () => setIsPlaceholderVisible(content.length === 0);

  const submitComment = () => {
    if (isLogin() === false) {
      handleModalClose();
    } else {
      addContent.mutate(content);
      toggleModal(true);
    }
  };

  const handleModalClose = () => {
    toggleModal(false);
    navigate('/login');
  };

  if (isError) return;

  return (
    <>
      {isLoading && <Spiner />}

      {/* 댓글 작성 모달 */}
      <CommentModalWrapper>
        <RiErrorWarningFill />
        <p>후기에 대한 댓글을 달아보세요.</p>
        <Button comment type="button" onClick={toggleModal}>
          리뷰 댓글달기
        </Button>
        {/* 로그인 유저만 접근 가능 */}
        {isLogin() === true && (
          <CommentModal
            isOpen={commentModal}
            toggle={toggleModal}
            onClose={toggleModal}
            submit={submitComment}
            disabled={isDisabled}
          >
            <RegH1>상품 리뷰 댓글 달기</RegH1>

            <RegImgTitleContainer>
              <RegImg src={detailData?.imageUrl} alt="" />
              <RegReviewTitle>{detailData?.title}</RegReviewTitle>
            </RegImgTitleContainer>
            <RegCommentWrapper>
              <RegCommentContainer>
                <RegCommentSpan>내용</RegCommentSpan>
              </RegCommentContainer>
              <RegTextAreaWrapper>
                <RegTextArea
                  type="text"
                  value={content}
                  onChange={handleComment}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                {isPlaceholderVisible && (
                  <RegTextAreaPlaceholder>
                    <strong>
                      <AiFillAlert />
                      <span>{saveUserInfo.nickname}</span>님! 댓글 등록 전
                      확인해주세요
                    </strong>
                    <ul>
                      <li>댓글은 5자 이상부터 남기실 수 있습니다.</li>
                      <li>상품리뷰에 대한 댓글을 남기는 공간입니다.</li>
                      <li>
                        해당 게시판의 성격과 다른 글은 사전 동의 없이 삭제 될 수
                        있습니다.
                      </li>
                      <li>이미지는 최대 1개 까지만 등록이 가능합니다.</li>
                    </ul>
                  </RegTextAreaPlaceholder>
                )}
              </RegTextAreaWrapper>
            </RegCommentWrapper>
          </CommentModal>
        )}
      </CommentModalWrapper>
      {isLogin() === false && commentModal && (
        <AlertModal onClose={handleModalClose} onClick={handleModalClose}>
          로그인하셔야 본 서비스를 이용하실 수 있습니다.
        </AlertModal>
      )}
      {/* 댓글 시작*/}
      <CommentTopLayout>
        <span>
          {comment !== 0 ? `총 ${comment}개` : '아직 작성된 댓글이 없습니다.'}
        </span>
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
              <CommentTitleBox>{detailData?.title}</CommentTitleBox>
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

//댓글 작성 모달

const CommentModalWrapper = styled.div`
  position: relative;
  ${(props) => props.theme.FlexCol}
  width: 100%;
  padding: 3rem 1rem 5rem;
  gap: 2rem;
  border-top: 2px solid black;
  > svg {
    font-size: 5rem;
    color: #b5b5b5;
  }
  > p {
    font-size: 1.2rem;
    color: #b5b5b5;
  }
`;

const RegH1 = styled.span`
  font-size: 1.5rem;
  display: flex;
  justify-content: space-between;
  padding-bottom: 22px;
  border-bottom: 1px solid rgb(244, 244, 244);
  letter-spacing: -1px;
`;
const RegReviewTitle = styled.span`
  font-size: 16px;
  font-weight: bold;
  line-height: 22px;
  color: rgb(51, 51, 51);
  text-overflow: ellipsis;
  letter-spacing: normal;
`;

const RegImgTitleContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 0px;
  border-bottom: 1px solid rgb(244, 244, 244);
`;

const RegImg = styled.img`
  width: 72px;
  height: 72px;
  object-fit: cover;
  margin-right: 1rem;
  border-radius: 1rem;
  background-color: rgb(250, 250, 250);
  background-position: 50% 50%;
  background-size: cover;
  background-repeat: no-repeat;
`;

const RegCommentWrapper = styled.div`
  display: flex;
  margin-top: 16px;
`;

const RegCommentContainer = styled.div`
  width: 100px;
  display: flex;
`;
const RegCommentSpan = styled.span`
  padding: 5px;
  font-size: 14px;
  font-weight: bold;
  color: rgb(51, 51, 51);
`;

const RegTextAreaWrapper = styled.div`
  position: relative;
  ${(props) => props.theme.FlexCol}
  width: 100%;
  min-height: 260px;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(221, 221, 221);
  border-radius: 4px;
`;

const RegTextArea = styled.textarea`
  font-size: 1rem;
  width: 100%;
  height: 100%;
  padding: 15px 16px;
  line-height: 21px;
  word-break: break-all;
  z-index: 1;
  background: none;
  border-radius: 4px;
  color: rgb(51, 51, 51);
  outline: none;
  resize: none;
  border: none;
`;

const RegTextAreaPlaceholder = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  top: 10px;
  left: 10px;
  margin: 10px;
  color: #959595;
  strong {
    color: #484848;
    vertical-align: middle;
    display: inline-flex;
    > span {
      color: ${(props) => props.theme.CL.brandColor};
      font-weight: bold;
    }
    svg {
      margin-right: 5px;
      color: tomato;
    }
  }
  ul {
    padding-top: 5px;
    list-style-type: none;
    text-align: left;
    font-size: 14px;
    li {
      padding-left: 10px;
      &:before {
        overflow: hidden;
        display: inline-block;
        width: 2px;
        height: 2px;
        border-radius: 50%;
        background: #959595;
        margin: 8px 7px 0px -9px;
        content: '';
        vertical-align: top;
      }
    }
  }
`;
