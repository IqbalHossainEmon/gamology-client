import { useEffect, useRef, useState } from 'react';
import styles from './RangeInputField.module.css';

export default function RangeInputField({ inputRef, disabled, state, handleEnter, name, float }) {
    const [value, setValue] = useState(0);
    const eventRef = useRef(null);

    useEffect(() => {
        setValue(state.toFixed(float));
    }, [float, state]);

    eventRef.handleMouseDown = e => {
        if (e.target !== inputRef.current) {
            inputRef.current.blur();
            document.removeEventListener('mousedown', eventRef.handleMouseDown);
        }
    };

    return (
        <input
            disabled={disabled}
            ref={inputRef}
            className={styles.input}
            value={value}
            name={name}
            onFocus={e => {
                document.addEventListener('mousedown', eventRef.handleMouseDown);
                e.target.select();
            }}
            onKeyDown={handleEnter}
            type="text"
            onChange={e => {
                if (e.target.value === '' || /^\d{1,}(\.\d{0,2})?$/.test(e.target.value)) {
                    setValue(e.target.value);
                }
            }}
        />
    );
}
