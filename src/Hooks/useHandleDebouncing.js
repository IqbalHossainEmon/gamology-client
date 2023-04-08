import { useRef } from 'react';

const useHandleDebouncing = () => {
  const timeOutRef = useRef(false);
  // handle multiple click.
  return (handleClick) => {
    if (!timeOutRef.current) {
      handleClick();
      timeOutRef.current = true;
      setTimeout(() => {
        timeOutRef.current = false;
      }, 400);
    }
  };
};

export default useHandleDebouncing;
