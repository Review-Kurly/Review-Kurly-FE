import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AiFillAlert } from 'react-icons/ai';
import { RiErrorWarningFill } from 'react-icons/ri';
import styled from 'styled-components';
import {
  deleteDetailComment,
  editDetailComment,
  getDetailComment,
  postDetailComment,
} from '../../../modules/api/detailReviwApi';
import Cookies from 'js-cookie';
import { useParams, useNavigate } from 'react-router-dom';
import Spiner from '../../../elements/Spiner';
import { CommentModal } from '../../../elements/Modal';
import { useModalState } from '../../../feature/hooks/useModalState';
import Button from '../../../elements/Button';
import isLogin from '../../../modules/util/isLogin';
import AlertModal from '../../logIn/components/AlertModal';
import useInputOnChange from '../../../feature/hooks/useInputOnChange';
import EditCommentInput from './EditCommentInput';

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

  const editContent = useMutation(editDetailComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('DetailComment');
    },
  });

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
      setContent('');
    }
  };

  const handleModalClose = () => {
    toggleModal(false);
    navigate('/login');
  };

  const deleteContent = useMutation(deleteDetailComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('DetailComment');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  //댓글 삭제 핸들러
  const deleteComment = (commentId) => {
    deleteContent.mutate({ token, commentId });
  };

  //댓글 수정 핸들러
  const [display, setDisplay] = useState(false);
  const editCommentHandler = () => {
    setDisplay(!display);
  };

  const [editInputContent, editInputContentHandler] = useInputOnChange();
  const newContent = editInputContent?.editInputContent;
  const editComment = (commentId) => {
    if (newContent !== '') {
      editContent.mutate({
        token,
        commentId,
        content: newContent,
      });
      setDisplay(!display);
    }
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
              <RegReviewTitle>
                {`[${detailData?.market}]`} {detailData?.title}
                <RegReviewDesc>{detailData?.description}</RegReviewDesc>
              </RegReviewTitle>
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
                      <span>{saveUserInfo?.nickname}</span>님! 댓글 등록 전
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
        <CommentBtnLayout>
          <Button commentBtn>추천순</Button>
          <CenterLine />
          <Button commentBtn>최근등록순</Button>
        </CommentBtnLayout>
      </CommentTopLayout>
      {commentData &&
        commentData.map((item) => {
          return (
            <EditCommentInput
              key={item.id}
              nickname={item.nickname}
              market={detailData?.market}
              title={detailData?.title}
              delete={() => deleteComment(item.id)}
              content={item.content}
              value={editInputContent?.value}
              change={editInputContentHandler}
              date={formatDate(item.createAt)}
              owned={item.owned}
              click={editCommentHandler}
              isShow={display}
              edit={() => editComment(item.id)}
              cancel={editCommentHandler}
            />
          );
        })}
    </>
  );
}

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

const CommentBtnLayout = styled.div`
  ${(props) => props.theme.FlexRow}
`;

const CenterLine = styled.div`
  width: 1px;
  height: 13px;
  margin: 0px 5px;
  background-color: rgb(217, 217, 217);
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
const RegReviewTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  line-height: 22px;
  color: rgb(51, 51, 51);
  text-overflow: ellipsis;
  text-align: left;
  letter-spacing: normal;
`;
const RegReviewDesc = styled.p`
  padding-top: 5px;
  font-size: 14px;
  font-weight: 400;
  color: rgb(181, 181, 181);
  line-height: 19px;
  letter-spacing: -0.5px;
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
