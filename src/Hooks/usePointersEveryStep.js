import { useCallback, useEffect, useRef } from 'react';
import useScreenWidth from './useScreenWidth';

export default function usePointersEveryStep(rangePathRef, everyStep) {
  // get value cursors value left right side value and left difference and right difference depending on cursors position inside the cursor.

  const pathInfoRef = useRef();
  const screenWidth = useScreenWidth();

  useEffect(() => {
    pathInfoRef.width = rangePathRef.current.offsetWidth;
    pathInfoRef.offsetLeft = rangePathRef.current.getBoundingClientRect().left;
    console.log(pathInfoRef.offsetLeft);
  }, [rangePathRef, screenWidth]);

  return useCallback(
    (e) => {
      const cursorInEle =
        (e?.touches ? e.touches[0].pageX : e.pageX) - pathInfoRef.offsetLeft;

      console.log(e.pageX);

      const cursorInPercent = (cursorInEle / pathInfoRef.width) * 100;

      const pointerLeftStep =
        Math.round(cursorInPercent / everyStep) * everyStep;

      const pointerRightStep = pointerLeftStep + everyStep;

      const leftDiff = cursorInPercent - pointerLeftStep;
      const rightDiff = pointerRightStep - cursorInPercent;

      return {
        cursorInPercent,
        pointerLeftStep,
        pointerRightStep,
        leftDiff,
        rightDiff,
      };
    },
    [everyStep],
  );
}
