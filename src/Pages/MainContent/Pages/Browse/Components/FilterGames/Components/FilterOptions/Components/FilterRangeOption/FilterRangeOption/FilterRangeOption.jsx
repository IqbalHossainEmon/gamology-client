import { useCallback, useEffect, useRef, useState } from 'react';
import RangeField from '../Components/RangeField/RangeField/RangeField';
import RangeInput from '../Components/RangeInput/RangeInput/RangeInput';
import styles from './FilterRangeOption.module.css';

export default function FilterRangeOption({ option, limit, setState: setValue, disabled }) {
    const [state, setState] = useState({
        knob1: 0,
        knob2: 100,
        transition: false,
        disableState: false,
    });

    const { knob1, knob2, disableState } = state;
    const { float, rangeName } = option;

    const leftInputRef = useRef(null);
    const rightInputRef = useRef(null);
    const singleStepRef = useRef(0);

    useEffect(() => {
        if (typeof limit !== 'object' || limit.higher <= limit.lower || disabled) {
            setState(prev => ({ ...prev, disableState: true }));
        } else {
            setState(prev => ({ ...prev, disableState: false }));
        }
    }, [disabled, limit]);

    const bigger = parseFloat(((knob1 > knob2 ? knob1 : knob2) / singleStepRef.current + limit.lower).toFixed(float));
    const smaller = parseFloat(
        (((knob1 < knob2 ? knob1 : knob2) / singleStepRef.current || 0) + limit.lower).toFixed(float)
    );

    const stateRef = useRef({ bigger, smaller });
    stateRef.current.bigger = bigger;
    stateRef.current.smaller = smaller;

    const handleSetValue = useCallback(() => {
        setTimeout(() => {
            setValue(prev => {
                if (prev[rangeName].higher !== stateRef.current.bigger) {
                    return {
                        ...prev,
                        [rangeName]: { ...prev[rangeName], higher: stateRef.current.bigger },
                    };
                }
                if (prev[rangeName].lower !== stateRef.current.smaller) {
                    return {
                        ...prev,
                        [rangeName]: { ...prev[rangeName], lower: stateRef.current.smaller },
                    };
                }
                return prev;
            });
        }, 0);
    }, [rangeName, setValue]);

    return (
        <div className={styles.filterRange} {...(disableState && { disabled: true })}>
            <RangeField
                leftInputRef={leftInputRef}
                rightInputRef={rightInputRef}
                disabled={disableState}
                conditionStep={option.stepCondition}
                limit={limit}
                setState={setState}
                state={state}
                singleStepRef={singleStepRef}
                handleSetValue={handleSetValue}
            />
            <RangeInput
                disabled={disabled}
                leftInputRef={leftInputRef}
                rightInputRef={rightInputRef}
                limit={limit}
                float={float}
                state={{ bigger, smaller }}
                setState={setState}
                singleStepRef={singleStepRef}
                handleSetValue={handleSetValue}
            />
        </div>
    );
}
