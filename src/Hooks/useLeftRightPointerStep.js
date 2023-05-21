import { useCallback, useEffect, useRef } from 'react';
import useScreenWidth from './useScreenWidth';

export default function useLeftRightPointerStep(rangePathRef, everyStep) {
  // get value cursors value left right side value and left difference and right difference depending on cursors position inside the cursor.

  const pathRef = useRef();
  const screenWidth = useScreenWidth();

  useEffect(() => {
    pathRef.width = rangePathRef.current?.offsetWidth;
    pathRef.offsetLeft = rangePathRef.current.getBoundingClientRect().left;
  }, [rangePathRef, screenWidth]);

  return useCallback(
    (e) => {
      const cursorInEle = e?.touches
        ? e.touches[0].pageX - pathRef.offsetLeft
        : e.pageX - pathRef.offsetLeft;

      const cursorInPercent = (cursorInEle / pathRef.width) * 100;

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
