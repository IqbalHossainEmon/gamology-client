import { useEffect, useState } from 'react';
import RangeField from '../Components/RangeField/RangeField/RangeField';
import styles from './FilterRangeOption.module.css';

export default function FilterRangeOption({ option, limit, setState, disabled }) {
    const [disableState, setDisableState] = useState(false);

    useEffect(() => {
        if (typeof limit !== 'object' || limit.higher <= limit.lower || disabled) {
            setDisableState(true);
        } else {
            setDisableState(false);
        }
    }, [disabled, limit]);

    /*   useEffect(() => {
        if (typeof limit === 'object') {
            const step = 100 / Math.ceil((limit.higher - limit.lower) / stepRef.current);

            if (step === Infinity) {
                everyStep.current = 0;
            } else {
                everyStep.current = step;
            }
            everyStep.stepForInput = stepRef.current / everyStep.current;
            everyStep.lowerForInput = Math.floor(limit.lower / stepRef.current) * stepRef.current;
        }
    }, [limit, option]);

    const handleStepChange = useCallback(
        e => {
            // e.target.getAttribute('data-knob')
            if (inputValue.current[e.target.getAttribute('data-knob')] > 50 && e.target.getAttribute('data-knob')) {
                stepRef.current = 10;
            } else if (inputValue.current[e.target.getAttribute('data-knob')] <= 50 && e.target.getAttribute('data-knob')) {
                stepRef.current = 5;
            } else if (e.target.getAttribute('data-knob')) {
                stepRef.current = 1;
            }
            const step = 100 / Math.ceil((limit.higher - limit.lower) / stepRef.current);

            if (step === Infinity) {
                everyStep.current = 0;
            } else {
                everyStep.current = step;
            }
            everyStep.stepForInput = stepRef.current / everyStep.current;
            everyStep.lowerForInput = Math.floor(limit.lower / stepRef.current) * stepRef.current;
        },
        [limit]
    );

    // set value after re-render and value change
    const handleSetValue = useCallback(() => {
        setTimeout(() => {
            const { knob1, knob2 } = stateRef.current;
            let higher;
            let lower;
            if (knob1 <= knob2) {
                higher = everyStep.stepForInput * knob2 + everyStep.lowerForInput;
                lower = everyStep.stepForInput * knob1 + everyStep.lowerForInput;
            } else {
                higher = everyStep.stepForInput * knob1 + everyStep.lowerForInput;
                lower = everyStep.stepForInput * knob2 + everyStep.lowerForInput;
            }
            if (lower < limit.lower) {
                lower = limit.lower;
            }
            if (higher > limit.higher) {
                higher = limit.higher;
            }

            setState(prev => ({
                ...prev,
                [option.rangeName]: { lower, higher },
            }));
        }, 0);
    }, [limit, option, setState]); */

    return (
        <div className={styles.filterRange} {...(disableState && { disabled: true })}>
            <RangeField disabled={disableState} />
            {/* <RangeInput
                disabled={knobState.disabled}
                inputRefLeft={inputRefLeft}
                inputRefRight={inputRefRight}
                setValue={setKnobState}
                handleSetValue={handleSetValue}
                everyStep={everyStep.stepForInput}
                lowerLim={everyStep.lowerForInput}
                value={knobState}
                float={option.float}
                limit={limit}
                inputValue={inputValue}
            /> */}
        </div>
    );
}
