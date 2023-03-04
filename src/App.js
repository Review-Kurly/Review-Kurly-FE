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
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();

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
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Router />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
