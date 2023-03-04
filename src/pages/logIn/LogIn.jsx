import React from 'react';
import styled from 'styled-components';
import { Input, LoginAlertSpan } from '../../components/Input';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';

export default function LogIn() {
  const navigate = useNavigate();
  const moveToSignup = () => navigate('/sign-up');
  return (
    <>
      <LogInTitle>로그인</LogInTitle>
      <LogInContainer>
        <LogInInputLayout>
          <Input loginInput type="text" placeholder="아이디를 입력해주세요" />{' '}
        </LogInInputLayout>
        <LogInInputLayout>
          <Input loginInput type="text" placeholder="비밀번호를 입력해주세요" />{' '}
        </LogInInputLayout>
        <LogInInputLayout />
        <Button login>로그인</Button>
        <Button onClick={moveToSignup} signUp>
          회원가입
        </Button>
      </LogInContainer>
    </>
  );
}

const LogInTitle = styled.div`
  width: 340px;
  height: 20px;
  font-size: 28px;
  line-height: 35px;
  font-weight: 500;
  text-align: center;
  margin: auto;
  margin-top: 90px;
  margin-bottom: 50px;
`;

const LogInContainer = styled.div`
  width: 340px;
  height: 295.95px;
  margin: auto;
`;

const LogInInputLayout = styled.div`
  width: 340px;
  height: 60px;
`;
