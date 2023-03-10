import React from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';

export function Input(props) {
  return <InputWrapper {...props} />;
}

Input.defaultProps = {
  width: '100%',
  height: '46px',
  padding: '0px 11px 1px 15px',
  borderR: '4px',
  border: '1px solid rgb(221, 221, 221)',
  fontWeight: '400',
  fontSize: '16px',
  lineHeight: '1.5',
  color: 'rgb(51, 51, 51)',
  outline: 'none',
  boxSizing: 'border-box',
};

const InputWrapper = styled.input`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  border-radius: ${(props) => props.borderR};
  border: ${(props) => props.border};
  font-weight: ${(props) => props.fontWeight};
  font-size: ${(props) => props.fontSize};
  line-height: ${(props) => props.lineHeight};
  color: ${(props) => props.color};
  outline: ${(props) => props.outline};
  box-sizing: ${(props) => props.boxSizing};

  ${(props) =>
    props.reviewInput &&
    css`
      height: 180px;
    `}

  ${(props) =>
    props.singupInput &&
    css`
      width: 330px;
      height: 46px;
      padding: 0px 11px 1px 15px;
    `}

    ${(props) =>
    props.loginInput &&
    css`
      width: 340px;
      height: 54px;
      padding: 0px 11px 1px 15px;
    `}
`;

export function InputLayout(props) {
  return <LayoutWrapper {...props}>{props.children}</LayoutWrapper>;
}

InputLayout.defaultProps = {
  width: '640px',
  minHeight: '68px',
};

const LayoutWrapper = styled.div`
  width: ${(props) => props.width};
  min-height: ${(props) => props.minHeight};
  margin: 10px 20px;
  ${(props) => props.theme.FlexRow};
  align-items: flex-start;
  ${(props) =>
    props.inputLayout &&
    css`
      width: 640px;
      min-height: 150px;
    `}

  textarea {
    width: 100%;
    min-height: 150px;
    height: auto;
    padding: 15px;
    font-size: 16px;
    border-radius: 4px;
    border: 1px solid rgb(221, 221, 221);
    resize: none;
    outline: none;
    overflow-y: hidden;
  }
`;

export function MiniBox(props) {
  return <MiniBoxWrapper {...props}>{props.children}</MiniBoxWrapper>;
}

MiniBox.defaultProps = {
  width: '139px',
  height: '48px',
  padding: '12px 0px 0px',
  fontweight: 500,
  lineheight: '20px',
};

const MiniBoxWrapper = styled.div`
  width: 139px;
  height: 48px;
  padding: 12px 0px 0px;

  ${(props) =>
    props.inputMiniBox &&
    css`
      align-items: 'center';
      height: 180px;
    `}
  ${(props) =>
    props.signup &&
    css`
      &:after {
        content: '\*';
        font-size: 16px;
        color: rgb(238, 106, 123);
      }
    `}
`;

export const LoginAlertSpan = styled.p`
  display: flex;
  width: 330px;
  text-align: start;
  font-size: 0.8rem;
  padding: 0.2rem;
  color: ${(props) => (props.isCurrent ? '#58793e' : 'tomato')};
`;
