import { useCallback, useRef } from 'react';

export default function useHandleTimerTransition(setState, time = 200) {
  const timerId = useRef(null);
  return useCallback(() => {
    if (timerId.current) {
      clearTimeout(timerId.current);
    }
    timerId.current = setTimeout(() => {
      timerId.current = null;
      setState((prev) => ({ ...prev, transition: false }));
    }, time);
  }, [setState, time]);
}
