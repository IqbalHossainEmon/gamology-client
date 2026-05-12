import { useCallback, useRef } from "react";

const useHandleDebouncing = (seconds = 500) => {
  const timeOutRef = useRef<ReturnType<typeof setTimeout>>(null);
  // Handle multiple click.
  return useCallback(
    (handleClick: () => void) => {
      if (timeOutRef.current !== null) {
        return;
      }
      handleClick();
      timeOutRef.current = setTimeout(() => {
        timeOutRef.current = null;
      }, seconds);
    },
    [seconds],
  );
};

export default useHandleDebouncing;
