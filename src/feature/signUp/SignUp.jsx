import React from 'react';
import styled from 'styled-components';
import { InputLayout, Input, MiniBox } from '../../common/Input';
import Button from '../../common/Button';

export default function SignUp() {
  return (
    <>
      <SignUpTitleLayout>회원가입</SignUpTitleLayout>
      <SignUpNeedsBox>
        <RedPoint>*</RedPoint> 필수입력사항
      </SignUpNeedsBox>
      <SingUpLayout>
        <InputLayout>
          <MiniBox>
            아이디<RedPoint>*</RedPoint>
          </MiniBox>
          <Input singupInput type="text" placeholder="아이디를 입력해주세요" />
          <SignUpSideBox>
            <Button overlap>중복확인</Button>
          </SignUpSideBox>
        </InputLayout>
        <InputLayout>
          <MiniBox>
            닉네임<RedPoint>*</RedPoint>
          </MiniBox>
          <Input
            singupInput
            type="text"
            placeholder="비밀번호를 입력해주세요"
          />
          <SignUpSideBox>
            <Button overlap>중복확인</Button>
          </SignUpSideBox>
        </InputLayout>
        <InputLayout>
          <MiniBox>
            이메일<RedPoint>*</RedPoint>
          </MiniBox>
          <Input singupInput type="text" placeholder="닉네임을 입력해주세요" />
          <SignUpSideBox>
            <Button overlap>중복확인</Button>
          </SignUpSideBox>
        </InputLayout>
        <InputLayout>
          <MiniBox>
            비밀번호<RedPoint>*</RedPoint>
          </MiniBox>
          <Input
            singupInput
            type="text"
            placeholder="비밀번호를 입력해주세요"
          />
          <SignUpSideBox />
        </InputLayout>
        <InputLayout>
          <MiniBox>
            비밀번호확인<RedPoint>*</RedPoint>
          </MiniBox>
          <Input
            singupInput
            type="text"
            placeholder="비밀번호를 한번 더 입력해주세요"
          />
          <SignUpSideBox />
        </InputLayout>
      </SingUpLayout>
      <SignUpButtonLayout>
        <Button addReview>가입하기</Button>
      </SignUpButtonLayout>
    </>
  );
}

const SignUpTitleLayout = styled.div`
  width: 640px;
  height: 35px;
  font-size: 28px;
  line-height: 35px;
  font-weight: 500;
  text-align: center;
  margin: 50px auto 50px auto;
`;

const SignUpNeedsBox = styled.div`
  width: 640px;
  height: 28.6px;
  padding-bottom: 10px;
  border-bottom: 2px solid rgb(51, 51, 51);
  font-size: 12px;
  color: rgb(102, 102, 102);
  line-height: 17px;
  text-align: right;
  margin: auto;
`;

const SingUpLayout = styled.div`
  width: 640px;
  height: 340px;
  margin: auto;
  margin-bottom: 30px;
`;

const RedPoint = styled.span`
  color: rgb(238, 106, 123);
`;

const SignUpSideBox = styled.div`
  width: 120px;
  height: 48px;
  margin-left: 8px;
`;

const SignUpButtonLayout = styled.div`
  width: 240px;
  margin: auto;
`;
