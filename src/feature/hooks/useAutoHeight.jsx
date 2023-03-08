import { useState, useCallback, useRef } from 'react';

export default function useAutoHeight(value) {
  const ref = useRef(null);
  const [content, setContent] = useState(value);

  const handleResizeHeight = useCallback((e) => {
    setContent(e.target.value);
    // ref 변수가 null인 경우 함수 종료
    if (ref === null || ref.current === null) return;
    // textarea 요소의 높이를 조절하기 위해 초기 높이값은 '38px'으로 지정
    // textarea 요소의 scrollHeight 값을 이용하여 자동으로 높이 조절
    ref.current.style.height = '38px';
    ref.current.style.height = ref.current.scrollHeight + 'px';
  }, []);

  return {
    ref,
    content,
    setContent,
    handleResizeHeight,
  };
}

/*
function MyComponent() {
  const { ref, content, setContent, handleResizeHeight } = useAutoHeight();

  return (
    <textarea
      ref={ref}
      value={content}
      onChange={handleResizeHeight}
    />
  );
}
*/
