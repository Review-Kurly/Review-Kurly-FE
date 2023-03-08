import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../../elements/Button';

export default function EditCommentInput(props) {
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
              <Button commentBtn onClick={props.click}>
                수정
              </Button>
            </CommentBtnLayout>
          )}
        </CommentTitleBox>
        <Comments>
          <CommentP>{props.content}</CommentP>
          {/* 수정 박스 */}
          <EditCommnetInputContainer isShow={props.isShow}>
            <CommentEditTextArea
              type="text"
              name="editInputContent"
              value={props.value}
              onChange={props.change}
            />
            <CommentBtnLayout>
              <Button commentBtn onClick={props.cancel}>
                취소
              </Button>
              <CenterLine />
              <Button commentBtn onClick={props.edit}>
                수정완료
              </Button>
            </CommentBtnLayout>
          </EditCommnetInputContainer>
        </Comments>
        <CommetDate>
          <div>
            <span>{props.date}</span>
          </div>
          <CommentThanksButton>
            <CommentGood></CommentGood>
            <span>도움돼요</span>
          </CommentThanksButton>
        </CommetDate>
      </CommentLayout>
    </CommentBox>
  );
}

const CommentBtnLayout = styled.div`
  ${(props) => props.theme.FlexRow}
`;

const CenterLine = styled.div`
  width: 1px;
  height: 13px;
  margin: 0px 5px;
  background-color: rgb(217, 217, 217);
`;

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
  -webkit-box-align: center;
  gap: 5px;
  height: 19px;
  padding-right: 20px;
  color: rgb(153, 153, 153);
  ${(props) => props.theme.FlexRowBetween}
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

const EditCommnetInputContainer = styled.div`
  display: ${(props) => (props.isShow === true ? 'block' : 'none')};
`;

const CommentEditTextArea = styled.textarea`
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
  border: 1px solid rgb(226, 226, 226);
`;
