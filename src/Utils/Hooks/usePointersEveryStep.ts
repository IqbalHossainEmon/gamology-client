import {
  useCallback,
  useEffect,
  useRef,
  type MouseEvent as RMouseEvent,
  type RefObject,
  type TouchEvent as RTouchEvent,
} from "react";

export default function usePointersEveryStep(
  rangePathRef: RefObject<HTMLDivElement>,
  conditionStepRef: RefObject<number | { ifLess: number; step: number }[]>,
) {
  // Get value cursors value left right side value and left difference and right difference depending on cursors position inside the cursor.
  const pathInfoRef = useRef({ width: 0, offsetLeft: 0 });
  const hundred = 100;

  useEffect(() => {
    const el = rangePathRef.current;

    const update = () => {
      pathInfoRef.current.width = el.offsetWidth;
      pathInfoRef.current.offsetLeft = el.getBoundingClientRect().left;
    };
    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);

    return () => {
      ro.disconnect();
    };
  }, [rangePathRef]);

  const handleSetEveryStep = useCallback(
    (value: number) => {
      if (
        (typeof conditionStepRef.current === "number" &&
          !conditionStepRef.current) ||
        !Array.isArray(conditionStepRef.current)
      ) {
        return 1;
      }

      const st = conditionStepRef.current.find(({ ifLess }) => value <= ifLess);
      if (st) {
        return st.step;
      }

      const lastStep = conditionStepRef.current.at(
        conditionStepRef.current.length - 1,
      );
      if (lastStep) {
        return lastStep.step;
      }
      return 1;
    },
    [conditionStepRef],
  );

  const getCursorInPercent = useCallback(
    (e: RMouseEvent<HTMLElement> | RTouchEvent<HTMLElement>) => {
      const clientX = "touches" in e ? (e.touches[0]?.clientX ?? 0) : e.clientX;
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
    },
    [],
  );

  const getLeftRightPointerStep = useCallback(
    (e: RMouseEvent<HTMLElement> | RTouchEvent<HTMLElement>) => {
      const cursorInPercent = getCursorInPercent(e);
      const stepValue = conditionStepRef.current;
      let everyStep = 1;

      if (typeof stepValue === "number") {
        everyStep = stepValue;
      } else if (Array.isArray(stepValue)) {
        everyStep = handleSetEveryStep(cursorInPercent);
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
    [conditionStepRef, getCursorInPercent, handleSetEveryStep],
  );

  return {
    getLeftRightPointerStep,
    getCursorInPercent,
  };
}
