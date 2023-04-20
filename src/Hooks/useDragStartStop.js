import { useCallback } from 'react';
import useIsTouchAble from './useIsTouchable';

export default function useDragStartStop(handleMove) {
  const isTouchAble = useIsTouchAble();

  const onStop = useCallback(() => {
    document.getElementById('root').removeAttribute('class');
    document.removeEventListener('mousemove', handleMove);
    document.removeEventListener('touchmove', handleMove);
    document.removeEventListener('mouseup', onStop);
    document.removeEventListener('touchend', onStop);
    window.removeEventListener('blur', onStop);
  }, [handleMove]);

  const onStart = useCallback(
    (e) => {
      e.preventDefault();

      if (!isTouchAble()) {
        document.getElementById('root').classList.add('grabbing');
      }

      document.addEventListener('mousemove', handleMove);
      document.addEventListener('touchmove', handleMove);
      document.addEventListener('mouseup', onStop);
      document.addEventListener('touchend', onStop);
      window.addEventListener('blur', onStop);
    },
    [handleMove, isTouchAble, onStop],
  );
  return onStart;
}
