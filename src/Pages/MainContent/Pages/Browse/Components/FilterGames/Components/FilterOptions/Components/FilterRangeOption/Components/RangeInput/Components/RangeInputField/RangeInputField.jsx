import { useEffect, useState } from 'react';
import styles from './RangeInputField.module.css';

export default function RangeInputField({ inputRef, disabled, state, handleEnter, name, float }) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        setValue(state.toFixed(float));
    }, [float, state]);

    const handleMouseDown = e => {
        if (e.target !== inputRef.current) {
            inputRef.current.blur();
            document.removeEventListener('mousedown', handleMouseDown);
        }
    };

    return (
        <input
            disabled={disabled}
            ref={inputRef}
            className={styles.input}
            value={value}
            name={name}
            onFocus={() => {
                document.addEventListener('mousedown', handleMouseDown);
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
