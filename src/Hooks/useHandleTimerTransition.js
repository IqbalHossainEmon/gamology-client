import { useCallback } from 'react';

export default function useHandleTimerTransition(setState, time = 200) {
  return useCallback(() => {
    const timerId = setTimeout(() => {
      clearTimeout(timerId);
      setState((prev) => ({ ...prev, transition: false }));
    }, time);
  }, [setState, time]);
}
