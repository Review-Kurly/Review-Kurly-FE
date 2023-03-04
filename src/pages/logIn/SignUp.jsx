import React from 'react';
import styled from 'styled-components';
import {
  InputLayout,
  Input,
  MiniBox,
  LoginAlertSpan,
} from '../../components/Input';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import useLoginInput from '../../feature/hooks/useLoginInput';

export default function SignUp() {
  const navigate = useNavigate();
  const moveToLogin = () => navigate('/login');

  const idRegex = /^(?=.*?[0-9])(?=.*?[a-z]).{6,16}$/;
  const [inputId, inputIdHandler, alertId, checkIdRegex] = useLoginInput(
    '',
    '',
    '6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합',
    '',
    idRegex
  );

  const userNameReg = /^[a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ0-9]{2,}$/;
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

  const pwRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{5,}$/;
  const [inputPw, inputPwHandler, alertPw, checkPwRegex] = useLoginInput(
    '',
    '',
    '최소 5자리 이상 입력',
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
          <RegexCheckContainer>
            <Input
              value={inputId}
              onChange={inputIdHandler}
              singupInput
              type="text"
              placeholder="아이디를 입력해주세요"
            />
            <LoginAlertSpan isCurrent={checkIdRegex}>{alertId}</LoginAlertSpan>
          </RegexCheckContainer>
          <SignUpSideBox>
            <Button overlap type="button">
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
            <LoginAlertSpan isCurrent={checkNickNameRegex}>
              {alertNickName}
            </LoginAlertSpan>
          </RegexCheckContainer>
          <SignUpSideBox>
            <Button overlap type="button">
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
            <LoginAlertSpan isCurrent={checkEmailRegx}>
              {alertEmail}
            </LoginAlertSpan>
          </RegexCheckContainer>
          <SignUpSideBox>
            <Button overlap type="button">
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
          <Button onSubmit={moveToLogin} addReview>
            가입하기
          </Button>
        </SignUpButtonLayout>
      </SingUpLayout>
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

const SingUpLayout = styled.form`
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