import React from 'react';
import styled from 'styled-components';

export default function Input(props) {
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
`;
