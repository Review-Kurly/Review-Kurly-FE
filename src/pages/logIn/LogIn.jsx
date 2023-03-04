import React from 'react';
import styled from 'styled-components';
import { Input } from '../../components/Input';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import useInputOnChange from '../../feature/hooks/useInputOnChange';
import { postLogin } from '../../modules/api/api';
import { useMutation, useQuery } from 'react-query';

export default function LogIn() {
  const navigate = useNavigate();
  const moveToSignup = () => navigate('/sign-up');

  // const {isLoading, isError, data}=useQuery("login",postLogin)
  const login = useMutation(postLogin, {
    onSuccess: () => {
      navigate('/');
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const [formValues, setFormValues, resetFormValues] = useInputOnChange({
    username: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formValues.username !== '' && formValues.password !== '') {
      login.mutate(formValues);
    }
  };
  console.log(formValues);

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
        {login.error?.response.data.data.errorMessage}
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
