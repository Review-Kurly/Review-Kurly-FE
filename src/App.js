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
import { Provider } from 'react-redux';
import store from './redux/config/configStore';

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

  //로컬스토리지에 로그인한 유저 정보 get
  const userInfo = localStorage.getItem('userInfo');
  const saveUserInfo = JSON.parse(userInfo);
  console.log(saveUserInfo);

  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <Router />
          </ThemeProvider>
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default App;
