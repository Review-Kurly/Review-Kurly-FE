import React from 'react';
import styled from 'styled-components';
import { Input } from '../../components/Input';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import useInputOnChange from '../../feature/hooks/useInputOnChange';
import { api } from '../../modules/api/api';
import Cookies from 'js-cookie';
import axios from 'axios';

export default function LogIn() {
  const navigate = useNavigate();
  const moveToSignup = () => navigate('/sign-up');

  const [formValues, setFormValues, resetFormValues] = useInputOnChange({
    username: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('api/users/login', formValues);
      const token = response.data.token;

      //토큰 헤더에 저장
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      Cookies.set('token', token, { expires: 7 }); // 7일 동안 유효한 쿠키 저장
      console.log('로그인 성공');
    } catch (error) {
      console.error(error);
      console.log('로그인 실패');
    }
    resetFormValues();
  };

  return (
    <>
      <LogInTitle>로그인</LogInTitle>
      <LogInContainer onSubmit={handleSubmit}>
        <LogInInputLayout>
          <Input
            loginInput
            type="text"
            name="username"
            value={formValues?.username || ''}
            onChange={setFormValues}
            required
            placeholder="아이디를 입력해주세요"
          />{' '}
        </LogInInputLayout>
        <LogInInputLayout>
          <Input
            type="password"
            name="password"
            value={formValues?.password || ''}
            onChange={setFormValues}
            required
            placeholder="비밀번호를 입력해주세요"
          />{' '}
        </LogInInputLayout>
        <LogInInputLayout />
        <Button login>로그인</Button>
        <Button type="button" onClick={moveToSignup} signUp>
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

const LogInContainer = styled.form`
  width: 340px;
  height: 295.95px;
  margin: auto;
`;

const LogInInputLayout = styled.div`
  width: 340px;
  height: 60px;
`;
