import { useCallback, useEffect, useRef } from 'react';
import useScreenWidth from './useScreenWidth';

export default function usePointersEveryStep(rangePathRef, conditionStepRef) {
    // get value cursors value left right side value and left difference and right difference depending on cursors position inside the cursor.

    const pathInfoRef = useRef();
    const screenWidth = useScreenWidth();

    const handleSetEveryStep = useCallback(
        value => {
            const st = conditionStepRef.current.find(({ ifLess }) => value <= ifLess);

            if (st) {
                return st.step;
            }
            return conditionStepRef.current[conditionStepRef.current.length - 1].step;
        },
        [conditionStepRef]
    );

    useEffect(() => {
        setTimeout(() => {
            pathInfoRef.width = rangePathRef.current.offsetWidth;
            pathInfoRef.offsetLeft = rangePathRef.current.getBoundingClientRect().left;
        }, 0);
    }, [rangePathRef, screenWidth]);

    const getCursorInPercent = useCallback(e => {
        const cursorInEle = (e?.touches ? e.touches[0].clientX : e.clientX) - pathInfoRef.offsetLeft;
        console.dir(pathInfoRef.offsetLeft);
        let cursorInPercent = (cursorInEle / pathInfoRef.width) * 100;

        if (cursorInPercent < 0 || cursorInPercent > 100) {
            if (cursorInPercent < 0) {
                cursorInPercent = 0;
            } else {
                cursorInPercent = 100;
            }
        }
        return cursorInPercent;
    }, []);

    const getLeftRightPointerStep = useCallback(
        e => {
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

            if (pointerLeftStep < 0 || pointerLeftStep > 100) {
                if (pointerLeftStep < 0) {
                    pointerLeftStep = 0;
                } else {
                    pointerLeftStep = 100;
                }
            }

            if (pointerRightStep > 100 || pointerRightStep < 0) {
                if (pointerRightStep > 100) {
                    pointerRightStep = 100;
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
