import { useState, useCallback } from 'react';

const useInputOnChange = (initialValue) => {
  const [state, setState] = useState(initialValue);

  const setStateHandler = useCallback((e) => {
    const { name, value } = e.target;
    if (name === 'price') {
      const formattedNumber = value
        .replace(/[^0-9]/g, '') // 숫자 이외의 문자를 모두 제거
        .replace(/\B(?=(\d{3})+(?!\d))/g, ','); // 천 단위로 쉼표로 구분
      setState((prev) => ({ ...prev, [name]: formattedNumber }));
    } else {
      setState((prev) => ({ ...prev, [name]: value }));
    }
  }, []);

  const reset = () => {
    setState(initialValue);
  };

  return [state, setStateHandler, reset];
};

export default useInputOnChange;

//문자열에서 숫자로 변환해야됨.
//const stringToNumPrice = Number(price.replace(/,/g, ''));
