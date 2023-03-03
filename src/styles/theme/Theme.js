import { css } from 'styled-components';

export const FlexRow = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const FlexRowBetween = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const FlexCol = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const DarkBlur = css`
  background: #161616aa;
  backdrop-filter: blur(3px);
`;

export const CL = {
  brandColor: '#5F0080',
};

export const FS = {
  xl: '1.8rem', // header
  l: '1.4rem', // title
  m: '1.1rem', // content, input
  s: '0.9rem', // button
  xs: '0.8rem', // message
};

export const Shadow = {
  all: 'rgb(0 0 0 / 0%) 0 0 0 0, rgb(0 0 0 / 0%) 0 0 0 0, rgb(0 0 0 / 30%) 0 20px 25px -5px, rgb(0 0 0 / 20%) 0 8px 10px -6px',
  bottom:
    'rgb(0 0 0 / 0%) 0 0 0 0, rgb(0 0 0 / 0%) 0 0 0 0, rgb(0 0 0 / 52%) 0 23px 34px -9px, rgb(0 0 0 / 14%) 0 11px 14px 3px',
};
