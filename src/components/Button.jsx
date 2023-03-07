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
    props.closeModal &&
    css`
      width: 100%;
      height: 100%;
      color: ${(props) => props.theme.CL.brandColor};
      padding: 0px;
      font-weight: 900;
    `}

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
      background: ${(props) =>
        props.disabled ? '#1d1d1d4e' : props.theme.CL.brandColor};
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
      padding: 0;
      margin: 0;
      text-align: center;
      overflow: hidden;
      width: 122px;
      height: 44px;
      color: ${(props) =>
        props.disabled ? '#dddddd' : props.theme.CL.brandColor};
      border: 1px solid
        ${(props) => (props.disabled ? '#dddddd' : props.theme.CL.brandColor)};
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

    ${(props) =>
    props.sort &&
    css`
      margin-left: 8px;
      font-size: 14px;
      color: rgb(153, 153, 153);
      &.active {
        color: #000;
        font-weight: bold;
      }
    `}

    ${(props) =>
    props.likeChart &&
    css`
      padding: 0px 10px;
      text-align: center;
      width: 56px;
      height: 56px;
      color: rgb(51, 51, 51);
      background-color: rgb(255, 255, 255);
      border: 1px solid rgb(221, 221, 221);

      &:hover,
      &:focus {
        span {
          background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0yNS44MDcgNy44NjNhNS43NzcgNS43NzcgMCAwIDAtOC4xNzIgMEwxNiA5LjQ5N2wtMS42MzUtMS42MzRhNS43NzkgNS43NzkgMCAxIDAtOC4xNzMgOC4xNzJsMS42MzQgMS42MzQgNy40NjYgNy40NjdhMSAxIDAgMCAwIDEuNDE1IDBzMCAwIDAgMGw3LjQ2Ni03LjQ2N2gwbDEuNjM0LTEuNjM0YTUuNzc3IDUuNzc3IDAgMCAwIDAtOC4xNzJ6IiBmaWxsPSIjRkY1QTVBIiBzdHJva2U9IiNGRjVBNUEiIHN0cm9rZS13aWR0aD0iMS42IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K);
        }
      }
    `}

  & {
    cursor: pointer;
  }

  &:active,
  &:hover {
    opacity: 0.9;
  }
`;
