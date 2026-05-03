import { useCallback, useRef, type Dispatch, type SetStateAction } from "react";

export default function useHandleTimerTransition<T>(
  setState: Dispatch<SetStateAction<T>>,
  time = 200,
) {
  const timerId = useRef<ReturnType<typeof setTimeout>>(null);

  return useCallback(() => {
    if (timerId.current) {
      clearTimeout(timerId.current);
      timerId.current = null;
    }
    timerId.current = setTimeout(() => {
      timerId.current = null;
      setState((prev) => ({ ...prev, transition: false }));
    }, time);
  }, [setState, time]);
}
