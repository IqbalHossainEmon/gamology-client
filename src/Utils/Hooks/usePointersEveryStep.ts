import { useCallback, useEffect, useRef, type MouseEvent as RMouseEvent, type RefObject, type TouchEvent as RTouchEvent } from 'react';
import useScreenWidth from './useScreenWidth';

export default function usePointersEveryStep(rangePathRef: RefObject<HTMLDivElement>, conditionStepRef: RefObject<number | { ifLess: number; step: number }[]>) {
  // Get value cursors value left right side value and left difference and right difference depending on cursors position inside the cursor.

  const pathInfoRef = useRef({ width: 0, offsetLeft: 0 });
  const { widthInRem, heightInRem } = useScreenWidth();
  const hundred = 100;

  useEffect(() => {
    setTimeout(() => {
      pathInfoRef.current.width = rangePathRef.current.offsetWidth;
      pathInfoRef.current.offsetLeft = rangePathRef.current.getBoundingClientRect().left;
    }, 0);
  }, [rangePathRef, widthInRem, heightInRem]);

  const handleSetEveryStep = useCallback((value: number) => {

    if (!conditionStepRef.current || !Array.isArray(conditionStepRef.current)) {
      return 1;
    }

    const st = conditionStepRef.current.find(({ ifLess }) => value <= ifLess);
    if (st) {
      return st.step;
    }

    const lastStep = conditionStepRef.current[conditionStepRef.current.length - 1];
    if (lastStep) {
      return lastStep.step;
    }
    return 1;
  },
    [conditionStepRef]
  );

  const getCursorInPercent = useCallback((e: RMouseEvent<HTMLElement> | RTouchEvent<HTMLElement>) => {
    const clientX = "touches" in e ? e.touches[0]?.clientX ?? 0 : e.clientX;
    const cursorInEle = clientX - pathInfoRef.current.offsetLeft;

    let cursorInPercent = (cursorInEle / pathInfoRef.current.width) * hundred;

    if (cursorInPercent < 0 || cursorInPercent > hundred) {
      if (cursorInPercent < 0) {
        cursorInPercent = 0;
      } else {
        cursorInPercent = hundred;
      }
    }
    return cursorInPercent;
  }, []);

  const getLeftRightPointerStep = useCallback(
    (e: RMouseEvent<HTMLElement> | RTouchEvent<HTMLElement>) => {
      let everyStep = 1;

      const cursorInPercent = getCursorInPercent(e);

      switch (typeof conditionStepRef?.current) {
        case 'object':
          everyStep = handleSetEveryStep(cursorInPercent);
          break;
        case 'number':
          everyStep = conditionStepRef.current;
          break;
        default:
          break;
      }

      let pointerLeftStep = Math.round(cursorInPercent / everyStep) * everyStep;
      let pointerRightStep = pointerLeftStep + everyStep;

      if (pointerLeftStep < 0 || pointerLeftStep > hundred) {
        if (pointerLeftStep < 0) {
          pointerLeftStep = 0;
        } else {
          pointerLeftStep = hundred;
        }
      }

      if (pointerRightStep > hundred || pointerRightStep < 0) {
        if (pointerRightStep > hundred) {
          pointerRightStep = hundred;
        } else {
          pointerRightStep = 0;
        }
      }

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
    [conditionStepRef, getCursorInPercent, handleSetEveryStep]
  );

  return {
    getLeftRightPointerStep,
    getCursorInPercent,
  };
}
