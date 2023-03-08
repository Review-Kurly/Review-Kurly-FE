import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalStyle } from './styles/theme/GlobalStyle';
import { QueryClient, QueryClientProvider } from 'react-query';

//refetchOnWindowFocus: false는, 윈도우가 포커스될 때 쿼리를 자동으로 다시 가져오는 기능을 끄는 옵션
//옵션을 false로 설정하면, 윈도우 포커스와 관계없이 쿼리를 다시 가져오지 않도록 설정
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <App />
    </QueryClientProvider>
  </>
);
