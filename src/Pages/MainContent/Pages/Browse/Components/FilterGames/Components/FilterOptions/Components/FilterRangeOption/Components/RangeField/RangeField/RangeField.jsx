import { useRef, useState } from 'react';
import usePointersEveryStep from '../../../../../../../../../../../../../Hooks/usePointersEveryStep';
import RangeKnob from '../Components/RangeKnob/RangeKnob';
import styles from './RangeField.module.css';

export default function RangeField({ disabled }) {
    const [state, setState] = useState({
        knob1: 0,
        knob2: 100,
        transition: false,
    });

    const { knob1, knob2, transition } = state;

    const rangePathRef = useRef();
    const activePathRef = useRef();

    const getLeftRightPointerStep = usePointersEveryStep(rangePathRef, 0.1);

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
                    className={styles.activePath}
                    ref={activePathRef}
                    style={
                        transition
                            ? {
                                  translate: `${knob1 < knob2 ? knob1 : knob2}%`,
                                  scale: `${(knob1 > knob2 ? knob1 - knob2 : knob2 - knob1) / 100} 1`,
                                  transition: 'translate linear 200ms, scale linear 200ms',
                              }
                            : {
                                  translate: `${knob1 < knob2 ? knob1 : knob2}%`,
                                  scale: `${(knob1 > knob2 ? knob1 - knob2 : knob2 - knob1) / 100} 1.25`,
                              }
                    }
                />

                {['knob1', 'knob2'].map(rangeKnob => (
                    <RangeKnob
                        key={rangeKnob}
                        getLeftRightStep={getLeftRightPointerStep}
                        setState={setState}
                        state={state[rangeKnob]}
                        name={rangeKnob}
                        disabled={disabled}
                    />
                ))}
            </div>
        </div>
    );
}
