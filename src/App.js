import React from 'react';
import Router from './shared/Router';
import { ThemeProvider } from 'styled-components';
import {
  FlexRow,
  FlexCol,
  DarkBlur,
  CL,
  FS,
  Shadow,
  FlexRowBetween,
} from './styles/theme/Theme';

function App() {
  const theme = {
    FlexRow,
    FlexRowBetween,
    FlexCol,
    CL,
    FS,
    DarkBlur,
    Shadow,
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
