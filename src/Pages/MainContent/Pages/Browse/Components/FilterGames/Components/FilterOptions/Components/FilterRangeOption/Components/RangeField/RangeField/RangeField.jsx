import { useEffect, useRef, useState } from 'react';
import usePointersEveryStep from '../../../../../../../../../../../../../Hooks/usePointersEveryStep';
import RangeKnob from '../Components/RangeKnob/RangeKnob';
import styles from './RangeField.module.css';

export default function RangeField({ disabled, conditionStep, limit, float = 0 }) {
    const [state, setState] = useState({
        knob1: 0,
        knob2: 100,
        transition: false,
        everyStep: {
            knob1: 1,
            knob2: 1,
        },
    });
    const { knob1, knob2, transition, everyStep } = state;

    const rangePathRef = useRef();
    const activePathRef = useRef();
    const conditionStepRef = useRef([]);
    const singleStepRef = useRef(1);

    // console.log(knob2 / singleStepRef.current + limit.lower);

    const once = useRef(true);

    useEffect(() => {
        singleStepRef.current = 100 / (limit.higher - limit.lower);
        if (once.current && conditionStep) {
            once.current = false;
            conditionStep.sort((a, b) => a.ifLess - b.ifLess);
            conditionStep.forEach(step => {
                step.ifLess *= singleStepRef.current;
                step.step *= singleStepRef.current;
            });
            conditionStepRef.current = conditionStep;
        }
    }, [conditionStep, limit]);

    const getLeftRightPointerStep = usePointersEveryStep(rangePathRef, conditionStep ? conditionStepRef : singleStepRef);

    // set click value in the path of slider depending on steps
    const handlePathClick = e => {
        if (e.target === rangePathRef.current || e.target === activePathRef.current) {
            const { pointerLeftStep, pointerRightStep, leftDiff, rightDiff } = getLeftRightPointerStep(e);

            if (leftDiff < rightDiff) {
                setState(prev => {
                    if (Math.abs(pointerLeftStep - prev.knob1) <= Math.abs(pointerLeftStep - prev.knob2)) {
                        return { ...prev, knob1: pointerLeftStep };
                    }
                    return { ...prev, knob2: pointerLeftStep };
                });
            } else if (leftDiff > rightDiff) {
                setState(prev => {
                    if (Math.abs(pointerRightStep - prev.knob1) <= Math.abs(pointerRightStep - prev.knob2)) {
                        return { ...prev, knob1: pointerRightStep };
                    }
                    return { ...prev, knob2: pointerRightStep };
                });
            }
        }
    };

    return (
        <div className={styles.rangeFieldContainer}>
            <div tabIndex="-1" role="button" ref={rangePathRef} onMouseDown={handlePathClick} className={styles.rangeField}>
                <div
                    className={`${transition ? `${styles.activePathTransition} ` : ''}${styles.activePath}`}
                    ref={activePathRef}
                    style={{
                        translate: `${knob1 < knob2 ? knob1 : knob2}%`,
                        scale: `${(knob1 > knob2 ? knob1 - knob2 : knob2 - knob1) / 100} 1.25`,
                    }}
                />

                {['knob1', 'knob2'].map(rangeKnob => (
                    <RangeKnob
                        key={rangeKnob}
                        getLeftRightStep={getLeftRightPointerStep}
                        setState={setState}
                        everyStep={everyStep[rangeKnob]}
                        state={state[rangeKnob]}
                        name={rangeKnob}
                        transition={transition}
                        disabled={disabled}
                        conditionStep={conditionStep}
                    />
                ))}
            </div>
        </div>
    );
}
