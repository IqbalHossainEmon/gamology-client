import { useCallback } from 'react';
import useIsTouchAble from './useIsTouchable';

export default function useDragStartStop(handleMove, handleMouseUp = () => {}, handleMouseDown = () => {}, grab = false) {
  const isTouchAble = useIsTouchAble();

  const onStop = useCallback(
    e => {
      handleMouseUp(e);

      if (document.getElementById('root').classList.contains('grabbing')) {
        document.getElementById('root').classList.remove('grabbing');
      }

      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('mouseup', onStop);
      document.removeEventListener('touchend', onStop);
      window.removeEventListener('blur', onStop);
    },
    [handleMove, handleMouseUp]
  );

  const onStart = useCallback(
    e => {
      handleMouseDown(e);
      if (!isTouchAble() && grab) {
        e.preventDefault();
        document.getElementById('root').classList.add('grabbing');
      }
      document.body.blur();
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('touchmove', handleMove);
      document.addEventListener('mouseup', onStop);
      document.addEventListener('touchend', onStop);
      window.addEventListener('blur', onStop);
    },
    [grab, handleMouseDown, handleMove, isTouchAble, onStop]
  );
  return onStart;
}
