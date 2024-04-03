import { useCallback, useEffect, useRef } from 'react';
import useScreenWidth from './useScreenWidth';

export default function usePointersEveryStep(rangePathRef, everyStep) {
    // get value cursors value left right side value and left difference and right difference depending on cursors position inside the cursor.

    const pathInfoRef = useRef();
    const screenWidth = useScreenWidth();

    useEffect(() => {
        pathInfoRef.width = rangePathRef.current.offsetWidth;
        pathInfoRef.offsetLeft = rangePathRef.current.getBoundingClientRect().left;
    }, [rangePathRef, screenWidth]);

    return useCallback(
        e => {
            const cursorInEle = (e?.touches ? e.touches[0].clientX : e.clientX) - pathInfoRef.offsetLeft;

            const cursorInPercent = (cursorInEle / pathInfoRef.width) * 100;

            const pointerLeftStep = Math.round(cursorInPercent / everyStep.current) * everyStep.current;

            const pointerRightStep = pointerLeftStep + everyStep.current;

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
        [everyStep]
    );
}
