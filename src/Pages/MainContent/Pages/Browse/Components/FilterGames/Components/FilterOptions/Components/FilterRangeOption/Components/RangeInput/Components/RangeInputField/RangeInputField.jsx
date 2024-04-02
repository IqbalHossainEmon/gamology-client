import { useEffect, useState } from 'react';
import styles from './RangeInputField.module.css';

export default function RangeInputField({
    state,
    limit,
    knob,
    handleSetValue,
    everyStep = 1,
    float,
    lowerLim,
    setMainValue,
    inputRef,
    handleStepChange,
    disabled,
}) {
    const [value, setValue] = useState(0);

    // when knob moves depending on percentage set knob value
    useEffect(() => {
        const { knob1, knob2 } = state;

        const { lower, higher } = limit;

        let val;

        const checkKnob = kn => {
            switch (kn) {
                case 100:
                    val = higher;
                    break;
                case 0:
                    val = lower;
                    break;
                default:
                    val = everyStep * kn + lowerLim;
                    break;
            }
        };

        switch (knob) {
            case 'knob2':
                if (knob1 <= knob2) {
                    checkKnob(knob2);
                } else if (knob1 > knob2) {
                    checkKnob(knob1);
                }
                break;
            case 'knob1':
                if (knob2 >= knob1) {
                    checkKnob(knob1);
                } else if (knob2 < knob1) {
                    checkKnob(knob2);
                }
                break;
            default:
                return;
        }

        if (typeof handleStepChange === 'function') {
            handleStepChange(everyStep, val);
        }

        setValue(val.toFixed(float));
    }, [everyStep, float, handleStepChange, knob, limit, lowerLim, setMainValue, state]);

    const handleClick = e => {
        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
            let val = value;
            const { lower, higher } = limit;
            if (value > higher) {
                val = higher;
            }
            if (value < lower) {
                val = lower;
            }
            handleSetValue(parseFloat(val), knob);
        }
    };
    return (
        <input
            disabled={disabled}
            ref={inputRef}
            className={styles.input}
            value={value}
            type="text"
            onChange={e => {
                if (e.target.value === '' || /^\d{1,}(\.\d{0,2})?$/.test(e.target.value)) {
                    setValue(e.target.value);
                }
            }}
            onKeyDown={handleClick}
        />
    );
}
