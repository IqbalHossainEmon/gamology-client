import { useCallback, useRef } from 'react';

const useHandleDebouncing = (seconds = 500) => {
  const timeOutRef = useRef(null);
  // handle multiple click.
  return useCallback(
    (handleClick) => {
      if (!timeOutRef.current) {
        handleClick();
        timeOutRef.current = true;
        timeOutRef.current = setTimeout(() => {
          clearTimeout(timeOutRef.current);
          timeOutRef.current = null;
        }, seconds);
      }
    },
    [seconds],
  );
};

export default useHandleDebouncing;
