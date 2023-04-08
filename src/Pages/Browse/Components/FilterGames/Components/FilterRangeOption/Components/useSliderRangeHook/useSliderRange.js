import { useCallback } from 'react';

export default function useSliderRange(
  setState,
  pathEleWidth,
  pathEleOffsetLeft,
  name,
  steps,
  limit
) {
  const handleMove = useCallback(
    (e) => {
      e.preventDefault();

      const x = 1000 / (limit[1] - limit[0]);
      const y = 1000 % x;
      console.log(y);

      const cursorInELe = e.pageX - pathEleOffsetLeft;

      setState((prev) => {
        if (cursorInELe >= 0 && cursorInELe <= pathEleWidth) {
          return {
            ...prev,
            [name]: (cursorInELe / pathEleWidth) * 1000
          };
        }
        if (cursorInELe < 0) {
          return {
            ...prev,
            [name]: 0
          };
        }
        if (cursorInELe > pathEleWidth) {
          return {
            ...prev,
            [name]: 1000
          };
        }
        return prev;
      });
    },
    [limit, pathEleOffsetLeft, setState, pathEleWidth, name]
  );

  const onStop = useCallback(() => {
    document.removeEventListener('mousemove', handleMove);
    document.removeEventListener('mouseup', onStop);
    window.removeEventListener('blur', onStop);
  }, [handleMove]);

  const onStart = useCallback(
    (e) => {
      e.preventDefault();
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', onStop);
      window.addEventListener('blur', onStop);
    },
    [handleMove, onStop]
  );
  return { onStart, onStop };
}
