import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import {
  InputLayout,
  Input,
  MiniBox,
  LoginAlertSpan,
} from '../../components/Input';
import { postRegister } from '../../modules/api/api';
import { useDuplicateCheck } from '../../feature/hooks/useCheckDuplicate';
import { useModalState } from '../../feature/hooks/useModalState';
import Button from '../../components/Button';
import useLoginInput from '../../feature/hooks/useLoginInput';
import isLogin from '../../modules/util/isLogin';
import Spiner from '../../components/Spiner';
import { CustomModal } from '../../components/Modal';

export default function SignUp() {
  const navigate = useNavigate();

  // 중복 체크 모달
  const [modalId, toggleModalId] = useModalState(false);
  const [modalNick, toggleModalNick] = useModalState(false);
  const [modalEmail, toggleModalEmail] = useModalState(false);

  // 중복체크 확인 여부를 위한 state
  const [isIdValid, setIsIdValid] = useState(false);
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  // 중복 체크 훅
  const { checkDuplicateId, checkDuplicateNickname, checkDuplicateEmail } =
    useDuplicateCheck();

  // 아이디 중복 체크
  const duplicateIdMsg = checkDuplicateId.data?.data.unique;
  const checkUserId = (e) => {
    e.preventDefault();
    if (inputId) {
      checkDuplicateId.mutate(inputId);
      toggleModalId(); // 모달창
      setIsIdValid(true); // 아이디 중복 확인
    }
  };

  // 닉네임 중복 체크
  const duplicateNicknameMsg = checkDuplicateNickname.data?.data.unique;
  const checkUserNickname = (e) => {
    e.preventDefault();
    if (inputNickName) {
      checkDuplicateNickname.mutate(inputNickName);
      toggleModalNick(); // 모달창
      setIsNicknameValid(true); // 닉네임 중복 확인
    }
  };

  // 이메일 중복 체크
  const duplicateEmailMsg = checkDuplicateEmail.data?.data.unique;
  const checkUserEmail = (e) => {
    e.preventDefault();
    if (inputEmail) {
      checkDuplicateEmail.mutate(inputEmail);
      toggleModalEmail(); // 모달창
      setIsEmailValid(true); // 이메일 중복 확인
    }
  };

  //토큰이 존재한다면 홈으로 리다이렉트
  useEffect(() => {
    if (isLogin() === true) navigate('/');
  });

  const idRegex = /^(?=.*?[0-9])(?=.*?[a-z]).{6,16}$/;
  const [inputId, inputIdHandler, alertId, checkIdRegex] = useLoginInput(
    '',
    '',
    '6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합',
    '',
    idRegex
  );

  const userNameReg = /^[a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ0-9]{2,10}$/;
  const [
    inputNickName,
    inputNickNameHandler,
    alertNickName,
    checkNickNameRegex,
  ] = useLoginInput(
    '',
    '',
    '특수문자를 제외한, 2글자 이상의 닉네임을 입력해주세요.',
    '',
    userNameReg
  );

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const [inputEmail, inputEmailHandler, alertEmail, checkEmailRegx] =
    useLoginInput('', '', '이메일 형식으로 입력해주세요.', '', emailRegex);

  const pwRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
  const [inputPw, inputPwHandler, alertPw, checkPwRegex] = useLoginInput(
    '',
    '',
    '영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합',
    '사용 가능한 비밀번호 입니다.',
    pwRegex
  );

  const [inputCheckPw, , alertCheckPw, doubleCheckPwRegex, checkSame] =
    useLoginInput(
      '',
      '',
      '비밀번호가 같지 않습니다. 다시 입력해주세요.',
      '비밀번호가 같습니다.',
      pwRegex,
      inputPw
    );

  const signUpHandler = async (e) => {
    e.preventDefault();
    if (
      checkIdRegex &&
      checkPwRegex &&
      doubleCheckPwRegex &&
      checkNickNameRegex &&
      checkEmailRegx &&
      isIdValid &&
      isNicknameValid &&
      isEmailValid
    ) {
      const userInfo = {
        username: inputId,
        password: inputPw,
        email: inputEmail,
        nickname: inputNickName,
      };
      signup.mutate(userInfo);
    }
  };

  const signup = useMutation(postRegister, {
    onSuccess: () => {
      navigate('/login');
    },
    onError: (e) => {
      console.log(e);
    },
  });

  return (
    <>
      {signup.isLoading && <Spiner />}
      <SignUpTitleLayout>회원가입</SignUpTitleLayout>
      <SignUpNeedsBox>
        <RedPoint>*</RedPoint> 필수입력사항
      </SignUpNeedsBox>
      <SingUpForm onSubmit={signUpHandler}>
        <InputLayout>
          <MiniBox>
            아이디<RedPoint>*</RedPoint>
          </MiniBox>
          <RegexCheckContainer>
            <Input
              value={inputId}
              onChange={inputIdHandler}
              singupInput
              type="text"
              placeholder="아이디를 입력해주세요"
            />

            {duplicateIdMsg === false ? (
              <LoginAlertSpan>중복된 아이디 입니다</LoginAlertSpan>
            ) : (
              <LoginAlertSpan isCurrent={checkIdRegex}>
                {alertId}
              </LoginAlertSpan>
            )}

            {/* 아이디 중복 모달 */}
            <CustomModal isOpen={modalId} toggle={toggleModalId}>
              {duplicateIdMsg === false
                ? '중복된 아이디 입니다!'
                : '사용할 수 있는 아이디 입니다.'}
            </CustomModal>
          </RegexCheckContainer>
          <SignUpSideBox>
            <Button
              overlap
              type="button"
              onClick={checkUserId}
              disabled={!checkIdRegex}
            >
              중복확인
            </Button>
          </SignUpSideBox>
        </InputLayout>

        <InputLayout>
          <MiniBox>
            닉네임<RedPoint>*</RedPoint>
          </MiniBox>
          <RegexCheckContainer>
            <Input
              value={inputNickName}
              onChange={inputNickNameHandler}
              singupInput
              type="text"
              placeholder="닉네임을 입력해주세요"
            />
            {duplicateNicknameMsg === false ? (
              <LoginAlertSpan>중복된 닉네임 입니다</LoginAlertSpan>
            ) : (
              <LoginAlertSpan isCurrent={checkNickNameRegex}>
                {alertNickName}
              </LoginAlertSpan>
            )}
            {/* 닉네임 중복 모달 */}
            <CustomModal isOpen={modalNick} toggle={toggleModalNick}>
              {duplicateNicknameMsg === false
                ? '중복된 닉네임 입니다!'
                : '사용할 수 있는 닉네임 입니다.'}
            </CustomModal>
          </RegexCheckContainer>
          <SignUpSideBox>
            <Button
              overlap
              type="button"
              onClick={checkUserNickname}
              disabled={!checkNickNameRegex}
            >
              중복확인
            </Button>
          </SignUpSideBox>
        </InputLayout>
        <InputLayout>
          <MiniBox>
            이메일<RedPoint>*</RedPoint>
          </MiniBox>
          <RegexCheckContainer>
            <Input
              value={inputEmail}
              onChange={inputEmailHandler}
              singupInput
              type="text"
              placeholder="이메일을 입력해주세요"
            />
            {duplicateEmailMsg === false ? (
              <LoginAlertSpan>중복된 이메일 입니다</LoginAlertSpan>
            ) : (
              <LoginAlertSpan isCurrent={checkEmailRegx}>
                {alertEmail}
              </LoginAlertSpan>
            )}
            {/* 이메일 중복 모달 */}
            <CustomModal isOpen={modalEmail} toggle={toggleModalEmail}>
              {duplicateEmailMsg === false
                ? '중복된 이메일 입니다!'
                : '사용할 수 있는 이메일 입니다.'}
            </CustomModal>
          </RegexCheckContainer>
          <SignUpSideBox>
            <Button
              overlap
              type="button"
              onClick={checkUserEmail}
              disabled={!checkEmailRegx}
            >
              중복확인
            </Button>
          </SignUpSideBox>
        </InputLayout>
        <InputLayout>
          <MiniBox>
            비밀번호<RedPoint>*</RedPoint>
          </MiniBox>
          <RegexCheckContainer>
            <Input
              value={inputPw}
              onChange={inputPwHandler}
              singupInput
              type="password"
              placeholder="비밀번호를 입력해주세요"
            />
            <LoginAlertSpan isCurrent={checkPwRegex}>{alertPw}</LoginAlertSpan>
          </RegexCheckContainer>
          <SignUpSideBox />
        </InputLayout>
        <InputLayout>
          <MiniBox>
            비밀번호확인<RedPoint>*</RedPoint>
          </MiniBox>
          <RegexCheckContainer>
            <Input
              value={inputCheckPw}
              onChange={checkSame}
              singupInput
              type="password"
              placeholder="비밀번호를 한번 더 입력해주세요"
            />
            <LoginAlertSpan isCurrent={doubleCheckPwRegex}>
              {alertCheckPw}
            </LoginAlertSpan>
          </RegexCheckContainer>
          <SignUpSideBox />
        </InputLayout>
        <SignUpButtonLayout>
          <Button
            addReview
            disabled={
              !(
                checkIdRegex &&
                checkPwRegex &&
                checkEmailRegx &&
                doubleCheckPwRegex &&
                checkNickNameRegex &&
                isIdValid &&
                isNicknameValid &&
                isEmailValid
              ) ||
              !duplicateIdMsg ||
              !duplicateNicknameMsg ||
              !duplicateEmailMsg
            }
          >
            가입하기
          </Button>
        </SignUpButtonLayout>
      </SingUpForm>
    </>
  );
}
const RegexCheckContainer = styled.div`
  ${(props) => props.theme.FlexCol}
`;

//
const SignUpTitleLayout = styled.div`
  width: 640px;
  min-height: 35px;
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

const SingUpForm = styled.form`
  width: 640px;
  min-height: 340px;
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
