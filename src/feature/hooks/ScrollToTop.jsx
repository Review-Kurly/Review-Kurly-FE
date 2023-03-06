import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  // useLayoutEffect hook을 사용하여 페이지가 렌더링된 후에 스크롤을 이동
  useLayoutEffect(() => {
    // window.scroll 함수를 사용하여 스크롤을 이동
    window.scroll({
      top: 0,
      left: 0,
    });
  }, [pathname]);

  // ScrollToTop 컴포넌트는 화면에 렌더링되는 것은 없기 때문에 null을 반환
  return null;
}
