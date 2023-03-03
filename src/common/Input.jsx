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
`;

export function AddReviewInputLayout(props) {
  return <LayoutWrapper {...props}>{props.children}</LayoutWrapper>;
}

AddReviewInputLayout.defaultProps = {
  width: '600px',
  height: '68px',
  padding: '10px 20px',
};

const LayoutWrapper = styled.div`
  width: 600px;
  height: ${(props) => props.height};
  padding: 10px 20px;
  ${(props) => props.theme.FlexRow};

  ${(props) =>
    props.inputLayout &&
    css`
      height: 204px;
    `}
`;

export function AddReviewMiniBox(props) {
  return <MiniBoxWrapper {...props}>{props.children}</MiniBoxWrapper>;
}

AddReviewMiniBox.defaultProps = {
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
`;
