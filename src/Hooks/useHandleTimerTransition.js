import { useCallback } from 'react';

export default function useHandleTimerTransition(setState, time = 200) {
  return useCallback(() => {
    setTimeout(() => {
      setState((prev) => ({ ...prev, transition: false }));
    }, time);
  }, [setState, time]);
}
