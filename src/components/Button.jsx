import React from 'react';
import styled, { css } from 'styled-components';

export default function Button(props) {
  return <ButtonWrapper {...props}>{props.children}</ButtonWrapper>;
}
Button.defaultProps = {
  padding: '.5rem',
  margin: '.2rem',
  borderR: '.5rem',
  border: 'none',
  bg: 'transparent',
  ts: '.2s ease',
  onClick: () => {},
};

const ButtonWrapper = styled.button`
  ${(props) => props.theme.FlexRow};
  width: ${(props) => props.w};
  height: ${(props) => props.h};
  font-size: ${(props) => props.size};

  //기본 값
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  border-radius: ${(props) => props.borderR};
  border: ${(props) => props.border};
  background-color: ${(props) => props.bg};
  transition: ${(props) => props.ts};
  color: ${(props) => props.color};
  pointer-events: ${(props) => (props.disabled ? 'none' : 'pointer')};

  ${(props) =>
    props.addAndHeart &&
    css`
      margin-right: 10px;
      width: 35px;
      height: 35px;
      font-size: 1.5rem;
      padding: 0;
    `}

  ${(props) =>
    props.search &&
    css`
      position: relative;
      width: 30px;
      height: 30px;
      margin: 10px;
      padding: 0;
      color: ${(props) => props.theme.CL.brandColor};
    `}

    ${(props) =>
    props.addReview &&
    css`
      padding: 0rem 0.625rem;
      font-size: 16px;
      width: 15rem;
      height: 3.5rem;
      text-align: center;
      color: white;
      background-color: ${(props) => props.theme.CL.brandColor};
    `}


${(props) =>
    props.cancel &&
    css`
      padding: 0rem 0.625rem;
      font-size: 16px;
      width: 15rem;
      height: 3.5rem;
      text-align: center;
      color: ${(props) => props.theme.CL.brandColor};
      border: 1px solid ${(props) => props.theme.CL.brandColor};
      background-color: white;
      margin-right: 20px;
    `}


    ${(props) =>
    props.overlap &&
    css`
      font-size: 14px;
      display: block;
      padding: 0px 10px;
      text-align: center;
      overflow: hidden;
      width: 122px;
      height: 44px;
      color: ${(props) => props.theme.CL.brandColor};
      border: 1px solid ${(props) => props.theme.CL.brandColor};
      background-color: white;
      border-radius: 3px;
    `}


    ${(props) =>
    props.login &&
    css`
      margin: 0px;
      margin-bottom: 6px;
      padding: 0rem 0.625rem;
      font-size: 16px;
      width: 340px;
      height: 54px;
      text-align: center;
      color: white;
      font-weight: 500;
      border-radius: 3px;
      background-color: ${(props) => props.theme.CL.brandColor};
    `}


    ${(props) =>
    props.signUp &&
    css`
      margin: 0px;
      padding: 0rem 0.625rem;
      font-size: 16px;
      width: 340px;
      height: 54px;
      text-align: center;
      font-weight: 500;
      border-radius: 3px;
      color: ${(props) => props.theme.CL.brandColor};
      border: 1px solid ${(props) => props.theme.CL.brandColor};
      background-color: white;
    `}


      

  & {
    cursor: pointer;
  }

  &:active,
  &:hover {
    opacity: 0.9;
  }
`;
