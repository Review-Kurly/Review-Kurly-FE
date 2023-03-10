import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Input } from '../../elements/Input';
import Button from '../../elements/Button';
import { useNavigate } from 'react-router-dom';
import useInputOnChange from '../../feature/hooks/useInputOnChange';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/authSlice';
import isLogin from '../../modules/util/isLogin';
import Spiner from '../../elements/Spiner';
import { DuplicateModal } from '../../elements/Modal';
import { useModalState } from '../../feature/hooks/useModalState';
import { kurlyLogin } from '../../modules/api/userInfoApi';

export default function LogIn() {
  const navigate = useNavigate();
  const moveToSignup = () => navigate('/sign-up');
  const dispatch = useDispatch();
  const [loginModal, toggleModal] = useModalState(false);

  //토큰이 존재한다면 홈으로 리다이렉트
  useEffect(() => {
    if (isLogin() === true) navigate('/');
  });

  const login = useMutation(kurlyLogin, {
    onSuccess: (data) => {
      dispatch(loginSuccess());
      navigate(-1);
    },
    onError: (e) => {
      return;
    },
  });
  //중복 값에 따른 오류 메시지
  const errorMessage = login.error?.response.data.code;

  const [formValues, setFormValues] = useInputOnChange({
    username: '',
    password: '',
  });

  const isDisabled =
    formValues.username.length <= 2 || formValues.password.length <= 2;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formValues.username !== '' && formValues.password !== '') {
      toggleModal();
      login.mutate(formValues);
    }
  };

  return (
    <>
      {login.isLoading && <Spiner />}

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
          />
        </LogInInputLayout>
        <LogInInputLayout>
          <Input
            type="password"
            name="password"
            value={formValues?.password || ''}
            onChange={setFormValues}
            required
            placeholder="비밀번호를 입력해주세요"
          />
        </LogInInputLayout>
        {errorMessage && (
          <DuplicateModal
            isOpen={loginModal}
            toggle={toggleModal}
            onClose={toggleModal}
          >
            {errorMessage === 401
              ? '패스워드가 일치하지 않습니다.'
              : errorMessage === 400
              ? '회원 정보가 없습니다. 회원가입을 진행해주세요.'
              : ''}
          </DuplicateModal>
        )}

        <LogInInputLayout />
        <Button login disabled={isDisabled}>
          로그인
        </Button>
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
